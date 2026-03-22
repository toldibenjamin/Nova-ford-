const STORAGE_KEY = "nova-fordito-settings";
const ENDPOINTS = ["https://translate.argosopentech.com", "https://libretranslate.com"];
const PLACEHOLDER_TEXT = "Itt jelenik meg a leford\u00EDtott sz\u00F6veg.";
const PLACEHOLDER_DOC = "Itt jelenik meg a leford\u00EDtott dokumentum.";
const GOOGLE_MAP = { auto: "auto", he: "iw", nb: "no", pb: "pt-BR", zh: "zh-CN", zt: "zh-TW" };
const OCR_MAP = { auto: "eng+hun+deu+fra+spa+ita+por+nld+pol+tur+rus+jpn+kor+chi_sim", en: "eng", hu: "hun", de: "deu", fr: "fra", es: "spa", it: "ita", pt: "por", pb: "por", nl: "nld", pl: "pol", tr: "tur", ru: "rus", ja: "jpn", ko: "kor", zh: "chi_sim", zt: "chi_tra" };
const OVERRIDES = { auto: "Automatikus felismer\u00E9s", pb: "Portug\u00E1l (Braz\u00EDlia)", zt: "K\u00EDnai (hagyom\u00E1nyos)" };
const HINTS = { hu: ["szia", "k\u00F6sz\u00F6n\u00F6m", "\u00E9s", "vagy"], en: ["hello", "thank", "and", "you"], de: ["hallo", "danke"], fr: ["bonjour", "merci"], es: ["hola", "gracias"], it: ["ciao", "grazie"] };
const LANGS = ["auto", "sq", "ar", "az", "eu", "bn", "bg", "ca", "zt", "zh", "cs", "da", "nl", "en", "eo", "et", "fi", "fr", "gl", "de", "el", "he", "hi", "hu", "id", "ga", "it", "ja", "ko", "ky", "lv", "lt", "ms", "nb", "fa", "pl", "pt", "pb", "ro", "ru", "sk", "sl", "es", "sv", "tl", "th", "tr", "uk", "ur"];
const NAMES = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames(["hu"], { type: "language" }) : null;

const el = {
  modeText: q("#mode-text"), modeImage: q("#mode-image"), modeDocument: q("#mode-document"),
  textPanel: q("#text-mode-panel"), imagePanel: q("#image-mode-panel"), documentPanel: q("#document-mode-panel"),
  source: q("#source-language"), target: q("#target-language"), imageSource: q("#image-source-language"), imageTarget: q("#image-target-language"),
  docSource: q("#document-source-language"), docTarget: q("#document-target-language"),
  sourceText: q("#source-text"), translatedText: q("#translated-text"), sourceCounter: q("#source-counter"), detectedLanguage: q("#detected-language"),
  translationMeta: q("#translation-meta"), connectionState: q("#connection-state"), status: q("#status-pill"),
  translate: q("#translate-button"), swap: q("#swap-languages"), paste: q("#paste-input"), mic: q("#voice-input"), clear: q("#clear-input"), speak: q("#speak-output"), copyFloat: q("#copy-output-floating"),
  imageSwap: q("#image-swap-languages"), imageRun: q("#run-image-translation"), imageInput: q("#image-input"), imageDropzone: q("#image-dropzone"), imageEmpty: q("#image-dropzone-empty"), imageFilled: q("#image-dropzone-filled"), imagePreview: q("#image-preview"), imageCanvas: q("#image-translated-canvas"), pickImage: q("#pick-image"), pasteImage: q("#paste-image"), replaceImage: q("#replace-image"), removeImage: q("#remove-image"), imageActions: q("#image-result-actions"), showOriginalImage: q("#show-original-image"), showTranslatedImage: q("#show-translated-image"), downloadImage: q("#download-translated-image"), copyImage: q("#copy-image-to-clipboard"),
  docSwap: q("#document-swap-languages"), docRun: q("#run-document-translation"), docInput: q("#document-input"), docDropzone: q("#document-dropzone"), docEmpty: q("#document-dropzone-empty"), docFilled: q("#document-dropzone-filled"), pickDoc: q("#pick-document"), replaceDoc: q("#replace-document"), removeDoc: q("#remove-document"), docFileName: q("#document-file-name"), docSourceText: q("#document-source-text"), docTranslatedText: q("#document-translated-text"), docMeta: q("#document-translation-meta"), copyDoc: q("#copy-document-output"), downloadDoc: q("#download-document-output"),
  themeCycle: q("#theme-cycle"), settingsToggle: q("#settings-toggle"), settingsDrawer: q("#settings-drawer"), settingsOverlay: q("#settings-overlay"), settingsClose: q("#settings-close"), live: q("#setting-live-translate"), themeOptions: [...document.querySelectorAll("[data-theme-option]")]
};

