const { Blob } = require("buffer");

const OPENAI_URL = "https://api.openai.com/v1/audio/transcriptions";
const MODEL = process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe";
const MAX_AUDIO_BYTES = 8 * 1024 * 1024;

async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Csak POST k\u00e9r\u00e9s enged\u00e9lyezett." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Hi\u00e1nyzik az OPENAI_API_KEY be\u00e1ll\u00edt\u00e1s." });
  }

  try {
    const body = normalizeBody(req.body);
    const audioBase64 = String(body.audio_base64 || "").trim();
    const mimeType = String(body.mime_type || "audio/webm").trim();
    const language = normalizeLanguage(body.source_language);

    if (!audioBase64) {
      return res.status(400).json({ error: "\u00dcres hangf\u00e1jlt nem lehet feldolgozni." });
    }

    const buffer = Buffer.from(audioBase64, "base64");
    if (!buffer.length) {
      return res.status(400).json({ error: "Nem siker\u00fclt beolvasni a hangf\u00e1jlt." });
    }

    if (buffer.length > MAX_AUDIO_BYTES) {
      return res.status(400).json({ error: "T\u00fal hossz\u00fa lett a hangfelv\u00e9tel. Pr\u00f3b\u00e1ld meg r\u00f6videbben." });
    }

    const form = new FormData();
    form.append("model", MODEL);
    if (language) form.append("language", language);
    form.append("file", new Blob([buffer], { type: mimeType }), `mic-input.${extensionForMime(mimeType)}`);

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: form
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.error?.message || "A hangfelismer\u00e9s most nem \u00e9rhet\u0151 el.";
      return res.status(response.status === 429 ? 429 : 502).json({ error: message });
    }

    const text = String(data?.text || "").trim();
    if (!text) {
      return res.status(502).json({ error: "Az AI nem adott vissza felismerhet\u0151 sz\u00f6veget." });
    }

    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error: error?.message || "V\u00e1ratlan hiba t\u00f6rt\u00e9nt a hangfelismer\u00e9s k\u00f6zben." });
  }
}

function normalizeBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try { return JSON.parse(body); } catch { return {}; }
  }
  return body;
}

function normalizeLanguage(value) {
  const lang = String(value || "").trim().toLowerCase();
  if (!lang || lang === "auto") return "";
  if (/^[a-z]{2,3}(-[a-z]{2})?$/i.test(lang)) return lang.slice(0, 2);
  return "";
}

function extensionForMime(mimeType) {
  const value = String(mimeType || "").toLowerCase();
  if (value.includes("ogg")) return "ogg";
  if (value.includes("mp4")) return "m4a";
  if (value.includes("mpeg")) return "mp3";
  if (value.includes("wav")) return "wav";
  return "webm";
}

module.exports = handler;
module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: "12mb"
    }
  }
};
