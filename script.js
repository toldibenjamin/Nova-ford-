const STORAGE_KEY = "nova-fordito-settings";
const HISTORY_STORAGE_KEY = "nova-fordito-history";
const FAVORITES_STORAGE_KEY = "nova-fordito-favorites";
const LANGUAGE_FAVORITES_STORAGE_KEY = "nova-fordito-language-favorites";
const USAGE_STATS_STORAGE_KEY = "nova-fordito-usage-stats";
const FEEDBACK_DRAFT_STORAGE_KEY = "nova-fordito-feedback-draft";
const MAX_HISTORY_ITEMS = 14;
const MAX_FAVORITES_ITEMS = 24;
const HISTORY_SAVE_DELAY_MS = 1100;
const AUTO_TRANSLATION_STATS_DELAY_MS = 1600;
const SESSION_RENDER_INTERVAL_MS = 15000;
const ENDPOINTS = ["https://translate.argosopentech.com", "https://libretranslate.com"];
const CORRECTION_ENDPOINT = "https://api.languagetool.org/v2/check";
const FEEDBACK_SEND_ENDPOINT = "/api/send-feedback";
const FEEDBACK_CATEGORY_LABELS = { bug: "Hiba", ui: "UI hiba", translation: "Ford\u00EDt\u00E1s hiba", idea: "\u00D6tlet" };
const FEEDBACK_MESSAGE_MAX_CHARS = 2000;
const FEEDBACK_SCREENSHOT_MAX_BYTES = 3 * 1024 * 1024;
const FEEDBACK_SCREENSHOT_MAX_SIDE = 1600;
const FEEDBACK_MESSAGE_PLACEHOLDER = "P\u00E9ld\u00E1ul: a k\u00E9pes ford\u00EDt\u00E1sn\u00E1l n\u00E9ha rossz karakter ker\u00FCl a v\u00E9g\u00E9re, vagy j\u00F3 lenne m\u00E9g egy \u00FAj funkci\u00F3...";
const PLACEHOLDER_TEXT = "Itt jelenik meg a leford\u00EDtott sz\u00F6veg.";
const PLACEHOLDER_CORRECTION = "Itt jelenik meg a jav\u00EDtott sz\u00F6veg.";
const PLACEHOLDER_DOC = "Itt jelenik meg a leford\u00EDtott dokumentum.";
const FEEDBACK_EMAIL = "toldibenjamin@gmail.com";
const FEEDBACK_TYPE_LABELS = { bug: "Hiba", idea: "Ötlet", opinion: "Vélemény" };
const GOOGLE_MAP = { auto: "auto", he: "iw", nb: "no", pb: "pt-BR", zh: "zh-CN", zt: "zh-TW" };
const OCR_AUTO_LATIN_PACK = "eng+hun+deu+fra+spa+ita+por+nld+pol+tur+ron+ces+slk+slv+swe+dan+fin";
const OCR_SCRIPT_PACKS = {
  latin: OCR_AUTO_LATIN_PACK,
  cyrillic: "rus+ukr+bul",
  han: "chi_sim+chi_tra",
  japanese: "jpn",
  korean: "kor",
  arabic: "ara",
  hebrew: "heb",
  greek: "ell",
  devanagari: "hin",
  thai: "tha"
};
const OCR_MAP = {
  auto: OCR_AUTO_LATIN_PACK,
  ar: "ara",
  bg: "bul",
  bn: "ben",
  ca: "cat",
  cs: "ces",
  da: "dan",
  de: "deu",
  el: "ell",
  en: "eng",
  es: "spa",
  fi: "fin",
  fr: "fra",
  he: "heb",
  hi: "hin",
  hr: "hrv",
  hu: "hun",
  id: "ind",
  it: "ita",
  ja: "jpn",
  ko: "kor",
  ms: "msa",
  nb: "nor",
  nl: "nld",
  pl: "pol",
  pt: "por",
  pb: "por",
  ro: "ron",
  ru: "rus",
  sk: "slk",
  sl: "slv",
  sq: "sqi",
  sv: "swe",
  th: "tha",
  tr: "tur",
  uk: "ukr",
  ur: "urd",
  zh: "chi_sim",
  zt: "chi_tra"
};
const RTL_LANGS = new Set(["ar", "fa", "he", "ur"]);
const OVERRIDES = { auto: "Automatikus felismer\u00E9s", pb: "Portug\u00E1l (Braz\u00EDlia)", zt: "K\u00EDnai (hagyom\u00E1nyos)" };
const HINTS = {
  hu: ["szia", "k\u00F6sz\u00F6n\u00F6m", "\u00E9s", "vagy", "hogy", "vagyok", "nevem", "az\u00E9rt", "seg\u00EDts\u00E9g", "segitseg", "itt", "egy", "nem"],
  en: ["hello", "thank", "and", "you", "my", "name", "help", "because", "here"],
  de: ["hallo", "danke", "ich", "und", "hilfe"],
  fr: ["bonjour", "merci", "je", "et", "aide"],
  es: ["hola", "gracias", "yo", "y", "ayuda"],
  it: ["ciao", "grazie", "io", "e", "aiuto"]
};
const COMMA_HINTS = {
  hu: ["de", "hogy", "mert", "hanem", "viszont", "pedig", "ez\u00E9rt"],
  en: ["but", "because", "however", "though", "yet"],
  de: ["aber", "weil", "doch", "sondern"],
  fr: ["mais", "car", "pourtant"],
  es: ["pero", "porque", "aunque"],
  it: ["ma", "perch\u00E9", "per\u00F2"]
};
const LANGUAGE_LOCALES = { hu: "hu-HU", en: "en-US", de: "de-DE", fr: "fr-FR", es: "es-ES", it: "it-IT" };
const LT_LANG_MAP = { auto: "auto", hu: "hu-HU", en: "en-US", de: "de-DE", fr: "fr-FR", es: "es", it: "it", pt: "pt-PT", pb: "pt-BR", nl: "nl", pl: "pl-PL", ru: "ru-RU", uk: "uk-UA", ro: "ro-RO", sk: "sk-SK", sl: "sl-SI", sv: "sv-SE", da: "da-DK", el: "el-GR", ca: "ca-ES" };
const UI_STRINGS = {
  hu: {
    themePrefix: "Téma",
    settings: "Beállítások",
    feedback: "Visszajelzés",
    feedbackTargetToggle: "EN",
    languageToggleAria: "Oldal nyelvének váltása angolra",
    contactOpenAria: "Kapcsolat panel megnyitása",
    contactCloseAria: "Kapcsolat panel bezárása",
    readyToTranslate: "Kész a fordításra",
    translatedTextPlaceholder: "Itt jelenik meg a lefordított szöveg.",
    correctedTextPlaceholder: "Itt jelenik meg a javított szöveg.",
    translatedDocumentPlaceholder: "Itt jelenik meg a lefordított dokumentum.",
    feedbackMessagePlaceholder: "Például: a képes fordításnál néha rossz karakter kerül a végére, vagy jó lenne még egy új funkció...",
    feedbackSending: "Visszajelzés küldése folyamatban...",
    feedbackSend: "Visszajelzés küldése",
    feedbackSuccess: "Köszönjük! A visszajelzésed megérkezett.",
    feedbackFailed: "A visszajelzés küldése most nem sikerült.",
    feedbackLocalOnly: "A közvetlen visszajelzésküldés a Vercel-es verzióban működik.",
    feedbackValidation: "Kérlek írj egy rövid üzenetet a küldéshez.",
    feedbackAreaText: "Szövegfordítás",
    feedbackAreaCorrection: "Szövegjavítás",
    feedbackAreaImage: "Képes fordítás",
    feedbackAreaDocument: "Dokumentum fordítás",
    feedbackSummaryTitle: "Nova Fordító visszajelzés",
    feedbackSummaryType: "Típus",
    feedbackSummaryArea: "Terület",
    feedbackSummaryDate: "Dátum",
    feedbackSummaryMessage: "Üzenet",
    feedbackSummaryContact: "Elérhetőség",
    correctionTargetLabel: "Javítás",
    noResults: "Nincs találat.",
    charsWords: "{chars} karakter / {words} szó",
    charsOnly: "{count} karakter",
    sourcePrefix: "Forrás",
    detectedPrefix: "Felismerve",
    autoDetectActive: "Automatikus felismerés aktív",
    chooseLanguageToStart: "Válassz nyelvet, majd kezdd el a szöveget.",
    liveTranslateOff: "Az automatikus mód ki van kapcsolva. Kattints a Fordítás gombra.",
    publicServices: "Publikus fordító szolgáltatásokkal",
    correctionMetaDefault: "Pontok, vesszők, szóközök és nagybetűk automatikus javítása.",
    save: "Mentés",
    saved: "Mentve",
    favoriteSavedAria: "Fordítás mentése a kedvencekhez",
    favoriteAdded: "Elmentve a kedvencekhez",
    favoriteRemoved: "Eltávolítva a mentettek közül",
    nothingToSave: "Még nincs mit menteni",
    noHistoryToClear: "Nincs törölhető előzmény",
    historyCleared: "Előzmények törölve",
    noSavedToClear: "Nincs törölhető mentett elem",
    savedCleared: "Mentettek törölve",
    previousSave: "Korábbi mentés",
    translationLoaded: "Fordítás betöltve",
    correctionModeStatus: "Szövegjavítás mód",
    correctionCleared: "Javítandó szöveg törölve",
    copySuccess: "Kimásolva a vágólapra",
    copyFailed: "A másolás nem sikerült",
    nothingToCopy: "Nincs mit másolni",
    resetStatsStatus: "A használati statisztika nullázva",
    firstUsePrefix: "Első használat",
    totalPrefix: "Összesen",
    noDataYet: "Még nincs adat",
    noFavoriteLanguage: "Még nincs",
    startedToday: "Ma kezdted",
    usingForOneDay: "1 napja használod",
    usingForDays: "{count} napja használod",
    sessionMinute: "perc",
    sessionHour: "óra",
    streakBestPrefix: "Legjobb",
    streakCompleted: "Teljesítve",
    streakNotDone: "Még nincs kész",
    streakStartedTodayCopy: "Minden nagy streak egy első nappal indul. Kezdd el ma, és gyere vissza holnap is.",
    streakZeroCopy: "Szuper kezdés. Ha holnap is belépsz, már 1 napos streaked lesz.",
    streakOneCopy: "1 napja jössz vissza folyamatosan.",
    streakDaysCopy: "{count} napja használod folyamatosan.",
    streakDoneCopy: "A mai belépésed már beleszámított a streakbe.",
    streakPendingCopy: "Még nincs kész a mai streak. Térj vissza ma is.",
    streakLegend: "100+ streak legenda",
    streakLegendCopy: "Már minden fő mérföldkövet megszereztél.",
    streakGoal: "{count} napos streak",
    streakGoalRemaining: "Még {count} nap választ el tőle.",
    streakGoalAlmost: "Már karnyújtásnyira vagy tőle.",
    streakToday: "Ma",
    streakActive: "Aktív streak nap",
    streakVisited: "Aktív nap",
    streakMissed: "Kihagyott nap",
    streakFuture: "Következő nap",
    streakNone: "Nincs aktivitás",
    streakActiveMonth: "Ebben a hónapban {count} aktív nap",
    resetDialogDanger: "Veszélyes művelet",
    resetDialogTitle: "Biztos szeretnéd törölni a statisztikákat?",
    resetDialogText: "Csak a használati statisztika törlődik. Az előzmények, kedvencek és a többi adat megmarad.",
    cancel: "Mégse",
    confirmDelete: "Igen, törlés",
    memoryEmptyFavoritesTitle: "Még nincs mentett fordítás.",
    memoryEmptyFavoritesBody: "A csillaggal megjelölt fordítások itt maradnak kéznél.",
    memoryEmptyHistoryTitle: "Még nincs előzmény.",
    memoryEmptyHistoryBody: "Az új fordítások automatikusan ide kerülnek, és egy kattintással visszatölthetők.",
    favoriteAddAria: "{lang} hozzáadása a kedvencekhez",
    favoriteRemoveAria: "{lang} törlése a kedvencek közül",
    emailCopied: "Email cím kimásolva"
  },
  en: {
    themePrefix: "Theme",
    settings: "Settings",
    feedback: "Feedback",
    feedbackTargetToggle: "HU",
    languageToggleAria: "Switch page language to Hungarian",
    contactOpenAria: "Open contact panel",
    contactCloseAria: "Close contact panel",
    readyToTranslate: "Ready to translate",
    translatedTextPlaceholder: "The translated text will appear here.",
    correctedTextPlaceholder: "The corrected text will appear here.",
    translatedDocumentPlaceholder: "The translated document will appear here.",
    feedbackMessagePlaceholder: "For example: image translation sometimes adds bad characters at the end, or it would be great to have another feature...",
    feedbackSending: "Sending feedback...",
    feedbackSend: "Send feedback",
    feedbackSuccess: "Thanks! Your feedback has arrived.",
    feedbackFailed: "Feedback could not be sent right now.",
    feedbackLocalOnly: "Direct feedback sending works on the Vercel version.",
    feedbackValidation: "Please write a short message before sending.",
    feedbackAreaText: "Text translation",
    feedbackAreaCorrection: "Text correction",
    feedbackAreaImage: "Image translation",
    feedbackAreaDocument: "Document translation",
    feedbackSummaryTitle: "Nova Translator feedback",
    feedbackSummaryType: "Type",
    feedbackSummaryArea: "Area",
    feedbackSummaryDate: "Date",
    feedbackSummaryMessage: "Message",
    feedbackSummaryContact: "Contact",
    correctionTargetLabel: "Correction",
    noResults: "No results.",
    charsWords: "{chars} chars / {words} words",
    charsOnly: "{count} chars",
    sourcePrefix: "Source",
    detectedPrefix: "Detected",
    autoDetectActive: "Auto detect is active",
    chooseLanguageToStart: "Choose a language, then start typing.",
    liveTranslateOff: "Live mode is off. Click the Translate button.",
    publicServices: "Using public translation services",
    correctionMetaDefault: "Automatic cleanup for punctuation, spacing, and capitalization.",
    save: "Save",
    saved: "Saved",
    favoriteSavedAria: "Save translation to favorites",
    favoriteAdded: "Saved to favorites",
    favoriteRemoved: "Removed from saved items",
    nothingToSave: "There is nothing to save yet",
    noHistoryToClear: "No history to clear",
    historyCleared: "History cleared",
    noSavedToClear: "No saved items to clear",
    savedCleared: "Saved items cleared",
    previousSave: "Previous save",
    translationLoaded: "Translation loaded",
    correctionModeStatus: "Text correction mode",
    correctionCleared: "Correction input cleared",
    copySuccess: "Copied to clipboard",
    copyFailed: "Copy failed",
    nothingToCopy: "Nothing to copy",
    resetStatsStatus: "Usage statistics reset",
    firstUsePrefix: "First use",
    totalPrefix: "Total",
    noDataYet: "No data yet",
    noFavoriteLanguage: "No favorite yet",
    startedToday: "Started today",
    usingForOneDay: "Using it for 1 day",
    usingForDays: "Using it for {count} days",
    sessionMinute: "min",
    sessionHour: "hr",
    streakBestPrefix: "Best",
    streakCompleted: "Completed",
    streakNotDone: "Not done yet",
    streakStartedTodayCopy: "Every great streak starts with day one. Begin today and come back tomorrow too.",
    streakZeroCopy: "Nice start. If you come back tomorrow too, you'll have a 1-day streak.",
    streakOneCopy: "You've been back 1 day in a row.",
    streakDaysCopy: "You've used it for {count} consecutive days.",
    streakDoneCopy: "Today's visit already counts toward your streak.",
    streakPendingCopy: "Today's streak is not done yet. Come back again today.",
    streakLegend: "100+ streak legend",
    streakLegendCopy: "You've already reached every main milestone.",
    streakGoal: "{count}-day streak",
    streakGoalRemaining: "{count} more day(s) to reach it.",
    streakGoalAlmost: "You're almost there.",
    streakToday: "Today",
    streakActive: "Active streak day",
    streakVisited: "Active day",
    streakMissed: "Missed day",
    streakFuture: "Upcoming day",
    streakNone: "No activity",
    streakActiveMonth: "{count} active day(s) this month",
    resetDialogDanger: "Dangerous action",
    resetDialogTitle: "Do you want to delete your statistics?",
    resetDialogText: "Only usage statistics will be deleted. History, favorites, and the rest of your data will stay.",
    cancel: "Cancel",
    confirmDelete: "Yes, delete",
    memoryEmptyFavoritesTitle: "No saved translations yet.",
    memoryEmptyFavoritesBody: "Starred translations stay here for quick access.",
    memoryEmptyHistoryTitle: "No history yet.",
    memoryEmptyHistoryBody: "New translations appear here automatically and can be loaded back with one click.",
    favoriteAddAria: "Add {lang} to favorites",
    favoriteRemoveAria: "Remove {lang} from favorites",
    emailCopied: "Email copied"
  }
};
const THEME_MODE_LABELS_BY_LANG = {
  hu: { light: "Világos", dark: "Sötét", amoled: "Deep Dark" },
  en: { light: "Light", dark: "Dark", amoled: "Deep Dark" }
};
const ACCENT_THEME_LABELS_BY_LANG = {
  hu: { base: "Alap", neon: "Neon", cyber: "Cyber", green: "Zöld minimal", gradient: "Gradient" },
  en: { base: "Base", neon: "Neon", cyber: "Cyber", green: "Green minimal", gradient: "Gradient" }
};
const OVERRIDES_BY_LANG = {
  hu: { auto: "Automatikus felismerés", pb: "Portugál (Brazília)", zt: "Kínai (hagyományos)" },
  en: { auto: "Auto detect", pb: "Portuguese (Brazil)", zt: "Chinese (Traditional)" }
};
const DISPLAY_NAMES = typeof Intl.DisplayNames === "function"
  ? {
      hu: new Intl.DisplayNames(["hu"], { type: "language" }),
      en: new Intl.DisplayNames(["en"], { type: "language" })
    }
  : null;
const THEME_MODE_ORDER = ["light", "dark", "amoled"];
const THEME_MODE_LABELS = { light: "Világos", dark: "Sötét", amoled: "Deep Dark" };
const ACCENT_THEME_LABELS = { base: "Alap", neon: "Neon", cyber: "Cyber", green: "Zöld minimal", gradient: "Gradient" };
const SETTINGS_SECTION_KEYS = ["appearance", "translation", "stats", "trust"];
const DEFAULT_COLLAPSED_SECTIONS = { appearance: false, translation: false, stats: false, trust: false };
const DEFAULT_SETTINGS = {
  themeMode: "dark",
  accentTheme: "base",
  surface: "glass",
  uiLanguage: "hu",
  contactDockCollapsed: false,
  collapsedSections: { ...DEFAULT_COLLAPSED_SECTIONS },
  liveTranslate: true,
  feedbackIncludeSystem: true,
  micMergeMode: "append"
};
const MIC_SILENCE_MS = 4500;
const MIC_PERMISSION_TIMEOUT_MS = 9000;
const MIC_START_TIMEOUT_MS = 2600;
const MIC_MAX_BLOB_BYTES = 24 * 1024 * 1024;
const MIC_RECORDER_SLICE_MS = 350;
const MIC_VOLUME_SAMPLE_MS = 180;
const MIC_VOLUME_THRESHOLD = 9;
const MIC_TRANSCRIBE_ENDPOINT = "/api/transcribe-audio";
const HU_WORD_FIXES = {
  "en": "\u00E9n", "es": "\u00E9s", "itt": "itt", "szoveg": "sz\u00F6veg", "szoveget": "sz\u00F6veget", "szovegben": "sz\u00F6vegben",
  "javitasa": "jav\u00EDt\u00E1sa", "javitani": "jav\u00EDtani", "javitott": "jav\u00EDtott", "fordito": "ford\u00EDt\u00F3",
  "forditas": "ford\u00EDt\u00E1s", "forditani": "ford\u00EDtani", "kereso": "keres\u0151", "lehetoseg": "lehet\u0151s\u00E9g",
  "sotet": "s\u00F6t\u00E9t", "vilagos": "vil\u00E1gos", "beallitas": "be\u00E1ll\u00EDt\u00E1s", "beallitasok": "be\u00E1ll\u00EDt\u00E1sok",
  "forrasnyelv": "forr\u00E1snyelv", "celnyelv": "c\u00E9lnyelv", "automatikus": "automatikus", "felismeres": "felismer\u00E9s",
  "karakter": "karakter", "szo": "sz\u00F3", "szavak": "szavak", "peldaul": "p\u00E9ld\u00E1ul", "egybol": "egyb\u0151l",
  "kiirja": "ki\u00EDrja", "masolas": "m\u00E1sol\u00E1s", "masol": "m\u00E1sol", "kepek": "k\u00E9pek", "kep": "k\u00E9p",
  "kepen": "k\u00E9pen", "keprol": "k\u00E9pr\u0151l", "kepet": "k\u00E9pet", "fajl": "f\u00E1jl", "fajlokat": "f\u00E1jlokat",
  "foglalkozasom": "foglalkoz\u00E1som", "videos": "vide\u00F3s", "video": "vide\u00F3", "szia": "szia", "vagyok": "vagyok",
  "peter": "p\u00E9ter", "peti": "peti", "vers": "vers", "locsolo": "locsol\u00F3", "mondat": "mondat", "mondatok": "mondatok",
  "azert": "az\u00E9rt", "nevem": "nevem", "segitseg": "seg\u00EDts\u00E9g", "segitsek": "seg\u00EDtsek", "segit": "seg\u00EDt",
  "segitseg": "seg\u00EDts\u00E9g", "hugy": "hogy", "vagyok": "vagyok", "apart": "az\u00E9rt", "vegeu": "vagyok", "iot": "itt",
  "kutyam": "kuty\u00E1m", "dezso": "dezs\u0151", "nagyon": "nagyon", "szeretem": "szeretem", "simogatnak": "simogatnak",
  "engem": "engem", "van": "van", "neve": "neve", "ha": "ha", "szeretnek": "szeretn\u00E9k", "vesszo": "vessz\u0151",
  "pont": "pont", "mondani": "mondani", "szerintem": "szerintem", "nagyonjo": "nagyon j\u00F3"
};
const HU_DETECT_WORDS = new Set([
  "szia", "en", "es", "hogy", "vagyok", "nevem", "azert", "itt", "egy", "nem", "segitseg", "segitsek", "forrasnyelv",
  "celnyelv", "forditas", "beallitas", "szoveg", "javitasa", "kep", "kepek", "fajl", "mert", "hanem", "pedig", "viszont"
]);
const LANGS = ["auto", "sq", "ar", "az", "eu", "bn", "bg", "ca", "zt", "zh", "cs", "da", "nl", "en", "eo", "et", "fi", "fr", "gl", "de", "el", "he", "hi", "hu", "id", "ga", "it", "ja", "ko", "ky", "lv", "lt", "ms", "nb", "fa", "pl", "pt", "pb", "ro", "ru", "sk", "sl", "es", "sv", "tl", "th", "tr", "uk", "ur"];
const LANGUAGE_FLAGS = {
  auto: "🌐",
  sq: "🇦🇱",
  ar: "🇸🇦",
  az: "🇦🇿",
  eu: "🇪🇸",
  bn: "🇧🇩",
  bg: "🇧🇬",
  ca: "🇪🇸",
  zt: "🇹🇼",
  zh: "🇨🇳",
  cs: "🇨🇿",
  da: "🇩🇰",
  nl: "🇳🇱",
  en: "🇬🇧",
  eo: "🌍",
  et: "🇪🇪",
  fi: "🇫🇮",
  fr: "🇫🇷",
  gl: "🇪🇸",
  de: "🇩🇪",
  el: "🇬🇷",
  he: "🇮🇱",
  hi: "🇮🇳",
  hu: "🇭🇺",
  id: "🇮🇩",
  ga: "🇮🇪",
  it: "🇮🇹",
  ja: "🇯🇵",
  ko: "🇰🇷",
  ky: "🇰🇬",
  lv: "🇱🇻",
  lt: "🇱🇹",
  ms: "🇲🇾",
  nb: "🇳🇴",
  fa: "🇮🇷",
  pl: "🇵🇱",
  pt: "🇵🇹",
  pb: "🇧🇷",
  ro: "🇷🇴",
  ru: "🇷🇺",
  sk: "🇸🇰",
  sl: "🇸🇮",
  es: "🇪🇸",
  sv: "🇸🇪",
  tl: "🇵🇭",
  th: "🇹🇭",
  tr: "🇹🇷",
  uk: "🇺🇦",
  ur: "🇵🇰"
};

const LANGUAGE_FLAG_COUNTRIES = {
  sq: "al",
  ar: "sa",
  az: "az",
  eu: "es",
  bn: "bd",
  bg: "bg",
  ca: "es",
  zt: "tw",
  zh: "cn",
  cs: "cz",
  da: "dk",
  nl: "nl",
  en: "gb",
  et: "ee",
  fi: "fi",
  fr: "fr",
  gl: "es",
  de: "de",
  el: "gr",
  he: "il",
  hi: "in",
  hu: "hu",
  id: "id",
  ga: "ie",
  it: "it",
  ja: "jp",
  ko: "kr",
  ky: "kg",
  lv: "lv",
  lt: "lt",
  ms: "my",
  nb: "no",
  fa: "ir",
  pl: "pl",
  pt: "pt",
  pb: "br",
  ro: "ro",
  ru: "ru",
  sk: "sk",
  sl: "si",
  es: "es",
  sv: "se",
  tl: "ph",
  th: "th",
  tr: "tr",
  uk: "ua",
  ur: "pk"
};

function uiLanguage(settings = state?.settings) {
  return settings?.uiLanguage === "en" ? "en" : "hu";
}

function uiLocale(settings = state?.settings) {
  return uiLanguage(settings) === "en" ? "en-US" : "hu-HU";
}

function strings(settings = state?.settings) {
  return UI_STRINGS[uiLanguage(settings)] || UI_STRINGS.hu;
}

function st(key, vars = {}, settings = state?.settings) {
  const table = strings(settings);
  const fallback = UI_STRINGS.hu;
  const template = String(table[key] ?? fallback[key] ?? key);
  return template.replace(/\{(\w+)\}/g, (_, token) => String(vars[token] ?? ""));
}

function languageOverrides(settings = state?.settings) {
  return OVERRIDES_BY_LANG[uiLanguage(settings)] || OVERRIDES_BY_LANG.hu;
}

function themeModeLabels(settings = state?.settings) {
  return THEME_MODE_LABELS_BY_LANG[uiLanguage(settings)] || THEME_MODE_LABELS_BY_LANG.hu;
}

function accentThemeLabels(settings = state?.settings) {
  return ACCENT_THEME_LABELS_BY_LANG[uiLanguage(settings)] || ACCENT_THEME_LABELS_BY_LANG.hu;
}

function feedbackCategoryLabels(settings = state?.settings) {
  return uiLanguage(settings) === "en"
    ? { bug: "Bug", ui: "UI bug", translation: "Translation bug", idea: "Idea" }
    : { bug: "Hiba", ui: "UI hiba", translation: "Fordítás hiba", idea: "Ötlet" };
}

function feedbackTypeLabels(settings = state?.settings) {
  return uiLanguage(settings) === "en"
    ? { bug: "Bug", idea: "Idea", opinion: "Opinion" }
    : { bug: "Hiba", idea: "Ötlet", opinion: "Vélemény" };
}

function displayNames(settings = state?.settings) {
  return DISPLAY_NAMES?.[uiLanguage(settings)] || DISPLAY_NAMES?.hu || null;
}

function translatedPlaceholder() {
  return st("translatedTextPlaceholder");
}

function correctionPlaceholder() {
  return st("correctedTextPlaceholder");
}

function documentPlaceholder() {
  return st("translatedDocumentPlaceholder");
}

function feedbackMessagePlaceholder() {
  return st("feedbackMessagePlaceholder");
}

function isOneOf(value, list) {
  const normalized = String(value || "").trim();
  return list.some(item => normalized === String(item || "").trim());
}

function isTranslationPlaceholderText(value) {
  return isOneOf(value, [PLACEHOLDER_TEXT, UI_STRINGS.hu.translatedTextPlaceholder, UI_STRINGS.en.translatedTextPlaceholder]);
}

function isCorrectionPlaceholderText(value) {
  return isOneOf(value, [PLACEHOLDER_CORRECTION, UI_STRINGS.hu.correctedTextPlaceholder, UI_STRINGS.en.correctedTextPlaceholder]);
}

function isDocumentPlaceholderText(value) {
  return isOneOf(value, [PLACEHOLDER_DOC, UI_STRINGS.hu.translatedDocumentPlaceholder, UI_STRINGS.en.translatedDocumentPlaceholder]);
}

const el = {
  modeText: q("#mode-text"), modeImage: q("#mode-image"), modeDocument: q("#mode-document"),
  textPanel: q("#text-mode-panel"), imagePanel: q("#image-mode-panel"), documentPanel: q("#document-mode-panel"),
  textSubmode: q("#text-submode-select"), textTranslateView: q("#text-translate-view"), textCorrectionView: q("#text-correction-view"),
  source: q("#source-language"), target: q("#target-language"), imageSource: q("#image-source-language"), imageTarget: q("#image-target-language"),
  docSource: q("#document-source-language"), docTarget: q("#document-target-language"), correctionSource: document.querySelector("#text-correction-view #correction-source-language"),
  sourceText: q("#source-text"), translatedText: q("#translated-text"), sourceCounter: q("#source-counter"), detectedLanguage: q("#detected-language"),
  favoriteTranslation: q("#favorite-translation"), favoriteTranslationIcon: q("#favorite-translation-icon"), favoriteTranslationLabel: q("#favorite-translation-label"),
  historyList: q("#history-list"), favoritesList: q("#favorites-list"), clearHistory: q("#clear-history"), clearFavorites: q("#clear-favorites"),
  micStatus: q("#mic-status"), micStatusText: q("#mic-status-text"), micDeviceBadge: q("#mic-device-badge"), micModeAppend: q("#mic-mode-append"), micModeReplace: q("#mic-mode-replace"),
  correctionInput: document.querySelector("#text-correction-view #correction-input"), correctionCounter: document.querySelector("#text-correction-view #correction-counter"), correctedText: document.querySelector("#text-correction-view #corrected-text"), correctionMeta: document.querySelector("#text-correction-view #correction-meta"),
  translationMeta: q("#translation-meta"), connectionState: q("#connection-state"), status: q("#status-pill"),
  translate: q("#translate-button"), swap: q("#swap-languages"), mic: q("#voice-input"), clear: q("#clear-input"), speak: q("#speak-output"), copyFloat: q("#copy-output-floating"), runCorrection: q("#run-correction"), clearCorrection: document.querySelector("#text-correction-view #clear-correction"), copyCorrection: document.querySelector("#text-correction-view #copy-corrected-floating"),
  optionAccents: q("#option-accents"), optionSpelling: q("#option-spelling"), optionPunctuation: q("#option-punctuation"), optionStyle: q("#option-style"),
  imageSwap: q("#image-swap-languages"), imageRun: q("#run-image-translation"), imageInput: q("#image-input"), imageDropzone: q("#image-dropzone"), imageEmpty: q("#image-dropzone-empty"), imageFilled: q("#image-dropzone-filled"), imagePreview: q("#image-preview"), imageCanvas: q("#image-translated-canvas"), pickImage: q("#pick-image"), pasteImage: q("#paste-image"), replaceImage: q("#replace-image"), removeImage: q("#remove-image"), imageActions: q("#image-result-actions"), showOriginalImage: q("#show-original-image"), showTranslatedImage: q("#show-translated-image"), downloadImage: q("#download-translated-image"), copyImage: q("#copy-image-to-clipboard"),
  docSwap: q("#document-swap-languages"), docRun: q("#run-document-translation"), docInput: q("#document-input"), docDropzone: q("#document-dropzone"), docEmpty: q("#document-dropzone-empty"), docFilled: q("#document-dropzone-filled"), pickDoc: q("#pick-document"), replaceDoc: q("#replace-document"), removeDoc: q("#remove-document"), docFileName: q("#document-file-name"), docSourceText: q("#document-source-text"), docTranslatedText: q("#document-translated-text"), docMeta: q("#document-translation-meta"), copyDoc: q("#copy-document-output"), downloadDoc: q("#download-document-output"),
  themeCycle: q("#theme-cycle"), settingsToggle: q("#settings-toggle"), settingsDrawer: q("#settings-drawer"), settingsOverlay: q("#settings-overlay"), settingsClose: q("#settings-close"), settingsSections: [...document.querySelectorAll("[data-settings-section]")], settingsSectionToggles: [...document.querySelectorAll("[data-settings-section-toggle]")], live: q("#setting-live-translate"), themeModeOptions: [...document.querySelectorAll("[data-theme-mode-option]")], accentOptions: [...document.querySelectorAll("[data-accent-option]")], settingGlass: q("#setting-glass-effect"), contactDock: q(".contact-dock"), contactCard: q("#contact-card"), contactDockToggle: q("#contact-dock-toggle"), contactDockPeek: q("#contact-dock-peek"), contactEmail: document.querySelector('a[href="mailto:toldibenjamin@gmail.com"]'),
  languageToggle: q("#language-toggle"), languageToggleLabel: q("#language-toggle-label"), feedbackFab: q("#feedback-fab"), feedbackDialog: q("#feedback-dialog"), feedbackDialogOverlay: q("#feedback-dialog-overlay"), feedbackDialogClose: q("#feedback-dialog-close"), feedbackTypeOptions: [...document.querySelectorAll("[data-feedback-type]")], feedbackMessageField: document.querySelector('.feedback-field[for="feedback-message"]'), feedbackMessage: q("#feedback-message"), feedbackMessageError: q("#feedback-message-error"), feedbackMessageCounter: q("#feedback-message-counter"), feedbackContact: q("#feedback-contact"), feedbackScreenshotInput: q("#feedback-screenshot"), feedbackScreenshotTrigger: q("#feedback-screenshot-trigger"), feedbackScreenshotClear: q("#feedback-screenshot-clear"), feedbackScreenshotCard: q("#feedback-screenshot-card"), feedbackScreenshotName: q("#feedback-screenshot-name"), feedbackScreenshotSize: q("#feedback-screenshot-size"), feedbackIncludeSystem: q("#feedback-include-system"), feedbackNotice: q("#feedback-notice"), feedbackSend: q("#feedback-send"),
  streakTrigger: q("#streak-trigger"), streakTriggerValue: q("#streak-trigger-value"), streakOverlay: q("#streak-overlay"), streakPanel: q("#streak-panel"), streakPanelClose: q("#streak-panel-close"), streakCurrentValue: q("#streak-current-value"), streakCurrentCopy: q("#streak-current-copy"), streakBestCopy: q("#streak-best-copy"), streakMeterFill: q("#streak-meter-fill"), streakWeek: q("#streak-week"), streakStatusValue: q("#streak-status-value"), streakStatusCopy: q("#streak-status-copy"), streakGoalValue: q("#streak-goal-value"), streakGoalCopy: q("#streak-goal-copy"), streakMonthPrev: q("#streak-month-prev"), streakMonthNext: q("#streak-month-next"), streakMonthLabel: q("#streak-month-label"), streakMonthMeta: q("#streak-month-meta"), streakCalendar: q("#streak-calendar"),
  usageStatsEmpty: q("#usage-stats-empty"), usageStatsContent: q("#usage-stats-content"), resetUsageStats: q("#reset-usage-stats"),
  statsUsageAge: q("#stats-usage-age"), statsFirstUse: q("#stats-first-use"), statsTranslationCount: q("#stats-translation-count"), statsCharacterCount: q("#stats-character-count"), statsWordCount: q("#stats-word-count"), statsSessionToday: q("#stats-session-today"), statsSessionTotal: q("#stats-session-total"), statsFavoriteLanguage: q("#stats-favorite-language"), statsMicCount: q("#stats-mic-count"), statsImageCount: q("#stats-image-count"), statsCorrectionCount: q("#stats-correction-count"),
  resetStatsDialog: q("#stats-reset-dialog"), resetStatsDialogOverlay: q("#stats-reset-dialog-overlay"), resetStatsCancel: q("#stats-reset-cancel"), resetStatsConfirm: q("#stats-reset-confirm")
};