const state = {
  settings: loadSettings(), mode: "text", timer: 0, req: 0, imageReq: 0, docReq: 0, lastDetected: "",
  image: { file: null, dataUrl: "", translatedDataUrl: "" },
  doc: { file: null, text: "", translatedText: "", downloadUrl: "" }
};

init();

function init() {
  populateSelects();
  setupLanguageSelects();
  bind();
  applySettings();
  closeSettings();
  setMode("text");
  resetText();
  resetImage();
  resetDoc();
  updateCounter();
  updateHint();
  el.mic.textContent = "Mikrofon";
}

function q(s) { return document.querySelector(s); }
function on(node, ev, fn) { if (node) node.addEventListener(ev, fn); }

function bind() {
  on(el.modeText, "click", () => setMode("text")); on(el.modeImage, "click", () => setMode("image")); on(el.modeDocument, "click", () => setMode("document"));
  on(el.sourceText, "input", () => { updateCounter(); updateHint(); scheduleTranslate(); });
  on(el.source, "change", () => { updateHint(); scheduleTranslate(); }); on(el.target, "change", () => scheduleTranslate());
  on(el.translate, "click", () => void runTranslate(true)); on(el.swap, "click", swapText); on(el.paste, "click", pasteText); on(el.clear, "click", clearText); on(el.mic, "click", () => setStatus("A mikrofon funkci\u00F3 most ki van kapcsolva", "error")); on(el.copyFloat, "click", () => copyText(renderedText())); on(el.speak, "click", speakText);
  on(el.imageSwap, "click", () => swapSelects(el.imageSource, el.imageTarget, true)); on(el.pickImage, "click", () => el.imageInput.click()); on(el.replaceImage, "click", () => el.imageInput.click()); on(el.removeImage, "click", clearImage); on(el.imageInput, "change", e => { const f = [...(e.target.files || [])][0]; if (f) void setImage(f); }); on(el.pasteImage, "click", pasteImageFromClipboard); on(el.imageRun, "click", () => void runImageTranslate()); on(el.showOriginalImage, "click", () => showImage(false)); on(el.showTranslatedImage, "click", () => showImage(true)); on(el.copyImage, "click", () => void copyCurrentImage());
  on(el.imageDropzone, "dragover", e => e.preventDefault()); on(el.imageDropzone, "drop", e => { e.preventDefault(); const f = [...(e.dataTransfer?.files || [])].find(x => x.type.startsWith("image/")); if (f) void setImage(f); });
  on(el.docSwap, "click", () => swapSelects(el.docSource, el.docTarget, true)); on(el.pickDoc, "click", () => el.docInput.click()); on(el.replaceDoc, "click", () => el.docInput.click()); on(el.removeDoc, "click", clearDoc); on(el.docInput, "change", e => { const f = [...(e.target.files || [])][0]; if (f) void setDoc(f); }); on(el.docDropzone, "dragover", e => e.preventDefault()); on(el.docDropzone, "drop", e => { e.preventDefault(); const f = [...(e.dataTransfer?.files || [])][0]; if (f) void setDoc(f); }); on(el.docRun, "click", () => void runDocTranslate()); on(el.copyDoc, "click", () => copyText(el.docTranslatedText.textContent.trim()));
  on(el.themeCycle, "click", cycleTheme); on(el.settingsToggle, "click", openSettings); on(el.settingsOverlay, "click", closeSettings); on(el.settingsClose, "click", closeSettings); on(el.live, "change", e => { state.settings.liveTranslate = !!e.target.checked; saveSettings(); applySettings(); if (state.settings.liveTranslate) scheduleTranslate(); });
  el.themeOptions.forEach(btn => on(btn, "click", () => { state.settings.theme = btn.dataset.themeOption === "light" ? "light" : "dark"; saveSettings(); applySettings(); }));
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeAllSearchableSelects(); closeSettings(); } });
  document.addEventListener("click", e => { if (!(e.target instanceof Element) || e.target.closest(".language-select")) return; closeAllSearchableSelects(); });
  document.addEventListener("paste", e => { if (state.mode !== "image") return; const item = [...(e.clipboardData?.items || [])].find(x => x.type.startsWith("image/")); const f = item ? item.getAsFile() : null; if (f) { e.preventDefault(); void setImage(f); } });
  window.addEventListener("beforeunload", revokeDocUrl);
}

