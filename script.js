const STORAGE_KEYS = {
  settings: "nova-fordito-settings"
};

const TRANSLATION_SERVICE_BASE_URLS = [
  "https://translate.argosopentech.com",
  "https://libretranslate.com"
];

const LANGUAGE_LABEL_OVERRIDES = {
  auto: "Automatikus felismerés",
  pb: "Portugál (Brazília)",
  zt: "Kínai (hagyományos)"
};

const FALLBACK_LANGUAGE_CODES = [
  "auto",
  "sq",
  "ar",
  "az",
  "eu",
  "bn",
  "bg",
  "ca",
  "zt",
  "zh",
  "cs",
  "da",
  "nl",
  "en",
  "eo",
  "et",
  "fi",
  "fr",
  "gl",
  "de",
  "el",
  "he",
  "hi",
  "hu",
  "id",
  "ga",
  "it",
  "ja",
  "ko",
  "ky",
  "lv",
  "lt",
  "ms",
  "nb",
  "fa",
  "pl",
  "pt",
  "pb",
  "ro",
  "ru",
  "sk",
  "sl",
  "es",
  "sv",
  "tl",
  "th",
  "tr",
  "uk",
  "ur"
];

const languageDisplayNames = typeof Intl.DisplayNames === "function"
  ? new Intl.DisplayNames(["hu"], { type: "language" })
  : null;

const PHRASEBOOK = [
  {
    source: "hello, how are you today?",
    sourceLang: "en",
    targetLang: "hu",
    translated: "Szia, hogy vagy ma?"
  },
  {
    source: "hello",
    sourceLang: "en",
    targetLang: "hu",
    translated: "Helló"
  },
  {
    source: "hi",
    sourceLang: "en",
    targetLang: "hu",
    translated: "Szia"
  },
  {
    source: "szia, ma nagyon jó az idő.",
    sourceLang: "hu",
    targetLang: "en",
    translated: "Hi, the weather is really nice today."
  },
  {
    source: "szia",
    sourceLang: "hu",
    targetLang: "en",
    translated: "Hi"
  },
  {
    source: "köszönöm",
    sourceLang: "hu",
    targetLang: "en",
    translated: "Thank you"
  },
  {
    source: "thank you",
    sourceLang: "en",
    targetLang: "hu",
    translated: "Köszönöm"
  },
  {
    source: "guten morgen, wie geht es dir?",
    sourceLang: "de",
    targetLang: "hu",
    translated: "Jó reggelt, hogy vagy?"
  },
  {
    source: "where is the nearest train station?",
    sourceLang: "en",
    targetLang: "hu",
    translated: "Hol van a legközelebbi vasútállomás?"
  }
];

const DEFAULT_SETTINGS = {
  theme: "dark",
  liveTranslate: true,
  density: "compact",
  surface: "glass"
};

const OCR_LANGUAGE_MAP = {
  auto: "eng+hun+deu+fra+spa+ita+por+nld+pol+tur+rus+jpn+kor+chi_sim",
  sq: "sqi",
  ar: "ara",
  az: "aze",
  eu: "eus",
  bn: "ben",
  bg: "bul",
  ca: "cat",
  zt: "chi_tra",
  cs: "ces",
  da: "dan",
  hu: "hun",
  en: "eng",
  de: "deu",
  el: "ell",
  he: "heb",
  hi: "hin",
  fr: "fra",
  es: "spa",
  et: "est",
  eo: "epo",
  fi: "fin",
  gl: "glg",
  it: "ita",
  id: "ind",
  ga: "gle",
  pt: "por",
  pb: "por",
  nl: "nld",
  nb: "nor",
  fa: "fas",
  pl: "pol",
  ro: "ron",
  sk: "slk",
  sl: "slv",
  sv: "swe",
  tl: "tgl",
  th: "tha",
  tr: "tur",
  ru: "rus",
  uk: "ukr",
  ur: "urd",
  ja: "jpn",
  ko: "kor",
  zh: "chi_sim",
  ky: "kir",
  lv: "lav",
  lt: "lit",
  ms: "msa"
};

const LANGUAGE_DETECTION_HINTS = {
  hu: ["szia", "köszönöm", "koszonom", "hogy", "vagy", "vagyok", "egy", "az", "és", "es", "jó", "jo", "magyar"],
  en: ["hello", "hi", "how", "are", "you", "the", "and", "where", "what", "good", "morning"],
  de: ["hallo", "guten", "morgen", "wie", "geht", "dir", "danke", "bitte", "und", "nicht"],
  fr: ["bonjour", "merci", "comment", "vous", "avec", "pour", "est", "une", "francais"],
  es: ["hola", "gracias", "como", "estas", "donde", "que", "para", "una", "buenos"],
  it: ["ciao", "grazie", "come", "stai", "dove", "buongiorno", "per", "una"],
  pt: ["ola", "obrigado", "obrigada", "como", "voce", "onde", "bom", "dia", "nao"],
  nl: ["hallo", "goedemorgen", "hoe", "gaat", "met", "jij", "waar", "dank", "een"],
  pl: ["czesc", "dzien", "dobry", "jak", "sie", "masz", "gdzie", "dziekuje", "tak", "nie"],
  tr: ["merhaba", "nasilsin", "tesekkurler", "evet", "hayir", "nerede", "bir", "ve"]
};

const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const elements = {
  modeText: document.querySelector("#mode-text"),
  modeImage: document.querySelector("#mode-image"),
  textModePanel: document.querySelector("#text-mode-panel"),
  imageModePanel: document.querySelector("#image-mode-panel"),
  sourceLanguage: document.querySelector("#source-language"),
  targetLanguage: document.querySelector("#target-language"),
  imageSourceLanguage: document.querySelector("#image-source-language"),
  imageTargetLanguage: document.querySelector("#image-target-language"),
  sourceText: document.querySelector("#source-text"),
  translatedText: document.querySelector("#translated-text"),
  copyOutputFloating: document.querySelector("#copy-output-floating"),
  sourceCounter: document.querySelector("#source-counter"),
  detectedLanguage: document.querySelector("#detected-language"),
  translationMeta: document.querySelector("#translation-meta"),
  connectionState: document.querySelector("#connection-state"),
  statusPill: document.querySelector("#status-pill"),
  translateButton: document.querySelector("#translate-button"),
  swapLanguages: document.querySelector("#swap-languages"),
  imageSwapLanguages: document.querySelector("#image-swap-languages"),
  runImageTranslation: document.querySelector("#run-image-translation"),
  clearInput: document.querySelector("#clear-input"),
  pasteInput: document.querySelector("#paste-input"),
  copyOutput: document.querySelector("#copy-output"),
  speakOutput: document.querySelector("#speak-output"),
  imageInput: document.querySelector("#image-input"),
  imageDropzone: document.querySelector("#image-dropzone"),
  imageDropzoneEmpty: document.querySelector("#image-dropzone-empty"),
  imageDropzoneFilled: document.querySelector("#image-dropzone-filled"),
  imagePreview: document.querySelector("#image-preview"),
  imageTranslatedCanvas: document.querySelector("#image-translated-canvas"),
  copyImageToClipboard: document.querySelector("#copy-image-to-clipboard"),
  imageResultActions: document.querySelector("#image-result-actions"),
  showOriginalImage: document.querySelector("#show-original-image"),
  showTranslatedImage: document.querySelector("#show-translated-image"),
  downloadTranslatedImage: document.querySelector("#download-translated-image"),
  pickImage: document.querySelector("#pick-image"),
  pasteImage: document.querySelector("#paste-image"),
  replaceImage: document.querySelector("#replace-image"),
  removeImage: document.querySelector("#remove-image"),
  themeCycle: document.querySelector("#theme-cycle"),
  settingsToggle: document.querySelector("#settings-toggle"),
  settingsDrawer: document.querySelector("#settings-drawer"),
  settingsOverlay: document.querySelector("#settings-overlay"),
  settingsClose: document.querySelector("#settings-close"),
  liveTranslateToggle: document.querySelector("#setting-live-translate")
};