const UI_LANGUAGE_CHOICES = {
  hu: { short: "HU", name: "Magyar", flag: "https://flagcdn.com/hu.svg" },
  en: { short: "EN", name: "English", flag: "https://flagcdn.com/gb.svg" }
};

const state = {
  settings: loadSettings(), mode: "text", textSubmode: "translate", timer: 0, correctionTimer: 0, req: 0, correctionReq: 0, imageReq: 0, docReq: 0, lastDetected: "", historySaveTimer: 0, statsAutoTimer: 0, pendingTextStatsSignature: "", resetStatsDialogOpen: false, resetStatsReturnFocus: null, feedbackDialogOpen: false, feedbackReturnFocus: null, feedbackSending: false, feedbackNotice: { tone: "", message: "" }, feedbackScreenshot: null, feedbackDraft: loadFeedbackDraft(),
  languageMenuOpen: false,
  streakPanelOpen: false,
  streakReturnFocus: null,
  streakMonthKey: "",
  sessionStartedAt: 0,
  sessionTicker: 0,
  history: loadMemoryList(HISTORY_STORAGE_KEY),
  favorites: loadMemoryList(FAVORITES_STORAGE_KEY),
  languageFavorites: loadLanguageFavorites(),
  stats: loadUsageStats(),
  mic: {
    recognition: null,
    supported: false,
    listening: false,
    processing: false,
    mergeMode: "append",
    baseText: "",
    finalText: "",
    interimText: "",
    silenceTimer: 0,
    lastError: "",
    deviceLabel: "",
    ignoreAbortError: false,
    silentEnd: false,
    startToken: 0,
    engine: "",
    stream: null,
    recorder: null,
    recorderChunks: [],
    recorderMimeType: "",
    startTimeout: 0,
    volumeTimer: 0,
    audioContext: null,
    analyser: null,
    analyserSource: null,
    lastVoiceAt: 0,
    usageTracked: false
  },
  image: { file: null, dataUrl: "", translatedDataUrl: "" },
  doc: { file: null, text: "", translatedText: "", downloadUrl: "" }
};

init();

function init() {
  populateSelects();
  setupLanguageSelects();
  setupUiLanguageMenu();
  bind();
  applySettings();
  closeSettings();
  setMode("text");
  resetText();
  resetCorrectionEditor();
  resetImage();
  resetDoc();
  updateCounter();
  updateHint();
  recordDailyVisit();
  renderMemoryPanels();
  renderUsageStats();
  renderStreakUi();
  renderFeedbackDialog();
  syncFavoriteButton();
  setTextSubmode("translate");
  initMicUi();
  syncSessionTracking();
}

function q(s) { return document.querySelector(s); }
function on(node, ev, fn) { if (node) node.addEventListener(ev, fn); }
function openFilePicker(input) { if (!input) return; input.value = ""; input.click(); }

function bind() {
  on(el.modeText, "click", () => setMode("text")); on(el.modeImage, "click", () => setMode("image")); on(el.modeDocument, "click", () => setMode("document"));
  on(el.textSubmode, "change", e => setTextSubmode(e.target.value));
  on(el.sourceText, "input", () => { updateCounter(); updateHint(); refreshMicUi(); syncFavoriteButton(); scheduleTranslate(); });
  on(el.source, "change", () => { updateHint(); syncFavoriteButton(); scheduleTranslate(); }); on(el.target, "change", () => { syncFavoriteButton(); scheduleTranslate(); });
  on(el.translate, "click", () => void runTranslate(true)); on(el.swap, "click", swapText); on(el.clear, "click", clearText); on(el.mic, "click", () => void toggleMicCapture()); on(el.copyFloat, "click", () => copyText(renderedText())); on(el.copyCorrection, "click", () => copyText(renderedCorrectionText())); on(el.speak, "click", speakText);
  on(el.correctionInput, "input", () => { updateCorrectionCounter(); scheduleCorrection(); }); on(el.correctionSource, "change", () => scheduleCorrection(true)); on(el.clearCorrection, "click", clearCorrectionText); on(el.runCorrection, "click", () => void runCorrection(true));
  [el.optionAccents, el.optionSpelling, el.optionPunctuation, el.optionStyle].forEach(node => on(node, "change", () => scheduleCorrection(true)));
  on(el.imageSwap, "click", () => swapSelects(el.imageSource, el.imageTarget, true)); on(el.pickImage, "click", () => openFilePicker(el.imageInput)); on(el.replaceImage, "click", () => openFilePicker(el.imageInput)); on(el.removeImage, "click", clearImage); on(el.imageInput, "change", e => { const f = [...(e.target.files || [])][0]; if (f) void setImage(f); }); on(el.pasteImage, "click", pasteImageFromClipboard); on(el.imageRun, "click", () => void runImageTranslate()); on(el.showOriginalImage, "click", () => showImage(false)); on(el.showTranslatedImage, "click", () => showImage(true)); on(el.copyImage, "click", () => void copyCurrentImage());
  on(el.imageDropzone, "dragover", e => e.preventDefault()); on(el.imageDropzone, "drop", e => { e.preventDefault(); const f = [...(e.dataTransfer?.files || [])].find(x => x.type.startsWith("image/")); if (f) void setImage(f); });
  on(el.docSwap, "click", () => swapSelects(el.docSource, el.docTarget, true)); on(el.pickDoc, "click", () => openFilePicker(el.docInput)); on(el.replaceDoc, "click", () => openFilePicker(el.docInput)); on(el.removeDoc, "click", clearDoc); on(el.docInput, "change", e => { const f = [...(e.target.files || [])][0]; if (f) void setDoc(f); }); on(el.docDropzone, "dragover", e => e.preventDefault()); on(el.docDropzone, "drop", e => { e.preventDefault(); const f = [...(e.dataTransfer?.files || [])][0]; if (f) void setDoc(f); }); on(el.docRun, "click", () => void runDocTranslate()); on(el.copyDoc, "click", () => copyText(renderedDocumentText())); on(el.downloadDoc, "click", event => { if (!state.doc.downloadUrl || !hasDocumentTranslation()) event.preventDefault(); });
  on(el.themeCycle, "click", cycleTheme); on(el.settingsToggle, "click", openSettings); on(el.settingsOverlay, "click", closeSettings); on(el.settingsClose, "click", closeSettings); on(el.live, "change", e => { state.settings.liveTranslate = !!e.target.checked; saveSettings(); applySettings(); if (state.settings.liveTranslate) scheduleTranslate(); });
  el.settingsSectionToggles.forEach(btn => on(btn, "click", () => toggleSettingsSection(btn.dataset.settingsSectionToggle)));
  el.themeModeOptions.forEach(btn => on(btn, "click", () => { state.settings.themeMode = normalizeThemeMode(btn.dataset.themeModeOption); saveSettings(); applySettings(); }));
  el.accentOptions.forEach(btn => on(btn, "click", () => { state.settings.accentTheme = normalizeAccentTheme(btn.dataset.accentOption); saveSettings(); applySettings(); }));
  on(el.settingGlass, "change", e => { state.settings.surface = e.target.checked ? "glass" : "solid"; saveSettings(); applySettings(); });
  on(el.contactDockToggle, "click", () => setContactDockCollapsed(true));
  on(el.contactDockPeek, "click", () => setContactDockCollapsed(false));
  on(el.streakTrigger, "click", toggleStreakPanel);
  on(el.streakOverlay, "click", () => closeStreakPanel());
  on(el.streakPanelClose, "click", () => closeStreakPanel());
  on(el.streakMonthPrev, "click", () => shiftStreakMonth(-1));
  on(el.streakMonthNext, "click", () => shiftStreakMonth(1));
  on(el.languageToggle, "click", event => {
    event.preventDefault();
    event.stopPropagation();
    toggleUiLanguageMenu();
  });
  el.languageOptions?.forEach(option => on(option, "click", event => {
    event.preventDefault();
    event.stopPropagation();
    setUiLanguage(option.dataset.uiLanguageOption);
  }));
  on(el.feedbackFab, "click", openFeedbackDialog);
  on(el.feedbackDialogOverlay, "click", closeFeedbackDialog);
  on(el.feedbackDialogClose, "click", closeFeedbackDialog);
  el.feedbackTypeOptions.forEach(btn => on(btn, "click", () => {
    state.feedbackDraft.type = normalizeFeedbackType(btn.dataset.feedbackType);
    saveFeedbackDraft();
    clearFeedbackNotice();
    syncFeedbackDraftUi();
  }));
  on(el.feedbackMessage, "input", event => {
    state.feedbackDraft.message = event.target.value;
    saveFeedbackDraft();
    clearFeedbackValidation();
    clearFeedbackNotice();
    syncFeedbackDraftUi();
  });
  on(el.feedbackContact, "input", event => { state.feedbackDraft.contact = event.target.value; saveFeedbackDraft(); syncFeedbackDraftUi(); });
  on(el.feedbackIncludeSystem, "change", event => { state.settings.feedbackIncludeSystem = !!event.target.checked; saveSettings(); applySettings(); syncFeedbackDraftUi(); });
  on(el.feedbackScreenshotTrigger, "click", () => openFilePicker(el.feedbackScreenshotInput));
  on(el.feedbackScreenshotInput, "change", event => { const file = [...(event.target.files || [])][0]; if (file) void setFeedbackScreenshot(file); });
  on(el.feedbackScreenshotClear, "click", clearFeedbackScreenshot);
  on(el.feedbackSend, "click", () => void sendFeedback());
  on(el.resetUsageStats, "click", openResetUsageStatsDialog);
  on(el.resetStatsDialogOverlay, "click", closeResetUsageStatsDialog);
  on(el.resetStatsCancel, "click", closeResetUsageStatsDialog);
  on(el.resetStatsConfirm, "click", resetUsageStats);
  on(el.favoriteTranslation, "click", () => toggleCurrentFavorite());
  on(el.clearHistory, "click", clearHistoryList);
  on(el.clearFavorites, "click", clearFavoritesList);
  on(el.historyList, "click", handleMemoryListClick);
  on(el.favoritesList, "click", handleMemoryListClick);
  on(el.contactEmail, "click", event => { event.preventDefault(); copyText(FEEDBACK_EMAIL); });
  document.addEventListener("keydown", e => {
    if (state.languageMenuOpen && e.key === "Escape") {
      closeAllSearchableSelects();
      closeLanguageMenu(true);
      return;
    }
    if (state.streakPanelOpen && e.key === "Escape") {
      closeAllSearchableSelects();
      closeStreakPanel();
      return;
    }
    if (state.feedbackDialogOpen) {
      if (e.key === "Escape") {
        closeAllSearchableSelects();
        closeFeedbackDialog();
        return;
      }
      if (e.key === "Tab") {
        trapFeedbackDialogFocus(e);
        return;
      }
    }
    if (state.resetStatsDialogOpen) {
      if (e.key === "Escape") {
        closeAllSearchableSelects();
        closeResetUsageStatsDialog();
        return;
      }
      if (e.key === "Tab") {
        trapResetStatsDialogFocus(e);
        return;
      }
    }
    if (e.key === "Escape") {
      closeAllSearchableSelects();
      closeSettings();
    }
  });
  document.addEventListener("click", e => {
    const target = e.target instanceof Element ? e.target : null;
    if (!target) return;
    if (!target.closest(".language-select")) closeAllSearchableSelects();
    if (!target.closest("#language-picker")) closeLanguageMenu(false);
    if (state.streakPanelOpen && !target.closest("#streak-trigger") && !target.closest("#streak-panel")) closeStreakPanel(false);
  });
  document.addEventListener("paste", e => {
    const item = [...(e.clipboardData?.items || [])].find(x => x.type.startsWith("image/"));
    const f = item ? item.getAsFile() : null;
    if (!f) return;
    if (state.feedbackDialogOpen) {
      e.preventDefault();
      void setFeedbackScreenshot(f);
      return;
    }
    if (state.mode !== "image") return;
    e.preventDefault();
    void setImage(f);
  });
  document.addEventListener("visibilitychange", syncSessionTracking);
  window.addEventListener("pagehide", () => stopSessionTracking(true));
  window.addEventListener("beforeunload", () => stopSessionTracking(true));
  window.addEventListener("beforeunload", revokeDocUrl);
}

function normalizeThemeMode(value) {
  return ["light", "dark", "amoled"].includes(value) ? value : "dark";
}

function normalizeAccentTheme(value) {
  return ["base", "neon", "cyber", "green", "gradient"].includes(value) ? value : "base";
}

function normalizeSettingsSectionKey(value) {
  return SETTINGS_SECTION_KEYS.includes(value) ? value : "appearance";
}

function normalizeCollapsedSections(value) {
  const parsed = value && typeof value === "object" ? value : {};
  return SETTINGS_SECTION_KEYS.reduce((result, key) => {
    result[key] = parsed[key] === true;
    return result;
  }, { ...DEFAULT_COLLAPSED_SECTIONS });
}

function normalizeSurface(value) {
  return value === "solid" ? "solid" : "glass";
}

function normalizeUiLanguage(value) {
  return value === "en" ? "en" : "hu";
}

function normalizeSettings(value) {
  const parsed = value && typeof value === "object" ? value : {};
  const legacyTheme = parsed.theme;
  return {
    ...DEFAULT_SETTINGS,
    themeMode: normalizeThemeMode(parsed.themeMode || legacyTheme),
    accentTheme: normalizeAccentTheme(parsed.accentTheme),
    surface: normalizeSurface(parsed.surface),
    uiLanguage: normalizeUiLanguage(parsed.uiLanguage),
    contactDockCollapsed: parsed.contactDockCollapsed === true,
    collapsedSections: normalizeCollapsedSections(parsed.collapsedSections),
    liveTranslate: parsed.liveTranslate !== false,
    feedbackIncludeSystem: parsed.feedbackIncludeSystem !== false,
    micMergeMode: parsed.micMergeMode === "replace" ? "replace" : "append"
  };
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return normalizeSettings(raw ? JSON.parse(raw) : null);
  } catch {
    return normalizeSettings(null);
  }
}

function saveSettings() {
  state.settings = normalizeSettings(state.settings);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
}

function normalizeFeedbackType(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "opinion") return "idea";
  return ["bug", "ui", "translation", "idea"].includes(normalized) ? normalized : "bug";
}

function normalizeFeedbackDraft(value) {
  const parsed = value && typeof value === "object" ? value : {};
  return {
    type: normalizeFeedbackType(parsed.type),
    message: typeof parsed.message === "string" ? parsed.message.slice(0, FEEDBACK_MESSAGE_MAX_CHARS) : "",
    contact: typeof parsed.contact === "string" ? parsed.contact.slice(0, 120) : ""
  };
}

function loadFeedbackDraft() {
  try {
    const raw = localStorage.getItem(FEEDBACK_DRAFT_STORAGE_KEY);
    return normalizeFeedbackDraft(raw ? JSON.parse(raw) : null);
  } catch {
    return normalizeFeedbackDraft(null);
  }
}

function saveFeedbackDraft() {
  state.feedbackDraft = normalizeFeedbackDraft(state.feedbackDraft);
  localStorage.setItem(FEEDBACK_DRAFT_STORAGE_KEY, JSON.stringify(state.feedbackDraft));
}

function loadMemoryList(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(item => item && typeof item === "object") : [];
  } catch {
    return [];
  }
}
function saveMemoryList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {}
}
function loadLanguageFavorites() {
  try {
    const raw = localStorage.getItem(LANGUAGE_FAVORITES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? [...new Set(parsed.filter(code => typeof code === "string"))] : [];
  } catch {
    return [];
  }
}
function saveLanguageFavorites() {
  try {
    localStorage.setItem(LANGUAGE_FAVORITES_STORAGE_KEY, JSON.stringify(state.languageFavorites));
  } catch {}
}
function createUsageStats() {
  return {
    version: 3,
    firstUsedAt: "",
    lastUsedAt: "",
    streakDays: 0,
    streakBest: 0,
    streakLastVisitDay: "",
    visitedDays: [],
    todaySessionDay: "",
    todaySessionMs: 0,
    totalSessionMs: 0,
    translationCount: 0,
    translatedCharacters: 0,
    translatedWords: 0,
    targetLanguageUsage: {},
    microphoneUses: 0,
    imageTranslationUses: 0,
    correctionUses: 0
  };
}
function normalizeStatCount(value) {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? Math.round(count) : 0;
}

function normalizeVisitedDays(value, fallbackDay = "") {
  const unique = new Set();
  if (Array.isArray(value)) {
    value.forEach(item => {
      const parsed = parseLocalDayKey(item);
      const key = parsed ? formatLocalDayKey(parsed) : "";
      if (key) unique.add(key);
    });
  }
  const parsedFallback = parseLocalDayKey(fallbackDay);
  const normalizedFallback = parsedFallback ? formatLocalDayKey(parsedFallback) : "";
  if (normalizedFallback) unique.add(normalizedFallback);
  return [...unique].sort((a, b) => a.localeCompare(b));
}

function normalizeUsageStats(value) {
  const base = createUsageStats();
  const source = value && typeof value === "object" ? value : {};
  const usage = source.targetLanguageUsage && typeof source.targetLanguageUsage === "object" ? source.targetLanguageUsage : {};
  const targetLanguageUsage = Object.fromEntries(
    Object.entries(usage)
      .filter(([code]) => typeof code === "string" && code)
      .map(([code, count]) => [code, normalizeStatCount(count)])
      .filter(([, count]) => count > 0)
  );

  return {
    ...base,
    firstUsedAt: typeof source.firstUsedAt === "string" ? source.firstUsedAt : "",
    lastUsedAt: typeof source.lastUsedAt === "string" ? source.lastUsedAt : "",
    streakDays: normalizeStatCount(source.streakDays),
    streakBest: normalizeStatCount(source.streakBest),
    streakLastVisitDay: typeof source.streakLastVisitDay === "string" ? source.streakLastVisitDay : "",
    visitedDays: normalizeVisitedDays(source.visitedDays, source.streakLastVisitDay),
    todaySessionDay: typeof source.todaySessionDay === "string" ? source.todaySessionDay : "",
    todaySessionMs: normalizeStatCount(source.todaySessionMs),
    totalSessionMs: normalizeStatCount(source.totalSessionMs),
    translationCount: normalizeStatCount(source.translationCount),
    translatedCharacters: normalizeStatCount(source.translatedCharacters),
    translatedWords: normalizeStatCount(source.translatedWords),
    targetLanguageUsage,
    microphoneUses: normalizeStatCount(source.microphoneUses),
    imageTranslationUses: normalizeStatCount(source.imageTranslationUses),
    correctionUses: normalizeStatCount(source.correctionUses)
  };
}
function hasUsageStatsData(stats = state.stats) {
  const value = normalizeUsageStats(stats);
  return !!(
    value.firstUsedAt ||
    value.lastUsedAt ||
    value.streakDays ||
    value.streakBest ||
    value.streakLastVisitDay ||
    value.visitedDays.length ||
    value.todaySessionDay ||
    value.todaySessionMs ||
    value.totalSessionMs ||
    value.translationCount ||
    value.translatedCharacters ||
    value.translatedWords ||
    value.microphoneUses ||
    value.imageTranslationUses ||
    value.correctionUses ||
    Object.keys(value.targetLanguageUsage).length
  );
}
function loadUsageStats() {
  try {
    const raw = localStorage.getItem(USAGE_STATS_STORAGE_KEY);
    return normalizeUsageStats(raw ? JSON.parse(raw) : null);
  } catch {
    return createUsageStats();
  }
}
function saveUsageStats() {
  try {
    if (!hasUsageStatsData()) {
      localStorage.removeItem(USAGE_STATS_STORAGE_KEY);
      return;
    }
    localStorage.setItem(USAGE_STATS_STORAGE_KEY, JSON.stringify(state.stats));
  } catch {}
}

function formatLocalDayKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDayKey(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatMonthKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function parseMonthKey(value) {
  const match = /^(\d{4})-(\d{2})$/.exec(String(value || ""));
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
  return Number.isNaN(date.getTime()) ? null : date;
}

function shiftMonthKey(value, delta) {
  const current = parseMonthKey(value) || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  return formatMonthKey(new Date(current.getFullYear(), current.getMonth() + Number(delta || 0), 1));
}

function formatStreakMonthLabel(value) {
  const date = parseMonthKey(value) || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const formatted = new Intl.DateTimeFormat(uiLocale(), { year: "numeric", month: "long" }).format(date);
  return formatted.charAt(0).toLocaleUpperCase(uiLocale()) + formatted.slice(1);
}

function getVisitedDaySet(stats = state.stats) {
  return new Set(normalizeUsageStats(stats).visitedDays);
}

function getCurrentStreakDaySet(stats = state.stats) {
  const activeDays = getActiveStreakDays(stats);
  const keys = new Set();
  if (!activeDays) return keys;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let offset = 0; offset < activeDays; offset += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
    keys.add(formatLocalDayKey(date));
  }
  return keys;
}

function getStreakMonthBounds(stats = state.stats) {
  const normalized = normalizeUsageStats(stats);
  const todayMonthKey = formatMonthKey(new Date());
  const firstDay = normalized.visitedDays[0]
    || formatLocalDayKey(safeDate(normalized.firstUsedAt))
    || formatLocalDayKey(new Date());
  const minMonthKey = formatMonthKey(parseLocalDayKey(firstDay) || new Date());
  return {
    minMonthKey: minMonthKey || todayMonthKey,
    maxMonthKey: todayMonthKey
  };
}

function clampStreakMonthKey(value, stats = state.stats) {
  const { minMonthKey, maxMonthKey } = getStreakMonthBounds(stats);
  const normalized = formatMonthKey(parseMonthKey(value) || new Date());
  if (normalized.localeCompare(minMonthKey) < 0) return minMonthKey;
  if (normalized.localeCompare(maxMonthKey) > 0) return maxMonthKey;
  return normalized;
}

function setStreakMonthKey(value) {
  state.streakMonthKey = clampStreakMonthKey(value);
}

function diffLocalDayKeys(fromKey, toKey) {
  const from = parseLocalDayKey(fromKey);
  const to = parseLocalDayKey(toKey);
  if (!from || !to) return 0;
  const fromStart = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const toStart = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((toStart - fromStart) / 86400000);
}

function addSessionDuration(stats, fromTime, toTime) {
  const startMs = Number(fromTime);
  const endMs = Number(toTime);
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) return;

  stats.totalSessionMs = normalizeStatCount(stats.totalSessionMs) + Math.round(endMs - startMs);

  const endDayKey = formatLocalDayKey(new Date(endMs));
  let cursor = startMs;

  while (cursor < endMs) {
    const sliceStart = new Date(cursor);
    const nextMidnight = new Date(sliceStart.getFullYear(), sliceStart.getMonth(), sliceStart.getDate() + 1).getTime();
    const sliceEnd = Math.min(endMs, nextMidnight);
    const dayKey = formatLocalDayKey(sliceStart);
    if (dayKey === endDayKey) {
      if (stats.todaySessionDay !== dayKey) {
        stats.todaySessionDay = dayKey;
        stats.todaySessionMs = 0;
      }
      stats.todaySessionMs = normalizeStatCount(stats.todaySessionMs) + Math.round(sliceEnd - cursor);
    }
    cursor = sliceEnd;
  }
}

function addVisitedDay(stats, date = new Date()) {
  const dayKey = formatLocalDayKey(date);
  if (!dayKey) return;
  stats.visitedDays = normalizeVisitedDays([...(Array.isArray(stats.visitedDays) ? stats.visitedDays : []), dayKey], dayKey);
}

function getSessionSnapshot(now = Date.now()) {
  const snapshot = normalizeUsageStats({
    ...state.stats,
    targetLanguageUsage: { ...state.stats.targetLanguageUsage }
  });
  if (state.sessionStartedAt) addSessionDuration(snapshot, state.sessionStartedAt, now);
  return snapshot;
}

function formatSessionDuration(value) {
  const totalMinutes = Math.max(0, Math.floor(normalizeStatCount(value) / 60000));
  if (totalMinutes < 60) return `${totalMinutes} ${st("sessionMinute")}`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!minutes) return `${hours} ${st("sessionHour")}`;
  return `${hours} ${st("sessionHour")} ${minutes} ${st("sessionMinute")}`;
}

function updateUsageStreak(stats, date = new Date()) {
  const todayKey = formatLocalDayKey(date);
  if (!todayKey) return;
  addVisitedDay(stats, date);
  const currentBest = normalizeStatCount(stats.streakBest);
  const lastVisitDay = String(stats.streakLastVisitDay || "");

  if (!lastVisitDay) {
    stats.streakDays = 0;
    stats.streakBest = currentBest;
    stats.streakLastVisitDay = todayKey;
    return;
  }

  const diffDays = diffLocalDayKeys(lastVisitDay, todayKey);
  if (diffDays <= 0) return;
  stats.streakDays = diffDays === 1 ? normalizeStatCount(stats.streakDays) + 1 : 0;
  stats.streakLastVisitDay = todayKey;
  stats.streakBest = Math.max(currentBest, stats.streakDays);
}

function getActiveStreakDays(stats = state.stats) {
  const normalized = normalizeUsageStats(stats);
  if (!normalized.streakLastVisitDay) return 0;
  const todayKey = formatLocalDayKey(new Date());
  if (normalized.streakLastVisitDay !== todayKey) return 0;
  return Math.max(1, normalizeStatCount(normalized.streakDays) + 1);
}

function hasCompletedToday(stats = state.stats) {
  return normalizeUsageStats(stats).streakLastVisitDay === formatLocalDayKey(new Date());
}

function countVisitedDaysInMonth(monthKey, stats = state.stats) {
  const normalizedMonthKey = clampStreakMonthKey(monthKey, stats);
  return normalizeUsageStats(stats).visitedDays.filter(dayKey => dayKey.startsWith(`${normalizedMonthKey}-`)).length;
}

function getNextStreakGoal(streakValue) {
  const current = normalizeStatCount(streakValue);
  const milestones = [3, 7, 30, 100];
  const nextTarget = milestones.find(target => target > current);
  if (!nextTarget) {
    return {
      target: 100,
      label: st("streakLegend"),
      remaining: 0,
      copy: st("streakLegendCopy")
    };
  }
  const remaining = Math.max(0, nextTarget - current);
  return {
    target: nextTarget,
    label: st("streakGoal", { count: nextTarget }),
    remaining,
    copy: remaining > 0 ? st("streakGoalRemaining", { count: remaining }) : st("streakGoalAlmost")
  };
}

function formatStreakStatusCopy(stats = state.stats) {
  return hasCompletedToday(stats)
    ? st("streakDoneCopy")
    : st("streakPendingCopy");
}

function formatStreakCopy(stats = state.stats) {
  const normalized = normalizeUsageStats(stats);
  if (!normalized.streakLastVisitDay) return st("streakStartedTodayCopy");
  if (normalized.streakDays <= 0) return st("streakZeroCopy");
  if (normalized.streakDays === 1) return st("streakOneCopy");
  return st("streakDaysCopy", { count: normalized.streakDays });
}

function describeStreakCalendarDay({ dayKey, isVisited, isActive, isToday, isFuture, isMissed }) {
  const date = parseLocalDayKey(dayKey);
  const dateLabel = date
    ? new Intl.DateTimeFormat(uiLocale(), { year: "numeric", month: "long", day: "numeric" }).format(date)
    : dayKey;
  const states = [];
  if (isToday) states.push(st("streakToday"));
  if (isActive) states.push(st("streakActive"));
  else if (isVisited) states.push(st("streakVisited"));
  else if (isMissed) states.push(st("streakMissed"));
  else if (isFuture) states.push(st("streakFuture"));
  else states.push(st("streakNone"));
  return `${dateLabel} • ${states.join(" • ")}`;
}

function renderStreakWeek(stats = state.stats) {
  if (!el.streakWeek) return;
  const streakSet = getCurrentStreakDaySet(stats);
  const weekdayLabels = uiLanguage() === "en" ? ["S", "M", "T", "W", "T", "F", "S"] : ["V", "H", "K", "Sze", "Cs", "P", "Szo"];
  const cells = [];

  for (let offset = -3; offset <= 3; offset += 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    const dayKey = formatLocalDayKey(date);
    const isActive = streakSet.has(dayKey);
    const isToday = offset === 0;
    const isFuture = offset > 0;
    cells.push(`
      <div class="streak-day${isActive ? " is-active" : ""}${isToday ? " is-today" : ""}${isFuture ? " is-future" : ""}">
        <span class="streak-day__label">${weekdayLabels[date.getDay()] || ""}</span>
        <span class="streak-day__bar"></span>
        <span class="streak-day__date">${date.getDate()}</span>
      </div>
    `);
  }

  el.streakWeek.innerHTML = cells.join("");
}