function loadSettings() { try { const raw = localStorage.getItem(STORAGE_KEY); const parsed = raw ? JSON.parse(raw) : {}; return { theme: parsed.theme === "light" ? "light" : "dark", liveTranslate: parsed.liveTranslate !== false }; } catch { return { theme: "dark", liveTranslate: true }; } }
function saveSettings() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings)); }
function applySettings() { document.documentElement.dataset.theme = state.settings.theme; document.documentElement.dataset.density = "compact"; document.documentElement.dataset.surface = "glass"; el.live.checked = state.settings.liveTranslate; el.themeCycle.textContent = `T\u00E9ma: ${state.settings.theme === "dark" ? "S\u00F6t\u00E9t" : "Vil\u00E1gos"}`; el.themeOptions.forEach(btn => btn.classList.toggle("is-active", btn.dataset.themeOption === state.settings.theme)); }
function cycleTheme() { state.settings.theme = state.settings.theme === "dark" ? "light" : "dark"; saveSettings(); applySettings(); }
function openSettings() { el.settingsDrawer.classList.add("is-open"); el.settingsDrawer.setAttribute("aria-hidden", "false"); document.body.classList.add("drawer-open"); }
function closeSettings() { el.settingsDrawer.classList.remove("is-open"); el.settingsDrawer.setAttribute("aria-hidden", "true"); document.body.classList.remove("drawer-open"); }

function populateSelects() { const langs = buildLanguages(); fill(el.source, langs, true, "auto"); fill(el.target, langs, false, "hu"); fill(el.imageSource, langs, true, "auto"); fill(el.imageTarget, langs, false, "hu"); fill(el.docSource, langs, true, "auto"); fill(el.docTarget, langs, false, "hu"); }
function buildLanguages() { return LANGS.map(code => ({ code, label: label(code) })).sort((a, b) => a.code === "auto" ? -1 : b.code === "auto" ? 1 : a.label.localeCompare(b.label, "hu")); }
function fill(select, langs, allowAuto, value) { select.innerHTML = langs.filter(x => allowAuto || x.code !== "auto").map(x => `<option value="${x.code}">${x.label}</option>`).join(""); select.value = value; syncSearchableSelect(select); renderSearchableOptions(select, ""); }
function label(code) { if (OVERRIDES[code]) return OVERRIDES[code]; if (!NAMES) return code.toUpperCase(); try { const c = code === "pb" ? "pt-BR" : code === "zt" ? "zh-Hant" : code; const n = NAMES.of(c); return n ? n.charAt(0).toLocaleUpperCase("hu-HU") + n.slice(1) : code.toUpperCase(); } catch { return code.toUpperCase(); } }

function setupLanguageSelects() {
  document.querySelectorAll("select[data-searchable-language]").forEach(select => {
    if (!select._searchable) createSearchableSelect(select);
    renderSearchableOptions(select, "");
    syncSearchableSelect(select);
  });
}

function createSearchableSelect(select) {
  select.classList.add("language-native-select");

  const wrapper = document.createElement("div");
  wrapper.className = "language-select";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "language-select__trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");

  const triggerLabel = document.createElement("span");
  triggerLabel.className = "language-select__trigger-label";

  const triggerAi = document.createElement("span");
  triggerAi.className = "language-select__trigger-ai";
  triggerAi.textContent = "AI";
  triggerAi.hidden = true;

  const triggerIcon = document.createElement("span");
  triggerIcon.className = "language-select__trigger-icon";
  triggerIcon.setAttribute("aria-hidden", "true");
  triggerIcon.textContent = "v";

  trigger.append(triggerLabel, triggerAi, triggerIcon);

  const panel = document.createElement("div");
  panel.className = "language-select__panel";
  panel.hidden = true;

  const search = document.createElement("input");
  search.type = "search";
  search.className = "language-select__search";
  search.placeholder = "Nyelv keres\u00E9se";
  search.autocomplete = "off";
  search.spellcheck = false;

  const options = document.createElement("div");
  options.className = "language-select__options";
  options.setAttribute("role", "listbox");

  panel.append(search, options);

  const parent = select.parentNode;
  parent.insertBefore(wrapper, select);
  wrapper.append(select, trigger, panel);

  select._searchable = { wrapper, trigger, triggerLabel, triggerAi, panel, search, options };

  on(trigger, "click", event => {
    event.preventDefault();
    if (wrapper.classList.contains("is-open")) closeSearchableSelect(select);
    else openSearchableSelect(select);
  });

  on(search, "input", () => renderSearchableOptions(select, search.value));
  on(search, "keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearchableSelect(select);
      trigger.focus();
    }
  });

  on(select, "change", () => {
    syncSearchableSelect(select);
    renderSearchableOptions(select, search.value);
  });
}