let settings = loadStoredSettings();
let translateTimer = null;
let activeRequestId = 0;
let activeImageRequestId = 0;
let lastDetectedLanguage = "";
let currentMode = "text";
let availableLanguages = createLanguageCatalog(FALLBACK_LANGUAGE_CODES.map((code) => ({ code })));
const searchableLanguageControls = new Map();
let imageState = {
  file: null,
  dataUrl: "",
  translatedDataUrl: "",
  extractedText: "",
  translatedText: ""
};

initializeSearchableLanguageControls();
populateLanguageSelects();
populateImageLanguageSelects();
syncSettingsUI();
applySettings();
updateSourceCounter();
setDefaultLanguagePair();
renderOutputPlaceholder();
renderMode();
resetImageResultState();
void refreshSupportedLanguages();

elements.sourceText.addEventListener("input", () => {
  updateSourceCounter();
  refreshDetectedLanguageHint();
  scheduleTranslation();
});

elements.sourceLanguage.addEventListener("change", () => {
  syncSearchableLanguageControls();
  refreshDetectedLanguageHint();
  scheduleTranslation();
});

elements.targetLanguage.addEventListener("change", () => {
  syncSearchableLanguageControls();
  scheduleTranslation();
});

elements.imageSourceLanguage.addEventListener("change", () => {
  syncSearchableLanguageControls();
});

elements.imageTargetLanguage.addEventListener("change", () => {
  syncSearchableLanguageControls();
});

elements.modeText.addEventListener("click", () => setMode("text"));
elements.modeImage.addEventListener("click", () => setMode("image"));

elements.translateButton.addEventListener("click", () => {
  runTranslation({ force: true });
});

elements.swapLanguages.addEventListener("click", swapLanguagePair);
elements.imageSwapLanguages.addEventListener("click", swapImageLanguagePair);
elements.runImageTranslation.addEventListener("click", runImageTranslation);
elements.clearInput.addEventListener("click", clearInput);
elements.pasteInput.addEventListener("click", pasteFromClipboard);
elements.copyOutput.addEventListener("click", () => copyToClipboard(elements.translatedText.textContent.trim()));
elements.copyOutputFloating.addEventListener("click", () => copyToClipboard(elements.translatedText.textContent.trim()));
elements.speakOutput.addEventListener("click", speakTranslation);
elements.pickImage.addEventListener("click", () => elements.imageInput.click());
elements.replaceImage.addEventListener("click", () => elements.imageInput.click());
elements.removeImage.addEventListener("click", clearSelectedImage);
elements.imageInput.addEventListener("change", handleImageSelection);
elements.pasteImage.addEventListener("click", pasteImageFromClipboard);
elements.showOriginalImage.addEventListener("click", () => showImageVariant("original"));
elements.showTranslatedImage.addEventListener("click", () => showImageVariant("translated"));
elements.copyImageToClipboard.addEventListener("click", copyCurrentImageToClipboard);

elements.imageDropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

elements.imageDropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = Array.from(event.dataTransfer?.files || []).find((entry) => entry.type.startsWith("image/"));
  if (file) {
    setSelectedImage(file);
  }
});

elements.themeCycle.addEventListener("click", cycleTheme);
elements.settingsToggle.addEventListener("click", openSettingsDrawer);
elements.settingsOverlay.addEventListener("click", closeSettingsDrawer);
elements.settingsClose.addEventListener("click", closeSettingsDrawer);

elements.liveTranslateToggle.addEventListener("change", (event) => {
  settings.liveTranslate = event.target.checked;
  persistSettings();
  applySettings();
  if (settings.liveTranslate) {
    scheduleTranslation();
  }
});

document.querySelectorAll("[data-theme-option]").forEach((button) => {
  button.addEventListener("click", () => {
    settings.theme = button.dataset.themeOption;
    persistSettings();
    applySettings();
  });
});

if (typeof themeMediaQuery.addEventListener === "function") {
  themeMediaQuery.addEventListener("change", handleSystemThemeChange);
} else if (typeof themeMediaQuery.addListener === "function") {
  themeMediaQuery.addListener(handleSystemThemeChange);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && elements.settingsDrawer.classList.contains("is-open")) {
    closeSettingsDrawer();
  }
});

document.addEventListener("paste", (event) => {
  if (currentMode !== "image") {
    return;
  }

  const file = getImageFileFromClipboardEvent(event);
  if (file) {
    event.preventDefault();
    setSelectedImage(file);
  }
});

function loadStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (!raw) {
      return { ...DEFAULT_SETTINGS };
    }

    const parsedSettings = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsedSettings,
      theme: normalizeThemeSetting(parsedSettings.theme),
      density: "compact",
      surface: "glass"
    };
  } catch (error) {
    return { ...DEFAULT_SETTINGS };
  }
}

function persistSettings() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function populateLanguageSelects(selectedSource = elements.sourceLanguage.value || "auto", selectedTarget = elements.targetLanguage.value || "hu") {
  const sourceOptions = availableLanguages
    .map((language) => `<option value="${language.code}">${language.label}</option>`)
    .join("");

  const targetOptions = availableLanguages
    .filter((language) => language.code !== "auto")
    .map((language) => `<option value="${language.code}">${language.label}</option>`)
    .join("");

  elements.sourceLanguage.innerHTML = sourceOptions;
  elements.targetLanguage.innerHTML = targetOptions;
  setSelectValue(elements.sourceLanguage, selectedSource, "auto");
  setSelectValue(elements.targetLanguage, selectedTarget, "hu");
  syncSearchableLanguageControls();
}

function populateImageLanguageSelects(selectedSource = elements.imageSourceLanguage.value || "auto", selectedTarget = elements.imageTargetLanguage.value || "hu") {
  const sourceOptions = availableLanguages
    .map((language) => `<option value="${language.code}">${language.label}</option>`)
    .join("");

  const targetOptions = availableLanguages
    .filter((language) => language.code !== "auto")
    .map((language) => `<option value="${language.code}">${language.label}</option>`)
    .join("");

  elements.imageSourceLanguage.innerHTML = sourceOptions;
  elements.imageTargetLanguage.innerHTML = targetOptions;
  setSelectValue(elements.imageSourceLanguage, selectedSource, "auto");
  setSelectValue(elements.imageTargetLanguage, selectedTarget, "hu");
  syncSearchableLanguageControls();
}

function setSelectValue(selectElement, preferredValue, fallbackValue) {
  const options = Array.from(selectElement.options);
  const nextValue = options.some((option) => option.value === preferredValue)
    ? preferredValue
    : options.some((option) => option.value === fallbackValue)
      ? fallbackValue
      : options[0]?.value;

  if (nextValue) {
    selectElement.value = nextValue;
  }
}

function initializeSearchableLanguageControls() {
  const searchableSelects = [
    elements.sourceLanguage,
    elements.targetLanguage,
    elements.imageSourceLanguage,
    elements.imageTargetLanguage
  ];

  searchableSelects.forEach((selectElement) => {
    if (!selectElement) {
      return;
    }

    const control = createSearchableLanguageControl(selectElement);
    searchableLanguageControls.set(selectElement.id, control);
  });

  document.addEventListener("click", handleSearchableSelectDocumentClick);
  document.addEventListener("keydown", handleSearchableSelectDocumentKeydown);
}

function createSearchableLanguageControl(selectElement) {
  selectElement.classList.add("language-native-select");

  const wrapper = document.createElement("div");
  wrapper.className = "language-select";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "language-select__trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");

  const triggerLabel = document.createElement("span");
  triggerLabel.className = "language-select__trigger-label";
  trigger.appendChild(triggerLabel);

  const triggerIcon = document.createElement("span");
  triggerIcon.className = "language-select__trigger-icon";
  triggerIcon.setAttribute("aria-hidden", "true");
  triggerIcon.textContent = "⌄";
  trigger.appendChild(triggerIcon);

  const panel = document.createElement("div");
  panel.className = "language-select__panel";
  panel.hidden = true;

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "language-select__search";
  searchInput.placeholder = "Nyelv keresése";
  searchInput.autocomplete = "off";
  searchInput.spellcheck = false;
  searchInput.setAttribute("aria-label", "Nyelv keresése");
  panel.appendChild(searchInput);

  const optionsList = document.createElement("div");
  optionsList.className = "language-select__options";
  optionsList.setAttribute("role", "listbox");
  panel.appendChild(optionsList);

  wrapper.appendChild(trigger);
  wrapper.appendChild(panel);
  selectElement.insertAdjacentElement("afterend", wrapper);

  const control = {
    selectElement,
    wrapper,
    trigger,
    triggerLabel,
    panel,
    searchInput,
    optionsList
  };

  trigger.addEventListener("click", () => {
    toggleSearchableLanguageControl(control, !wrapper.classList.contains("is-open"));
  });

  searchInput.addEventListener("input", () => {
    renderSearchableLanguageOptions(control);
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggleSearchableLanguageControl(control, false);
      control.trigger.focus();
      return;
    }

    if (event.key === "Enter") {
      const firstOption = control.optionsList.querySelector(".language-select__option");
      if (firstOption) {
        event.preventDefault();
        firstOption.click();
      }
    }
  });

  return control;
}