function renderStreakCalendar(stats = state.stats) {
  if (!el.streakCalendar || !el.streakMonthLabel) return;
  if (!state.streakMonthKey) setStreakMonthKey(formatMonthKey(new Date()));
  const monthKey = clampStreakMonthKey(state.streakMonthKey, stats);
  state.streakMonthKey = monthKey;
  const monthDate = parseMonthKey(monthKey) || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const { minMonthKey, maxMonthKey } = getStreakMonthBounds(stats);
  const firstTrackedDate = parseLocalDayKey(normalizeUsageStats(stats).visitedDays[0])
    || safeDate(normalizeUsageStats(stats).firstUsedAt)
    || null;
  const visitedDays = getVisitedDaySet(stats);
  const streakDays = getCurrentStreakDaySet(stats);
  const todayKey = formatLocalDayKey(new Date());
  const todayDate = parseLocalDayKey(todayKey) || new Date();
  const monthActiveDays = countVisitedDaysInMonth(monthKey, stats);
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const firstWeekday = (monthDate.getDay() + 6) % 7;
  const monthCells = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    monthCells.push('<span class="streak-calendar__blank" aria-hidden="true"></span>');
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const dayKey = formatLocalDayKey(date);
    const isVisited = visitedDays.has(dayKey);
    const isActive = streakDays.has(dayKey);
    const isToday = dayKey === todayKey;
    const isFuture = date > todayDate;
    const isMissed = !isVisited && !isFuture && !!firstTrackedDate && date >= firstTrackedDate;
    const tooltip = describeStreakCalendarDay({ dayKey, isVisited, isActive, isToday, isFuture, isMissed });
    monthCells.push(`
      <div class="streak-calendar__day${isVisited ? " is-visited" : ""}${isActive ? " is-active" : ""}${isToday ? " is-today" : ""}${isFuture ? " is-future" : ""}${isMissed ? " is-missed" : ""}" tabindex="0" aria-label="${escapeHtml(tooltip)}" title="${escapeHtml(tooltip)}" data-tooltip="${escapeHtml(tooltip)}">
        <span class="streak-calendar__day-number">${day}</span>
        <span class="streak-calendar__day-dot" aria-hidden="true"></span>
      </div>
    `);
  }

  el.streakMonthLabel.textContent = formatStreakMonthLabel(monthKey);
  if (el.streakMonthMeta) el.streakMonthMeta.textContent = st("streakActiveMonth", { count: monthActiveDays });
  el.streakCalendar.innerHTML = monthCells.join("");
  if (el.streakMonthPrev) el.streakMonthPrev.disabled = monthKey.localeCompare(minMonthKey) <= 0;
  if (el.streakMonthNext) el.streakMonthNext.disabled = monthKey.localeCompare(maxMonthKey) >= 0;
}

function shiftStreakMonth(delta) {
  setStreakMonthKey(shiftMonthKey(state.streakMonthKey || formatMonthKey(new Date()), delta));
  renderStreakUi();
}

function renderStreakUi() {
  const streakDays = state.stats?.streakLastVisitDay ? normalizeStatCount(state.stats.streakDays) : 0;
  const bestDays = state.stats?.streakLastVisitDay ? normalizeStatCount(state.stats.streakBest) : 0;
  const activeDays = Math.min(7, getActiveStreakDays());
  const goal = getNextStreakGoal(streakDays);
  const completedToday = hasCompletedToday();

  if (el.streakTriggerValue) el.streakTriggerValue.textContent = String(streakDays);
  if (el.streakCurrentValue) el.streakCurrentValue.textContent = String(streakDays);
  if (el.streakCurrentCopy) el.streakCurrentCopy.textContent = formatStreakCopy();
  if (el.streakBestCopy) el.streakBestCopy.textContent = `${st("streakBestPrefix")}: ${bestDays} ${uiLanguage() === "en" ? "day" : "nap"}`;
  if (el.streakMeterFill) el.streakMeterFill.style.width = `${activeDays ? (activeDays / 7) * 100 : 0}%`;
  if (el.streakTrigger) el.streakTrigger.setAttribute("aria-label", `${uiLanguage() === "en" ? "Open streak" : "Streak megnyitása"}: ${streakDays} ${uiLanguage() === "en" ? "day" : "nap"}`);
  if (el.streakStatusValue) el.streakStatusValue.textContent = completedToday ? st("streakCompleted") : st("streakNotDone");
  if (el.streakStatusCopy) el.streakStatusCopy.textContent = formatStreakStatusCopy();
  if (el.streakGoalValue) el.streakGoalValue.textContent = goal.label;
  if (el.streakGoalCopy) el.streakGoalCopy.textContent = goal.copy;

  renderStreakWeek();
  renderStreakCalendar();
}

function stopSessionTicker() {
  if (!state.sessionTicker) return;
  clearInterval(state.sessionTicker);
  state.sessionTicker = 0;
}

function startSessionTicker() {
  if (state.sessionTicker) return;
  state.sessionTicker = window.setInterval(() => {
    if (!state.sessionStartedAt) {
      stopSessionTicker();
      return;
    }
    renderUsageStats();
  }, SESSION_RENDER_INTERVAL_MS);
}

function flushSessionTracking(save = true) {
  if (!state.sessionStartedAt) return;
  const startedAt = state.sessionStartedAt;
  state.sessionStartedAt = 0;
  stopSessionTicker();
  if (!save) {
    renderUsageStats();
    return;
  }

  const next = normalizeUsageStats({
    ...state.stats,
    targetLanguageUsage: { ...state.stats.targetLanguageUsage }
  });
  addSessionDuration(next, startedAt, Date.now());
  touchUsageStats(next);
  state.stats = normalizeUsageStats(next);
  saveUsageStats();
  renderUsageStats();
  renderStreakUi();
}

function syncSessionTracking() {
  if (document.visibilityState === "hidden") {
    flushSessionTracking(true);
    return;
  }
  if (state.sessionStartedAt) return;
  state.sessionStartedAt = Date.now();
  startSessionTicker();
  renderUsageStats();
}
function isFavoriteLanguage(code) {
  return state.languageFavorites.includes(code);
}
function favoriteLanguageOrder(code) {
  const index = state.languageFavorites.indexOf(code);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}
function sortLanguageOptions(options, aiValue, selectedValue = "") {
  return [...options].sort((a, b) => {
    if (aiValue) {
      if (a.value === aiValue && b.value !== aiValue) return -1;
      if (b.value === aiValue && a.value !== aiValue) return 1;
    }
    const aFavorite = isFavoriteLanguage(a.value);
    const bFavorite = isFavoriteLanguage(b.value);
    if (aFavorite && bFavorite) return favoriteLanguageOrder(a.value) - favoriteLanguageOrder(b.value);
    if (aFavorite !== bFavorite) return aFavorite ? -1 : 1;
    if (selectedValue) {
      if (a.value === selectedValue && b.value !== selectedValue) return -1;
      if (b.value === selectedValue && a.value !== selectedValue) return 1;
    }
    return a.textContent.localeCompare(b.textContent, uiLocale());
  });
}
function refreshLanguageFavoriteOptions() {
  searchableSelects().forEach(select => {
    if (!select.hasAttribute("data-searchable-language")) return;
    renderSearchableOptions(select, select._searchable?.search?.value || "");
    syncSearchableSelect(select);
  });
}
function toggleLanguageFavorite(code) {
  if (!code) return;
  if (isFavoriteLanguage(code)) state.languageFavorites = state.languageFavorites.filter(item => item !== code);
  else state.languageFavorites = [code, ...state.languageFavorites];
  saveLanguageFavorites();
  refreshLanguageFavoriteOptions();
}
function resolveThemeMode(themeMode = state.settings.themeMode) {
  return themeMode === "amoled" ? "amoled" : themeMode === "light" ? "light" : "dark";
}

function setNodeText(target, value) {
  const node = typeof target === "string" ? document.querySelector(target) : target;
  if (node) node.textContent = value;
}

function setNodeAttr(target, attribute, value) {
  const node = typeof target === "string" ? document.querySelector(target) : target;
  if (node) node.setAttribute(attribute, value);
}

function refreshSearchPlaceholders() {
  document.querySelectorAll("select[data-searchable-language]").forEach(select => {
    select.dataset.searchablePlaceholder = uiLanguage() === "en" ? "Search language" : "Nyelv keresése";
    if (select._searchable?.search) select._searchable.search.placeholder = select.dataset.searchablePlaceholder;
  });
  document.querySelectorAll("select[data-searchable-ui]").forEach(select => {
    select.dataset.searchablePlaceholder = uiLanguage() === "en" ? "Search mode" : "Mód keresése";
    if (select._searchable?.search) select._searchable.search.placeholder = select.dataset.searchablePlaceholder;
  });
}

function rebuildLanguageSelects() {
  const langs = buildLanguages();
  [
    [el.source, true, "auto"],
    [el.target, false, "en"],
    [el.imageSource, true, "auto"],
    [el.imageTarget, false, "en"],
    [el.docSource, true, "auto"],
    [el.docTarget, false, "en"],
    [el.correctionSource, true, "auto"]
  ].forEach(([node, allowAuto, fallback]) => {
    if (!node) return;
    fill(node, langs, allowAuto, node.value || fallback);
  });
}

function toggleUiLanguage() {
  state.settings.uiLanguage = uiLanguage() === "en" ? "hu" : "en";
  saveSettings();
  applySettings();
}

function setupUiLanguageMenu() {
  if (!el.languageToggle || el.languagePicker) return;
  const trigger = el.languageToggle;
  const picker = document.createElement("div");
  picker.id = "language-picker";
  picker.className = "language-fab";
  trigger.parentNode?.insertBefore(picker, trigger);
  picker.appendChild(trigger);

  trigger.className = "feedback-fab feedback-fab--language language-fab__trigger";
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "language-menu");
  trigger.innerHTML = `
    <span class="feedback-fab__icon language-fab__flag" aria-hidden="true">
      <img id="language-toggle-flag" class="language-fab__flag-image" src="${UI_LANGUAGE_CHOICES.hu.flag}" alt="" loading="lazy" decoding="async">
    </span>
    <span id="language-toggle-label" class="feedback-fab__label">${UI_LANGUAGE_CHOICES.hu.short}</span>
    <span class="language-fab__chevron" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="m6.5 9.5 5.5 5 5.5-5" />
      </svg>
    </span>
  `;

  const menu = document.createElement("div");
  menu.id = "language-menu";
  menu.className = "language-fab__menu";
  menu.hidden = true;
  menu.setAttribute("role", "menu");

  Object.entries(UI_LANGUAGE_CHOICES).forEach(([code, config]) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "language-fab__option";
    option.dataset.uiLanguageOption = code;
    option.setAttribute("role", "menuitemradio");
    option.setAttribute("aria-checked", "false");
    option.innerHTML = `
      <span class="language-fab__option-flag" aria-hidden="true">
        <img class="language-fab__flag-image" src="${config.flag}" alt="" loading="lazy" decoding="async">
      </span>
      <span class="language-fab__option-text">${config.name}</span>
      <span class="language-fab__option-check" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="m6.5 12.5 3.5 3.5 7.5-8" />
        </svg>
      </span>
    `;
    menu.appendChild(option);
  });

  picker.appendChild(menu);
  el.languagePicker = picker;
  el.languageMenu = menu;
  el.languageToggle = trigger;
  el.languageToggleFlag = picker.querySelector("#language-toggle-flag");
  el.languageToggleLabel = picker.querySelector("#language-toggle-label");
  el.languageOptions = [...picker.querySelectorAll("[data-ui-language-option]")];
}

function closeLanguageMenu(restoreFocus = false) {
  if (!el.languageMenu || !el.languageToggle || !el.languagePicker) return;
  state.languageMenuOpen = false;
  el.languageMenu.hidden = true;
  el.languageToggle.setAttribute("aria-expanded", "false");
  el.languagePicker.classList.remove("is-open");
  if (restoreFocus) el.languageToggle.focus();
}

function openLanguageMenu() {
  if (!el.languageMenu || !el.languageToggle || !el.languagePicker) return;
  state.languageMenuOpen = true;
  el.languageMenu.hidden = false;
  el.languageToggle.setAttribute("aria-expanded", "true");
  el.languagePicker.classList.add("is-open");
}

function toggleUiLanguageMenu() {
  if (state.languageMenuOpen) closeLanguageMenu(true);
  else openLanguageMenu();
}

function setUiLanguage(value) {
  const next = normalizeUiLanguage(value);
  if (next === uiLanguage()) {
    closeLanguageMenu(true);
    return;
  }
  state.settings.uiLanguage = next;
  saveSettings();
  applySettings();
  closeLanguageMenu(false);
}

function syncUiLanguageMenu() {
  const current = normalizeUiLanguage(uiLanguage());
  const config = UI_LANGUAGE_CHOICES[current] || UI_LANGUAGE_CHOICES.hu;
  if (el.languageToggleLabel) el.languageToggleLabel.textContent = config.short;
  if (el.languageToggleFlag) el.languageToggleFlag.src = config.flag;
  if (el.languageToggleFlag) el.languageToggleFlag.alt = "";
  if (el.languageOptions?.length) {
    el.languageOptions.forEach(option => {
      const isActive = option.dataset.uiLanguageOption === current;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-checked", String(isActive));
    });
  }
}

function applyLanguage() {
  const currentLang = uiLanguage();
  const themeLabels = themeModeLabels();
  const accentLabels = accentThemeLabels();
  const feedbackLabels = feedbackCategoryLabels();

  document.documentElement.lang = currentLang;
  if (document.body) document.body.dataset.uiLanguage = currentLang;
  document.title = currentLang === "en" ? "Nova Translator | Modern web translator" : "Nova Fordító | Modern webes fordító";
  setNodeAttr('meta[name="application-name"]', "content", currentLang === "en" ? "Nova Translator" : "Nova Fordító");
  setNodeAttr('meta[name="description"]', "content", currentLang === "en"
    ? "Modern web translator with dark UI, fast settings, and real-time translation."
    : "Modern webes fordító sötét témával, gyors beállításokkal és valós idejű fordítási lehetőséggel.");
  setNodeAttr('meta[property="og:locale"]', "content", currentLang === "en" ? "en_US" : "hu_HU");
  setNodeAttr('meta[property="og:title"]', "content", currentLang === "en" ? "Nova Translator" : "Nova Fordító");
  setNodeAttr('meta[property="og:description"]', "content", currentLang === "en"
    ? "Modern web translator with text and image translation, theme switching, and a fast interface."
    : "Modern webes fordító szöveg- és képfordítással, témaváltással és gyors kezelőfelülettel.");
  setNodeAttr('meta[name="twitter:title"]', "content", currentLang === "en" ? "Nova Translator" : "Nova Fordító");
  setNodeAttr('meta[name="twitter:description"]', "content", currentLang === "en"
    ? "Modern web translator with text and image translation, theme switching, and a fast interface."
    : "Modern webes fordító szöveg- és képfordítással, témaváltással és gyors kezelőfelülettel.");
  setNodeAttr('meta[name="apple-mobile-web-app-title"]', "content", currentLang === "en" ? "Nova Translator" : "Nova Fordító");

  setNodeText(".brand .eyebrow", currentLang === "en" ? "Modern text translator" : "Modern szövegfordító");
  setNodeText(".brand h1", currentLang === "en" ? "Nova Translator" : "Nova Fordító");
  setNodeAttr(".mode-switch", "aria-label", currentLang === "en" ? "Translation modes" : "Fordítási módok");
  setNodeText(el.modeText, currentLang === "en" ? "Text" : "Szöveg");
  setNodeText(el.modeImage, currentLang === "en" ? "Images" : "Képek");
  setNodeText(el.modeDocument, currentLang === "en" ? "Documents" : "Dokumentumok");
  setNodeText(el.settingsToggle, currentLang === "en" ? "Settings" : "Beállítások");
  setNodeAttr(el.settingsToggle, "aria-label", currentLang === "en" ? "Open settings" : "Beállítások megnyitása");
  setNodeAttr(el.themeCycle, "aria-label", currentLang === "en" ? "Quick theme switch" : "Téma gyorsváltása");
  if (el.languageToggle) el.languageToggle.setAttribute("aria-label", currentLang === "en" ? "Choose page language" : "Oldal nyelvének kiválasztása");
  if (el.languageMenu) el.languageMenu.setAttribute("aria-label", currentLang === "en" ? "Page language" : "Oldal nyelve");
  syncUiLanguageMenu();
  setNodeText("#feedback-fab .feedback-fab__label", st("feedback"));

  setNodeText(".text-submode-field > span", currentLang === "en" ? "Text mode" : "Szöveg mód");
  setNodeText('#text-submode-select option[value="translate"]', currentLang === "en" ? "Translate" : "Fordítás");
  setNodeText('#text-submode-select option[value="correct"]', currentLang === "en" ? "Text correction" : "Szöveg javítása");
  refreshSearchPlaceholders();
  rebuildLanguageSelects();

  const sourceLabel = currentLang === "en" ? "Source language" : "Forrásnyelv";
  const targetLabel = currentLang === "en" ? "Target language" : "Célnyelv";
  [
    'label[for="source-language"] > span',
    'label[for="image-source-language"] > span',
    'label[for="document-source-language"] > span',
    'label[for="correction-source-language"] > span'
  ].forEach(selector => setNodeText(selector, sourceLabel));
  [
    'label[for="target-language"] > span',
    'label[for="image-target-language"] > span',
    'label[for="document-target-language"] > span'
  ].forEach(selector => setNodeText(selector, targetLabel));
  [el.swap, el.imageSwap, el.docSwap].forEach(node => setNodeText(node, currentLang === "en" ? "Swap" : "Csere"));
  [el.swap, el.imageSwap, el.docSwap].forEach(node => {
    if (node) node.setAttribute("aria-label", currentLang === "en" ? "Swap languages" : "Nyelvek felcserélése");
  });
  setNodeText(el.translate, currentLang === "en" ? "Translate" : "Fordítás");
  setNodeText(el.runCorrection, currentLang === "en" ? "Correct" : "Javítás");
  setNodeText(el.imageRun, currentLang === "en" ? "Translate image" : "Kép fordítása");
  setNodeText(el.docRun, currentLang === "en" ? "Translate document" : "Dokumentum fordítása");

  setNodeText("#text-translate-view .pane--input .pane__label", currentLang === "en" ? "Source text" : "Forrásszöveg");
  setNodeText("#text-translate-view .pane--input h3", currentLang === "en" ? "What do you want to translate?" : "Mit szeretnél lefordítani?");
  setNodeText(el.mic, currentLang === "en" ? "Microphone" : "Mikrofon");
  setNodeText(el.clear, currentLang === "en" ? "Clear" : "Törlés");
  setNodeAttr(el.clear, "aria-label", currentLang === "en" ? "Clear source text" : "Forrásszöveg törlése");
  if (el.sourceText) el.sourceText.placeholder = currentLang === "en"
    ? "Type or paste text here. If live translation is on, the output updates while you type."
    : "Írj vagy illessz be szöveget. Ha az automatikus fordítás aktív, már gépelés közben is frissül a szöveg.";
  setNodeAttr(".mic-toolbar", "aria-label", currentLang === "en" ? "Microphone controls" : "Mikrofon vezérlés");
  setNodeAttr(".mic-toolbar__actions", "aria-label", currentLang === "en" ? "Microphone insertion mode" : "Mikrofon beillesztési mód");
  setNodeText(el.micModeAppend, currentLang === "en" ? "Append" : "Hozzáfűzés");
  setNodeText(el.micModeReplace, currentLang === "en" ? "Replace" : "Felülírás");
  setNodeText("#text-translate-view .pane--output .pane__label", currentLang === "en" ? "Translation" : "Fordítás");
  setNodeText("#text-translate-view .pane--output h3", currentLang === "en" ? "Translated text" : "Kész szöveg");
  setNodeText(el.speak, currentLang === "en" ? "Read aloud" : "Felolvasás");
  setNodeText(el.copyFloat, currentLang === "en" ? "Copy" : "Másolás");
  setNodeAttr(el.copyFloat, "aria-label", currentLang === "en" ? "Copy translated text" : "A fordított szöveg másolása");
  setNodeAttr(".memory-board", "aria-label", currentLang === "en" ? "Translation history and favorites" : "Fordítási előzmények és kedvencek");
  setNodeText(".memory-card:first-child .pane__label", currentLang === "en" ? "History" : "Előzmények");
  setNodeText(".memory-card:first-child h3", currentLang === "en" ? "Recent translations" : "Legutóbbi fordítások");
  setNodeText(el.clearHistory, currentLang === "en" ? "Clear all" : "Összes törlése");
  setNodeText(".memory-card:last-child .pane__label", currentLang === "en" ? "Saved" : "Mentettek");
  setNodeText(".memory-card:last-child h3", currentLang === "en" ? "Favorite translations" : "Kedvenc fordítások");
  setNodeText(el.clearFavorites, currentLang === "en" ? "Clear list" : "Lista törlése");

  setNodeText('#text-correction-view .correction-options label:nth-child(1) span', currentLang === "en" ? "Accent restoration only" : "Csak ékezetpótlás");
  setNodeText('#text-correction-view .correction-options label:nth-child(2) span', currentLang === "en" ? "Full spelling correction" : "Teljes helyesírás-javítás");
  setNodeText('#text-correction-view .correction-options label:nth-child(3) span', currentLang === "en" ? "Fix punctuation" : "Írásjelek javítása");
  setNodeText('#text-correction-view .correction-options label:nth-child(4) span', currentLang === "en" ? "Light style smoothing" : "Finom stilisztikai simítás");
  setNodeAttr(".correction-options", "aria-label", currentLang === "en" ? "Correction options" : "Javítási opciók");
  setNodeText('#text-correction-view .pane--input .pane__label', currentLang === "en" ? "Text correction" : "Szöveg javítása");
  setNodeText('#text-correction-view .pane--input h3', currentLang === "en" ? "What do you want to fix?" : "Mit szeretnél kijavítani?");
  setNodeText(el.clearCorrection, currentLang === "en" ? "Clear" : "Törlés");
  if (el.correctionInput) el.correctionInput.placeholder = currentLang === "en"
    ? "Write the text here and the corrected version will appear on the other side."
    : "Írd be ide a szöveget, és a másik oldalon javítva megjelenik.";
  setNodeText('#text-correction-view .pane--output .pane__label', currentLang === "en" ? "Punctuation fix" : "Írásjel javítás");
  setNodeText('#text-correction-view .pane--output h3', currentLang === "en" ? "Corrected text" : "Javított szöveg");
  setNodeText(el.copyCorrection, currentLang === "en" ? "Copy" : "Másolás");
  setNodeAttr(el.copyCorrection, "aria-label", currentLang === "en" ? "Copy corrected text" : "A javított szöveg másolása");
  setNodeText("#legacy-copy-corrected-floating", currentLang === "en" ? "Copy" : "Másolás");
  setNodeAttr("#legacy-copy-corrected-floating", "aria-label", currentLang === "en" ? "Copy corrected text" : "A javított szöveg másolása");

  setNodeText("#image-dropzone-empty .pane__label", currentLang === "en" ? "Images" : "Képek");
  setNodeText("#image-dropzone-empty h3", currentLang === "en" ? "Paste or upload an image." : "Illessz be vagy tölts fel egy képet.");
  setNodeText(".image-dropzone__copy", currentLang === "en"
    ? "Drop an image here, paste from clipboard, or choose a file. The app reads the text on it and translates it."
    : "Húzd ide a képet, illeszd be vágólapról, vagy válassz egy fájlt. A rendszer kiolvassa a rajta lévő szöveget, majd lefordítja.");
  setNodeText(el.pickImage, currentLang === "en" ? "Choose image" : "Kép választása");
  setNodeText(el.pasteImage, currentLang === "en" ? "Paste image" : "Kép beillesztése");
  setNodeText("#image-dropzone-filled .pane__label", currentLang === "en" ? "Loaded image" : "Betöltött kép");
  setNodeText("#image-dropzone-filled h3", currentLang === "en" ? "The image is ready for in-image translation." : "A kép készen áll a képen belüli fordításhoz.");
  setNodeText(el.replaceImage, currentLang === "en" ? "Another image" : "Másik kép");
  setNodeText(el.removeImage, currentLang === "en" ? "Clear" : "Törlés");
  setNodeText(el.copyImage, currentLang === "en" ? "Copy" : "Másolás");
  setNodeText(el.showOriginalImage, currentLang === "en" ? "Original" : "Eredeti");
  setNodeText(el.showTranslatedImage, currentLang === "en" ? "Translated image" : "Fordított kép");
  setNodeText(el.downloadImage, currentLang === "en" ? "Download" : "Letöltés");

  setNodeText("#document-dropzone-empty .pane__label", currentLang === "en" ? "Documents" : "Dokumentumok");
  setNodeText("#document-dropzone-empty h3", currentLang === "en" ? "Choose a text file." : "Válassz egy szöveges fájlt.");
  setNodeText(".document-dropzone__copy", currentLang === "en"
    ? "You can load TXT, MD, HTML, CSV, JSON, XML, SRT, and VTT formats. The app reads the text and translates it."
    : "TXT, MD, HTML, CSV, JSON, XML, SRT és VTT formátumokat tudsz betölteni. A rendszer beolvassa a szöveget, majd lefordítja.");
  setNodeText(el.pickDoc, currentLang === "en" ? "Choose document" : "Dokumentum választása");
  setNodeText("#document-dropzone-filled .pane__label", currentLang === "en" ? "Loaded document" : "Betöltött dokumentum");
  setNodeText(el.replaceDoc, currentLang === "en" ? "Another file" : "Másik fájl");
  setNodeText(el.removeDoc, currentLang === "en" ? "Clear" : "Törlés");
  setNodeText(".translator__panes--document .pane--input .pane__label", currentLang === "en" ? "Source document" : "Forrásdokumentum");
  setNodeText(".translator__panes--document .pane--input h3", currentLang === "en" ? "Extracted text" : "Kinyert szöveg");
  setNodeText(".translator__panes--document .pane--output .pane__label", currentLang === "en" ? "Translation" : "Fordítás");
  setNodeText(".translator__panes--document .pane--output h3", currentLang === "en" ? "Translated document" : "Kész dokumentum");
  setNodeText(el.copyDoc, currentLang === "en" ? "Copy" : "Másolás");
  setNodeText(el.downloadDoc, currentLang === "en" ? "Download" : "Letöltés");

  setNodeAttr(".workspace-side", "aria-label", currentLang === "en" ? "Contact panel" : "Kapcsolat blokk");
  setNodeAttr(".contact-dock", "aria-label", currentLang === "en" ? "Contact options" : "Elérhetőség");
  setNodeText(".contact-card .eyebrow", currentLang === "en" ? "Contact" : "Kapcsolat");
  setNodeText(".contact-dock__peek-text", currentLang === "en" ? "Contact" : "Kapcsolat");

  setNodeAttr(el.settingsOverlay, "aria-label", currentLang === "en" ? "Close settings" : "Beállítások bezárása");
  setNodeText(".settings-panel__header .eyebrow", currentLang === "en" ? "Customization" : "Testreszabás");
  setNodeText("#settings-title", currentLang === "en" ? "Settings" : "Beállítások");
  setNodeAttr(el.settingsClose, "aria-label", currentLang === "en" ? "Close settings" : "Beállítások bezárása");

  const appearanceSection = document.querySelector('[data-settings-section="appearance"]');
  const translationSection = document.querySelector('[data-settings-section="translation"]');
  const statsSection = document.querySelector('[data-settings-section="stats"]');
  const trustSection = document.querySelector('[data-settings-section="trust"]');
  if (appearanceSection) appearanceSection.dataset.settingsSectionLabel = currentLang === "en" ? "Appearance" : "Megjelenés";
  if (translationSection) translationSection.dataset.settingsSectionLabel = currentLang === "en" ? "Settings" : "Beállítások";
  if (statsSection) statsSection.dataset.settingsSectionLabel = currentLang === "en" ? "Statistics" : "Statisztika";
  if (trustSection) trustSection.dataset.settingsSectionLabel = currentLang === "en" ? "Info" : "Információ";
  setNodeText('#settings-section-appearance .settings-group__eyebrow', currentLang === "en" ? "Appearance" : "Megjelenés");
  setNodeText('#settings-section-appearance .settings-group__heading h3', currentLang === "en" ? "Appearance" : "Megjelenés");
  setNodeText('#settings-section-appearance .settings-group__heading p', currentLang === "en" ? "The app look and visual mood." : "Az alkalmazás kinézete és vizuális hangulata.");
  setNodeText('#settings-section-appearance .settings-control-surface__label', currentLang === "en" ? "Theme mode" : "Téma mód");
  el.themeModeOptions.forEach(btn => { btn.textContent = themeLabels[btn.dataset.themeModeOption] || btn.textContent; });
  setNodeText('#settings-section-appearance .settings-control-surface--accent .settings-control-surface__label', currentLang === "en" ? "Color style" : "Színstílus");
  document.querySelectorAll(".accent-theme-card").forEach(card => {
    const key = card.dataset.accentOption;
    const name = card.querySelector("strong");
    if (name) name.textContent = accentLabels[key] || name.textContent;
  });
  const accentCardCopy = {
    hu: { base: "Klasszikus Nova", neon: "Élénk, futurisztikus", cyber: "Lila techno hangulat", green: "Letisztult és nyugodt", gradient: "Gazdag színátmenet" },
    en: { base: "Classic Nova", neon: "Bold and futuristic", cyber: "Purple techno vibe", green: "Clean and calm", gradient: "Rich color blend" }
  };
  document.querySelectorAll(".accent-theme-card").forEach(card => {
    const key = card.dataset.accentOption;
    const description = card.querySelector("small");
    if (description) description.textContent = accentCardCopy[currentLang][key] || description.textContent;
  });
  setNodeText('#settings-section-appearance .toggle-row strong', currentLang === "en" ? "Glass / blur effect" : "Glass / blur effekt");
  setNodeText('#settings-section-appearance .toggle-row small', currentLang === "en" ? "Translucent panels with a deeper glass feel." : "Áttetsző panelek és mélyebb üveg hatás.");

  setNodeText('#settings-section-translation .settings-group__eyebrow', currentLang === "en" ? "Settings" : "Beállítások");
  setNodeText('#settings-section-translation .settings-group__heading h3', currentLang === "en" ? "Settings" : "Beállítások");
  setNodeText('#settings-section-translation label[for="setting-live-translate"] strong', currentLang === "en" ? "Live translation" : "Automatikus fordítás");
  setNodeText('#settings-section-translation label[for="setting-live-translate"] small', currentLang === "en" ? "Refreshes the result automatically while typing." : "Gépelés közben magától frissíti az eredményt.");
  setNodeText('#settings-section-translation label[for="feedback-include-system"] strong', currentLang === "en" ? "Attach system information" : "Rendszerinformáció csatolása");
  setNodeText('#settings-section-translation label[for="feedback-include-system"] small', currentLang === "en" ? "Include browser, screen, and theme data in feedback for debugging." : "A visszajelzés küldésnél böngésző-, képernyő- és témaadatokat is csatol hibakereséshez.");

  setNodeText('#settings-section-stats .settings-group__eyebrow', currentLang === "en" ? "Statistics" : "Statisztika");
  setNodeText('#settings-section-stats .trust-badge', "Analytics");
  setNodeText('#settings-section-stats .trust-badge--muted', currentLang === "en" ? "Only on this device" : "Csak ezen az eszközön");
  setNodeText('#usage-stats-title', currentLang === "en" ? "Usage statistics" : "Használati statisztika");
  setNodeText('#settings-section-stats .settings-group__heading p', currentLang === "en" ? "See how you use Nova Translator. Data stays locally in your browser." : "Nézd meg, hogyan használod a Nova Fordítót. Az adatok helyben, a böngészőben maradnak.");
  setNodeText(el.resetUsageStats, currentLang === "en" ? "Reset statistics" : "Statisztika nullázása");
  setNodeText("#usage-stats-empty strong", currentLang === "en" ? "No usage data yet" : "Még nincs használati adat");
  setNodeText("#usage-stats-empty p", currentLang === "en" ? "Once you translate, use the mic, or run correction, your stats will appear here." : "Amint fordítasz, mikrofont használsz vagy javítasz szöveget, itt megjelennek a statisztikák.");
  setNodeText("#usage-stats-content .stats-card--hero .stats-card__label", currentLang === "en" ? "How long you've used it" : "Mióta használod");
  setNodeText('.stats-card--session .stats-card__label', currentLang === "en" ? "SESSION TIME" : "SESSION IDŐ");
  setNodeText('.stats-card--session .stats-card__meta', currentLang === "en" ? "Today's usage" : "Mai használat");
  const statsLabels = currentLang === "en"
    ? ["Total translations", "Translated characters", "Translated words", "Favorite target language", "Microphone usage", "Image translation", "Correction usage"]
    : ["Összes fordítás", "Fordított karakter", "Fordított szó", "Kedvenc célnyelv", "Mikrofon használat", "Képes fordítás", "Javítás használat"];
  const statsMeta = currentLang === "en"
    ? [
        "Successful translations from every main mode.",
        "Total characters processed by the translator.",
        "The full number of translated words.",
        "Your most used target language.",
        "How many times you started microphone input.",
        "How many times you translated text from an image.",
        "How many times you ran text correction."
      ]
    : [
        "Sikeres fordítások minden fő módból.",
        "Összesen ennyi karakter ment át a fordítón.",
        "A teljes lefordított szómennyiség.",
        "A legtöbbször használt célnyelv.",
        "Ennyiszer indítottál mikrofonos bevitel.",
        "Ennyiszer fordítottál képről szöveget.",
        "Ennyiszer futtattad a szövegjavítást."
      ];
  if (currentLang === "en") {
    setNodeText('#settings-section-stats .trust-badge--muted', "This device only");
    setNodeText('#settings-section-stats .settings-group__heading p', "See your Nova usage. Data stays in your browser.");
    setNodeText(el.resetUsageStats, "Reset stats");
    setNodeText("#usage-stats-empty p", "Translate, use the mic, or run correction to see stats here.");
    setNodeText("#usage-stats-content .stats-card--hero .stats-card__label", "Usage age");
    setNodeText('.stats-card--session .stats-card__label', "Session time");
    statsLabels.splice(0, statsLabels.length, "Translations", "Characters", "Words", "Top language", "Mic usage", "Image OCR", "Corrections");
    statsMeta.splice(0, statsMeta.length, "All successful translations.", "Characters processed in total.", "Translated words in total.", "Most used target language.", "Microphone starts total.", "Image text translations total.", "Correction runs total.");
  }
  const statLabelNodes = document.querySelectorAll("#usage-stats-content .stats-card:not(.stats-card--hero):not(.stats-card--session) .stats-card__label");
  const statMetaNodes = document.querySelectorAll("#usage-stats-content .stats-card:not(.stats-card--hero):not(.stats-card--session) .stats-card__meta");
  statLabelNodes.forEach((node, index) => { node.textContent = statsLabels[index] || node.textContent; });
  statMetaNodes.forEach((node, index) => { node.textContent = statsMeta[index] || node.textContent; });

  setNodeText('#settings-section-trust .settings-group__eyebrow', currentLang === "en" ? "Info" : "Információ");
  setNodeText('#settings-section-trust .trust-badge:first-child', "AI Powered");
  setNodeText('#settings-section-trust .trust-badge--muted', currentLang === "en" ? "Beta" : "Béta");
  setNodeText('#settings-section-trust .settings-group__heading h3', currentLang === "en" ? "Why is Nova Translator reliable?" : "Miért megbízható a Nova Fordító?");
  setNodeText('#settings-section-trust .settings-group__heading p', currentLang === "en" ? "Fast, modern, and transparent flow with clean feedback." : "Gyors, modern és átlátható működés, tiszta visszajelzésekkel.");
  setNodeText('.trust-status strong', currentLang === "en" ? "System status:" : "Rendszer állapot:");
  setNodeText('.trust-status span:last-child', currentLang === "en" ? "Working" : "Működik");
  const trustTitles = currentLang === "en"
    ? ["Safe to use", "Fast real-time processing", "AI-assisted processing", "Works on every device"]
    : ["Biztonságos használat", "Gyors és valós idejű feldolgozás", "AI alapú feldolgozás", "Minden eszközön működik"];
  const trustBodies = currentLang === "en"
    ? ["Saved data stays locally in your browser.", "Instant translation and correction with convenient feedback.", "Modern algorithms help with translation and correction.", "Optimized for mobile and desktop with a clean interface."]
    : ["A mentett adatok helyben maradnak a böngészőben.", "Azonnali fordítás és javítás, kényelmes visszajelzéssel.", "Modern algoritmusok segítik a fordítást és a javítást.", "Mobilon és gépen is optimalizált, letisztult felülettel."];
  document.querySelectorAll(".trust-item__body strong").forEach((node, index) => { node.textContent = trustTitles[index] || node.textContent; });
  document.querySelectorAll(".trust-item__body p").forEach((node, index) => { node.textContent = trustBodies[index] || node.textContent; });

  setNodeAttr(el.feedbackDialogOverlay, "aria-label", currentLang === "en" ? "Close feedback dialog" : "Visszajelzés ablak bezárása");
  setNodeText(".feedback-dialog__badge", currentLang === "en" ? "Help improve it" : "Segíts jobbá tenni");
  setNodeAttr(el.feedbackDialogClose, "aria-label", currentLang === "en" ? "Close feedback" : "Visszajelzés bezárása");
  setNodeText("#feedback-dialog-title", currentLang === "en" ? "What would you change in Nova Translator?" : "Mit változtatnál a Nova Fordítón?");
  setNodeText("#feedback-dialog-text", currentLang === "en" ? "Write a short note if you found a bug, something feels off, or you have an idea worth adding." : "Írd meg röviden, ha hibát találtál, valami furcsán működik, vagy van egy jó ötleted, amit érdemes lenne beépíteni.");
  setNodeAttr(".feedback-type-group", "aria-label", currentLang === "en" ? "Quick feedback categories" : "Gyors visszajelzés kategóriák");
  el.feedbackTypeOptions.forEach(btn => {
    btn.textContent = feedbackLabels[btn.dataset.feedbackType] || btn.textContent;
  });
  setNodeText('label[for="feedback-message"] > span', currentLang === "en" ? "Message" : "Üzenet");
  if (el.feedbackMessage) el.feedbackMessage.placeholder = feedbackMessagePlaceholder();
  setNodeText('label[for="feedback-contact"] > span', currentLang === "en" ? "Contact optionally" : "Elérhetőség opcionálisan");
  if (el.feedbackContact) el.feedbackContact.placeholder = currentLang === "en" ? "Email or Instagram handle if you want a reply" : "Email vagy Instagram név, ha szeretnél választ";
  setNodeText(".feedback-capture__copy strong", currentLang === "en" ? "Attach screenshot" : "Screenshot csatolása");
  setNodeText(".feedback-capture__copy p", currentLang === "en" ? "A screenshot helps a lot for UI issues or translation problems." : "UI hibánál vagy fordítási problémánál sokat segít egy kép.");
  setNodeText(el.feedbackScreenshotTrigger, currentLang === "en" ? "Choose image" : "Kép kiválasztása");
  setNodeText(el.feedbackScreenshotClear, currentLang === "en" ? "Remove" : "Eltávolítás");

  setNodeAttr(el.streakOverlay, "aria-label", currentLang === "en" ? "Close streak" : "Streak bezárása");
  setNodeAttr(el.streakPanelClose, "aria-label", currentLang === "en" ? "Close streak" : "Streak bezárása");
  setNodeText("#streak-panel-title", currentLang === "en" ? "Consecutive days" : "Folyamatos napok");
  setNodeText(".streak-popover__meter-labels span:first-child", currentLang === "en" ? "Start" : "Kezdés");
  setNodeText(".streak-summary-card:first-child .streak-summary-card__label", currentLang === "en" ? "Today's status" : "Mai státusz");
  setNodeText(".streak-summary-card:last-child .streak-summary-card__label", currentLang === "en" ? "Next goal" : "Következő cél");
  setNodeText(".streak-section__header strong", currentLang === "en" ? "Quick view" : "Gyors nézet");
  setNodeText(".streak-section__header span", currentLang === "en" ? "Today centered" : "Ma középen");
  setNodeAttr(el.streakMonthPrev, "aria-label", currentLang === "en" ? "Previous month" : "Előző hónap");
  setNodeAttr(el.streakMonthNext, "aria-label", currentLang === "en" ? "Next month" : "Következő hónap");
  const weekdayLabels = currentLang === "en" ? ["M", "T", "W", "T", "F", "S", "S"] : ["H", "K", "Sze", "Cs", "P", "Szo", "V"];
  document.querySelectorAll(".streak-calendar__weekdays span").forEach((node, index) => { node.textContent = weekdayLabels[index] || node.textContent; });

  setNodeAttr(el.resetStatsDialogOverlay, "aria-label", currentLang === "en" ? "Close confirmation dialog" : "Megerősítő ablak bezárása");
  setNodeText("#stats-reset-dialog .confirm-dialog__badge", currentLang === "en" ? "Dangerous action" : "Veszélyes művelet");
  setNodeText("#stats-reset-dialog-title", currentLang === "en" ? "Do you want to delete your statistics?" : "Biztos szeretnéd törölni a statisztikákat?");
  setNodeText("#stats-reset-dialog-text", currentLang === "en" ? "Only usage statistics will be deleted. History, favorites, and the rest of your data will stay." : "Csak a használati statisztika törlődik. Az előzmények, kedvencek és a többi adat megmarad.");
  setNodeText(el.resetStatsCancel, currentLang === "en" ? "Cancel" : "Mégse");
  setNodeText(el.resetStatsConfirm, currentLang === "en" ? "Yes, delete" : "Igen, törlés");

  el.settingsSections.forEach(section => {
    const label = section.dataset.settingsSectionLabel || "";
    const toggle = section.querySelector("[data-settings-section-toggle]");
    const collapsed = !!state.settings.collapsedSections?.[normalizeSettingsSectionKey(section.dataset.settingsSection)];
    if (!toggle) return;
    toggle.setAttribute("aria-label", collapsed
      ? (currentLang === "en" ? `Open ${label} section` : `${label} szekció megnyitása`)
      : (currentLang === "en" ? `Collapse ${label} section` : `${label} szekció összecsukása`));
  });

  if (isTranslationPlaceholderText(el.translatedText?.textContent || "")) el.translatedText.textContent = translatedPlaceholder();
  if (isCorrectionPlaceholderText(el.correctedText?.textContent || "")) el.correctedText.textContent = correctionPlaceholder();
  if (isDocumentPlaceholderText(el.docTranslatedText?.textContent || "")) el.docTranslatedText.textContent = documentPlaceholder();
  if (isOneOf(el.status?.textContent || "", [UI_STRINGS.hu.readyToTranslate, UI_STRINGS.en.readyToTranslate])) el.status.textContent = st("readyToTranslate");
  if (isOneOf(el.translationMeta?.textContent || "", [UI_STRINGS.hu.chooseLanguageToStart, UI_STRINGS.en.chooseLanguageToStart, UI_STRINGS.hu.liveTranslateOff, UI_STRINGS.en.liveTranslateOff])) {
    el.translationMeta.textContent = state.settings.liveTranslate ? st("chooseLanguageToStart") : st("liveTranslateOff");
  }
  if (isOneOf(el.connectionState?.textContent || "", [UI_STRINGS.hu.publicServices, UI_STRINGS.en.publicServices])) el.connectionState.textContent = st("publicServices");
  if (isOneOf(el.correctionMeta?.textContent || "", [UI_STRINGS.hu.correctionMetaDefault, UI_STRINGS.en.correctionMetaDefault])) el.correctionMeta.textContent = st("correctionMetaDefault");
}

