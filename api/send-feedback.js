const RESEND_URL = "https://api.resend.com/emails";
const FEEDBACK_FROM_EMAIL = process.env.FEEDBACK_FROM_EMAIL || "Nova Fordito <onboarding@resend.dev>";
const FEEDBACK_RECEIVER_EMAIL = process.env.FEEDBACK_RECEIVER_EMAIL || "toldibenjamin@gmail.com";
const MAX_MESSAGE_CHARS = 2000;
const MAX_CONTACT_CHARS = 120;
const MAX_SCREENSHOT_BYTES = 3 * 1024 * 1024;
const ALLOWED_SCREENSHOT_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const CATEGORY_LABELS = {
  bug: "Hiba",
  ui: "UI hiba",
  translation: "Forditas hiba",
  idea: "Otlet"
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Csak POST keres engedelyezett." });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Hianyzik a RESEND_API_KEY beallitas." });
  }

  try {
    const body = normalizeBody(req.body);
    const category = normalizeCategory(body.category);
    const message = normalizeMessage(body.message);
    const contact = normalizeContact(body.contact);
    const context = normalizeRecord(body.context);
    const systemInfo = normalizeRecord(body.system_info);
    const screenshot = normalizeScreenshot(body.screenshot);

    if (!message) {
      return res.status(400).json({ error: "Irj egy rovid visszajelzest a kuldeshez." });
    }

    const text = buildTextEmail({ category, message, contact, context, systemInfo, screenshot });
    const html = buildHtmlEmail({ category, message, contact, context, systemInfo, screenshot });
    const subject = buildSubject(category, context);
    const replyTo = looksLikeEmail(contact) ? contact : undefined;

    const resendResponse = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FEEDBACK_FROM_EMAIL,
        to: [FEEDBACK_RECEIVER_EMAIL],
        subject,
        text,
        html,
        reply_to: replyTo,
        attachments: screenshot
          ? [
              {
                filename: screenshot.filename,
                content: screenshot.base64
              }
            ]
          : undefined
      })
    });

    const data = await resendResponse.json().catch(() => ({}));
    if (!resendResponse.ok) {
      const messageText = data?.message || data?.error?.message || "A visszajelzes kuldese most nem sikerult.";
      return res.status(resendResponse.status === 429 ? 429 : 502).json({ error: messageText });
    }

    return res.status(200).json({
      ok: true,
      id: data?.id || "",
      message: "Koszonjuk! A visszajelzes megerkezett."
    });
  } catch (error) {
    return res.status(500).json({ error: error?.message || "Varatlan hiba tortent a visszajelzes kuldese kozben." });
  }
};

function normalizeBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try { return JSON.parse(body); } catch { return {}; }
  }
  return body;
}

function normalizeCategory(value) {
  const normalized = String(value || "bug").trim().toLowerCase();
  if (normalized === "opinion") return "idea";
  return Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, normalized) ? normalized : "bug";
}

function normalizeMessage(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim()
    .slice(0, MAX_MESSAGE_CHARS);
}

function normalizeContact(value) {
  return String(value || "").trim().slice(0, MAX_CONTACT_CHARS);
}

function normalizeRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const out = {};
  Object.entries(value).forEach(([key, raw]) => {
    const cleanKey = String(key || "").trim().slice(0, 60);
    const cleanValue = String(raw || "").trim().slice(0, 240);
    if (cleanKey && cleanValue) out[cleanKey] = cleanValue;
  });
  return Object.keys(out).length ? out : null;
}