function syncSearchableLanguageControls() {
  searchableLanguageControls.forEach((control) => {
    syncSearchableLanguageControl(control);
  });
}

function syncSearchableLanguageControl(control) {
  const selectedOption = control.selectElement.options[control.selectElement.selectedIndex];
  control.triggerLabel.textContent = selectedOption?.textContent?.trim() || "Válassz nyelvet";
  renderSearchableLanguageOptions(control);
}

function renderSearchableLanguageOptions(control) {
  const query = normalizeForComparison(control.searchInput.value);
  const options = Array.from(control.selectElement.options)
    .filter((option) => option.value)
    .filter((option) => {
      if (!query) {
        return true;
      }

      return normalizeForComparison(option.textContent).includes(query);
    });

  control.optionsList.innerHTML = "";

  if (options.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "language-select__empty";
    emptyState.textContent = "Nincs találat";
    control.optionsList.appendChild(emptyState);
    return;
  }

  options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "language-select__option";
    optionButton.textContent = option.textContent;
    optionButton.dataset.value = option.value;
    optionButton.setAttribute("role", "option");
    optionButton.setAttribute("aria-selected", String(option.value === control.selectElement.value));

    if (option.value === control.selectElement.value) {
      optionButton.classList.add("is-selected");
    }

    optionButton.addEventListener("click", () => {
      control.selectElement.value = option.value;
      control.selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      control.searchInput.value = "";
      syncSearchableLanguageControl(control);
      toggleSearchableLanguageControl(control, false);
    });

    control.optionsList.appendChild(optionButton);
  });
}

function toggleSearchableLanguageControl(control, shouldOpen) {
  closeAllSearchableLanguageControls(control.selectElement.id, !shouldOpen);

  control.wrapper.classList.toggle("is-open", shouldOpen);
  control.panel.hidden = !shouldOpen;
  control.trigger.setAttribute("aria-expanded", String(shouldOpen));

  if (shouldOpen) {
    control.searchInput.value = "";
    renderSearchableLanguageOptions(control);
    window.requestAnimationFrame(() => {
      control.searchInput.focus();
      control.searchInput.select();
    });
  }
}

function closeAllSearchableLanguageControls(exceptId = "", forceClose = false) {
  searchableLanguageControls.forEach((control, controlId) => {
    if (!forceClose && controlId === exceptId) {
      return;
    }

    control.wrapper.classList.remove("is-open");
    control.panel.hidden = true;
    control.trigger.setAttribute("aria-expanded", "false");
    control.searchInput.value = "";
    renderSearchableLanguageOptions(control);
  });
}

function handleSearchableSelectDocumentClick(event) {
  const clickedInsideControl = Array.from(searchableLanguageControls.values()).some((control) => control.wrapper.contains(event.target));
  if (!clickedInsideControl) {
    closeAllSearchableLanguageControls();
  }
}

function handleSearchableSelectDocumentKeydown(event) {
  if (event.key === "Escape") {
    closeAllSearchableLanguageControls();
  }
}

async function refreshSupportedLanguages() {
  try {
    const supportedLanguages = await fetchSupportedLanguages();
    if (supportedLanguages.length <= 1) {
      return;
    }

    const currentSelections = {
      source: elements.sourceLanguage.value || "auto",
      target: elements.targetLanguage.value || "hu",
      imageSource: elements.imageSourceLanguage.value || "auto",
      imageTarget: elements.imageTargetLanguage.value || "hu"
    };

    availableLanguages = supportedLanguages;
    populateLanguageSelects(currentSelections.source, currentSelections.target);
    populateImageLanguageSelects(currentSelections.imageSource, currentSelections.imageTarget);
    refreshDetectedLanguageHint();
  } catch (error) {
    // Marad a beépített hivatalos tartaléklista.
  }
}