function applySettings() {
  state.settings = normalizeSettings(state.settings);
  document.documentElement.dataset.theme = resolveThemeMode();
  document.documentElement.dataset.themeMode = state.settings.themeMode;
  document.documentElement.dataset.accent = state.settings.accentTheme;
  document.documentElement.dataset.density = "compact";
  document.documentElement.dataset.surface = state.settings.surface;
  document.documentElement.dataset.contactDock = state.settings.contactDockCollapsed ? "collapsed" : "open";
  if (el.live) el.live.checked = state.settings.liveTranslate;
  if (el.feedbackIncludeSystem) el.feedbackIncludeSystem.checked = state.settings.feedbackIncludeSystem !== false;
  if (el.settingGlass) el.settingGlass.checked = state.settings.surface === "glass";
  if (el.contactCard) el.contactCard.hidden = !!state.settings.contactDockCollapsed;
  if (el.contactDockPeek) el.contactDockPeek.hidden = !state.settings.contactDockCollapsed;
  if (el.contactDockToggle) {
    el.contactDockToggle.setAttribute("aria-expanded", String(!state.settings.contactDockCollapsed));
    el.contactDockToggle.setAttribute("aria-label", state.settings.contactDockCollapsed ? "Kapcsolat panel megnyitĂˇsa" : "Kapcsolat panel bezĂˇrĂˇsa");
  }
  if (el.contactDockToggle) el.contactDockToggle.setAttribute("aria-label", state.settings.contactDockCollapsed ? st("contactOpenAria") : st("contactCloseAria"));
  if (el.contactDockPeek) {
    el.contactDockPeek.setAttribute("aria-expanded", String(!state.settings.contactDockCollapsed));
    el.contactDockPeek.setAttribute("aria-label", state.settings.contactDockCollapsed ? "Kapcsolat panel megnyitĂˇsa" : "Kapcsolat panel bezĂˇrĂˇsa");
  }
  if (el.contactDockPeek) el.contactDockPeek.setAttribute("aria-label", state.settings.contactDockCollapsed ? st("contactOpenAria") : st("contactCloseAria"));
  if (el.themeCycle) {
    const labels = themeModeLabels();
    el.themeCycle.textContent = `${st("themePrefix")}: ${labels[state.settings.themeMode] || labels.dark}`;
  }
  el.themeModeOptions.forEach(btn => {
    const active = btn.dataset.themeModeOption === state.settings.themeMode;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  el.accentOptions.forEach(btn => {
    const active = btn.dataset.accentOption === state.settings.accentTheme;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
  state.mic.mergeMode = state.settings.micMergeMode === "replace" ? "replace" : "append";
  syncMicModeButtons();
  renderSettingsSections();
  applyLanguage();
  renderUsageStats();
  renderMemoryPanels();
  renderStreakUi();
  renderFeedbackDialog();
  updateCounter();
  updateCorrectionCounter();
  updateHint();
  refreshMicUi();
}

function setContactDockCollapsed(collapsed) {
  state.settings.contactDockCollapsed = !!collapsed;
  saveSettings();
  applySettings();
  if (collapsed) el.contactDockPeek?.focus();
  else el.contactDockToggle?.focus();
}

function renderSettingsSections() {
  const currentLang = uiLanguage();
  el.settingsSections.forEach(section => {
    const key = normalizeSettingsSectionKey(section.dataset.settingsSection);
    const collapsed = !!state.settings.collapsedSections?.[key];
    const body = section.querySelector("[data-settings-section-body]");
    const toggle = section.querySelector("[data-settings-section-toggle]");
    const label = section.dataset.settingsSectionLabel || section.querySelector(".settings-group__eyebrow")?.textContent?.trim() || "Szekció";
    section.classList.toggle("is-collapsed", collapsed);
    if (body) body.hidden = collapsed;
    if (toggle) {
      toggle.classList.toggle("is-collapsed", collapsed);
      toggle.setAttribute("aria-expanded", String(!collapsed));
      toggle.setAttribute("aria-label", collapsed
        ? (currentLang === "en" ? `Open ${label} section` : `${label} szekció megnyitása`)
        : (currentLang === "en" ? `Collapse ${label} section` : `${label} szekció összecsukása`));
    }
  });
}

function toggleSettingsSection(sectionKey) {
  const key = normalizeSettingsSectionKey(sectionKey);
  state.settings.collapsedSections[key] = !state.settings.collapsedSections[key];
  saveSettings();
  applySettings();
}

function cycleTheme() {
  const currentIndex = THEME_MODE_ORDER.indexOf(state.settings.themeMode);
  state.settings.themeMode = THEME_MODE_ORDER[(currentIndex + 1) % THEME_MODE_ORDER.length] || "dark";
  saveSettings();
  applySettings();
}

function openStreakPanel() {
  if (!el.streakPanel) return;
  state.streakReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  state.streakPanelOpen = true;
  setStreakMonthKey(formatMonthKey(new Date()));
  renderStreakUi();
  if (el.streakOverlay) {
    el.streakOverlay.hidden = false;
    el.streakOverlay.setAttribute("aria-hidden", "false");
  }
  el.streakPanel.hidden = false;
  el.streakPanel.setAttribute("aria-hidden", "false");
  if (el.streakTrigger) el.streakTrigger.setAttribute("aria-expanded", "true");
}

function closeStreakPanel(restoreFocus = true) {
  if (!el.streakPanel || el.streakPanel.hidden) {
    state.streakPanelOpen = false;
    if (el.streakTrigger) el.streakTrigger.setAttribute("aria-expanded", "false");
    if (el.streakOverlay) {
      el.streakOverlay.hidden = true;
      el.streakOverlay.setAttribute("aria-hidden", "true");
    }
    state.streakReturnFocus = null;
    return;
  }
  if (el.streakOverlay) {
    el.streakOverlay.hidden = true;
    el.streakOverlay.setAttribute("aria-hidden", "true");
  }
  el.streakPanel.hidden = true;
  el.streakPanel.setAttribute("aria-hidden", "true");
  state.streakPanelOpen = false;
  if (el.streakTrigger) el.streakTrigger.setAttribute("aria-expanded", "false");
  const focusTarget = state.streakReturnFocus;
  state.streakReturnFocus = null;
  if (restoreFocus && focusTarget instanceof HTMLElement && focusTarget.isConnected) focusTarget.focus();
}

function toggleStreakPanel() {
  if (state.streakPanelOpen) closeStreakPanel();
  else openStreakPanel();
}

function openSettings() {
  closeStreakPanel(false);
  closeLanguageMenu(false);
  el.settingsDrawer.classList.add("is-open");
  el.settingsDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}
function closeSettings() { closeResetUsageStatsDialog(false); el.settingsDrawer.classList.remove("is-open"); el.settingsDrawer.setAttribute("aria-hidden", "true"); document.body.classList.remove("drawer-open"); }

function syncModalBodyState() {
  document.body.classList.toggle("confirm-open", !!(state.resetStatsDialogOpen || state.feedbackDialogOpen));
}

function openResetUsageStatsDialog() {
  if (!hasUsageStatsData() || !el.resetStatsDialog) return;
  closeStreakPanel(false);
  state.resetStatsReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  state.resetStatsDialogOpen = true;
  el.resetStatsDialog.hidden = false;
  el.resetStatsDialog.setAttribute("aria-hidden", "false");
  syncModalBodyState();
  window.requestAnimationFrame(() => el.resetStatsCancel?.focus());
}

function closeResetUsageStatsDialog(restoreFocus = true) {
  if (!el.resetStatsDialog || el.resetStatsDialog.hidden) {
    state.resetStatsDialogOpen = false;
    syncModalBodyState();
    state.resetStatsReturnFocus = null;
    return;
  }
  el.resetStatsDialog.hidden = true;
  el.resetStatsDialog.setAttribute("aria-hidden", "true");
  state.resetStatsDialogOpen = false;
  syncModalBodyState();
  const focusTarget = state.resetStatsReturnFocus;
  state.resetStatsReturnFocus = null;
  if (restoreFocus && focusTarget instanceof HTMLElement && focusTarget.isConnected) focusTarget.focus();
}

function trapResetStatsDialogFocus(event) {
  const focusable = [...(el.resetStatsDialog?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [])]
    .filter(node => node instanceof HTMLElement && !node.hasAttribute("disabled") && node.getAttribute("aria-hidden") !== "true");
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
    return;
  }
  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function renderFeedbackDialog() {
  state.feedbackDraft = normalizeFeedbackDraft(state.feedbackDraft);
  if (el.feedbackMessage && el.feedbackMessage.value !== state.feedbackDraft.message) el.feedbackMessage.value = state.feedbackDraft.message;
  if (el.feedbackContact && el.feedbackContact.value !== state.feedbackDraft.contact) el.feedbackContact.value = state.feedbackDraft.contact;
  syncFeedbackDraftUi();
}

function syncFeedbackDraftUi() {
  state.feedbackDraft = normalizeFeedbackDraft(state.feedbackDraft);
  el.feedbackTypeOptions.forEach(btn => {
    const active = normalizeFeedbackType(btn.dataset.feedbackType) === state.feedbackDraft.type;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
    btn.disabled = !!state.feedbackSending;
  });
  if (el.feedbackMessageCounter) el.feedbackMessageCounter.textContent = `${state.feedbackDraft.message.length} / ${FEEDBACK_MESSAGE_MAX_CHARS}`;
  renderFeedbackScreenshotUi();
  renderFeedbackNotice();
  if (el.feedbackSend) {
    el.feedbackSend.disabled = !!state.feedbackSending;
    el.feedbackSend.textContent = state.feedbackSending ? st("feedbackSending") : st("feedbackSend");
  }
  if (el.feedbackScreenshotTrigger) el.feedbackScreenshotTrigger.disabled = !!state.feedbackSending;
  if (el.feedbackScreenshotClear) el.feedbackScreenshotClear.disabled = !!state.feedbackSending;
}

function openFeedbackDialog() {
  if (!el.feedbackDialog) return;
  closeStreakPanel(false);
  state.feedbackReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  state.feedbackDialogOpen = true;
  clearFeedbackValidation();
  clearFeedbackNotice();
  renderFeedbackDialog();
  el.feedbackDialog.hidden = false;
  el.feedbackDialog.setAttribute("aria-hidden", "false");
  syncModalBodyState();
  window.requestAnimationFrame(() => el.feedbackMessage?.focus());
}

function closeFeedbackDialog(restoreFocus = true) {
  if (!el.feedbackDialog || el.feedbackDialog.hidden) {
    state.feedbackDialogOpen = false;
    syncModalBodyState();
    state.feedbackReturnFocus = null;
    return;
  }
  el.feedbackDialog.hidden = true;
  el.feedbackDialog.setAttribute("aria-hidden", "true");
  state.feedbackDialogOpen = false;
  syncModalBodyState();
  const focusTarget = state.feedbackReturnFocus;
  state.feedbackReturnFocus = null;
  if (restoreFocus && focusTarget instanceof HTMLElement && focusTarget.isConnected) focusTarget.focus();
}

function trapFeedbackDialogFocus(event) {
  const focusable = [...(el.feedbackDialog?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [])]
    .filter(node => node instanceof HTMLElement && !node.hasAttribute("disabled") && node.getAttribute("aria-hidden") !== "true");
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
    return;
  }
  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function feedbackModeLabel() {
  if (state.mode === "image") return "Képes fordítás";
  if (state.mode === "document") return "Dokumentum fordítás";
  return state.textSubmode === "correct" ? "Szövegjavítás" : "Szövegfordítás";
}

function buildFeedbackSummary() {
  const draft = normalizeFeedbackDraft(state.feedbackDraft);
  const lines = [
    st("feedbackSummaryTitle"),
    `${st("feedbackSummaryType")}: ${(feedbackTypeLabels()[draft.type] || feedbackTypeLabels().idea)}`,
    `${st("feedbackSummaryArea")}: ${currentFeedbackModeLabel()}`,
    `${st("feedbackSummaryDate")}: ${new Intl.DateTimeFormat(uiLocale(), { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date())}`,
    "",
    `${st("feedbackSummaryMessage")}:`,
    normalize(draft.message)
  ];
  if (normalize(draft.contact)) lines.push("", `${st("feedbackSummaryContact")}: ${draft.contact.trim()}`);
  return lines.join("\n").trim();
}

function sendFeedbackDraftByEmail() {
  const summary = buildFeedbackSummary();
  if (!normalize(state.feedbackDraft.message)) {
    setStatus("Előbb írj egy rövid visszajelzést", "error");
    el.feedbackMessage?.focus();
    return;
  }
  const subject = `${uiLanguage() === "en" ? "Nova Translator feedback" : "Nova Fordító visszajelzés"} - ${(feedbackTypeLabels()[state.feedbackDraft.type] || feedbackTypeLabels().idea)}`;
  window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
  setStatus("Megnyitottam az emailes visszajelzést", "success");
}

function currentFeedbackModeLabel() {
  if (state.mode === "image") return st("feedbackAreaImage");
  if (state.mode === "document") return st("feedbackAreaDocument");
  return state.textSubmode === "correct" ? st("feedbackAreaCorrection") : st("feedbackAreaText");
}

function clearFeedbackValidation() {
  if (el.feedbackMessageField) el.feedbackMessageField.classList.remove("is-invalid");
  if (el.feedbackMessage) el.feedbackMessage.setAttribute("aria-invalid", "false");
  if (el.feedbackMessage) el.feedbackMessage.placeholder = feedbackMessagePlaceholder();
  if (el.feedbackMessageError) el.feedbackMessageError.textContent = "";
}

function setFeedbackValidation(message) {
  if (el.feedbackMessageField) el.feedbackMessageField.classList.add("is-invalid");
  if (el.feedbackMessage) el.feedbackMessage.setAttribute("aria-invalid", "true");
  if (el.feedbackMessage) el.feedbackMessage.placeholder = message;
  if (el.feedbackMessageError) el.feedbackMessageError.textContent = message;
}

function clearFeedbackNotice() {
  state.feedbackNotice = { tone: "", message: "" };
}

function setFeedbackNotice(message, tone = "success") {
  state.feedbackNotice = {
    tone: String(tone || "").trim(),
    message: String(message || "").trim()
  };
  renderFeedbackNotice();
}

function renderFeedbackNotice() {
  if (!el.feedbackNotice) return;
  const message = String(state.feedbackNotice?.message || "").trim();
  const tone = String(state.feedbackNotice?.tone || "").trim();
  el.feedbackNotice.hidden = !message;
  el.feedbackNotice.textContent = message;
  el.feedbackNotice.classList.remove("is-success", "is-error", "is-busy");
  if (message && tone) el.feedbackNotice.classList.add(`is-${tone}`);
}

function renderFeedbackScreenshotUi() {
  const screenshot = state.feedbackScreenshot;
  if (el.feedbackDialog) el.feedbackDialog.classList.toggle("has-screenshot", !!screenshot);
  if (el.feedbackScreenshotCard) el.feedbackScreenshotCard.hidden = !screenshot;
  if (el.feedbackScreenshotClear) el.feedbackScreenshotClear.hidden = !screenshot;
  if (!screenshot) return;
  if (el.feedbackScreenshotName) el.feedbackScreenshotName.textContent = screenshot.name;
  if (el.feedbackScreenshotSize) el.feedbackScreenshotSize.textContent = formatFeedbackBytes(screenshot.size);
}

function validateFeedbackDraft() {
  const message = normalize(state.feedbackDraft.message);
  if (!message) {
    const errorMessage = st("feedbackValidation");
    setFeedbackValidation(errorMessage);
    clearFeedbackNotice();
    setStatus(errorMessage, "error");
    el.feedbackMessage?.focus();
    return false;
  }

  clearFeedbackValidation();
  return true;
}

function selectedOptionText(select) {
  if (!select) return "";
  const option = select.selectedOptions?.[0] || select.options?.[select.selectedIndex] || null;
  return String(option?.textContent || "").trim();
}

function buildFeedbackContext() {
  if (state.mode === "image") {
    return {
      mode: currentFeedbackModeLabel(),
      source_language: selectedOptionText(el.imageSource),
      target_language: selectedOptionText(el.imageTarget),
      theme_mode: state.settings.themeMode,
      accent_theme: state.settings.accentTheme
    };
  }

  if (state.mode === "document") {
    return {
      mode: currentFeedbackModeLabel(),
      source_language: selectedOptionText(el.docSource),
      target_language: selectedOptionText(el.docTarget),
      theme_mode: state.settings.themeMode,
      accent_theme: state.settings.accentTheme
    };
  }

  if (state.textSubmode === "correct") {
    return {
      mode: currentFeedbackModeLabel(),
      source_language: selectedOptionText(el.correctionSource),
      target_language: st("correctionTargetLabel"),
      theme_mode: state.settings.themeMode,
      accent_theme: state.settings.accentTheme
    };
  }

  return {
    mode: currentFeedbackModeLabel(),
    source_language: selectedOptionText(el.source),
    target_language: selectedOptionText(el.target),
    theme_mode: state.settings.themeMode,
    accent_theme: state.settings.accentTheme
  };
}

function buildFeedbackSystemInfo() {
  return {
    page: location.href,
    browser_language: navigator.language || "",
    platform: navigator.userAgentData?.platform || navigator.platform || "",
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    pixel_ratio: String(window.devicePixelRatio || 1),
    active_theme: document.documentElement.dataset.theme || "",
    user_agent: navigator.userAgent || ""
  };
}

function extractBase64FromDataUrl(dataUrl) {
  const value = String(dataUrl || "");
  const commaIndex = value.indexOf(",");
  return commaIndex >= 0 ? value.slice(commaIndex + 1).trim() : "";
}

function formatFeedbackBytes(value) {
  const bytes = Number(value) || 0;
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function feedbackFileExtension(mimeType) {
  const value = String(mimeType || "").toLowerCase();
  if (value.includes("png")) return "png";
  if (value.includes("webp")) return "webp";
  return "jpg";
}

function normalizeFeedbackFilename(name, mimeType) {
  const base = String(name || "visszajelzes-kep")
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50) || "visszajelzes-kep";
  return `${base}.${feedbackFileExtension(mimeType)}`;
}

async function prepareFeedbackScreenshot(file) {
  if (!file?.type?.startsWith("image/")) {
    throw new Error(uiLanguage() === "en" ? "Only image files can be attached." : "Csak képfájlt lehet csatolni.");
  }

  const sourceDataUrl = await fileToDataUrl(file);
  const image = await loadImage(sourceDataUrl);
  const scale = Math.min(1, FEEDBACK_SCREENSHOT_MAX_SIDE / Math.max(image.naturalWidth || 1, image.naturalHeight || 1));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round((image.naturalWidth || 1) * scale));
  canvas.height = Math.max(1, Math.round((image.naturalHeight || 1) * scale));

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error(uiLanguage() === "en" ? "Screenshot processing failed right now." : "A screenshot feldolgozása most nem sikerült.");

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  let mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
  let dataUrl = canvas.toDataURL(mimeType, 0.92);
  let blob = await dataUrlToBlob(dataUrl);

  if (blob.size > FEEDBACK_SCREENSHOT_MAX_BYTES) {
    mimeType = "image/jpeg";
    let quality = 0.9;
    do {
      dataUrl = canvas.toDataURL("image/jpeg", quality);
      blob = await dataUrlToBlob(dataUrl);
      quality -= 0.08;
    } while (blob.size > FEEDBACK_SCREENSHOT_MAX_BYTES && quality >= 0.54);
  }

  if (blob.size > FEEDBACK_SCREENSHOT_MAX_BYTES) {
    throw new Error(uiLanguage() === "en" ? "The screenshot is too large. Attach an image up to 3 MB." : "A screenshot túl nagy. Maximum 3 MB-os képet csatolj.");
  }

  return {
    name: normalizeFeedbackFilename(file.name, mimeType),
    mimeType,
    size: blob.size,
    dataUrl
  };
}

async function setFeedbackScreenshot(file) {
  try {
    state.feedbackScreenshot = await prepareFeedbackScreenshot(file);
    clearFeedbackNotice();
    syncFeedbackDraftUi();
    setStatus(uiLanguage() === "en" ? "Screenshot attached" : "Screenshot csatolva", "success");
  } catch (error) {
    const message = error?.message || (uiLanguage() === "en" ? "Attaching the screenshot failed right now." : "A screenshot csatolása most nem sikerült.");
    setFeedbackNotice(message, "error");
    setStatus(message, "error");
  } finally {
    if (el.feedbackScreenshotInput) el.feedbackScreenshotInput.value = "";
  }
}

function clearFeedbackScreenshot() {
  state.feedbackScreenshot = null;
  if (el.feedbackScreenshotInput) el.feedbackScreenshotInput.value = "";
  syncFeedbackDraftUi();
}

function resetFeedbackAfterSend() {
  const preservedContact = state.feedbackDraft.contact;
  state.feedbackDraft = normalizeFeedbackDraft({
    type: "bug",
    message: "",
    contact: preservedContact
  });
  state.feedbackScreenshot = null;
  saveFeedbackDraft();
  renderFeedbackDialog();
  clearFeedbackValidation();
}

async function buildFeedbackPayload() {
  const draft = normalizeFeedbackDraft(state.feedbackDraft);
  return {
    category: draft.type,
    message: normalize(draft.message),
    contact: draft.contact.trim(),
    context: buildFeedbackContext(),
    system_info: state.settings.feedbackIncludeSystem !== false ? buildFeedbackSystemInfo() : null,
    screenshot: state.feedbackScreenshot
      ? {
          filename: state.feedbackScreenshot.name,
          mime_type: state.feedbackScreenshot.mimeType,
          base64: extractBase64FromDataUrl(state.feedbackScreenshot.dataUrl)
        }
      : null
  };
}

async function sendFeedback() {
  if (state.feedbackSending) return;
  if (!validateFeedbackDraft()) {
    syncFeedbackDraftUi();
    return;
  }

  if (location.protocol === "file:") {
    const message = st("feedbackLocalOnly");
    setFeedbackNotice(message, "error");
    setStatus(message, "error");
    return;
  }

  state.feedbackSending = true;
  setFeedbackNotice(st("feedbackSending"), "busy");
  setStatus(st("feedbackSending"), "busy");
  syncFeedbackDraftUi();

  try {
    const response = await fetch(FEEDBACK_SEND_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await buildFeedbackPayload())
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || st("feedbackFailed"));
    }

    const successMessage = String(data?.message || st("feedbackSuccess"));
    resetFeedbackAfterSend();
    setFeedbackNotice(successMessage, "success");
    setStatus(successMessage, "success");
  } catch (error) {
    const message = error?.message || st("feedbackFailed");
    setFeedbackNotice(message, "error");
    setStatus(message, "error");
  } finally {
    state.feedbackSending = false;
    syncFeedbackDraftUi();
  }
}

function initMicUi() {
  state.mic.supported = !!getSpeechRecognitionCtor();
  state.mic.mergeMode = state.settings.micMergeMode === "replace" ? "replace" : "append";
  syncMicModeButtons();
  refreshMicUi();
}

function getSpeechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function isSecureMicContext() {
  if (location.protocol === "file:") return false;
  return !!(window.isSecureContext || location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1");
}

function canUseMicHere() {
  return state.mode === "text" && state.textSubmode === "translate";
}

function setMicStatusState(kind, message) {
  if (!el.micStatus || !el.micStatusText) return;
  el.micStatus.dataset.state = kind;
  el.micStatusText.textContent = message;
}

function setMicDeviceBadge(label) {
  if (!el.micDeviceBadge) return;
  const value = String(label || "").trim();
  el.micDeviceBadge.hidden = !value;
  el.micDeviceBadge.textContent = value;
}

function micText(key) {
  const currentLang = uiLanguage();
  const copy = {
    hu: {
      ready: "Mikrofon kész",
      checking: "Mikrofon ellenőrzése",
      checkingStopped: "Mikrofon ellenőrzése megszakítva",
      requestingPermission: "Mikrofon engedély kérése",
      listening: "Hallgatlak...",
      recording: "Felvétel folyamatban",
      recordingFallback: "Felvétel folyamatban, biztonsági módban",
      processing: "Feldolgozás",
      processingLong: "Feldolgozás...",
      processingAfterSilence: "Csend után feldolgozom...",
      stop: "Mikrofon leállítva",
      speechRecognized: "Beszéd felismerve",
      saferModeStatus: "Biztonsági mód indul",
      saferModeMessage: "A böngészős felismerő nem indult el, átváltok biztosabb módra",
      notSupportedLocal: "Nincs támogatás",
      notSupportedMessage: "Ebben a böngészőben nincs elérhető mikrofonos tartalék mód",
      permissionDeniedLocal: "Engedély megtagadva",
      permissionDeniedMessage: "A mikrofon engedélyét elutasítottad",
      waitingPermissionLocal: "Engedélyre vár",
      waitingPermissionMessage: "A böngésző még a mikrofon engedélyére vár. Nézd meg a címsor melletti engedélykérést.",
      noMicrophoneLocal: "Nincs mikrofon",
      noMicrophoneMessage: "Nem találtam elérhető mikrofont",
      microphoneBusyLocal: "Mikrofon foglalt",
      microphoneBusyMessage: "A mikrofont most egy másik alkalmazás használja",
      errorLocal: "Mikrofon hiba",
      permissionRequestFailed: "A mikrofon engedélykérése nem sikerült",
      localOnlyLocal: "Nyisd a Vercel oldalt",
      localOnlyMessage: "A szerveres hangfelismerés a helyi index.html fájlból nem működik. Nyisd a közzétett oldalt.",
      apiMissingLocal: "Hiányzik a hang API",
      apiMissingMessage: "A hangfelismerő API még nincs feltöltve a szerverre. Töltsd fel az api/transcribe-audio.js fájlt, aztán redeployolj.",
      apiUnavailableLocal: "A hang API nem érhető el",
      apiUnavailableMessage: "A hangfelismerő végpont most nem érhető el. Ellenőrizd a Vercel deployt.",
      secureContextLocal: "Csak HTTPS oldalon működik",
      secureContextMessage: "A mikrofon csak HTTPS vagy localhost alatt működik",
      recordStartFailed: "A hangfelvétel nem indítható el",
      recordInitFailed: "A hangfelvétel nem indult el rendesen",
      restartFailed: "A mikrofon most nem indítható újra, próbáld meg egy pillanat múlva",
      noSpeechLocal: "Nem hallottam beszédet",
      noSpeechMessage: "Nem hallottam érthető beszédet, próbáld meg újra",
      tooLongLocal: "Túl hosszú hang",
      tooLongMessage: "Túl hosszú lett a felvétel, próbáld meg rövidebben",
      serviceUnavailable: "A hangfelismerés most nem érhető el",
      serverOnly: "A biztosabb hangfelismerés csak a közzétett Vercel oldalon működik.",
      apiFileMissing: "A hangfelismerő API még nincs feltöltve a szerverre. Töltsd fel az api/transcribe-audio.js fájlt.",
      apiKeyMissing: "Hiányzik az OPENAI_API_KEY a Vercelben, ezért a hangfelismerés nem indul el.",
      noSpeechDetected: "Nem hallottam érthető beszédet.",
      connectionLocal: "Kapcsolati hiba",
      connectionMessage: "A beszédfelismerő szolgáltatás most nem érhető el"
    },
    en: {
      ready: "Microphone ready",
      checking: "Checking microphone",
      checkingStopped: "Microphone check cancelled",
      requestingPermission: "Requesting microphone access",
      listening: "Listening...",
      recording: "Recording in progress",
      recordingFallback: "Recording in safe mode",
      processing: "Processing",
      processingLong: "Processing...",
      processingAfterSilence: "Processing after silence...",
      stop: "Microphone stopped",
      speechRecognized: "Speech recognized",
      saferModeStatus: "Safe mode starting",
      saferModeMessage: "Browser recognition did not start, switching to a safer mode",
      notSupportedLocal: "Not supported",
      notSupportedMessage: "No microphone fallback mode is available in this browser",
      permissionDeniedLocal: "Permission denied",
      permissionDeniedMessage: "You denied microphone access",
      waitingPermissionLocal: "Waiting for access",
      waitingPermissionMessage: "The browser is still waiting for microphone access. Check the permission prompt near the address bar.",
      noMicrophoneLocal: "No microphone",
      noMicrophoneMessage: "No available microphone was found",
      microphoneBusyLocal: "Microphone busy",
      microphoneBusyMessage: "The microphone is currently used by another app",
      errorLocal: "Microphone error",
      permissionRequestFailed: "The microphone permission request failed",
      localOnlyLocal: "Open the Vercel site",
      localOnlyMessage: "Server-side speech recognition does not work from the local index.html file. Open the published site.",
      apiMissingLocal: "Audio API missing",
      apiMissingMessage: "The speech API is not deployed yet. Upload api/transcribe-audio.js and redeploy.",
      apiUnavailableLocal: "Audio API unavailable",
      apiUnavailableMessage: "The speech recognition endpoint is currently unavailable. Check the Vercel deploy.",
      secureContextLocal: "Works only on HTTPS",
      secureContextMessage: "The microphone works only on HTTPS or localhost",
      recordStartFailed: "Audio recording cannot be started",
      recordInitFailed: "Audio recording did not start correctly",
      restartFailed: "The microphone cannot be restarted right now, try again in a moment",
      noSpeechLocal: "No speech heard",
      noSpeechMessage: "I could not hear clear speech, try again",
      tooLongLocal: "Audio too long",
      tooLongMessage: "The recording became too long, try a shorter one",
      serviceUnavailable: "Speech recognition is unavailable right now",
      serverOnly: "Reliable speech recognition works only on the published Vercel site.",
      apiFileMissing: "The speech API is not deployed yet. Upload api/transcribe-audio.js.",
      apiKeyMissing: "OPENAI_API_KEY is missing in Vercel, so speech recognition cannot start.",
      noSpeechDetected: "I could not hear clear speech.",
      connectionLocal: "Connection error",
      connectionMessage: "The speech recognition service is unavailable right now"
    }
  };
  return (copy[currentLang] && copy[currentLang][key]) || copy.hu[key] || "";
}

function clearMicStartTimeout() {
  if (!state.mic.startTimeout) return;
  clearTimeout(state.mic.startTimeout);
  state.mic.startTimeout = 0;
}

function clearMicVolumeMonitor() {
  if (state.mic.volumeTimer) {
    clearTimeout(state.mic.volumeTimer);
    state.mic.volumeTimer = 0;
  }

  try { state.mic.analyserSource?.disconnect(); } catch {}
  try { state.mic.analyser?.disconnect?.(); } catch {}
  try { state.mic.audioContext?.close?.(); } catch {}

  state.mic.audioContext = null;
  state.mic.analyser = null;
  state.mic.analyserSource = null;
}

function stopMicStream() {
  state.mic.stream?.getTracks?.().forEach(track => track.stop());
  state.mic.stream = null;
  clearMicVolumeMonitor();
}

function canUseRecorderFallback() {
  return typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia;
}

function getRecorderMimeType() {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) return "";
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/ogg"
  ];
  return candidates.find(type => MediaRecorder.isTypeSupported(type)) || "";
}