function renderSearchableOptions(select, query) {
  if (!select?._searchable) return;
  const { options } = select._searchable;
  const searchTerm = normalizeSearch(query);
  const matches = [...select.options].filter(option => !option.disabled && normalizeSearch(option.textContent).includes(searchTerm));

  options.innerHTML = "";

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "language-select__empty";
    empty.textContent = "Nincs tal\u00E1lat.";
    options.appendChild(empty);
    return;
  }

  matches.forEach(option => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-select__option";
    button.setAttribute("role", "option");

    const optionLabel = document.createElement("span");
    optionLabel.className = "language-select__option-label";
    optionLabel.textContent = option.textContent;
    button.append(optionLabel);

    if (option.value === "auto") {
      const optionAi = document.createElement("span");
      optionAi.className = "language-select__option-ai";
      optionAi.textContent = "AI";
      button.append(optionAi);
    }

    const selected = option.value === select.value;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-selected", String(selected));
    on(button, "click", () => {
      const changed = select.value !== option.value;
      select.value = option.value;
      syncSearchableSelect(select);
      closeSearchableSelect(select);
      if (changed) select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    options.appendChild(button);
  });
}

function syncSearchableSelect(select) {
  if (!select?._searchable) return;
  const selectedOption = select.options[select.selectedIndex];
  select._searchable.triggerLabel.textContent = selectedOption ? selectedOption.textContent : "";
  select._searchable.triggerAi.hidden = !selectedOption || selectedOption.value !== "auto";
}

function openSearchableSelect(select) {
  if (!select?._searchable) return;
  closeAllSearchableSelects(select);
  const { wrapper, trigger, panel, search } = select._searchable;
  renderSearchableOptions(select, "");
  search.value = "";
  wrapper.classList.add("is-open");
  panel.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => {
    search.focus({ preventScroll: true });
    search.select();
  });
}

function closeSearchableSelect(select) {
  if (!select?._searchable) return;
  const { wrapper, trigger, panel, search } = select._searchable;
  wrapper.classList.remove("is-open");
  panel.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  search.value = "";
}

function closeAllSearchableSelects(except = null) {
  document.querySelectorAll("select[data-searchable-language]").forEach(select => {
    if (select !== except) closeSearchableSelect(select);
  });
}