async function fetchSupportedLanguages() {
  let lastError;

  for (const baseUrl of TRANSLATION_SERVICE_BASE_URLS) {
    try {
      const languages = await fetchSupportedLanguagesFromEndpoint(`${baseUrl}/languages`);
      if (languages.length > 1) {
        return languages;
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Nem sikerült betölteni a támogatott nyelveket");
}

async function fetchSupportedLanguagesFromEndpoint(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Language request failed at ${url}`);
    }

    const data = await response.json();
    return createLanguageCatalog(Array.isArray(data) ? data : []);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function setDefaultLanguagePair() {
  elements.sourceLanguage.value = "auto";
  elements.targetLanguage.value = "hu";
  elements.imageSourceLanguage.value = "auto";
  elements.imageTargetLanguage.value = "hu";
  syncSearchableLanguageControls();
  refreshDetectedLanguageHint();
}

function setMode(mode) {
  currentMode = mode;
  closeAllSearchableLanguageControls();
  renderMode();
}

function renderMode() {
  const textIsActive = currentMode === "text";
  elements.textModePanel.hidden = !textIsActive;
  elements.imageModePanel.hidden = textIsActive;

  elements.modeText.classList.toggle("is-active", textIsActive);
  elements.modeImage.classList.toggle("is-active", !textIsActive);
  elements.modeText.setAttribute("aria-selected", String(textIsActive));
  elements.modeImage.setAttribute("aria-selected", String(!textIsActive));
}

function resetImageResultState() {
  imageState.translatedDataUrl = "";
  imageState.extractedText = "";
  imageState.translatedText = "";
  elements.imagePreview.hidden = false;
  elements.imageTranslatedCanvas.hidden = true;
  elements.imageResultActions.hidden = true;
  elements.downloadTranslatedImage.removeAttribute("href");
  elements.showOriginalImage.classList.add("text-button--accent");
  elements.showTranslatedImage.classList.remove("text-button--accent");
}

function showImageVariant(variant) {
  const showTranslated = variant === "translated" && Boolean(imageState.translatedDataUrl);
  elements.imagePreview.hidden = showTranslated;
  elements.imageTranslatedCanvas.hidden = !showTranslated;
  elements.showOriginalImage.classList.toggle("text-button--accent", !showTranslated);
  elements.showTranslatedImage.classList.toggle("text-button--accent", showTranslated);
}

function updateSourceCounter() {
  const value = elements.sourceText.value.trim();
  const characters = elements.sourceText.value.length;
  const words = value.length === 0 ? 0 : value.split(/\s+/).length;
  elements.sourceCounter.textContent = `${characters} karakter / ${words} szó`;
}

function updateDetectedLanguageHint(detectedCode = "") {
  if (detectedCode) {
    elements.detectedLanguage.textContent = `Felismerve: ${getLanguageLabel(detectedCode)}`;
    return;
  }

  if (elements.sourceLanguage.value === "auto") {
    elements.detectedLanguage.textContent = "Automatikus felismerés aktív";
  } else {
    elements.detectedLanguage.textContent = `Forrás: ${getLanguageLabel(elements.sourceLanguage.value)}`;
  }
}

function refreshDetectedLanguageHint() {
  const detectedCode = elements.sourceLanguage.value === "auto"
    ? detectLanguageFromText(elements.sourceText.value.trim())
    : "";

  updateDetectedLanguageHint(detectedCode);
}

function scheduleTranslation() {
  if (!settings.liveTranslate) {
    renderOutputPlaceholder();
    return;
  }

  window.clearTimeout(translateTimer);
  translateTimer = window.setTimeout(() => {
    runTranslation({ force: true });
  }, 450);
}

async function runTranslation({ force = false } = {}) {
  const text = elements.sourceText.value.trim();
  const source = elements.sourceLanguage.value;
  const target = elements.targetLanguage.value;

  if (!text) {
    renderOutputPlaceholder();
    return;
  }

  if (!force && !settings.liveTranslate) {
    return;
  }

  if (source !== "auto" && source === target) {
    lastDetectedLanguage = source;
    applyTranslationResult({
      translatedText: text,
      detectedLanguage: source,
      service: "Azonos nyelv"
    });
    return;
  }

  const requestId = ++activeRequestId;
  setStatus("Fordítás folyamatban", "busy");
  setLoadingState(true);

  try {
    const result = await translateText(text, source, target);

    if (requestId !== activeRequestId) {
      return;
    }

    lastDetectedLanguage = result.detectedLanguage || source;
    applyTranslationResult(result);
  } catch (error) {
    if (requestId !== activeRequestId) {
      return;
    }

    const fallbackDetectedLanguage = source === "auto" ? detectLanguageFromText(text) : source;
    elements.translatedText.textContent = "A fordítás most nem elérhető. Próbálj meg másik nyelvet, vagy később indítsd újra.";
    elements.translationMeta.textContent = "A külső fordító szolgáltatások jelenleg nem válaszoltak.";
    elements.connectionState.textContent = "Offline minták vagy publikus végpontok";
    updateDetectedLanguageHint(fallbackDetectedLanguage);
    setStatus("Fordítás sikertelen", "error");
  } finally {
    if (requestId === activeRequestId) {
      setLoadingState(false);
    }
  }
}

async function runImageTranslation() {
  if (!imageState.dataUrl) {
    setStatus("Először adj meg egy képet", "error");
    return;
  }

  if (!window.Tesseract) {
    setStatus("A képfelismerés most nem tölthető be", "error");
    return;
  }

  const source = elements.imageSourceLanguage.value;
  const target = elements.imageTargetLanguage.value;
  const requestId = ++activeImageRequestId;

  setStatus("Kép elemzése folyamatban", "busy");
  setImageLoadingState(true);
  resetImageResultState();

  try {
    const ocrResult = await recognizeImageLayout(imageState.dataUrl, source);

    if (requestId !== activeImageRequestId) {
      return;
    }

    const lines = normalizeRecognizedRegions(ocrResult?.data || {});
    const cleanedText = lines.map((line) => line.text).join("\n").trim();

    if (!cleanedText || lines.length === 0) {
      throw new Error("No OCR text found");
    }

    const resolvedImageSource = source === "auto" ? await detectLanguage(cleanedText) || "auto" : source;
    const translatedLines = await translateImageLines(lines, resolvedImageSource, target);

    if (requestId !== activeImageRequestId) {
      return;
    }

    const translatedText = translatedLines.map((line) => line.translatedText).join("\n").trim();
    const renderedDataUrl = await renderTranslatedImage(imageState.dataUrl, translatedLines);

    if (requestId !== activeImageRequestId) {
      return;
    }

    imageState.extractedText = cleanedText;
    imageState.translatedText = translatedText;
    imageState.translatedDataUrl = renderedDataUrl;
    elements.downloadTranslatedImage.href = renderedDataUrl;
    elements.imageResultActions.hidden = false;
    showImageVariant("translated");

    setStatus("Kép fordítása kész", "success");
  } catch (error) {
    if (requestId !== activeImageRequestId) {
      return;
    }

    resetImageResultState();
    showImageVariant("original");
    setStatus("Kép fordítása sikertelen", "error");
  } finally {
    if (requestId === activeImageRequestId) {
      setImageLoadingState(false);
    }
  }
}

async function translateText(text, source, target) {
  const trimmedText = text.trim();
  const detectedLanguage = source === "auto" ? await detectLanguage(trimmedText) : source;
  const resolvedSource = detectedLanguage || source;

  const phrasebookMatch = translateWithPhrasebook(trimmedText, resolvedSource, target);
  if (phrasebookMatch) {
    return {
      ...phrasebookMatch,
      detectedLanguage: phrasebookMatch.detectedLanguage || detectedLanguage || resolvedSource
    };
  }

  if (resolvedSource !== "auto" && resolvedSource === target) {
    return {
      translatedText: trimmedText,
      detectedLanguage: resolvedSource,
      service: "Azonos nyelv"
    };
  }

  const endpoints = [
    () => translateWithLibre(
      `${TRANSLATION_SERVICE_BASE_URLS[0]}/translate`,
      trimmedText,
      resolvedSource,
      target
    ),
    () => translateWithLibre(
      `${TRANSLATION_SERVICE_BASE_URLS[1]}/translate`,
      trimmedText,
      resolvedSource,
      target
    ),
    () => resolvedSource === "auto"
      ? Promise.reject(new Error("Auto source not supported by MyMemory fallback"))
      : translateWithMyMemory(trimmedText, resolvedSource, target)
  ];

  let lastError;

  for (const endpoint of endpoints) {
    try {
      const result = await endpoint();
      if (result?.translatedText) {
        if (shouldRetryUnchangedTranslation(trimmedText, result.translatedText, resolvedSource, target)) {
          lastError = new Error("Translation endpoint returned unchanged text");
          continue;
        }

        return {
          ...result,
          detectedLanguage: result.detectedLanguage || detectedLanguage || resolvedSource
        };
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No translation service available");
}

async function detectLanguage(text) {
  const localGuess = detectLanguageFromText(text);

  for (const baseUrl of TRANSLATION_SERVICE_BASE_URLS) {
    try {
      const detectedLanguage = await detectWithLibre(`${baseUrl}/detect`, text);
      if (detectedLanguage) {
        return detectedLanguage;
      }
    } catch (error) {
      // Jön a következő végpont vagy a helyi felismerés.
    }
  }

  return localGuess;
}

async function recognizeImageLayout(dataUrl, sourceLanguage) {
  const ocrLanguage = OCR_LANGUAGE_MAP[sourceLanguage] || OCR_LANGUAGE_MAP.auto;
  return window.Tesseract.recognize(dataUrl, ocrLanguage, {
    logger(message) {
      if (message.status === "recognizing text" && typeof message.progress === "number") {
        setStatus(`Kép elemzése ${Math.round(message.progress * 100)}%`, "busy");
      }
    }
  });
}

function normalizeRecognizedRegions(ocrData) {
  const paragraphRegions = extractRecognizedRegions(ocrData?.paragraphs || []);
  if (paragraphRegions.length > 0) {
    return paragraphRegions;
  }

  const blockRegions = extractRecognizedRegions(ocrData?.blocks || []);
  if (blockRegions.length > 0) {
    return blockRegions;
  }

  return normalizeRecognizedLines(ocrData?.lines || []);
}

function extractRecognizedRegions(regions) {
  return regions
    .map((region) => {
      const text = extractRecognizedRegionText(region);
      const bbox = region?.bbox;

      if (!text || !bbox) {
        return null;
      }

      const width = Math.max(0, bbox.x1 - bbox.x0);
      const height = Math.max(0, bbox.y1 - bbox.y0);

      if (width < 20 || height < 16) {
        return null;
      }

      return {
        text,
        confidence: Number(region?.confidence || 0),
        bbox: {
          x0: bbox.x0,
          y0: bbox.y0,
          x1: bbox.x1,
          y1: bbox.y1
        }
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      const verticalDelta = left.bbox.y0 - right.bbox.y0;
      return Math.abs(verticalDelta) > 8 ? verticalDelta : left.bbox.x0 - right.bbox.x0;
    });
}

function extractRecognizedRegionText(region) {
  const directText = String(region?.text || "").replace(/\s+/g, " ").trim();
  if (directText) {
    return directText;
  }

  if (Array.isArray(region?.lines) && region.lines.length > 0) {
    const lineText = region.lines
      .map((line) => String(line?.text || "").replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(" ");

    if (lineText) {
      return lineText;
    }
  }

  if (Array.isArray(region?.paragraphs) && region.paragraphs.length > 0) {
    return region.paragraphs
      .map((paragraph) => extractRecognizedRegionText(paragraph))
      .filter(Boolean)
      .join("\n\n")
      .trim();
  }

  return "";
}

function normalizeRecognizedLines(lines) {
  const normalizedLines = lines
    .map((line) => {
      const text = String(line?.text || "").replace(/\s+/g, " ").trim();
      const bbox = line?.bbox;
      if (!text || !bbox) {
        return null;
      }

      const width = Math.max(0, bbox.x1 - bbox.x0);
      const height = Math.max(0, bbox.y1 - bbox.y0);

      if (width < 12 || height < 10) {
        return null;
      }

      return {
        text,
        confidence: Number(line?.confidence || 0),
        bbox: {
          x0: bbox.x0,
          y0: bbox.y0,
          x1: bbox.x1,
          y1: bbox.y1
        }
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      const verticalDelta = left.bbox.y0 - right.bbox.y0;
      return Math.abs(verticalDelta) > 6 ? verticalDelta : left.bbox.x0 - right.bbox.x0;
    });

  return mergeNearbyRecognizedLines(normalizedLines);
}

async function translateImageLines(lines, source, target) {
  const batchResult = await translateImageLinesInBatch(lines, source, target);
  if (batchResult) {
    return ensureImageTranslationsComplete(batchResult, source, target);
  }

  const translatedLines = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    setStatus(`Sorok fordítása ${index + 1}/${lines.length}`, "busy");

    let result;

    try {
      result = source !== "auto" && source === target
        ? {
            translatedText: line.text,
            detectedLanguage: source
          }
        : shouldUseSegmentedImageTranslation(line.text)
          ? await translateImageLinePrecisely(line, source, target)
          : await translateText(line.text, source, target);
    } catch (error) {
      result = {
        translatedText: line.text,
        detectedLanguage: source
      };
    }

    translatedLines.push({
      ...line,
      translatedText: result.translatedText || line.text,
      detectedLanguage: result.detectedLanguage || source
    });
  }

  return ensureImageTranslationsComplete(translatedLines, source, target);
}

async function translateImageLinesInBatch(lines, source, target) {
  if (lines.length <= 1 || lines.some((line) => shouldUseSegmentedImageTranslation(line.text))) {
    return null;
  }

  const delimiter = "|||__LINE_BREAK__|||";
  const joinedText = lines.map((line) => line.text).join(`\n${delimiter}\n`);

  let result;

  try {
    setStatus("Szövegblokkok fordítása", "busy");
    result = source !== "auto" && source === target
      ? {
          translatedText: joinedText,
          detectedLanguage: source
        }
      : await translateText(joinedText, source, target);
  } catch (error) {
    return null;
  }

  const translatedSegments = splitBatchTranslatedText(result.translatedText, delimiter, lines.length);
  if (!translatedSegments) {
    return null;
  }

  return lines.map((line, index) => ({
    ...line,
    translatedText: translatedSegments[index] || line.text,
    detectedLanguage: result.detectedLanguage || source
  }));
}

async function renderTranslatedImage(dataUrl, translatedLines) {
  const image = await loadImageElement(dataUrl);
  const canvas = elements.imageTranslatedCanvas;
  const context = canvas.getContext("2d");
  const sampleCanvas = document.createElement("canvas");
  const sampleContext = sampleCanvas.getContext("2d");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  sampleCanvas.width = image.naturalWidth;
  sampleCanvas.height = image.naturalHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0);
  sampleContext.clearRect(0, 0, sampleCanvas.width, sampleCanvas.height);
  sampleContext.drawImage(image, 0, 0);

  translatedLines.forEach((line) => {
    drawTranslatedLine(context, sampleContext, line, canvas.width, canvas.height);
  });

  return canvas.toDataURL("image/png");
}

function drawTranslatedLine(context, sampleContext, line, imageWidth, imageHeight) {
  const { bbox, translatedText, text } = line;
  const sourceWidth = Math.max(24, bbox.x1 - bbox.x0);
  const sourceHeight = Math.max(18, bbox.y1 - bbox.y0);
  const paddingX = clamp(sourceHeight * 0.42, 10, 22);
  const paddingY = clamp(sourceHeight * 0.28, 8, 18);
  const expansionFactor = clamp((String(translatedText || "").length + 4) / Math.max(1, String(text || "").length + 2), 1.18, 1.9);
  const x = Math.max(0, bbox.x0 - paddingX);
  const y = Math.max(0, bbox.y0 - paddingY);
  let width = Math.min(imageWidth - x, Math.max(56, sourceWidth * expansionFactor + paddingX * 2));
  let height = Math.min(imageHeight - y, Math.max(30, sourceHeight + paddingY * 2));
  const background = getAverageColor(sampleContext, x, y, width, height);
  const textColor = getContrastingColor(background);
  const fitted = fitWrappedText(context, translatedText, width - 16, height - 12);
  const lineHeight = fitted.fontSize * 1.14;
  const requiredHeight = fitted.lines.length * lineHeight + 12;

  if (requiredHeight > height) {
    height = Math.min(imageHeight - y, requiredHeight + 10);
  }

  context.save();
  context.fillStyle = `rgba(${background.r}, ${background.g}, ${background.b}, 1)`;
  context.fillRect(x, y, width, height);
  context.fillStyle = textColor;
  context.font = `700 ${fitted.fontSize}px ${getCanvasFontStack()}`;
  context.textBaseline = "top";

  const totalTextHeight = fitted.lines.length * lineHeight;
  let currentY = y + Math.max(4, (height - totalTextHeight) / 2);

  fitted.lines.forEach((textLine) => {
    context.fillText(textLine, x + 8, currentY);
    currentY += lineHeight;
  });

  context.restore();
}

function fitWrappedText(context, text, maxWidth, maxHeight) {
  const paragraphs = String(text || "")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const safeMaxWidth = Math.max(32, maxWidth);
  const safeMaxHeight = Math.max(18, maxHeight);
  let fontSize = Math.max(10, Math.min(42, Math.floor(safeMaxHeight * 0.72)));
  let lines = paragraphs.length > 0 ? paragraphs : [String(text || "")];

  while (fontSize >= 9) {
    context.font = `700 ${fontSize}px ${getCanvasFontStack()}`;
    lines = wrapParagraphsToWidth(context, paragraphs, safeMaxWidth);
    const lineHeight = fontSize * 1.14;

    if (lines.length * lineHeight <= safeMaxHeight) {
      return { fontSize, lines };
    }

    fontSize -= 1;
  }

  context.font = `700 9px ${getCanvasFontStack()}`;
  return {
    fontSize: 9,
    lines: wrapParagraphsToWidth(context, paragraphs, safeMaxWidth)
  };
}

function wrapParagraphsToWidth(context, paragraphs, maxWidth) {
  const safeParagraphs = paragraphs.length > 0 ? paragraphs : [""];
  const wrappedLines = [];

  safeParagraphs.forEach((paragraph, index) => {
    const words = String(paragraph || "").split(/\s+/).filter(Boolean);
    wrappedLines.push(...wrapWordsToWidth(context, words, maxWidth));

    if (index < safeParagraphs.length - 1) {
      wrappedLines.push("");
    }
  });

  return wrappedLines;
}

function wrapWordsToWidth(context, words, maxWidth) {
  if (words.length === 0) {
    return [""];
  }

  const lines = [];
  let currentLine = words[0];

  for (let index = 1; index < words.length; index += 1) {
    const candidate = `${currentLine} ${words[index]}`;
    if (context.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = words[index];
    }
  }

  lines.push(currentLine);
  return lines;
}

function mergeNearbyRecognizedLines(lines) {
  const mergedLines = [];

  lines.forEach((line) => {
    const previousLine = mergedLines[mergedLines.length - 1];
    if (previousLine && isSameVisualLine(previousLine, line)) {
      previousLine.text = `${previousLine.text} ${line.text}`.replace(/\s+/g, " ").trim();
      previousLine.confidence = Math.max(previousLine.confidence, line.confidence);
      previousLine.bbox.x0 = Math.min(previousLine.bbox.x0, line.bbox.x0);
      previousLine.bbox.y0 = Math.min(previousLine.bbox.y0, line.bbox.y0);
      previousLine.bbox.x1 = Math.max(previousLine.bbox.x1, line.bbox.x1);
      previousLine.bbox.y1 = Math.max(previousLine.bbox.y1, line.bbox.y1);
      return;
    }

    mergedLines.push({
      text: line.text,
      confidence: line.confidence,
      bbox: { ...line.bbox }
    });
  });

  return mergedLines;
}

function isSameVisualLine(previousLine, nextLine) {
  const previousHeight = previousLine.bbox.y1 - previousLine.bbox.y0;
  const nextHeight = nextLine.bbox.y1 - nextLine.bbox.y0;
  const baselineDistance = Math.abs(
    (previousLine.bbox.y0 + previousLine.bbox.y1) / 2 - (nextLine.bbox.y0 + nextLine.bbox.y1) / 2
  );
  const gap = nextLine.bbox.x0 - previousLine.bbox.x1;
  const referenceHeight = Math.max(previousHeight, nextHeight);

  return baselineDistance <= referenceHeight * 0.4 && gap >= -(referenceHeight * 0.35) && gap <= referenceHeight * 4.5;
}

function splitBatchTranslatedText(translatedText, delimiter, expectedSegments) {
  const pattern = new RegExp(`\\s*${escapeRegExp(delimiter)}\\s*`, "g");
  const segments = String(translatedText || "")
    .split(pattern)
    .map((segment) => segment.trim());

  return segments.length === expectedSegments ? segments : null;
}

async function ensureImageTranslationsComplete(lines, source, target) {
  const updatedLines = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!shouldRetryImageLineTranslation(line, target)) {
      updatedLines.push(line);
      continue;
    }

    setStatus(`Hiányzó fordítások javítása ${index + 1}/${lines.length}`, "busy");

    try {
      const retryResult = await translateImageLinePrecisely(line, source, target);
      updatedLines.push({
        ...line,
        translatedText: retryResult.translatedText || line.translatedText || line.text,
        detectedLanguage: retryResult.detectedLanguage || line.detectedLanguage || source
      });
    } catch (error) {
      updatedLines.push(line);
    }
  }

  return updatedLines;
}

function shouldRetryImageLineTranslation(line, target) {
  const original = normalizeForComparison(line.text);
  const translated = normalizeForComparison(line.translatedText);

  if (!original || !translated) {
    return false;
  }

  if (line.detectedLanguage && line.detectedLanguage === target) {
    return false;
  }

  if (original === translated) {
    return true;
  }

  if (original.length > 16 && translated.includes(original)) {
    return true;
  }

  return hasLargeUntranslatedOverlap(line.text, line.translatedText, target);
}

async function translateImageLinePrecisely(line, source, target) {
  const explicitSource = source === "auto"
    ? await detectLanguage(line.text) || line.detectedLanguage || source
    : source;

  if (shouldUseSegmentedImageTranslation(line.text)) {
    const sentenceTranslatedText = await translateTextBySentences(line.text, explicitSource, target);
    if (sentenceTranslatedText && !hasLargeUntranslatedOverlap(line.text, sentenceTranslatedText, target)) {
      return {
        translatedText: sentenceTranslatedText,
        detectedLanguage: explicitSource
      };
    }
  }

  let directResult = null;

  try {
    directResult = await translateText(line.text, explicitSource, target);
    if (!hasLargeUntranslatedOverlap(line.text, directResult.translatedText, target)) {
      return directResult;
    }
  } catch (error) {
    directResult = null;
  }

  const sentenceTranslatedText = await translateTextBySentences(line.text, explicitSource, target);
  if (sentenceTranslatedText && !hasLargeUntranslatedOverlap(line.text, sentenceTranslatedText, target)) {
    return {
      ...(directResult || {}),
      translatedText: sentenceTranslatedText
    };
  }

  return directResult || {
    translatedText: line.text,
    detectedLanguage: explicitSource
  };
}

async function translateTextBySentences(text, source, target) {
  const chunks = splitTextIntoSentenceChunks(text);
  if (chunks.length <= 1) {
    return translateTextByClauses(text, source, target);
  }

  const translatedChunks = [];

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    if (!chunk.trim()) {
      continue;
    }

    try {
      const result = await translateText(chunk, source, target);
      const nextText = result.translatedText || chunk;
      if (hasLargeUntranslatedOverlap(chunk, nextText, target)) {
        const clauseFallback = await translateTextByClauses(chunk, source, target);
        translatedChunks.push(clauseFallback || nextText);
      } else {
        translatedChunks.push(nextText);
      }
    } catch (error) {
      const clauseFallback = await translateTextByClauses(chunk, source, target);
      translatedChunks.push(clauseFallback || chunk);
    }
  }

  return translatedChunks.join(" ").replace(/\s+([,.;!?])/g, "$1").trim();
}

async function translateTextByClauses(text, source, target) {
  const chunks = splitTextIntoClauseChunks(text);
  if (chunks.length <= 1) {
    return "";
  }

  const translatedChunks = [];

  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    if (!chunk.trim()) {
      continue;
    }

    try {
      const result = await translateText(chunk, source, target);
      translatedChunks.push(result.translatedText || chunk);
    } catch (error) {
      translatedChunks.push(chunk);
    }
  }

  return translatedChunks.join(" ").replace(/\s+([,.;!?])/g, "$1").trim();
}

function splitTextIntoSentenceChunks(text) {
  return String(text || "")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function splitTextIntoClauseChunks(text) {
  return String(text || "")
    .split(/(?<=[,;:])\s+|(?<=\))\s+|\s+-\s+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function shouldUseSegmentedImageTranslation(text) {
  const value = String(text || "").trim();
  if (!value) {
    return false;
  }

  const wordCount = value.split(/\s+/).filter(Boolean).length;
  const sentenceCount = value.split(/[.!?]+/).map((chunk) => chunk.trim()).filter(Boolean).length;

  return value.length >= 140 || wordCount >= 24 || sentenceCount >= 3;
}

function hasLargeUntranslatedOverlap(originalText, translatedText, target) {
  if (!originalText || !translatedText) {
    return false;
  }

  const normalizedOriginal = normalizeForComparison(originalText);
  const normalizedTranslated = normalizeForComparison(translatedText);

  if (!normalizedOriginal || !normalizedTranslated) {
    return false;
  }

  if (target === "en") {
    return false;
  }

  const originalTokens = Array.from(new Set(
    normalizedOriginal
      .match(/[a-z]{4,}/g) || []
  ));

  if (originalTokens.length < 4) {
    return false;
  }

  const unchangedTokenCount = originalTokens.filter((token) => normalizedTranslated.includes(token)).length;
  return unchangedTokenCount / originalTokens.length >= 0.38;
}

function getAverageColor(context, x, y, width, height) {
  try {
    const imageData = context.getImageData(x, y, Math.max(1, Math.floor(width)), Math.max(1, Math.floor(height)));
    const { data } = imageData;
    let red = 0;
    let green = 0;
    let blue = 0;
    let count = 0;

    for (let index = 0; index < data.length; index += 16) {
      red += data[index];
      green += data[index + 1];
      blue += data[index + 2];
      count += 1;
    }

    return {
      r: Math.round(red / count || 28),
      g: Math.round(green / count || 34),
      b: Math.round(blue / count || 46)
    };
  } catch (error) {
    return { r: 28, g: 34, b: 46 };
  }
}

function getContrastingColor(color) {
  const luminance = (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255;
  return luminance > 0.62 ? "#0f1724" : "#f4f8ff";
}

function getCanvasFontStack() {
  return "\"Manrope\", Arial, sans-serif";
}

function loadImageElement(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image load failed"));
    image.src = dataUrl;
  });
}

async function translateWithLibre(url, text, source, target) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);
  const body = new URLSearchParams({
    q: text,
    source,
    target,
    format: "text"
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Translation request failed at ${url}`);
    }

    const data = await response.json();
    const translatedText = String(data.translatedText || "").trim();

    if (!translatedText) {
      throw new Error("No translated text returned");
    }

    return {
      translatedText,
      detectedLanguage: data.detectedLanguage?.language || (source === "auto" ? "" : source),
      service: url.includes("argosopentech") ? "Argos OpenTech" : "LibreTranslate"
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function detectWithLibre(url, text) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 5000);
  const body = new URLSearchParams({
    q: text
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Detect request failed at ${url}`);
    }

    const data = await response.json();
    const bestMatch = Array.isArray(data) ? data[0] : null;
    return normalizeLanguageCode(bestMatch?.language || "");
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function translateWithMyMemory(text, source, target) {
  const params = new URLSearchParams({
    q: text,
    langpair: `${source}|${target}`
  });

  const response = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`);

  if (!response.ok) {
    throw new Error("MyMemory translation request failed");
  }

  const data = await response.json();
  const translatedText = String(data?.responseData?.translatedText || "").trim();

  if (!translatedText) {
    throw new Error("MyMemory returned empty translation");
  }

  return {
    translatedText,
    detectedLanguage: source,
    service: "MyMemory"
  };
}

function translateWithPhrasebook(text, source, target) {
  const normalized = text.trim().toLowerCase();
  const match = PHRASEBOOK.find((item) => {
    const sourceMatches = source === "auto" || source === item.sourceLang;
    return sourceMatches && item.targetLang === target && item.source === normalized;
  });

  if (!match) {
    return null;
  }

  return {
    translatedText: match.translated,
    detectedLanguage: match.sourceLang,
      service: "Beépített minta"
  };
}

function detectLanguageFromText(text) {
  const value = String(text || "").trim();

  if (!value) {
    return "";
  }

  if (/[\uac00-\ud7af]/u.test(value)) {
    return "ko";
  }

  if (/[\u3040-\u30ff]/u.test(value)) {
    return "ja";
  }

  if (/[\u4e00-\u9fff]/u.test(value)) {
    return "zh";
  }

  if (/[\u0400-\u04ff]/u.test(value)) {
    return "ru";
  }

  const normalized = normalizeForComparison(value);
  const tokens = normalized.match(/[a-z]+/g) || [];
  const scores = {
    hu: 0,
    en: 0,
    de: 0,
    fr: 0,
    es: 0,
    it: 0,
    pt: 0,
    nl: 0,
    pl: 0,
    tr: 0
  };

  if (/[áéíóöőúüű]/iu.test(value)) {
    scores.hu += 4;
  }
  if (/[äöüß]/iu.test(value)) {
    scores.de += 4;
  }
  if (/[àâçéèêëîïôûùüÿœ]/iu.test(value)) {
    scores.fr += 4;
  }
  if (/[ñ¡¿]/iu.test(value)) {
    scores.es += 4;
  }
  if (/[àèìòù]/iu.test(value)) {
    scores.it += 3;
  }
  if (/[ãõ]/iu.test(value)) {
    scores.pt += 4;
  }
  if (/[ąćęłńóśźż]/iu.test(value)) {
    scores.pl += 4;
  }
  if (/[ğışç]/iu.test(value)) {
    scores.tr += 4;
  }

  Object.entries(LANGUAGE_DETECTION_HINTS).forEach(([code, hints]) => {
    hints.forEach((hint) => {
      if (tokens.includes(hint)) {
        scores[code] += hint.length >= 5 ? 3 : 2;
      }
    });
  });

  const ranked = Object.entries(scores).sort((left, right) => right[1] - left[1]);
  const [bestLanguage, bestScore] = ranked[0];
  const secondScore = ranked[1]?.[1] || 0;

  if (bestScore === 0) {
    return "";
  }

  if (bestScore === secondScore && bestScore < 4) {
    return "";
  }

  return bestLanguage;
}

function normalizeForComparison(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function shouldRetryUnchangedTranslation(originalText, translatedText, source, target) {
  if (!originalText || !translatedText || source === target) {
    return false;
  }

  const normalizedOriginal = normalizeForComparison(originalText).replace(/\s+/g, " ").trim();
  const normalizedTranslated = normalizeForComparison(translatedText).replace(/\s+/g, " ").trim();

  if (!normalizedOriginal || !normalizedTranslated) {
    return false;
  }

  if (normalizedOriginal !== normalizedTranslated) {
    return false;
  }

  const hasEnoughContent = originalText.trim().split(/\s+/).length >= 3 || originalText.trim().length >= 16;
  return hasEnoughContent;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyTranslationResult(result) {
  elements.translatedText.textContent = result.translatedText;
  elements.translatedText.classList.remove("is-fresh");
  void elements.translatedText.offsetWidth;
  elements.translatedText.classList.add("is-fresh");

  updateDetectedLanguageHint(result.detectedLanguage);
  elements.translationMeta.textContent = `${getLanguageLabel(result.detectedLanguage || elements.sourceLanguage.value)} -> ${getLanguageLabel(elements.targetLanguage.value)} / ${result.service}`;
  elements.connectionState.textContent = `Frissítve: ${formatTime(new Date())}`;
  setStatus("Fordítás kész", "success");
}

function renderOutputPlaceholder() {
  elements.translatedText.textContent = "Itt jelenik meg a lefordított szöveg.";
  elements.translatedText.classList.remove("is-loading", "is-fresh");
  elements.translationMeta.textContent = settings.liveTranslate
    ? "Válassz nyelvet, majd kezdd el a szöveget."
    : "Az automatikus mód ki van kapcsolva. Kattints a Fordítás gombra.";
  elements.connectionState.textContent = "Publikus fordító szolgáltatásokkal";
  refreshDetectedLanguageHint();
  setStatus("Kész a fordításra", "");
}

function setLoadingState(isLoading) {
  elements.translatedText.classList.toggle("is-loading", isLoading);
  elements.translateButton.disabled = isLoading;
  elements.translateButton.textContent = isLoading ? "Fordítás..." : "Fordítás";
}

function setStatus(message, tone) {
  elements.statusPill.textContent = message;
  elements.statusPill.classList.remove("is-busy", "is-success", "is-error");

  if (tone) {
    elements.statusPill.classList.add(`is-${tone}`);
  }
}

function swapImageLanguagePair() {
  const currentSource = elements.imageSourceLanguage.value;
  const currentTarget = elements.imageTargetLanguage.value;
  const detectedOrFallback = currentSource === "auto" ? "en" : currentSource;

  elements.imageSourceLanguage.value = currentTarget;
  elements.imageTargetLanguage.value = detectedOrFallback;
  syncSearchableLanguageControls();
}

function clearInput() {
  activeRequestId += 1;
  elements.sourceText.value = "";
  updateSourceCounter();
  renderOutputPlaceholder();
}

function clearSelectedImage() {
  activeImageRequestId += 1;
  imageState = {
    file: null,
    dataUrl: "",
    translatedDataUrl: "",
    extractedText: "",
    translatedText: ""
  };
  elements.imageInput.value = "";
  elements.imagePreview.removeAttribute("src");
  const context = elements.imageTranslatedCanvas.getContext("2d");
  context.clearRect(0, 0, elements.imageTranslatedCanvas.width, elements.imageTranslatedCanvas.height);
  elements.imageDropzoneEmpty.hidden = false;
  elements.imageDropzoneFilled.hidden = true;
  resetImageResultState();
  setStatus("Kép törölve", "success");
}

function handleImageSelection(event) {
  const [file] = Array.from(event.target.files || []);
  if (file) {
    setSelectedImage(file);
  }
}

async function pasteImageFromClipboard() {
  if (!navigator.clipboard?.read) {
    setStatus("A kép beillesztése itt nem támogatott", "error");
    return;
  }

  try {
    const items = await navigator.clipboard.read();

    for (const item of items) {
      const imageType = item.types.find((type) => type.startsWith("image/"));
      if (!imageType) {
        continue;
      }

      const blob = await item.getType(imageType);
      const file = new File([blob], "beillesztett-kép.png", { type: blob.type });
      await setSelectedImage(file);
      return;
    }

    setStatus("Nem találtam képet a vágólapon", "error");
  } catch (error) {
    setStatus("A kép beillesztése nem sikerült", "error");
  }
}

async function setSelectedImage(file) {
  if (!file?.type?.startsWith("image/")) {
    setStatus("Csak képet lehet betölteni", "error");
    return;
  }

  const dataUrl = await readFileAsDataUrl(file);
  imageState = {
    file,
    dataUrl,
    translatedDataUrl: "",
    extractedText: "",
    translatedText: ""
  };
  elements.imagePreview.src = dataUrl;
  elements.imagePreview.hidden = false;
  elements.imageDropzoneEmpty.hidden = true;
  elements.imageDropzoneFilled.hidden = false;
  resetImageResultState();
  showImageVariant("original");
  setStatus("Kép betöltve", "success");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
}

function getImageFileFromClipboardEvent(event) {
  const items = Array.from(event.clipboardData?.items || []);
  const imageItem = items.find((item) => item.type.startsWith("image/"));
  return imageItem ? imageItem.getAsFile() : null;
}

async function pasteFromClipboard() {
  if (!navigator.clipboard?.readText) {
    setStatus("A beillesztés itt nem támogatott", "error");
    return;
  }

  try {
    const text = await navigator.clipboard.readText();
    elements.sourceText.value = text;
    updateSourceCounter();
    scheduleTranslation();
    setStatus("Szöveg beillesztve", "success");
  } catch (error) {
    setStatus("A beillesztés nem sikerült", "error");
  }
}

async function copyToClipboard(text) {
  if (!text || text === "Itt jelenik meg a lefordított szöveg.") {
    setStatus("Nincs mit másolni", "error");
    return;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }
    setStatus("Fordítás másolva", "success");
  } catch (error) {
    setStatus("A másolás nem sikerült", "error");
  }
}

async function copyCurrentImageToClipboard() {
  const dataUrl = !elements.imageTranslatedCanvas.hidden && imageState.translatedDataUrl
    ? imageState.translatedDataUrl
    : imageState.dataUrl;

  if (!dataUrl) {
    setStatus("Nincs másolható kép", "error");
    return;
  }

  if (!navigator.clipboard?.write || typeof window.ClipboardItem === "undefined") {
    setStatus("A képmásolás itt nem támogatott", "error");
    return;
  }

  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const mimeType = blob.type || "image/png";
    await navigator.clipboard.write([
      new window.ClipboardItem({
        [mimeType]: blob
      })
    ]);
    setStatus("Kép vágólapra másolva", "success");
  } catch (error) {
    setStatus("A kép másolása nem sikerült", "error");
  }
}

function fallbackCopy(text) {
  const helper = document.createElement("textarea");
  helper.value = text;
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
}

function speakTranslation() {
  const text = elements.translatedText.textContent.trim();

  if (!text || text === "Itt jelenik meg a lefordított szöveg.") {
    setStatus("Nincs felolvasható szöveg", "error");
    return;
  }

  if (!("speechSynthesis" in window)) {
    setStatus("A felolvasás itt nem támogatott", "error");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = elements.targetLanguage.value;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  setStatus("Felolvasás elindítva", "success");
}

function swapLanguagePair() {
  const currentSource = elements.sourceLanguage.value;
  const currentTarget = elements.targetLanguage.value;
  const currentSourceText = elements.sourceText.value;
  const currentTranslatedText = elements.translatedText.textContent.trim();
  const translatedIsPlaceholder = currentTranslatedText === "Itt jelenik meg a lefordított szöveg.";
  const detectedOrFallback = lastDetectedLanguage || "en";

  const nextSource = currentSource === "auto"
    ? currentTarget
    : currentTarget;
  const nextTarget = currentSource === "auto"
    ? detectedOrFallback
    : currentSource;

  elements.sourceLanguage.value = nextSource === "auto" ? "hu" : nextSource;
  elements.targetLanguage.value = nextTarget === "auto" ? "hu" : nextTarget;

  if (!translatedIsPlaceholder) {
    elements.sourceText.value = currentTranslatedText;
    elements.translatedText.textContent = currentSourceText || "Itt jelenik meg a lefordított szöveg.";
  }

  updateSourceCounter();
  syncSearchableLanguageControls();
  refreshDetectedLanguageHint();
  scheduleTranslation();
}

function cycleTheme() {
  const order = ["dark", "light"];
  const currentIndex = order.indexOf(settings.theme);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const nextTheme = order[(safeIndex + 1) % order.length];
  settings.theme = nextTheme;
  persistSettings();
  applySettings();
}

function applySettings() {
  document.documentElement.dataset.theme = resolveTheme(settings.theme);
  document.documentElement.dataset.density = settings.density;
  document.documentElement.dataset.surface = settings.surface;
  syncSettingsUI();
}

function setImageLoadingState(isLoading) {
  elements.runImageTranslation.disabled = isLoading;
  elements.runImageTranslation.textContent = isLoading ? "Feldolgozás..." : "Kép fordítása";
}

function resolveTheme(selectedTheme) {
  return normalizeThemeSetting(selectedTheme);
}

function syncSettingsUI() {
  elements.liveTranslateToggle.checked = settings.liveTranslate;

  document.querySelectorAll("[data-theme-option]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themeOption === settings.theme);
  });

  elements.themeCycle.textContent = `Téma: ${toHungarianThemeLabel(settings.theme)}`;
}

function openSettingsDrawer() {
  elements.settingsDrawer.classList.add("is-open");
  elements.settingsDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function closeSettingsDrawer() {
  elements.settingsDrawer.classList.remove("is-open");
  elements.settingsDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
}

function trimForPreview(text) {
  return text.length > 92 ? `${text.slice(0, 92)}...` : text;
}

function formatTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("hu-HU", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function getLanguageLabel(code) {
  const normalizedCode = normalizeLanguageCode(code);
  const match = availableLanguages.find((language) => language.code === normalizedCode);
  return match ? match.label : getLanguageDisplayLabel(normalizedCode) || "Ismeretlen";
}

function toHungarianThemeLabel(theme) {
  if (normalizeThemeSetting(theme) === "dark") {
    return "Sötét";
  }

  return "Világos";
}

function handleSystemThemeChange() {
  if (settings.theme === "system") {
    applySettings();
  }
}

function normalizeThemeSetting(theme) {
  if (theme === "dark" || theme === "light") {
    return theme;
  }

  if (theme === "system") {
    return themeMediaQuery.matches ? "dark" : "light";
  }

  return DEFAULT_SETTINGS.theme;
}

function createLanguageCatalog(entries) {
  const languageMap = new Map();
  languageMap.set("auto", {
    code: "auto",
    label: LANGUAGE_LABEL_OVERRIDES.auto
  });

  entries.forEach((entry) => {
    const normalizedCode = normalizeLanguageCode(entry?.code);
    if (!normalizedCode || normalizedCode === "auto") {
      return;
    }

    const label = getLanguageDisplayLabel(normalizedCode, entry?.name);
    if (!label) {
      return;
    }

    languageMap.set(normalizedCode, {
      code: normalizedCode,
      label
    });
  });

  const sortedLanguages = Array.from(languageMap.values())
    .filter((language) => language.code !== "auto")
    .sort((left, right) => left.label.localeCompare(right.label, "hu"));

  return [
    languageMap.get("auto"),
    ...sortedLanguages
  ];
}

function getLanguageDisplayLabel(code, fallbackName = "") {
  const normalizedCode = normalizeLanguageCode(code);
  if (!normalizedCode) {
    return "";
  }

  if (LANGUAGE_LABEL_OVERRIDES[normalizedCode]) {
    return LANGUAGE_LABEL_OVERRIDES[normalizedCode];
  }

  const displayCode = toDisplayLanguageCode(normalizedCode);
  let translatedLabel = "";

  try {
    translatedLabel = languageDisplayNames?.of(displayCode) || "";
  } catch (error) {
    translatedLabel = "";
  }

  if (translatedLabel && translatedLabel.toLowerCase() !== displayCode.toLowerCase()) {
    return capitalizeLabel(translatedLabel);
  }

  if (fallbackName) {
    return capitalizeLabel(String(fallbackName).trim());
  }

  return normalizedCode.toUpperCase();
}

function toDisplayLanguageCode(code) {
  if (code === "pb") {
    return "pt-BR";
  }

  if (code === "zt") {
    return "zh-Hant";
  }

  return code;
}

function normalizeLanguageCode(code) {
  return String(code || "").trim().toLowerCase();
}

function capitalizeLabel(label) {
  const trimmedLabel = String(label || "").trim();
  if (!trimmedLabel) {
    return "";
  }

  return trimmedLabel.charAt(0).toLocaleUpperCase("hu-HU") + trimmedLabel.slice(1);
}