function buildMicSourceLanguage() {
  const selected = String(el.source?.value || "auto").toLowerCase();
  return selected === "auto" ? "" : selected;
}

async function blobToBase64(blob) {
  const buffer = await blob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

function syncMicModeButtons() {
  const appendActive = state.mic.mergeMode !== "replace";
  if (el.micModeAppend) {
    el.micModeAppend.classList.toggle("is-active", appendActive);
    el.micModeAppend.setAttribute("aria-pressed", String(appendActive));
  }
  if (el.micModeReplace) {
    el.micModeReplace.classList.toggle("is-active", !appendActive);
    el.micModeReplace.setAttribute("aria-pressed", String(!appendActive));
  }
}

function refreshMicUi() {
  if (!el.mic) return;

  const supported = !!getSpeechRecognitionCtor() || canUseRecorderFallback();
  state.mic.supported = supported;
  const enabledHere = canUseMicHere();
  el.mic.classList.toggle("is-recording", state.mic.listening);
  el.mic.classList.toggle("is-processing", state.mic.processing);
  el.mic.disabled = !enabledHere;
  el.mic.setAttribute("aria-pressed", String(state.mic.listening));
  el.mic.textContent = state.mic.listening
    ? (uiLanguage() === "en" ? "Stop" : "Leállítás")
    : (state.mic.processing ? micText("processingLong") : (uiLanguage() === "en" ? "Microphone" : "Mikrofon"));

  if (!enabledHere) {
    setMicStatusState("ready", micText("ready"));
    return;
  }

  if (!supported) {
    setMicStatusState("error", micText("notSupportedLocal"));
    return;
  }

  if (!isSecureMicContext()) {
    setMicStatusState("error", micText("secureContextLocal"));
    return;
  }

  if (!state.mic.listening && !state.mic.processing && !state.mic.lastError) {
    setMicStatusState("ready", micText("ready"));
  }

  setMicDeviceBadge(state.mic.deviceLabel);
}

function setMicMergeMode(mode) {
  state.mic.mergeMode = mode === "replace" ? "replace" : "append";
  state.settings.micMergeMode = state.mic.mergeMode;
  saveSettings();
  syncMicModeButtons();
  if (state.mic.listening || state.mic.finalText || state.mic.interimText) applyMicTranscriptToSource();
}

function buildMicLocale() {
  const preferred = el.source?.value || "auto";
  if (preferred !== "auto") return localeFor(preferred);
  const guessed = detect(el.sourceText?.value || "") || state.lastDetected || normalizeDetectedLanguage(navigator.language, "auto", "") || "hu";
  return localeFor(guessed);
}

function createMicRecognition() {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) return null;
  const recognition = new Ctor();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.onstart = handleMicStart;
  recognition.onresult = handleMicResult;
  recognition.onerror = handleMicError;
  recognition.onend = handleMicEnd;
  state.mic.recognition = recognition;
  return recognition;
}

function ensureMicRecognition() {
  return state.mic.recognition || createMicRecognition();
}

async function detectMicDeviceLabel() {
  if (!navigator.mediaDevices?.enumerateDevices) return "";
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const inputs = devices.filter(device => device.kind === "audioinput");
    if (!inputs.length) return "";
    const selected = inputs.find(device => device.deviceId === "default" || /default/i.test(device.label)) || inputs[0];
    const label = String(selected.label || "").trim();
    if (!label) return "";
    if (/(headset|hands-free|airpods|earbuds|bluetooth|fülhallgató|headphones)/i.test(label)) return "Headset mikrofon";
    return "Alap mikrofon";
  } catch {
    return "";
  }
}

async function queryMicPermissionState() {
  try {
    if (!navigator.permissions?.query) return "";
    const status = await navigator.permissions.query({ name: "microphone" });
    return String(status?.state || "");
  } catch {
    return "";
  }
}

async function ensureMicPermission() {
  if (!navigator.mediaDevices?.getUserMedia) {
    state.mic.deviceLabel = "";
    setMicDeviceBadge("");
    return { ok: true, stream: null };
  }

  const permissionState = await queryMicPermissionState();
  if (permissionState === "denied") {
    return { ok: false, local: "Engedély megtagadva", message: "A mikrofon engedélyét elutasítottad" };
  }

  let stream = null;
  let timeoutId = 0;
  try {
    stream = await Promise.race([
      navigator.mediaDevices.getUserMedia({ audio: true }),
      new Promise((_, reject) => {
        timeoutId = window.setTimeout(() => reject(new Error("__mic_permission_timeout__")), MIC_PERMISSION_TIMEOUT_MS);
      })
    ]);
    state.mic.deviceLabel = await detectMicDeviceLabel();
    setMicDeviceBadge(state.mic.deviceLabel);
    return { ok: true, stream };
  } catch (error) {
    stream?.getTracks?.().forEach(track => track.stop());
    if (String(error?.message || "") === "__mic_permission_timeout__") {
      return {
        ok: false,
        local: "Engedélyre vár",
        message: "A böngésző még a mikrofon engedélyére vár. Nézd meg a címsor melletti engedélykérést."
      };
    }
    const name = String(error?.name || "");
    if (name === "NotAllowedError" || name === "PermissionDeniedError" || name === "SecurityError") {
      return { ok: false, local: "Engedély megtagadva", message: "A mikrofon engedélyét elutasítottad" };
    }
    if (name === "NotFoundError" || name === "DevicesNotFoundError" || name === "OverconstrainedError") {
      return { ok: false, local: "Nincs mikrofon", message: "Nem találtam elérhető mikrofont" };
    }
    return { ok: false, local: "Mikrofon hiba", message: "A mikrofon engedélykérése nem sikerült" };
    if (name === "NotReadableError" || name === "TrackStartError") {
      return { ok: false, local: "Mikrofon foglalt", message: "A mikrofont most egy mĂˇsik alkalmazĂˇs hasznĂˇlja" };
    }
  } finally {
    stream?.getTracks().forEach(track => track.stop());
  }
}

async function transcribeMicBlob(blob, sourceLanguage) {
  if (location.protocol === "file:") {
    throw new Error("A biztosabb hangfelismer\u00e9s csak a k\u00f6zz\u00e9tett Vercel oldalon m\u0171k\u00f6dik.");
  }

  const response = await fetch(MIC_TRANSCRIBE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      audio_base64: await blobToBase64(blob),
      mime_type: blob.type || "audio/webm",
      source_language: sourceLanguage || ""
    })
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("A hangfelismer\u0151 API m\u00e9g nincs felt\u00f6ltve a szerverre. T\u00f6ltsd fel az api/transcribe-audio.js f\u00e1jlt.");
    }
    if (response.status === 500 && String(data?.error || "").includes("OPENAI_API_KEY")) {
      throw new Error("Hi\u00e1nyzik az OPENAI_API_KEY a Vercelben, ez\u00e9rt a hangfelismer\u00e9s nem indul el.");
    }
    throw new Error(data?.error || "A hangfelismer\u00e9s most nem \u00e9rhet\u0151 el.");
  }

  const text = String(data?.text || "").trim();
  if (!text) throw new Error("Nem hallottam \u00e9rthet\u0151 besz\u00e9det.");
  return text;
}

function clearMicStartTimeout() {
  if (!state.mic.startTimeout) return;
  clearTimeout(state.mic.startTimeout);
  state.mic.startTimeout = 0;
}

function clearMicVolumeMonitor() {
  if (state.mic.volumeTimer) {
    clearTimeout(state.mic.volumeTimer);
    state.mic.volumeTimer = 0;
  }
  try { state.mic.analyserSource?.disconnect(); } catch {}
  try { state.mic.analyser?.disconnect?.(); } catch {}
  try { state.mic.audioContext?.close?.(); } catch {}
  state.mic.audioContext = null;
  state.mic.analyser = null;
  state.mic.analyserSource = null;
}

function stopMicStream() {
  state.mic.stream?.getTracks?.().forEach(track => track.stop());
  state.mic.stream = null;
  clearMicVolumeMonitor();
}

function buildMicSourceLanguage() {
  const selected = String(el.source?.value || "auto").toLowerCase();
  return selected === "auto" ? "" : selected;
}

async function probeMicTranscribeEndpoint() {
  if (location.protocol === "file:") return { ok: false, reason: "local" };

  try {
    const response = await fetch(MIC_TRANSCRIBE_ENDPOINT, {
      method: "GET",
      cache: "no-store"
    });
    if (response.status === 404) return { ok: false, reason: "missing" };
    return { ok: true, reason: "" };
  } catch {
    return { ok: false, reason: "unreachable" };
  }
}

async function tryMicRecorderFallback(token, fromFallback = false) {
  const probe = await probeMicTranscribeEndpoint();
  if (token !== state.mic.startToken) return false;

  if (!probe.ok) {
    state.mic.processing = false;
    state.mic.engine = "";
    state.mic.lastError = "Mikrofon hiba";
    refreshMicUi();

    if (probe.reason === "local") {
      setMicStatusState("error", "Nyisd a Vercel oldalt");
      setStatus("A szerveres hangfelismerés a helyi index.html fájlból nem működik. Nyisd a közzétett oldalt.", "error");
    } else if (probe.reason === "missing") {
      setMicStatusState("error", "Hiányzik a hang API");
      setStatus("A hangfelismerő API még nincs feltöltve a szerverre. Töltsd fel az api/transcribe-audio.js fájlt, aztán redeployolj.", "error");
    } else {
      setMicStatusState("error", "A hang API nem érhető el");
      setStatus("A hangfelismerő végpont most nem érhető el. Ellenőrizd a Vercel deployt.", "error");
    }

    return false;
  }

  return startMicRecorder(token, fromFallback);
}

function canUseRecorderFallback() {
  return typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia;
}

function getRecorderMimeType() {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) return "";
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/ogg"
  ];
  return candidates.find(type => MediaRecorder.isTypeSupported(type)) || "";
}

function startMicVolumeMonitor(stream) {
  clearMicVolumeMonitor();
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx || !stream) return;

  try {
    const audioContext = new AudioCtx();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    state.mic.audioContext = audioContext;
    state.mic.analyser = analyser;
    state.mic.analyserSource = source;
    state.mic.lastVoiceAt = Date.now();

    const buffer = new Uint8Array(analyser.fftSize);
    const sample = () => {
      if (state.mic.engine !== "recorder" || !state.mic.listening || !state.mic.analyser) return;
      analyser.getByteTimeDomainData(buffer);
      let energy = 0;
      for (let i = 0; i < buffer.length; i += 1) energy += Math.abs(buffer[i] - 128);
      const average = energy / buffer.length;
      if (average >= MIC_VOLUME_THRESHOLD) state.mic.lastVoiceAt = Date.now();
      if (Date.now() - state.mic.lastVoiceAt >= MIC_SILENCE_MS) {
        stopMicCapture("Csend ut\u00e1n feldolgozom...");
        return;
      }
      state.mic.volumeTimer = window.setTimeout(sample, MIC_VOLUME_SAMPLE_MS);
    };

    state.mic.volumeTimer = window.setTimeout(sample, MIC_VOLUME_SAMPLE_MS);
  } catch {}
}

function armMicStartTimeout(token) {
  clearMicStartTimeout();
  state.mic.startTimeout = window.setTimeout(() => {
    if (token !== state.mic.startToken) return;
    if (state.mic.listening || !state.mic.processing || state.mic.engine !== "speech-pending") return;
    state.mic.ignoreAbortError = true;
    state.mic.engine = "recorder-starting";
    setMicStatusState("processing", "Biztons\u00e1gi m\u00f3d indul");
    setStatus("A b\u00f6ng\u00e9sz\u0151s felismer\u0151 nem indult el, \u00e1tv\u00e1ltok biztosabb m\u00f3dra", "busy");
    try { state.mic.recognition?.abort?.(); } catch {}
    void tryMicRecorderFallback(token, true);
  }, MIC_START_TIMEOUT_MS);
}

async function startMicRecorder(token, fromFallback = false) {
  if (!canUseRecorderFallback()) {
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", "Nincs t\u00e1mogat\u00e1s");
    setStatus("Ebben a b\u00f6ng\u00e9sz\u0151ben nincs el\u00e9rhet\u0151 mikrofonos tartal\u00e9k m\u00f3d", "error");
    return false;
  }

  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.mic.deviceLabel = await detectMicDeviceLabel();
    setMicDeviceBadge(state.mic.deviceLabel);
  } catch (error) {
    const name = String(error?.name || "");
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    if (name === "NotAllowedError" || name === "PermissionDeniedError") {
      setMicStatusState("error", "Enged\u00e9ly megtagadva");
      setStatus("A mikrofon enged\u00e9ly\u00e9t elutas\u00edtottad", "error");
    } else {
      setMicStatusState("error", "Mikrofon hiba");
      setStatus("A hangfelv\u00e9tel nem ind\u00edthat\u00f3 el", "error");
    }
    return false;
  }

  const mimeType = getRecorderMimeType();
  try {
    state.mic.stream = stream;
    state.mic.recorderMimeType = mimeType || "audio/webm";
    state.mic.recorderChunks = [];
    state.mic.engine = "recorder";
    state.mic.listening = true;
    state.mic.processing = false;
    state.mic.ignoreAbortError = false;
    state.mic.lastError = "";
    recordMicUsage();
    refreshMicUi();
    setMicStatusState("listening", "Hallgatlak...");
    setStatus(fromFallback ? "Felv\u00e9tel folyamatban, biztons\u00e1gi m\u00f3dban" : "Felv\u00e9tel folyamatban", "busy");

    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    state.mic.recorder = recorder;
    recorder.ondataavailable = event => {
      if (event.data && event.data.size) state.mic.recorderChunks.push(event.data);
    };
    recorder.onerror = () => {
      stopMicStream();
      state.mic.recorder = null;
      state.mic.processing = false;
      state.mic.listening = false;
      state.mic.engine = "";
      state.mic.lastError = "Mikrofon hiba";
      refreshMicUi();
      setMicStatusState("error", "Mikrofon hiba");
      setStatus("A hangfelv\u00e9tel nem indult el rendesen", "error");
    };
    recorder.onstop = () => { void handleRecorderStop(token); };
    recorder.start(MIC_RECORDER_SLICE_MS);
    startMicVolumeMonitor(stream);
    return true;
  } catch {
    stopMicStream();
    state.mic.processing = false;
    state.mic.listening = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", "Mikrofon hiba");
    setStatus("A hangfelv\u00e9tel most nem ind\u00edthat\u00f3 el", "error");
    return false;
  }
}

async function handleRecorderStop(token) {
  clearMicStartTimeout();
  clearMicVolumeMonitor();

  const chunks = [...state.mic.recorderChunks];
  const mimeType = state.mic.recorderMimeType || "audio/webm";
  state.mic.recorderChunks = [];
  state.mic.recorder = null;
  state.mic.ignoreAbortError = false;
  state.mic.listening = false;
  state.mic.processing = true;
  refreshMicUi();
  setMicStatusState("processing", "Feldolgoz\u00e1s");
  setStatus("Hang feldolgoz\u00e1sa", "busy");

  const blob = new Blob(chunks, { type: mimeType });
  stopMicStream();

  if (token !== state.mic.startToken) {
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    return;
  }

  if (!blob.size) {
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", "Nem hallottam besz\u00e9det");
    setStatus("Nem hallottam \u00e9rthet\u0151 besz\u00e9det, pr\u00f3b\u00e1ld meg \u00fajra", "error");
    return;
  }

  if (blob.size > MIC_MAX_BLOB_BYTES) {
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", "T\u00fal hossz\u00fa hang");
    setStatus("T\u00fal hossz\u00fa lett a felv\u00e9tel, pr\u00f3b\u00e1ld meg r\u00f6videbben", "error");
    return;
  }

  try {
    const text = await transcribeMicBlob(blob, buildMicSourceLanguage());
    if (token !== state.mic.startToken) return;
    const language = normalizeDetectedLanguage(buildMicSourceLanguage(), buildMicSourceLanguage() || "auto", text) || "hu";
    state.mic.finalText = formatMicChunk(text, language, state.mic.baseText);
    state.mic.interimText = "";
    applyMicTranscriptToSource();
    state.mic.baseText = el.sourceText?.value || "";
    state.mic.finalText = "";
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("ready", "Mikrofon k\u00e9sz");
    setStatus("Besz\u00e9d felismerve", "success");
    if (state.settings.liveTranslate && canUseMicHere()) void runTranslate(true);
  } catch (error) {
    state.mic.processing = false;
    state.mic.engine = "";
    state.mic.lastError = "Mikrofon hiba";
    refreshMicUi();
    setMicStatusState("error", "Mikrofon hiba");
    setStatus(error?.message || "A hangfelismer\u00e9s most nem \u00e9rhet\u0151 el", "error");
  }
}

function resetMicSilenceTimer() {
  if (!state.mic.silenceTimer) return;
  clearTimeout(state.mic.silenceTimer);
  state.mic.silenceTimer = 0;
}

function scheduleMicSilenceTimer() {
  resetMicSilenceTimer();
  if (!state.mic.listening) return;
  state.mic.silenceTimer = window.setTimeout(() => {
    if (!state.mic.listening) return;
    stopMicCapture("Csend után feldolgozom...");
  }, MIC_SILENCE_MS);
}

function formatMicChunk(chunk, lang, baseText) {
  let value = String(chunk || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  const locale = localeFor(lang);
  if (!String(baseText || "").trim() || /[.!?]\s*$/u.test(String(baseText || ""))) {
    value = value.charAt(0).toLocaleUpperCase(locale) + value.slice(1);
  }
  return value;
}

function joinMicParts(base, addition) {
  const left = String(base || "");
  const right = String(addition || "").trim();
  if (!right) return left;
  if (!left.trim()) return right;
  return /[\s\n]$/u.test(left) ? `${left}${right}` : `${left} ${right}`;
}

function applyMicTranscriptToSource() {
  if (!el.sourceText) return;
  const originalBase = state.mic.baseText;
  const base = state.mic.mergeMode === "replace" ? "" : originalBase;
  const committed = joinMicParts(base, state.mic.finalText);
  const draft = joinMicParts(committed, state.mic.interimText);
  el.sourceText.value = draft || committed || originalBase;
  updateCounter();
  updateHint();
  refreshMicUi();
}

function handleMicStart() {
  clearMicStartTimeout();
  stopMicStream();
  state.mic.engine = "speech";
  state.mic.listening = true;
  state.mic.processing = false;
  state.mic.lastError = "";
  state.mic.silentEnd = false;
  recordMicUsage();
  refreshMicUi();
  setMicStatusState("listening", "Hallgatlak...");
  setStatus("Felvétel folyamatban", "busy");
  scheduleMicSilenceTimer();
}

function handleMicResult(event) {
  const lang = normalizeDetectedLanguage(el.source?.value === "auto" ? "" : el.source?.value, el.source?.value || "auto", el.sourceText?.value || "") || "hu";
  let interim = "";

  for (let index = event.resultIndex; index < event.results.length; index += 1) {
    const result = event.results[index];
    const transcript = String(result?.[0]?.transcript || "").trim();
    if (!transcript) continue;

    if (result.isFinal) {
      const baseText = state.mic.mergeMode === "replace" ? state.mic.finalText : joinMicParts(state.mic.baseText, state.mic.finalText);
      state.mic.finalText = joinMicParts(state.mic.finalText, formatMicChunk(transcript, lang, baseText));
    } else {
      const baseText = state.mic.mergeMode === "replace" ? state.mic.finalText : joinMicParts(state.mic.baseText, state.mic.finalText);
      interim = joinMicParts(interim, formatMicChunk(transcript, lang, baseText));
    }
  }

  state.mic.interimText = interim;
  applyMicTranscriptToSource();
  setMicStatusState("listening", interim ? "Hallgatlak..." : "Felvétel folyamatban");
  scheduleMicSilenceTimer();
}

function normalizeMicError(errorCode) {
  switch (String(errorCode || "")) {
    case "not-allowed":
    case "service-not-allowed":
      return { local: micText("permissionDeniedLocal"), message: micText("permissionDeniedMessage") };
    case "audio-capture":
      return { local: micText("noMicrophoneLocal"), message: micText("noMicrophoneMessage") };
    case "no-speech":
      return { local: micText("noSpeechLocal"), message: micText("noSpeechMessage") };
    case "network":
      return { local: micText("connectionLocal"), message: micText("connectionMessage") };
    default:
      return { local: micText("errorLocal"), message: micText("serviceUnavailable") };
  }
}

function handleMicError(event) {
  if (event?.error === "aborted" && state.mic.ignoreAbortError) {
    state.mic.ignoreAbortError = false;
    return;
  }

  clearMicStartTimeout();
  stopMicStream();
  resetMicSilenceTimer();
  const normalized = normalizeMicError(event?.error);
  state.mic.lastError = normalized.local;
  state.mic.listening = false;
  state.mic.processing = false;
  state.mic.engine = "";
  refreshMicUi();
  setMicStatusState("error", normalized.local);
  setStatus(normalized.message, "error");
}

function handleMicEnd() {
  clearMicStartTimeout();
  if (state.mic.engine === "recorder-starting" || state.mic.engine === "recorder") return;
  stopMicStream();
  resetMicSilenceTimer();
  const silentEnd = state.mic.silentEnd;
  const hadError = !!state.mic.lastError;
  const hadText = !!String(state.mic.finalText || "").trim();
  state.mic.listening = false;
  state.mic.processing = false;
  state.mic.engine = "";
  state.mic.interimText = "";
  state.mic.ignoreAbortError = false;
  state.mic.silentEnd = false;
  applyMicTranscriptToSource();
  state.mic.baseText = el.sourceText?.value || "";
  state.mic.finalText = "";
  refreshMicUi();

  if (silentEnd) return;

  if (hadError) {
    setMicStatusState("error", state.mic.lastError);
    state.mic.lastError = "";
    return;
  }

  setMicStatusState("ready", micText("ready"));
  if (hadText) {
    setStatus(micText("speechRecognized"), "success");
    if (state.settings.liveTranslate && canUseMicHere()) void runTranslate(true);
    return;
  }

  setStatus(micText("ready"), "");
}

function cancelMicCapture(quiet = false) {
  clearMicStartTimeout();
  resetMicSilenceTimer();
  state.mic.ignoreAbortError = true;
  state.mic.silentEnd = quiet;
  if (state.mic.recorder && (state.mic.listening || state.mic.processing)) {
    try { state.mic.recorder.stop(); } catch {}
  }
  if (state.mic.recognition && (state.mic.listening || state.mic.processing || state.mic.engine === "speech-pending")) {
    try { state.mic.recognition.abort(); } catch {}
  }
  stopMicStream();
  state.mic.listening = false;
  state.mic.processing = false;
  state.mic.engine = "";
  state.mic.lastError = "";
  state.mic.finalText = "";
  state.mic.interimText = "";
  refreshMicUi();
  if (!quiet) {
    setMicStatusState("ready", micText("ready"));
    setStatus(micText("stop"), "success");
  }
}

function stopMicCapture(message = micText("processingLong")) {
  clearMicStartTimeout();
  resetMicSilenceTimer();
  if (state.mic.engine === "recorder" && state.mic.recorder && state.mic.listening) {
    state.mic.listening = false;
    state.mic.processing = true;
    refreshMicUi();
    setMicStatusState("processing", micText("processing"));
    setStatus(message, "busy");
    try {
      state.mic.recorder.stop();
    } catch {
      void handleRecorderStop(state.mic.startToken);
    }
    return;
  }
  if (!state.mic.recognition || !state.mic.listening) return;
  state.mic.listening = false;
  state.mic.processing = true;
  refreshMicUi();
  setMicStatusState("processing", micText("processing"));
  setStatus(message, "busy");
  try {
    state.mic.recognition.stop();
  } catch {
    handleMicEnd();
  }
}

function cancelPendingMicRequest() {
  clearMicStartTimeout();
  stopMicStream();
  try { state.mic.recorder?.stop?.(); } catch {}
  state.mic.startToken += 1;
  state.mic.recorder = null;
  state.mic.recorderChunks = [];
  state.mic.processing = false;
  state.mic.engine = "";
  state.mic.lastError = "";
  refreshMicUi();
  setMicStatusState("ready", micText("ready"));
  setStatus(micText("checkingStopped"), "success");
}

async function startMicCapture() {
  if (!canUseMicHere()) return;

  if (!isSecureMicContext()) {
    setMicStatusState("error", micText("secureContextLocal"));
    setStatus(micText("secureContextMessage"), "error");
    refreshMicUi();
    return;
  }

  state.mic.processing = true;
  state.mic.lastError = "";
  state.mic.baseText = el.sourceText?.value || "";
  state.mic.finalText = "";
  state.mic.interimText = "";
  state.mic.engine = "";
  state.mic.usageTracked = false;
  const token = ++state.mic.startToken;
  refreshMicUi();
  setMicStatusState("processing", micText("checking"));
  setStatus(micText("requestingPermission"), "busy");

  const permission = await ensureMicPermission();
  if (token !== state.mic.startToken) return;
  if (!permission.ok) {
    state.mic.processing = false;
    state.mic.lastError = permission.local;
    refreshMicUi();
    setMicStatusState("error", permission.local);
    setStatus(permission.message, "error");
    return;
  }

  if (!getSpeechRecognitionCtor()) {
    await tryMicRecorderFallback(token, false);
    return;
  }

  const recognition = ensureMicRecognition();
  if (token !== state.mic.startToken) return;
  if (!recognition) {
    await tryMicRecorderFallback(token, false);
    return;
  }

  recognition.lang = buildMicLocale();
  state.mic.engine = "speech-pending";
  armMicStartTimeout(token);
  try {
    recognition.start();
  } catch {
    clearMicStartTimeout();
    await tryMicRecorderFallback(token, true);
    if (state.mic.engine === "recorder") return;
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", micText("errorLocal"));
    setStatus(micText("restartFailed"), "error");
  }
}

async function toggleMicCapture() {
  if (state.mic.listening) {
    stopMicCapture("Feldolgozás...");
    return;
  }

  if (state.mic.processing) {
    cancelPendingMicRequest();
    return;
  }
  await startMicCapture();
}

async function translateRecognizedTextNow() {
  if (!String(el.sourceText?.value || "").trim()) {
    setStatus("Előbb mondj valamit a mikrofonba vagy írj szöveget", "error");
    return;
  }
  await runTranslate(true);
}

function populateSelects() { const langs = buildLanguages(); fill(el.source, langs, true, "auto"); fill(el.target, langs, false, "en"); fill(el.imageSource, langs, true, "auto"); fill(el.imageTarget, langs, false, "en"); fill(el.docSource, langs, true, "auto"); fill(el.docTarget, langs, false, "en"); fill(el.correctionSource, langs, true, "auto"); }
function buildLanguages() { return LANGS.map(code => ({ code, label: label(code) })).sort((a, b) => a.code === "auto" ? -1 : b.code === "auto" ? 1 : a.label.localeCompare(b.label, uiLocale())); }
function fill(select, langs, allowAuto, value) { select.innerHTML = langs.filter(x => allowAuto || x.code !== "auto").map(x => `<option value="${x.code}">${x.label}</option>`).join(""); select.value = value; syncSearchableSelect(select); renderSearchableOptions(select, ""); }
function label(code) {
  const overrides = languageOverrides();
  if (overrides[code]) return overrides[code];
  const names = displayNames();
  if (!names) return code.toUpperCase();
  try {
    const c = code === "pb" ? "pt-BR" : code === "zt" ? "zh-Hant" : code;
    const n = names.of(c);
    return n ? n.charAt(0).toLocaleUpperCase(uiLocale()) + n.slice(1) : code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

function languageFlag(code) {
  return LANGUAGE_FLAGS[code] || "🌐";
}

function languageFlagCountry(code) {
  return LANGUAGE_FLAG_COUNTRIES[code] || "";
}

function languageFlagUrl(code) {
  const country = languageFlagCountry(code);
  return country ? `https://flagcdn.com/${country}.svg` : "";
}

function createFlagGlobeIcon() {
  const icon = document.createElement("span");
  icon.className = "language-select__flag-globe";
  icon.innerHTML = `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle cx="12" cy="12" r="8"></circle>
      <path d="M4 12h16"></path>
      <path d="M12 4a13.5 13.5 0 0 1 0 16"></path>
      <path d="M12 4a13.5 13.5 0 0 0 0 16"></path>
    </svg>
  `;
  return icon;
}

function populateLanguageFlag(container, code) {
  if (!container) return;
  const url = languageFlagUrl(code);
  container.textContent = "";
  container.classList.toggle("is-neutral", !url);
  if (!url) {
    container.append(createFlagGlobeIcon());
    return;
  }
  const image = document.createElement("img");
  image.className = "language-select__flag-image";
  image.src = url;
  image.alt = "";
  image.loading = "lazy";
  image.decoding = "async";
  container.append(image);
}

function searchableSelects() {
  return document.querySelectorAll("select[data-searchable-language], select[data-searchable-ui]");
}

function setupLanguageSelects() {
  searchableSelects().forEach(select => {
    if (!select._searchable) createSearchableSelect(select);
    renderSearchableOptions(select, "");
    syncSearchableSelect(select);
  });
}

function createSearchableSelect(select) {
  select.classList.add("language-native-select");
  const mode = select.dataset.searchableUi || (select.hasAttribute("data-searchable-language") ? "search" : "basic");
  const showSearch = mode !== "basic";
  const aiValue = select.hasAttribute("data-searchable-language") ? "auto" : "";

  const wrapper = document.createElement("div");
  wrapper.className = "language-select";
  if (!showSearch) wrapper.classList.add("language-select--basic");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "language-select__trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");

  const triggerMain = document.createElement("span");
  triggerMain.className = "language-select__trigger-main";

  const triggerFlag = document.createElement("span");
  triggerFlag.className = "language-select__trigger-flag";
  triggerFlag.setAttribute("aria-hidden", "true");
  triggerFlag.hidden = !select.hasAttribute("data-searchable-language");

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

  triggerMain.append(triggerFlag, triggerLabel);
  trigger.append(triggerMain, triggerAi, triggerIcon);

  const panel = document.createElement("div");
  panel.className = "language-select__panel";
  panel.hidden = true;

  let search = null;
  if (showSearch) {
    search = document.createElement("input");
    search.type = "search";
    search.className = "language-select__search";
    search.placeholder = select.dataset.searchablePlaceholder || "Nyelv keres\u00E9se";
    search.autocomplete = "off";
    search.spellcheck = false;
  }

  const options = document.createElement("div");
  options.className = "language-select__options";
  options.setAttribute("role", "listbox");

  if (search) panel.append(search);
  panel.append(options);

  const parent = select.parentNode;
  parent.insertBefore(wrapper, select);
  wrapper.append(select, trigger, panel);

  select._searchable = { wrapper, trigger, triggerMain, triggerFlag, triggerLabel, triggerAi, panel, search, options, showSearch, aiValue };

  on(trigger, "click", event => {
    event.preventDefault();
    if (wrapper.classList.contains("is-open")) closeSearchableSelect(select);
    else openSearchableSelect(select);
  });

  if (search) {
    on(search, "input", () => renderSearchableOptions(select, search.value));
    on(search, "keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearchableSelect(select);
        trigger.focus();
      }
    });
  }

  on(select, "change", () => {
    syncSearchableSelect(select);
    renderSearchableOptions(select, search?.value || "");
  });
}

