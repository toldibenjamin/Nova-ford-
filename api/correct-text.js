const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_TEXT_CORRECT_MODEL || "gpt-4.1-mini";
const MAX_INPUT_CHARS = 6000;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Csak POST k\u00E9r\u00E9s enged\u00E9lyezett." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Hi\u00E1nyzik az OPENAI_API_KEY be\u00E1ll\u00EDt\u00E1s." });
  }

  try {
    const body = normalizeBody(req.body);
    const text = String(body.text || "").trim();
    const sourceLanguage = String(body.source_language || "hu");
    const options = normalizeOptions(body.options);

    if (!text) {
      return res.status(400).json({ error: "\u00DCres sz\u00F6veget nem lehet jav\u00EDtani." });
    }

    if (text.length > MAX_INPUT_CHARS) {
      return res.status(400).json({ error: "T\u00FAl hossz\u00FA a sz\u00F6veg. Legfeljebb 6000 karaktert k\u00FCldj egyszerre." });
    }

    if (!hasActiveOption(options)) {
      return res.status(400).json({ error: "V\u00E1lassz legal\u00E1bb egy jav\u00EDt\u00E1si opci\u00F3t." });
    }

    // A backend itt küldi tovább a javítandó szöveget az OpenAI API-nak.
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "hungarian_text_correction",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                corrected_text: { type: "string" }
              },
              required: ["corrected_text"]
            }
          }
        },
        messages: [
          {
            role: "system",
            content: buildSystemPrompt()
          },
          {
            role: "user",
            content: buildUserPrompt(text, sourceLanguage, options)
          }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const message = data?.error?.message || "Az OpenAI jav\u00EDt\u00E1s nem siker\u00FClt.";
      return res.status(502).json({ error: message });
    }

    const parsed = extractCorrectedText(data);
    if (!parsed) {
      return res.status(502).json({ error: "Az OpenAI v\u00E1lasza nem tartalmazott jav\u00EDtott sz\u00F6veget." });
    }

    return res.status(200).json({
      corrected_text: parsed,
      detected_language: sourceLanguage === "auto" ? "hu" : sourceLanguage
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message || "V\u00E1ratlan hiba t\u00F6rt\u00E9nt a jav\u00EDt\u00E1s k\u00F6zben." });
  }
};

function normalizeBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try { return JSON.parse(body); } catch { return {}; }
  }
  return body;
}

function normalizeOptions(options) {
  return {
    accents: options?.accents !== false,
    spelling: options?.spelling !== false,
    punctuation: options?.punctuation !== false,
    style: options?.style === true
  };
}

function hasActiveOption(options) {
  return !!(options.accents || options.spelling || options.punctuation || options.style);
}

function buildSystemPrompt() {
  return [
    "Te egy prec\u00EDz magyar AI sz\u00F6vegjav\u00EDt\u00F3 vagy.",
    "A feladatod a kapott sz\u00F6veg jav\u00EDt\u00E1sa an\u00E9lk\u00FCl, hogy feleslegesen \u00E1tfogalmazn\u00E1d.",
    "Tartsd meg az eredeti jelent\u00E9st, hangulatot \u00E9s szem\u00E9lyt.",
    "Csak a k\u00E9rt m\u00E9rt\u00E9kben jav\u00EDts: \u00E9kezetek, helyes\u00EDr\u00E1s, \u00EDr\u00E1sjelek, nagybet\u0171k, finom st\u00EDlus.",
    "A kimenet kiz\u00E1r\u00F3lag a jav\u00EDtott magyar sz\u00F6veg legyen JSON mez\u0151ben."
  ].join(" ");
}

function buildUserPrompt(text, sourceLanguage, options) {
  const modeLines = [
    `Forr\u00E1snyelv: ${sourceLanguage}.`,
    `Csak \u00E9kezetp\u00F3tl\u00E1s: ${options.accents ? "igen" : "nem"}.`,
    `Teljes helyes\u00EDr\u00E1s-jav\u00EDt\u00E1s: ${options.spelling ? "igen" : "nem"}.`,
    `\u00CDr\u00E1sjelek jav\u00EDt\u00E1sa: ${options.punctuation ? "igen" : "nem"}.`,
    `Finom stilisztikai sim\u00EDt\u00E1s: ${options.style ? "igen" : "nem"}.`
  ].join("\n");

  return [
    "Jav\u00EDtsd ki az al\u00E1bbi magyar sz\u00F6veget.",
    "P\u00F3told az \u00E9kezeteket, jav\u00EDtsd a helyes\u00EDr\u00E1st, \u00EDr\u00E1sjeleket \u00E9s a nagybet\u0171z\u00E9st, de a jelent\u00E9st ne v\u00E1ltoztasd meg, \u00E9s ne fogalmazd \u00E1t f\u00F6l\u00F6slegesen.",
    "Ha a mondat magyarul term\u00E9szetesen t\u00F6bb vessz\u0151t vagy pontot ig\u00E9nyel, tedd bele.",
    "A v\u00E1laszban csak a jav\u00EDtott v\u00E9geredm\u00E9nyt add vissza.",
    "",
    modeLines,
    "",
    "Sz\u00F6veg:",
    text
  ].join("\n");
}

function extractCorrectedText(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") return "";

  try {
    const parsed = JSON.parse(content);
    return String(parsed?.corrected_text || "").trim();
  } catch {
    return "";
  }
}