function normalizeSearch(value) {
  return String(value || "")
    .toLocaleLowerCase("hu-HU")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function setMode(mode) { state.mode = mode; panel(el.modeText, el.textPanel, mode === "text"); panel(el.modeImage, el.imagePanel, mode === "image"); panel(el.modeDocument, el.documentPanel, mode === "document"); }
function panel(button, pane, active) { button.classList.toggle("is-active", active); button.setAttribute("aria-selected", String(active)); pane.hidden = !active; }
function updateCounter() { const raw = el.sourceText.value; const trimmed = raw.trim(); el.sourceCounter.textContent = `${raw.length} karakter / ${trimmed ? trimmed.split(/\s+/).length : 0} sz\u00F3`; }
function updateHint() { if (el.source.value !== "auto") { el.detectedLanguage.textContent = `Forr\u00E1s: ${label(el.source.value)}`; return; } const detected = detect(el.sourceText.value); el.detectedLanguage.textContent = detected ? `Felismerve: ${label(detected)}` : "Automatikus felismer\u00E9s akt\u00EDv"; }
function resetText() { el.translatedText.textContent = PLACEHOLDER_TEXT; el.translationMeta.textContent = state.settings.liveTranslate ? "V\u00E1lassz nyelvet, majd kezdd el a sz\u00F6veget." : "Az automatikus m\u00F3d ki van kapcsolva. Kattints a Ford\u00EDt\u00E1s gombra."; el.connectionState.textContent = "Publikus ford\u00EDt\u00F3 szolg\u00E1ltat\u00E1sokkal"; el.translatedText.classList.remove("is-loading", "is-fresh"); setStatus("K\u00E9sz a ford\u00EDt\u00E1sra", ""); }
function renderedText() { const text = el.translatedText.textContent.trim(); return text === PLACEHOLDER_TEXT ? "" : text; }
function clearText() { state.req += 1; el.sourceText.value = ""; updateCounter(); updateHint(); resetText(); }
function swapText() { const s = el.source.value; const t = el.target.value; const src = el.sourceText.value; const out = renderedText(); el.source.value = s === "auto" ? t : t; el.target.value = s === "auto" ? (state.lastDetected || "en") : s; syncSearchableSelect(el.source); syncSearchableSelect(el.target); if (out) { el.sourceText.value = out; el.translatedText.textContent = src || PLACEHOLDER_TEXT; } updateCounter(); updateHint(); scheduleTranslate(); }
function swapSelects(source, target, allowAuto) { const a = source.value; const b = target.value; source.value = allowAuto && b === "auto" ? "hu" : b; target.value = a === "auto" ? "en" : a; syncSearchableSelect(source); syncSearchableSelect(target); }
function scheduleTranslate() { if (!state.settings.liveTranslate) return; clearTimeout(state.timer); state.timer = window.setTimeout(() => void runTranslate(false), 350); }
async function runTranslate(force) { const text = el.sourceText.value.trim(); if (!text) return resetText(); if (!force && !state.settings.liveTranslate) return; const req = ++state.req; setLoading(true); setStatus("Ford\u00EDt\u00E1s folyamatban", "busy"); try { const result = await translateLarge(text, el.source.value, el.target.value); if (req !== state.req) return; state.lastDetected = result.detectedLanguage || state.lastDetected; el.translatedText.textContent = result.translatedText || PLACEHOLDER_TEXT; el.translatedText.classList.remove("is-loading", "is-fresh"); void el.translatedText.offsetWidth; el.translatedText.classList.add("is-fresh"); el.translationMeta.textContent = `${label(result.detectedLanguage || el.source.value)} -> ${label(el.target.value)} / ${result.service}`; el.connectionState.textContent = `Friss\u00EDtve: ${time(new Date())}`; updateHint(); setStatus("Ford\u00EDt\u00E1s k\u00E9sz", "success"); } catch { if (req !== state.req) return; el.translatedText.textContent = "A ford\u00EDt\u00E1s most nem \u00E9rhet\u0151 el. Pr\u00F3b\u00E1ld meg k\u00E9s\u0151bb \u00FAjra."; el.translationMeta.textContent = "Nem siker\u00FClt el\u00E9rni a ford\u00EDt\u00F3 szolg\u00E1ltat\u00E1st."; el.connectionState.textContent = "Kapcsol\u00F3d\u00E1si hiba"; setStatus("Ford\u00EDt\u00E1si hiba", "error"); } finally { if (req === state.req) setLoading(false); } }
function setLoading(loading) { el.translate.disabled = loading; el.translate.textContent = loading ? "Ford\u00EDt\u00E1s..." : "Ford\u00EDt\u00E1s"; el.translatedText.classList.toggle("is-loading", loading); }
async function pasteText() { try { const text = await navigator.clipboard.readText(); if (!text) return setStatus("A v\u00E1g\u00F3lap most \u00FCres", "error"); el.sourceText.value = text; updateCounter(); updateHint(); scheduleTranslate(); setStatus("Sz\u00F6veg beillesztve", "success"); } catch { setStatus("A beilleszt\u00E9s nem siker\u00FClt", "error"); } }
async function copyText(text) { const value = String(text || "").trim(); if (!value) return setStatus("Nincs mit m\u00E1solni", "error"); try { await navigator.clipboard.writeText(value); setStatus("Kim\u00E1solva a v\u00E1g\u00F3lapra", "success"); } catch { const t = document.createElement("textarea"); t.value = value; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); setStatus("Kim\u00E1solva a v\u00E1g\u00F3lapra", "success"); } catch { setStatus("A m\u00E1sol\u00E1s nem siker\u00FClt", "error"); } finally { t.remove(); } } }
function speakText() { const text = renderedText(); if (!text) return setStatus("M\u00E9g nincs leford\u00EDtott sz\u00F6veg", "error"); if (!("speechSynthesis" in window)) return setStatus("A felolvas\u00E1s itt nem t\u00E1mogatott", "error"); const u = new SpeechSynthesisUtterance(text); u.lang = { hu: "hu-HU", en: "en-US", de: "de-DE", fr: "fr-FR", es: "es-ES", it: "it-IT" }[el.target.value] || navigator.language || "hu-HU"; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); setStatus("Felolvas\u00E1s elind\u00EDtva", "success"); }