function renderSearchableOptions(select, query) {
  if (!select?._searchable) return;
  const { options, aiValue } = select._searchable;
  const searchTerm = normalizeSearch(query);
  const allowFavorites = select.hasAttribute("data-searchable-language");
  const matchingOptions = [...select.options].filter(option => !option.disabled && normalizeSearch(option.textContent).includes(searchTerm));
  const matches = allowFavorites ? sortLanguageOptions(matchingOptions, aiValue, select.value) : matchingOptions;

  options.innerHTML = "";

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "language-select__empty";
    empty.textContent = st("noResults");
    options.appendChild(empty);
    return;
  }

  matches.forEach(option => {
    const row = document.createElement("div");
    row.className = "language-select__option-row";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-select__option";
    button.setAttribute("role", "option");

    const optionMain = document.createElement("span");
    optionMain.className = "language-select__option-main";

    if (allowFavorites) {
      const optionFlag = document.createElement("span");
      optionFlag.className = "language-select__option-flag";
      optionFlag.setAttribute("aria-hidden", "true");
      populateLanguageFlag(optionFlag, option.value);
      optionMain.append(optionFlag);
    }

    const optionLabel = document.createElement("span");
    optionLabel.className = "language-select__option-label";
    optionLabel.textContent = option.textContent;
    optionMain.append(optionLabel);
    button.append(optionMain);

    const optionMeta = document.createElement("span");
    optionMeta.className = "language-select__option-meta";
    if (aiValue && option.value === aiValue) {
      const optionAi = document.createElement("span");
      optionAi.className = "language-select__option-ai";
      optionAi.textContent = "AI";
      optionMeta.append(optionAi);
    }
    if (optionMeta.childNodes.length) button.append(optionMeta);

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

    row.appendChild(button);

    if (allowFavorites) {
      const favoriteButton = document.createElement("button");
      favoriteButton.type = "button";
      favoriteButton.className = "language-select__favorite";
      const favoriteActive = isFavoriteLanguage(option.value);
      favoriteButton.classList.toggle("is-active", favoriteActive);
      favoriteButton.setAttribute("aria-pressed", String(favoriteActive));
      favoriteButton.setAttribute("aria-label", favoriteActive ? st("favoriteRemoveAria", { lang: option.textContent }) : st("favoriteAddAria", { lang: option.textContent }));

      const favoriteIcon = document.createElement("span");
      favoriteIcon.className = "language-select__favorite-icon";
      favoriteIcon.textContent = favoriteActive ? "★" : "☆";
      favoriteButton.append(favoriteIcon);

      on(favoriteButton, "click", event => {
        event.preventDefault();
        event.stopPropagation();
        toggleLanguageFavorite(option.value);
      });

      row.appendChild(favoriteButton);
    }

    options.appendChild(row);
  });
}

function syncSearchableSelect(select) {
  if (!select?._searchable) return;
  const selectedOption = select.options[select.selectedIndex];
  select._searchable.triggerLabel.textContent = selectedOption ? selectedOption.textContent : "";
  if (select._searchable.triggerFlag) {
    select._searchable.triggerFlag.hidden = !select.hasAttribute("data-searchable-language");
    populateLanguageFlag(select._searchable.triggerFlag, selectedOption?.value || "auto");
  }
  select._searchable.triggerAi.hidden = !select._searchable.aiValue || !selectedOption || selectedOption.value !== select._searchable.aiValue;
}

function openSearchableSelect(select) {
  if (!select?._searchable) return;
  closeAllSearchableSelects(select);
  const { wrapper, trigger, panel, search, showSearch } = select._searchable;
  renderSearchableOptions(select, "");
  if (search) search.value = "";
  wrapper.classList.add("is-open");
  panel.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
  if (showSearch && search) {
    requestAnimationFrame(() => {
      search.focus({ preventScroll: true });
      search.select();
    });
  }
}

function closeSearchableSelect(select) {
  if (!select?._searchable) return;
  const { wrapper, trigger, panel, search } = select._searchable;
  wrapper.classList.remove("is-open");
  panel.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  if (search) search.value = "";
}

function closeAllSearchableSelects(except = null) {
  searchableSelects().forEach(select => {
    if (select !== except) closeSearchableSelect(select);
  });
}

