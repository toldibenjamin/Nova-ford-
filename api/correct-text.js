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
    "Te egy prec\u00EDz, t\u00F6bbnyelv\u0171 AI sz\u00F6vegjav\u00EDt\u00F3 vagy.",
    "A feladatod a kapott sz\u00F6veg helyes\u00EDr\u00E1si, \u00EDr\u00E1sjeli, nagybet\u0171z\u00E9si \u00E9s finom stilisztikai jav\u00EDt\u00E1sa.",
    "Mindig azon a nyelven jav\u00EDts, amelyen a sz\u00F6veg \u00EDrva van.",
    "Ne ford\u00EDtsd le a sz\u00F6veget m\u00E1s nyelvre.",
    "Tartsd meg az eredeti jelent\u00E9st, hangulatot \u00E9s sz\u00F3haszn\u00E1latot, csak tedd helyess\u00E9 \u00E9s term\u00E9szetess\u00E9.",
    "Ha a sz\u00F6veg magyar, p\u00F3told az \u00E9kezeteket is term\u00E9szetes magyar helyes\u00EDr\u00E1ssal.",
    "Ne tal\u00E1lj ki \u00FAj tartalmat, \u00E9s ne fogalmazd \u00E1t feleslegesen.",
    "A kimenet kiz\u00E1r\u00F3lag a jav\u00EDtott sz\u00F6veg legyen a JSON mez\u0151ben."
  ].join(" ");
}

function buildUserPrompt(text, sourceLanguage, options) {
  const modeLines = [
    `Megadott forr\u00E1snyelv: ${describeLanguage(sourceLanguage)}.`,
    `Csak \u00E9kezetp\u00F3tl\u00E1s: ${options.accents ? "igen" : "nem"}.`,
    `Teljes helyes\u00EDr\u00E1s-jav\u00EDt\u00E1s: ${options.spelling ? "igen" : "nem"}.`,
    `\u00CDr\u00E1sjelek jav\u00EDt\u00E1sa: ${options.punctuation ? "igen" : "nem"}.`,
    `Finom stilisztikai sim\u00EDt\u00E1s: ${options.style ? "igen" : "nem"}.`
  ].join("\n");

  return [
    "Jav\u00EDtsd ki az al\u00E1bbi sz\u00F6veget.",
    "A jav\u00EDt\u00E1st ugyanazon a nyelven add vissza, amelyen a bemenet \u00EDrva van.",
    "Ne ford\u00EDtsd le.",
    "Jav\u00EDtsd a helyes\u00EDr\u00E1st, az \u00E9kezeteket, az \u00EDr\u00E1sjeleket, a nagybet\u0171z\u00E9st \u00E9s a nyelvtani hib\u00E1kat a bejel\u00F6lt opci\u00F3k szerint.",
    "Ha a mondat term\u00E9szetesen t\u00F6bb vessz\u0151t, pontot vagy m\u00E1s \u00EDr\u00E1sjelet ig\u00E9nyel, tedd bele.",
    "A jelent\u00E9st ne v\u00E1ltoztasd meg, \u00E9s ne fogalmazd \u00E1t f\u00F6l\u00F6slegesen.",
    "Csak a jav\u00EDtott v\u00E9geredm\u00E9nyt add vissza.",
    "",
    modeLines,
    "",
    "Sz\u00F6veg:",
    text
  ].join("\n");
}

function describeLanguage(code) {
  const value = String(code || "auto").toLowerCase();
  const names = {
    auto: "automatikus felismer\u00E9s",
    hu: "magyar",
    en: "angol",
    de: "n\u00E9met",
    fr: "francia",
    es: "spanyol",
    it: "olasz",
    pt: "portug\u00E1l",
    pb: "brazil portug\u00E1l",
    nl: "holland",
    pl: "lengyel",
    ru: "orosz",
    uk: "ukr\u00E1n",
    ro: "rom\u00E1n",
    sk: "szlov\u00E1k",
    sl: "szlov\u00E9n",
    sv: "sv\u00E9d",
    da: "d\u00E1n",
    el: "g\u00F6r\u00F6g",
    ca: "katal\u00E1n"
  };
  return names[value] || value;
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