function normalizeScreenshot(value) {
  if (!value || typeof value !== "object") return null;
  const filename = sanitizeFilename(value.filename || "feedback-screenshot.jpg");
  const mimeType = String(value.mime_type || "").trim().toLowerCase();
  const base64 = String(value.base64 || value.data_base64 || "").trim().replace(/\s+/g, "");

  if (!filename || !mimeType || !base64) return null;
  if (!ALLOWED_SCREENSHOT_TYPES.has(mimeType)) {
    throw new Error("A screenshot formatuma csak PNG, JPG vagy WEBP lehet.");
  }

  const bytes = estimateBase64Size(base64);
  if (!bytes || bytes > MAX_SCREENSHOT_BYTES) {
    throw new Error("A screenshot tul nagy. Maximum 3 MB-os kepet kuldj.");
  }

  return { filename, mimeType, base64, bytes };
}

function buildSubject(category, context) {
  const label = CATEGORY_LABELS[category] || CATEGORY_LABELS.bug;
  const area = context?.mode || "Altalanos";
  return `[Nova Fordito] ${label} - ${area}`;
}

function buildTextEmail({ category, message, contact, context, systemInfo, screenshot }) {
  const lines = [
    "Nova Fordito visszajelzes",
    `Kategoria: ${CATEGORY_LABELS[category] || CATEGORY_LABELS.bug}`
  ];

  if (contact) lines.push(`Kapcsolat: ${contact}`);
  if (context) {
    lines.push("", "Kontextus:");
    Object.entries(context).forEach(([key, value]) => lines.push(`- ${prettifyKey(key)}: ${value}`));
  }

  lines.push("", "Uzenet:", message);

  if (systemInfo) {
    lines.push("", "Rendszerinformacio:");
    Object.entries(systemInfo).forEach(([key, value]) => lines.push(`- ${prettifyKey(key)}: ${value}`));
  }

  if (screenshot) {
    lines.push("", `Csatolt screenshot: ${screenshot.filename} (${formatBytes(screenshot.bytes)})`);
  }

  return lines.join("\n").trim();
}

function buildHtmlEmail({ category, message, contact, context, systemInfo, screenshot }) {
  return [
    "<div style=\"font-family:Arial,sans-serif;line-height:1.6;color:#0f172a\">",
    `<h2 style="margin:0 0 12px">Nova Fordito visszajelzes</h2>`,
    `<p style="margin:0 0 8px"><strong>Kategoria:</strong> ${escapeHtml(CATEGORY_LABELS[category] || CATEGORY_LABELS.bug)}</p>`,
    contact ? `<p style="margin:0 0 8px"><strong>Kapcsolat:</strong> ${escapeHtml(contact)}</p>` : "",
    context ? renderKeyValueBlock("Kontextus", context) : "",
    `<h3 style="margin:18px 0 8px">Uzenet</h3>`,
    `<pre style="margin:0;padding:14px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;white-space:pre-wrap;font-family:Arial,sans-serif">${escapeHtml(message)}</pre>`,
    systemInfo ? renderKeyValueBlock("Rendszerinformacio", systemInfo) : "",
    screenshot ? `<p style="margin:18px 0 0"><strong>Csatolt screenshot:</strong> ${escapeHtml(screenshot.filename)} (${escapeHtml(formatBytes(screenshot.bytes))})</p>` : "",
    "</div>"
  ].filter(Boolean).join("");
}

function renderKeyValueBlock(title, record) {
  const items = Object.entries(record)
    .map(([key, value]) => `<li><strong>${escapeHtml(prettifyKey(key))}:</strong> ${escapeHtml(value)}</li>`)
    .join("");

  return [
    `<h3 style="margin:18px 0 8px">${escapeHtml(title)}</h3>`,
    `<ul style="margin:0;padding-left:18px">${items}</ul>`
  ].join("");
}

function prettifyKey(value) {
  return String(value || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeFilename(value) {
  const clean = String(value || "")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return clean || "feedback-screenshot.jpg";
}

function estimateBase64Size(base64) {
  const clean = String(base64 || "").trim();
  if (!clean) return 0;
  const padding = clean.endsWith("==") ? 2 : clean.endsWith("=") ? 1 : 0;
  return Math.floor((clean.length * 3) / 4) - padding;
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function formatBytes(value) {
  const bytes = Number(value) || 0;
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
};