function normalizeSearch(value) {
  return String(value || "")
    .toLocaleLowerCase("hu-HU")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function setMode(mode) { state.mode = mode; panel(el.modeText, el.textPanel, mode === "text"); panel(el.modeImage, el.imagePanel, mode === "image"); panel(el.modeDocument, el.documentPanel, mode === "document"); if (mode !== "text") { clearPendingTextTranslationStats(); cancelMicCapture(true); } refreshMicUi(); }
function previewText(value, max = 92) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMemoryTimestamp(value) {
  const date = value instanceof Date ? value : new Date(value);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  return new Intl.DateTimeFormat(uiLocale(), sameDay
    ? { hour: "2-digit", minute: "2-digit" }
    : { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
  ).format(date);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function safeDate(value) {
  const date = value ? new Date(value) : null;
  return date && Number.isFinite(date.getTime()) ? date : null;
}

function formatUsageDate(value) {
  const date = safeDate(value);
  if (!date) return "-";
  return new Intl.DateTimeFormat(uiLocale(), { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function formatUsageTime(value) {
  const date = safeDate(value);
  if (!date) return "-";
  return new Intl.DateTimeFormat(uiLocale(), { hour: "2-digit", minute: "2-digit" }).format(date);
}

function formatUsageAge(value) {
  const date = safeDate(value);
  if (!date) return st("noDataYet");
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date();
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.max(0, Math.round((end - start) / 86400000));
  if (diffDays === 0) return st("startedToday");
  if (diffDays === 1) return st("usingForOneDay");
  return st("usingForDays", { count: diffDays });
}

function formatStatNumber(value) {
  return new Intl.NumberFormat(uiLocale()).format(normalizeStatCount(value));
}

function countUsageWords(value) {
  const text = String(value || "").trim();
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function clearPendingTextTranslationStats() {
  if (state.statsAutoTimer) {
    clearTimeout(state.statsAutoTimer);
    state.statsAutoTimer = 0;
  }
  state.pendingTextStatsSignature = "";
}

function buildTextStatsSignature(text, sourceLang, targetLang) {
  return [String(sourceLang || "auto"), String(targetLang || ""), normalize(text)].join("|");
}

function touchUsageStats(stats, date = new Date()) {
  const stamp = date.toISOString();
  if (!stats.firstUsedAt) stats.firstUsedAt = stamp;
  updateUsageStreak(stats, date);
  stats.lastUsedAt = stamp;
}

function updateUsageStats(mutator) {
  const next = normalizeUsageStats({
    ...state.stats,
    targetLanguageUsage: { ...state.stats.targetLanguageUsage }
  });
  mutator(next);
  touchUsageStats(next);
  state.stats = normalizeUsageStats(next);
  saveUsageStats();
  renderUsageStats();
  renderStreakUi();
}

function recordDailyVisit() {
  updateUsageStats(() => {});
}

function addTranslationStats(stats, sourceText, targetLang) {
  const text = String(sourceText || "").trim();
  if (!text) return;
  stats.translationCount += 1;
  stats.translatedCharacters += text.length;
  stats.translatedWords += countUsageWords(text);
  if (targetLang && targetLang !== "auto") {
    stats.targetLanguageUsage[targetLang] = normalizeStatCount(stats.targetLanguageUsage[targetLang]) + 1;
  }
}

function recordTextTranslationUsage(sourceText, targetLang) {
  updateUsageStats(stats => addTranslationStats(stats, sourceText, targetLang));
}

function scheduleTextTranslationUsage(sourceText, sourceLang, targetLang) {
  clearPendingTextTranslationStats();
  const signature = buildTextStatsSignature(sourceText, sourceLang, targetLang);
  if (!signature.trim()) return;
  state.pendingTextStatsSignature = signature;
  state.statsAutoTimer = window.setTimeout(() => {
    const currentText = normalize(el.sourceText?.value || "");
    const currentSignature = buildTextStatsSignature(currentText, el.source?.value || "auto", el.target?.value || "");
    if (state.pendingTextStatsSignature !== signature || currentSignature !== signature) return;
    if (state.mode !== "text" || state.textSubmode !== "translate") return;
    recordTextTranslationUsage(currentText, el.target?.value || targetLang);
    clearPendingTextTranslationStats();
  }, AUTO_TRANSLATION_STATS_DELAY_MS);
}

function recordMicUsage() {
  if (state.mic.usageTracked) return;
  state.mic.usageTracked = true;
  updateUsageStats(stats => {
    stats.microphoneUses += 1;
  });
}

function recordImageTranslationUsage(sourceText, targetLang) {
  updateUsageStats(stats => {
    stats.imageTranslationUses += 1;
    addTranslationStats(stats, sourceText, targetLang);
  });
}

function recordDocumentTranslationUsage(sourceText, targetLang) {
  updateUsageStats(stats => addTranslationStats(stats, sourceText, targetLang));
}

function recordCorrectionUsage() {
  updateUsageStats(stats => {
    stats.correctionUses += 1;
  });
}

function mostUsedTargetLanguage(stats) {
  const entries = Object.entries(stats?.targetLanguageUsage || {});
  if (!entries.length) return "";
  entries.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return label(a[0]).localeCompare(label(b[0]), uiLocale());
  });
  return entries[0]?.[0] || "";
}

function renderUsageStats() {
  if (!el.usageStatsEmpty || !el.usageStatsContent) return;
  const snapshot = getSessionSnapshot();
  const hasData = hasUsageStatsData(snapshot);
  el.usageStatsEmpty.hidden = hasData;
  el.usageStatsContent.hidden = !hasData;
  if (el.resetUsageStats) el.resetUsageStats.disabled = !hasData;
  if (!hasData) return;

  const favoriteLanguage = mostUsedTargetLanguage(snapshot);
  if (el.statsUsageAge) el.statsUsageAge.textContent = formatUsageAge(snapshot.firstUsedAt);
  if (el.statsFirstUse) el.statsFirstUse.textContent = `${st("firstUsePrefix")}: ${formatUsageDate(snapshot.firstUsedAt)}`;
  if (el.statsTranslationCount) el.statsTranslationCount.textContent = formatStatNumber(snapshot.translationCount);
  if (el.statsCharacterCount) el.statsCharacterCount.textContent = formatStatNumber(snapshot.translatedCharacters);
  if (el.statsWordCount) el.statsWordCount.textContent = formatStatNumber(snapshot.translatedWords);
  if (el.statsSessionToday) el.statsSessionToday.textContent = formatSessionDuration(snapshot.todaySessionMs);
  if (el.statsSessionTotal) el.statsSessionTotal.textContent = `${st("totalPrefix")}: ${formatSessionDuration(snapshot.totalSessionMs)}`;
  if (el.statsFavoriteLanguage) el.statsFavoriteLanguage.textContent = favoriteLanguage ? label(favoriteLanguage) : st("noFavoriteLanguage");
  if (el.statsMicCount) el.statsMicCount.textContent = formatStatNumber(snapshot.microphoneUses);
  if (el.statsImageCount) el.statsImageCount.textContent = formatStatNumber(snapshot.imageTranslationUses);
  if (el.statsCorrectionCount) el.statsCorrectionCount.textContent = formatStatNumber(snapshot.correctionUses);
}

function resetUsageStats() {
  if (!hasUsageStatsData()) {
    closeResetUsageStatsDialog(false);
    return;
  }
  clearPendingTextTranslationStats();
  stopSessionTicker();
  state.stats = createUsageStats();
  state.sessionStartedAt = document.visibilityState === "hidden" ? 0 : Date.now();
  if (state.sessionStartedAt) startSessionTicker();
  saveUsageStats();
  renderUsageStats();
  renderStreakUi();
  closeStreakPanel(false);
  closeResetUsageStatsDialog();
  setStatus(st("resetStatsStatus"), "success");
}

function translationSignature(item) {
  return JSON.stringify([
    String(item?.sourceText || "").trim(),
    item?.sourceLang || "",
    item?.targetLang || "",
    String(item?.translatedText || "").trim()
  ]);
}

function buildTranslationEntry(service = "") {
  const sourceText = String(el.sourceText?.value || "").trim();
  const translatedText = renderedText();
  if (!sourceText || !translatedText) return null;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    sourceText,
    translatedText,
    sourceLang: el.source.value,
    targetLang: el.target.value,
    detectedLang: state.lastDetected || (el.source.value === "auto" ? detect(sourceText) : el.source.value),
    service,
    timestamp: new Date().toISOString()
  };
}

function saveHistoryState() {
  saveMemoryList(HISTORY_STORAGE_KEY, state.history);
}

function saveFavoritesState() {
  saveMemoryList(FAVORITES_STORAGE_KEY, state.favorites);
}

function findFavoriteBySignature(item) {
  const signature = translationSignature(item);
  return state.favorites.find(entry => translationSignature(entry) === signature) || null;
}

function getCurrentFavorite() {
  const current = buildTranslationEntry();
  return current ? findFavoriteBySignature(current) : null;
}

function syncFavoriteButton() {
  if (!el.favoriteTranslation || !el.favoriteTranslationIcon || !el.favoriteTranslationLabel) return;
  const current = buildTranslationEntry();
  const isActive = !!(current && findFavoriteBySignature(current));
  el.favoriteTranslation.classList.toggle("is-active", isActive);
  el.favoriteTranslation.setAttribute("aria-pressed", String(isActive));
  el.favoriteTranslation.setAttribute("aria-label", st("favoriteSavedAria"));
  el.favoriteTranslationIcon.innerHTML = isActive ? "&#9733;" : "&#9734;";
  el.favoriteTranslationLabel.textContent = isActive ? st("saved") : st("save");
  el.favoriteTranslation.disabled = !current;
}

function renderMemoryEmpty(kind) {
  const title = kind === "favorites" ? st("memoryEmptyFavoritesTitle") : st("memoryEmptyHistoryTitle");
  const body = kind === "favorites"
    ? st("memoryEmptyFavoritesBody")
    : st("memoryEmptyHistoryBody");
  return `
    <div class="memory-empty">
      <div class="memory-empty__icon" aria-hidden="true">${kind === "favorites" ? "★" : "↺"}</div>
      <p class="memory-empty__title">${title}</p>
      <p class="memory-empty__body">${body}</p>
    </div>
  `;
}

function renderMemoryItem(item, listName) {
  const favoriteActive = !!findFavoriteBySignature(item);
  const langFrom = label(item.detectedLang || item.sourceLang || "auto");
  const langTo = label(item.targetLang || "hu");
  return `
    <article class="memory-item" data-id="${escapeHtml(item.id)}" data-list="${escapeHtml(listName)}">
      <button class="memory-item__main" type="button" data-action="load" data-id="${escapeHtml(item.id)}" data-list="${escapeHtml(listName)}">
        <div class="memory-item__top">
          <span class="memory-item__langs">${escapeHtml(langFrom)} → ${escapeHtml(langTo)}</span>
          <time class="memory-item__time" datetime="${escapeHtml(item.timestamp)}">${escapeHtml(formatMemoryTimestamp(item.timestamp))}</time>
        </div>
        <p class="memory-item__source">${escapeHtml(previewText(item.sourceText, 80))}</p>
        <p class="memory-item__translated">${escapeHtml(previewText(item.translatedText, 96))}</p>
      </button>

      <div class="memory-item__actions">
        <button class="memory-chip memory-chip--star${favoriteActive ? " is-active" : ""}" type="button" data-action="favorite" data-id="${escapeHtml(item.id)}" data-list="${escapeHtml(listName)}" aria-pressed="${favoriteActive}" aria-label="${escapeHtml(st("favoriteSavedAria"))}">
          ${favoriteActive ? "★" : "☆"}
        </button>
        <button class="memory-chip" type="button" data-action="delete" data-id="${escapeHtml(item.id)}" data-list="${escapeHtml(listName)}">
          ${escapeHtml(uiLanguage() === "en" ? "Delete" : "Törlés")}
        </button>
      </div>
    </article>
  `;
}

function renderHistoryList() {
  if (!el.historyList) return;
  el.historyList.innerHTML = state.history.length
    ? state.history.map(item => renderMemoryItem(item, "history")).join("")
    : renderMemoryEmpty("history");
}

function renderFavoritesList() {
  if (!el.favoritesList) return;
  el.favoritesList.innerHTML = state.favorites.length
    ? state.favorites.map(item => renderMemoryItem(item, "favorites")).join("")
    : renderMemoryEmpty("favorites");
}

function renderMemoryPanels() {
  renderHistoryList();
  renderFavoritesList();
  if (el.clearHistory) el.clearHistory.disabled = !state.history.length;
  if (el.clearFavorites) el.clearFavorites.disabled = !state.favorites.length;
  syncFavoriteButton();
}

function upsertHistoryEntry(item) {
  if (!item) return;
  const signature = translationSignature(item);
  const existing = state.history.find(entry => translationSignature(entry) === signature);
  const nextEntry = existing ? { ...existing, ...item, id: existing.id, timestamp: item.timestamp } : item;
  state.history = [nextEntry, ...state.history.filter(entry => entry.id !== nextEntry.id && translationSignature(entry) !== signature)].slice(0, MAX_HISTORY_ITEMS);
  saveHistoryState();
  renderMemoryPanels();
}

function queueHistorySave(item, immediate = false) {
  clearTimeout(state.historySaveTimer);
  if (!item) return;
  if (immediate) {
    upsertHistoryEntry(item);
    return;
  }
  state.historySaveTimer = window.setTimeout(() => upsertHistoryEntry(item), HISTORY_SAVE_DELAY_MS);
}

function toggleFavoriteEntry(item) {
  if (!item) return;
  const existing = findFavoriteBySignature(item);
  if (existing) {
    state.favorites = state.favorites.filter(entry => entry.id !== existing.id);
    saveFavoritesState();
    renderMemoryPanels();
    setStatus(st("favoriteRemoved"), "success");
    return;
  }
  const favoriteEntry = { ...item, id: existing?.id || `fav-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
  state.favorites = [favoriteEntry, ...state.favorites.filter(entry => translationSignature(entry) !== translationSignature(item))].slice(0, MAX_FAVORITES_ITEMS);
  saveFavoritesState();
  renderMemoryPanels();
  setStatus(st("favoriteAdded"), "success");
}

function toggleCurrentFavorite() {
  const item = buildTranslationEntry();
  if (!item) {
    setStatus(st("nothingToSave"), "error");
    return;
  }
  toggleFavoriteEntry(item);
}

function loadSavedTranslation(entry) {
  if (!entry) return;
  setMode("text");
  setTextSubmode("translate");
  clearTimeout(state.historySaveTimer);
  cancelMicCapture(true);
  el.source.value = entry.sourceLang || "auto";
  el.target.value = entry.targetLang || "hu";
  syncSearchableSelect(el.source);
  syncSearchableSelect(el.target);
  el.sourceText.value = entry.sourceText || "";
  state.lastDetected = entry.detectedLang || entry.sourceLang || "";
  el.translatedText.textContent = entry.translatedText || translatedPlaceholder();
  el.translatedText.classList.remove("is-loading");
  updateCounter();
  updateHint();
  el.translationMeta.textContent = `${label(entry.detectedLang || entry.sourceLang || "auto")} -> ${label(entry.targetLang || "hu")} / ${st("previousSave")}`;
  el.connectionState.textContent = st("loadedAt", { time: time(entry.timestamp) });
  setStatus(st("translationLoaded"), "success");
  refreshMicUi();
  syncFavoriteButton();
}

function deleteHistoryEntry(id) {
  state.history = state.history.filter(item => item.id !== id);
  saveHistoryState();
  renderMemoryPanels();
}

function deleteFavoriteEntry(id) {
  state.favorites = state.favorites.filter(item => item.id !== id);
  saveFavoritesState();
  renderMemoryPanels();
}

function clearHistoryList() {
  if (!state.history.length) return setStatus(st("noHistoryToClear"), "error");
  state.history = [];
  saveHistoryState();
  renderMemoryPanels();
  setStatus(st("historyCleared"), "success");
}

function clearFavoritesList() {
  if (!state.favorites.length) return setStatus(st("noSavedToClear"), "error");
  state.favorites = [];
  saveFavoritesState();
  renderMemoryPanels();
  setStatus(st("savedCleared"), "success");
}

function resolveMemoryEntry(listName, id) {
  const list = listName === "favorites" ? state.favorites : state.history;
  return list.find(item => item.id === id) || null;
}

function handleMemoryListClick(event) {
  const target = event.target instanceof Element ? event.target.closest("[data-action]") : null;
  if (!target) return;
  const id = target.getAttribute("data-id");
  const action = target.getAttribute("data-action");
  const listName = target.getAttribute("data-list") || "history";
  if (!id || !action) return;
  const entry = resolveMemoryEntry(listName, id);
  if (action === "load") return loadSavedTranslation(entry);
  if (action === "favorite") return toggleFavoriteEntry(entry);
  if (action === "delete") {
    if (listName === "favorites") deleteFavoriteEntry(id);
    else deleteHistoryEntry(id);
  }
}

function panel(button, pane, active) { button.classList.toggle("is-active", active); button.setAttribute("aria-selected", String(active)); pane.hidden = !active; }
function setTextSubmode(mode) {
  state.textSubmode = mode === "correct" ? "correct" : "translate";
  if (el.textSubmode) el.textSubmode.value = state.textSubmode;
  if (el.textTranslateView) el.textTranslateView.hidden = state.textSubmode !== "translate";
  if (el.textCorrectionView) el.textCorrectionView.hidden = state.textSubmode !== "correct";
  if (state.textSubmode === "correct") {
    clearPendingTextTranslationStats();
    cancelMicCapture(true);
    updateCorrectionCounter();
    scheduleCorrection(true);
    setStatus(st("correctionModeStatus"), "");
    refreshMicUi();
    syncFavoriteButton();
    return;
  }
  refreshMicUi();
  syncFavoriteButton();
  setStatus(st("readyToTranslate"), "");
}
function updateCounter() { const raw = el.sourceText.value; const trimmed = raw.trim(); el.sourceCounter.textContent = st("charsWords", { chars: raw.length, words: trimmed ? trimmed.split(/\s+/).length : 0 }); }
function updateHint() { if (el.source.value !== "auto") { el.detectedLanguage.textContent = `${st("sourcePrefix")}: ${label(el.source.value)}`; return; } const detected = detect(el.sourceText.value); el.detectedLanguage.textContent = detected ? `${st("detectedPrefix")}: ${label(detected)}` : st("autoDetectActive"); }
function resetText() { el.translatedText.textContent = translatedPlaceholder(); el.translationMeta.textContent = state.settings.liveTranslate ? st("chooseLanguageToStart") : st("liveTranslateOff"); el.connectionState.textContent = st("publicServices"); el.translatedText.classList.remove("is-loading", "is-fresh"); syncFavoriteButton(); setStatus(st("readyToTranslate"), ""); }
function renderedText() { const text = el.translatedText.textContent.trim(); return isTranslationPlaceholderText(text) ? "" : text; }
function renderedCorrectionText() { const text = String(el.correctedText?.textContent || "").trim(); return isCorrectionPlaceholderText(text) ? "" : text; }
function renderedDocumentText() { const text = String(el.docTranslatedText?.textContent || "").trim(); return isDocumentPlaceholderText(text) ? "" : text; }
function resetCorrectionEditor() {
  if (!el.correctionInput || !el.correctionCounter) return;
  el.correctionInput.value = "";
  [el.optionAccents, el.optionSpelling, el.optionPunctuation, el.optionStyle].forEach(node => {
    if (node) node.checked = false;
  });
  updateCorrectionCounter();
  resetCorrection();
}
function resetCorrection() { if (!el.correctedText) return; el.correctedText.textContent = correctionPlaceholder(); el.correctedText.classList.remove("is-loading", "is-fresh"); if (el.correctionMeta) el.correctionMeta.textContent = st("correctionMetaDefault"); }
function updateCorrectionCounter() { if (!el.correctionCounter || !el.correctionInput) return; const raw = el.correctionInput.value; const trimmed = raw.trim(); el.correctionCounter.textContent = st("charsWords", { chars: raw.length, words: trimmed ? trimmed.split(/\s+/).length : 0 }); }
function getCorrectionOptions() {
  return {
    accents: !!el.optionAccents?.checked,
    spelling: !!el.optionSpelling?.checked,
    punctuation: !!el.optionPunctuation?.checked,
    style: !!el.optionStyle?.checked
  };
}
function hasActiveCorrectionOption(options) {
  return !!(options.accents || options.spelling || options.punctuation || options.style);
}
function updateCorrection() {
  if (!el.correctedText) return;
  const raw = el.correctionInput?.value || "";
  const text = raw.trim();
  if (!text) return resetCorrection();
  const lang = el.correctionSource?.value === "auto" ? (detect(raw) || "hu") : (el.correctionSource?.value || "hu");
  const corrected = buildFallbackCorrectionText(raw, lang, getCorrectionOptions());
  renderCorrectionResult(corrected || correctionPlaceholder(), `${label(lang)} / ${uiLanguage() === "en" ? "Basic correction" : "Alap javítás"}`);
}
function scheduleCorrection(immediate = false) {
  clearTimeout(state.correctionTimer);
  const raw = el.correctionInput?.value || "";
  if (!raw.trim()) { state.correctionReq += 1; return resetCorrection(); }
  const delay = immediate ? 0 : 320;
  state.correctionTimer = window.setTimeout(() => void runCorrection(false), delay);
}
function setCorrectionLoading(loading, message = "Nyelvi jav\u00EDt\u00E1s folyamatban...") { if (!el.correctedText) return; el.correctedText.classList.toggle("is-loading", loading); if (loading && el.correctionMeta) el.correctionMeta.textContent = message; }
function renderCorrectionResult(text, meta) { if (!el.correctedText) return; el.correctedText.textContent = text; el.correctedText.classList.remove("is-loading", "is-fresh"); void el.correctedText.offsetWidth; el.correctedText.classList.add("is-fresh"); if (el.correctionMeta) el.correctionMeta.textContent = meta; }
async function runCorrection(forceAi = false) {
  const raw = el.correctionInput?.value || "";
  const text = raw.trim();
  if (!text) return resetCorrection();
  const options = getCorrectionOptions();
  if (!hasActiveCorrectionOption(options)) {
renderCorrectionResult(correctionPlaceholder(), uiLanguage() === "en" ? "Choose at least one correction option." : "Válassz legalább egy javítási opciót.");
    if (forceAi) setStatus("Nincs kiv\u00E1lasztva jav\u00EDt\u00E1si opci\u00F3", "error");
    return;
  }
  const req = ++state.correctionReq;
  const lang = detectCorrectionLanguage(raw, el.correctionSource?.value || "auto");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const apiReady = canUseCorrectionApi();
  const shouldUseAi = forceAi && apiReady && text.length <= 6000 && wordCount >= 3;
  if (text.length > 6000) {
    renderCorrectionResult(buildFallbackCorrectionText(raw, lang, options), `${label(lang)} / T\u00FAl hossz\u00FA sz\u00F6veg, alap jav\u00EDt\u00E1s`);
    if (forceAi) recordCorrectionUsage();
    setStatus("A sz\u00F6veg t\u00FAl hossz\u00FA, bontsd kisebb r\u00E9szekre", "error");
    return;
  }
  try {
    if (forceAi && !apiReady) {
      renderCorrectionResult(buildFallbackCorrectionText(raw, lang, options), `${label(lang)} / Helyi jav\u00EDt\u00E1s`);
      recordCorrectionUsage();
      setStatus("A teljes AI jav\u00EDt\u00E1s csak a k\u00F6zz\u00E9tett oldalon m\u0171k\u00F6dik, itt a helyi jav\u00EDt\u00E1s fut.", "error");
      return;
    }

    if (!shouldUseAi) {
      renderCorrectionResult(
        buildFallbackCorrectionText(raw, lang, options),
        forceAi
          ? `${label(lang)} / ${uiLanguage() === "en" ? "Local correction" : "Helyi jav\u00EDt\u00E1s"}`
          : `${label(lang)} / Gyors el\u0151n\u00E9zet - kattints a Jav\u00EDt\u00E1s gombra az AI-hoz`
      );
      if (forceAi) recordCorrectionUsage();
      return;
    }

    setCorrectionLoading(true, "AI jav\u00EDt\u00E1s folyamatban...");
    const result = await callCorrectionApi(raw, lang, options);
    if (req !== state.correctionReq) return;
    renderCorrectionResult(result.correctedText, `${label(result.detectedLanguage || lang)} / AI jav\u00EDt\u00E1s`);
    if (forceAi) recordCorrectionUsage();
    setStatus("AI sz\u00F6vegjav\u00EDt\u00E1s k\u00E9sz", "success");
  } catch (error) {
    if (req !== state.correctionReq) return;
    const corrected = buildFallbackCorrectionText(raw, lang, options);
renderCorrectionResult(corrected || correctionPlaceholder(), `${label(lang)} / ${uiLanguage() === "en" ? "Basic correction" : "Alap javítás"}`);
    if (forceAi) recordCorrectionUsage();
    setStatus(normalizeCorrectionError(error), "error");
  } finally {
    if (req === state.correctionReq) setCorrectionLoading(false);
  }
}

function canUseCorrectionApi() {
  return typeof window !== "undefined" && /^(https?:)$/i.test(window.location.protocol);
}

function normalizeCorrectionError(error) {
  const message = String(error?.message || "").trim();
  if (!message) return "Az AI jav\u00EDt\u00E1s nem siker\u00FClt";
  if (/failed to fetch/i.test(message)) return "Nem siker\u00FClt el\u00E9rni az AI jav\u00EDt\u00E1st. A helyi jav\u00EDt\u00E1s l\u00E1tszik.";
  if (/quota|billing|plan/i.test(message)) return "Az OpenAI keret vagy fizet\u00E9s most nem el\u00E9rhet\u0151. A helyi jav\u00EDt\u00E1s l\u00E1tszik.";
  return message;
}
function clearText() { state.req += 1; clearTimeout(state.historySaveTimer); clearPendingTextTranslationStats(); cancelMicCapture(true); state.mic.baseText = ""; state.lastDetected = ""; el.sourceText.value = ""; updateCounter(); updateHint(); resetText(); refreshMicUi(); }
function clearCorrectionText() { if (!el.correctionInput) return; el.correctionInput.value = ""; updateCorrectionCounter(); resetCorrection(); setStatus(st("correctionCleared"), "success"); }
function swapText() { const s = el.source.value; const t = el.target.value; const src = el.sourceText.value; const out = renderedText(); el.source.value = s === "auto" ? t : t; el.target.value = s === "auto" ? (state.lastDetected || "en") : s; syncSearchableSelect(el.source); syncSearchableSelect(el.target); if (out) { el.sourceText.value = out; el.translatedText.textContent = src || translatedPlaceholder(); } updateCounter(); updateHint(); syncFavoriteButton(); scheduleTranslate(); }
function swapSelects(source, target, allowAuto) { const a = source.value; const b = target.value; source.value = allowAuto && b === "auto" ? "hu" : b; target.value = a === "auto" ? "en" : a; syncSearchableSelect(source); syncSearchableSelect(target); }
function scheduleTranslate() { if (!state.settings.liveTranslate) return; clearTimeout(state.timer); state.timer = window.setTimeout(() => void runTranslate(false), 350); }
async function runTranslate(force) {
  const text = el.sourceText.value.trim();
  if (!text) {
    clearTimeout(state.historySaveTimer);
    clearPendingTextTranslationStats();
    state.lastDetected = "";
    return resetText();
  }
  if (!force && !state.settings.liveTranslate) return;
  const req = ++state.req;
  setLoading(true);
  setStatus("Fordítás folyamatban", "busy");
  try {
    const result = await translateLarge(text, el.source.value, el.target.value);
    if (req !== state.req) return;
    state.lastDetected = el.source.value === "auto" ? (result.detectedLanguage || "") : el.source.value;
el.translatedText.textContent = result.translatedText || translatedPlaceholder();
    el.translatedText.classList.remove("is-loading", "is-fresh");
    void el.translatedText.offsetWidth;
    el.translatedText.classList.add("is-fresh");
    el.translationMeta.textContent = `${label(result.detectedLanguage || el.source.value)} -> ${label(el.target.value)} / ${result.service}`;
  el.connectionState.textContent = st("statusUpdated", { time: time(new Date()) });
    updateHint();
    queueHistorySave(buildTranslationEntry(result.service), !!force);
    if (force) {
      clearPendingTextTranslationStats();
      recordTextTranslationUsage(text, el.target.value);
    } else {
      scheduleTextTranslationUsage(text, el.source.value, el.target.value);
    }
    syncFavoriteButton();
    setStatus("Fordítás kész", "success");
  } catch {
    if (req !== state.req) return;
    if (el.source.value === "auto") state.lastDetected = "";
    clearPendingTextTranslationStats();
    el.translatedText.textContent = "A fordítás most nem érhető el. Próbáld meg később újra.";
    el.translationMeta.textContent = "Nem sikerült elérni a fordító szolgáltatást.";
    el.connectionState.textContent = "Kapcsolódási hiba";
    syncFavoriteButton();
    setStatus("Fordítási hiba", "error");
  } finally {
    if (req === state.req) setLoading(false);
  }
}
function setLoading(loading) { el.translate.disabled = loading; el.translate.textContent = loading ? "Ford\u00EDt\u00E1s..." : "Ford\u00EDt\u00E1s"; el.translatedText.classList.toggle("is-loading", loading); }
async function pasteText() { try { const text = await navigator.clipboard.readText(); if (!text) return setStatus("A v\u00E1g\u00F3lap most \u00FCres", "error"); el.sourceText.value = text; updateCounter(); updateHint(); scheduleTranslate(); setStatus("Sz\u00F6veg beillesztve", "success"); } catch { setStatus("A beilleszt\u00E9s nem siker\u00FClt", "error"); } }
async function copyText(text) { const value = String(text || "").trim(); if (!value) return setStatus(st("nothingToCopy"), "error"); try { await navigator.clipboard.writeText(value); setStatus(st("copySuccess"), "success"); } catch { const t = document.createElement("textarea"); t.value = value; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); setStatus(st("copySuccess"), "success"); } catch { setStatus(st("copyFailed"), "error"); } finally { t.remove(); } } }
function speakText() { const text = renderedText(); if (!text) return setStatus("M\u00E9g nincs leford\u00EDtott sz\u00F6veg", "error"); if (!("speechSynthesis" in window)) return setStatus("A felolvas\u00E1s itt nem t\u00E1mogatott", "error"); const u = new SpeechSynthesisUtterance(text); u.lang = { hu: "hu-HU", en: "en-US", de: "de-DE", fr: "fr-FR", es: "es-ES", it: "it-IT" }[el.target.value] || navigator.language || "hu-HU"; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); setStatus("Felolvas\u00E1s elind\u00EDtva", "success"); }

function buildFallbackCorrectionText(value, lang, options) {
  let output = String(value || "").replace(/\r/g, "").replace(/\t/g, " ").replace(/[ ]{2,}/g, " ").trim();
  if (!output) return "";

  // Gyors helyi előnézet, ha az AI végpont még nem futott le vagy nem érhető el.
  if (lang === "hu" && (options.accents || options.spelling || options.style)) {
    output = applyHungarianWordFixes(output);
  }

  if (options.punctuation || options.spelling || options.style) {
    output = looksLikeVerse(output) ? correctVerse(output, lang) : correctProse(output, lang);
  }

  if (lang === "hu" && (options.accents || options.spelling || options.style || options.punctuation)) {
    output = normalizeMergedCorrection(output, lang);
  }

  return output;
}

async function callCorrectionApi(text, language, options) {
  // A valódi AI javítás a Vercel API végponton keresztül megy.
  const response = await fetch("/api/correct-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      source_language: language,
      options
    })
  });

  let data = null;
  try { data = await response.json(); } catch {}

  if (!response.ok) {
    const message = data?.error || "Az AI jav\u00EDt\u00E1s nem \u00E9rhet\u0151 el.";
    throw new Error(message);
  }

  const correctedText = String(data?.corrected_text || "").trim();
  if (!correctedText) throw new Error("Az AI nem adott vissza jav\u00EDtott sz\u00F6veget.");

  return {
    correctedText,
    detectedLanguage: String(data?.detected_language || language || "hu")
  };
}

function autoCorrectText(value, sourceLang) {
  const normalized = String(value || "").replace(/\r/g, "").replace(/\t/g, " ").replace(/[ ]{2,}/g, " ").trim();
  if (!normalized) return "";
  const lang = sourceLang && sourceLang !== "auto" ? sourceLang : (detect(normalized) || "hu");
  return looksLikeVerse(normalized) ? correctVerse(normalized, lang) : correctProse(normalized, lang);
}

function looksLikeVerse(text) {
  const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
  if (lines.length < 2) return false;
  if (text.includes("\n\n")) return false;
  const averageLength = lines.reduce((total, line) => total + line.length, 0) / lines.length;
  return averageLength <= 80;
}

function correctVerse(text, lang) {
  const lines = text.split("\n").map(line => line.trim());
  const filledIndexes = lines.map((line, index) => ({ line, index })).filter(item => item.line);
  const lastIndex = filledIndexes.length ? filledIndexes[filledIndexes.length - 1].index : -1;

  return lines.map((line, index) => {
    if (!line) return "";
    let fixed = cleanPunctuation(line, lang);
    fixed = capitalizeFirstLetter(fixed, lang);
    if (!/[.!?,;:…]$/u.test(fixed)) fixed += index === lastIndex ? "." : ",";
    return fixed;
  }).join("\n");
}

function correctProse(text, lang) {
  return text
    .split(/\n{2,}/)
    .map(block => block.split("\n").map(line => line.trim()).filter(Boolean).join(" "))
    .filter(Boolean)
    .map(block => {
      let fixed = cleanPunctuation(block, lang);
      fixed = capitalizeSentenceStarts(fixed, lang);
      if (!/[.!?…]$/u.test(fixed)) fixed += ".";
      return fixed;
    })
    .join("\n\n");
}

function cleanPunctuation(text, lang) {
  let fixed = String(text || "");
  if (lang === "hu") fixed = applyHungarianWordFixes(fixed);
  fixed = fixed.replace(/\s+([,.;!?])/g, "$1");
  fixed = fixed.replace(/([,.;!?])(?![\s)\]}»”"'])/g, "$1 ");
  fixed = fixed.replace(/([(\[{«“„])\s+/g, "$1");
  fixed = fixed.replace(/\s{2,}/g, " ").trim();
  if (lang === "hu") fixed = improveHungarianPunctuation(fixed);
  return insertCommaHints(fixed, lang);
}

function insertCommaHints(text, lang) {
  const words = COMMA_HINTS[lang] || [];
  if (!words.length) return text;
  const pattern = new RegExp(`\\s+(${words.map(escapeRegExp).join("|")})\\b`, "giu");
  return text.replace(pattern, (match, word, offset, full) => {
    let cursor = offset - 1;
    while (cursor >= 0 && /\s/u.test(full[cursor])) cursor -= 1;
    const previous = cursor >= 0 ? full[cursor] : "";
    if (!previous || /[,;:.!?\-–—(]/u.test(previous)) return ` ${word}`;
    return `, ${word}`;
  });
}

function improveHungarianPunctuation(text) {
  let fixed = String(text || "").trim();
  if (/^szia[.!?,\s]*$/iu.test(fixed)) return "szia";
  fixed = fixed.replace(/^szia\b[,\s]*/iu, "Szia, ");
  fixed = fixed.replace(/\baz en\b/giu, "az én");
  fixed = fixed.replace(/\begy kutyam\b/giu, "egy kutyám");
  fixed = fixed.replace(/\baz a neve hogy\b/giu, "az a neve, hogy");
  fixed = fixed.replace(/\b(nevem|neve)\s+([a-záéíóöőúüű]+)/giu, (match, lead, name) => `${lead} ${capitalizeHungarianName(name)}`);
  fixed = fixed.replace(/\baz a neve,\s+hogy\s+([a-záéíóöőúüű]+)/giu, (match, name) => `az a neve, hogy ${capitalizeHungarianName(name)}`);
  fixed = fixed.replace(/\b(szeretem|szeretn\u00E9m|szeretn\u00E9k)\s+ha\b/giu, (match, lead) => `${lead}, ha`);
  fixed = fixed.replace(/\b(neve|gondolom|tudom|hiszem|mondom)\s+hogy\b/giu, "$1, hogy");
  fixed = fixed.replace(/\b(kuty\u00E1m|kutyam)\s+az a neve\b/giu, "$1, az a neve");

  const sentenceWords = fixed.split(/\s+/).filter(Boolean).length;
  if (sentenceWords >= 8) {
    fixed = fixed.replace(/\s+és\s+/giu, ", és ");
    fixed = fixed.replace(/,?\s+ha\s+/giu, ", ha ");
    fixed = fixed.replace(/,?\s+hogy\s+/giu, ", hogy ");
  }

  fixed = fixed.replace(/,\s*,+/g, ", ");
  fixed = fixed.replace(/\s+,/g, ",");
  fixed = fixed.replace(/,{2,}/g, ",");
  fixed = fixed.replace(/,\s+és\b/giu, ", és");
  fixed = fixed.replace(/,\s+hogy\b/giu, ", hogy");
  fixed = fixed.replace(/,\s+ha\b/giu, ", ha");
  return fixed;
}

function capitalizeHungarianName(name) {
  const fixed = preserveCase(name, applyHungarianWordFixes(name));
  return fixed.replace(/^\p{L}/u, char => char.toLocaleUpperCase("hu-HU"));
}

function capitalizeFirstLetter(text, lang) {
  return String(text || "").replace(/^\p{L}/u, char => char.toLocaleUpperCase(localeFor(lang)));
}

function capitalizeSentenceStarts(text, lang) {
  return String(text || "").replace(/(^|[.!?]\s+)(\p{L})/gu, (match, prefix, char) => prefix + char.toLocaleUpperCase(localeFor(lang)));
}

function localeFor(lang) {
  return LANGUAGE_LOCALES[lang] || "hu-HU";
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detectCorrectionLanguage(text, selectedLang) {
  if (selectedLang && selectedLang !== "auto") return selectedLang;
  const direct = detect(text);
  if (direct) return direct;
  if (looksHungarian(text)) return "hu";
  return "en";
}

function looksHungarian(text) {
  const normalized = compare(text);
  if (!normalized) return false;
  if (/^szia\b/u.test(normalized)) return true;
  const words = normalized.split(/[^a-z]+/).filter(Boolean);
  if (!words.length) return false;
  let score = 0;
  words.forEach(word => {
    if (HU_DETECT_WORDS.has(word) || HU_WORD_FIXES[word]) score += 1;
  });
  return score >= Math.max(1, Math.ceil(words.length / 5));
}

async function correctWithLanguageTool(text, sourceLang) {
  const requestedLanguage = mapCorrectionLanguage(sourceLang);
  const params = new URLSearchParams();
  params.set("text", String(text || ""));
  params.set("language", requestedLanguage);
  params.set("enabledOnly", "false");

  const response = await fetch(CORRECTION_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
    body: params.toString()
  });

  if (!response.ok) throw new Error("Nyelvi jav\u00EDt\u00E1s hiba");

  const data = await response.json();
  const detected = normalizeDetectedLanguage(data?.language?.detectedLanguage?.code, sourceLang, text);
  const apiCorrected = applyLanguageToolMatches(String(text || ""), Array.isArray(data?.matches) ? data.matches : []);
  const merged = mergeCorrectionResults(text, apiCorrected, detected);

  return {
    correctedText: merged,
    detectedLanguage: detected
  };
}

function mapCorrectionLanguage(sourceLang) {
  if (!sourceLang || sourceLang === "auto") return "auto";
  return LT_LANG_MAP[sourceLang] || sourceLang;
}

function normalizeDetectedLanguage(code, sourceLang, text) {
  if (sourceLang && sourceLang !== "auto") return sourceLang;
  const lower = String(code || "").toLocaleLowerCase("hu-HU");
  if (!lower) return detect(text) || "hu";
  if (lower.startsWith("hu")) return "hu";
  if (lower.startsWith("en")) return "en";
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("it")) return "it";
  if (lower.startsWith("pt-br")) return "pb";
  if (lower.startsWith("pt")) return "pt";
  return lower.slice(0, 2);
}

function applyLanguageToolMatches(text, matches) {
  let result = String(text || "");
  let blockedStart = Number.POSITIVE_INFINITY;
  const ordered = matches
    .filter(match => Number.isInteger(match?.offset) && Number.isInteger(match?.length))
    .sort((a, b) => b.offset - a.offset);

  ordered.forEach(match => {
    const offset = match.offset;
    const length = match.length;
    if (offset + length > blockedStart) return;
    const replacement = pickCorrectionReplacement(match);
    if (replacement == null) return;
    result = `${result.slice(0, offset)}${replacement}${result.slice(offset + length)}`;
    blockedStart = offset;
  });

  return result;
}

function pickCorrectionReplacement(match) {
  const replacement = match?.replacements?.[0]?.value;
  if (typeof replacement !== "string") return null;
  return replacement;
}

function mergeCorrectionResults(original, apiCorrected, lang) {
  const fallback = autoCorrectText(original, lang);
  let merged = String(apiCorrected || "").trim() || String(original || "").trim();
  if (!merged) return "";

  if (lang === "hu") {
    merged = applyHungarianWordFixes(merged);
    merged = improveHungarianPunctuation(merged);
    const fallbackWords = fallback.split(/(\s+)/);
    const mergedWords = merged.split(/(\s+)/);
    if (fallbackWords.length === mergedWords.length) {
      merged = mergedWords.map((part, index) => {
        if (/^\s+$/u.test(part)) return part;
        const fallbackPart = fallbackWords[index] || part;
        const hasAccent = /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/u.test(fallbackPart);
        const sameBase = compare(fallbackPart) === compare(part);
        return hasAccent && sameBase ? fallbackPart : part;
      }).join("");
    }
    if (scoreHungarianCorrection(fallback) > scoreHungarianCorrection(merged)) merged = fallback;
  }

  merged = normalizeMergedCorrection(merged, lang);
  return merged;
}

function applyHungarianWordFixes(text) {
  return String(text || "").replace(/\b[\p{L}]+\b/gu, word => {
    const lower = word.toLocaleLowerCase("hu-HU");
    const fixed = HU_WORD_FIXES[lower];
    if (!fixed) return word;
    return preserveCase(word, fixed);
  });
}

function preserveCase(source, replacement) {
  if (!source) return replacement;
  if (source === source.toLocaleUpperCase("hu-HU")) return replacement.toLocaleUpperCase("hu-HU");
  if (source[0] === source[0].toLocaleUpperCase("hu-HU")) return capitalizeFirstLetter(replacement, "hu");
  return replacement;
}

function normalizeMergedCorrection(text, lang) {
  let fixed = String(text || "").replace(/[ ]{2,}/g, " ").trim();
  fixed = fixed.replace(/\n{3,}/g, "\n\n");
  fixed = fixed.replace(/\s+([,.;!?])/g, "$1");
  fixed = fixed.replace(/([,.;!?])(?![\s)\]}»”"'])/g, "$1 ");
  fixed = fixed.replace(/([(\[{«“„])\s+/g, "$1");
  if (lang === "hu") fixed = improveHungarianPunctuation(applyHungarianWordFixes(fixed));
  fixed = normalizeGreetingLine(fixed, lang);
  if (!looksLikeVerse(fixed)) fixed = capitalizeSentenceStarts(fixed, lang);
  return fixed;
}

function scoreHungarianCorrection(text) {
  const value = String(text || "");
  const accentCount = (value.match(/[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g) || []).length;
  const commaCount = (value.match(/,/g) || []).length;
  const greetingBonus = /\bSzia,\b/u.test(value) ? 2 : 0;
  const pronounBonus = /\baz én\b/iu.test(value) ? 2 : 0;
  return accentCount * 2 + commaCount * 3 + greetingBonus + pronounBonus + value.length / 1000;
}

function normalizeGreetingLine(text, lang) {
  let fixed = String(text || "").trim();
  if (lang === "hu") {
    if (/^szia[.!?,]*$/iu.test(fixed)) return "Szia!";
    fixed = fixed.replace(/^szia\b[,\s]*/iu, "Szia, ");
  } else if (lang === "en") {
    if (/^(hello|hi|hey)[.!?,]*$/iu.test(fixed)) return "Hello!";
    fixed = fixed.replace(/^(hello|hi|hey)\b[,\s]*/iu, match => `${capitalizeFirstLetter(match.trim(), "en")}, `);
  }
  return fixed;
}

async function translateLarge(text, source, target) {
  const clean = normalize(text);
  if (!clean) return { translatedText: "", detectedLanguage: "", service: "Fordító" };

  const guessedSource = source === "auto" ? detect(clean) : source;
  if (guessedSource && guessedSource === target) {
    return { translatedText: clean, detectedLanguage: guessedSource, service: "Azonos nyelv" };
  }

  const paragraphs = clean.split(/\n{2,}/).map(part => part.trim()).filter(Boolean);
  const units = paragraphs.length ? paragraphs : [clean];
  const translatedUnits = [];
  let detectedLanguage = guessedSource || "";
  let service = "Fordító";

  for (const unit of units) {
    const result = await translateParagraph(unit, source, target);
    translatedUnits.push(result.translatedText);
    detectedLanguage = detectedLanguage || result.detectedLanguage;
    service = result.service;
  }

  return {
    translatedText: translatedUnits.join("\n\n").trim(),
    detectedLanguage: detectedLanguage || guessedSource || (source !== "auto" ? source : ""),
    service
  };
}

async function translateParagraph(text, source, target) {
  const parts = chunk(text, 480);
  const translatedParts = [];
  let detectedLanguage = source !== "auto" ? source : "";
  let service = "Fordító";

  for (const part of parts) {
    const result = await translateChunk(part, source, target);
    translatedParts.push(result.translatedText);
    detectedLanguage = detectedLanguage || result.detectedLanguage;
    service = result.service;
  }

  return {
    translatedText: joinTranslatedChunks(translatedParts),
    detectedLanguage,
    service
  };
}

async function translateChunk(text, source, target) {
  for (const base of ENDPOINTS) {
    try {
      const requestSource = source === "auto" ? "auto" : source;
      const response = await fetch(`${base}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, source: requestSource, target, format: "text" })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      const translatedText = String(data?.translatedText || "").trim();
      if (!translatedText) throw new Error();
      return {
        translatedText,
        detectedLanguage: resolveTranslationDetectedLanguage(data, source, text),
        service: "LibreTranslate"
      };
    } catch {}
  }

  const fallbackSource = source === "auto" ? (detect(text) || "en") : source;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(`${fallbackSource}|${target}`)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error();
  const data = await response.json();
  const translatedText = String(data?.responseData?.translatedText || "").trim();
  if (!translatedText) throw new Error();
  return { translatedText, detectedLanguage: fallbackSource, service: "MyMemory" };
}

function resolveTranslationDetectedLanguage(data, source, text) {
  if (source && source !== "auto") return source;
  const candidates = [
    data?.detectedLanguage?.language,
    data?.detectedLanguage?.code,
    data?.detected_language?.language,
    data?.detected_language?.code,
    data?.detectedLanguage,
    data?.detected_language
  ];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return normalizeDetectedLanguage(candidate, source, text);
    }
  }
  return detect(text) || "";
}