async function translateLarge(text, source, target) { const clean = normalize(text); const detected = source === "auto" ? (detect(clean) || "en") : source; if (detected === target) return { translatedText: clean, detectedLanguage: detected, service: "Azonos nyelv" }; const chunks = chunk(clean, 480); const out = []; let service = "Ford\u00EDt\u00F3"; for (const part of chunks) { const res = await translateChunk(part, detected, target); out.push(res.translatedText); service = res.service; } return { translatedText: out.join("\n").trim(), detectedLanguage: detected, service }; }
async function translateChunk(text, source, target) { for (const base of ENDPOINTS) { try { const r = await fetch(`${base}/translate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ q: text, source, target, format: "text" }) }); if (!r.ok) throw new Error(); const d = await r.json(); if (!d.translatedText) throw new Error(); return { translatedText: String(d.translatedText).trim(), service: "LibreTranslate" }; } catch {} } const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(`${source}|${target}`)}`; const r = await fetch(url); if (!r.ok) throw new Error(); const d = await r.json(); const translatedText = String(d.responseData?.translatedText || "").trim(); if (!translatedText) throw new Error(); return { translatedText, service: "MyMemory" }; }
function detect(text) { const value = compare(text); if (!value) return ""; let best = "", score = 0; Object.entries(HINTS).forEach(([code, words]) => { const s = words.reduce((n, word) => n + (value.includes(compare(word)) ? 1 : 0), 0); if (s > score) { score = s; best = code; } }); return best; }
function normalize(v) { return String(v || "").replace(/\r/g, "").replace(/\t/g, " ").replace(/[ ]{2,}/g, " ").trim(); }
function compare(v) { return normalize(v).toLocaleLowerCase("hu-HU").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function chunk(text, max) { if (text.length <= max) return [text]; const parts = text.split(/(?<=[.!?])\s+|\n{2,}/).map(x => x.trim()).filter(Boolean); const out = []; let current = ""; parts.forEach(part => { const candidate = current ? `${current} ${part}` : part; if (candidate.length <= max) { current = candidate; return; } if (current) out.push(current); if (part.length <= max) { current = part; return; } for (let i = 0; i < part.length; i += max) out.push(part.slice(i, i + max)); current = ""; }); if (current) out.push(current); return out; }
function time(v) { return new Intl.DateTimeFormat("hu-HU", { hour: "2-digit", minute: "2-digit" }).format(v instanceof Date ? v : new Date(v)); }
function setStatus(message, tone) { el.status.textContent = message; el.status.classList.remove("is-busy", "is-success", "is-error"); if (tone) el.status.classList.add(`is-${tone}`); }

async function setImage(file) { if (!file.type.startsWith("image/")) return setStatus("Csak k\u00E9pf\u00E1jl t\u00F6lthet\u0151 fel", "error"); state.image = { file, dataUrl: await fileToDataUrl(file), translatedDataUrl: "" }; el.imagePreview.src = state.image.dataUrl; el.imageEmpty.hidden = true; el.imageFilled.hidden = false; el.imageActions.hidden = true; showImage(false); setStatus("K\u00E9p bet\u00F6ltve", "success"); }
function clearImage() { state.imageReq += 1; resetImage(); setStatus("K\u00E9p t\u00F6r\u00F6lve", "success"); }
function resetImage() { state.image = { file: null, dataUrl: "", translatedDataUrl: "" }; el.imageInput.value = ""; el.imagePreview.removeAttribute("src"); el.imageEmpty.hidden = false; el.imageFilled.hidden = true; el.imageActions.hidden = true; el.imagePreview.hidden = false; el.imageCanvas.hidden = true; el.downloadImage.removeAttribute("href"); }
async function pasteImageFromClipboard() { try { const items = await navigator.clipboard.read(); for (const item of items) { const type = item.types.find(x => x.startsWith("image/")); if (!type) continue; const blob = await item.getType(type); await setImage(new File([blob], "v\u00E1g\u00F3lap-k\u00E9p.png", { type: blob.type })); return; } setStatus("Nem tal\u00E1ltam k\u00E9pet a v\u00E1g\u00F3lapon", "error"); } catch { setStatus("A k\u00E9p beilleszt\u00E9se nem siker\u00FClt", "error"); } }
async function runImageTranslate() { if (!state.image.dataUrl) return setStatus("El\u0151sz\u00F6r t\u00F6lts fel egy k\u00E9pet", "error"); if (!window.Tesseract) return setStatus("A k\u00E9pfeldolgoz\u00F3 most nem \u00E9rhet\u0151 el", "error"); const req = ++state.imageReq; el.imageRun.disabled = true; el.imageRun.textContent = "Feldolgoz\u00E1s..."; setStatus("K\u00E9p feldolgoz\u00E1sa folyamatban", "busy"); try { const lang = OCR_MAP[el.imageSource.value] || OCR_MAP.auto; const ocr = await window.Tesseract.recognize(state.image.dataUrl, lang); const text = normalize(ocr?.data?.text || ""); if (!text) throw new Error("Nem tal\u00E1ltam sz\u00F6veget a k\u00E9pen"); const result = await translateLarge(text, el.imageSource.value, el.imageTarget.value); if (req !== state.imageReq) return; state.image.translatedDataUrl = await overlayImage(state.image.dataUrl, result.translatedText); el.downloadImage.href = state.image.translatedDataUrl; el.imageActions.hidden = false; showImage(true); setStatus("A k\u00E9p ford\u00EDt\u00E1sa elk\u00E9sz\u00FClt", "success"); } catch (error) { setStatus(error.message || "A k\u00E9p ford\u00EDt\u00E1sa nem siker\u00FClt", "error"); } finally { if (req === state.imageReq) { el.imageRun.disabled = false; el.imageRun.textContent = "K\u00E9p ford\u00EDt\u00E1sa"; } } }
async function overlayImage(imageUrl, text) { const image = await loadImage(imageUrl); const c = el.imageCanvas; const x = c.getContext("2d"); const m = 24; c.width = image.naturalWidth; c.height = image.naturalHeight; x.clearRect(0, 0, c.width, c.height); x.drawImage(image, 0, 0, c.width, c.height); const fs = Math.max(18, Math.round(c.width / 28)); x.font = `700 ${fs}px Manrope, sans-serif`; x.textBaseline = "top"; const lines = wrap(x, text, c.width - m * 2 - 36); const lh = Math.round(fs * 1.35); const h = Math.min(c.height - m * 2, lines.length * lh + 36); x.fillStyle = document.documentElement.dataset.theme === "dark" ? "rgba(7, 14, 25, 0.84)" : "rgba(255,255,255,0.9)"; rounded(x, m, m, c.width - m * 2, h, 24); x.fill(); x.fillStyle = document.documentElement.dataset.theme === "dark" ? "#eef4ff" : "#132035"; let y = m + 18; lines.forEach(line => { if (y + lh <= m + h - 12) { x.fillText(line, m + 18, y); y += lh; } }); return c.toDataURL("image/png"); }
function wrap(ctx, text, maxWidth) { const words = String(text || "").split(/\s+/).filter(Boolean); if (!words.length) return [""]; const lines = []; let current = words[0]; for (let i = 1; i < words.length; i += 1) { const candidate = `${current} ${words[i]}`; if (ctx.measureText(candidate).width <= maxWidth) current = candidate; else { lines.push(current); current = words[i]; } } lines.push(current); return lines; }
function rounded(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function showImage(translated) { el.imagePreview.hidden = !!translated; el.imageCanvas.hidden = !translated; el.showOriginalImage.classList.toggle("text-button--accent", !translated); el.showTranslatedImage.classList.toggle("text-button--accent", !!translated); }
async function copyCurrentImage() {
  const source = el.imageCanvas.hidden ? state.image.dataUrl : state.image.translatedDataUrl;
  if (!source) return setStatus("Nincs kim\u00E1solhat\u00F3 k\u00E9p", "error");

  try {
    const blob = await dataUrlToBlob(source);

    if (navigator.clipboard?.write && typeof ClipboardItem !== "undefined") {
      try {
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        setStatus("K\u00E9p kim\u00E1solva", "success");
        return;
      } catch {}
    }

    if (await legacyCopyImageElement(source)) {
      setStatus("K\u00E9p kim\u00E1solva", "success");
      return;
    }

    setStatus("A b\u00F6ng\u00E9sz\u0151 itt nem engedi a k\u00E9pm\u00E1sol\u00E1st", "error");
  } catch {
    setStatus("A k\u00E9pm\u00E1sol\u00E1s nem siker\u00FClt", "error");
  }
}

async function setDoc(file) { const text = normalizeDocument(await fileToText(file)); if (!text) return setStatus("Nem tal\u00E1ltam ford\u00EDthat\u00F3 sz\u00F6veget", "error"); revokeDocUrl(); state.doc = { file, text, translatedText: "", downloadUrl: "" }; el.docEmpty.hidden = true; el.docFilled.hidden = false; el.docFileName.textContent = file.name; el.docSourceText.textContent = text; el.docTranslatedText.textContent = PLACEHOLDER_DOC; el.docMeta.textContent = "A dokumentum k\u00E9szen \u00E1ll a ford\u00EDt\u00E1sra."; el.downloadDoc.removeAttribute("href"); setStatus("Dokumentum bet\u00F6ltve", "success"); }
function clearDoc() { state.docReq += 1; resetDoc(); setStatus("Dokumentum t\u00F6r\u00F6lve", "success"); }
function resetDoc() { revokeDocUrl(); state.doc = { file: null, text: "", translatedText: "", downloadUrl: "" }; el.docInput.value = ""; el.docEmpty.hidden = false; el.docFilled.hidden = true; el.docFileName.textContent = "Nincs kiv\u00E1lasztott f\u00E1jl"; el.docSourceText.textContent = "Itt jelenik meg a dokumentumb\u00F3l beolvasott sz\u00F6veg."; el.docTranslatedText.textContent = PLACEHOLDER_DOC; el.docMeta.textContent = "A dokumentum ford\u00EDt\u00E1s\u00E1nak \u00E1llapota itt jelenik meg."; el.downloadDoc.removeAttribute("href"); }
async function runDocTranslate() { if (!state.doc.text) return setStatus("El\u0151sz\u00F6r v\u00E1lassz dokumentumot", "error"); const req = ++state.docReq; el.docRun.disabled = true; el.docRun.textContent = "Ford\u00EDt\u00E1s..."; setStatus("Dokumentum ford\u00EDt\u00E1sa folyamatban", "busy"); try { const result = await translateDocument(state.doc.text, el.docSource.value, el.docTarget.value); if (req !== state.docReq) return; state.doc.translatedText = result.translatedText; el.docTranslatedText.textContent = result.translatedText; el.docMeta.textContent = `${label(result.detectedLanguage || el.docSource.value)} -> ${label(el.docTarget.value)} / ${result.service}`; revokeDocUrl(); const blob = new Blob([state.doc.translatedText], { type: "text/plain;charset=utf-8" }); state.doc.downloadUrl = URL.createObjectURL(blob); el.downloadDoc.href = state.doc.downloadUrl; setStatus("Dokumentum ford\u00EDt\u00E1sa k\u00E9sz", "success"); } catch { setStatus("A dokumentum ford\u00EDt\u00E1sa nem siker\u00FClt", "error"); } finally { if (req === state.docReq) { el.docRun.disabled = false; el.docRun.textContent = "Dokumentum ford\u00EDt\u00E1sa"; } } }
function revokeDocUrl() { if (state.doc.downloadUrl) { URL.revokeObjectURL(state.doc.downloadUrl); state.doc.downloadUrl = ""; } }

async function translateDocument(text, source, target) { const paragraphs = normalizeDocument(text).split(/\n{2,}/).map(part => part.trim()).filter(Boolean); if (paragraphs.length <= 1) { return translateLarge(text, source, target); } const out = []; let detected = ""; let service = "Ford\u00EDt\u00F3"; for (const part of paragraphs) { const result = await translateLarge(part, source, target); out.push(result.translatedText); detected = detected || result.detectedLanguage; service = result.service; } return { translatedText: out.join("\n\n"), detectedLanguage: detected, service }; }
function normalizeDocument(value) { return String(value || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\t/g, "    ").replace(/\n{3,}/g, "\n\n").trim(); }

function fileToDataUrl(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result || "")); reader.onerror = () => reject(reader.error || new Error("F\u00E1jl hiba")); reader.readAsDataURL(file); }); }
function fileToText(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result || "")); reader.onerror = () => reject(reader.error || new Error("F\u00E1jl hiba")); reader.readAsText(file); }); }
function loadImage(source) { return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error("A k\u00E9p nem t\u00F6lthet\u0151 be")); image.src = source; }); }
async function dataUrlToBlob(dataUrl) { const response = await fetch(dataUrl); return await response.blob(); }

async function legacyCopyImageElement(dataUrl) {
  return await new Promise(resolve => {
    const host = document.createElement("div");
    host.contentEditable = "true";
    host.setAttribute("aria-hidden", "true");
    host.style.position = "fixed";
    host.style.left = "-9999px";
    host.style.top = "0";
    host.style.opacity = "0";
    host.style.pointerEvents = "none";

    const img = document.createElement("img");
    img.src = dataUrl;
    img.alt = "";
    host.appendChild(img);
    document.body.appendChild(host);

    const finish = value => {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      host.remove();
      resolve(value);
    };

    const tryCopy = () => {
      try {
        const range = document.createRange();
        range.selectNode(img);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        finish(document.execCommand("copy"));
      } catch {
        finish(false);
      }
    };

    if (img.complete) {
      tryCopy();
      return;
    }

    img.onload = () => tryCopy();
    img.onerror = () => finish(false);
  });
}