function joinTranslatedChunks(parts) {
  return parts
    .map(part => String(part || "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([,.;!?])/g, "$1")
    .trim();
}
function detect(text) { const value = compare(text); if (!value) return ""; let best = "", score = 0; Object.entries(HINTS).forEach(([code, words]) => { const s = words.reduce((n, word) => n + (value.includes(compare(word)) ? 1 : 0), 0); if (s > score) { score = s; best = code; } }); return best; }
function normalize(v) { return String(v || "").replace(/\r/g, "").replace(/\t/g, " ").replace(/[ ]{2,}/g, " ").trim(); }
function compare(v) { return normalize(v).toLocaleLowerCase("hu-HU").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function chunk(text, max) {
  if (text.length <= max) return [text];
  const parts = text.split(/(?<=[.!?])\s+|\n+/).map(value => value.trim()).filter(Boolean);
  const out = [];
  let current = "";

  parts.forEach(part => {
    const candidate = current ? `${current} ${part}` : part;
    if (candidate.length <= max) {
      current = candidate;
      return;
    }
    if (current) out.push(current);
    if (part.length <= max) {
      current = part;
      return;
    }

    let remaining = part;
    while (remaining.length > max) {
      const breakAt = remaining.lastIndexOf(" ", max);
      const sliceEnd = breakAt > 0 ? breakAt : max;
      out.push(remaining.slice(0, sliceEnd).trim());
      remaining = remaining.slice(breakAt > 0 ? sliceEnd + 1 : sliceEnd).trim();
    }
    current = remaining;
  });

  if (current) out.push(current);
  return out;
}
function time(v) { return new Intl.DateTimeFormat(uiLocale(), { hour: "2-digit", minute: "2-digit" }).format(v instanceof Date ? v : new Date(v)); }
function setStatus(message, tone) { el.status.textContent = message; el.status.classList.remove("is-busy", "is-success", "is-error"); if (tone) el.status.classList.add(`is-${tone}`); }

async function setImage(file) {
  if (!file?.type?.startsWith("image/")) return setStatus("Csak képfájl tölthető fel", "error");
  try {
    const dataUrl = await fileToDataUrl(file);
    state.image = { file, dataUrl, translatedDataUrl: "" };
    if (el.imageInput) el.imageInput.value = "";
    el.imagePreview.src = state.image.dataUrl;
    el.imageEmpty.hidden = true;
    el.imageFilled.hidden = false;
    el.imageActions.hidden = true;
    showImage(false);
    setStatus("Kép betöltve", "success");
  } catch {
    setStatus("A kép betöltése nem sikerült", "error");
  }
}
function clearImage() { state.imageReq += 1; resetImage(); setStatus("K\u00E9p t\u00F6r\u00F6lve", "success"); }
function resetImage() { state.image = { file: null, dataUrl: "", translatedDataUrl: "" }; el.imageInput.value = ""; el.imagePreview.removeAttribute("src"); el.imageEmpty.hidden = false; el.imageFilled.hidden = true; el.imageActions.hidden = true; el.imagePreview.hidden = false; el.imageCanvas.hidden = true; el.downloadImage.removeAttribute("href"); }
async function pasteImageFromClipboard() { try { const items = await navigator.clipboard.read(); for (const item of items) { const type = item.types.find(x => x.startsWith("image/")); if (!type) continue; const blob = await item.getType(type); await setImage(new File([blob], "v\u00E1g\u00F3lap-k\u00E9p.png", { type: blob.type })); return; } setStatus("Nem tal\u00E1ltam k\u00E9pet a v\u00E1g\u00F3lapon", "error"); } catch { setStatus("A k\u00E9p beilleszt\u00E9se nem siker\u00FClt", "error"); } }
async function runImageTranslate() {
  if (!state.image.dataUrl) return setStatus("El\u0151sz\u00F6r t\u00F6lts fel egy k\u00E9pet", "error");
  if (!window.Tesseract) return setStatus("A k\u00E9pfeldolgoz\u00F3 most nem \u00E9rhet\u0151 el", "error");
  const req = ++state.imageReq;
  el.imageRun.disabled = true;
  el.imageRun.textContent = "Feldolgoz\u00E1s...";
  setStatus("K\u00E9p feldolgoz\u00E1sa folyamatban", "busy");

  try {
    const ocrSource = await resolveImageOcrSource(state.image.dataUrl, el.imageSource.value);
    const ocrResult = await recognizeImageText(state.image.dataUrl, ocrSource.pack, el.imageSource.value);
    const text = normalizeImageSourceTextClean(ocrResult.text);
    if (!text) throw new Error("Nem tal\u00E1ltam j\u00F3l olvashat\u00F3 sz\u00F6veget a k\u00E9pen");

    const detectedSource = normalizeDetectedLanguage(ocrSource.language || ocrResult.detectedLanguage, el.imageSource.value, text);
    const translateSource = el.imageSource.value === "auto" ? (detectedSource || "auto") : el.imageSource.value;
    const result = await translateLarge(text, translateSource, el.imageTarget.value);
    if (req !== state.imageReq) return;

    state.image.translatedDataUrl = await overlayImage(state.image.dataUrl, result.translatedText, el.imageTarget.value);
    el.downloadImage.href = state.image.translatedDataUrl;
    el.imageActions.hidden = false;
    showImage(true);
    recordImageTranslationUsage(text, el.imageTarget.value);
    setStatus("A k\u00E9p ford\u00EDt\u00E1sa elk\u00E9sz\u00FClt", "success");
  } catch (error) {
    setStatus(error?.message || "A k\u00E9p ford\u00EDt\u00E1sa nem siker\u00FClt", "error");
  } finally {
    if (req === state.imageReq) {
      el.imageRun.disabled = false;
      el.imageRun.textContent = "K\u00E9p ford\u00EDt\u00E1sa";
    }
  }
}

async function resolveImageOcrSource(imageUrl, sourceLang) {
  if (sourceLang && sourceLang !== "auto") {
    return { pack: OCR_MAP[sourceLang] || OCR_MAP.auto, language: sourceLang, script: "" };
  }

  const script = await detectImageScript(imageUrl);
  return {
    pack: mapImageScriptToOcrPack(script) || OCR_MAP.auto,
    language: mapImageScriptToLanguage(script),
    script
  };
}

async function detectImageScript(imageUrl) {
  try {
    const osd = await window.Tesseract.recognize(imageUrl, "osd");
    return String(osd?.data?.script || osd?.data?.scriptName || "").trim();
  } catch {
    return "";
  }
}

function mapImageScriptToOcrPack(script) {
  const value = compare(script);
  if (!value) return "";
  if (value.includes("cyrillic")) return OCR_SCRIPT_PACKS.cyrillic;
  if (value.includes("hangul")) return OCR_SCRIPT_PACKS.korean;
  if (value.includes("hiragana") || value.includes("katakana") || value.includes("japan")) return OCR_SCRIPT_PACKS.japanese;
  if (value.includes("han")) return OCR_SCRIPT_PACKS.han;
  if (value.includes("arabic")) return OCR_SCRIPT_PACKS.arabic;
  if (value.includes("hebrew")) return OCR_SCRIPT_PACKS.hebrew;
  if (value.includes("greek")) return OCR_SCRIPT_PACKS.greek;
  if (value.includes("devanagari")) return OCR_SCRIPT_PACKS.devanagari;
  if (value.includes("thai")) return OCR_SCRIPT_PACKS.thai;
  return OCR_SCRIPT_PACKS.latin;
}

function mapImageScriptToLanguage(script) {
  const value = compare(script);
  if (!value) return "";
  if (value.includes("hangul")) return "ko";
  if (value.includes("hiragana") || value.includes("katakana") || value.includes("japan")) return "ja";
  if (value.includes("han")) return "zh";
  if (value.includes("arabic")) return "ar";
  if (value.includes("hebrew")) return "he";
  if (value.includes("greek")) return "el";
  if (value.includes("devanagari")) return "hi";
  if (value.includes("thai")) return "th";
  if (value.includes("cyrillic")) return "ru";
  return "";
}

async function recognizeImageText(imageUrl, pack, selectedSource) {
  const candidates = [];
  const enhancedUrl = await buildOcrImageVariant(imageUrl);

  const collect = async (candidateImageUrl, candidatePack) => {
    const ocr = await window.Tesseract.recognize(candidateImageUrl, candidatePack);
    const candidate = buildImageOcrCandidate(ocr, selectedSource);
    if (candidate.text) candidates.push(candidate);
  };

  try {
    await collect(enhancedUrl, pack);
  } catch {}

  const bestAfterEnhanced = candidates.sort((a, b) => b.score - a.score)[0];
  if (!bestAfterEnhanced || bestAfterEnhanced.score < 92) {
    try {
      await collect(imageUrl, pack);
    } catch {}
  }

  if (!candidates.length && pack !== OCR_MAP.auto) {
    try {
      await collect(imageUrl, OCR_MAP.auto);
    } catch {}
  }

  const best = candidates.sort((a, b) => b.score - a.score)[0];
  if (!best?.text) throw new Error("Nem tal\u00E1ltam j\u00F3l olvashat\u00F3 sz\u00F6veget a k\u00E9pen");
  return best;
}

function buildImageOcrCandidate(ocr, selectedSource) {
  const rawText = extractImageOcrText(ocr);
  const text = normalizeImageSourceTextClean(rawText);
  const detectedLanguage = selectedSource && selectedSource !== "auto" ? selectedSource : detect(text);
  const confidence = Number(ocr?.data?.confidence || 0);
  return {
    text,
    detectedLanguage,
    confidence,
    score: scoreImageOcrText(text, confidence)
  };
}

function extractImageOcrText(ocr) {
  const lines = Array.isArray(ocr?.data?.lines) ? ocr.data.lines : [];
  if (lines.length) {
    const cleanedLines = lines
      .map(extractImageOcrLine)
      .filter(Boolean);
    if (cleanedLines.length) return cleanedLines.join("\n");
  }
  return String(ocr?.data?.text || "");
}

function extractImageOcrLine(line) {
  const words = Array.isArray(line?.words)
    ? line.words.map(extractImageOcrWord).filter(Boolean)
    : [];
  const text = String(words.length ? words.join(" ") : line?.text || "").trim();
  const confidence = Number(line?.confidence ?? line?.conf ?? 0);
  return shouldKeepImageOcrLine(text, confidence) ? text : "";
}

function extractImageOcrWord(word) {
  const text = String(word?.text || "").trim();
  const confidence = Number(word?.confidence ?? word?.conf ?? 0);
  return shouldKeepImageOcrWord(text, confidence) ? text : "";
}

function shouldKeepImageOcrWord(text, confidence) {
  if (!text) return false;
  if (looksLikeTimecodeLine(text)) return false;
  if (/^[^\p{L}\p{N}]+$/u.test(text)) return confidence >= 40;
  if (text.length <= 2 && /^[\d\W]+$/u.test(text)) return confidence >= 55;
  if (text.length <= 2 && confidence > 0 && confidence < 24) return false;
  return true;
}

function shouldKeepImageOcrLine(text, confidence) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return false;
  if (looksLikeTimecodeLine(value)) return false;
  const letters = (value.match(/\p{L}/gu) || []).length;
  const digits = (value.match(/\d/g) || []).length;
  const symbols = (value.match(/[^\p{L}\p{N}\s]/gu) || []).length;
  if (!letters && digits) return false;
  if (confidence > 0 && confidence < 28 && letters < 2) return false;
  if (symbols > Math.max(4, letters * 2)) return false;
  return true;
}

function normalizeImageSourceText(text) {
  const lines = String(text || "")
    .replace(/\r/g, "\n")
    .replace(/[|¦]+/g, " ")
    .replace(/[“”«»]/g, "\"")
    .replace(/[‘’]/g, "'")
    .split(/\n+/)
    .map(cleanImageOcrLine)
    .filter(Boolean);

  return normalize(lines.join(" "));
}

function cleanImageOcrLine(line) {
  let value = String(line || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  if (looksLikeTimecodeLine(value)) return "";

  value = value.replace(/^((?:[\p{L}]|[\d]+|[^\p{L}\p{N}\s]+)\s+){2,}(?=\p{L}{2,}\b)/u, match => {
    const tokens = match.trim().split(/\s+/);
    const hasDigitOrSymbol = tokens.some(token => /\d|[^\p{L}]/u.test(token));
    const noisy = hasDigitOrSymbol && tokens.every(token => token.length <= 2 || /^\d+$/u.test(token) || /^[^\p{L}\p{N}]+$/u.test(token));
    return noisy ? "" : match;
  });

  value = value
    .replace(/^[`"'~*•.,:;|¦]+/u, "")
    .replace(/[`"'~*•|¦]+$/u, "")
    .replace(/\s*([|¦])\s*/gu, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!value || looksLikeTimecodeLine(value)) return "";
  return value;
}

function normalizeImageSourceTextClean(text) {
  const lines = String(text || "")
    .replace(/\r/g, "\n")
    .replace(/[|\u00A6]+/g, " ")
    .replace(/[\u201C\u201D\u00AB\u00BB]/g, "\"")
    .replace(/[\u2018\u2019]/g, "'")
    .split(/\n+/)
    .map(cleanImageOcrLineClean)
    .filter(Boolean);

  return trimNoisyImageTail(normalize(lines.join(" ")));
}

function cleanImageOcrLineClean(line) {
  let value = String(line || "").replace(/\s+/g, " ").trim();
  if (!value) return "";
  if (looksLikeTimecodeLine(value)) return "";

  value = value.replace(/^((?:[\p{L}]|[\d]+|[^\p{L}\p{N}\s]+)\s+){2,}(?=\p{L}{2,}\b)/u, match => {
    const tokens = match.trim().split(/\s+/);
    const hasDigitOrSymbol = tokens.some(token => /\d|[^\p{L}]/u.test(token));
    const noisy = hasDigitOrSymbol && tokens.every(token => token.length <= 2 || /^\d+$/u.test(token) || /^[^\p{L}\p{N}]+$/u.test(token));
    return noisy ? "" : match;
  });

  value = value
    .replace(/^[`"'~*\u2022.,:;|\u00A6]+/u, "")
    .replace(/[`"'~*\u2022|\u00A6]+$/u, "")
    .replace(/\s*([|\u00A6])\s*/gu, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!value || looksLikeTimecodeLine(value)) return "";
  return trimNoisyImageTail(value);
}

function trimNoisyImageTail(text) {
  const value = normalize(text);
  if (!value) return "";
  const tokens = value.split(/\s+/).filter(Boolean);
  if (tokens.length < 5) return value;

  let tailStart = tokens.length;
  while (tailStart > 0 && isNoisyImageTailToken(tokens[tailStart - 1])) tailStart -= 1;
  if (tailStart === tokens.length) return value;

  const suffix = tokens.slice(tailStart);
  const shortCount = suffix.filter(token => token.length <= 2).length;
  const oneCharCount = suffix.filter(token => token.length === 1).length;
  const symbolCount = suffix.filter(token => /[^\p{L}\p{N}]/u.test(token)).length;
  const upperShortCount = suffix.filter(token => token.length <= 2 && token === token.toLocaleUpperCase("hu-HU") && /\p{L}/u.test(token)).length;
  const shouldTrim =
    suffix.length >= 3 &&
    shortCount === suffix.length &&
    (symbolCount >= 1 || oneCharCount >= 3 || (oneCharCount >= 2 && upperShortCount >= 1));

  if (!shouldTrim || tailStart < 3) return value;
  return tokens.slice(0, tailStart).join(" ");
}

function isNoisyImageTailToken(token) {
  const value = String(token || "").trim();
  if (!value) return false;
  if (/^[^\p{L}\p{N}]+$/u.test(value)) return true;
  if (value.length === 1) return true;
  if (value.length === 2 && (/^\p{Lu}{2}$/u.test(value) || /[^\p{L}\p{N}]/u.test(value))) return true;
  return false;
}

function looksLikeTimecodeLine(text) {
  const value = String(text || "").replace(/\s+/g, "");
  return /^(?:\d{1,2}:)?\d{1,2}:\d{2}(?:\/(?:\d{1,2}:)?\d{1,2}:\d{2})?$/u.test(value);
}

function scoreImageOcrText(text, confidence = 0) {
  const value = String(text || "").trim();
  if (!value) return 0;
  const words = value.split(/\s+/).filter(Boolean).length;
  const letters = (value.match(/\p{L}/gu) || []).length;
  const digits = (value.match(/\d/g) || []).length;
  const symbols = (value.match(/[^\p{L}\p{N}\s]/gu) || []).length;
  const noisyLead = /^((?:[\p{L}]|[\d]+|[^\p{L}\p{N}\s]+)\s+){2,}/u.test(value) ? 14 : 0;
  const noisyTail = trimNoisyImageTail(value) !== value ? 16 : 0;
  return Number(confidence || 0) + Math.min(42, letters * 0.34) + Math.min(28, words * 2.2) - (digits * 0.7) - (symbols * 2.6) - noisyLead - noisyTail;
}

async function buildOcrImageVariant(imageUrl) {
  const image = await loadImage(imageUrl);
  const longestEdge = Math.max(image.naturalWidth || 0, image.naturalHeight || 0, 1);
  const scale = Math.min(2.2, Math.max(1.25, 1800 / longestEdge));
  const canvas = document.createElement("canvas");
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return imageUrl;
  ctx.drawImage(image, 0, 0, width, height);
  const frame = ctx.getImageData(0, 0, width, height);
  const { data } = frame;
  let min = 255;
  let max = 0;

  for (let index = 0; index < data.length; index += 4) {
    const luminance = (data[index] * 0.299) + (data[index + 1] * 0.587) + (data[index + 2] * 0.114);
    if (luminance < min) min = luminance;
    if (luminance > max) max = luminance;
  }

  const range = Math.max(1, max - min);
  for (let index = 0; index < data.length; index += 4) {
    const luminance = (data[index] * 0.299) + (data[index + 1] * 0.587) + (data[index + 2] * 0.114);
    let normalized = (luminance - min) / range;
    normalized = Math.max(0, Math.min(1, normalized));
    let boosted = Math.pow(normalized, 0.88);
    if (boosted > 0.82) boosted = 1;
    if (boosted < 0.08) boosted = 0;
    const value = Math.round(boosted * 255);
    data[index] = value;
    data[index + 1] = value;
    data[index + 2] = value;
  }

  ctx.putImageData(frame, 0, 0);
  return canvas.toDataURL("image/png");
}

async function overlayImage(imageUrl, text, targetLang = "") {
  const image = await loadImage(imageUrl);
  const c = el.imageCanvas;
  const x = c.getContext("2d");
  const m = 24;
  c.width = image.naturalWidth;
  c.height = image.naturalHeight;
  x.clearRect(0, 0, c.width, c.height);
  x.drawImage(image, 0, 0, c.width, c.height);

  const maxWidth = c.width - (m * 2) - 36;
  const maxHeight = Math.max(96, Math.round(c.height * 0.42));
  const denseScript = hasDenseScript(text);
  const rtl = RTL_LANGS.has(String(targetLang || "").toLocaleLowerCase("hu-HU"));
  let fs = Math.max(18, Math.round(c.width / 28));
  let lines = [String(text || "").trim()];
  let lh = Math.round(fs * (denseScript ? 1.46 : 1.35));

  for (; fs >= 16; fs -= 2) {
    x.font = `700 ${fs}px "Segoe UI", "Noto Sans", Manrope, sans-serif`;
    lines = wrap(x, text, maxWidth);
    lh = Math.round(fs * (denseScript ? 1.46 : 1.35));
    if ((lines.length * lh) + 36 <= maxHeight) break;
  }

  const h = Math.min(c.height - (m * 2), Math.max(84, (lines.length * lh) + 36));
  const darkCanvas = resolveThemeMode() !== "light";
  x.fillStyle = darkCanvas ? "rgba(7, 14, 25, 0.84)" : "rgba(255,255,255,0.9)";
  rounded(x, m, m, c.width - (m * 2), h, 24);
  x.fill();

  x.fillStyle = darkCanvas ? "#eef4ff" : "#132035";
  x.textBaseline = "top";
  x.textAlign = rtl ? "right" : "left";
  try { x.direction = rtl ? "rtl" : "ltr"; } catch {}
  const textX = rtl ? c.width - m - 18 : m + 18;
  let y = m + 18;
  lines.forEach(line => {
    if (y + lh > m + h - 12) return;
    x.fillText(line, textX, y);
    y += lh;
  });
  x.textAlign = "left";
  try { x.direction = "ltr"; } catch {}
  return c.toDataURL("image/png");
}

function wrap(ctx, text, maxWidth) {
  const paragraphs = String(text || "").split(/\n+/).map(value => value.trim()).filter(Boolean);
  if (!paragraphs.length) return [""];
  const lines = [];

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const parts = tokenizeWrapText(paragraph);
    if (!parts.length) return;
    let current = parts[0];

    for (let index = 1; index < parts.length; index += 1) {
      const part = parts[index];
      const glue = needsTightJoin(current, part) ? "" : " ";
      const candidate = `${current}${glue}${part}`;
      if (ctx.measureText(candidate).width <= maxWidth) current = candidate;
      else {
        lines.push(current);
        current = part;
      }
    }

    lines.push(current);
    if (paragraphIndex < paragraphs.length - 1) lines.push("");
  });

  return lines;
}

function tokenizeWrapText(text) {
  const value = String(text || "").trim();
  if (!value) return [];
  return hasDenseScript(value) && !/\s/u.test(value)
    ? [...value]
    : value.split(/\s+/).filter(Boolean);
}

function needsTightJoin(left, right) {
  return hasDenseScript(left) || hasDenseScript(right);
}

function hasDenseScript(text) {
  return /[\u0E00-\u0E7F\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff\uac00-\ud7af]/u.test(String(text || ""));
}

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

function hasDocumentTranslation() { return !!renderedDocumentText(); }
function syncDocActionState() {
  if (el.copyDoc) el.copyDoc.disabled = !hasDocumentTranslation();
  if (!el.downloadDoc) return;
  const ready = !!state.doc.downloadUrl && hasDocumentTranslation();
  el.downloadDoc.classList.toggle("is-disabled", !ready);
  el.downloadDoc.setAttribute("aria-disabled", String(!ready));
  el.downloadDoc.tabIndex = ready ? 0 : -1;
  if (ready) el.downloadDoc.href = state.doc.downloadUrl;
  else el.downloadDoc.removeAttribute("href");
}
function buildDocumentDownloadName(fileName, targetLang) {
  const raw = String(fileName || "forditott-dokumentum").replace(/\.[^.]+$/, "");
  const normalized = typeof raw.normalize === "function" ? raw.normalize("NFD") : raw;
  const safe = normalized
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "forditott-dokumentum";
  const suffix = String(targetLang || "").trim().toLowerCase();
  return `${safe}-forditas${suffix ? `-${suffix}` : ""}.txt`;
}
async function setDoc(file) {
  try {
    const text = normalizeDocument(await fileToText(file));
    if (!text) return setStatus("Nem találtam fordítható szöveget", "error");
    revokeDocUrl();
    state.doc = { file, text, translatedText: "", downloadUrl: "" };
    if (el.docInput) el.docInput.value = "";
    el.docEmpty.hidden = true;
    el.docFilled.hidden = false;
    el.docFileName.textContent = file.name;
    el.docSourceText.textContent = text;
el.docTranslatedText.textContent = documentPlaceholder();
    el.docTranslatedText.classList.remove("is-loading", "is-fresh");
    el.docMeta.textContent = "A dokumentum készen áll a fordításra.";
    if (el.downloadDoc) el.downloadDoc.download = buildDocumentDownloadName(file.name, el.docTarget?.value || "en");
    syncDocActionState();
    setStatus("Dokumentum betöltve", "success");
  } catch {
    setStatus("A dokumentum beolvasása nem sikerült", "error");
  }
}
function clearDoc() { state.docReq += 1; resetDoc(); setStatus("Dokumentum t\u00F6r\u00F6lve", "success"); }
function resetDoc() {
  revokeDocUrl();
  state.doc = { file: null, text: "", translatedText: "", downloadUrl: "" };
  el.docInput.value = "";
  el.docEmpty.hidden = false;
  el.docFilled.hidden = true;
  el.docFileName.textContent = "Nincs kiválasztott fájl";
  el.docSourceText.textContent = "Itt jelenik meg a dokumentumból beolvasott szöveg.";
el.docTranslatedText.textContent = documentPlaceholder();
  el.docTranslatedText.classList.remove("is-loading", "is-fresh");
  el.docMeta.textContent = "A dokumentum fordításának állapota itt jelenik meg.";
  if (el.downloadDoc) el.downloadDoc.download = "forditott-dokumentum.txt";
  syncDocActionState();
}
async function runDocTranslate() {
  if (!state.doc.text) return setStatus("Először válassz dokumentumot", "error");
  const req = ++state.docReq;
  el.docRun.disabled = true;
  el.docRun.textContent = "Fordítás...";
  revokeDocUrl();
  state.doc.translatedText = "";
el.docTranslatedText.textContent = documentPlaceholder();
  el.docTranslatedText.classList.remove("is-fresh");
  el.docTranslatedText.classList.add("is-loading");
  el.docMeta.textContent = "Dokumentum fordítása folyamatban...";
  syncDocActionState();
  setStatus("Dokumentum fordítása folyamatban", "busy");
  try {
    const result = await translateDocument(state.doc.text, el.docSource.value, el.docTarget.value);
    if (req !== state.docReq) return;
    state.doc.translatedText = result.translatedText;
el.docTranslatedText.textContent = result.translatedText || documentPlaceholder();
    el.docTranslatedText.classList.remove("is-loading", "is-fresh");
    void el.docTranslatedText.offsetWidth;
    el.docTranslatedText.classList.add("is-fresh");
    el.docMeta.textContent = `${label(result.detectedLanguage || el.docSource.value)} -> ${label(el.docTarget.value)} / ${result.service}`;
    const blob = new Blob([state.doc.translatedText], { type: "text/plain;charset=utf-8" });
    state.doc.downloadUrl = URL.createObjectURL(blob);
    if (el.downloadDoc) el.downloadDoc.download = buildDocumentDownloadName(state.doc.file?.name || "", el.docTarget.value);
    syncDocActionState();
    recordDocumentTranslationUsage(state.doc.text, el.docTarget.value);
    setStatus("Dokumentum fordítása kész", "success");
  } catch (error) {
    if (req !== state.docReq) return;
el.docTranslatedText.textContent = documentPlaceholder();
    el.docTranslatedText.classList.remove("is-loading", "is-fresh");
    el.docMeta.textContent = "Nem sikerült elérni a fordító szolgáltatást.";
    syncDocActionState();
    setStatus(error?.message || "A dokumentum fordítása nem sikerült", "error");
  } finally {
    if (req === state.docReq) {
      el.docRun.disabled = false;
      el.docRun.textContent = "Dokumentum fordítása";
    }
  }
}
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

async function detectMicDeviceLabel() {
  if (!navigator.mediaDevices?.enumerateDevices) return "";
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const inputs = devices.filter(device => device.kind === "audioinput");
    if (!inputs.length) return "";
    const selected = inputs.find(device => device.deviceId === "default" || /default/i.test(device.label)) || inputs[0];
    const label = String(selected.label || "").trim();
    if (!label) return "";
    if (/(headset|hands-free|airpods|earbuds|bluetooth|fülhallgató|headphones)/i.test(label)) {
      return uiLanguage() === "en" ? "Headset mic" : "Headset mikrofon";
    }
    return uiLanguage() === "en" ? "Default mic" : "Alap mikrofon";
  } catch {
    return "";
  }
}

async function ensureMicPermission() {
  if (!navigator.mediaDevices?.getUserMedia) {
    state.mic.deviceLabel = "";
    setMicDeviceBadge("");
    return { ok: true, stream: null };
  }

  const permissionState = await queryMicPermissionState();
  if (permissionState === "denied") {
    return { ok: false, local: micText("permissionDeniedLocal"), message: micText("permissionDeniedMessage") };
  }

  let stream = null;
  let timeoutId = 0;
  try {
    stream = await Promise.race([
      navigator.mediaDevices.getUserMedia({ audio: true }),
      new Promise((_, reject) => {
        timeoutId = window.setTimeout(() => reject(new Error("__mic_permission_timeout__")), MIC_PERMISSION_TIMEOUT_MS);
      })
    ]);
    state.mic.deviceLabel = await detectMicDeviceLabel();
    setMicDeviceBadge(state.mic.deviceLabel);
    return { ok: true, stream };
  } catch (error) {
    stream?.getTracks?.().forEach(track => track.stop());
    if (String(error?.message || "") === "__mic_permission_timeout__") {
      return {
        ok: false,
        local: micText("waitingPermissionLocal"),
        message: micText("waitingPermissionMessage")
      };
    }

    const name = String(error?.name || "");
    if (name === "NotAllowedError" || name === "PermissionDeniedError" || name === "SecurityError") {
      return { ok: false, local: micText("permissionDeniedLocal"), message: micText("permissionDeniedMessage") };
    }
    if (name === "NotFoundError" || name === "DevicesNotFoundError" || name === "OverconstrainedError") {
      return { ok: false, local: micText("noMicrophoneLocal"), message: micText("noMicrophoneMessage") };
    }
    if (name === "NotReadableError" || name === "TrackStartError") {
      return { ok: false, local: micText("microphoneBusyLocal"), message: micText("microphoneBusyMessage") };
    }
    return { ok: false, local: micText("errorLocal"), message: micText("permissionRequestFailed") };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
    stream?.getTracks?.().forEach(track => track.stop());
  }
}

async function transcribeMicBlob(blob, sourceLanguage) {
  if (location.protocol === "file:") {
    throw new Error(micText("serverOnly"));
  }

  const response = await fetch(MIC_TRANSCRIBE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      audio_base64: await blobToBase64(blob),
      mime_type: blob.type || "audio/webm",
      source_language: sourceLanguage || ""
    })
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(micText("apiFileMissing"));
    }
    if (response.status === 500 && String(data?.error || "").includes("OPENAI_API_KEY")) {
      throw new Error(micText("apiKeyMissing"));
    }
    throw new Error(data?.error || micText("serviceUnavailable"));
  }

  const text = String(data?.text || "").trim();
  if (!text) throw new Error(micText("noSpeechDetected"));
  return text;
}

async function tryMicRecorderFallback(token, fromFallback = false) {
  const probe = await probeMicTranscribeEndpoint();
  if (token !== state.mic.startToken) return false;

  if (!probe.ok) {
    state.mic.processing = false;
    state.mic.engine = "";
    state.mic.lastError = micText("errorLocal");
    refreshMicUi();

    if (probe.reason === "local") {
      setMicStatusState("error", micText("localOnlyLocal"));
      setStatus(micText("localOnlyMessage"), "error");
    } else if (probe.reason === "missing") {
      setMicStatusState("error", micText("apiMissingLocal"));
      setStatus(micText("apiMissingMessage"), "error");
    } else {
      setMicStatusState("error", micText("apiUnavailableLocal"));
      setStatus(micText("apiUnavailableMessage"), "error");
    }

    return false;
  }

  return startMicRecorder(token, fromFallback);
}

function startMicVolumeMonitor(stream) {
  clearMicVolumeMonitor();
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx || !stream) return;

  try {
    const audioContext = new AudioCtx();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    state.mic.audioContext = audioContext;
    state.mic.analyser = analyser;
    state.mic.analyserSource = source;
    state.mic.lastVoiceAt = Date.now();

    const buffer = new Uint8Array(analyser.fftSize);
    const sample = () => {
      if (state.mic.engine !== "recorder" || !state.mic.listening || !state.mic.analyser) return;
      analyser.getByteTimeDomainData(buffer);
      let energy = 0;
      for (let i = 0; i < buffer.length; i += 1) energy += Math.abs(buffer[i] - 128);
      const average = energy / buffer.length;
      if (average >= MIC_VOLUME_THRESHOLD) state.mic.lastVoiceAt = Date.now();
      if (Date.now() - state.mic.lastVoiceAt >= MIC_SILENCE_MS) {
        stopMicCapture(micText("processingAfterSilence"));
        return;
      }
      state.mic.volumeTimer = window.setTimeout(sample, MIC_VOLUME_SAMPLE_MS);
    };

    state.mic.volumeTimer = window.setTimeout(sample, MIC_VOLUME_SAMPLE_MS);
  } catch {}
}

function armMicStartTimeout(token) {
  clearMicStartTimeout();
  state.mic.startTimeout = window.setTimeout(() => {
    if (token !== state.mic.startToken) return;
    if (state.mic.listening || !state.mic.processing || state.mic.engine !== "speech-pending") return;
    state.mic.ignoreAbortError = true;
    state.mic.engine = "recorder-starting";
    setMicStatusState("processing", micText("saferModeStatus"));
    setStatus(micText("saferModeMessage"), "busy");
    try { state.mic.recognition?.abort?.(); } catch {}
    void tryMicRecorderFallback(token, true);
  }, MIC_START_TIMEOUT_MS);
}

async function startMicRecorder(token, fromFallback = false) {
  if (!canUseRecorderFallback()) {
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", micText("notSupportedLocal"));
    setStatus(micText("notSupportedMessage"), "error");
    return false;
  }

  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.mic.deviceLabel = await detectMicDeviceLabel();
    setMicDeviceBadge(state.mic.deviceLabel);
  } catch (error) {
    const name = String(error?.name || "");
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();

    if (name === "NotAllowedError" || name === "PermissionDeniedError") {
      setMicStatusState("error", micText("permissionDeniedLocal"));
      setStatus(micText("permissionDeniedMessage"), "error");
    } else if (name === "NotFoundError" || name === "DevicesNotFoundError" || name === "OverconstrainedError") {
      setMicStatusState("error", micText("noMicrophoneLocal"));
      setStatus(micText("noMicrophoneMessage"), "error");
    } else if (name === "NotReadableError" || name === "TrackStartError") {
      setMicStatusState("error", micText("microphoneBusyLocal"));
      setStatus(micText("microphoneBusyMessage"), "error");
    } else {
      setMicStatusState("error", micText("errorLocal"));
      setStatus(micText("recordStartFailed"), "error");
    }
    return false;
  }

  const mimeType = getRecorderMimeType();
  try {
    state.mic.stream = stream;
    state.mic.recorderMimeType = mimeType || "audio/webm";
    state.mic.recorderChunks = [];
    state.mic.engine = "recorder";
    state.mic.listening = true;
    state.mic.processing = false;
    state.mic.ignoreAbortError = false;
    state.mic.lastError = "";
    recordMicUsage();
    refreshMicUi();
    setMicStatusState("listening", micText("listening"));
    setStatus(fromFallback ? micText("recordingFallback") : micText("recording"), "busy");

    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    state.mic.recorder = recorder;
    recorder.ondataavailable = event => {
      if (event.data && event.data.size) state.mic.recorderChunks.push(event.data);
    };
    recorder.onerror = () => {
      stopMicStream();
      state.mic.recorder = null;
      state.mic.processing = false;
      state.mic.listening = false;
      state.mic.engine = "";
      state.mic.lastError = micText("errorLocal");
      refreshMicUi();
      setMicStatusState("error", micText("errorLocal"));
      setStatus(micText("recordInitFailed"), "error");
    };
    recorder.onstop = () => { void handleRecorderStop(token); };
    recorder.start(MIC_RECORDER_SLICE_MS);
    startMicVolumeMonitor(stream);
    return true;
  } catch {
    stopMicStream();
    state.mic.processing = false;
    state.mic.listening = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", micText("errorLocal"));
    setStatus(micText("recordStartFailed"), "error");
    return false;
  }
}

async function handleRecorderStop(token) {
  clearMicStartTimeout();
  clearMicVolumeMonitor();

  const chunks = [...state.mic.recorderChunks];
  const mimeType = state.mic.recorderMimeType || "audio/webm";
  state.mic.recorderChunks = [];
  state.mic.recorder = null;
  state.mic.ignoreAbortError = false;
  state.mic.listening = false;
  state.mic.processing = true;
  refreshMicUi();
  setMicStatusState("processing", micText("processing"));
  setStatus(micText("processingLong"), "busy");

  const blob = new Blob(chunks, { type: mimeType });
  stopMicStream();

  if (token !== state.mic.startToken) {
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    return;
  }

  if (!blob.size) {
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", micText("noSpeechLocal"));
    setStatus(micText("noSpeechMessage"), "error");
    return;
  }

  if (blob.size > MIC_MAX_BLOB_BYTES) {
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("error", micText("tooLongLocal"));
    setStatus(micText("tooLongMessage"), "error");
    return;
  }

  try {
    const text = await transcribeMicBlob(blob, buildMicSourceLanguage());
    if (token !== state.mic.startToken) return;
    const sourceLanguage = buildMicSourceLanguage();
    const language = normalizeDetectedLanguage(sourceLanguage, sourceLanguage || "auto", text) || "hu";
    state.mic.finalText = formatMicChunk(text, language, state.mic.baseText);
    state.mic.interimText = "";
    applyMicTranscriptToSource();
    state.mic.baseText = el.sourceText?.value || "";
    state.mic.finalText = "";
    state.mic.processing = false;
    state.mic.engine = "";
    refreshMicUi();
    setMicStatusState("ready", micText("ready"));
    setStatus(micText("speechRecognized"), "success");
    if (state.settings.liveTranslate && canUseMicHere()) void runTranslate(true);
  } catch (error) {
    state.mic.processing = false;
    state.mic.engine = "";
    state.mic.lastError = micText("errorLocal");
    refreshMicUi();
    setMicStatusState("error", micText("errorLocal"));
    setStatus(error?.message || micText("serviceUnavailable"), "error");
  }
}

function scheduleMicSilenceTimer() {
  resetMicSilenceTimer();
  if (!state.mic.listening) return;
  state.mic.silenceTimer = window.setTimeout(() => {
    if (!state.mic.listening) return;
    stopMicCapture(micText("processingAfterSilence"));
  }, MIC_SILENCE_MS);
}

function handleMicStart() {
  clearMicStartTimeout();
  stopMicStream();
  state.mic.engine = "speech";
  state.mic.listening = true;
  state.mic.processing = false;
  state.mic.lastError = "";
  state.mic.silentEnd = false;
  recordMicUsage();
  refreshMicUi();
  setMicStatusState("listening", micText("listening"));
  setStatus(micText("recording"), "busy");
  scheduleMicSilenceTimer();
}

function handleMicResult(event) {
  const lang = normalizeDetectedLanguage(el.source?.value === "auto" ? "" : el.source?.value, el.source?.value || "auto", el.sourceText?.value || "") || "hu";
  let interim = "";

  for (let index = event.resultIndex; index < event.results.length; index += 1) {
    const result = event.results[index];
    const transcript = String(result?.[0]?.transcript || "").trim();
    if (!transcript) continue;

    if (result.isFinal) {
      const baseText = state.mic.mergeMode === "replace" ? state.mic.finalText : joinMicParts(state.mic.baseText, state.mic.finalText);
      state.mic.finalText = joinMicParts(state.mic.finalText, formatMicChunk(transcript, lang, baseText));
    } else {
      const baseText = state.mic.mergeMode === "replace" ? state.mic.finalText : joinMicParts(state.mic.baseText, state.mic.finalText);
      interim = joinMicParts(interim, formatMicChunk(transcript, lang, baseText));
    }
  }

  state.mic.interimText = interim;
  applyMicTranscriptToSource();
  setMicStatusState("listening", interim ? micText("listening") : micText("recording"));
  scheduleMicSilenceTimer();
}

async function toggleMicCapture() {
  if (state.mic.listening) {
    stopMicCapture(micText("processingLong"));
    return;
  }

  if (state.mic.processing) {
    cancelPendingMicRequest();
    return;
  }
  await startMicCapture();
}

async function translateRecognizedTextNow() {
  if (!String(el.sourceText?.value || "").trim()) {
    setStatus(
      uiLanguage() === "en"
        ? "Say something into the microphone or type some text first"
        : "Előbb mondj valamit a mikrofonba vagy írj szöveget",
      "error"
    );
    return;
  }
  await runTranslate(true);
}

