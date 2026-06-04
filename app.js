"use strict";

const ROWS = ["A", "B", "C"];
const KEYBOARD_ROWS = [
  ["Y", "U", "I", "O", "P"],
  ["H", "J", "K", "L", ";"],
  ["N", "M", ",", ".", "/"]
];

const SKY_BUTTONS = Array.from({ length: 15 }, (_, index) => {
  const rowIndex = Math.floor(index / 5);
  const colIndex = index % 5;
  return {
    id: index + 1,
    row: ROWS[rowIndex],
    col: colIndex + 1,
    abc: `${ROWS[rowIndex]}${colIndex + 1}`,
    keyboard: KEYBOARD_ROWS[rowIndex][colIndex]
  };
});

const KEY_CONFIGS = [
  {
    id: "C",
    label: "C major",
    aliases: ["C"],
    setup: "Most music sheets are in C. A selected music sheet sets the key; otherwise the grid follows local background music.",
    places: ["Homespace", "Prairie Villages before bells", "Forest Underground Cavern", "Vault Archives"],
    rows: [
      ["C", "D", "E", "F", "G"],
      ["A", "B", "C", "D", "E"],
      ["F", "G", "A", "B", "C"]
    ],
    rootMidi: 60
  },
  {
    id: "Db",
    label: "C#/Db major",
    aliases: ["C#", "Db"],
    setup: "Known in Sky as C sharp/D flat. The 15 piano buttons retune to the Db major scale.",
    places: ["Prairie 8-player puzzle start", "Forest Boneyard after key pause"],
    rows: [
      ["Db", "Eb", "F", "Gb", "Ab"],
      ["Bb", "C", "Db", "Eb", "F"],
      ["Gb", "Ab", "Bb", "C", "Db"]
    ],
    rootMidi: 61
  },
  {
    id: "D",
    label: "D major",
    aliases: ["D"],
    setup: "D appears in several sheets and areas. The third and seventh scale degrees are F# and C#.",
    places: ["Prairie portal from Home", "Valley Temple", "Wasteland Battlefield"],
    rows: [
      ["D", "E", "F#", "G", "A"],
      ["B", "C#", "D", "E", "F#"],
      ["G", "A", "B", "C#", "D"]
    ],
    rootMidi: 62
  },
  {
    id: "Eb",
    label: "D#/Eb major",
    aliases: ["D#", "Eb"],
    setup: "Known in Sky as D sharp/E flat. The flat-key layout is used for readable Sky note names.",
    places: ["Forest's Brook after key pause", "Wasteland Broken Temple", "Vault Crescent Oasis", "Shard Memories"],
    rows: [
      ["Eb", "F", "G", "Ab", "Bb"],
      ["C", "D", "Eb", "F", "G"],
      ["Ab", "Bb", "C", "D", "Eb"]
    ],
    rootMidi: 63
  },
  {
    id: "E",
    label: "E major",
    aliases: ["E"],
    setup: "E can be reached through E-key sheets or by pausing the key after the matching background music section.",
    places: ["Treehouse after music finishes", "End of Orbit", "Eden key pause"],
    rows: [
      ["E", "F#", "G#", "A", "B"],
      ["C#", "D#", "E", "F#", "G#"],
      ["A", "B", "C#", "D#", "E"]
    ],
    rootMidi: 64
  },
  {
    id: "F",
    label: "F major",
    aliases: ["F", "E#"],
    setup: "F major keeps the Sky grid diatonic; the only flat is Bb.",
    places: ["Aviary Village shops", "Forest Elevated Clearing", "Valley Citadel", "Vault first floor"],
    rows: [
      ["F", "G", "A", "Bb", "C"],
      ["D", "E", "F", "G", "A"],
      ["Bb", "C", "D", "E", "F"]
    ],
    rootMidi: 65
  },
  {
    id: "Gb",
    label: "F#/Gb major",
    aliases: ["F#", "Gb"],
    setup: "Known in Sky as F sharp/G flat. This is the configuration that contains Cb on the fourth and eleventh buttons.",
    places: ["Forest Boneyard after jellyfish", "Prairie 8-player elevator section"],
    rows: [
      ["Gb", "Ab", "Bb", "Cb", "Db"],
      ["Eb", "F", "Gb", "Ab", "Bb"],
      ["Cb", "Db", "Eb", "F", "Gb"]
    ],
    rootMidi: 66
  },
  {
    id: "G",
    label: "G major",
    aliases: ["G"],
    setup: "G major has one sharp, F#. It is a common transposition target for Sky arrangements.",
    places: ["Forest clearing after music finishes", "Isle of Dawn start"],
    rows: [
      ["G", "A", "B", "C", "D"],
      ["E", "F#", "G", "A", "B"],
      ["C", "D", "E", "F#", "G"]
    ],
    rootMidi: 55
  },
  {
    id: "Ab",
    label: "G#/Ab major",
    aliases: ["G#", "Ab"],
    setup: "Known in Sky as G sharp/A flat. The flat naming keeps the grid readable.",
    places: ["Valley Coliseum after a race"],
    rows: [
      ["Ab", "Bb", "C", "Db", "Eb"],
      ["F", "Gb", "Ab", "Bb", "C"],
      ["Db", "Eb", "F", "Gb", "Ab"]
    ],
    rootMidi: 56
  },
  {
    id: "A",
    label: "A major",
    aliases: ["A"],
    setup: "A major has C#, F#, and G#. The Sky buttons remain the same positions while their note names retune.",
    places: ["Vault fourth floor"],
    rows: [
      ["A", "B", "C#", "D", "E"],
      ["F#", "G#", "A", "B", "C#"],
      ["D", "E", "F#", "G#", "A"]
    ],
    rootMidi: 57
  },
  {
    id: "Bb",
    label: "A#/Bb major",
    aliases: ["A#", "Bb"],
    setup: "Known in Sky as A sharp/B flat. This layout has Bb and Eb in the scale.",
    places: ["Hidden Forest after-Temple area"],
    rows: [
      ["Bb", "C", "D", "Eb", "F"],
      ["G", "A", "Bb", "C", "D"],
      ["Eb", "F", "G", "A", "Bb"]
    ],
    rootMidi: 58
  },
  {
    id: "B",
    label: "B major",
    aliases: ["B", "Cb"],
    setup: "B major is also the practical Sky equivalent for Cb major. It often requires selecting a B-key sheet or pausing the background key.",
    places: ["Forest Boneyard jellyfish section", "Late Valley race section", "Vault second floor section"],
    rows: [
      ["B", "C#", "D#", "E", "F#"],
      ["G#", "A#", "B", "C#", "D#"],
      ["E", "F#", "G#", "A#", "B"]
    ],
    rootMidi: 59
  }
];

const NOTE_STEPS = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24];
const PC_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const PC_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const FLAT_KEY_IDS = new Set(["Db", "Eb", "F", "Gb", "Ab", "Bb"]);
const SKY_KEY_BY_PC = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const NOTE_TO_PC = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
  "B#": 0
};
const CHORD_TEMPLATES = [
  { suffix: "5", name: "power", intervals: [0, 7] },
  { suffix: "", name: "major", intervals: [0, 4, 7] },
  { suffix: "m", name: "minor", intervals: [0, 3, 7] },
  { suffix: "sus2", name: "sus2", intervals: [0, 2, 7] },
  { suffix: "sus4", name: "sus4", intervals: [0, 5, 7] },
  { suffix: "dim", name: "diminished", intervals: [0, 3, 6] },
  { suffix: "aug", name: "augmented", intervals: [0, 4, 8] },
  { suffix: "7", name: "dominant seventh", intervals: [0, 4, 7, 10] },
  { suffix: "maj7", name: "major seventh", intervals: [0, 4, 7, 11] },
  { suffix: "m7", name: "minor seventh", intervals: [0, 3, 7, 10] },
  { suffix: "mMaj7", name: "minor major seventh", intervals: [0, 3, 7, 11] },
  { suffix: "dim7", name: "diminished seventh", intervals: [0, 3, 6, 9] },
  { suffix: "m7b5", name: "half diminished seventh", intervals: [0, 3, 6, 10] },
  { suffix: "6", name: "major sixth", intervals: [0, 4, 7, 9] },
  { suffix: "m6", name: "minor sixth", intervals: [0, 3, 7, 9] },
  { suffix: "add9", name: "add ninth", intervals: [0, 4, 7, 14] },
  { suffix: "madd9", name: "minor add ninth", intervals: [0, 3, 7, 14] }
];
const MAJOR_KEY_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const ANALYSIS_MIDI_START = 36;
const ANALYSIS_MIDI_END = 88;
const PIANO_MIDI_START = 40;
const PIANO_MIDI_END = 88;
const NEURAL_LATTICE_MIN_MIDI = 38;
const NEURAL_LATTICE_MAX_MIDI = 92;
const MELODY_TARGET_RATE = 8000;
const MELODY_FRAME_LENGTH = 1024;
const MELODY_HOP_LENGTH = 256;
const MELODY_MIN_FREQ = 82;
const MELODY_MAX_FREQ = 1175;
const MELODY_MIN_SECONDS = 0.12;
const MELODY_JOIN_GAP_SECONDS = 0.13;
const RHYTHM_TARGET_RATE = 11025;
const RHYTHM_FRAME_LENGTH = 1024;
const RHYTHM_HOP_LENGTH = 256;
const COMBINED_BEATS_PER_BAR = 4;
const WORD_TOKEN_PATTERN = /[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?|[^\sA-Za-z0-9]/g;
const SCORE_PDF_JS_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs";
const SCORE_PDF_WORKER_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs";
const SCORE_MAX_OMR_PAGES = 8;
const SCORE_MAX_EVENTS = 3200;
const LOCAL_SCORE_OMR_API = "http://127.0.0.1:5173/api/sheet-omr";
const VISION_SCORE_MAX_WIDTH = 1700;
const VISION_SCORE_MAX_HEIGHT = 2200;
const VISION_SCORE_MAX_SCALE = 2.15;
const VISION_SCORE_DEFAULT_BEATS_PER_BAR = 4;
const SCORE_ARRANGEMENT_LIMITS = {
  melody: { maxCombinedEvents: 1500, harmonyShare: 0.18, bassShare: 0.28, splitThreshold: 4 },
  balanced: { maxCombinedEvents: 2300, harmonyShare: 0.58, bassShare: 0.64, splitThreshold: 4 },
  full: { maxCombinedEvents: 3200, harmonyShare: 0.88, bassShare: 0.9, splitThreshold: 3 }
};
const TWO_PI = Math.PI * 2;
const KEY_ALIASES = new Map();
KEY_CONFIGS.forEach((config) => {
  KEY_ALIASES.set(config.id.toLowerCase(), config.id);
  config.aliases.forEach((alias) => KEY_ALIASES.set(alias.toLowerCase(), config.id));
});

const state = {
  converterMode: "landing",
  audioWizardStep: "file",
  audioResultTab: "sheets",
  auth: {
    loading: true,
    user: null,
    menuOpen: false,
    error: null
  },
  keyId: "C",
  notation: "abc",
  chordMode: false,
  duration: 1,
  bpm: 96,
  pending: [],
  events: [],
  chordAnalysis: {
    fileName: "",
    duration: 0,
    keyGuess: null,
    segments: [],
    refinedText: "",
    melodyNotes: [],
    foregroundNotes: [],
    backgroundNotes: [],
    neuralNotes: [],
    rhythmHits: [],
    combinedEvents: [],
    tempoEstimate: null,
    tuning: null,
    analysisProfile: "translator",
    feelDensity: "balanced",
    playability: "human",
    enhancerMode: "threePhase",
    enhancementSummary: null,
    quality: null,
    correctionSummary: null,
    inputSignature: null,
    wordingAssignments: []
  },
  scoreAnalysis: {
    fileName: "",
    sourceType: "",
    title: "",
    bpm: null,
    keyGuess: null,
    skyKeyId: null,
    noteCount: 0,
    chordCount: 0,
    simultaneousCount: 0,
    denseChordCount: 0,
    texture: "",
    complexity: "",
    substitutionCount: 0,
    splitCount: 0,
    combinedEvents: [],
    melodyNotes: [],
    backgroundNotes: [],
    chordSegments: [],
    rhythmHits: [],
    warnings: [],
    mappings: [],
    classification: null,
    confidence: null,
    omrModel: "",
    durationBeats: 0
  }
};

const els = {
  authShell: document.querySelector("#authShell"),
  authLoginBtn: document.querySelector("#authLoginBtn"),
  authUserBtn: document.querySelector("#authUserBtn"),
  authAvatar: document.querySelector("#authAvatar"),
  authUserName: document.querySelector("#authUserName"),
  authMenu: document.querySelector("#authMenu"),
  authMenuHomeBtn: document.querySelector("#authMenuHomeBtn"),
  authLogoutBtn: document.querySelector("#authLogoutBtn"),
  landingScreen: document.querySelector("#landingScreen"),
  tryItOutBtn: document.querySelector("#tryItOutBtn"),
  entryScreen: document.querySelector("#entryScreen"),
  chooseAudioBtn: document.querySelector("#chooseAudioBtn"),
  chooseScoreBtn: document.querySelector("#chooseScoreBtn"),
  homeBtn: document.querySelector("#homeBtn"),
  audioWizardPanel: document.querySelector("#audioWizardPanel"),
  audioWizardFileInput: document.querySelector("#audioWizardFileInput"),
  wizardMelodySensitivityInput: document.querySelector("#wizardMelodySensitivityInput"),
  wizardChordSensitivityInput: document.querySelector("#wizardChordSensitivityInput"),
  audioSensitivityNextBtn: document.querySelector("#audioSensitivityNextBtn"),
  wizardFeelDensitySelect: document.querySelector("#wizardFeelDensitySelect"),
  wizardPlayabilitySelect: document.querySelector("#wizardPlayabilitySelect"),
  wizardBpmInput: document.querySelector("#wizardBpmInput"),
  wizardAutoBpmInput: document.querySelector("#wizardAutoBpmInput"),
  wizardAutoKeyInput: document.querySelector("#wizardAutoKeyInput"),
  wizardEnhancerSelect: document.querySelector("#wizardEnhancerSelect"),
  audioWizardAnalyzeBtn: document.querySelector("#audioWizardAnalyzeBtn"),
  audioWizardProgressFill: document.querySelector("#audioWizardProgressFill"),
  audioWizardStageText: document.querySelector("#audioWizardStageText"),
  audioWizardTipText: document.querySelector("#audioWizardTipText"),
  audioWizardKeyTitle: document.querySelector("#audioWizardKeyTitle"),
  audioWizardKeyDescription: document.querySelector("#audioWizardKeyDescription"),
  audioShowOutputBtn: document.querySelector("#audioShowOutputBtn"),
  audioPlayResultBtn: document.querySelector("#audioPlayResultBtn"),
  audioRestartWizardBtn: document.querySelector("#audioRestartWizardBtn"),
  audioResultTabs: document.querySelector("#audioResultTabs"),
  audioTabSheetsBtn: document.querySelector("#audioTabSheetsBtn"),
  audioTabDetailsBtn: document.querySelector("#audioTabDetailsBtn"),
  audioTabTimingBtn: document.querySelector("#audioTabTimingBtn"),
  keySelect: document.querySelector("#keySelect"),
  notationSelect: document.querySelector("#notationSelect"),
  durationSelect: document.querySelector("#durationSelect"),
  bpmInput: document.querySelector("#bpmInput"),
  pianoGrid: document.querySelector("#pianoGrid"),
  pendingChord: document.querySelector("#pendingChord"),
  addChordBtn: document.querySelector("#addChordBtn"),
  singleModeBtn: document.querySelector("#singleModeBtn"),
  chordModeBtn: document.querySelector("#chordModeBtn"),
  restBtn: document.querySelector("#restBtn"),
  barBtn: document.querySelector("#barBtn"),
  lineBtn: document.querySelector("#lineBtn"),
  undoBtn: document.querySelector("#undoBtn"),
  clearBtn: document.querySelector("#clearBtn"),
  playBtn: document.querySelector("#playBtn"),
  stopBtn: document.querySelector("#stopBtn"),
  saveBtn: document.querySelector("#saveBtn"),
  loadBtn: document.querySelector("#loadBtn"),
  titleInput: document.querySelector("#titleInput"),
  authorInput: document.querySelector("#authorInput"),
  timeline: document.querySelector("#sheetTimeline"),
  sheetMeta: document.querySelector("#sheetMeta"),
  statusText: document.querySelector("#statusText"),
  keyMatrix: document.querySelector("#keyMatrix"),
  keyAliasText: document.querySelector("#keyAliasText"),
  setupText: document.querySelector("#setupText"),
  placesList: document.querySelector("#placesList"),
  aliasesText: document.querySelector("#aliasesText"),
  importText: document.querySelector("#importText"),
  importAbcBtn: document.querySelector("#importAbcBtn"),
  importNumbersBtn: document.querySelector("#importNumbersBtn"),
  exportFormat: document.querySelector("#exportFormat"),
  exportTitle: document.querySelector("#exportTitle"),
  exportSubtitle: document.querySelector("#exportSubtitle"),
  exportText: document.querySelector("#exportText"),
  copyExportBtn: document.querySelector("#copyExportBtn"),
  audioFileInput: document.querySelector("#audioFileInput"),
  analyzeAudioBtn: document.querySelector("#analyzeAudioBtn"),
  autoTuneBtn: document.querySelector("#autoTuneBtn"),
  refineChordsBtn: document.querySelector("#refineChordsBtn"),
  importCombinedBtn: document.querySelector("#importCombinedBtn"),
  importMelodyBtn: document.querySelector("#importMelodyBtn"),
  importChordsBtn: document.querySelector("#importChordsBtn"),
  analysisWindowSelect: document.querySelector("#analysisWindowSelect"),
  minChordSelect: document.querySelector("#minChordSelect"),
  chordSensitivityInput: document.querySelector("#chordSensitivityInput"),
  melodySensitivityInput: document.querySelector("#melodySensitivityInput"),
  analysisProfileSelect: document.querySelector("#analysisProfileSelect"),
  feelDensitySelect: document.querySelector("#feelDensitySelect"),
  playabilitySelect: document.querySelector("#playabilitySelect"),
  enhancerSelect: document.querySelector("#enhancerSelect"),
  audioStatus: document.querySelector("#audioStatus"),
  detectedKeyText: document.querySelector("#detectedKeyText"),
  useDetectedKeyBtn: document.querySelector("#useDetectedKeyBtn"),
  estimatedBpmText: document.querySelector("#estimatedBpmText"),
  useEstimatedBpmBtn: document.querySelector("#useEstimatedBpmBtn"),
  chordCountText: document.querySelector("#chordCountText"),
  melodyCountText: document.querySelector("#melodyCountText"),
  rhythmCountText: document.querySelector("#rhythmCountText"),
  combinedCountText: document.querySelector("#combinedCountText"),
  playableCountText: document.querySelector("#playableCountText"),
  matchScoreText: document.querySelector("#matchScoreText"),
  recoveredCountText: document.querySelector("#recoveredCountText"),
  audioDurationText: document.querySelector("#audioDurationText"),
  chordOutputText: document.querySelector("#chordOutputText"),
  chordResultList: document.querySelector("#chordResultList"),
  melodyOutputText: document.querySelector("#melodyOutputText"),
  melodyResultList: document.querySelector("#melodyResultList"),
  rhythmOutputText: document.querySelector("#rhythmOutputText"),
  rhythmResultList: document.querySelector("#rhythmResultList"),
  foregroundOutputText: document.querySelector("#foregroundOutputText"),
  backgroundOutputText: document.querySelector("#backgroundOutputText"),
  foregroundResultList: document.querySelector("#foregroundResultList"),
  backgroundResultList: document.querySelector("#backgroundResultList"),
  combinedOutputText: document.querySelector("#combinedOutputText"),
  combinedResultList: document.querySelector("#combinedResultList"),
  wordingInputText: document.querySelector("#wordingInputText"),
  alignWordingBtn: document.querySelector("#alignWordingBtn"),
  importWordingBtn: document.querySelector("#importWordingBtn"),
  wordingResultList: document.querySelector("#wordingResultList"),
  scoreFileInput: document.querySelector("#scoreFileInput"),
  analyzeScoreBtn: document.querySelector("#analyzeScoreBtn"),
  importScoreBtn: document.querySelector("#importScoreBtn"),
  scoreKeyStrategySelect: document.querySelector("#scoreKeyStrategySelect"),
  scoreArrangementSelect: document.querySelector("#scoreArrangementSelect"),
  scoreMaxKeysSelect: document.querySelector("#scoreMaxKeysSelect"),
  scoreStatus: document.querySelector("#scoreStatus"),
  scoreKeyText: document.querySelector("#scoreKeyText"),
  scoreBpmText: document.querySelector("#scoreBpmText"),
  scoreNoteCountText: document.querySelector("#scoreNoteCountText"),
  scoreChordCountText: document.querySelector("#scoreChordCountText"),
  scoreTextureText: document.querySelector("#scoreTextureText"),
  scoreSimultaneousCountText: document.querySelector("#scoreSimultaneousCountText"),
  scoreSubstitutionCountText: document.querySelector("#scoreSubstitutionCountText"),
  scoreSplitCountText: document.querySelector("#scoreSplitCountText"),
  scoreCombinedCountText: document.querySelector("#scoreCombinedCountText"),
  scoreSourceText: document.querySelector("#scoreSourceText"),
  scoreOutputText: document.querySelector("#scoreOutputText"),
  scoreResultList: document.querySelector("#scoreResultList"),
  scoreWarningsText: document.querySelector("#scoreWarningsText")
};

let audioContext;
let scheduledTimers = [];
let activeOscillators = [];
let audioGraph = null;
let playbackScheduler = null;
let playbackSessionId = 0;
let activePlaybackSource = null;
let renderedPlaybackCache = null;
const skyPianoSampleCache = new Map();
const AUDIO_WIZARD_TIPS = [
  "Sky music tip: leave space between phrases so the 15-button grid can breathe.",
  "For vocal songs, melody sensitivity decides how strongly the lead line is followed.",
  "Human 2-key playability usually sounds cleaner for real Sky performances.",
  "Balanced feel keeps rhythm support without filling every beat.",
  "Auto tune can help after analysis if the melody feels shifted from the Sky key.",
  "Combined import is for song feel; melody import is cleaner for simple tunes.",
  "Timing enhancer shapes rests and note lengths so fast parts do not feel random."
];

function currentConfig() {
  return KEY_CONFIGS.find((config) => config.id === state.keyId) || KEY_CONFIGS[0];
}

function flattenRows(rows) {
  return rows.flat();
}

function getButton(id) {
  return SKY_BUTTONS[id - 1];
}

function getCellNote(id) {
  return flattenRows(currentConfig().rows)[id - 1];
}

function normalizePc(pc) {
  return ((pc % 12) + 12) % 12;
}

function noteNameToPc(note) {
  return NOTE_TO_PC[note] ?? 0;
}

function prefersFlatNames(keyId = state.keyId) {
  return FLAT_KEY_IDS.has(keyId);
}

function noteNameForPc(pc, keyId = state.keyId) {
  const names = prefersFlatNames(keyId) ? PC_NAMES_FLAT : PC_NAMES_SHARP;
  return names[normalizePc(pc)];
}

function chordLabel(rootPc, template, keyId = state.keyId) {
  if (!template) return "N.C.";
  return `${noteNameForPc(rootPc, keyId)}${template.suffix}`;
}

function chordLabelWithBass(rootPc, template, bassPc, keyId = state.keyId) {
  const label = chordLabel(rootPc, template, keyId);
  if (label === "N.C." || !Number.isFinite(bassPc) || normalizePc(bassPc) === normalizePc(rootPc)) return label;
  return `${label}/${noteNameForPc(bassPc, keyId)}`;
}

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const wholeSeconds = Math.floor(safeSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(wholeSeconds).padStart(2, "0")}`;
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return "-";
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  return `${formatTime(seconds)}.${String(Math.round((seconds % 1) * 10))}`;
}

function labelForButton(button, notation = state.notation) {
  if (notation === "number") return String(button.id);
  if (notation === "note") return getCellNote(button.id);
  if (notation === "keyboard") return button.keyboard;
  return button.abc;
}

function eventLabel(event, notation = state.notation) {
  if (event.type === "rest") return ".";
  if (event.type === "bar") return "|";
  if (event.type === "line") return "line";
  return event.notes.map((id) => labelForButton(getButton(id), notation)).join("+");
}

function setStatus(text) {
  els.statusText.textContent = text;
}

function authDisplayName(user) {
  return (user && (user.name || user.email)) || "Google account";
}

function fallbackAvatar(name) {
  const initial = (name || "S").trim().charAt(0).toUpperCase() || "S";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="#16233f"/><circle cx="48" cy="44" r="30" fill="#73a7ff" opacity=".34"/><text x="48" y="59" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" font-weight="800" fill="#fff">${initial}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function renderAuth() {
  if (!els.authShell) return;
  const user = state.auth.user;
  const signedIn = Boolean(user);
  els.authShell.dataset.authState = state.auth.loading ? "loading" : signedIn ? "signed-in" : "signed-out";
  els.authLoginBtn.hidden = signedIn;
  els.authLoginBtn.disabled = state.auth.loading || Boolean(state.auth.error);
  els.authLoginBtn.textContent = state.auth.loading
    ? "Checking login"
    : state.auth.error
      ? "Login unavailable"
      : "Login with Google";
  els.authUserBtn.hidden = !signedIn;
  els.authMenu.hidden = !signedIn || !state.auth.menuOpen;
  els.authUserBtn.setAttribute("aria-expanded", signedIn && state.auth.menuOpen ? "true" : "false");

  if (!signedIn) return;
  const name = authDisplayName(user);
  els.authUserName.textContent = name;
  els.authAvatar.src = user.picture || fallbackAvatar(name);
  els.authAvatar.alt = "";
  els.authUserBtn.title = user.email ? `${name} (${user.email})` : name;
}

async function loadAuthUser() {
  renderAuth();
  try {
    const response = await fetch("/api/auth/user", { credentials: "same-origin" });
    const data = await response.json();
    state.auth.user = data.user || null;
    state.auth.error = data.configured === false ? "Cohesivity tenant not configured" : data.error || null;
  } catch (error) {
    state.auth.user = null;
    state.auth.error = error && error.message ? error.message : "Auth unavailable";
  } finally {
    state.auth.loading = false;
    state.auth.menuOpen = false;
    renderAuth();
  }
}

function startLogin() {
  if (state.auth.loading || state.auth.error) return;
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.delete("auth_error");
  const returnTo = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
  window.location.href = `/api/auth/login?return_to=${encodeURIComponent(returnTo || "/")}`;
}

async function logoutAuth() {
  state.auth.loading = true;
  state.auth.menuOpen = false;
  renderAuth();
  try {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
  } catch {
    // Local UI should still clear when the browser cannot reach the logout endpoint.
  }
  state.auth.user = null;
  state.auth.error = null;
  state.auth.loading = false;
  renderAuth();
  setStatus("Logged out");
}

function closeAuthMenu() {
  if (!state.auth.menuOpen) return;
  state.auth.menuOpen = false;
  renderAuth();
}

function renderKeyOptions() {
  els.keySelect.innerHTML = "";
  KEY_CONFIGS.forEach((config) => {
    const option = document.createElement("option");
    option.value = config.id;
    option.textContent = config.label;
    els.keySelect.append(option);
  });
}

function renderPiano() {
  els.pianoGrid.innerHTML = "";
  SKY_BUTTONS.forEach((button) => {
    const key = document.createElement("button");
    key.type = "button";
    key.className = `sky-key row-${button.row.toLowerCase()}`;
    key.dataset.id = String(button.id);
    if (state.pending.includes(button.id)) key.classList.add("selected");
    key.setAttribute("aria-label", `${button.abc} ${getCellNote(button.id)}`);

    const main = document.createElement("span");
    main.className = "main-label";
    main.textContent = labelForButton(button);

    const sub = document.createElement("span");
    sub.className = "sub-label";
    sub.textContent = state.notation === "note" ? button.abc : getCellNote(button.id);

    key.append(main, sub);
    key.addEventListener("click", () => handleButtonPress(button.id));
    els.pianoGrid.append(key);
  });
}

function renderKeyData() {
  const config = currentConfig();
  els.keyAliasText.textContent = config.label;
  els.setupText.textContent = config.setup;
  els.aliasesText.textContent = config.aliases.join(", ");

  els.keyMatrix.innerHTML = "";
  flattenRows(config.rows).forEach((note, index) => {
    const cell = document.createElement("div");
    cell.className = "matrix-cell";
    cell.textContent = `${SKY_BUTTONS[index].abc} ${note}`;
    els.keyMatrix.append(cell);
  });

  els.placesList.innerHTML = "";
  config.places.forEach((place) => {
    const item = document.createElement("li");
    item.textContent = place;
    els.placesList.append(item);
  });
}

function renderPending() {
  if (!state.pending.length) {
    els.pendingChord.textContent = "Empty";
  } else {
    els.pendingChord.textContent = state.pending
      .map((id) => eventLabel({ type: "note", notes: [id] }))
      .join(" + ");
  }
  els.addChordBtn.disabled = state.pending.length === 0;
}

function makeMiniGrid(notes) {
  const mini = document.createElement("div");
  mini.className = "mini-grid";
  SKY_BUTTONS.forEach((button) => {
    const dot = document.createElement("span");
    dot.className = notes.includes(button.id) ? "mini-dot on" : "mini-dot";
    mini.append(dot);
  });
  return mini;
}

function scrollTimelineToActiveTile(tile) {
  if (!tile || !els.timeline) return;
  const timeline = els.timeline;
  const tileTop = tile.offsetTop;
  const tileBottom = tileTop + tile.offsetHeight;
  const viewTop = timeline.scrollTop;
  const viewBottom = viewTop + timeline.clientHeight;
  const padding = 28;
  if (tileTop >= viewTop + padding && tileBottom <= viewBottom - padding) return;

  const targetTop = Math.max(0, tileTop - Math.max(0, (timeline.clientHeight - tile.offsetHeight) * 0.42));
  timeline.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });
}

function renderTimeline(activeIndex = -1, options = {}) {
  els.timeline.innerHTML = "";
  if (!state.events.length) {
    const empty = document.createElement("div");
    empty.className = "event-tile rest";
    empty.textContent = "Empty";
    els.timeline.append(empty);
  }

  let activeTile = null;
  state.events.forEach((event, index) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `event-tile ${event.type}`;
    if (index === activeIndex) {
      tile.classList.add("playing");
      activeTile = tile;
    }
    tile.title = "Remove this box";
    tile.addEventListener("click", () => {
      state.events.splice(index, 1);
      renderAll();
      setStatus("Removed box");
    });

    if (event.type === "note") {
      tile.append(makeMiniGrid(event.notes));
      const label = document.createElement("span");
      label.className = "event-label";
      label.textContent = eventLabel(event);
      const duration = document.createElement("span");
      duration.className = "event-duration";
      duration.textContent = `${event.duration} beat${event.duration === 1 ? "" : "s"}`;
      tile.append(label, duration);
    } else if (event.type === "rest") {
      tile.textContent = ".";
    } else if (event.type === "bar") {
      tile.textContent = "|";
    } else {
      tile.textContent = "";
      tile.setAttribute("aria-label", "Line break");
    }

    els.timeline.append(tile);
  });

  const count = state.events.filter((event) => event.type !== "line").length;
  els.sheetMeta.textContent = `${count} box${count === 1 ? "" : "es"}`;
  if (options.followActive && activeTile) {
    window.requestAnimationFrame(() => scrollTimelineToActiveTile(activeTile));
  }
}

function renderMode() {
  els.singleModeBtn.classList.toggle("active", !state.chordMode);
  els.chordModeBtn.classList.toggle("active", state.chordMode);
}

function renderExport() {
  els.exportText.value = getExportText();
}

function chordPcs(segment) {
  if (!segment || segment.label === "N.C." || !Array.isArray(segment.intervals)) return [];
  return [...new Set(segment.intervals.map((interval) => normalizePc(segment.rootPc + interval)))];
}

function chooseSkyButtonsForPcs(pcs) {
  if (!pcs.length) return null;
  const gridPcs = flattenRows(currentConfig().rows).map(noteNameToPc);
  const options = pcs.map((pc) => {
    return gridPcs
      .map((gridPc, index) => (gridPc === pc ? index + 1 : null))
      .filter((id) => id !== null);
  });

  if (options.some((items) => items.length === 0)) return null;

  let best = null;
  let bestScore = Infinity;

  function search(index, picked) {
    if (index === options.length) {
      const sorted = [...picked].sort((a, b) => a - b);
      const range = sorted[sorted.length - 1] - sorted[0];
      const centerCost = sorted.reduce((sum, id) => sum + Math.abs(id - 8), 0) * 0.08;
      const rowCost = sorted.reduce((sum, id) => sum + Math.floor((id - 1) / 5), 0) * 0.03;
      const score = range + centerCost + rowCost;
      if (score < bestScore) {
        best = sorted;
        bestScore = score;
      }
      return;
    }

    options[index].forEach((id) => {
      if (!picked.includes(id)) {
        picked.push(id);
        search(index + 1, picked);
        picked.pop();
      }
    });
  }

  search(0, []);
  return best;
}

function skyTextForButtons(buttonIds) {
  return buttonIds.map((id) => getButton(id).abc).join("+");
}

function displayChordLabel(segment) {
  if (!segment || segment.label === "N.C.") return "N.C.";
  return `${noteNameForPc(segment.rootPc)}${segment.suffix || ""}`;
}

function mappingForChord(segment) {
  const pcs = chordPcs(segment);
  const buttonIds = chooseSkyButtonsForPcs(pcs);
  if (!buttonIds) return null;
  return {
    buttonIds,
    text: skyTextForButtons(buttonIds)
  };
}

function keyConfigById(keyId) {
  return KEY_CONFIGS.find((config) => config.id === keyId) || currentConfig();
}

function skyMidiForButton(id, keyId = state.keyId) {
  return keyConfigById(keyId).rootMidi + NOTE_STEPS[id - 1];
}

function chooseSkyButtonForMidi(midi, keyId = state.keyId) {
  let best = null;
  SKY_BUTTONS.forEach((button) => {
    const skyMidi = skyMidiForButton(button.id, keyId);
    const distance = Math.abs(midi - skyMidi);
    const centerCost = Math.abs(button.id - 8) * 0.025;
    const score = distance + centerCost;
    if (!best || score < best.score) {
      best = {
        buttonId: button.id,
        skyMidi,
        distance,
        score
      };
    }
  });
  return best;
}

function melodyMapping(note) {
  if (!note) return null;
  const sourceMidi = note.rawMidi || note.midi;
  const mapping = chooseSkyButtonForMidi(sourceMidi);
  return {
    ...mapping,
    button: getButton(mapping.buttonId),
    abc: getButton(mapping.buttonId).abc,
    noteName: getCellNote(mapping.buttonId)
  };
}

function melodyNoteLabel(note) {
  const roundedMidi = Math.round(note.rawMidi || note.midi);
  return noteNameForPc(roundedMidi);
}

function playableMelodyNotes() {
  return state.chordAnalysis.melodyNotes.filter((note) => melodyMapping(note));
}

function playableChordSegments() {
  return state.chordAnalysis.segments.filter((segment) => segment.label !== "N.C." && mappingForChord(segment));
}

function findChordSegmentAtTime(segments, time) {
  if (!segments || !segments.length) return null;
  let low = 0;
  let high = segments.length - 1;
  let best = segments[0];

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const segment = segments[mid];
    if (time < segment.start) {
      high = mid - 1;
    } else if (time > segment.end) {
      best = segment;
      low = mid + 1;
    } else {
      return segment;
    }
  }

  return best;
}

function chooseSkyButtonForPc(pc, used = []) {
  const gridPcs = flattenRows(currentConfig().rows).map(noteNameToPc);
  let best = null;
  gridPcs.forEach((gridPc, index) => {
    const buttonId = index + 1;
    if (used.includes(buttonId)) return;

    const direct = Math.abs(gridPc - pc);
    const pitchDistance = Math.min(direct, 12 - direct);
    const centerCost = Math.abs(buttonId - 8) * 0.035;
    const rowCost = Math.floor(index / 5) * 0.02;
    const score = pitchDistance + centerCost + rowCost;
    if (!best || score < best.score) {
      best = { buttonId, score, pitchDistance };
    }
  });
  return best;
}

function chordAccentButtons(segment, density, excludeButtonId = null) {
  if (!segment || segment.label === "N.C.") return [];
  const settings = feelDensitySettings(density);
  const intervals = Array.isArray(segment.intervals) ? segment.intervals : [];
  const priorities = [0, 7, 4, 3, 10, 11, 9, 2, 5, 6, 8];
  const orderedIntervals = priorities.filter((interval) => intervals.includes(interval));
  const used = excludeButtonId ? [excludeButtonId] : [];
  const buttons = [];

  orderedIntervals.forEach((interval) => {
    if (buttons.length >= settings.maxSimultaneous) return;
    const picked = chooseSkyButtonForPc(normalizePc(segment.rootPc + interval), used);
    if (!picked) return;
    used.push(picked.buttonId);
    if (picked.pitchDistance <= 1 || interval === 0) buttons.push(picked.buttonId);
  });

  if (!buttons.length) {
    const root = chooseSkyButtonForPc(segment.rootPc, used);
    if (root) buttons.push(root.buttonId);
  }

  return [...new Set(buttons)].sort((a, b) => a - b);
}

function nearestRhythmHit(time, rhythmHits, maxDistance) {
  let best = null;
  rhythmHits.forEach((hit) => {
    const distance = Math.abs(hit.time - time);
    if (distance <= maxDistance && (!best || distance < best.distance)) {
      best = { ...hit, distance };
    }
  });
  return best;
}

function addCombinedAnchor(anchors, anchor) {
  if (!anchor.notes || !anchor.notes.length || !Number.isFinite(anchor.time)) return;
  anchors.push({
    time: Math.max(0, anchor.time),
    duration: Math.max(0.04, anchor.duration || 0.12),
    notes: [...new Set(anchor.notes)].sort((a, b) => a - b),
    kind: anchor.kind,
    label: anchor.label || anchor.kind,
    strength: anchor.strength || 0,
    melodyButtonId: anchor.melodyButtonId || null
  });
}

function anchorPriority(anchor) {
  const kind = anchor.kind || "";
  const strength = Math.max(0, Math.min(1, anchor.strength || 0));
  if (kind.includes("melody")) return 5 + strength;
  if (kind.includes("theme")) return 4 + strength;
  if (kind.includes("background-chord")) return 2.8 + strength;
  if (kind.includes("rhythm")) return 2.4 + strength;
  if (kind.includes("background")) return 2 + strength;
  return 1 + strength;
}

function trimAnchorNotesForPlayability(notes, melodyButtonId, playability) {
  const settings = playabilitySettings(playability);
  const unique = [...new Set(notes)]
    .filter((buttonId) => Number.isInteger(buttonId) && buttonId >= 1 && buttonId <= 15);
  const limit = Math.max(1, settings.maxSimultaneous);
  if (unique.length <= limit) return unique.sort((a, b) => a - b);

  const anchorButton = melodyButtonId || 8;
  return unique
    .sort((a, b) => {
      const aMelody = a === melodyButtonId ? -1 : 0;
      const bMelody = b === melodyButtonId ? -1 : 0;
      if (aMelody !== bMelody) return aMelody - bMelody;
      const aDistance = Math.abs(a - anchorButton);
      const bDistance = Math.abs(b - anchorButton);
      if (aDistance !== bDistance) return aDistance - bDistance;
      return Math.abs(a - 8) - Math.abs(b - 8);
    })
    .slice(0, limit)
    .sort((a, b) => a - b);
}

function sameAnchorNotes(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  return a.every((item, index) => item === b[index]);
}

function compressAnchorsForPlayability(anchors, density, playability, beatSeconds) {
  if (!anchors.length) return anchors;

  const densitySettings = feelDensitySettings(density);
  const settings = playabilitySettings(playability);
  const minMelodyGap = settings.minMelodyGapBeats * beatSeconds;
  const minSupportGap = settings.minSupportGapBeats * beatSeconds;
  const backgroundGap = settings.backgroundEveryBeats * beatSeconds;
  const rhythmGap = settings.rhythmEveryBeats * beatSeconds;
  const trimmed = anchors
    .map((anchor) => ({
      ...anchor,
      notes: trimAnchorNotesForPlayability(anchor.notes, anchor.melodyButtonId, playability)
    }))
    .filter((anchor) => anchor.notes.length)
    .sort((a, b) => a.time - b.time || anchorPriority(b) - anchorPriority(a));

  const kept = [];
  let lastMelodyTime = -Infinity;
  let lastSupportTime = -Infinity;
  let lastBackgroundTime = -Infinity;
  let lastRhythmTime = -Infinity;
  let lastMelodyNotes = null;

  trimmed.forEach((anchor) => {
    const kind = anchor.kind || "";
    const isMelody = kind.includes("melody");
    const isTheme = kind.includes("theme");
    const isBackground = kind.includes("background");
    const isRhythm = kind.includes("rhythm");
    const strength = Math.max(0, anchor.strength || 0);

    if (isMelody) {
      const tooClose = anchor.time - lastMelodyTime < minMelodyGap;
      const duplicate = sameAnchorNotes(anchor.notes, lastMelodyNotes);
      if (tooClose && (duplicate || strength < 0.72)) return;
      kept.push(anchor);
      lastMelodyTime = anchor.time;
      lastMelodyNotes = anchor.notes;
      return;
    }

    if (isBackground && !isTheme && anchor.time - lastBackgroundTime < backgroundGap) return;
    if (isRhythm && anchor.time - lastRhythmTime < rhythmGap) return;
    if (anchor.time - lastSupportTime < minSupportGap && strength < settings.weakAnchorThreshold) return;

    const last = kept[kept.length - 1];
    const collapseWindow = Math.max(densitySettings.collapseSeconds, beatSeconds * 0.08);
    if (last && anchor.time - last.time <= collapseWindow) {
      const mergedNotes = trimAnchorNotesForPlayability(
        [...last.notes, ...anchor.notes],
        last.melodyButtonId || anchor.melodyButtonId,
        playability
      );
      last.melodyButtonId = last.melodyButtonId || anchor.melodyButtonId || null;
      last.notes = mergedNotes;
      last.duration = Math.max(last.duration, anchor.duration);
      last.strength = Math.max(last.strength, anchor.strength);
      last.kind = last.kind.includes(anchor.kind) ? last.kind : `${last.kind}+${anchor.kind}`;
      last.label = last.label.includes(anchor.label) ? last.label : `${last.label}/${anchor.label}`;
    } else {
      kept.push(anchor);
    }

    lastSupportTime = anchor.time;
    if (isBackground) lastBackgroundTime = anchor.time;
    if (isRhythm) lastRhythmTime = anchor.time;
  });

  return kept;
}

function collapseCombinedAnchors(anchors, density, playability = "human") {
  const settings = feelDensitySettings(density);
  const playSettings = playabilitySettings(playability);
  const maxSimultaneous = Math.min(settings.maxSimultaneous, playSettings.maxSimultaneous);
  const collapsed = [];
  anchors
    .sort((a, b) => a.time - b.time || b.strength - a.strength)
    .forEach((anchor) => {
      const last = collapsed[collapsed.length - 1];
      if (last && anchor.time - last.time <= settings.collapseSeconds) {
        last.melodyButtonId = last.melodyButtonId || anchor.melodyButtonId || null;
        const merged = [...new Set([...last.notes, ...anchor.notes])];
        merged.sort((a, b) => {
          const aMelody = a === last.melodyButtonId ? -1 : 0;
          const bMelody = b === last.melodyButtonId ? -1 : 0;
          if (aMelody !== bMelody) return aMelody - bMelody;
          return Math.abs(a - 8) - Math.abs(b - 8);
        });
        last.notes = trimAnchorNotesForPlayability(merged, last.melodyButtonId, playability).slice(0, maxSimultaneous);
        last.duration = Math.max(last.duration, anchor.duration);
        last.strength = Math.max(last.strength, anchor.strength);
        last.kind = last.kind.includes(anchor.kind) ? last.kind : `${last.kind}+${anchor.kind}`;
        last.label = last.label.includes(anchor.label) ? last.label : `${last.label}/${anchor.label}`;
        return;
      }
      collapsed.push({ ...anchor });
    });
  return collapsed;
}

function thinCombinedAnchors(anchors, maxCount) {
  if (anchors.length <= maxCount) return anchors;
  const melodyAnchors = anchors.filter((anchor) => anchor.kind.includes("melody"));
  if (melodyAnchors.length >= maxCount) {
    const selected = [];
    const step = melodyAnchors.length / maxCount;
    for (let index = 0; index < maxCount; index += 1) {
      selected.push(melodyAnchors[Math.floor(index * step)]);
    }
    return selected.sort((a, b) => a.time - b.time);
  }
  const rhythmAnchors = anchors
    .filter((anchor) => !anchor.kind.includes("melody"))
    .sort((a, b) => b.strength - a.strength);
  const keepRhythm = Math.max(0, maxCount - melodyAnchors.length);
  return [...melodyAnchors, ...rhythmAnchors.slice(0, keepRhythm)].sort((a, b) => a.time - b.time);
}

function buildCombinedArrangement(melodyNotes, chordSegments, rhythmHits, tempoEstimate, density, backgroundNotes = [], playability = "human") {
  const settings = feelDensitySettings(density);
  const playSettings = playabilitySettings(playability);
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const anchors = [];
  const harmonyButtons = Math.min(settings.harmonyButtons, playSettings.harmonyButtons);
  const rhythmButtons = Math.min(settings.rhythmButtons, playSettings.rhythmButtons);

  melodyNotes.forEach((note) => {
    const mapping = melodyMapping(note);
    if (!mapping) return;

    const segment = findChordSegmentAtTime(chordSegments, note.start);
    const nearbyHit = nearestRhythmHit(note.start, rhythmHits, Math.max(settings.collapseSeconds, beatSeconds * 0.18));
    const notes = [mapping.buttonId];
    const addHarmony = harmonyButtons > 0 && nearbyHit && nearbyHit.strength >= Math.min(0.94, settings.melodyHarmonyStrength + playSettings.melodyHarmonyBoost);
    if (addHarmony) {
      chordAccentButtons(segment, density, mapping.buttonId)
        .slice(0, harmonyButtons)
        .forEach((buttonId) => notes.push(buttonId));
    }

    addCombinedAnchor(anchors, {
      time: note.start,
      duration: Math.max(settings.minEventSeconds, note.end - note.start),
      notes,
      kind: addHarmony ? "melody+harmony" : "melody",
      label: melodyNoteLabel(note),
      strength: note.confidence || 0.5,
      melodyButtonId: mapping.buttonId
    });
  });

  backgroundNotes.forEach((note) => {
    if ((note.confidence || 0) < 0.2 && density !== "full") return;
    const segment = findChordSegmentAtTime(chordSegments, note.start);
    const buttons = chordAccentButtons(segment, density, note.buttonId).slice(0, harmonyButtons);
    const notes = [note.buttonId, ...buttons];
    addCombinedAnchor(anchors, {
      time: note.start,
      duration: Math.max(settings.minEventSeconds, note.end - note.start),
      notes,
      kind: note.source && note.source.includes("theme") ? "background+theme" : "background",
      label: melodyNoteLabel(note),
      strength: Math.max(0.18, note.confidence || 0.3),
      melodyButtonId: note.buttonId
    });
  });

  rhythmHits.forEach((hit) => {
    if (hit.strength < settings.rhythmThreshold) return;
    const segment = findChordSegmentAtTime(chordSegments, hit.time);
    const buttons = chordAccentButtons(segment, density)
      .slice(0, rhythmButtons);
    if (!buttons.length) return;

    addCombinedAnchor(anchors, {
      time: hit.time,
      duration: beatSeconds * (hit.strength >= 0.76 ? 0.5 : 0.28),
      notes: buttons,
      kind: "rhythm",
      label: hit.beatLabel,
      strength: hit.strength
    });
  });

  if (anchors.length < 2 && chordSegments.length) {
    chordSegments.forEach((segment) => {
      if (segment.label === "N.C.") return;
      const buttons = chordAccentButtons(segment, density).slice(0, Math.max(1, rhythmButtons));
      if (!buttons.length) return;
      const pulseStep = beatSeconds * playSettings.chordPulseBeats;
      for (let time = segment.start; time < segment.end; time += pulseStep) {
        addCombinedAnchor(anchors, {
          time,
          duration: beatSeconds * 0.5,
          notes: buttons,
          kind: "background-chord",
          label: displayChordLabel(segment),
          strength: Math.max(0.28, segment.score || 0.3)
        });
      }
    });
  }

  if (!anchors.length) return [];

  const playableAnchors = compressAnchorsForPlayability(anchors, density, playability, beatSeconds);
  const maxCombinedEvents = Math.min(settings.maxCombinedEvents, playSettings.maxCombinedEvents);
  const collapsed = thinCombinedAnchors(collapseCombinedAnchors(playableAnchors, density, playability), maxCombinedEvents);
  const events = [];
  const stopThreshold = Math.max(0.09, Math.min(0.5, beatSeconds * 0.42));
  let cursor = collapsed[0].time;
  let nextBarBeat = COMBINED_BEATS_PER_BAR;

  collapsed.forEach((anchor, index) => {
    const gap = anchor.time - cursor;
    if (gap >= stopThreshold) {
      events.push({
        type: "rest",
        duration: quantizeBeatDuration(gap, beatSeconds, 0.25),
        time: cursor,
        kind: "rest"
      });
    }

    const nextAnchor = collapsed[index + 1];
    const gapToNext = nextAnchor ? nextAnchor.time - anchor.time : anchor.duration;
    const naturalDuration = Math.max(settings.minEventSeconds, anchor.duration);
    const eventSeconds = Math.max(settings.minEventSeconds, Math.min(naturalDuration, Math.max(settings.minEventSeconds, gapToNext)));
    const beatIndex = Math.floor(anchor.time / Math.max(0.001, beatSeconds));

    if (beatIndex >= nextBarBeat && events.length && events[events.length - 1].type !== "bar") {
      events.push({ type: "bar" });
      nextBarBeat = Math.floor(beatIndex / COMBINED_BEATS_PER_BAR + 1) * COMBINED_BEATS_PER_BAR;
    }

    events.push({
      type: "note",
      notes: anchor.notes,
      duration: quantizeBeatDuration(eventSeconds, beatSeconds, 0.25),
      time: anchor.time,
      kind: anchor.kind,
      label: anchor.label,
      strength: anchor.strength
    });
    cursor = anchor.time + eventSeconds;
  });

  return events;
}

function rebuildCombinedAnalysis() {
  const analysis = state.chordAnalysis;
  if (!analysis) return;
  const density = els.feelDensitySelect ? els.feelDensitySelect.value : analysis.feelDensity || "balanced";
  const playability = els.playabilitySelect ? els.playabilitySelect.value : analysis.playability || "human";
  const enhancerMode = els.enhancerSelect ? els.enhancerSelect.value : analysis.enhancerMode || "threePhase";
  const rawEvents = buildCombinedArrangement(
    analysis.melodyNotes || [],
    analysis.segments || [],
    analysis.rhythmHits || [],
    analysis.tempoEstimate,
    density,
    analysis.backgroundNotes || [],
    playability
  );
  const enhanced = enhanceSheetFlow(rawEvents, analysis.tempoEstimate, enhancerMode);
  analysis.feelDensity = density;
  analysis.playability = playability;
  analysis.enhancerMode = enhancerMode;
  analysis.combinedEvents = enhanced.events;
  analysis.enhancementSummary = enhanced.summary;
}

function renderWordingAssignments() {
  const assignments = state.chordAnalysis.wordingAssignments || [];
  if (!els.wordingResultList) return;

  els.importWordingBtn.disabled = assignments.length === 0;

  if (!assignments.length) {
    renderVisualTimingMap(els.wordingResultList, [], "No words aligned");
    return;
  }

  renderVisualTimingMap(els.wordingResultList, assignments.map((assignment) => {
    const mapping = melodyMapping(assignment.note);
    return {
      start: assignment.note.start,
      end: assignment.note.end,
      label: assignment.word,
      detail: melodyNoteLabel(assignment.note),
      meta: `confidence ${(assignment.note.confidence || 0).toFixed(2)}`,
      buttonIds: [mapping.buttonId],
      kind: "wording"
    };
  }), "No words aligned");
}

function timingMapDuration(items) {
  const analysisDuration = state.chordAnalysis && state.chordAnalysis.duration ? state.chordAnalysis.duration : 0;
  const maxEnd = items.reduce((max, item) => Math.max(max, Number(item.end) || Number(item.start) || 0), 0);
  return Math.max(1, analysisDuration, maxEnd);
}

function makeTimingKeyChips(buttonIds = []) {
  const wrap = document.createElement("div");
  wrap.className = "timing-keys";
  const uniqueIds = [...new Set(buttonIds.filter((id) => Number.isFinite(id)))].slice(0, 5);

  if (!uniqueIds.length) {
    const chip = document.createElement("span");
    chip.className = "timing-key-chip muted";
    chip.textContent = "no key";
    wrap.append(chip);
    return wrap;
  }

  uniqueIds.forEach((id) => {
    const chip = document.createElement("span");
    chip.className = "timing-key-chip";
    chip.textContent = `${getButton(id).abc} ${getCellNote(id)}`;
    wrap.append(chip);
  });

  return wrap;
}

function renderVisualTimingMap(container, items, emptyText) {
  if (!container) return;
  const safeItems = (items || [])
    .filter((item) => Number.isFinite(item.start) || Number.isFinite(item.end))
    .slice(0, 900);
  container.classList.add("visual-map-list");
  container.innerHTML = "";

  if (!safeItems.length) {
    const empty = document.createElement("div");
    empty.className = "timing-empty";
    empty.textContent = emptyText;
    container.append(empty);
    return;
  }

  const duration = timingMapDuration(safeItems);
  safeItems.forEach((item) => {
    const start = Math.max(0, Number(item.start) || 0);
    const end = Math.max(start + 0.04, Number(item.end) || start + Number(item.duration) || start + 0.18);
    const left = Math.max(0, Math.min(98, (start / duration) * 100));
    const width = Math.max(1.2, Math.min(100 - left, ((end - start) / duration) * 100));
    const card = document.createElement("div");
    card.className = `timing-card ${item.kind ? `timing-${String(item.kind).replace(/[^a-z0-9_-]/gi, "-").toLowerCase()}` : ""}`.trim();

    const head = document.createElement("div");
    head.className = "timing-card-head";

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = `${formatTime(start)}-${formatTime(end)}`;

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = item.label || "Event";

    const detail = document.createElement("span");
    detail.className = "sky";
    detail.textContent = item.detail || item.kind || "mapped";

    const meta = document.createElement("span");
    meta.className = "score";
    meta.textContent = item.meta || "";

    head.append(time, name, detail, meta);

    const lane = document.createElement("div");
    lane.className = "timing-lane";
    const bar = document.createElement("span");
    bar.className = "timing-bar";
    bar.style.left = `${left.toFixed(2)}%`;
    bar.style.width = `${width.toFixed(2)}%`;
    lane.append(bar);

    card.append(head, lane, makeTimingKeyChips(item.buttonIds || []));
    container.append(card);
  });
}

function renderRhythmAnalysis() {
  const rhythmHits = state.chordAnalysis.rhythmHits || [];
  if (!els.rhythmResultList) return;

  els.rhythmCountText.textContent = String(rhythmHits.length);

  if (!rhythmHits.length) {
    els.rhythmOutputText.value = "";
    renderVisualTimingMap(els.rhythmResultList, [], "No rhythm hits yet");
    return;
  }

  els.rhythmOutputText.value = rhythmHits
    .map((hit) => `${formatTime(hit.time)} | beat ${hit.beatLabel} | strength ${hit.strength.toFixed(2)}`)
    .join("\n");

  renderVisualTimingMap(els.rhythmResultList, rhythmHits.map((hit) => {
    const segment = findChordSegmentAtTime(state.chordAnalysis.segments || [], hit.time);
    const buttonIds = chordAccentButtons(segment, state.chordAnalysis.feelDensity || "balanced").slice(0, 3);
    return {
      start: hit.time,
      end: hit.time + Math.max(0.12, 60 / Math.max(30, state.bpm || 96) * 0.35),
      label: `Beat ${hit.beatLabel}`,
      detail: hit.strength >= 0.72 ? "strong pulse" : "pulse",
      meta: hit.strength.toFixed(2),
      buttonIds,
      kind: "rhythm"
    };
  }), "No rhythm hits yet");
}

function trackLineForNote(note) {
  const mapping = melodyMapping(note);
  const duration = Math.max(0.01, note.end - note.start);
  const theme = note.themeStrength ? ` | theme ${note.themeStrength.toFixed(2)}` : "";
  return `${formatTime(note.start)}-${formatTime(note.end)} | ${melodyNoteLabel(note)} | ${mapping.abc}:${mapping.noteName} | ${duration.toFixed(2)}s | ${note.source || "track"}${theme}`;
}

function renderSeparatedTracks() {
  if (!els.foregroundOutputText || !els.backgroundOutputText) return;
  const foreground = state.chordAnalysis.foregroundNotes || [];
  const background = state.chordAnalysis.backgroundNotes || [];
  els.foregroundOutputText.value = foreground.length
    ? foreground.map(trackLineForNote).join("\n")
    : "";
  els.backgroundOutputText.value = background.length
    ? background.map(trackLineForNote).join("\n")
    : "";
  renderVisualTimingMap(els.foregroundResultList, foreground.map((note) => {
    const mapping = melodyMapping(note);
    return {
      start: note.start,
      end: note.end,
      label: melodyNoteLabel(note),
      detail: note.themeStrength ? `theme ${note.themeStrength.toFixed(2)}` : note.source || "foreground",
      meta: `${Math.max(0.01, note.end - note.start).toFixed(2)}s`,
      buttonIds: [mapping.buttonId],
      kind: "foreground"
    };
  }), "No foreground notes yet");
  renderVisualTimingMap(els.backgroundResultList, background.map((note) => {
    const mapping = melodyMapping(note);
    return {
      start: note.start,
      end: note.end,
      label: melodyNoteLabel(note),
      detail: note.themeStrength ? `theme ${note.themeStrength.toFixed(2)}` : note.source || "background",
      meta: `${Math.max(0.01, note.end - note.start).toFixed(2)}s`,
      buttonIds: [mapping.buttonId],
      kind: "background"
    };
  }), "No background notes yet");
}

function renderCombinedAnalysis() {
  const combinedEvents = state.chordAnalysis.combinedEvents || [];
  if (!els.combinedResultList) return;

  const importable = combinedEvents.some((event) => event.type === "note");
  els.combinedCountText.textContent = String(combinedEvents.filter((event) => event.type !== "bar" && event.type !== "line").length);
  els.importCombinedBtn.disabled = !importable;

  if (!combinedEvents.length) {
    els.combinedOutputText.value = "";
    renderVisualTimingMap(els.combinedResultList, [], "No combined sheet yet");
    return;
  }

  els.combinedOutputText.value = joinTokens(combinedEvents, abcForEvent);
  const beatSeconds = 60 / Math.max(30, Number(state.bpm) || 96);
  let cursor = 0;
  renderVisualTimingMap(els.combinedResultList, combinedEvents.map((event) => {
    const duration = event.type === "note" || event.type === "rest"
      ? Math.max(0.04, Number(event.duration) || 0.25) * beatSeconds
      : 0;
    const start = Number.isFinite(event.time) ? event.time : cursor;
    cursor = start + duration;
    if (event.type === "bar" || event.type === "line") return null;
    return {
      start,
      end: start + duration,
      label: eventLabel(event),
      detail: event.kind || event.type,
      meta: `${event.duration || 0}b`,
      buttonIds: event.type === "note" ? event.notes : [],
      kind: event.kind || event.type
    };
  }).filter(Boolean), "No combined sheet yet");
}

function renderChordAnalysis() {
  if (!els.chordResultList) return;
  const analysis = state.chordAnalysis;
  const segments = analysis.segments;
  const playable = playableChordSegments();
  const melodyNotes = analysis.melodyNotes || [];
  const playableMelody = playableMelodyNotes();
  const tempoEstimate = analysis.tempoEstimate;

  els.audioDurationText.textContent = analysis.duration ? formatTime(analysis.duration) : "-";
  els.chordCountText.textContent = String(segments.filter((segment) => segment.label !== "N.C.").length);
  els.melodyCountText.textContent = String(melodyNotes.length);
  els.playableCountText.textContent = `${playable.length} chord / ${playableMelody.length} melody`;
  if (els.matchScoreText) {
    els.matchScoreText.textContent = analysis.quality ? `${Math.round(analysis.quality.score * 100)}%` : "-";
  }
  if (els.recoveredCountText) {
    const correction = analysis.correctionSummary;
    const recovered = correction ? correction.melodyAdded + correction.backgroundAdded + correction.rhythmAdded : 0;
    els.recoveredCountText.textContent = correction
      ? `${recovered} / ${correction.passes}`
      : "0";
  }
  els.importChordsBtn.disabled = playable.length === 0;
  els.importMelodyBtn.disabled = playableMelody.length === 0;
  els.refineChordsBtn.disabled = segments.length === 0;
  els.autoTuneBtn.disabled = melodyNotes.length === 0;

  if (tempoEstimate) {
    els.estimatedBpmText.textContent = `${tempoEstimate.bpm} (${tempoEstimate.confidence.toFixed(2)})`;
    els.useEstimatedBpmBtn.disabled = false;
  } else {
    els.estimatedBpmText.textContent = "-";
    els.useEstimatedBpmBtn.disabled = true;
  }

  if (analysis.keyGuess) {
    els.detectedKeyText.textContent = `${analysis.keyGuess.label} (${analysis.keyGuess.score.toFixed(2)})`;
    els.useDetectedKeyBtn.disabled = false;
  } else {
    els.detectedKeyText.textContent = "-";
    els.useDetectedKeyBtn.disabled = true;
  }

  if (!segments.length) {
    els.chordOutputText.value = "";
    renderVisualTimingMap(els.chordResultList, [], "No chords yet");
  } else {
    const outputLines = segments.map((segment) => {
      const mapping = mappingForChord(segment);
      const label = displayChordLabel(segment);
      const skyText = segment.label === "N.C." ? "rest" : mapping ? mapping.text : "not in selected Sky key";
      return `${formatTime(segment.start)}-${formatTime(segment.end)} | ${label} | ${skyText} | ${segment.score.toFixed(2)}`;
    });
    els.chordOutputText.value = analysis.refinedText || outputLines.join("\n");

    renderVisualTimingMap(els.chordResultList, segments.map((segment) => {
      const mapping = mappingForChord(segment);
      return {
        start: segment.start,
        end: segment.end,
        label: displayChordLabel(segment),
        detail: segment.label === "N.C." ? "rest" : mapping ? mapping.text : "not in key",
        meta: segment.score.toFixed(2),
        buttonIds: mapping ? mapping.buttonIds : [],
        kind: segment.label === "N.C." ? "rest" : "chord"
      };
    }), "No chords yet");
  }

  if (!melodyNotes.length) {
    els.melodyOutputText.value = "";
    renderVisualTimingMap(els.melodyResultList, [], "No melody yet");
    renderRhythmAnalysis();
    renderSeparatedTracks();
    renderCombinedAnalysis();
    renderWordingAssignments();
    return;
  }

  const melodyLines = melodyNotes.map((note) => {
    const mapping = melodyMapping(note);
    const duration = Math.max(0.01, note.end - note.start);
    return `${formatTime(note.start)}-${formatTime(note.end)} | ${melodyNoteLabel(note)} | ${mapping.abc}:${mapping.noteName} | ${duration.toFixed(2)}s`;
  });
  els.melodyOutputText.value = melodyLines.join("\n");

  els.melodyResultList.innerHTML = "";
  renderVisualTimingMap(els.melodyResultList, melodyNotes.map((note) => {
    const mapping = melodyMapping(note);
    return {
      start: note.start,
      end: note.end,
      label: melodyNoteLabel(note),
      detail: `${mapping.abc}:${mapping.noteName}`,
      meta: (note.confidence || 0).toFixed(2),
      buttonIds: [mapping.buttonId],
      kind: "melody"
    };
  }), "No melody yet");

  renderRhythmAnalysis();
  renderSeparatedTracks();
  renderCombinedAnalysis();
  renderWordingAssignments();
}

function renderAll() {
  renderMode();
  renderPiano();
  renderPending();
  renderKeyData();
  renderTimeline();
  renderExport();
  renderChordAnalysis();
  renderScoreAnalysis();
}

function addNoteEvent(notes) {
  const normalized = [...new Set(notes)].sort((a, b) => a - b);
  state.events.push({
    type: "note",
    notes: normalized,
    duration: Number(state.duration)
  });
  renderAll();
}

function handleButtonPress(id) {
  playButton(id);
  if (state.chordMode) {
    if (state.pending.includes(id)) {
      state.pending = state.pending.filter((noteId) => noteId !== id);
    } else {
      state.pending.push(id);
    }
    renderAll();
    setStatus("Chord buffer updated");
    return;
  }

  addNoteEvent([id]);
  setStatus(`Added ${labelForButton(getButton(id))}`);
}

function addChord() {
  if (!state.pending.length) return;
  addNoteEvent(state.pending);
  state.pending = [];
  renderAll();
  setStatus("Added chord");
}

function addRest() {
  state.events.push({ type: "rest", duration: Number(state.duration) });
  renderAll();
  setStatus("Added rest");
}

function addBar() {
  state.events.push({ type: "bar" });
  renderAll();
  setStatus("Added bar");
}

function addLine() {
  state.events.push({ type: "line" });
  renderAll();
  setStatus("Added line");
}

function undo() {
  if (state.events.length) {
    state.events.pop();
    renderAll();
    setStatus("Undid last box");
  }
}

function clearSheet() {
  if (!state.events.length) return;
  state.events = [];
  state.pending = [];
  stopPlayback();
  renderAll();
  setStatus("Sheet cleared");
}

function abcForEvent(event) {
  if (event.type === "rest") return ".";
  if (event.type === "bar") return "|";
  if (event.type === "line") return "\n";
  return event.notes.map((id) => getButton(id).abc).join("");
}

function numbersForEvent(event) {
  if (event.type === "rest") return ".";
  if (event.type === "bar") return "|";
  if (event.type === "line") return "\n";
  return event.notes.join("+");
}

function notesForEvent(event) {
  if (event.type === "rest") return ".";
  if (event.type === "bar") return "|";
  if (event.type === "line") return "\n";
  return event.notes.map((id) => `${getButton(id).abc}:${getCellNote(id)}`).join("+");
}

function joinTokens(events, formatter) {
  let output = "";
  events.forEach((event) => {
    const token = formatter(event);
    if (token === "\n") {
      output = output.trimEnd() + "\n";
      return;
    }
    output += `${token} `;
  });
  return output.trim();
}

function buildTimedExportEvents(events, beatSeconds) {
  let beatCursor = 0;
  return events.map((event, index) => {
    const startBeat = beatCursor;
    const durationBeats = event.type === "note" || event.type === "rest"
      ? Math.max(0.03125, Number(event.duration) || 0.25)
      : 0;
    const output = {
      index,
      type: event.type,
      label: eventLabel(event),
      startBeat: Number(startBeat.toFixed(5)),
      startSeconds: Number((startBeat * beatSeconds).toFixed(5))
    };

    if (durationBeats > 0) {
      output.durationBeats = Number(durationBeats.toFixed(5));
      output.durationSeconds = Number((durationBeats * beatSeconds).toFixed(5));
      output.endBeat = Number((startBeat + durationBeats).toFixed(5));
      output.endSeconds = Number(((startBeat + durationBeats) * beatSeconds).toFixed(5));
    }

    if (event.type === "note") {
      output.notes = event.notes.map((id) => ({
        button: id,
        abc: getButton(id).abc,
        noteName: getCellNote(id),
        frequency: Number(frequencyForButton(id).toFixed(3))
      }));
    }

    if (event.kind) output.kind = event.kind;
    if (Number.isFinite(event.gate)) output.gate = event.gate;
    beatCursor += durationBeats;
    return output;
  });
}

function getTimedSheetExport() {
  const bpm = Math.min(240, Math.max(30, Number(state.bpm) || 96));
  const beatSeconds = 60 / bpm;
  const events = buildTimedExportEvents(state.events, beatSeconds);
  const totalBeats = events.reduce((max, event) => Math.max(max, event.endBeat || event.startBeat || 0), 0);
  const config = currentConfig();

  return {
    schema: "sky-piano-sheet-maker/timed-v1",
    title: els.titleInput.value,
    transcriber: els.authorInput.value,
    key: {
      id: state.keyId,
      label: config.label,
      setup: config.setup
    },
    bpm,
    beatSeconds: Number(beatSeconds.toFixed(6)),
    defaultDurationBeats: Number(state.duration),
    notation: "Sky COTL 15-button grid",
    totalBeats: Number(totalBeats.toFixed(5)),
    totalSeconds: Number((totalBeats * beatSeconds).toFixed(5)),
    events
  };
}

function getExportText() {
  const format = els.exportFormat.value;
  if (format === "numbers") return joinTokens(state.events, numbersForEvent);
  if (format === "notes") return joinTokens(state.events, notesForEvent);
  if (format === "timed-json") return JSON.stringify(getTimedSheetExport(), null, 2);
  if (format === "json") {
    return JSON.stringify({
      title: els.titleInput.value,
      transcriber: els.authorInput.value,
      key: state.keyId,
      keyLabel: currentConfig().label,
      bpm: state.bpm,
      notation: "Sky COTL 15-button grid",
      events: state.events
    }, null, 2);
  }
  return joinTokens(state.events, abcForEvent);
}

function parseAbcToken(token) {
  const cleaned = token.trim().toUpperCase().replace(/\+/g, "");
  if (!cleaned) return null;
  if (cleaned === ".") return { type: "rest", duration: Number(state.duration) };
  if (cleaned === "|") return { type: "bar" };

  const matches = cleaned.match(/[ABC][1-5]/g);
  if (matches && matches.join("") === cleaned) {
    const notes = matches.map((match) => {
      const row = ROWS.indexOf(match[0]);
      const col = Number(match[1]) - 1;
      return row * 5 + col + 1;
    });
    return { type: "note", notes, duration: Number(state.duration) };
  }

  return null;
}

function parseNumberToken(token) {
  const cleaned = token.trim().replace(/[\[\]()]/g, "");
  if (!cleaned) return null;
  if (cleaned === ".") return { type: "rest", duration: Number(state.duration) };
  if (cleaned === "|") return { type: "bar" };

  let parts = [];
  if (/[,+/]/.test(cleaned)) {
    parts = cleaned.split(/[,+/]/);
  } else if (/^[1-9]+$/.test(cleaned)) {
    parts = cleaned.split("");
  } else if (/^\d{1,2}$/.test(cleaned)) {
    parts = [cleaned];
  }

  const notes = parts.map(Number).filter((value) => value >= 1 && value <= 15);
  if (notes.length === parts.length && notes.length > 0) {
    return { type: "note", notes, duration: Number(state.duration) };
  }

  return null;
}

function importSheet(mode) {
  const text = els.importText.value.trim();
  if (!text) return;

  const parser = mode === "numbers" ? parseNumberToken : parseAbcToken;
  const nextEvents = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((line, lineIndex) => {
    line.split(/\s+/).forEach((token) => {
      const event = parser(token);
      if (event) nextEvents.push(event);
    });
    if (lineIndex < lines.length - 1) nextEvents.push({ type: "line" });
  });

  if (!nextEvents.length) {
    setStatus("No valid sheet tokens found");
    return;
  }

  state.events = nextEvents;
  state.pending = [];
  renderAll();
  setStatus(`Imported ${nextEvents.length} boxes`);
}

function syncAudioWizardControls() {
  if (els.wizardMelodySensitivityInput && els.melodySensitivityInput) {
    els.melodySensitivityInput.value = els.wizardMelodySensitivityInput.value;
  }
  if (els.wizardChordSensitivityInput && els.chordSensitivityInput) {
    els.chordSensitivityInput.value = els.wizardChordSensitivityInput.value;
  }
  if (els.wizardFeelDensitySelect && els.feelDensitySelect) {
    els.feelDensitySelect.value = els.wizardFeelDensitySelect.value;
  }
  if (els.wizardPlayabilitySelect && els.playabilitySelect) {
    els.playabilitySelect.value = els.wizardPlayabilitySelect.value;
    state.chordAnalysis.playability = els.wizardPlayabilitySelect.value;
  }
  if (els.wizardBpmInput && els.bpmInput) {
    state.bpm = Math.min(240, Math.max(30, Number(els.wizardBpmInput.value) || state.bpm || 96));
    els.bpmInput.value = String(state.bpm);
    els.wizardBpmInput.value = String(state.bpm);
    els.wizardBpmInput.disabled = Boolean(els.wizardAutoBpmInput && els.wizardAutoBpmInput.checked);
  }
  if (els.wizardEnhancerSelect && els.enhancerSelect) {
    els.enhancerSelect.value = els.wizardEnhancerSelect.value;
    state.chordAnalysis.enhancerMode = els.wizardEnhancerSelect.value;
  }
}

function applyAudioWizardAutoSettings() {
  const applied = [];
  if (els.wizardAutoKeyInput && els.wizardAutoKeyInput.checked && state.chordAnalysis.keyGuess) {
    state.keyId = state.chordAnalysis.keyGuess.keyId;
    state.chordAnalysis.refinedText = "";
    applied.push(`auto key ${state.chordAnalysis.keyGuess.label}`);
  }

  if (els.wizardAutoBpmInput && els.wizardAutoBpmInput.checked && state.chordAnalysis.tempoEstimate) {
    state.bpm = Math.min(240, Math.max(30, state.chordAnalysis.tempoEstimate.bpm));
    applied.push(`auto BPM ${state.bpm}`);
  }

  if (applied.length) {
    rebuildCombinedAnalysis();
    syncControls();
  }

  return applied;
}

function updateAudioWizardKeySummary() {
  if (!els.audioWizardKeyTitle || !els.audioWizardKeyDescription) return;
  const config = currentConfig();
  const scale = flattenRows(config.rows).join(", ");
  const detected = state.chordAnalysis.keyGuess;
  const autoKeyActive = Boolean(els.wizardAutoKeyInput && els.wizardAutoKeyInput.checked && detected);
  const confidence = detected ? ` Detected-key confidence score: ${detected.score.toFixed(2)}.` : "";
  els.audioWizardKeyTitle.textContent = autoKeyActive
    ? `key auto selected was ${config.label}`
    : `selected key was ${config.label}`;
  els.audioWizardKeyDescription.textContent = `${config.setup} Your 15 Sky piano buttons now map to ${scale}.${confidence}`;
}

function setAudioResultTab(tab) {
  const nextTab = ["sheets", "details", "timing"].includes(tab) ? tab : "sheets";
  state.audioResultTab = nextTab;
  document.body.classList.remove("audio-tab-sheets", "audio-tab-details", "audio-tab-timing");
  document.body.classList.add(`audio-tab-${nextTab}`);

  [
    [els.audioTabSheetsBtn, "sheets"],
    [els.audioTabDetailsBtn, "details"],
    [els.audioTabTimingBtn, "timing"]
  ].forEach(([button, id]) => {
    if (!button) return;
    const active = id === nextTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function setAudioWizardStep(step) {
  const nextStep = ["file", "sensitivity", "feel", "processing", "done"].includes(step) ? step : "file";
  state.audioWizardStep = nextStep;
  document.body.classList.remove("audio-results-open");
  setAudioFinalExportMode(false);
  document.querySelectorAll("[data-audio-step]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.audioStep === nextStep);
  });
  if (nextStep === "processing") updateAudioWizardProgress("Preparing analysis");
  if (nextStep === "done") updateAudioWizardKeySummary();
}

function setAudioFinalExportMode(active) {
  if (active) {
    if (els.exportFormat) els.exportFormat.value = "timed-json";
    if (els.exportTitle) els.exportTitle.textContent = "Save";
    if (els.exportSubtitle) els.exportSubtitle.textContent = "Timed JSON export for the generated Sky sheet";
    if (els.copyExportBtn) els.copyExportBtn.textContent = "Copy timed JSON";
  } else {
    if (els.exportTitle) els.exportTitle.textContent = "Import / Export";
    if (els.exportSubtitle) els.exportSubtitle.textContent = "ABC1-5, numbers, note names, JSON, timed JSON";
    if (els.copyExportBtn) els.copyExportBtn.textContent = "Copy export";
  }
  renderExport();
}

function openAudioResults() {
  if (!state.events.length && (state.chordAnalysis.combinedEvents || []).some((event) => event.type === "note")) {
    importCombinedArrangement();
  }
  setAudioFinalExportMode(true);
  setAudioResultTab("sheets");
  document.body.classList.add("audio-results-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function wizardProgressForStatus(text) {
  const value = String(text || "");
  const percentMatch = value.match(/(\d+)%/);
  const percent = percentMatch ? Math.max(0, Math.min(100, Number(percentMatch[1]))) : 0;

  if (/failed/i.test(value)) return 100;
  if (/analyzed:/i.test(value)) return 100;
  if (/caching song frequencies/i.test(value)) return 72 + percent * 0.18;
  if (/extracting rhythm/i.test(value)) return 56 + percent * 0.14;
  if (/tracking melody/i.test(value)) return 36 + percent * 0.2;
  if (/analyzing chords/i.test(value)) return 14 + percent * 0.22;
  if (/Decoding audio/i.test(value)) return 8;
  return 4;
}

function updateAudioWizardProgress(text) {
  if (!els.audioWizardStageText || !els.audioWizardProgressFill) return;
  const progress = wizardProgressForStatus(text);
  els.audioWizardStageText.textContent = text || "Preparing analysis";
  els.audioWizardProgressFill.style.width = `${Math.max(4, Math.min(100, progress)).toFixed(1)}%`;
  if (els.audioWizardTipText) {
    const index = Math.abs(String(text || "").length + Math.round(progress)) % AUDIO_WIZARD_TIPS.length;
    els.audioWizardTipText.textContent = AUDIO_WIZARD_TIPS[index];
  }
}

function setAudioStatus(text) {
  els.audioStatus.textContent = text;
  updateAudioWizardProgress(text);
}

function setScoreStatus(text) {
  if (els.scoreStatus) els.scoreStatus.textContent = text;
}

function fileExtension(fileName) {
  const match = String(fileName || "").toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : "";
}

function isScoreImageFile(file) {
  return file && String(file.type || "").startsWith("image/");
}

function isScorePdfFile(file) {
  const extension = fileExtension(file && file.name);
  return file && (file.type === "application/pdf" || extension === "pdf");
}

function isScoreXmlFile(file) {
  const extension = fileExtension(file && file.name);
  return file && (
    extension === "xml" ||
    extension === "musicxml" ||
    /xml/.test(String(file.type || ""))
  );
}

function isScoreJsonFile(file) {
  return file && (fileExtension(file.name) === "json" || String(file.type || "").includes("json"));
}

function isScoreTextFile(file) {
  const extension = fileExtension(file && file.name);
  return file && (extension === "txt" || extension === "text" || String(file.type || "").startsWith("text/"));
}

function isScoreMxlFile(file) {
  const extension = fileExtension(file && file.name);
  return file && (extension === "mxl" || extension === "zip" || String(file.type || "").includes("zip"));
}

function scoreOmrServerError(browserMessage = "") {
  const localHint = window.location.protocol === "file:"
    ? "Run npm run dev, then either open http://127.0.0.1:5173 or keep this file page open while that server is running."
    : "Make sure npm run dev is running, or use the deployed Vercel URL.";
  const suffix = browserMessage ? ` Browser error: ${browserMessage}` : "";
  return `MXL score import needs /api/sheet-omr. ${localHint}${suffix}`;
}

function scoreOmrEndpoint() {
  return window.location.protocol === "file:" ? LOCAL_SCORE_OMR_API : "/api/sheet-omr";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function dataUrlToPayload(dataUrl, fallbackMediaType = "application/octet-stream") {
  const match = String(dataUrl || "").match(/^data:([^;,]+);base64,(.+)$/);
  if (!match) {
    return {
      mediaType: fallbackMediaType,
      data: String(dataUrl || "")
    };
  }
  return {
    mediaType: match[1] || fallbackMediaType,
    data: match[2] || ""
  };
}

function clampTempo(value, fallback = state.bpm) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return Math.min(240, Math.max(30, Number(fallback) || 96));
  return Math.min(240, Math.max(30, Math.round(numeric)));
}

function parseTimeSignature(value) {
  if (value && typeof value === "object") {
    const beats = Number(value.beats || value.numerator || value.top);
    const beatType = Number(value.beatType || value.denominator || value.bottom);
    if (beats > 0 && beatType > 0) return { beats, beatType };
  }
  const match = String(value || "").match(/(\d+)\s*\/\s*(\d+)/);
  if (!match) return { beats: 4, beatType: 4 };
  return {
    beats: Math.max(1, Number(match[1]) || 4),
    beatType: Math.max(1, Number(match[2]) || 4)
  };
}

function normalizeKeyText(value) {
  return String(value || "")
    .trim()
    .replace(/\b(major|maj|minor|min|key|scale|concert)\b/gi, "")
    .replace(/♯/g, "#")
    .replace(/♭/g, "b")
    .replace(/[^A-Ga-g#b]/g, "");
}

function keyIdFromAny(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && !value.trim()) return null;
  if (typeof value === "number" || /^-?\d+$/.test(String(value).trim())) return keyIdFromFifths(Number(value));
  const normalized = normalizeKeyText(value);
  if (!normalized) return null;
  return KEY_ALIASES.get(normalized.toLowerCase()) || null;
}

function keyIdFromFifths(fifths) {
  const table = {
    "-7": "B",
    "-6": "Gb",
    "-5": "Db",
    "-4": "Ab",
    "-3": "Eb",
    "-2": "Bb",
    "-1": "F",
    0: "C",
    1: "G",
    2: "D",
    3: "A",
    4: "E",
    5: "B",
    6: "Gb",
    7: "Db"
  };
  return table[String(Math.max(-7, Math.min(7, Math.round(fifths))))] || null;
}

function midiFromPitchName(value) {
  const cleaned = String(value || "").trim().replace(/♯/g, "#").replace(/♭/g, "b");
  const match = cleaned.match(/^([A-Ga-g])([#b]{0,2})(-?\d+)$/);
  if (!match) return null;
  let note = match[1].toUpperCase();
  const accidental = match[2] || "";
  if (accidental === "##") note += "#";
  else if (accidental === "bb") {
    const pc = normalizePc(noteNameToPc(note) - 2);
    return (Number(match[3]) + 1) * 12 + pc;
  } else {
    note += accidental;
  }
  const pc = NOTE_TO_PC[note];
  if (pc === undefined) return null;
  return (Number(match[3]) + 1) * 12 + pc;
}

function pitchNameForMidi(midi, keyId = state.keyId) {
  const rounded = Math.round(midi);
  const octave = Math.floor(rounded / 12) - 1;
  return `${noteNameForPc(rounded, keyId)}${octave}`;
}

function parseMidiValue(value) {
  if (Number.isFinite(Number(value))) return Number(value);
  return midiFromPitchName(value);
}

function readXmlChildText(parent, tagName) {
  if (!parent) return "";
  for (const child of parent.children || []) {
    if (child.tagName === tagName) return (child.textContent || "").trim();
  }
  return "";
}

function firstXmlChild(parent, tagName) {
  if (!parent) return null;
  for (const child of parent.children || []) {
    if (child.tagName === tagName) return child;
  }
  return null;
}

function directXmlChildren(parent, tagName = null) {
  if (!parent) return [];
  return Array.from(parent.children || []).filter((child) => !tagName || child.tagName === tagName);
}

function parseMusicXmlTempo(direction) {
  const sound = firstXmlChild(direction, "sound");
  if (sound && sound.getAttribute("tempo")) return Number(sound.getAttribute("tempo"));
  const metronome = firstXmlChild(firstXmlChild(direction, "direction-type"), "metronome");
  if (!metronome) return null;
  const perMinute = Number(readXmlChildText(metronome, "per-minute"));
  return Number.isFinite(perMinute) && perMinute > 0 ? perMinute : null;
}

function parseMusicXmlScore(xmlText, fileName = "") {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");
  const parseError = doc.querySelector("parsererror");
  if (parseError) throw new Error("MusicXML parse failed");

  const title =
    (doc.querySelector("work-title") && doc.querySelector("work-title").textContent.trim()) ||
    (doc.querySelector("movement-title") && doc.querySelector("movement-title").textContent.trim()) ||
    fileName.replace(/\.[^.]+$/, "") ||
    "Imported score";
  const notes = [];
  const warnings = [];
  let bpm = null;
  let keyId = null;
  let timeSignature = { beats: 4, beatType: 4 };
  const parts = Array.from(doc.querySelectorAll("score-partwise > part, part"));

  parts.forEach((part, partIndex) => {
    let divisions = 1;
    let measureStartBeat = 0;
    let currentTimeSignature = { ...timeSignature };
    const activeTies = new Map();

    directXmlChildren(part, "measure").forEach((measure) => {
      let cursorBeat = measureStartBeat;
      let maxCursorBeat = measureStartBeat;
      let previousNoteStart = cursorBeat;

      directXmlChildren(measure).forEach((node) => {
        if (node.tagName === "attributes") {
          const divisionsText = readXmlChildText(node, "divisions");
          if (divisionsText) divisions = Math.max(1, Number(divisionsText) || divisions);

          const key = firstXmlChild(node, "key");
          if (key && !keyId) {
            const fifthsText = readXmlChildText(key, "fifths");
            if (fifthsText !== "") keyId = keyIdFromFifths(Number(fifthsText));
          }

          const time = firstXmlChild(node, "time");
          if (time) {
            const beats = Number(readXmlChildText(time, "beats")) || currentTimeSignature.beats;
            const beatType = Number(readXmlChildText(time, "beat-type")) || currentTimeSignature.beatType;
            currentTimeSignature = { beats, beatType };
            timeSignature = { beats, beatType };
          }
          return;
        }

        if (node.tagName === "direction") {
          const tempo = parseMusicXmlTempo(node);
          if (tempo) bpm = tempo;
          return;
        }

        if (node.tagName === "backup" || node.tagName === "forward") {
          const duration = (Number(readXmlChildText(node, "duration")) || 0) / Math.max(1, divisions);
          cursorBeat += node.tagName === "backup" ? -duration : duration;
          cursorBeat = Math.max(measureStartBeat, cursorBeat);
          maxCursorBeat = Math.max(maxCursorBeat, cursorBeat);
          return;
        }

        if (node.tagName !== "note") return;

        const duration = (Number(readXmlChildText(node, "duration")) || 0) / Math.max(1, divisions);
        const isChord = Boolean(firstXmlChild(node, "chord"));
        const startBeat = isChord ? previousNoteStart : cursorBeat;
        const endBeat = startBeat + Math.max(0.0625, duration || 0.25);
        const rest = firstXmlChild(node, "rest");
        const pitch = firstXmlChild(node, "pitch");

        if (!rest && pitch) {
          const step = readXmlChildText(pitch, "step").toUpperCase();
          const alter = Number(readXmlChildText(pitch, "alter") || 0);
          const octave = Number(readXmlChildText(pitch, "octave"));
          const pc = normalizePc(noteNameToPc(step) + alter);
          const midi = (octave + 1) * 12 + pc;
          const staff = readXmlChildText(node, "staff") || (partIndex === 0 ? "right" : "left");
          const voice = readXmlChildText(node, "voice") || "1";
          const tieStart = directXmlChildren(node, "tie").some((tie) => tie.getAttribute("type") === "start");
          const tieStop = directXmlChildren(node, "tie").some((tie) => tie.getAttribute("type") === "stop");
          const tieKey = `${partIndex}:${staff}:${voice}:${midi}`;

          if (tieStop && activeTies.has(tieKey)) {
            const tied = activeTies.get(tieKey);
            tied.endBeat = Math.max(tied.endBeat, endBeat);
            tied.durationBeats = tied.endBeat - tied.startBeat;
            if (!tieStart) activeTies.delete(tieKey);
          } else {
            const note = {
              startBeat,
              endBeat,
              durationBeats: endBeat - startBeat,
              midi,
              pitch: pitchNameForMidi(midi, keyId || state.keyId),
              staff,
              voice,
              part: part.getAttribute("id") || String(partIndex + 1),
              confidence: 1,
              source: "musicxml"
            };
            notes.push(note);
            if (tieStart) activeTies.set(tieKey, note);
          }
        }

        if (!isChord) {
          previousNoteStart = startBeat;
          cursorBeat += Math.max(0, duration);
          maxCursorBeat = Math.max(maxCursorBeat, cursorBeat);
        }
      });

      const nominalMeasureBeats = currentTimeSignature.beats * (4 / Math.max(1, currentTimeSignature.beatType));
      measureStartBeat += Math.max(nominalMeasureBeats, maxCursorBeat - measureStartBeat, 0.25);
    });
  });

  if (!notes.length) warnings.push("No pitched MusicXML notes found.");
  return normalizeScoreData({
    title,
    bpm,
    key: keyId,
    timeSignature,
    notes,
    warnings,
    sourceType: "musicxml"
  });
}

function normalizeScoreNote(raw, fallbackIndex = 0) {
  const rawStart = raw.startBeat ?? raw.start ?? raw.beat ?? raw.time ?? fallbackIndex;
  const rawDuration = raw.durationBeats ?? raw.duration ?? raw.beats ?? raw.length ?? 1;
  const midi = parseMidiValue(raw.midi ?? raw.pitch ?? raw.note ?? raw.name);
  if (!Number.isFinite(midi)) return null;
  const startBeat = Math.max(0, Number(rawStart) || 0);
  const durationBeats = Math.max(0.0625, Number(rawDuration) || 1);
  return {
    startBeat,
    endBeat: startBeat + durationBeats,
    durationBeats,
    midi,
    pitch: raw.pitch || raw.note || pitchNameForMidi(midi),
    staff: raw.staff || raw.hand || raw.track || "",
    voice: raw.voice || "1",
    part: raw.part || "",
    role: raw.role || "",
    visualKind: raw.visualKind || raw.visual_kind || "",
    confidence: Math.max(0, Math.min(1, Number(raw.confidence) || 1)),
    source: raw.source || "score"
  };
}

function normalizeScoreData(input) {
  const data = input && typeof input === "object" ? input : {};
  const warnings = Array.isArray(data.warnings) ? data.warnings.map(String) : [];
  const timeSignature = parseTimeSignature(data.timeSignature || data.time_signature || data.meter);
  const explicitKey = keyIdFromAny(data.key || data.keySignature || data.key_signature || data.tonic);
  const title = String(data.title || data.name || "Imported score");
  const notes = [];

  if (Array.isArray(data.notes)) {
    data.notes.forEach((raw, index) => {
      const note = normalizeScoreNote(raw, index);
      if (note) notes.push(note);
    });
  }

  if (Array.isArray(data.events)) {
    data.events.forEach((event, index) => {
      const startBeat = Math.max(0, Number(event.startBeat ?? event.start ?? event.beat ?? event.time ?? index) || 0);
      const durationBeats = Math.max(0.0625, Number(event.durationBeats ?? event.duration ?? event.beats ?? 1) || 1);
      const pitches = event.pitches || event.notes || event.midi || event.midis || [];
      const pitchList = Array.isArray(pitches) ? pitches : [pitches];
      pitchList.forEach((pitch) => {
        const midi = parseMidiValue(pitch);
        if (!Number.isFinite(midi)) return;
        notes.push({
          startBeat,
          endBeat: startBeat + durationBeats,
          durationBeats,
          midi,
          pitch: typeof pitch === "string" ? pitch : pitchNameForMidi(midi),
          staff: event.staff || event.hand || event.track || "",
          voice: event.voice || "1",
          part: event.part || "",
          role: event.role || "",
          visualKind: event.visualKind || event.visual_kind || "",
          confidence: Math.max(0, Math.min(1, Number(event.confidence) || 1)),
          source: event.source || "score"
        });
      });
    });
  }

  const sortedNotes = notes
    .filter((note) => Number.isFinite(note.midi) && Number.isFinite(note.startBeat))
    .sort((a, b) => a.startBeat - b.startBeat || b.midi - a.midi);
  const events = groupScoreNotes(sortedNotes);
  const durationBeats = sortedNotes.reduce((max, note) => Math.max(max, note.endBeat), 0);

  if (!sortedNotes.length && !warnings.length) warnings.push("No pitched notes found.");
  const normalized = {
    title,
    bpm: clampTempo(data.bpm || data.tempo, state.bpm),
    keyId: explicitKey,
    keyLabel: explicitKey ? keyConfigById(explicitKey).label : "",
    timeSignature,
    notes: sortedNotes,
    events,
    warnings,
    sourceType: data.sourceType || data.source_type || "score",
    confidence: Number.isFinite(Number(data.confidence)) ? Math.max(0, Math.min(1, Number(data.confidence))) : null,
    durationBeats
  };
  normalized.classification = {
    ...classifyScoreDataStructure(normalized),
    ...(data.classification && typeof data.classification === "object" ? data.classification : {})
  };
  return normalized;
}

function groupScoreNotes(notes) {
  const groups = [];
  notes.forEach((note) => {
    const last = groups[groups.length - 1];
    if (last && Math.abs(last.startBeat - note.startBeat) <= 0.015) {
      last.notes.push(note);
      last.endBeat = Math.max(last.endBeat, note.endBeat);
      last.durationBeats = Math.max(last.durationBeats, note.durationBeats);
      return;
    }
    groups.push({
      startBeat: note.startBeat,
      endBeat: note.endBeat,
      durationBeats: note.durationBeats,
      notes: [note]
    });
  });

  return groups.map((group) => ({
    ...group,
    midis: group.notes.map((note) => note.midi),
    pitches: group.notes.map((note) => pitchNameForMidi(note.midi)),
    staff: group.notes.some((note) => /left|bass|2/i.test(note.staff)) ? "mixed" : group.notes[0]?.staff || "",
    simultaneous: group.notes.length >= 2,
    dense: group.notes.length >= 3,
    crossStaff: new Set(group.notes.map((note) => note.staff || "")).size > 1,
    confidence: group.notes.reduce((sum, note) => sum + note.confidence, 0) / Math.max(1, group.notes.length)
  }));
}

function classifyScoreDataStructure(scoreData) {
  const events = Array.isArray(scoreData.events) ? scoreData.events : [];
  const notes = Array.isArray(scoreData.notes) ? scoreData.notes : [];
  const durationBeats = Math.max(1, Number(scoreData.durationBeats) || 1);
  const beatsPerMeasure = scoreData.timeSignature && scoreData.timeSignature.beats
    ? scoreData.timeSignature.beats * (4 / Math.max(1, scoreData.timeSignature.beatType || 4))
    : VISION_SCORE_DEFAULT_BEATS_PER_BAR;
  const measureCount = Math.max(1, Math.ceil(durationBeats / Math.max(1, beatsPerMeasure)));
  const simultaneousGroups = events.filter((group) => group.notes && group.notes.length >= 2);
  const denseGroups = events.filter((group) => group.notes && group.notes.length >= 3);
  const crossStaffGroups = events.filter((group) => {
    const roles = new Set((group.notes || []).map((note) => note.staff || ""));
    return roles.size > 1;
  });
  const trebleNotes = notes.filter((note) => /right|treble|melody|1/i.test(note.staff || ""));
  const bassNotes = notes.filter((note) => /left|bass|2/i.test(note.staff || ""));
  const notesPerMeasure = notes.length / measureCount;
  const simultaneousRatio = simultaneousGroups.length / Math.max(1, events.length);
  const bassRatio = bassNotes.length / Math.max(1, notes.length);
  const trebleRatio = trebleNotes.length / Math.max(1, notes.length);
  const densityScore = notesPerMeasure + simultaneousRatio * 8 + denseGroups.length / measureCount * 2.2;

  let complexity = "simple";
  if (densityScore >= 24 || denseGroups.length / measureCount >= 2.4) complexity = "dense";
  else if (densityScore >= 14 || simultaneousRatio >= 0.42) complexity = "complex";
  else if (densityScore >= 7 || simultaneousRatio >= 0.18) complexity = "moderate";

  let texture = "single-line";
  if (bassRatio > 0.22 && trebleRatio > 0.22 && simultaneousRatio > 0.36) texture = "piano chordal";
  else if (bassRatio > 0.18 && trebleRatio > 0.3) texture = "melody + accompaniment";
  else if (simultaneousRatio > 0.42) texture = "stacked chords";
  else if (notes.length > 0) texture = "melody-led";

  return {
    texture,
    complexity,
    measureCount,
    notesPerMeasure,
    simultaneousCount: simultaneousGroups.length,
    denseChordCount: denseGroups.length,
    crossStaffCount: crossStaffGroups.length,
    simultaneousRatio,
    bassRatio,
    trebleRatio
  };
}

function parseScoreText(text, fileName = "") {
  const tokens = String(text || "").match(/\[[^\]]+\]|[A-Ga-g][#b♯♭]?-?\d(?::[0-9.]+)?|[|]/g) || [];
  const notes = [];
  let beat = 0;
  tokens.forEach((token) => {
    if (token === "|") return;
    const isChord = token.startsWith("[") && token.endsWith("]");
    const content = isChord ? token.slice(1, -1) : token;
    const parts = content.trim().split(/[\s,+/]+/).filter(Boolean);
    let durationBeats = 1;
    parts.forEach((part) => {
      const [pitch, duration] = part.split(":");
      if (duration) durationBeats = Math.max(0.0625, Number(duration) || durationBeats);
      const midi = midiFromPitchName(pitch);
      if (!Number.isFinite(midi)) return;
      notes.push({
        startBeat: beat,
        endBeat: beat + durationBeats,
        durationBeats,
        midi,
        pitch,
        staff: "",
        voice: "1",
        part: "text",
        confidence: 0.86,
        source: "text"
      });
    });
    beat += durationBeats;
  });

  return normalizeScoreData({
    title: fileName.replace(/\.[^.]+$/, "") || "Text score",
    notes,
    warnings: tokens.length ? [] : ["No note-name tokens found in text score."],
    sourceType: "text"
  });
}

function createCanvasFromBitmap(bitmap, maxWidth = VISION_SCORE_MAX_WIDTH, maxHeight = VISION_SCORE_MAX_HEIGHT) {
  const scale = Math.min(
    VISION_SCORE_MAX_SCALE,
    maxWidth / Math.max(1, bitmap.width),
    maxHeight / Math.max(1, bitmap.height)
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function imageFileToVisionCanvas(file) {
  const bitmap = await createImageBitmap(file);
  const canvas = createCanvasFromBitmap(bitmap);
  if (bitmap.close) bitmap.close();
  return canvas;
}

function otsuThresholdFromImageData(imageData) {
  const histogram = new Array(256).fill(0);
  const data = imageData.data;
  for (let index = 0; index < data.length; index += 4) {
    const value = Math.round(data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114);
    histogram[value] += 1;
  }

  const total = imageData.width * imageData.height;
  let sum = 0;
  for (let value = 0; value < 256; value += 1) sum += value * histogram[value];

  let sumBackground = 0;
  let weightBackground = 0;
  let bestVariance = 0;
  let threshold = 150;
  for (let value = 0; value < 256; value += 1) {
    weightBackground += histogram[value];
    if (!weightBackground) continue;
    const weightForeground = total - weightBackground;
    if (!weightForeground) break;
    sumBackground += value * histogram[value];
    const meanBackground = sumBackground / weightBackground;
    const meanForeground = (sum - sumBackground) / weightForeground;
    const variance = weightBackground * weightForeground * (meanBackground - meanForeground) ** 2;
    if (variance > bestVariance) {
      bestVariance = variance;
      threshold = value;
    }
  }
  return Math.max(90, Math.min(210, threshold + 12));
}

function buildVisionBinary(canvas) {
  const context = canvas.getContext("2d");
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const threshold = otsuThresholdFromImageData(imageData);
  const dark = new Uint8Array(canvas.width * canvas.height);
  const data = imageData.data;

  for (let pixel = 0, index = 0; index < data.length; index += 4, pixel += 1) {
    const value = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
    dark[pixel] = value < threshold ? 1 : 0;
  }

  return {
    width: canvas.width,
    height: canvas.height,
    dark,
    threshold
  };
}

function groupProjectionRuns(values, threshold, minLength = 1) {
  const runs = [];
  let start = -1;
  let score = 0;
  let weighted = 0;

  values.forEach((value, index) => {
    if (value >= threshold) {
      if (start < 0) {
        start = index;
        score = 0;
        weighted = 0;
      }
      score += value;
      weighted += value * index;
      return;
    }

    if (start >= 0 && index - start >= minLength) {
      runs.push({
        start,
        end: index - 1,
        center: score ? weighted / score : (start + index - 1) / 2,
        score
      });
    }
    start = -1;
  });

  if (start >= 0 && values.length - start >= minLength) {
    runs.push({
      start,
      end: values.length - 1,
      center: score ? weighted / score : (start + values.length - 1) / 2,
      score
    });
  }
  return runs;
}

function smoothProjection(values, radius = 1) {
  return values.map((value, index) => {
    let sum = 0;
    let count = 0;
    for (let offset = -radius; offset <= radius; offset += 1) {
      const neighbor = values[index + offset];
      if (neighbor === undefined) continue;
      sum += neighbor;
      count += 1;
    }
    return count ? sum / count : value;
  });
}

function darkAt(binary, x, y) {
  const ix = Math.round(x);
  const iy = Math.round(y);
  if (ix < 0 || iy < 0 || ix >= binary.width || iy >= binary.height) return 0;
  return binary.dark[iy * binary.width + ix];
}

function detectVisionStaffXRange(binary, lineCenters) {
  const columnScores = new Array(binary.width).fill(0);
  for (let x = 0; x < binary.width; x += 1) {
    let score = 0;
    lineCenters.forEach((lineY) => {
      for (let dy = -1; dy <= 1; dy += 1) {
        score += darkAt(binary, x, lineY + dy);
      }
    });
    columnScores[x] = score;
  }

  const threshold = Math.max(2, Math.min(lineCenters.length, 4));
  const runs = groupProjectionRuns(smoothProjection(columnScores, 2), threshold, Math.floor(binary.width * 0.18));
  if (!runs.length) {
    return {
      left: 0,
      right: binary.width - 1
    };
  }

  const longest = runs.sort((a, b) => (b.end - b.start) - (a.end - a.start))[0];
  return {
    left: Math.max(0, Math.floor(longest.start)),
    right: Math.min(binary.width - 1, Math.ceil(longest.end))
  };
}

function detectVisionStaves(binary) {
  const projection = new Array(binary.height).fill(0);
  for (let y = 0; y < binary.height; y += 1) {
    let count = 0;
    for (let x = 0; x < binary.width; x += 1) {
      count += binary.dark[y * binary.width + x];
    }
    projection[y] = count;
  }

  const smoothed = smoothProjection(projection, 1);
  const high = Math.max(...smoothed, 1);
  const threshold = Math.max(binary.width * 0.18, high * 0.42);
  const lineRuns = groupProjectionRuns(smoothed, threshold, 1);
  const centers = lineRuns.map((run) => run.center).sort((a, b) => a - b);
  const staves = [];

  for (let index = 0; index <= centers.length - 5;) {
    const lines = centers.slice(index, index + 5);
    const gaps = [];
    for (let gapIndex = 1; gapIndex < lines.length; gapIndex += 1) {
      gaps.push(lines[gapIndex] - lines[gapIndex - 1]);
    }
    const spacing = median(gaps);
    const valid = spacing >= 3 &&
      spacing <= Math.max(36, binary.height * 0.055) &&
      gaps.every((gap) => Math.abs(gap - spacing) <= Math.max(2.5, spacing * 0.32));

    if (!valid) {
      index += 1;
      continue;
    }

    const range = detectVisionStaffXRange(binary, lines);
    staves.push({
      index: staves.length,
      lines,
      spacing,
      top: lines[0],
      bottom: lines[4],
      left: range.left,
      right: range.right,
      role: ""
    });
    index += 5;
  }

  return staves;
}

function pairVisionGrandStaves(staves) {
  const systems = [];
  const sorted = [...staves].sort((a, b) => a.top - b.top);
  let index = 0;

  while (index < sorted.length) {
    const first = sorted[index];
    const second = sorted[index + 1];
    const spacing = first.spacing || (second && second.spacing) || 8;
    const gap = second ? second.top - first.bottom : Infinity;
    const pair = second && gap > spacing * 1.4 && gap < spacing * 9.5;
    const members = pair ? [first, second] : [first];
    members[0].role = "treble";
    if (members[1]) members[1].role = "bass";

    systems.push({
      index: systems.length,
      staves: members,
      top: Math.min(...members.map((staff) => staff.top)),
      bottom: Math.max(...members.map((staff) => staff.bottom)),
      left: Math.min(...members.map((staff) => staff.left)),
      right: Math.max(...members.map((staff) => staff.right)),
      spacing: median(members.map((staff) => staff.spacing)),
      startBeat: 0,
      beatsPerMeasure: VISION_SCORE_DEFAULT_BEATS_PER_BAR
    });
    index += pair ? 2 : 1;
  }

  return systems;
}

function isVisionStaffLinePixel(x, y, staff) {
  if (x < staff.left - staff.spacing || x > staff.right + staff.spacing) return false;
  return staff.lines.some((lineY) => Math.abs(y - lineY) <= Math.max(1, staff.spacing * 0.12));
}

function visionDiatonicMidi(baseLetter, baseOctave, stepDelta, keyFifths) {
  const letters = ["C", "D", "E", "F", "G", "A", "B"];
  const naturalPcs = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const baseIndex = letters.indexOf(baseLetter);
  const absolute = baseIndex + stepDelta;
  const letterIndex = ((absolute % 7) + 7) % 7;
  const octave = baseOctave + Math.floor(absolute / 7);
  const letter = letters[letterIndex];
  const sharpOrder = ["F", "C", "G", "D", "A", "E", "B"];
  const flatOrder = ["B", "E", "A", "D", "G", "C", "F"];
  let accidental = 0;
  if (keyFifths > 0 && sharpOrder.slice(0, keyFifths).includes(letter)) accidental = 1;
  if (keyFifths < 0 && flatOrder.slice(0, Math.abs(keyFifths)).includes(letter)) accidental = -1;
  return (octave + 1) * 12 + naturalPcs[letter] + accidental;
}

function midiForVisionStaffPosition(staff, y, keyFifths) {
  const halfSpacing = Math.max(1, staff.spacing / 2);
  const stepDelta = Math.round((staff.lines[4] - y) / halfSpacing);
  if (staff.role === "bass") return visionDiatonicMidi("G", 2, stepDelta, keyFifths);
  return visionDiatonicMidi("E", 4, stepDelta, keyFifths);
}

function detectVisionKeyFifths(binary, systems) {
  const flatCounts = [];
  systems.forEach((system) => {
    system.staves.forEach((staff) => {
      const spacing = staff.spacing;
      const xStart = Math.max(0, Math.floor(staff.left + spacing * 3.4));
      const xEnd = Math.min(binary.width - 1, Math.floor(staff.left + spacing * 11.5));
      const yStart = Math.max(0, Math.floor(staff.top - spacing * 2.2));
      const yEnd = Math.min(binary.height - 1, Math.ceil(staff.bottom + spacing * 2.2));
      const visited = new Uint8Array(binary.width * binary.height);
      const components = [];

      for (let y = yStart; y <= yEnd; y += 1) {
        for (let x = xStart; x <= xEnd; x += 1) {
          const offset = y * binary.width + x;
          if (visited[offset] || !binary.dark[offset] || isVisionStaffLinePixel(x, y, staff)) continue;
          const stack = [[x, y]];
          visited[offset] = 1;
          let minX = x;
          let maxX = x;
          let minY = y;
          let maxY = y;
          let area = 0;

          while (stack.length) {
            const [cx, cy] = stack.pop();
            area += 1;
            minX = Math.min(minX, cx);
            maxX = Math.max(maxX, cx);
            minY = Math.min(minY, cy);
            maxY = Math.max(maxY, cy);
            for (let dy = -1; dy <= 1; dy += 1) {
              for (let dx = -1; dx <= 1; dx += 1) {
                if (!dx && !dy) continue;
                const nx = cx + dx;
                const ny = cy + dy;
                if (nx < xStart || nx > xEnd || ny < yStart || ny > yEnd) continue;
                const nextOffset = ny * binary.width + nx;
                if (visited[nextOffset] || !binary.dark[nextOffset] || isVisionStaffLinePixel(nx, ny, staff)) continue;
                visited[nextOffset] = 1;
                stack.push([nx, ny]);
              }
            }
          }

          const width = maxX - minX + 1;
          const height = maxY - minY + 1;
          if (
            area >= Math.max(5, spacing * spacing * 0.08) &&
            width <= spacing * 1.9 &&
            height >= spacing * 0.85 &&
            height <= spacing * 3.2
          ) {
            components.push({ x: (minX + maxX) / 2, width, height, area });
          }
        }
      }

      const uniqueXs = [];
      components
        .sort((a, b) => a.x - b.x)
        .forEach((component) => {
          if (!uniqueXs.some((x) => Math.abs(x - component.x) < spacing * 0.75)) uniqueXs.push(component.x);
        });
      if (uniqueXs.length >= 1 && uniqueXs.length <= 7) flatCounts.push(uniqueXs.length);
    });
  });

  if (!flatCounts.length) {
    return {
      fifths: 0,
      confidence: 0.2,
      label: "no visible key signature"
    };
  }

  const count = Math.max(0, Math.min(7, Math.round(median(flatCounts))));
  return {
    fifths: -count,
    confidence: Math.min(1, 0.35 + flatCounts.length * 0.12),
    label: count ? `${count} flat${count === 1 ? "" : "s"}` : "C"
  };
}

function scoreVisionEllipse(binary, staff, x0, y0, rx, ry) {
  let score = 0;
  let centerScore = 0;
  const minX = Math.max(0, Math.floor(x0 - rx));
  const maxX = Math.min(binary.width - 1, Math.ceil(x0 + rx));
  const minY = Math.max(0, Math.floor(y0 - ry));
  const maxY = Math.min(binary.height - 1, Math.ceil(y0 + ry));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const nx = (x - x0) / Math.max(1, rx);
      const ny = (y - y0) / Math.max(1, ry);
      if (nx * nx + ny * ny > 1) continue;
      if (!darkAt(binary, x, y) || isVisionStaffLinePixel(x, y, staff)) continue;
      score += 1;
      if (Math.abs(nx) <= 0.55 && Math.abs(ny) <= 0.55) centerScore += 1;
    }
  }

  return score + centerScore * 0.7;
}

function longestVisionVerticalRun(binary, x, yStart, yEnd) {
  const ix = Math.round(x);
  let longest = 0;
  let current = 0;
  for (let y = Math.max(0, Math.floor(yStart)); y <= Math.min(binary.height - 1, Math.ceil(yEnd)); y += 1) {
    if (darkAt(binary, ix, y)) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  }
  return longest;
}

function detectVisionStemSupport(binary, staff, x0, y0, rx) {
  const spacing = staff.spacing;
  const yStart = y0 - spacing * 4.8;
  const yEnd = y0 + spacing * 4.8;
  const sideXs = [
    x0 - rx * 1.15,
    x0 - rx * 0.9,
    x0 + rx * 0.9,
    x0 + rx * 1.15
  ];
  let best = { score: 0, x: x0, side: "none" };

  sideXs.forEach((x) => {
    const score = longestVisionVerticalRun(binary, x, yStart, yEnd);
    if (score > best.score) {
      best = {
        score,
        x,
        side: x < x0 ? "left" : "right"
      };
    }
  });

  return {
    ...best,
    hasStem: best.score >= spacing * 1.45
  };
}

function detectVisionBeamSupport(binary, staff, x0, y0, stem) {
  if (!stem || !stem.hasStem) return { score: 0, hasBeam: false };
  const spacing = staff.spacing;
  const xStart = Math.max(0, Math.floor(stem.x - spacing * 2.8));
  const xEnd = Math.min(binary.width - 1, Math.ceil(stem.x + spacing * 2.8));
  const yStart = Math.max(0, Math.floor(y0 - spacing * 4.8));
  const yEnd = Math.min(binary.height - 1, Math.ceil(y0 + spacing * 4.8));
  let bestRun = 0;

  for (let y = yStart; y <= yEnd; y += 1) {
    if (Math.abs(y - y0) < spacing * 0.85) continue;
    if (staff.lines.some((lineY) => Math.abs(y - lineY) <= Math.max(1, spacing * 0.12))) continue;
    let current = 0;
    for (let x = xStart; x <= xEnd; x += 1) {
      if (darkAt(binary, x, y)) {
        current += 1;
        bestRun = Math.max(bestRun, current);
      } else {
        current = 0;
      }
    }
  }

  return {
    score: bestRun,
    hasBeam: bestRun >= spacing * 1.45
  };
}

function scoreVisionNotehead(binary, staff, x0, y0, rx, ry) {
  let darkPixels = 0;
  let ellipsePixels = 0;
  let centerDark = 0;
  let centerPixels = 0;
  let ringDark = 0;
  let ringPixels = 0;
  const minX = Math.max(0, Math.floor(x0 - rx * 1.08));
  const maxX = Math.min(binary.width - 1, Math.ceil(x0 + rx * 1.08));
  const minY = Math.max(0, Math.floor(y0 - ry * 1.08));
  const maxY = Math.min(binary.height - 1, Math.ceil(y0 + ry * 1.08));

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const nx = (x - x0) / Math.max(1, rx);
      const ny = (y - y0) / Math.max(1, ry);
      const radius = nx * nx + ny * ny;
      if (radius > 1.08) continue;
      ellipsePixels += 1;
      const isCenter = Math.abs(nx) <= 0.5 && Math.abs(ny) <= 0.5;
      const isRing = radius >= 0.36 && radius <= 1.08;
      if (isCenter) centerPixels += 1;
      if (isRing) ringPixels += 1;
      if (!darkAt(binary, x, y) || isVisionStaffLinePixel(x, y, staff)) continue;
      darkPixels += 1;
      if (isCenter) centerDark += 1;
      if (isRing) ringDark += 1;
    }
  }

  const fillRatio = darkPixels / Math.max(1, ellipsePixels);
  const centerRatio = centerDark / Math.max(1, centerPixels);
  const ringRatio = ringDark / Math.max(1, ringPixels);
  const baseFilledScore = darkPixels + centerDark * 0.72;
  const baseHollowScore = ringDark * 1.35 - centerDark * 0.12;
  const baseScore = Math.max(baseFilledScore, baseHollowScore);
  if (baseScore < staff.spacing * staff.spacing * 0.035) {
    return {
      score: baseScore,
      fillRatio,
      centerRatio,
      ringRatio,
      stemScore: 0,
      beamScore: 0,
      hasStem: false,
      hasBeam: false,
      visualKind: "noise",
      valueBeats: 1
    };
  }

  const stem = detectVisionStemSupport(binary, staff, x0, y0, rx);
  const beam = detectVisionBeamSupport(binary, staff, x0, y0, stem);
  const filledScore = darkPixels + centerDark * 0.72 + Math.min(stem.score, staff.spacing * 3.2) * 0.42 + Math.min(beam.score, staff.spacing * 2.8) * 0.28;
  const hollowScore = ringDark * 1.35 + Math.min(stem.score, staff.spacing * 3.2) * 0.28 - centerDark * 0.12;
  const hollow = hollowScore > filledScore * 0.9 && ringRatio > 0.18 && centerRatio < 0.34;
  const outsideStaff = y0 < staff.top - staff.spacing * 2.4 || y0 > staff.bottom + staff.spacing * 2.4;
  const score = Math.max(filledScore, hollowScore);

  return {
    score: outsideStaff && !stem.hasStem ? score * 0.76 : score,
    fillRatio,
    centerRatio,
    ringRatio,
    stemScore: stem.score,
    beamScore: beam.score,
    hasStem: stem.hasStem,
    hasBeam: beam.hasBeam,
    visualKind: hollow ? (stem.hasStem ? "hollow-stem" : "hollow") : (beam.hasBeam ? "filled-beamed" : "filled"),
    valueBeats: hollow ? (stem.hasStem ? 2 : 4) : (beam.hasBeam ? 0.5 : 1)
  };
}

function detectVisionBarlines(binary, system) {
  const yStart = Math.max(0, Math.floor(system.top - system.spacing));
  const yEnd = Math.min(binary.height - 1, Math.ceil(system.bottom + system.spacing));
  const values = new Array(binary.width).fill(0);

  for (let x = Math.max(0, Math.floor(system.left)); x <= Math.min(binary.width - 1, Math.ceil(system.right)); x += 1) {
    let count = 0;
    for (let y = yStart; y <= yEnd; y += 1) count += darkAt(binary, x, y);
    values[x] = count;
  }

  const rangeHeight = yEnd - yStart + 1;
  const threshold = Math.max(system.spacing * 6, rangeHeight * 0.32);
  return groupProjectionRuns(smoothProjection(values, 1), threshold, 1)
    .filter((run) => run.end - run.start <= system.spacing * 0.9)
    .map((run) => run.center)
    .filter((x) => x >= system.left && x <= system.right)
    .sort((a, b) => a - b);
}

function detectVisionNoteCandidates(binary, systems, keyFifths) {
  const candidates = [];

  systems.forEach((system) => {
    system.staves.forEach((staff) => {
      const spacing = staff.spacing;
      const rx = Math.max(3, spacing * 0.68);
      const ry = Math.max(3, spacing * 0.58);
      const threshold = Math.max(5, spacing * spacing * 0.095);
      const noteStart = Math.min(staff.right, staff.left + spacing * 8.4);
      const xStart = Math.max(0, Math.floor(noteStart));
      const xEnd = Math.min(binary.width - 1, Math.ceil(staff.right - spacing * 0.8));
      const stepMin = -8;
      const stepMax = 15;

      for (let stepDelta = stepMin; stepDelta <= stepMax; stepDelta += 1) {
        const y = staff.lines[4] - stepDelta * (spacing / 2);
        if (y < staff.top - spacing * 4.6 || y > staff.bottom + spacing * 4.6) continue;
        const scores = new Array(xEnd - xStart + 1).fill(0);
        const scoreDetails = new Array(xEnd - xStart + 1).fill(null);
        for (let x = xStart; x <= xEnd; x += 1) {
          const detail = scoreVisionNotehead(binary, staff, x, y, rx, ry);
          scores[x - xStart] = detail.score;
          scoreDetails[x - xStart] = detail;
        }
        const runs = groupProjectionRuns(scores, threshold, Math.max(1, Math.floor(spacing * 0.18)));
        runs.forEach((run) => {
          const width = run.end - run.start + 1;
          if (width < spacing * 0.22 || width > spacing * 2.35) return;

          let bestLocal = run.start;
          let bestScore = 0;
          for (let local = run.start; local <= run.end; local += 1) {
            if (scores[local] > bestScore) {
              bestScore = scores[local];
              bestLocal = local;
            }
          }
          if (bestScore < threshold * 1.08) return;

          const x = xStart + bestLocal;
          const detail = scoreDetails[bestLocal] || {};
          const outsideStaff = y < staff.top - spacing * 2.4 || y > staff.bottom + spacing * 2.4;
          if (outsideStaff && !detail.hasStem && detail.fillRatio < 0.22) return;
          candidates.push({
            systemIndex: system.index,
            staffIndex: staff.index,
            staffRole: staff.role || "treble",
            x,
            y,
            midi: midiForVisionStaffPosition(staff, y, keyFifths),
            confidence: Math.max(0.2, Math.min(1, bestScore / Math.max(1, spacing * spacing * 0.52))),
            score: bestScore,
            visualKind: detail.visualKind || "filled",
            valueBeats: detail.valueBeats || 1,
            stemScore: detail.stemScore || 0,
            beamScore: detail.beamScore || 0,
            hasStem: Boolean(detail.hasStem),
            hasBeam: Boolean(detail.hasBeam),
            fillRatio: detail.fillRatio || 0,
            source: "vision"
          });
        });
      }
    });
  });

  const kept = [];
  candidates
    .sort((a, b) => b.score - a.score)
    .forEach((candidate) => {
      const system = systems[candidate.systemIndex];
      const spacing = system ? system.spacing : 8;
      const duplicate = kept.some((item) => {
        return item.systemIndex === candidate.systemIndex &&
          item.staffIndex === candidate.staffIndex &&
          Math.abs(item.x - candidate.x) <= spacing * 0.55 &&
          Math.abs(item.y - candidate.y) <= spacing * 0.62;
      });
      if (!duplicate) kept.push(candidate);
    });

  return kept.sort((a, b) => a.systemIndex - b.systemIndex || a.x - b.x || b.midi - a.midi);
}

function groupVisionCandidatesByX(candidates, spacing) {
  const groups = [];
  candidates
    .sort((a, b) => a.x - b.x || b.midi - a.midi)
    .forEach((candidate) => {
      const last = groups[groups.length - 1];
      if (last && Math.abs(candidate.x - last.x) <= Math.max(4, spacing * 0.75)) {
        last.items.push(candidate);
        last.x = mean(last.items.map((item) => item.x));
        return;
      }
      groups.push({ x: candidate.x, items: [candidate] });
    });
  return groups;
}

function assignVisionSystemBeats(binary, systems) {
  let cursorBeat = 0;
  systems.forEach((system) => {
    const barlines = detectVisionBarlines(binary, system);
    const boundaries = [system.left, ...barlines, system.right]
      .filter((value, index, values) => index === 0 || Math.abs(value - values[index - 1]) > system.spacing * 0.9)
      .sort((a, b) => a - b);
    if (boundaries[boundaries.length - 1] < system.right - system.spacing * 2) boundaries.push(system.right);
    system.boundaries = boundaries.length >= 2 ? boundaries : [system.left, system.right];
    system.beatsPerMeasure = VISION_SCORE_DEFAULT_BEATS_PER_BAR;
    system.startBeat = cursorBeat;
    cursorBeat += Math.max(1, system.boundaries.length - 1) * system.beatsPerMeasure;
  });
}

function visionBeatForX(system, x) {
  const boundaries = system.boundaries || [system.left, system.right];
  let measureIndex = Math.max(0, boundaries.length - 2);
  for (let index = 0; index < boundaries.length - 1; index += 1) {
    if (x >= boundaries[index] - system.spacing && x <= boundaries[index + 1] + system.spacing) {
      measureIndex = index;
      break;
    }
  }
  const left = boundaries[measureIndex];
  const right = Math.max(left + system.spacing, boundaries[measureIndex + 1]);
  const local = Math.max(0, Math.min(0.995, (x - left) / (right - left)));
  return system.startBeat + measureIndex * system.beatsPerMeasure + quantizeBeats(local * system.beatsPerMeasure, 0.25);
}

function estimateVisionNoteDuration(item, group, nextGroup, system, startBeatOffset) {
  const measureEnd = startBeatOffset +
    system.startBeat +
    (Math.floor((group.startBeat - startBeatOffset - system.startBeat) / system.beatsPerMeasure) + 1) * system.beatsPerMeasure;
  const nextBeat = nextGroup ? nextGroup.startBeat : measureEnd;
  const naturalDuration = Math.max(0.125, Math.min(4, nextBeat - group.startBeat));
  const visualDuration = Math.max(0.125, Number(item.valueBeats) || 1);

  if (item.visualKind === "hollow") return quantizeBeats(Math.max(visualDuration, Math.min(4, naturalDuration)), 0.25);
  if (item.visualKind === "hollow-stem") return quantizeBeats(Math.max(1, Math.min(2, Math.max(visualDuration, naturalDuration))), 0.25);
  if (item.hasBeam) return quantizeBeats(Math.min(0.75, Math.max(0.25, naturalDuration)), 0.125);
  if (item.hasStem) return quantizeBeats(Math.min(1.5, Math.max(0.25, naturalDuration)), 0.25);
  return quantizeBeats(Math.max(0.25, Math.min(4, naturalDuration)), 0.25);
}

function classifyVisionPageLayout(systems, staves, candidates, beatGroupsBySystem, key) {
  const groups = beatGroupsBySystem.flat();
  const measureCount = systems.reduce((sum, system) => {
    return sum + Math.max(1, (system.boundaries || [system.left, system.right]).length - 1);
  }, 0);
  const pairedSystems = systems.filter((system) => system.staves.length >= 2).length;
  const simultaneous = groups.filter((group) => group.items.length >= 2);
  const dense = groups.filter((group) => group.items.length >= 3);
  const crossStaff = groups.filter((group) => new Set(group.items.map((item) => item.staffRole)).size > 1);
  const beamed = groups.filter((group) => group.items.some((item) => item.hasBeam));
  const hollow = candidates.filter((item) => /^hollow/.test(item.visualKind || ""));
  const noteheadsPerMeasure = candidates.length / Math.max(1, measureCount);
  const simultaneousRatio = simultaneous.length / Math.max(1, groups.length);
  const pairedRatio = pairedSystems / Math.max(1, systems.length);
  const bassRatio = candidates.filter((item) => item.staffRole === "bass").length / Math.max(1, candidates.length);
  const trebleRatio = candidates.filter((item) => item.staffRole !== "bass").length / Math.max(1, candidates.length);
  const densityScore = noteheadsPerMeasure + simultaneousRatio * 8 + dense.length / Math.max(1, measureCount) * 2.5 + beamed.length / Math.max(1, measureCount);

  let complexity = "simple";
  if (densityScore >= 26 || dense.length / Math.max(1, measureCount) >= 2.5) complexity = "dense";
  else if (densityScore >= 15 || simultaneousRatio >= 0.42 || beamed.length / Math.max(1, measureCount) >= 1.2) complexity = "complex";
  else if (densityScore >= 7 || simultaneousRatio >= 0.18) complexity = "moderate";

  let texture = "single-line";
  if (pairedRatio >= 0.6 && bassRatio > 0.22 && trebleRatio > 0.22 && simultaneousRatio > 0.36) texture = "piano chordal";
  else if (pairedRatio >= 0.6 && bassRatio > 0.18 && trebleRatio > 0.3) texture = "melody + accompaniment";
  else if (simultaneousRatio > 0.42) texture = "stacked chords";
  else if (systems.length > 1) texture = "multi-system melody";

  return {
    engine: "local-vision-classifier",
    texture,
    complexity,
    systemCount: systems.length,
    staffCount: staves.length,
    pairedSystemCount: pairedSystems,
    measureCount,
    candidateCount: candidates.length,
    noteheadsPerMeasure,
    simultaneousCount: simultaneous.length,
    denseChordCount: dense.length,
    crossStaffCount: crossStaff.length,
    beamedGroupCount: beamed.length,
    hollowNoteCount: hollow.length,
    simultaneousRatio,
    keySignature: key.label,
    confidence: Math.max(0.25, Math.min(0.95, 0.42 + systems.length * 0.05 + candidates.length / Math.max(1, measureCount) * 0.015))
  };
}

function mergeVisionClassifications(classifications) {
  const valid = classifications.filter(Boolean);
  if (!valid.length) return null;
  const totals = valid.reduce((acc, item) => {
    acc.systemCount += item.systemCount || 0;
    acc.staffCount += item.staffCount || 0;
    acc.pairedSystemCount += item.pairedSystemCount || 0;
    acc.measureCount += item.measureCount || 0;
    acc.candidateCount += item.candidateCount || 0;
    acc.simultaneousCount += item.simultaneousCount || 0;
    acc.denseChordCount += item.denseChordCount || 0;
    acc.crossStaffCount += item.crossStaffCount || 0;
    acc.beamedGroupCount += item.beamedGroupCount || 0;
    acc.hollowNoteCount += item.hollowNoteCount || 0;
    acc.confidence += item.confidence || 0;
    return acc;
  }, {
    systemCount: 0,
    staffCount: 0,
    pairedSystemCount: 0,
    measureCount: 0,
    candidateCount: 0,
    simultaneousCount: 0,
    denseChordCount: 0,
    crossStaffCount: 0,
    beamedGroupCount: 0,
    hollowNoteCount: 0,
    confidence: 0
  });
  const complexityRank = { simple: 0, moderate: 1, complex: 2, dense: 3 };
  const complexity = valid
    .map((item) => item.complexity || "simple")
    .sort((a, b) => (complexityRank[b] || 0) - (complexityRank[a] || 0))[0];
  const textureCounts = new Map();
  valid.forEach((item) => textureCounts.set(item.texture, (textureCounts.get(item.texture) || 0) + 1));
  const texture = [...textureCounts.entries()].sort((a, b) => b[1] - a[1])[0][0];

  return {
    ...totals,
    engine: "local-vision-classifier",
    texture,
    complexity,
    noteheadsPerMeasure: totals.candidateCount / Math.max(1, totals.measureCount),
    simultaneousRatio: totals.simultaneousCount / Math.max(1, totals.candidateCount),
    confidence: totals.confidence / Math.max(1, valid.length)
  };
}

function buildVisionScoreDataFromCanvas(canvas, fileName, pageIndex = 0, startBeatOffset = 0) {
  const binary = buildVisionBinary(canvas);
  const staves = detectVisionStaves(binary);
  if (staves.length < 1) {
    throw new Error("Local vision OMR could not find staff lines in the image.");
  }

  const systems = pairVisionGrandStaves(staves);
  assignVisionSystemBeats(binary, systems);
  const key = detectVisionKeyFifths(binary, systems);
  const keyId = keyIdFromFifths(key.fifths) || state.keyId;
  const candidates = detectVisionNoteCandidates(binary, systems, key.fifths);
  const notes = [];
  const beatGroupsBySystem = [];

  systems.forEach((system) => {
    const groups = groupVisionCandidatesByX(
      candidates.filter((candidate) => candidate.systemIndex === system.index),
      system.spacing
    );
    const beatGroups = groups.map((group) => ({
      ...group,
      startBeat: startBeatOffset + visionBeatForX(system, group.x)
    })).sort((a, b) => a.startBeat - b.startBeat || a.x - b.x);
    beatGroupsBySystem.push(beatGroups);

    beatGroups.forEach((group, index) => {
      const next = beatGroups[index + 1];
      const unique = [];
      group.items
        .sort((a, b) => b.midi - a.midi)
        .forEach((item) => {
          if (!unique.some((existing) => Math.abs(existing.midi - item.midi) <= 0.1 && existing.staffRole === item.staffRole)) {
            unique.push(item);
          }
        });

      unique.forEach((item) => {
        const durationBeats = estimateVisionNoteDuration(item, group, next, system, startBeatOffset);
        notes.push({
          startBeat: group.startBeat,
          endBeat: group.startBeat + durationBeats,
          durationBeats,
          midi: item.midi,
          pitch: pitchNameForMidi(item.midi, keyId),
          staff: item.staffRole,
          voice: item.staffRole === "bass" ? "2" : "1",
          part: `vision-page-${pageIndex + 1}`,
          confidence: item.confidence,
          role: item.staffRole === "bass" ? "bass" : "melody",
          visualKind: item.visualKind,
          source: "vision"
        });
      });
    });
  });

  const classification = classifyVisionPageLayout(systems, staves, candidates, beatGroupsBySystem, key);
  const warnings = [
    `Local vision OMR found ${systems.length} system${systems.length === 1 ? "" : "s"} and ${staves.length} staff group${staves.length === 1 ? "" : "s"}.`,
    `Auto classification: ${classification.complexity} ${classification.texture}; ${classification.simultaneousCount} simultaneous group${classification.simultaneousCount === 1 ? "" : "s"}, ${classification.denseChordCount} dense chord stack${classification.denseChordCount === 1 ? "" : "s"}, ${classification.beamedGroupCount} beamed/fast group${classification.beamedGroupCount === 1 ? "" : "s"}.`,
    `Key-signature estimate: ${key.label}; tempo OCR is not used, so BPM comes from the BPM control.`
  ];
  if (!notes.length) warnings.push("Local vision OMR found staff lines but no confident noteheads.");

  return normalizeScoreData({
    title: fileName.replace(/\.[^.]+$/, "") || "Vision score",
    bpm: state.bpm,
    key: keyId,
    timeSignature: {
      beats: VISION_SCORE_DEFAULT_BEATS_PER_BAR,
      beatType: 4
    },
    notes,
    warnings,
    classification,
    sourceType: "vision"
  });
}

async function analyzeImageScoreWithVision(file) {
  setScoreStatus("Local vision OMR: loading image");
  const canvas = await imageFileToVisionCanvas(file);
  setScoreStatus("Local vision OMR: detecting staves and noteheads");
  return buildVisionScoreDataFromCanvas(canvas, file.name, 0, 0);
}

async function renderPdfCanvasesForVision(file) {
  const pdfjs = await import(SCORE_PDF_JS_URL);
  pdfjs.GlobalWorkerOptions.workerSrc = SCORE_PDF_WORKER_URL;
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pageCount = Math.min(pdf.numPages, SCORE_MAX_OMR_PAGES);
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    setScoreStatus(`Local vision OMR: rendering PDF page ${pageNumber}/${pageCount}`);
    const page = await pdf.getPage(pageNumber);
    const initial = page.getViewport({ scale: 1 });
    const scale = Math.min(
      VISION_SCORE_MAX_SCALE,
      VISION_SCORE_MAX_WIDTH / initial.width,
      VISION_SCORE_MAX_HEIGHT / initial.height
    );
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: context, viewport }).promise;
    pages.push(canvas);
  }
  return pages;
}

async function analyzePdfScoreWithVision(file) {
  const canvases = await renderPdfCanvasesForVision(file);
  const merged = {
    title: file.name.replace(/\.[^.]+$/, "") || "Vision PDF score",
    bpm: state.bpm,
    key: state.keyId,
    timeSignature: { beats: VISION_SCORE_DEFAULT_BEATS_PER_BAR, beatType: 4 },
    notes: [],
    warnings: [],
    sourceType: "vision-pdf"
  };
  let beatOffset = 0;
  const classifications = [];

  canvases.forEach((canvas, index) => {
    setScoreStatus(`Local vision OMR: reading PDF page ${index + 1}/${canvases.length}`);
    const pageScore = buildVisionScoreDataFromCanvas(canvas, file.name, index, beatOffset);
    merged.notes.push(...pageScore.notes);
    merged.warnings.push(...pageScore.warnings.map((warning) => `Page ${index + 1}: ${warning}`));
    if (pageScore.classification) classifications.push(pageScore.classification);
    if (pageScore.keyId && index === 0) merged.key = pageScore.keyId;
    beatOffset = Math.max(beatOffset, pageScore.durationBeats + beatOffset);
  });
  merged.classification = mergeVisionClassifications(classifications);

  return normalizeScoreData(merged);
}

function skyButtonCandidatesForMidi(midi, keyId = state.keyId, used = []) {
  return SKY_BUTTONS.map((button) => {
    const skyMidi = skyMidiForButton(button.id, keyId);
    const distance = Math.abs(midi - skyMidi);
    const centerCost = Math.abs(button.id - 8) * 0.026;
    const usedPenalty = used.includes(button.id) ? 4 : 0;
    return {
      buttonId: button.id,
      skyMidi,
      distance,
      score: distance + centerCost + usedPenalty
    };
  }).sort((a, b) => a.score - b.score);
}

function chooseSkyButtonForScoreMidi(midi, keyId = state.keyId, used = []) {
  return skyButtonCandidatesForMidi(midi, keyId, used)[0] || null;
}

function scoreSkyKeyForNotes(keyId, notes) {
  if (!notes.length) return Infinity;
  let weightedDistance = 0;
  let totalWeight = 0;
  notes.forEach((note) => {
    const mapping = chooseSkyButtonForScoreMidi(note.midi, keyId);
    const roleWeight = /right|treble|melody/i.test(note.staff || "") ? 1.35 : /left|bass/i.test(note.staff || "") ? 0.82 : 1;
    const durationWeight = Math.max(0.125, note.durationBeats || 0.25);
    const confidence = Math.max(0.2, note.confidence || 0.7);
    const weight = roleWeight * durationWeight * confidence;
    weightedDistance += mapping.distance * weight;
    totalWeight += weight;
  });
  return weightedDistance / Math.max(0.001, totalWeight);
}

function estimateBestSkyKeyForScore(scoreData, strategy) {
  const scoreKey = scoreData.keyId;
  if (strategy === "selected") {
    return {
      keyId: state.keyId,
      score: scoreSkyKeyForNotes(state.keyId, scoreData.notes || []),
      reason: "selected"
    };
  }

  if (strategy === "score" && scoreKey) {
    return {
      keyId: scoreKey,
      score: scoreSkyKeyForNotes(scoreKey, scoreData.notes || []),
      reason: "score"
    };
  }

  let best = null;
  KEY_CONFIGS.forEach((config) => {
    const distanceScore = scoreSkyKeyForNotes(config.id, scoreData.notes || []);
    const keyBonus = scoreKey === config.id ? -0.18 : 0;
    const score = distanceScore + keyBonus;
    if (!best || score < best.score) {
      best = {
        keyId: config.id,
        score,
        distanceScore,
        reason: "auto"
      };
    }
  });
  return best || { keyId: state.keyId, score: Infinity, reason: "fallback" };
}

function scoreArrangementSettings(mode, maxKeys, classification = null) {
  const base = SCORE_ARRANGEMENT_LIMITS[mode] || SCORE_ARRANGEMENT_LIMITS.balanced;
  const settings = {
    ...base,
    mode,
    maxKeys: Math.max(1, Math.min(4, Number(maxKeys) || 4))
  };

  if (classification && mode !== "melody") {
    if (classification.complexity === "dense" || classification.texture === "piano chordal") {
      settings.splitThreshold = Math.min(settings.splitThreshold, 3);
      settings.harmonyShare = Math.max(settings.harmonyShare, 0.72);
      settings.bassShare = Math.max(settings.bassShare, 0.72);
    }
    if (classification.texture === "melody + accompaniment") {
      settings.bassShare = Math.max(settings.bassShare, 0.7);
    }
  }

  return settings;
}

function classifyScorePitch(note, group) {
  if (/melody|foreground|lead/i.test(note.role || "")) return "melody";
  if (/bass|background|left/i.test(note.role || "")) return "bass";
  if (/harmony|chord/i.test(note.role || "")) return "harmony";
  const sorted = [...group.notes].sort((a, b) => a.midi - b.midi);
  const lowest = sorted[0];
  const highest = sorted[sorted.length - 1];
  if (note === highest || note.midi === highest.midi || /right|treble|melody/i.test(note.staff || "")) return "melody";
  if (note === lowest || note.midi === lowest.midi || /left|bass/i.test(note.staff || "")) return "bass";
  return "harmony";
}

function priorityForScorePitch(note, role, settings) {
  const duration = Math.max(0.125, note.durationBeats || 0.25);
  const confidence = Math.max(0.2, note.confidence || 0.7);
  const roleScore = role === "melody" ? 4 : role === "bass" ? 2.4 : 1.6;
  const modeScore = settings.mode === "melody" && role !== "melody" ? -0.8 : settings.mode === "full" ? 0.35 : 0;
  return roleScore + modeScore + duration * 0.08 + confidence * 0.2 + note.midi * 0.001;
}

function chooseChromaticCompanion(midi, keyId, used, primary) {
  if (!primary || primary.distance < 0.65 || primary.distance > 2.15) return null;
  const direction = primary.skyMidi < midi ? 1 : -1;
  const candidates = skyButtonCandidatesForMidi(midi, keyId, used)
    .filter((candidate) => candidate.buttonId !== primary.buttonId)
    .filter((candidate) => direction > 0 ? candidate.skyMidi > primary.skyMidi : candidate.skyMidi < primary.skyMidi)
    .filter((candidate) => Math.abs(candidate.skyMidi - midi) <= 3.25);
  return candidates[0] || null;
}

function mapScorePitchLayer(notes, keyId, settings, substitutions) {
  const used = [];
  const mappings = [];
  const ordered = notes
    .map((note) => ({
      note,
      role: note.role || "harmony",
      priority: priorityForScorePitch(note, note.role || "harmony", settings)
    }))
    .sort((a, b) => b.priority - a.priority || b.note.midi - a.note.midi);

  ordered.forEach((entry) => {
    if (used.length >= settings.maxKeys) return;
    const primary = chooseSkyButtonForScoreMidi(entry.note.midi, keyId, used);
    if (!primary || used.includes(primary.buttonId)) return;
    used.push(primary.buttonId);
    mappings.push({
      sourceMidi: entry.note.midi,
      sourcePitch: pitchNameForMidi(entry.note.midi, keyId),
      role: entry.role,
      buttonId: primary.buttonId,
      skyMidi: primary.skyMidi,
      distance: primary.distance,
      substituted: primary.distance >= 0.65,
      companion: false
    });

    if (settings.mode !== "melody" && used.length < settings.maxKeys && primary.distance >= 0.65) {
      const companion = chooseChromaticCompanion(entry.note.midi, keyId, used, primary);
      if (companion) {
        used.push(companion.buttonId);
        mappings.push({
          sourceMidi: entry.note.midi,
          sourcePitch: pitchNameForMidi(entry.note.midi, keyId),
          role: `${entry.role}-color`,
          buttonId: companion.buttonId,
          skyMidi: companion.skyMidi,
          distance: Math.abs(companion.skyMidi - entry.note.midi),
          substituted: true,
          companion: true
        });
      }
    }
  });

  mappings.forEach((mapping) => {
    if (mapping.substituted) {
      substitutions.push({
        sourcePitch: mapping.sourcePitch,
        sky: getButton(mapping.buttonId).abc,
        skyPitch: pitchNameForMidi(mapping.skyMidi, keyId),
        distance: mapping.distance,
        role: mapping.role
      });
    }
  });

  return mappings.sort((a, b) => a.buttonId - b.buttonId);
}

function splitScoreGroupIntoLayers(group, settings) {
  const notes = group.notes.map((note) => ({
    ...note,
    role: classifyScorePitch(note, group)
  }));
  const melody = notes.filter((note) => note.role === "melody").sort((a, b) => b.midi - a.midi);
  const bass = notes.filter((note) => note.role === "bass").sort((a, b) => a.midi - b.midi);
  const harmony = notes.filter((note) => note.role === "harmony").sort((a, b) => b.midi - a.midi);

  if (settings.mode === "melody") {
    return [melody.slice(0, 1).length ? melody.slice(0, 1) : notes.slice(-1)];
  }

  if (notes.length <= settings.maxKeys && notes.length < settings.splitThreshold) return [notes];

  const first = [];
  const second = [];
  if (bass[0]) first.push(bass[0]);
  harmony.slice(0, Math.max(0, settings.maxKeys - first.length)).forEach((note) => first.push(note));
  melody.slice(0, 1).forEach((note) => second.push(note));
  harmony.slice(0, Math.max(0, settings.maxKeys - second.length - 1)).forEach((note) => {
    if (!second.includes(note)) second.push(note);
  });
  if (bass[0] && settings.mode === "full" && second.length < settings.maxKeys && group.durationBeats >= 0.75) second.push(bass[0]);

  const layers = [first, second]
    .map((layer) => layer.filter(Boolean))
    .filter((layer) => layer.length);
  return layers.length ? layers : [notes.slice(0, settings.maxKeys)];
}

function shouldKeepScoreGroup(group, settings, index) {
  if (group.notes.some((note) => classifyScorePitch(note, group) === "melody")) return true;
  if (settings.mode === "full") return true;
  const beatWindow = group.startBeat % COMBINED_BEATS_PER_BAR;
  const onStrongBeat = Math.abs(beatWindow) < 0.08 || Math.abs(beatWindow - 2) < 0.08;
  if (onStrongBeat) return true;
  const ratio = settings.mode === "melody" ? settings.harmonyShare : settings.harmonyShare + settings.bassShare * 0.15;
  return (index % Math.max(2, Math.round(1 / Math.max(0.1, ratio)))) === 0;
}

function buildScoreSkyEvents(scoreData, keyId, settings) {
  const substitutions = [];
  const mappings = [];
  const splitGroups = [];
  const beatSeconds = 60 / clampTempo(scoreData.bpm, state.bpm);
  const rawEvents = [];
  const sortedGroups = scoreData.events.slice(0, SCORE_MAX_EVENTS).sort((a, b) => a.startBeat - b.startBeat);

  sortedGroups.forEach((group, groupIndex) => {
    if (!group.notes.length || !shouldKeepScoreGroup(group, settings, groupIndex)) return;
    const groupChord = group.notes.length >= 2 ? detectChordFromMidiPitches(group.notes.map((note) => note.midi), keyId) : null;
    const layers = splitScoreGroupIntoLayers(group, settings);
    const layerCount = Math.max(1, layers.length);
    const splitDuration = group.durationBeats / layerCount;
    if (layerCount > 1) splitGroups.push(group.startBeat);

    layers.forEach((layer, layerIndex) => {
      const mapped = mapScorePitchLayer(layer, keyId, settings, substitutions);
      const notes = [...new Set(mapped.map((mapping) => mapping.buttonId))].sort((a, b) => a - b);
      if (!notes.length) return;
      const startBeat = group.startBeat + layerIndex * splitDuration;
      const duration = quantizeBeats(Math.max(0.125, splitDuration), 0.125);
      const event = {
        type: "note",
        notes,
        duration,
        time: startBeat * beatSeconds,
        kind: layerCount > 1 ? "score-split" : group.notes.length >= 2 ? "score-chord" : "score",
        label: groupChord && groupChord.label !== "N.C." ? groupChord.label : layer.map((note) => pitchNameForMidi(note.midi, keyId)).join("+"),
        strength: group.confidence || 0.82
      };
      rawEvents.push(event);
      mapped.forEach((mapping) => {
        mappings.push({
          time: startBeat * beatSeconds,
          beat: startBeat,
          sourcePitch: mapping.sourcePitch,
          sourceMidi: mapping.sourceMidi,
          sky: getButton(mapping.buttonId).abc,
          skyPitch: pitchNameForMidi(mapping.skyMidi, keyId),
          distance: mapping.distance,
          role: mapping.role,
          chord: event.label,
          kind: event.kind
        });
      });
    });
  });

  const tempoEstimate = { bpm: clampTempo(scoreData.bpm, state.bpm), confidence: 0.92, source: "score" };
  const enhanced = enhanceSheetFlow(rawEvents, tempoEstimate, els.enhancerSelect ? els.enhancerSelect.value : "threePhase");
  return {
    rawEvents,
    events: enhanced.events,
    mappings,
    substitutions,
    splitGroups,
    enhancementSummary: enhanced.summary
  };
}

function detectChordFromMidiPitches(midis, keyId = state.keyId) {
  const cleanMidis = midis
    .map((midi) => Math.round(Number(midi)))
    .filter((midi) => Number.isFinite(midi));
  const pcs = [...new Set(cleanMidis.map((midi) => normalizePc(midi)))];
  if (pcs.length < 2) {
    return {
      label: "N.C.",
      rootPc: 0,
      template: null,
      suffix: "",
      intervals: [],
      score: 0
    };
  }

  const bassPc = normalizePc(Math.min(...cleanMidis));
  let best = null;
  for (let rootPc = 0; rootPc < 12; rootPc += 1) {
    CHORD_TEMPLATES.forEach((template) => {
      const templatePcs = template.intervals.map((interval) => normalizePc(rootPc + interval));
      const matched = pcs.filter((pc) => templatePcs.includes(pc)).length;
      const missing = templatePcs.filter((pc) => !pcs.includes(pc)).length;
      const extras = pcs.filter((pc) => !templatePcs.includes(pc)).length;
      const hasThird = template.intervals.some((interval) => interval === 3 || interval === 4);
      const rootPresent = pcs.includes(rootPc);
      const bassBonus = bassPc === rootPc ? 0.2 : rootPresent ? 0.1 : 0;
      const inversionBonus = bassPc !== rootPc && templatePcs.includes(bassPc) ? 0.06 : 0;
      const missingPenalty = template.intervals.length <= 2 ? 0.24 : hasThird ? 0.2 : 0.16;
      const score = matched / templatePcs.length - missing * missingPenalty - extras * 0.08 + bassBonus + inversionBonus;
      if (!best || score > best.score) {
        best = { rootPc, template, score, matched, missing, extras };
      }
    });
  }

  if (!best || best.score < 0.38) {
    return {
      label: "N.C.",
      rootPc: 0,
      template: null,
      suffix: "",
      intervals: [],
      score: Math.max(0, best ? best.score : 0)
    };
  }

  return {
    label: chordLabelWithBass(best.rootPc, best.template, bassPc, keyId),
    rootPc: best.rootPc,
    bassPc,
    template: best.template.name,
    suffix: best.template.suffix,
    intervals: best.template.intervals,
    matched: best.matched,
    missing: best.missing,
    extras: best.extras,
    score: Math.max(0, Math.min(1, best.score))
  };
}

function buildScoreChordSegments(scoreData, beatSeconds, keyId) {
  const frames = scoreData.events
    .filter((group) => group.notes.length >= 2)
    .map((group) => {
      const chord = detectChordFromMidiPitches(group.notes.map((note) => note.midi), keyId);
      return {
        start: group.startBeat * beatSeconds,
        end: Math.max(group.endBeat, group.startBeat + group.durationBeats) * beatSeconds,
        label: chord.label,
        rootPc: chord.rootPc,
        bassPc: chord.bassPc,
        template: chord.template,
        suffix: chord.suffix,
        intervals: chord.intervals,
        noteCount: group.notes.length,
        simultaneous: group.notes.length >= 2,
        crossStaff: new Set(group.notes.map((note) => note.staff || "")).size > 1,
        pitches: group.notes.map((note) => pitchNameForMidi(note.midi, keyId)),
        score: chord.score
      };
    });
  return mergeFrames(frames);
}

function buildScoreMelodyAndBackground(scoreData, beatSeconds, keyId) {
  const melody = [];
  const background = [];
  scoreData.events.forEach((group) => {
    if (!group.notes.length) return;
    const sorted = [...group.notes].sort((a, b) => b.midi - a.midi);
    const melodyNote = sorted[0];
    sorted.forEach((note) => {
      const target = note === melodyNote ? melody : background;
      const mapping = chooseSkyButtonForMidi(note.midi, keyId);
      target.push({
        start: note.startBeat * beatSeconds,
        end: note.endBeat * beatSeconds,
        buttonId: mapping.buttonId,
        rawMidi: note.midi,
        midi: note.midi,
        confidence: note.confidence || 0.82,
        source: note === melodyNote ? "score-melody" : "score-background",
        staff: note.staff
      });
    });
  });
  return {
    melodyNotes: markRecurringThemes(mergeNearDuplicateNotes(melody)),
    backgroundNotes: markRecurringThemes(mergeNearDuplicateNotes(background))
  };
}

function buildScoreRhythmHits(scoreData, beatSeconds) {
  return scoreData.events.map((group, index) => {
    const beatIndex = Math.round(group.startBeat);
    return {
      time: group.startBeat * beatSeconds,
      strength: Math.max(0.28, Math.min(1, 0.35 + group.notes.length * 0.14 + (group.confidence || 0.5) * 0.18)),
      score: group.notes.length,
      beatIndex,
      beatLabel: `${Math.floor(beatIndex / COMBINED_BEATS_PER_BAR) + 1}.${(beatIndex % COMBINED_BEATS_PER_BAR) + 1}`,
      source: "score"
    };
  });
}

function scoreChroma(scoreData) {
  const chroma = Array(12).fill(0);
  scoreData.notes.forEach((note) => {
    chroma[normalizePc(Math.round(note.midi))] += Math.max(0.125, note.durationBeats || 0.25) * Math.max(0.2, note.confidence || 0.7);
  });
  return chroma;
}

function convertScoreDataToSky(scoreData, options = {}) {
  const strategy = options.keyStrategy || "auto";
  const maxKeys = options.maxKeys || 4;
  const arrangement = options.arrangement || "balanced";
  const tempo = clampTempo(scoreData.bpm, state.bpm);
  scoreData.bpm = tempo;
  const bestKey = estimateBestSkyKeyForScore(scoreData, strategy);
  const classification = scoreData.classification || classifyScoreDataStructure(scoreData);
  const settings = scoreArrangementSettings(arrangement, maxKeys, classification);
  const beatSeconds = 60 / tempo;
  const conversion = buildScoreSkyEvents(scoreData, bestKey.keyId, settings);
  const tracks = buildScoreMelodyAndBackground(scoreData, beatSeconds, bestKey.keyId);
  const chordSegments = buildScoreChordSegments(scoreData, beatSeconds, bestKey.keyId);
  const rhythmHits = buildScoreRhythmHits(scoreData, beatSeconds);
  const keyGuess = estimateMajorKey(scoreChroma(scoreData));
  const warnings = [...scoreData.warnings];
  if (classification.texture && classification.complexity) {
    warnings.push(`Score classifier: ${classification.complexity} ${classification.texture}, ${classification.simultaneousCount || 0} simultaneous groups, ${classification.denseChordCount || 0} dense chord stacks.`);
  }
  if (bestKey.score > 0.9) warnings.push("Many score pitches are outside the selected Sky panel; chromatic notes were approximated.");
  if (conversion.splitGroups.length) warnings.push(`${conversion.splitGroups.length} dense piano chords were split into alternating Sky gestures.`);
  if (conversion.substitutions.length) warnings.push(`${conversion.substitutions.length} chromatic or out-of-range tones used nearest/color Sky substitutions.`);
  if (scoreData.events.length > SCORE_MAX_EVENTS) warnings.push(`Only the first ${SCORE_MAX_EVENTS} score onsets were arranged.`);

  return {
    fileName: options.fileName || "",
    sourceType: scoreData.sourceType,
    title: scoreData.title,
    bpm: tempo,
    keyGuess: keyGuess || (scoreData.keyId ? {
      keyId: scoreData.keyId,
      label: keyConfigById(scoreData.keyId).label,
      score: 1
    } : null),
    skyKeyId: bestKey.keyId,
    skyKeyScore: bestKey.score,
    noteCount: scoreData.notes.length,
    chordCount: chordSegments.filter((segment) => segment.label !== "N.C.").length,
    simultaneousCount: classification.simultaneousCount || 0,
    denseChordCount: classification.denseChordCount || 0,
    texture: classification.texture || "",
    complexity: classification.complexity || "",
    substitutionCount: conversion.substitutions.length,
    splitCount: conversion.splitGroups.length,
    combinedEvents: conversion.events,
    rawEvents: conversion.rawEvents,
    melodyNotes: tracks.melodyNotes,
    backgroundNotes: tracks.backgroundNotes,
    chordSegments,
    rhythmHits,
    warnings,
    mappings: conversion.mappings,
    substitutions: conversion.substitutions,
    classification,
    confidence: scoreData.confidence,
    omrModel: options.omrModel || "",
    durationBeats: scoreData.durationBeats,
    tempoEstimate: { bpm: tempo, confidence: 0.92, source: "score" },
    enhancementSummary: conversion.enhancementSummary
  };
}

async function callScoreOmrApi(file, preparedFiles) {
  let response;
  try {
    response = await fetch(scoreOmrEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: els.titleInput.value || file.name,
        selectedSkyKey: currentConfig().label,
        keyStrategy: els.scoreKeyStrategySelect.value,
        files: preparedFiles
      })
    });
  } catch (error) {
    throw new Error(scoreOmrServerError(error && error.message ? error.message : "fetch failed"));
  }

  const rawText = await response.text();
  let payload = {};
  try {
    payload = rawText ? JSON.parse(rawText) : {};
  } catch {
    payload = {};
  }
  if (!response.ok) {
    throw new Error(payload.error || rawText.slice(0, 200) || "Score OMR failed");
  }
  return payload;
}

async function prepareScoreFilesForOmr(file) {
  const payload = dataUrlToPayload(await readFileAsDataUrl(file), file.type || "application/octet-stream");
  return [{
    name: file.name,
    mediaType: payload.mediaType,
    data: payload.data
  }];
}

async function loadScoreDataFromFile(file) {
  if (isScoreXmlFile(file)) {
    setScoreStatus("Parsing MusicXML");
    return {
      scoreData: parseMusicXmlScore(await file.text(), file.name),
      sourceType: "musicxml"
    };
  }

  if (isScoreJsonFile(file)) {
    setScoreStatus("Parsing score JSON");
    const parsed = JSON.parse(await file.text());
    return {
      scoreData: normalizeScoreData(parsed),
      sourceType: "json"
    };
  }

  if (isScoreTextFile(file) && !isScoreImageFile(file)) {
    setScoreStatus("Parsing text score");
    return {
      scoreData: parseScoreText(await file.text(), file.name),
      sourceType: "text"
    };
  }

  if (isScoreImageFile(file)) {
    const scoreData = await analyzeImageScoreWithVision(file);
    return {
      scoreData,
      sourceType: "vision",
      omrModel: "local-vision"
    };
  }

  if (isScorePdfFile(file)) {
    const scoreData = await analyzePdfScoreWithVision(file);
    return {
      scoreData,
      sourceType: "vision-pdf",
      omrModel: "local-vision"
    };
  }

  if (!isScoreMxlFile(file)) {
    throw new Error("Unsupported score file. Use PNG/JPG/PDF, MusicXML/XML, MXL, JSON, or text note names.");
  }

  setScoreStatus("Extracting MXL score");
  const preparedFiles = await prepareScoreFilesForOmr(file);
  setScoreStatus("Extracting MXL with local API route");
  const payload = await callScoreOmrApi(file, preparedFiles);

  if (payload.musicXml) {
    return {
      scoreData: parseMusicXmlScore(payload.musicXml, file.name),
      sourceType: payload.sourceType || "mxl",
      omrModel: payload.model || "",
      endpoint: payload.endpoint || ""
    };
  }

  throw new Error("Score route did not return MusicXML");
}

function applyScoreConversion(file, loaded) {
  const scoreData = loaded.scoreData;
  const conversion = convertScoreDataToSky(scoreData, {
    fileName: file.name,
    keyStrategy: els.scoreKeyStrategySelect.value || "auto",
    arrangement: els.scoreArrangementSelect.value || "balanced",
    maxKeys: Number(els.scoreMaxKeysSelect.value) || 4,
    omrModel: loaded.omrModel || ""
  });

  state.keyId = conversion.skyKeyId || state.keyId;
  state.bpm = conversion.bpm || state.bpm;
  state.scoreAnalysis = {
    ...conversion,
    fileName: file.name,
    sourceType: loaded.sourceType || conversion.sourceType,
    omrModel: loaded.omrModel || conversion.omrModel,
    scoreData
  };
  state.chordAnalysis = {
    fileName: file.name,
    duration: conversion.durationBeats * (60 / Math.max(30, conversion.bpm || state.bpm)),
    keyGuess: conversion.keyGuess,
    segments: conversion.chordSegments,
    refinedText: "",
    melodyNotes: conversion.melodyNotes,
    foregroundNotes: conversion.melodyNotes,
    backgroundNotes: conversion.backgroundNotes,
    neuralNotes: [],
    rhythmHits: conversion.rhythmHits,
    combinedEvents: conversion.combinedEvents,
    tempoEstimate: conversion.tempoEstimate,
    tuning: {
      keyId: conversion.skyKeyId,
      score: conversion.skyKeyScore
    },
    analysisProfile: "score",
    feelDensity: els.scoreArrangementSelect.value || "balanced",
    playability: els.playabilitySelect ? els.playabilitySelect.value : "human",
    enhancerMode: els.enhancerSelect ? els.enhancerSelect.value : "threePhase",
    enhancementSummary: conversion.enhancementSummary,
    quality: null,
    correctionSummary: null,
    inputSignature: null,
    wordingAssignments: []
  };

  if (
    scoreData.title &&
    scoreData.title !== "Imported score" &&
    (!els.titleInput.value.trim() || els.titleInput.value === "Untitled Sky Sheet")
  ) {
    els.titleInput.value = scoreData.title;
  }

  syncControls();
  renderAll();
  const keyLabel = keyConfigById(state.keyId).label;
  setScoreStatus(`${file.name}: ${conversion.noteCount} notes mapped to ${keyLabel}, ${conversion.combinedEvents.length} boxes`);
  setAudioStatus(`Score import populated melody, chord, rhythm, and combined outputs`);
}

async function analyzeScoreFile() {
  const file = els.scoreFileInput && els.scoreFileInput.files && els.scoreFileInput.files[0];
  if (!file) {
    setScoreStatus("Choose a score file");
    return;
  }

  els.analyzeScoreBtn.disabled = true;
  els.importScoreBtn.disabled = true;
  setScoreStatus("Loading score");

  try {
    const loaded = await loadScoreDataFromFile(file);
    applyScoreConversion(file, loaded);
  } catch (error) {
    console.error(error);
    state.scoreAnalysis = {
      fileName: "",
      sourceType: "",
      title: "",
      bpm: null,
      keyGuess: null,
      skyKeyId: null,
      noteCount: 0,
      chordCount: 0,
      simultaneousCount: 0,
      denseChordCount: 0,
      texture: "",
      complexity: "",
      substitutionCount: 0,
      splitCount: 0,
      combinedEvents: [],
      melodyNotes: [],
      backgroundNotes: [],
      chordSegments: [],
      rhythmHits: [],
      warnings: [error && error.message ? error.message : "Score analysis failed"],
      mappings: [],
      classification: null,
      confidence: null,
      omrModel: "",
      durationBeats: 0
    };
    renderScoreAnalysis();
    setScoreStatus(error && error.message ? `Score failed: ${String(error.message).slice(0, 100)}` : "Score analysis failed");
  } finally {
    els.analyzeScoreBtn.disabled = false;
  }
}

function renderScoreAnalysis() {
  if (!els.scoreResultList) return;
  const analysis = state.scoreAnalysis;
  const events = analysis.combinedEvents || [];
  const noteEvents = events.filter((event) => event.type === "note");
  els.importScoreBtn.disabled = noteEvents.length === 0;
  els.scoreKeyText.textContent = analysis.skyKeyId ? keyConfigById(analysis.skyKeyId).label : "-";
  els.scoreBpmText.textContent = analysis.bpm ? String(analysis.bpm) : "-";
  els.scoreNoteCountText.textContent = String(analysis.noteCount || 0);
  els.scoreChordCountText.textContent = String(analysis.chordCount || 0);
  els.scoreTextureText.textContent = analysis.texture
    ? `${analysis.complexity || "score"} ${analysis.texture}`.trim()
    : "-";
  els.scoreSimultaneousCountText.textContent = String(analysis.simultaneousCount || 0);
  els.scoreSubstitutionCountText.textContent = String(analysis.substitutionCount || 0);
  els.scoreSplitCountText.textContent = String(analysis.splitCount || 0);
  els.scoreCombinedCountText.textContent = String(events.filter((event) => event.type !== "bar" && event.type !== "line").length);
  els.scoreSourceText.textContent = analysis.sourceType || "-";
  els.scoreOutputText.value = events.length ? joinTokens(events, abcForEvent) : "";
  els.scoreWarningsText.value = (analysis.warnings || []).join("\n");

  els.scoreResultList.innerHTML = "";
  if (!analysis.mappings || !analysis.mappings.length) {
    els.scoreResultList.innerHTML = '<div class="score-row"><span class="name">No score map yet</span></div>';
    return;
  }

  analysis.mappings.slice(0, 900).forEach((mapping) => {
    const row = document.createElement("div");
    row.className = "score-row";

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = formatTime(mapping.time || 0);

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = mapping.chord && mapping.chord !== mapping.sourcePitch
      ? `${mapping.sourcePitch} · ${mapping.chord}`
      : mapping.sourcePitch;

    const sky = document.createElement("span");
    sky.className = "sky";
    sky.textContent = `${mapping.sky}:${mapping.skyPitch}`;

    const score = document.createElement("span");
    score.className = "score";
    score.textContent = mapping.distance ? `${mapping.distance.toFixed(1)}st` : "exact";

    row.append(time, name, sky, score);
    els.scoreResultList.append(row);
  });
}

function importScoreArrangement() {
  const events = (state.scoreAnalysis.combinedEvents || [])
    .filter((event) => event.type === "note" || event.type === "rest" || event.type === "bar" || event.type === "line")
    .map((event) => {
      if (event.type === "note") {
        return {
          type: "note",
          notes: [...event.notes],
          duration: event.duration,
          gate: event.gate,
          kind: event.kind
        };
      }
      if (event.type === "rest") {
        return {
          type: "rest",
          duration: event.duration,
          kind: event.kind
        };
      }
      return { type: event.type };
    });

  if (!events.some((event) => event.type === "note")) {
    setScoreStatus("No score arrangement to import");
    return;
  }

  state.events = events;
  state.pending = [];
  renderAll();
  setStatus("Imported traditional score into Sky sheet");
}

function downmixAudioBuffer(buffer) {
  const length = buffer.length;
  const channels = buffer.numberOfChannels;
  const mono = new Float32Array(length);
  for (let channel = 0; channel < channels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      mono[index] += data[index] / channels;
    }
  }
  return mono;
}

function resampleLinear(samples, sourceRate, targetRate) {
  if (sourceRate === targetRate) return samples;
  const ratio = sourceRate / targetRate;
  const outputLength = Math.max(1, Math.floor(samples.length / ratio));
  const output = new Float32Array(outputLength);

  for (let index = 0; index < outputLength; index += 1) {
    const sourceIndex = index * ratio;
    const left = Math.floor(sourceIndex);
    const right = Math.min(samples.length - 1, left + 1);
    const fraction = sourceIndex - left;
    output[index] = samples[left] * (1 - fraction) + samples[right] * fraction;
  }

  return output;
}

function preEmphasize(samples) {
  const output = new Float32Array(samples.length);
  let previous = 0;
  for (let index = 0; index < samples.length; index += 1) {
    const current = samples[index];
    output[index] = current - previous * 0.94;
    previous = current;
  }
  return output;
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values, average = mean(values)) {
  if (!values.length) return 0;
  const variance = values.reduce((sum, value) => {
    const delta = value - average;
    return sum + delta * delta;
  }, 0) / values.length;
  return Math.sqrt(variance);
}

function analysisProfileSettings() {
  return {
    label: "Song translator",
    melodyHopLength: 256,
    melodyBatchSize: 14,
    chordProbeRatios: [0.18, 0.34, 0.5, 0.66, 0.82],
    chordBatchSize: 3,
    rhythmHopLength: 192,
    rhythmBatchSize: 48,
    pianoFrameLength: 4096,
    pianoHopLength: 640,
    pianoBatchSize: 4,
    translatorMaxFrameNotes: 6,
    translatorLeadSensitivity: 0.19,
    translatorChordSensitivity: 0.48,
    neuralMaxFrameNotes: 6,
    neuralSensitivity: 0.34,
    selfCorrectPasses: 2
  };
}

function feelDensitySettings(density) {
  if (density === "full") {
    return {
      label: "Full",
      rhythmThreshold: 0.34,
      melodyHarmonyStrength: 0.36,
      rhythmButtons: 3,
      harmonyButtons: 3,
      maxSimultaneous: 4,
      collapseSeconds: 0.1,
      minRhythmGapBeats: 0.24,
      minEventSeconds: 0.08,
      maxCombinedEvents: 2600
    };
  }

  if (density === "sparse") {
    return {
      label: "Sparse",
      rhythmThreshold: 0.72,
      melodyHarmonyStrength: 0.72,
      rhythmButtons: 1,
      harmonyButtons: 1,
      maxSimultaneous: 2,
      collapseSeconds: 0.065,
      minRhythmGapBeats: 0.62,
      minEventSeconds: 0.12,
      maxCombinedEvents: 1000
    };
  }

  return {
    label: "Balanced",
    rhythmThreshold: 0.52,
    melodyHarmonyStrength: 0.54,
    rhythmButtons: 2,
    harmonyButtons: 2,
    maxSimultaneous: 3,
    collapseSeconds: 0.085,
    minRhythmGapBeats: 0.38,
    minEventSeconds: 0.1,
    maxCombinedEvents: 1700
  };
}

function playabilitySettings(mode) {
  if (mode === "simple") {
    return {
      label: "Simple 1-key",
      maxSimultaneous: 1,
      harmonyButtons: 0,
      rhythmButtons: 1,
      melodyHarmonyBoost: 1,
      minMelodyGapBeats: 0.22,
      minSupportGapBeats: 0.72,
      backgroundEveryBeats: 3,
      rhythmEveryBeats: 1.5,
      chordPulseBeats: 4,
      weakAnchorThreshold: 0.6,
      maxCombinedEvents: 750,
      targetScore: 0.54,
      targetCoverage: 0.22
    };
  }

  if (mode === "balanced") {
    return {
      label: "Balanced 3-key",
      maxSimultaneous: 3,
      harmonyButtons: 2,
      rhythmButtons: 2,
      melodyHarmonyBoost: 0.06,
      minMelodyGapBeats: 0.08,
      minSupportGapBeats: 0.3,
      backgroundEveryBeats: 1,
      rhythmEveryBeats: 0.55,
      chordPulseBeats: 2,
      weakAnchorThreshold: 0.28,
      maxCombinedEvents: 1700,
      targetScore: 0.6,
      targetCoverage: 0.36
    };
  }

  if (mode === "rich") {
    return {
      label: "Rich 4-key",
      maxSimultaneous: 4,
      harmonyButtons: 3,
      rhythmButtons: 3,
      melodyHarmonyBoost: 0,
      minMelodyGapBeats: 0.04,
      minSupportGapBeats: 0.16,
      backgroundEveryBeats: 0.45,
      rhythmEveryBeats: 0.28,
      chordPulseBeats: 1.5,
      weakAnchorThreshold: 0.18,
      maxCombinedEvents: 2600,
      targetScore: 0.62,
      targetCoverage: 0.42
    };
  }

  return {
    label: "Human 2-key",
    maxSimultaneous: 2,
    harmonyButtons: 1,
    rhythmButtons: 1,
    melodyHarmonyBoost: 0.2,
    minMelodyGapBeats: 0.14,
    minSupportGapBeats: 0.46,
    backgroundEveryBeats: 2,
    rhythmEveryBeats: 0.9,
    chordPulseBeats: 3,
    weakAnchorThreshold: 0.42,
    maxCombinedEvents: 1150,
    targetScore: 0.58,
    targetCoverage: 0.3
  };
}

function flowEnhancerSettings(mode) {
  if (mode === "off") {
    return {
      enabled: false,
      label: "Off"
    };
  }

  if (mode === "gentle") {
    return {
      enabled: true,
      label: "Gentle",
      snapStrength: 0.62,
      minGapBeats: 0.16,
      minNoteBeats: 0.18,
      phraseGapBeats: 1.25,
      longHoldBeats: 1,
      legatoGate: 0.97,
      normalGate: 0.92,
      fastGate: 0.82,
      maxSimultaneous: 4
    };
  }

  return {
    enabled: true,
    label: "Three phase",
    snapStrength: 0.88,
    minGapBeats: 0.125,
    minNoteBeats: 0.125,
    phraseGapBeats: 1,
    longHoldBeats: 0.875,
    legatoGate: 0.96,
    normalGate: 0.9,
    fastGate: 0.78,
    maxSimultaneous: 4
  };
}

function eventDurationBeats(event) {
  return Math.max(0, Number(event.duration) || 0);
}

function chooseFlowGridStep(anchors) {
  const intervals = [];
  for (let index = 1; index < anchors.length; index += 1) {
    const interval = anchors[index].rawBeat - anchors[index - 1].rawBeat;
    if (interval > 0.04 && interval < 4) intervals.push(interval);
  }

  const mid = median(intervals);
  if (mid && mid <= 0.34) return 0.125;
  if (mid && mid <= 0.72) return 0.25;
  return 0.5;
}

function cloneSheetEvent(event) {
  if (event.type === "note") {
    return {
      ...event,
      notes: [...event.notes]
    };
  }
  return { ...event };
}

function anchorsFromSheetEvents(events, beatSeconds) {
  let cursorBeat = 0;
  const anchors = [];

  events.forEach((event) => {
    if (event.type === "note") {
      const timeBeat = Number.isFinite(event.time) ? event.time / Math.max(0.001, beatSeconds) : cursorBeat;
      anchors.push({
        event,
        rawBeat: Math.max(0, timeBeat),
        naturalBeats: Math.max(0.05, eventDurationBeats(event)),
        strength: event.strength || 0
      });
      cursorBeat = Math.max(cursorBeat, timeBeat + eventDurationBeats(event));
    } else if (event.type === "rest") {
      cursorBeat += eventDurationBeats(event);
    }
  });

  if (!anchors.length) return anchors;
  const firstBeat = anchors[0].rawBeat;
  anchors.forEach((anchor) => {
    anchor.rawBeat = Math.max(0, anchor.rawBeat - firstBeat);
  });
  return anchors;
}

function mergeCoincidentFlowAnchors(anchors, maxSimultaneous) {
  const merged = [];
  anchors.forEach((anchor) => {
    const last = merged[merged.length - 1];
    if (last && Math.abs(anchor.snapBeat - last.snapBeat) <= 0.01) {
      const notes = [...new Set([...last.event.notes, ...anchor.event.notes])]
        .sort((a, b) => Math.abs(a - 8) - Math.abs(b - 8))
        .slice(0, maxSimultaneous)
        .sort((a, b) => a - b);
      last.event.notes = notes;
      last.event.kind = last.event.kind && anchor.event.kind && !last.event.kind.includes(anchor.event.kind)
        ? `${last.event.kind}+${anchor.event.kind}`
        : last.event.kind || anchor.event.kind;
      last.event.label = last.event.label && anchor.event.label && !last.event.label.includes(anchor.event.label)
        ? `${last.event.label}/${anchor.event.label}`
        : last.event.label || anchor.event.label;
      last.event.strength = Math.max(last.event.strength || 0, anchor.event.strength || 0);
      last.naturalBeats = Math.max(last.naturalBeats, anchor.naturalBeats);
      return;
    }
    merged.push(anchor);
  });
  return merged;
}

function snapFlowAnchors(anchors, settings) {
  if (!anchors.length) return { anchors: [], gridStep: 0.25, snappedCount: 0 };
  const gridStep = chooseFlowGridStep(anchors);
  let previousBeat = -settings.minGapBeats;
  let snappedCount = 0;

  const snapped = anchors.map((anchor) => {
    const targetBeat = Math.round(anchor.rawBeat / gridStep) * gridStep;
    let snapBeat = anchor.rawBeat + (targetBeat - anchor.rawBeat) * settings.snapStrength;
    snapBeat = Math.round(snapBeat / gridStep) * gridStep;
    snapBeat = Math.max(0, snapBeat, previousBeat + settings.minGapBeats);
    if (Math.abs(snapBeat - anchor.rawBeat) > 0.01) snappedCount += 1;
    previousBeat = snapBeat;
    return {
      ...anchor,
      snapBeat,
      event: cloneSheetEvent(anchor.event)
    };
  });

  return {
    anchors: mergeCoincidentFlowAnchors(snapped, settings.maxSimultaneous),
    gridStep,
    snappedCount
  };
}

function gateForGap(gapBeats, settings) {
  if (gapBeats <= 0.26) return settings.fastGate;
  if (gapBeats <= 0.55) return settings.normalGate;
  return settings.legatoGate;
}

function pushBarAwareRest(output, restBeats, barState) {
  let remaining = Math.max(0, restBeats);
  while (remaining > 0.001) {
    const untilBar = barState.nextBarBeat - barState.cursorBeat;
    if (untilBar > 0.001 && remaining > untilBar + 0.001) {
      output.push({
        type: "rest",
        duration: Number(untilBar.toFixed(3)),
        kind: "flow-rest"
      });
      barState.cursorBeat += untilBar;
      output.push({ type: "bar" });
      barState.nextBarBeat += COMBINED_BEATS_PER_BAR;
      remaining -= untilBar;
      continue;
    }

    output.push({
      type: "rest",
      duration: Number(remaining.toFixed(3)),
      kind: "flow-rest"
    });
    barState.cursorBeat += remaining;
    remaining = 0;
  }
}

function pushBarAwareNote(output, event, barState) {
  while (barState.cursorBeat >= barState.nextBarBeat - 0.001 && output.length && output[output.length - 1].type !== "bar") {
    output.push({ type: "bar" });
    barState.nextBarBeat += COMBINED_BEATS_PER_BAR;
  }

  output.push(event);
  barState.cursorBeat += eventDurationBeats(event);

  while (barState.cursorBeat >= barState.nextBarBeat - 0.001) {
    output.push({ type: "bar" });
    barState.nextBarBeat += COMBINED_BEATS_PER_BAR;
  }
}

function buildFlowEventsFromAnchors(anchors, settings) {
  const output = [];
  const barState = {
    cursorBeat: 0,
    nextBarBeat: COMBINED_BEATS_PER_BAR
  };
  let restsInserted = 0;
  let durationsShaped = 0;

  anchors.forEach((anchor, index) => {
    const gapBefore = anchor.snapBeat - barState.cursorBeat;
    if (gapBefore > settings.minGapBeats) {
      pushBarAwareRest(output, quantizeBeats(gapBefore, 0.125), barState);
      restsInserted += 1;
    }

    const next = anchors[index + 1];
    const gapToNext = next ? Math.max(settings.minGapBeats, next.snapBeat - anchor.snapBeat) : anchor.naturalBeats;
    const shortGap = gapToNext <= settings.phraseGapBeats;
    const heldBeats = shortGap
      ? gapToNext
      : Math.min(Math.max(settings.minNoteBeats, anchor.naturalBeats), settings.longHoldBeats);
    const duration = quantizeBeats(Math.max(settings.minNoteBeats, heldBeats), 0.125);
    const event = {
      ...anchor.event,
      duration,
      time: anchor.snapBeat,
      kind: anchor.event.kind ? `${anchor.event.kind}+flow` : "flow",
      gate: gateForGap(gapToNext, settings)
    };

    if (Math.abs(duration - anchor.naturalBeats) > 0.01) durationsShaped += 1;
    pushBarAwareNote(output, event, barState);

    const remainingGap = next ? next.snapBeat - barState.cursorBeat : 0;
    if (remainingGap > settings.phraseGapBeats) {
      pushBarAwareRest(output, quantizeBeats(remainingGap, 0.125), barState);
      restsInserted += 1;
    }
  });

  return { output, restsInserted, durationsShaped };
}

function enhanceSheetFlow(events, tempoEstimate, mode = "threePhase") {
  const settings = flowEnhancerSettings(mode);
  if (!settings.enabled) {
    return {
      events: events.map(cloneSheetEvent),
      summary: {
        mode,
        label: settings.label,
        snappedCount: 0,
        durationsShaped: 0,
        barsInserted: events.filter((event) => event.type === "bar").length,
        restsInserted: events.filter((event) => event.type === "rest").length,
        gridStep: 0
      }
    };
  }

  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const anchors = anchorsFromSheetEvents(events, beatSeconds);
  if (!anchors.length) {
    return {
      events: [],
      summary: {
        mode,
        label: settings.label,
        snappedCount: 0,
        durationsShaped: 0,
        barsInserted: 0,
        restsInserted: 0,
        gridStep: 0
      }
    };
  }

  const phaseOne = snapFlowAnchors(anchors, settings);
  const phaseTwo = buildFlowEventsFromAnchors(phaseOne.anchors, settings);
  return {
    events: phaseTwo.output,
    summary: {
      mode,
      label: settings.label,
      snappedCount: phaseOne.snappedCount,
      durationsShaped: phaseTwo.durationsShaped,
      barsInserted: phaseTwo.output.filter((event) => event.type === "bar").length,
      restsInserted: phaseTwo.restsInserted,
      gridStep: phaseOne.gridStep
    }
  };
}

function quantizeBeatDuration(seconds, beatSeconds, step = 0.25) {
  const beats = seconds / Math.max(0.001, beatSeconds);
  const quantized = Math.max(step, Math.round(beats / step) * step);
  return Number(quantized.toFixed(2));
}

function quantizeBeats(beats, step = 0.125) {
  const quantized = Math.max(step, Math.round(beats / step) * step);
  return Number(quantized.toFixed(3));
}

function estimateStopThreshold(notes, beatSeconds) {
  const gaps = [];
  for (let index = 1; index < notes.length; index += 1) {
    const gap = notes[index].start - notes[index - 1].end;
    if (gap > 0.015) gaps.push(gap);
  }

  const medianGap = median(gaps);
  if (!medianGap) return Math.max(0.08, Math.min(0.28, beatSeconds * 0.2));
  return Math.max(0.08, Math.min(0.42, Math.max(MELODY_JOIN_GAP_SECONDS, medianGap * 1.7, beatSeconds * 0.18)));
}

function estimateTempo(samples, sampleRate) {
  const frameLength = 1024;
  const hop = 512;
  const frameCount = Math.max(1, Math.floor((samples.length - frameLength) / hop));
  const rms = [];
  let previous = 0;

  for (let frame = 0; frame < frameCount; frame += 1) {
    const start = frame * hop;
    let energy = 0;
    for (let index = 0; index < frameLength; index += 1) {
      const sample = samples[start + index] || 0;
      energy += sample * sample;
    }
    const value = Math.sqrt(energy / frameLength);
    rms.push(Math.max(0, value - previous));
    previous = value * 0.72 + previous * 0.28;
  }

  const mean = rms.reduce((sum, value) => sum + value, 0) / Math.max(1, rms.length);
  const envelope = rms.map((value) => Math.max(0, value - mean * 0.65));
  const energy = envelope.reduce((sum, value) => sum + value * value, 0);
  if (energy <= 0.000001) return null;

  let best = null;
  for (let bpm = 56; bpm <= 188; bpm += 1) {
    const lag = Math.round((60 / bpm) * sampleRate / hop);
    if (lag < 2 || lag >= envelope.length) continue;

    let score = 0;
    let count = 0;
    for (let index = lag; index < envelope.length; index += 1) {
      score += envelope[index] * envelope[index - lag];
      if (index >= lag * 2) score += envelope[index] * envelope[index - lag * 2] * 0.45;
      count += 1;
    }
    score /= Math.max(1, count);
    if (!best || score > best.score) {
      best = { bpm, score };
    }
  }

  if (!best) return null;

  let bpm = best.bpm;
  if (bpm < 72) bpm *= 2;
  if (bpm > 168) bpm /= 2;

  return {
    bpm: Math.round(bpm),
    confidence: Math.max(0, Math.min(1, best.score / (energy / Math.max(1, envelope.length))))
  };
}

function createHannWindow(length) {
  const window = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    window[index] = 0.5 - 0.5 * Math.cos((TWO_PI * index) / Math.max(1, length - 1));
  }
  return window;
}

function buildOnsetEnvelope(samples, sampleRate, options = {}, onProgress) {
  const frameLength = options.frameLength || RHYTHM_FRAME_LENGTH;
  const hopLength = options.hopLength || RHYTHM_HOP_LENGTH;
  const batchSize = options.batchSize || 64;
  const frameCount = Math.max(1, Math.floor((samples.length - frameLength) / hopLength));
  const envelope = new Float32Array(frameCount);
  const hannWindow = createHannWindow(frameLength);

  return new Promise((resolve) => {
    let frame = 0;
    let previousRms = 0;
    let previousHigh = 0;
    let previousAbs = 0;
    let previousZcr = 0;

    function processBatch() {
      const batchEnd = Math.min(frameCount, frame + batchSize);
      for (; frame < batchEnd; frame += 1) {
        const start = frame * hopLength;
        let energy = 0;
        let highEnergy = 0;
        let absolute = 0;
        let zeroCrossings = 0;
        let previousSample = samples[start] || 0;

        for (let index = 0; index < frameLength; index += 1) {
          const sample = (samples[start + index] || 0) * hannWindow[index];
          const high = sample - previousSample;
          energy += sample * sample;
          highEnergy += high * high;
          absolute += Math.abs(sample);
          if ((sample >= 0 && previousSample < 0) || (sample < 0 && previousSample >= 0)) zeroCrossings += 1;
          previousSample = sample;
        }

        const rms = Math.sqrt(energy / frameLength);
        const high = Math.sqrt(highEnergy / frameLength);
        const absMean = absolute / frameLength;
        const zcr = zeroCrossings / frameLength;
        const flux =
          Math.max(0, rms - previousRms * 0.9) +
          Math.max(0, high - previousHigh * 0.86) * 0.68 +
          Math.max(0, absMean - previousAbs * 0.88) * 0.32 +
          Math.max(0, zcr - previousZcr * 1.04) * 0.045;

        envelope[frame] = flux;
        previousRms = previousRms * 0.64 + rms * 0.36;
        previousHigh = previousHigh * 0.64 + high * 0.36;
        previousAbs = previousAbs * 0.64 + absMean * 0.36;
        previousZcr = previousZcr * 0.64 + zcr * 0.36;
      }

      if (onProgress) onProgress(frame, frameCount);

      if (frame < frameCount) {
        window.requestAnimationFrame(processBatch);
      } else {
        resolve({
          envelope: Array.from(envelope),
          hopSeconds: hopLength / sampleRate
        });
      }
    }

    processBatch();
  });
}

function smoothEnvelope(values) {
  return values.map((value, index) => {
    const left = values[index - 1] || value;
    const right = values[index + 1] || value;
    return value * 0.62 + left * 0.19 + right * 0.19;
  });
}

function subtractLocalAverage(values, radius = 8) {
  return values.map((value, index) => {
    let total = 0;
    let count = 0;
    for (let offset = -radius; offset <= radius; offset += 1) {
      if (offset === 0) continue;
      const neighbor = values[index + offset];
      if (neighbor === undefined) continue;
      total += neighbor;
      count += 1;
    }
    const localAverage = count ? total / count : 0;
    return Math.max(0, value - localAverage * 0.72);
  });
}

function pickRhythmHits(envelope, hopSeconds, tempoEstimate, density) {
  if (!envelope.length) return [];

  const densitySettings = feelDensitySettings(density);
  const cleaned = subtractLocalAverage(smoothEnvelope(envelope));
  const positives = cleaned.filter((value) => value > 0);
  if (!positives.length) return [];

  const average = mean(positives);
  const deviation = standardDeviation(positives, average);
  const mid = median(positives);
  const threshold = Math.max(mid * (1.05 + densitySettings.rhythmThreshold), average + deviation * densitySettings.rhythmThreshold);
  const maxValue = Math.max(...positives, threshold);
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 0.5;
  const minGapSeconds = Math.max(0.075, beatSeconds * densitySettings.minRhythmGapBeats);
  const candidates = [];

  for (let index = 2; index < cleaned.length - 2; index += 1) {
    const value = cleaned[index];
    if (value < threshold) continue;
    if (value < cleaned[index - 1] || value < cleaned[index + 1]) continue;

    const localPeak = Math.max(cleaned[index - 2], cleaned[index - 1], value, cleaned[index + 1], cleaned[index + 2]);
    if (value < localPeak) continue;
    candidates.push({
      time: index * hopSeconds,
      strength: Math.max(0, Math.min(1, value / maxValue)),
      score: value
    });
  }

  candidates.sort((a, b) => b.score - a.score);
  const picked = [];
  candidates.forEach((candidate) => {
    const tooClose = picked.some((hit) => Math.abs(hit.time - candidate.time) < minGapSeconds);
    if (!tooClose) picked.push(candidate);
  });

  picked.sort((a, b) => a.time - b.time);
  return picked.map((hit, index) => {
    const beatIndex = beatSeconds ? Math.max(0, Math.round(hit.time / beatSeconds)) : index;
    return {
      time: hit.time,
      strength: hit.strength,
      score: hit.score,
      beatIndex,
      beatLabel: beatSeconds ? `${Math.floor(beatIndex / COMBINED_BEATS_PER_BAR) + 1}.${(beatIndex % COMBINED_BEATS_PER_BAR) + 1}` : String(index + 1)
    };
  });
}

async function buildRhythmTrack(samples, sampleRate, tempoEstimate, density, options = {}, onProgress) {
  const envelope = await buildOnsetEnvelope(samples, sampleRate, options, onProgress);
  return {
    hits: pickRhythmHits(envelope.envelope, envelope.hopSeconds, tempoEstimate, density),
    envelope
  };
}

function detectPitchYin(samples, start, sampleRate, threshold, frameLength = MELODY_FRAME_LENGTH) {
  const minTau = Math.max(2, Math.floor(sampleRate / MELODY_MAX_FREQ));
  const maxTau = Math.min(frameLength - 2, Math.ceil(sampleRate / MELODY_MIN_FREQ));
  const frameEnd = start + frameLength;
  if (frameEnd + maxTau >= samples.length) return null;

  let energy = 0;
  for (let index = 0; index < frameLength; index += 1) {
    const sample = samples[start + index] || 0;
    energy += sample * sample;
  }
  const rms = Math.sqrt(energy / frameLength);
  if (rms < 0.006) return null;

  const difference = new Float32Array(maxTau + 1);
  for (let tau = minTau; tau <= maxTau; tau += 1) {
    let sum = 0;
    for (let index = 0; index < frameLength; index += 1) {
      const delta = (samples[start + index] || 0) - (samples[start + index + tau] || 0);
      sum += delta * delta;
    }
    difference[tau] = sum;
  }

  let runningSum = 0;
  let bestTau = 0;
  let bestCmnd = Infinity;
  const cmnd = new Float32Array(maxTau + 1);

  for (let tau = minTau; tau <= maxTau; tau += 1) {
    runningSum += difference[tau];
    cmnd[tau] = runningSum > 0 ? (difference[tau] * tau) / runningSum : 1;
    if (cmnd[tau] < bestCmnd) {
      bestCmnd = cmnd[tau];
      bestTau = tau;
    }
  }

  let chosenTau = 0;
  for (let tau = minTau + 1; tau < maxTau; tau += 1) {
    if (cmnd[tau] < threshold && cmnd[tau] <= cmnd[tau - 1]) {
      while (tau + 1 < maxTau && cmnd[tau + 1] < cmnd[tau]) {
        tau += 1;
      }
      chosenTau = tau;
      break;
    }
  }

  if (!chosenTau && bestCmnd < threshold * 1.35) chosenTau = bestTau;
  if (!chosenTau) return null;

  const left = cmnd[chosenTau - 1] || cmnd[chosenTau];
  const center = cmnd[chosenTau];
  const right = cmnd[chosenTau + 1] || cmnd[chosenTau];
  const denominator = left - 2 * center + right;
  const offset = Math.abs(denominator) > 0.000001 ? 0.5 * (left - right) / denominator : 0;
  const refinedTau = chosenTau + Math.max(-0.5, Math.min(0.5, offset));
  const frequency = sampleRate / refinedTau;
  const midi = 69 + 12 * Math.log2(frequency / 440);

  if (!Number.isFinite(midi) || midi < 36 || midi > 96) return null;

  return {
    midi,
    frequency,
    confidence: Math.max(0, Math.min(1, 1 - center)),
    rms
  };
}

function smoothPitchFrames(frames) {
  return frames.map((frame, index) => {
    if (!frame) return null;
    const neighborMidis = [];
    for (let offset = -2; offset <= 2; offset += 1) {
      const neighbor = frames[index + offset];
      if (neighbor) neighborMidis.push(neighbor.midi);
    }
    return {
      ...frame,
      midi: median(neighborMidis)
    };
  });
}

function melodyChromaFromNotes(notes) {
  const chroma = Array(12).fill(0);
  notes.forEach((note) => {
    const pc = normalizePc(Math.round(note.midi));
    chroma[pc] += Math.max(0.1, note.end - note.start) * Math.max(0.1, note.confidence);
  });
  return chroma;
}

function pitchFramesToNotes(frames) {
  const notes = [];
  let current = null;

  function flush() {
    if (!current) return;
    const duration = current.end - current.start;
    if (duration >= MELODY_MIN_SECONDS) {
      current.midi = current.weightedMidi / Math.max(0.001, current.weight);
      current.confidence = current.confidence / Math.max(1, current.count);
      delete current.weightedMidi;
      delete current.weight;
      delete current.count;
      notes.push(current);
    }
    current = null;
  }

  frames.forEach((frame) => {
    if (!frame) {
      flush();
      return;
    }

    const mapping = chooseSkyButtonForMidi(frame.midi);
    const weight = Math.max(0.05, frame.confidence);
    const sameNote = current && current.buttonId === mapping.buttonId && frame.time - current.end <= MELODY_JOIN_GAP_SECONDS;

    if (!sameNote) {
      flush();
      current = {
        start: frame.time,
        end: frame.time + frame.duration,
        buttonId: mapping.buttonId,
        rawMidi: frame.midi,
        midi: frame.midi,
        weightedMidi: frame.midi * weight,
        weight,
        confidence: frame.confidence,
        count: 1
      };
      return;
    }

    current.end = frame.time + frame.duration;
    current.rawMidi = (current.rawMidi + frame.midi) / 2;
    current.weightedMidi += frame.midi * weight;
    current.weight += weight;
    current.confidence += frame.confidence;
    current.count += 1;
  });

  flush();

  const merged = [];
  notes.forEach((note) => {
    const last = merged[merged.length - 1];
    if (last && last.buttonId === note.buttonId && note.start - last.end <= MELODY_JOIN_GAP_SECONDS) {
      const lastDuration = last.end - last.start;
      const noteDuration = note.end - note.start;
      const total = lastDuration + noteDuration;
      last.end = note.end;
      last.midi = ((last.midi * lastDuration) + (note.midi * noteDuration)) / Math.max(0.001, total);
      last.confidence = Math.max(last.confidence, note.confidence);
    } else {
      merged.push(note);
    }
  });

  return merged;
}

function buildMelodyNotes(samples, duration, sampleRate, threshold, onProgress, options = {}) {
  const frameLength = options.frameLength || MELODY_FRAME_LENGTH;
  const hopLength = options.hopLength || MELODY_HOP_LENGTH;
  const batchSize = options.batchSize || 18;
  const frameCount = Math.max(1, Math.floor((samples.length - frameLength) / hopLength));
  const frames = new Array(frameCount).fill(null);

  return new Promise((resolve) => {
    let index = 0;

    function processBatch() {
      const batchEnd = Math.min(frameCount, index + batchSize);
      for (; index < batchEnd; index += 1) {
        const start = index * hopLength;
        const detected = detectPitchYin(samples, start, sampleRate, threshold, frameLength);
        if (detected) {
          frames[index] = {
            ...detected,
            time: start / sampleRate,
            duration: hopLength / sampleRate
          };
        }
      }

      if (onProgress) onProgress(index, frameCount);

      if (index < frameCount) {
        window.requestAnimationFrame(processBatch);
      } else {
        const notes = pitchFramesToNotes(smoothPitchFrames(frames)).filter((note) => note.start < duration);
        resolve({
          notes,
          chroma: melodyChromaFromNotes(notes)
        });
      }
    }

    processBatch();
  });
}

function buildAnalysisKernel(sampleRate, frameLength) {
  const window = new Float32Array(frameLength);
  for (let index = 0; index < frameLength; index += 1) {
    window[index] = 0.5 - 0.5 * Math.cos((TWO_PI * index) / Math.max(1, frameLength - 1));
  }

  const bins = [];
  for (let midi = ANALYSIS_MIDI_START; midi <= ANALYSIS_MIDI_END; midi += 1) {
    const frequency = midiToFrequency(midi);
    bins.push({
      midi,
      pc: normalizePc(midi),
      coeff: 2 * Math.cos((TWO_PI * frequency) / sampleRate),
      weight: 1 / (1 + Math.max(0, midi - 48) * 0.012)
    });
  }

  return { sampleRate, frameLength, window, bins };
}

function buildPianoSalienceKernel(sampleRate, frameLength) {
  const window = new Float32Array(frameLength);
  for (let index = 0; index < frameLength; index += 1) {
    window[index] = 0.5 - 0.5 * Math.cos((TWO_PI * index) / Math.max(1, frameLength - 1));
  }

  const nyquist = sampleRate / 2;
  const bins = [];
  for (let midi = PIANO_MIDI_START; midi <= PIANO_MIDI_END; midi += 1) {
    const frequency = midiToFrequency(midi);
    bins.push({
      midi,
      pc: normalizePc(midi),
      coeff: 2 * Math.cos((TWO_PI * frequency) / sampleRate),
      secondCoeff: frequency * 2 < nyquist ? 2 * Math.cos((TWO_PI * frequency * 2) / sampleRate) : null,
      thirdCoeff: frequency * 3 < nyquist ? 2 * Math.cos((TWO_PI * frequency * 3) / sampleRate) : null,
      melodyBias: 1 + Math.max(0, midi - 55) * 0.012,
      bassBias: 1 + Math.max(0, 63 - midi) * 0.01
    });
  }

  return { sampleRate, frameLength, window, bins };
}

function frameRms(samples, start, frameLength, window) {
  let energy = 0;
  for (let index = 0; index < frameLength; index += 1) {
    const sample = samples[start + index] || 0;
    const weighted = sample * window[index];
    energy += weighted * weighted;
  }
  return Math.sqrt(energy / frameLength);
}

function goertzelPower(samples, start, frameLength, coeff, window) {
  let s0 = 0;
  let s1 = 0;
  let s2 = 0;

  for (let index = 0; index < frameLength; index += 1) {
    const sample = (samples[start + index] || 0) * window[index];
    s0 = sample + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }

  return s1 * s1 + s2 * s2 - coeff * s1 * s2;
}

function extractPianoSalienceFrame(samples, start, kernel) {
  const scores = [];
  let total = 0;
  let rmsEnergy = 0;

  for (let index = 0; index < kernel.frameLength; index += 1) {
    const sample = (samples[start + index] || 0) * kernel.window[index];
    rmsEnergy += sample * sample;
  }

  kernel.bins.forEach((bin) => {
    const fundamental = goertzelPower(samples, start, kernel.frameLength, bin.coeff, kernel.window);
    const second = bin.secondCoeff ? goertzelPower(samples, start, kernel.frameLength, bin.secondCoeff, kernel.window) * 0.38 : 0;
    const third = bin.thirdCoeff ? goertzelPower(samples, start, kernel.frameLength, bin.thirdCoeff, kernel.window) * 0.18 : 0;
    const value = Math.log1p(Math.max(0, fundamental + second + third));
    scores.push(value);
    total += value;
  });

  const maxScore = Math.max(...scores, 0);
  const normalized = maxScore > 0 ? scores.map((score) => score / maxScore) : scores.map(() => 0);
  return {
    scores: normalized,
    total,
    maxScore,
    rms: Math.sqrt(rmsEnergy / kernel.frameLength)
  };
}

function normalizeVector(vector) {
  const total = vector.reduce((sum, value) => sum + Math.max(0, value), 0);
  if (total <= 0) return vector.map(() => 0);
  const normalized = vector.map((value) => Math.max(0, value) / total);
  const maxValue = Math.max(...normalized);
  if (maxValue <= 0) return normalized;
  return normalized.map((value) => value / maxValue);
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let aMag = 0;
  let bMag = 0;
  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    aMag += a[index] * a[index];
    bMag += b[index] * b[index];
  }
  if (aMag <= 0 || bMag <= 0) return 0;
  return dot / Math.sqrt(aMag * bMag);
}

function extractFrameChroma(samples, start, kernel) {
  const chroma = Array(12).fill(0);

  kernel.bins.forEach((bin) => {
    const power = goertzelPower(samples, start, kernel.frameLength, bin.coeff, kernel.window);
    chroma[bin.pc] += Math.log1p(Math.max(0, power)) * bin.weight;
  });

  return chroma;
}

function extractWindowChroma(samples, startSecond, endSecond, kernel, probeRatiosOverride = null) {
  const startSample = Math.max(0, Math.floor(startSecond * kernel.sampleRate));
  const endSample = Math.min(samples.length, Math.floor(endSecond * kernel.sampleRate));
  const span = Math.max(1, endSample - startSample);
  const probeRatios = probeRatiosOverride || (span > kernel.frameLength * 2 ? [0.25, 0.5, 0.75] : [0.5]);
  const chroma = Array(12).fill(0);
  let rms = 0;

  probeRatios.forEach((ratio) => {
    const center = startSample + span * ratio;
    const frameStart = Math.max(0, Math.min(samples.length - kernel.frameLength, Math.floor(center - kernel.frameLength / 2)));
    const frameChroma = extractFrameChroma(samples, frameStart, kernel);
    frameChroma.forEach((value, index) => {
      chroma[index] += value / probeRatios.length;
    });
    rms += frameRms(samples, frameStart, kernel.frameLength, kernel.window) / probeRatios.length;
  });

  return {
    chroma: normalizeVector(chroma),
    rms
  };
}

function chordTemplateVector(rootPc, template) {
  const vector = Array(12).fill(0.04);
  template.intervals.forEach((interval, index) => {
    const pc = normalizePc(rootPc + interval);
    vector[pc] = index === 0 ? 1.25 : interval === 7 ? 0.95 : 1;
  });
  return normalizeVector(vector);
}

function detectChord(chroma, rms, threshold) {
  if (rms < 0.004) {
    return {
      label: "N.C.",
      rootPc: 0,
      template: null,
      intervals: [],
      score: 0
    };
  }

  const scores = [];
  for (let rootPc = 0; rootPc < 12; rootPc += 1) {
    CHORD_TEMPLATES.forEach((template) => {
      const templateVector = chordTemplateVector(rootPc, template);
      const complexityPenalty = Math.max(0, template.intervals.length - 3) * 0.018;
      const score = cosineSimilarity(chroma, templateVector) - complexityPenalty + chroma[rootPc] * 0.035;
      scores.push({ rootPc, template, score });
    });
  }

  scores.sort((a, b) => b.score - a.score);
  const best = scores[0];
  const second = scores[1];
  if (!best || best.score < threshold || (second && best.score - second.score < 0.018)) {
    return {
      label: "N.C.",
      rootPc: 0,
      template: null,
      intervals: [],
      score: best ? Math.max(0, best.score) : 0
    };
  }

  return {
    label: chordLabel(best.rootPc, best.template),
    rootPc: best.rootPc,
    template: best.template.name,
    suffix: best.template.suffix,
    intervals: best.template.intervals,
    score: Math.max(0, best.score)
  };
}

function estimateMajorKey(chroma) {
  const normalized = normalizeVector(chroma);
  let best = null;

  for (let rootPc = 0; rootPc < 12; rootPc += 1) {
    const profile = Array(12).fill(0);
    MAJOR_KEY_PROFILE.forEach((value, index) => {
      profile[normalizePc(rootPc + index)] = value;
    });
    const score = cosineSimilarity(normalized, normalizeVector(profile));
    if (!best || score > best.score) {
      const keyId = SKY_KEY_BY_PC[rootPc];
      best = {
        pc: rootPc,
        keyId,
        label: KEY_CONFIGS.find((config) => config.id === keyId)?.label || `${noteNameForPc(rootPc)} major`,
        score
      };
    }
  }

  return best;
}

function addChroma(a, b, weight = 1) {
  return a.map((value, index) => value + (b[index] || 0) * weight);
}

function scoreSkyKeyForMelody(keyId, notes) {
  if (!notes.length) return Infinity;
  let weightedDistance = 0;
  let totalWeight = 0;

  notes.forEach((note) => {
    const sourceMidi = note.rawMidi || note.midi;
    const mapping = chooseSkyButtonForMidi(sourceMidi, keyId);
    const duration = Math.max(0.08, note.end - note.start);
    const confidence = Math.max(0.1, note.confidence || 0.5);
    const weight = duration * confidence;
    weightedDistance += mapping.distance * weight;
    totalWeight += weight;
  });

  return weightedDistance / Math.max(0.001, totalWeight);
}

function estimateBestSkyKeyForMelody(notes, fallbackKeyId = state.keyId) {
  if (!notes.length) return { keyId: fallbackKeyId, score: Infinity };
  let best = null;
  KEY_CONFIGS.forEach((config) => {
    const score = scoreSkyKeyForMelody(config.id, notes);
    if (!best || score < best.score) {
      best = {
        keyId: config.id,
        score
      };
    }
  });
  return best || { keyId: fallbackKeyId, score: Infinity };
}

function smoothChordFrames(frames) {
  const smoothed = frames.map((frame) => ({ ...frame }));
  for (let index = 1; index < smoothed.length - 1; index += 1) {
    const previous = smoothed[index - 1];
    const current = smoothed[index];
    const next = smoothed[index + 1];
    if (previous.label === next.label && current.label !== previous.label) {
      smoothed[index] = {
        ...current,
        label: previous.label,
        rootPc: previous.rootPc,
        template: previous.template,
        suffix: previous.suffix,
        intervals: previous.intervals,
        score: (previous.score + next.score) / 2
      };
    }
  }
  return smoothed;
}

function mergeFrames(frames) {
  const merged = [];
  frames.forEach((frame) => {
    const last = merged[merged.length - 1];
    if (last && last.label === frame.label) {
      const lastDuration = last.end - last.start;
      const frameDuration = frame.end - frame.start;
      const totalDuration = lastDuration + frameDuration;
      last.score = ((last.score * lastDuration) + (frame.score * frameDuration)) / Math.max(0.001, totalDuration);
      last.end = frame.end;
    } else {
      merged.push({ ...frame });
    }
  });
  return merged;
}

function enforceMinimumChordDuration(segments, minimumSeconds) {
  let next = segments.map((segment) => ({ ...segment }));

  for (let pass = 0; pass < 8; pass += 1) {
    const shortIndex = next.findIndex((segment) => {
      return segment.label !== "N.C." && segment.end - segment.start < minimumSeconds && next.length > 1;
    });
    if (shortIndex === -1) break;

    const left = next[shortIndex - 1];
    const current = next[shortIndex];
    const right = next[shortIndex + 1];
    const target = !left ? right : !right ? left : (right.end - right.start > left.end - left.start ? right : left);

    current.label = target.label;
    current.rootPc = target.rootPc;
    current.template = target.template;
    current.suffix = target.suffix;
    current.intervals = target.intervals;
    current.score = Math.min(current.score, target.score);
    next = mergeFrames(next);
  }

  return next;
}

function buildChordFrames(samples, duration, kernel, windowSeconds, threshold, onProgress, options = {}) {
  const frames = [];
  const globalChroma = Array(12).fill(0);
  const windowCount = Math.max(1, Math.ceil(duration / windowSeconds));
  const batchSize = options.batchSize || 4;
  const probeRatios = options.probeRatios || null;

  return new Promise((resolve) => {
    let index = 0;

    function processBatch() {
      const batchEnd = Math.min(windowCount, index + batchSize);
      for (; index < batchEnd; index += 1) {
        const start = index * windowSeconds;
        const end = Math.min(duration, start + windowSeconds);
        const extracted = extractWindowChroma(samples, start, end, kernel, probeRatios);
        extracted.chroma.forEach((value, pc) => {
          globalChroma[pc] += value;
        });
        const chord = detectChord(extracted.chroma, extracted.rms, threshold);
        frames.push({
          start,
          end,
          label: chord.label,
          rootPc: chord.rootPc,
          template: chord.template,
          suffix: chord.suffix,
          intervals: chord.intervals,
          score: chord.score
        });
      }

      if (onProgress) onProgress(index, windowCount);

      if (index < windowCount) {
        window.requestAnimationFrame(processBatch);
      } else {
        resolve({ frames, globalChroma });
      }
    }

    processBatch();
  });
}

function smoothSalienceFrames(frames, binCount) {
  return frames.map((frame, index) => {
    const scores = new Array(binCount).fill(0);
    for (let bin = 0; bin < binCount; bin += 1) {
      const previous = frames[index - 1] ? frames[index - 1].scores[bin] : frame.scores[bin];
      const next = frames[index + 1] ? frames[index + 1].scores[bin] : frame.scores[bin];
      scores[bin] = previous * 0.18 + frame.scores[bin] * 0.64 + next * 0.18;
    }
    return {
      ...frame,
      scores,
      maxScore: Math.max(...scores, 0)
    };
  });
}

function salienceChromaForFrame(frame, kernel) {
  const chroma = Array(12).fill(0);
  kernel.bins.forEach((bin, index) => {
    const score = frame.scores[index] || 0;
    if (score <= 0) return;
    const registerWeight = bin.midi < 48 ? 0.74 : bin.midi > 82 ? 0.86 : 1;
    chroma[bin.pc] += Math.pow(score, 1.32) * registerWeight;
  });
  return normalizeVector(chroma);
}

function pickSongFrameCandidates(frame, previousFrame, kernel, options = {}) {
  if (!frame || frame.rms < 0.0012 || frame.maxScore <= 0.015) return [];
  const maxCount = Math.max(3, options.translatorMaxFrameNotes || 6);
  const sensitivity = Math.max(0.1, options.translatorLeadSensitivity || 0.2);
  const candidates = [];

  kernel.bins.forEach((bin, index) => {
    const score = frame.scores[index] || 0;
    if (score < sensitivity) return;

    const previousScore = previousFrame ? previousFrame.scores[index] || 0 : 0;
    const left = frame.scores[index - 1] || 0;
    const right = frame.scores[index + 1] || 0;
    if (score < left * 0.92 || score < right * 0.92) return;

    const lowerOctave = frame.scores[index - 12] || 0;
    const lowerFifth = frame.scores[index - 7] || 0;
    const upperOctave = frame.scores[index + 12] || 0;
    const onset = Math.max(0, score - previousScore * 0.82);
    const harmonicShadow = Math.max(lowerOctave * 0.48, lowerFifth * 0.2, upperOctave * 0.08);
    const cleanScore = Math.max(0, score + onset * 0.72 - harmonicShadow * (onset > 0.06 ? 0.22 : 0.38));
    const leadBias = bin.midi >= 52 ? 1 + Math.min(0.2, (bin.midi - 52) * 0.006) : 0.7;
    const bassBias = bin.midi <= 58 ? 1 + Math.min(0.28, (58 - bin.midi) * 0.012) : 0.68;
    const harmonyBias = bin.midi >= 45 && bin.midi <= 78 ? 1 : 0.78;
    const confidence = Math.max(0.05, Math.min(1, cleanScore * 0.82 + onset * 0.34));

    candidates.push({
      midi: bin.midi,
      pc: bin.pc,
      score,
      cleanScore,
      onset,
      confidence,
      value: cleanScore + onset * 0.42,
      leadValue: cleanScore * leadBias + onset * 0.32,
      bassValue: cleanScore * bassBias + onset * 0.18,
      harmonyValue: cleanScore * harmonyBias + onset * 0.26
    });
  });

  candidates.sort((a, b) => b.value - a.value);
  const picked = [];
  candidates.forEach((candidate) => {
    if (picked.length >= maxCount) return;
    if (picked.some((item) => Math.abs(item.midi - candidate.midi) <= 1)) return;
    picked.push(candidate);
  });
  return picked.sort((a, b) => a.midi - b.midi);
}

function buildSongFrequencyCache(frames, kernel, options = {}) {
  const cachedFrames = [];
  const globalChroma = Array(12).fill(0);
  const onsetEnvelope = [];

  frames.forEach((frame, index) => {
    const previous = frames[index - 1] || null;
    let spectralFlux = 0;
    if (previous) {
      for (let bin = 0; bin < kernel.bins.length; bin += 1) {
        spectralFlux += Math.max(0, (frame.scores[bin] || 0) - (previous.scores[bin] || 0) * 0.84);
      }
      spectralFlux /= Math.max(1, kernel.bins.length);
    }

    const onset = Math.max(0, frame.rms - (previous ? previous.rms : 0) * 0.84) + spectralFlux * 0.9;
    const chroma = salienceChromaForFrame(frame, kernel);
    chroma.forEach((value, pc) => {
      globalChroma[pc] += value * Math.max(0.02, frame.rms);
    });

    const candidates = pickSongFrameCandidates(frame, previous, kernel, options);
    const bass = candidates
      .filter((candidate) => candidate.midi <= 64)
      .sort((a, b) => b.bassValue - a.bassValue)[0] || null;
    const harmony = candidates
      .filter((candidate) => candidate.midi >= 45 && candidate.midi <= 80)
      .sort((a, b) => b.harmonyValue - a.harmonyValue)
      .slice(0, Math.max(2, Math.min(5, options.translatorMaxFrameNotes || 5)));

    cachedFrames.push({
      time: frame.time,
      duration: frame.duration,
      rms: frame.rms,
      maxScore: frame.maxScore,
      chroma,
      onset,
      candidates,
      bass,
      harmony
    });
    onsetEnvelope.push(onset);
  });

  return {
    frames: cachedFrames,
    hopSeconds: frames[0] ? frames[0].duration : 0.08,
    globalChroma: normalizeVector(globalChroma),
    onsetEnvelope,
    duration: frames.length ? frames[frames.length - 1].time + frames[frames.length - 1].duration : 0
  };
}

function nearestSongFrame(cache, time) {
  if (!cache || !cache.frames || !cache.frames.length) return null;
  const index = Math.max(0, Math.min(cache.frames.length - 1, Math.round(time / Math.max(0.001, cache.hopSeconds || 0.08))));
  return cache.frames[index] || null;
}

function chooseLeadCandidateFromFrame(frame, previousMidi) {
  if (!frame || !frame.candidates.length) return null;
  let best = null;
  frame.candidates.forEach((candidate) => {
    if (candidate.midi < 45 || candidate.midi > 88) return;
    const continuity = previousMidi ? Math.max(0, 1 - Math.abs(candidate.midi - previousMidi) / 14) * 0.28 : 0;
    const octavePenalty = previousMidi && Math.abs(candidate.midi - previousMidi) > 12 ? 0.2 : 0;
    const leadRangePenalty = candidate.midi < 52 ? 0.12 : 0;
    const value = candidate.leadValue + continuity - octavePenalty - leadRangePenalty;
    if (!best || value > best.value) {
      best = {
        ...candidate,
        value,
        confidence: Math.max(candidate.confidence, Math.min(1, value * 0.62))
      };
    }
  });
  return best && best.value >= 0.18 ? best : null;
}

function buildTranslatorMelodyNotes(cache, duration, tempoEstimate) {
  const frames = [];
  let previousMidi = null;
  cache.frames.forEach((frame) => {
    const candidate = chooseLeadCandidateFromFrame(frame, previousMidi);
    if (candidate) previousMidi = candidate.midi;
    frames.push({
      time: frame.time,
      duration: frame.duration,
      candidate
    });
  });

  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  return markRecurringThemes(contourFramesToNotes(
    frames,
    Math.max(0.07, Math.min(0.16, beatSeconds * 0.16)),
    Math.max(0.1, Math.min(0.22, beatSeconds * 0.22)),
    "song-lead"
  ).filter((note) => note.start < duration));
}

function buildTranslatorChordFrames(cache, duration, windowSeconds, threshold, keyId = state.keyId) {
  const frames = [];
  const windowCount = Math.max(1, Math.ceil(duration / windowSeconds));
  for (let index = 0; index < windowCount; index += 1) {
    const start = index * windowSeconds;
    const end = Math.min(duration, start + windowSeconds);
    const chroma = Array(12).fill(0);
    let rms = 0;
    let count = 0;
    const pitchVotes = new Map();

    cache.frames.forEach((frame) => {
      if (frame.time < start || frame.time >= end) return;
      const weight = Math.max(0.02, frame.rms) * (1 + Math.min(0.75, frame.onset * 8));
      frame.chroma.forEach((value, pc) => {
        chroma[pc] += value * weight;
      });
      frame.harmony.forEach((candidate) => {
        const key = String(candidate.midi);
        pitchVotes.set(key, (pitchVotes.get(key) || 0) + candidate.harmonyValue * weight);
      });
      rms += frame.rms;
      count += 1;
    });

    const averagedRms = count ? rms / count : 0;
    let chord = detectChord(normalizeVector(chroma), averagedRms, Math.min(threshold, 0.52));
    const votedMidis = [...pitchVotes.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([midi]) => Number(midi));
    const pitchChord = detectChordFromMidiPitches(votedMidis, keyId);
    if (
      pitchChord.label !== "N.C." &&
      (chord.label === "N.C." || pitchChord.score > chord.score + 0.08 || votedMidis.length >= 4)
    ) {
      chord = pitchChord;
    }

    frames.push({
      start,
      end,
      label: chord.label,
      rootPc: chord.rootPc,
      bassPc: chord.bassPc,
      template: chord.template,
      suffix: chord.suffix,
      intervals: chord.intervals,
      score: chord.score,
      source: "song-frequency-cache"
    });
  }

  return smoothChordFrames(mergeFrames(frames));
}

function buildTranslatorRhythmHits(cache, tempoEstimate, density) {
  const envelope = {
    envelope: cache.onsetEnvelope,
    hopSeconds: cache.hopSeconds
  };
  return pickRhythmHits(envelope.envelope, envelope.hopSeconds, tempoEstimate, density)
    .map((hit) => ({ ...hit, source: "song-frequency-cache" }));
}

function buildTranslatorBackgroundNotes(cache, chordSegments, rhythmHits, duration, tempoEstimate, density) {
  const settings = feelDensitySettings(density);
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const minGap = Math.max(0.12, beatSeconds * (density === "full" ? 0.45 : 0.68));
  const notes = [];
  let lastTime = -minGap;

  rhythmHits.forEach((hit) => {
    if (hit.time - lastTime < minGap || hit.time >= duration) return;
    if (hit.strength < Math.max(0.18, settings.rhythmThreshold * 0.62)) return;
    const frame = nearestSongFrame(cache, hit.time);
    const segment = findChordSegmentAtTime(chordSegments, hit.time);
    const bassCandidate = frame && frame.bass ? frame.bass : null;
    let midi = bassCandidate ? bassCandidate.midi : null;
    if ((!midi || (bassCandidate && bassCandidate.confidence < 0.18)) && segment && segment.label !== "N.C.") {
      midi = 48 + normalizePc(segment.rootPc);
      while (midi > 58) midi -= 12;
      while (midi < 40) midi += 12;
    }
    if (!midi) return;

    const mapping = chooseSkyButtonForMidi(midi);
    notes.push({
      start: hit.time,
      end: Math.min(duration, hit.time + Math.max(0.12, beatSeconds * 0.55)),
      buttonId: mapping.buttonId,
      rawMidi: midi,
      midi,
      confidence: Math.max(0.18, Math.min(1, hit.strength * 0.72 + (bassCandidate ? bassCandidate.confidence * 0.28 : 0.12))),
      onsetStrength: hit.strength,
      source: "song-accompaniment"
    });
    lastTime = hit.time;
  });

  return markRecurringThemes(mergeNearDuplicateNotes(notes));
}

function buildNeuralActivationFrames(frames, kernel) {
  return frames.map((frame, index) => {
    const previous = frames[index - 1] || frame;
    const next = frames[index + 1] || frame;
    const activations = new Array(kernel.bins.length).fill(0);
    const onsets = new Array(kernel.bins.length).fill(0);
    let maxActivation = 0;

    kernel.bins.forEach((bin, binIndex) => {
      if (bin.midi < NEURAL_LATTICE_MIN_MIDI || bin.midi > NEURAL_LATTICE_MAX_MIDI) return;

      const current = frame.scores[binIndex] || 0;
      const prev = previous.scores[binIndex] || 0;
      const ahead = next.scores[binIndex] || 0;
      const left = frame.scores[binIndex - 1] || 0;
      const right = frame.scores[binIndex + 1] || 0;
      const lowerOctave = frame.scores[binIndex - 12] || 0;
      const lowerFifth = frame.scores[binIndex - 7] || 0;
      const upperOctave = frame.scores[binIndex + 12] || 0;
      const onset = Math.max(0, current - prev * 0.86);
      const sustain = current * 0.58 + prev * 0.21 + ahead * 0.21;
      const pitchPeak = Math.max(0, current - Math.max(left, right) * 0.62);
      const harmonicShadow = Math.max(lowerOctave * 0.42, lowerFifth * 0.18, upperOctave * 0.08);
      const onsetProtection = onset > 0.08 ? 0.52 : 1;
      const registerBias = bin.midi >= 50 ? 1 + Math.min(0.18, (bin.midi - 50) * 0.004) : 0.92;
      const value = Math.max(0, (sustain * 0.68 + onset * 1.15 + pitchPeak * 0.5 - harmonicShadow * 0.24 * onsetProtection) * registerBias);
      activations[binIndex] = value;
      onsets[binIndex] = onset;
      maxActivation = Math.max(maxActivation, value);
    });

    if (maxActivation > 0) {
      for (let binIndex = 0; binIndex < activations.length; binIndex += 1) {
        activations[binIndex] /= maxActivation;
        onsets[binIndex] = Math.min(1, onsets[binIndex] / maxActivation);
      }
    }

    return {
      ...frame,
      activations,
      onsets,
      maxActivation: maxActivation > 0 ? 1 : 0
    };
  });
}

function pickNeuralFrameCandidates(frame, kernel, previousMidis, options = {}) {
  if (!frame || frame.rms < 0.0016 || !frame.maxActivation) return [];
  const maxCount = Math.max(3, options.neuralMaxFrameNotes || 6);
  const threshold = Math.max(0.12, options.neuralSensitivity || 0.32);
  const candidates = [];

  kernel.bins.forEach((bin, index) => {
    const score = frame.activations[index] || 0;
    if (score < threshold) return;

    const left = frame.activations[index - 1] || 0;
    const right = frame.activations[index + 1] || 0;
    if (score < left * 0.96 || score < right * 0.96) return;

    const continuity = previousMidis && previousMidis.length
      ? Math.max(...previousMidis.map((midi) => Math.max(0, 1 - Math.abs(midi - bin.midi) / 12))) * 0.16
      : 0;
    const topLineBias = Math.max(0, Math.min(0.16, (bin.midi - 56) * 0.006));
    const bassPenalty = bin.midi < 45 ? 0.06 : 0;
    const onset = frame.onsets[index] || 0;
    const value = score + onset * 0.52 + continuity + topLineBias - bassPenalty;
    candidates.push({
      midi: bin.midi,
      score,
      onset,
      value,
      confidence: Math.max(0.08, Math.min(1, score * 0.72 + onset * 0.38))
    });
  });

  candidates.sort((a, b) => b.value - a.value);
  const picked = [];
  candidates.forEach((candidate) => {
    if (picked.length >= maxCount) return;
    if (picked.some((item) => Math.abs(item.midi - candidate.midi) <= 1)) return;
    picked.push(candidate);
  });
  return picked.sort((a, b) => a.midi - b.midi);
}

function flushNeuralActiveNote(active, notes, minSeconds) {
  if (!active) return;
  const duration = active.end - active.start;
  if (duration < minSeconds || active.weight <= 0) return;

  const midi = active.weightedMidi / active.weight;
  const confidence = Math.max(0.06, Math.min(1, active.confidence / Math.max(1, active.count)));
  const mapping = chooseSkyButtonForMidi(midi);
  notes.push({
    start: active.start,
    end: active.end,
    buttonId: mapping.buttonId,
    rawMidi: midi,
    midi,
    confidence,
    onsetStrength: active.onsetStrength,
    source: "neural-lattice",
    role: "harmony"
  });
}

function neuralCandidateFramesToNotes(candidateFrames, duration, tempoEstimate) {
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const minSeconds = Math.max(0.055, Math.min(0.16, beatSeconds * 0.16));
  const bridgeGap = Math.max(0.045, Math.min(0.18, beatSeconds * 0.2));
  const active = new Map();
  const notes = [];

  candidateFrames.forEach((frame) => {
    const seen = new Set();
    frame.candidates.forEach((candidate) => {
      const key = String(Math.round(candidate.midi));
      seen.add(key);
      let current = active.get(key);
      if (!current || frame.time - current.lastSeen > bridgeGap) {
        flushNeuralActiveNote(current, notes, minSeconds);
        current = {
          start: frame.time,
          end: frame.time + frame.duration,
          lastSeen: frame.time,
          weightedMidi: 0,
          weight: 0,
          confidence: 0,
          onsetStrength: 0,
          count: 0
        };
        active.set(key, current);
      }

      const weight = Math.max(0.04, candidate.confidence);
      current.end = Math.max(current.end, frame.time + frame.duration);
      current.lastSeen = frame.time;
      current.weightedMidi += candidate.midi * weight;
      current.weight += weight;
      current.confidence += candidate.confidence;
      current.onsetStrength = Math.max(current.onsetStrength, candidate.onset || 0);
      current.count += 1;
    });

    active.forEach((current, key) => {
      if (!seen.has(key) && frame.time - current.lastSeen > bridgeGap) {
        flushNeuralActiveNote(current, notes, minSeconds);
        active.delete(key);
      }
    });
  });

  active.forEach((current) => flushNeuralActiveNote(current, notes, minSeconds));
  return notes
    .filter((note) => note.start < duration && note.confidence >= 0.1)
    .sort((a, b) => a.start - b.start || b.midi - a.midi);
}

function annotateNeuralNoteRoles(notes, tempoEstimate) {
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const groupWindow = Math.max(0.045, Math.min(0.14, beatSeconds * 0.16));
  const groups = [];

  notes.forEach((note) => {
    let group = groups[groups.length - 1];
    if (!group || note.start - group.time > groupWindow) {
      group = { time: note.start, notes: [] };
      groups.push(group);
    }
    group.notes.push(note);
  });

  groups.forEach((group) => {
    const sortedHigh = [...group.notes].sort((a, b) => b.midi - a.midi || b.confidence - a.confidence);
    const sortedLow = [...group.notes].sort((a, b) => a.midi - b.midi || b.confidence - a.confidence);
    const lead = sortedHigh[0];
    const bass = sortedLow[0];
    group.notes.forEach((note) => {
      if (note === lead && note.midi >= 48) {
        note.role = "foreground";
        note.source = "neural-foreground";
        note.confidence = Math.min(1, note.confidence + 0.08);
      } else if (note === bass || note.midi < 52) {
        note.role = "background";
        note.source = "neural-background";
        note.confidence = Math.min(1, note.confidence + 0.03);
      } else {
        note.role = "harmony";
        note.source = "neural-harmony";
      }
    });
  });

  return notes;
}

function splitNeuralTracks(notes) {
  const foregroundNotes = notes
    .filter((note) => note.role === "foreground" && note.confidence >= 0.14)
    .map((note) => ({ ...note }));
  const backgroundNotes = notes
    .filter((note) => note.role !== "foreground" && note.confidence >= 0.16)
    .map((note) => ({ ...note }));
  return {
    allNotes: markRecurringThemes(mergeNearDuplicateNotes(notes.map((note) => ({ ...note })))),
    foregroundNotes: markRecurringThemes(mergeNearDuplicateNotes(foregroundNotes)),
    backgroundNotes: markRecurringThemes(mergeNearDuplicateNotes(backgroundNotes))
  };
}

function notesOverlapSeconds(note, start, end) {
  return Math.max(0, Math.min(note.end, end) - Math.max(note.start, start));
}

function buildNeuralChordFrames(notes, duration, windowSeconds, keyId) {
  const frames = [];
  const windowCount = Math.max(1, Math.ceil(duration / windowSeconds));

  for (let index = 0; index < windowCount; index += 1) {
    const start = index * windowSeconds;
    const end = Math.min(duration, start + windowSeconds);
    const weighted = notes
      .map((note) => {
        const overlap = notesOverlapSeconds(note, start, end);
        const startsInside = note.start >= start && note.start < end;
        const weight = overlap * Math.max(0.08, note.confidence || 0.2) + (startsInside ? Math.max(0, note.onsetStrength || 0) * 0.16 : 0);
        return { note, weight };
      })
      .filter((item) => item.weight > 0.025)
      .sort((a, b) => b.weight - a.weight);

    const picked = [];
    weighted.forEach((item) => {
      if (picked.length >= 7) return;
      if (picked.some((existing) => Math.abs(existing.note.midi - item.note.midi) <= 1)) return;
      picked.push(item);
    });

    const midis = picked.map((item) => item.note.midi);
    const chord = detectChordFromMidiPitches(midis, keyId);
    frames.push({
      start,
      end,
      label: chord.label,
      rootPc: chord.rootPc,
      bassPc: chord.bassPc,
      template: chord.template,
      suffix: chord.suffix,
      intervals: chord.intervals,
      noteCount: midis.length,
      score: chord.label === "N.C." ? chord.score : Math.max(0, Math.min(1, chord.score + Math.min(0.12, picked.length * 0.018))),
      source: "neural-lattice"
    });
  }

  return frames;
}

function fuseAudioChordSegments(chromaSegments, neuralFrames, minimumSeconds, duration) {
  const base = chromaSegments && chromaSegments.length ? chromaSegments : [];
  const neural = neuralFrames && neuralFrames.length ? neuralFrames : [];
  if (!base.length) return enforceMinimumChordDuration(mergeFrames(neural), minimumSeconds);
  if (!neural.length) return enforceMinimumChordDuration(mergeFrames(base), minimumSeconds);

  const fused = base.map((segment) => {
    const center = (segment.start + segment.end) / 2;
    const neuralSegment = findChordSegmentAtTime(neural, center);
    const neuralPlayable = neuralSegment && neuralSegment.label !== "N.C.";
    const chromaPlayable = segment.label !== "N.C.";
    const useNeural = neuralPlayable && (
      !chromaPlayable ||
      (segment.score < 0.56 && neuralSegment.score >= 0.5) ||
      (neuralSegment.noteCount >= 3 && neuralSegment.score > (segment.score || 0) + 0.08)
    );

    if (!useNeural) return { ...segment, source: segment.source || "chroma" };
    return {
      ...segment,
      label: neuralSegment.label,
      rootPc: neuralSegment.rootPc,
      bassPc: neuralSegment.bassPc,
      template: neuralSegment.template,
      suffix: neuralSegment.suffix,
      intervals: neuralSegment.intervals,
      score: Math.max(segment.score || 0, neuralSegment.score || 0),
      source: "neural-corrected"
    };
  });

  neural.forEach((segment) => {
    if (segment.label === "N.C.") return;
    const overlaps = fused.some((existing) => notesOverlapSeconds(segment, existing.start, existing.end) > Math.min(0.12, (segment.end - segment.start) * 0.35));
    if (!overlaps && segment.start < duration) fused.push({ ...segment });
  });

  return enforceMinimumChordDuration(mergeFrames(smoothChordFrames(fused.sort((a, b) => a.start - b.start))), minimumSeconds);
}

function pickForegroundCandidate(frame, kernel, previousMidi) {
  if (!frame || frame.rms < 0.002 || frame.maxScore <= 0.02) return null;
  let best = null;
  const threshold = Math.max(0.18, frame.maxScore * 0.42);

  kernel.bins.forEach((bin, index) => {
    const score = frame.scores[index] || 0;
    if (score < threshold || bin.midi < 48) return;

    const continuity = previousMidi ? Math.max(0, 1 - Math.abs(bin.midi - previousMidi) / 14) * 0.28 : 0;
    const topLineBias = Math.max(0, Math.min(0.22, (bin.midi - 55) * 0.008));
    const octavePenalty = previousMidi && Math.abs(bin.midi - previousMidi) > 12 ? 0.16 : 0;
    const value = score * bin.melodyBias + continuity + topLineBias - octavePenalty;
    if (!best || value > best.value) {
      best = {
        midi: bin.midi,
        score,
        value,
        confidence: Math.max(0.08, Math.min(1, score))
      };
    }
  });

  return best;
}

function pickBackgroundCandidates(frame, kernel, foregroundMidi, maxCount = 3) {
  if (!frame || frame.rms < 0.002 || frame.maxScore <= 0.02) return [];
  const threshold = Math.max(0.2, frame.maxScore * 0.48);
  const candidates = [];

  kernel.bins.forEach((bin, index) => {
    const score = frame.scores[index] || 0;
    if (score < threshold) return;
    if (foregroundMidi && Math.abs(bin.midi - foregroundMidi) <= 2) return;
    const value = score * bin.bassBias + (bin.midi < 65 ? 0.08 : 0);
    candidates.push({
      midi: bin.midi,
      score,
      value,
      confidence: Math.max(0.08, Math.min(1, score * 0.84))
    });
  });

  candidates.sort((a, b) => b.value - a.value);
  const picked = [];
  candidates.forEach((candidate) => {
    if (picked.length >= maxCount) return;
    if (picked.some((item) => Math.abs(item.midi - candidate.midi) <= 2)) return;
    picked.push(candidate);
  });
  return picked;
}

function contourFramesToNotes(frames, minSeconds, joinGapSeconds, source) {
  const notes = [];
  let current = null;

  function flush() {
    if (!current) return;
    const duration = current.end - current.start;
    if (duration >= minSeconds) {
      current.midi = current.weightedMidi / Math.max(0.001, current.weight);
      current.rawMidi = current.midi;
      current.confidence = current.confidence / Math.max(1, current.count);
      delete current.weightedMidi;
      delete current.weight;
      delete current.count;
      notes.push(current);
    }
    current = null;
  }

  frames.forEach((frame) => {
    if (!frame || !frame.candidate) {
      flush();
      return;
    }

    const mapping = chooseSkyButtonForMidi(frame.candidate.midi);
    const weight = Math.max(0.05, frame.candidate.confidence);
    const sameNote = current &&
      current.buttonId === mapping.buttonId &&
      frame.time - current.end <= joinGapSeconds;

    if (!sameNote) {
      flush();
      current = {
        start: frame.time,
        end: frame.time + frame.duration,
        buttonId: mapping.buttonId,
        rawMidi: frame.candidate.midi,
        midi: frame.candidate.midi,
        weightedMidi: frame.candidate.midi * weight,
        weight,
        confidence: frame.candidate.confidence,
        source,
        count: 1
      };
      return;
    }

    current.end = frame.time + frame.duration;
    current.weightedMidi += frame.candidate.midi * weight;
    current.weight += weight;
    current.confidence += frame.candidate.confidence;
    current.count += 1;
  });

  flush();
  return notes;
}

function markRecurringThemes(notes) {
  const sorted = notes.map((note) => ({ ...note })).sort((a, b) => a.start - b.start);
  const counts = new Map();
  for (let index = 0; index <= sorted.length - 3; index += 1) {
    const key = sorted.slice(index, index + 3).map((note) => note.buttonId).join("-");
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  for (let index = 0; index <= sorted.length - 3; index += 1) {
    const key = sorted.slice(index, index + 3).map((note) => note.buttonId).join("-");
    const count = counts.get(key) || 0;
    if (count < 2) continue;
    for (let offset = 0; offset < 3; offset += 1) {
      const note = sorted[index + offset];
      note.themeStrength = Math.max(note.themeStrength || 0, Math.min(1, 0.35 + count * 0.12));
      note.source = note.source ? `${note.source}+theme` : "theme";
    }
  }

  return sorted;
}

function mergeNearDuplicateNotes(notes) {
  const merged = [];
  notes
    .sort((a, b) => a.start - b.start || b.confidence - a.confidence)
    .forEach((note) => {
      const last = merged[merged.length - 1];
      if (last && last.buttonId === note.buttonId && note.start - last.end <= 0.16) {
        const lastDuration = Math.max(0.001, last.end - last.start);
        const noteDuration = Math.max(0.001, note.end - note.start);
        const total = lastDuration + noteDuration;
        last.end = Math.max(last.end, note.end);
        last.midi = (last.midi * lastDuration + note.midi * noteDuration) / total;
        last.rawMidi = last.midi;
        last.confidence = Math.max(last.confidence || 0, note.confidence || 0);
        last.themeStrength = Math.max(last.themeStrength || 0, note.themeStrength || 0);
        return;
      }
      merged.push({ ...note });
    });
  return merged;
}

function melodyCoverage(notes, duration) {
  if (!duration || !notes.length) return 0;
  const covered = notes.reduce((sum, note) => sum + Math.max(0, note.end - note.start), 0);
  return covered / Math.max(0.001, duration);
}

function mergeMelodySources(yinNotes, pianoNotes, duration, tempoEstimate) {
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const yinCoverage = melodyCoverage(yinNotes, duration);
  const pianoCoverage = melodyCoverage(pianoNotes, duration);

  if (!pianoNotes.length) return markRecurringThemes(mergeNearDuplicateNotes(yinNotes.map((note) => ({ ...note, source: note.source || "yin" }))));
  if (!yinNotes.length || yinNotes.length < 6 || yinCoverage < 0.025 || pianoCoverage > yinCoverage * 1.8) {
    return markRecurringThemes(mergeNearDuplicateNotes(pianoNotes));
  }

  const fused = yinNotes.map((note) => ({ ...note, source: note.source || "yin" }));
  pianoNotes.forEach((note) => {
    const overlap = fused.some((existing) => {
      const start = Math.max(existing.start, note.start);
      const end = Math.min(existing.end, note.end);
      return end - start > Math.min(beatSeconds * 0.35, 0.16);
    });
    if (!overlap || (note.themeStrength && note.confidence > 0.38)) {
      fused.push({ ...note });
    }
  });

  return markRecurringThemes(mergeNearDuplicateNotes(fused));
}

function hasNearbyMappedNote(notes, candidate, maxSeconds, requireSameButton = true) {
  const candidateMapping = melodyMapping(candidate);
  return notes.some((note) => {
    const mapping = melodyMapping(note);
    const sameButton = !requireSameButton || mapping.buttonId === candidateMapping.buttonId;
    if (!sameButton) return false;
    const overlap = notesOverlapSeconds(note, candidate.start, candidate.end);
    const nearStart = Math.abs(note.start - candidate.start) <= maxSeconds;
    return overlap > 0.015 || nearStart;
  });
}

function mergeMelodyWithNeuralForeground(baseNotes, neuralForeground, duration, tempoEstimate, aggressive = false) {
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const maxSeconds = Math.max(0.08, Math.min(0.24, beatSeconds * (aggressive ? 0.38 : 0.28)));
  const fused = baseNotes.map((note) => ({ ...note }));
  const limit = Math.max(80, Math.min(1600, Math.ceil(duration * (aggressive ? 4.2 : 2.2))));
  let added = 0;

  neuralForeground
    .filter((note) => note.confidence >= (aggressive ? 0.16 : 0.24))
    .sort((a, b) => (b.themeStrength || 0) - (a.themeStrength || 0) || b.confidence - a.confidence)
    .forEach((note) => {
      if (added >= limit) return;
      if (hasNearbyMappedNote(fused, note, maxSeconds, true)) return;
      fused.push({
        ...note,
        source: note.source && note.source.includes("recovered") ? note.source : `${note.source || "neural"}+recovered`
      });
      added += 1;
    });

  return {
    notes: markRecurringThemes(mergeNearDuplicateNotes(fused).filter((note) => note.start < duration)),
    added
  };
}

function mergeBackgroundSources(primary, neuralBackground, duration, tempoEstimate, aggressive = false) {
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const maxSeconds = Math.max(0.1, Math.min(0.32, beatSeconds * 0.48));
  const fused = primary.map((note) => ({ ...note }));
  const limit = Math.max(60, Math.min(1400, Math.ceil(duration * (aggressive ? 3.4 : 1.6))));
  let added = 0;

  neuralBackground
    .filter((note) => note.confidence >= (aggressive ? 0.18 : 0.28))
    .sort((a, b) => b.confidence - a.confidence)
    .forEach((note) => {
      if (added >= limit) return;
      if (hasNearbyMappedNote(fused, note, maxSeconds, false)) return;
      fused.push({
        ...note,
        source: note.source && note.source.includes("recovered") ? note.source : `${note.source || "neural"}+recovered`
      });
      added += 1;
    });

  return {
    notes: markRecurringThemes(mergeNearDuplicateNotes(fused).filter((note) => note.start < duration)),
    added
  };
}

function deriveRhythmHitsFromNotes(notes, existingHits, tempoEstimate, duration, aggressive = false) {
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const maxDistance = Math.max(0.06, Math.min(0.22, beatSeconds * 0.28));
  const minGap = Math.max(0.07, Math.min(0.22, beatSeconds * (aggressive ? 0.18 : 0.28)));
  const hits = [];
  let lastTime = -minGap;

  notes
    .filter((note) => note.start < duration && (note.onsetStrength || note.confidence || 0) >= (aggressive ? 0.16 : 0.26))
    .sort((a, b) => a.start - b.start || b.confidence - a.confidence)
    .forEach((note) => {
      if (note.start - lastTime < minGap) return;
      const exists = existingHits.some((hit) => Math.abs(hit.time - note.start) <= maxDistance);
      if (exists) return;
      const beatIndex = Math.max(0, Math.round(note.start / Math.max(0.001, beatSeconds)));
      hits.push({
        time: note.start,
        strength: Math.max(0.18, Math.min(0.9, (note.confidence || 0.2) * 0.72 + (note.onsetStrength || 0) * 0.28)),
        score: note.confidence || 0.2,
        beatIndex,
        beatLabel: `${Math.floor(beatIndex / COMBINED_BEATS_PER_BAR) + 1}.${(beatIndex % COMBINED_BEATS_PER_BAR) + 1}`,
        source: "neural-onset"
      });
      lastTime = note.start;
    });

  return hits;
}

function mergeRhythmSources(existingHits, recoveredHits, tempoEstimate) {
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const maxDistance = Math.max(0.055, Math.min(0.2, beatSeconds * 0.24));
  const merged = existingHits.map((hit) => ({ ...hit }));
  recoveredHits.forEach((hit) => {
    const existing = merged.find((item) => Math.abs(item.time - hit.time) <= maxDistance);
    if (existing) {
      existing.strength = Math.max(existing.strength, hit.strength);
      existing.score = Math.max(existing.score || 0, hit.score || 0);
      return;
    }
    merged.push({ ...hit });
  });
  return merged.sort((a, b) => a.time - b.time);
}

function addNoteChroma(chroma, midi, weight = 1) {
  chroma[normalizePc(Math.round(midi))] += Math.max(0, weight);
}

function buildTimingBins(size = 64) {
  return Array(size).fill(0);
}

function normalizeTimingBins(values) {
  const maxValue = Math.max(...values, 0);
  if (maxValue <= 0) return values;
  return values.map((value) => value / maxValue);
}

function buildInputFeatureSignature(globalChroma, rhythmEnvelope, neuralNotes, duration) {
  const chroma = normalizeVector(globalChroma && globalChroma.length ? globalChroma : Array(12).fill(0));
  neuralNotes.forEach((note) => {
    addNoteChroma(chroma, note.midi, Math.max(0.04, note.confidence || 0.2) * Math.max(0.04, note.end - note.start) * 0.2);
  });

  const timing = buildTimingBins();
  if (rhythmEnvelope && Array.isArray(rhythmEnvelope.envelope) && rhythmEnvelope.hopSeconds) {
    rhythmEnvelope.envelope.forEach((value, index) => {
      const time = index * rhythmEnvelope.hopSeconds;
      const bin = Math.max(0, Math.min(timing.length - 1, Math.floor((time / Math.max(0.001, duration)) * timing.length)));
      timing[bin] += Math.max(0, value);
    });
  }

  neuralNotes.forEach((note) => {
    const bin = Math.max(0, Math.min(timing.length - 1, Math.floor((note.start / Math.max(0.001, duration)) * timing.length)));
    timing[bin] += Math.max(0.05, note.confidence || 0.2) * 0.35;
  });

  return {
    chroma: normalizeVector(chroma),
    timing: normalizeTimingBins(timing),
    noteOnsetCount: neuralNotes.length,
    duration
  };
}

function buildSkyOutputFeatureSignature(events, keyId, duration) {
  const chroma = Array(12).fill(0);
  const timing = buildTimingBins();
  let noteEventCount = 0;

  events.forEach((event) => {
    if (event.type !== "note") return;
    noteEventCount += 1;
    const eventTime = Number.isFinite(event.time) ? event.time : 0;
    const bin = Math.max(0, Math.min(timing.length - 1, Math.floor((eventTime / Math.max(0.001, duration)) * timing.length)));
    timing[bin] += Math.max(0.08, event.strength || 0.4);
    event.notes.forEach((buttonId) => {
      const midi = skyMidiForButton(buttonId, keyId);
      addNoteChroma(chroma, midi, Math.max(0.1, event.duration || 0.25) * Math.max(0.2, event.strength || 0.4));
    });
  });

  return {
    chroma: normalizeVector(chroma),
    timing: normalizeTimingBins(timing),
    noteEventCount
  };
}

function compareAudioToSkyOutput(inputSignature, events, keyId, duration) {
  const output = buildSkyOutputFeatureSignature(events, keyId, duration || inputSignature.duration || 1);
  const chromaSimilarity = cosineSimilarity(inputSignature.chroma || [], output.chroma || []);
  const timingSimilarity = cosineSimilarity(inputSignature.timing || [], output.timing || []);
  const expectedCount = Math.max(1, inputSignature.noteOnsetCount || 1);
  const noteCoverage = Math.max(0, Math.min(1, output.noteEventCount / expectedCount));
  const score = Math.max(0, Math.min(1, chromaSimilarity * 0.44 + timingSimilarity * 0.34 + noteCoverage * 0.22));
  return {
    score,
    chromaSimilarity,
    timingSimilarity,
    noteCoverage,
    noteEventCount: output.noteEventCount,
    expectedCount
  };
}

function applyAudioSelfCorrection(analysis, neuralTracks, inputSignature, settings, density) {
  const summary = {
    passes: 0,
    melodyAdded: 0,
    backgroundAdded: 0,
    rhythmAdded: 0,
    reason: "stable"
  };
  const playability = analysis.playability || (els.playabilitySelect ? els.playabilitySelect.value : "human");
  const target = playabilitySettings(playability);

  for (let pass = 0; pass < Math.max(1, settings.selfCorrectPasses || 1); pass += 1) {
    rebuildCombinedAnalysis();
    const quality = compareAudioToSkyOutput(inputSignature, analysis.combinedEvents || [], state.keyId, analysis.duration);
    analysis.quality = quality;
    if (quality.score >= target.targetScore && quality.noteCoverage >= target.targetCoverage) break;

    const aggressive = pass > 0 || quality.score < target.targetScore - 0.12 || quality.noteCoverage < target.targetCoverage - 0.12;
    const melodyMerge = mergeMelodyWithNeuralForeground(
      analysis.melodyNotes || [],
      neuralTracks.foregroundNotes || [],
      analysis.duration,
      analysis.tempoEstimate,
      aggressive
    );
    const backgroundMerge = mergeBackgroundSources(
      analysis.backgroundNotes || [],
      neuralTracks.backgroundNotes || [],
      analysis.duration,
      analysis.tempoEstimate,
      aggressive
    );
    const recoveredHits = deriveRhythmHitsFromNotes(
      neuralTracks.allNotes || [],
      analysis.rhythmHits || [],
      analysis.tempoEstimate,
      analysis.duration,
      aggressive
    );

    if (!melodyMerge.added && !backgroundMerge.added && !recoveredHits.length) {
      summary.reason = "no-more-candidates";
      break;
    }

    analysis.melodyNotes = melodyMerge.notes;
    analysis.backgroundNotes = backgroundMerge.notes;
    analysis.rhythmHits = mergeRhythmSources(analysis.rhythmHits || [], recoveredHits, analysis.tempoEstimate);
    summary.passes += 1;
    summary.melodyAdded += melodyMerge.added;
    summary.backgroundAdded += backgroundMerge.added;
    summary.rhythmAdded += recoveredHits.length;
    summary.reason = aggressive ? "aggressive-recovery" : "coverage-recovery";
  }

  rebuildCombinedAnalysis();
  analysis.quality = compareAudioToSkyOutput(inputSignature, analysis.combinedEvents || [], state.keyId, analysis.duration);
  analysis.correctionSummary = summary;
}

function buildBackgroundTrackFromFrames(frames, kernel, beatSeconds) {
  const notes = [];
  const minGap = Math.max(0.12, beatSeconds * 0.5);
  let lastTime = -minGap;

  frames.forEach((frame) => {
    if (frame.time - lastTime < minGap) return;
    const foregroundMidi = frame.foreground ? frame.foreground.midi : null;
    const candidates = pickBackgroundCandidates(frame, kernel, foregroundMidi, 2);
    if (!candidates.length) return;
    const best = candidates[0];
    const mapping = chooseSkyButtonForMidi(best.midi);
    notes.push({
      start: frame.time,
      end: frame.time + Math.max(0.12, beatSeconds * 0.55),
      buttonId: mapping.buttonId,
      rawMidi: best.midi,
      midi: best.midi,
      confidence: best.confidence,
      source: "background"
    });
    lastTime = frame.time;
  });

  return mergeNearDuplicateNotes(notes);
}

function buildPianoCoverTracks(samples, sampleRate, duration, tempoEstimate, options = {}, onProgress) {
  const frameLength = Math.min(options.pianoFrameLength || 4096, Math.max(1024, samples.length - 1));
  const hopLength = options.pianoHopLength || 1024;
  const batchSize = options.pianoBatchSize || 5;
  const kernel = buildPianoSalienceKernel(sampleRate, frameLength);
  const frameCount = Math.max(1, Math.floor((samples.length - frameLength) / hopLength));
  const frames = [];

  return new Promise((resolve) => {
    let index = 0;

    function processBatch() {
      const batchEnd = Math.min(frameCount, index + batchSize);
      for (; index < batchEnd; index += 1) {
        const start = index * hopLength;
        const extracted = extractPianoSalienceFrame(samples, start, kernel);
        frames.push({
          ...extracted,
          time: start / sampleRate,
          duration: hopLength / sampleRate
        });
      }

      if (onProgress) onProgress(index, frameCount);

      if (index < frameCount) {
        window.requestAnimationFrame(processBatch);
      } else {
        const smoothed = smoothSalienceFrames(frames, kernel.bins.length);
        const songCache = buildSongFrequencyCache(smoothed, kernel, options);
        const translatorMelodyNotes = buildTranslatorMelodyNotes(songCache, duration, tempoEstimate);
        const translatorChordFrames = buildTranslatorChordFrames(
          songCache,
          duration,
          options.windowSeconds || 1,
          options.translatorChordSensitivity || 0.5,
          state.keyId
        );
        const translatorRhythmHits = buildTranslatorRhythmHits(songCache, tempoEstimate, options.density || "balanced");
        const translatorBackgroundNotes = buildTranslatorBackgroundNotes(
          songCache,
          translatorChordFrames,
          translatorRhythmHits,
          duration,
          tempoEstimate,
          options.density || "balanced"
        );
        const activationFrames = buildNeuralActivationFrames(smoothed, kernel);
        let previousMidis = [];
        const candidateFrames = activationFrames.map((frame) => {
          const candidates = pickNeuralFrameCandidates(frame, kernel, previousMidis, options);
          if (candidates.length) previousMidis = candidates.map((candidate) => candidate.midi);
          return {
            time: frame.time,
            duration: frame.duration,
            candidates
          };
        });
        const neuralNotes = annotateNeuralNoteRoles(
          neuralCandidateFramesToNotes(candidateFrames, duration, tempoEstimate),
          tempoEstimate
        );
        const neuralTracks = splitNeuralTracks(neuralNotes);
        let previousMidi = null;
        const contourFrames = smoothed.map((frame) => {
          const foreground = pickForegroundCandidate(frame, kernel, previousMidi);
          if (foreground) previousMidi = foreground.midi;
          return {
            ...frame,
            foreground,
            candidate: foreground
          };
        });
        const foregroundNotes = markRecurringThemes(contourFramesToNotes(
          contourFrames,
          Math.max(0.08, MELODY_MIN_SECONDS * 0.75),
          Math.max(0.12, MELODY_JOIN_GAP_SECONDS * 1.2),
          "piano-foreground"
        ).filter((note) => note.start < duration));
        const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
        const backgroundNotes = buildBackgroundTrackFromFrames(contourFrames, kernel, beatSeconds)
          .filter((note) => note.start < duration);
        resolve({
          foregroundNotes,
          backgroundNotes,
          translatorMelodyNotes,
          translatorChordFrames,
          translatorRhythmHits,
          translatorBackgroundNotes,
          songCacheSummary: {
            frameCount: songCache.frames.length,
            hopSeconds: songCache.hopSeconds,
            globalChroma: songCache.globalChroma
          },
          neuralNotes: neuralTracks.allNotes,
          neuralForegroundNotes: neuralTracks.foregroundNotes,
          neuralBackgroundNotes: neuralTracks.backgroundNotes,
          neuralChordFrames: buildNeuralChordFrames(neuralTracks.allNotes, duration, options.windowSeconds || 1, state.keyId),
          frameCount
        });
      }
    }

    processBatch();
  });
}

async function analyzeAudioFile() {
  const file = (els.audioWizardFileInput && els.audioWizardFileInput.files && els.audioWizardFileInput.files[0]) ||
    (els.audioFileInput.files && els.audioFileInput.files[0]);
  if (!file) {
    setAudioStatus("Choose an MP3 file");
    return;
  }

  els.analyzeAudioBtn.disabled = true;
  els.autoTuneBtn.disabled = true;
  els.refineChordsBtn.disabled = true;
  els.importCombinedBtn.disabled = true;
  els.importMelodyBtn.disabled = true;
  els.importChordsBtn.disabled = true;
  setAudioStatus("Decoding audio");

  try {
    const profile = "translator";
    if (els.analysisProfileSelect) els.analysisProfileSelect.value = profile;
    const density = els.feelDensitySelect.value || "balanced";
    const playability = els.playabilitySelect ? els.playabilitySelect.value : "human";
    const settings = analysisProfileSettings();
    const ctx = getAudioContext();
    const buffer = await ctx.decodeAudioData(await file.arrayBuffer());
    const targetRate = Math.min(11025, buffer.sampleRate);
    const mono = downmixAudioBuffer(buffer);
    const samples = resampleLinear(mono, buffer.sampleRate, targetRate);
    const melodySamples = preEmphasize(resampleLinear(mono, buffer.sampleRate, MELODY_TARGET_RATE));
    const rhythmSamples = preEmphasize(resampleLinear(mono, buffer.sampleRate, Math.min(RHYTHM_TARGET_RATE, buffer.sampleRate)));
    const rhythmRate = Math.min(RHYTHM_TARGET_RATE, buffer.sampleRate);
    const tempoEstimate = estimateTempo(samples, targetRate);
    const windowSeconds = Number(els.analysisWindowSelect.value) || 1;
    const minimumSeconds = Number(els.minChordSelect.value) || 2;
    const threshold = Number(els.chordSensitivityInput.value) || 0.62;
    const melodyThreshold = Number(els.melodySensitivityInput.value) || 0.15;
    const frameLength = Math.min(4096, Math.max(2048, Math.floor(targetRate * Math.min(0.5, windowSeconds))));
    const kernel = buildAnalysisKernel(targetRate, frameLength);

    const analysis = await buildChordFrames(samples, buffer.duration, kernel, windowSeconds, threshold, (done, total) => {
      setAudioStatus(`${settings.label}: analyzing chords ${Math.round((done / total) * 100)}%`);
    }, {
      batchSize: settings.chordBatchSize,
      probeRatios: settings.chordProbeRatios
    });

    const melody = await buildMelodyNotes(melodySamples, buffer.duration, MELODY_TARGET_RATE, melodyThreshold, (done, total) => {
      setAudioStatus(`${settings.label}: tracking melody ${Math.round((done / total) * 100)}%`);
    }, {
      hopLength: settings.melodyHopLength,
      batchSize: settings.melodyBatchSize
    });

    const rhythm = await buildRhythmTrack(rhythmSamples, rhythmRate, tempoEstimate, density, {
      frameLength: RHYTHM_FRAME_LENGTH,
      hopLength: settings.rhythmHopLength,
      batchSize: settings.rhythmBatchSize
    }, (done, total) => {
      setAudioStatus(`${settings.label}: extracting rhythm ${Math.round((done / total) * 100)}%`);
    });

    const pianoTracks = await buildPianoCoverTracks(samples, targetRate, buffer.duration, tempoEstimate, {
      ...settings,
      windowSeconds,
      density
    }, (done, total) => {
      setAudioStatus(`${settings.label}: caching song frequencies ${Math.round((done / total) * 100)}%`);
    });

    const smoothed = smoothChordFrames(analysis.frames);
    const chromaMerged = enforceMinimumChordDuration(mergeFrames(smoothed), minimumSeconds);
    let merged = fuseAudioChordSegments(chromaMerged, pianoTracks.translatorChordFrames, minimumSeconds, buffer.duration);
    const translatorLead = mergeMelodySources(melody.notes, pianoTracks.translatorMelodyNotes || [], buffer.duration, tempoEstimate);
    const baseMelody = mergeMelodySources(translatorLead, pianoTracks.foregroundNotes, buffer.duration, tempoEstimate);
    const neuralMelody = { notes: baseMelody, added: 0 };
    const mergedMelody = neuralMelody.notes;
    const foregroundNotes = markRecurringThemes(mergeNearDuplicateNotes([
      ...(pianoTracks.translatorMelodyNotes || []),
      ...pianoTracks.foregroundNotes,
      ...(pianoTracks.neuralForegroundNotes || []).filter((note) => note.source && note.source.includes("theme"))
    ]));
    const translatedRhythmHits = mergeRhythmSources(rhythm.hits, pianoTracks.translatorRhythmHits || [], tempoEstimate);
    const baseBackgroundNotes = markRecurringThemes(mergeNearDuplicateNotes([
      ...(pianoTracks.translatorBackgroundNotes || []),
      ...pianoTracks.backgroundNotes
    ]));
    const backgroundMerge = mergeBackgroundSources(
      baseBackgroundNotes,
      [],
      buffer.duration,
      tempoEstimate,
      false
    );
    const translatorChroma = pianoTracks.songCacheSummary && pianoTracks.songCacheSummary.globalChroma
      ? pianoTracks.songCacheSummary.globalChroma
      : Array(12).fill(0);
    const combinedChroma = addChroma(addChroma(analysis.globalChroma, translatorChroma, 1.15), melodyChromaFromNotes(mergedMelody), 1.4);
    const recoveryAllNotes = markRecurringThemes(mergeNearDuplicateNotes([
      ...(pianoTracks.translatorMelodyNotes || []),
      ...(pianoTracks.translatorBackgroundNotes || []),
      ...(pianoTracks.neuralNotes || [])
    ]));
    const inputSignature = buildInputFeatureSignature(combinedChroma, rhythm.envelope, recoveryAllNotes, buffer.duration);
    state.chordAnalysis = {
      fileName: file.name,
      duration: buffer.duration,
      keyGuess: estimateMajorKey(combinedChroma),
      segments: merged,
      refinedText: "",
      melodyNotes: mergedMelody,
      foregroundNotes,
      backgroundNotes: backgroundMerge.notes,
      neuralNotes: recoveryAllNotes,
      rhythmHits: translatedRhythmHits,
      combinedEvents: [],
      tempoEstimate,
      tuning: null,
      analysisProfile: profile,
      feelDensity: density,
      playability,
      enhancerMode: els.enhancerSelect.value || "threePhase",
      enhancementSummary: null,
      quality: null,
      correctionSummary: null,
      inputSignature,
      wordingAssignments: []
    };
    applyAudioSelfCorrection(state.chordAnalysis, {
      allNotes: recoveryAllNotes,
      foregroundNotes: pianoTracks.translatorMelodyNotes || [],
      backgroundNotes: pianoTracks.translatorBackgroundNotes || []
    }, inputSignature, settings, density);
    const autoApplied = state.converterMode === "audio" ? applyAudioWizardAutoSettings() : [];
    if (autoApplied.length) {
      renderAll();
    } else {
      renderChordAnalysis();
    }
    const tempoText = tempoEstimate ? `, ${tempoEstimate.bpm} BPM` : "";
    const flow = state.chordAnalysis.enhancementSummary;
    const flowText = flow && flow.label !== "Off" ? `, ${flow.label} timing` : "";
    const qualityText = state.chordAnalysis.quality ? `, match ${Math.round(state.chordAnalysis.quality.score * 100)}%` : "";
    const correction = state.chordAnalysis.correctionSummary;
    const recovered = correction ? correction.melodyAdded + correction.backgroundAdded + correction.rhythmAdded : 0;
    const cacheText = pianoTracks.songCacheSummary ? `, ${pianoTracks.songCacheSummary.frameCount} cached frames` : "";
    const fallbackText = (pianoTracks.translatorMelodyNotes || []).length > melody.notes.length ? ", song-lead translation" : "";
    const playabilityText = `, ${playabilitySettings(playability).label}`;
    const autoText = autoApplied.length ? `, ${autoApplied.join(", ")}` : "";
    setAudioStatus(`${file.name} analyzed: ${state.chordAnalysis.melodyNotes.length} melody notes, ${state.chordAnalysis.backgroundNotes.length} accompaniment notes, ${state.chordAnalysis.rhythmHits.length} rhythm hits, ${state.chordAnalysis.segments.length} chord segments${tempoText}${flowText}${playabilityText}${qualityText}${recovered ? `, ${recovered} self-corrections` : ""}${cacheText}${fallbackText}${autoText}`);
    if (state.converterMode === "audio") setAudioWizardStep("done");
  } catch (error) {
    state.chordAnalysis = {
      fileName: "",
      duration: 0,
      keyGuess: null,
      segments: [],
      refinedText: "",
      melodyNotes: [],
      foregroundNotes: [],
      backgroundNotes: [],
      neuralNotes: [],
      rhythmHits: [],
      combinedEvents: [],
      tempoEstimate: null,
      tuning: null,
      analysisProfile: "translator",
      feelDensity: els.feelDensitySelect.value || "balanced",
      playability: els.playabilitySelect ? els.playabilitySelect.value : "human",
      enhancerMode: els.enhancerSelect.value || "threePhase",
      enhancementSummary: null,
      quality: null,
      correctionSummary: null,
      inputSignature: null,
      wordingAssignments: []
    };
    renderChordAnalysis();
    const message = error && error.message ? `Audio analysis failed: ${String(error.message).slice(0, 90)}` : "Audio analysis failed";
    setAudioStatus(message);
    console.error(error);
  } finally {
    els.analyzeAudioBtn.disabled = false;
  }
}

function useDetectedKey() {
  const guess = state.chordAnalysis.keyGuess;
  if (!guess) return;
  state.keyId = guess.keyId;
  state.chordAnalysis.refinedText = "";
  rebuildCombinedAnalysis();
  syncControls();
  renderAll();
  setStatus(`${guess.label} selected from audio`);
}

function useEstimatedBpm() {
  const estimate = state.chordAnalysis.tempoEstimate;
  if (!estimate) return;
  state.bpm = Math.min(240, Math.max(30, estimate.bpm));
  rebuildCombinedAnalysis();
  syncControls();
  renderAll();
  setStatus(`BPM set to ${state.bpm}`);
}

function autoTuneMelody() {
  const notes = state.chordAnalysis.melodyNotes || [];
  if (!notes.length) {
    setAudioStatus("Analyze melody first");
    return;
  }

  const bestKey = estimateBestSkyKeyForMelody(notes, state.keyId);
  state.keyId = bestKey.keyId;
  state.chordAnalysis.refinedText = "";
  state.chordAnalysis.tuning = bestKey;

  if (state.chordAnalysis.tempoEstimate) {
    state.bpm = Math.min(240, Math.max(30, state.chordAnalysis.tempoEstimate.bpm));
  }

  rebuildCombinedAnalysis();
  syncControls();
  renderAll();
  const label = keyConfigById(bestKey.keyId).label;
  setStatus(`Auto tuned to ${label}`);
  setAudioStatus(`Auto tuned to ${label}, average pitch error ${bestKey.score.toFixed(2)} semitones`);
}

function splitWordIntoSyllables(word) {
  if (word.length <= 4) return [word];
  const chunks = [];
  let chunk = "";
  const letters = word.split("");

  for (let index = 0; index < letters.length; index += 1) {
    const char = letters[index];
    const next = letters[index + 1] || "";
    const afterNext = letters[index + 2] || "";
    chunk += char;

    const isVowel = /[aeiouy]/i.test(char);
    const nextIsConsonant = next && /[bcdfghjklmnpqrstvwxz]/i.test(next);
    const afterNextIsVowel = afterNext && /[aeiouy]/i.test(afterNext);
    if (isVowel && nextIsConsonant && afterNextIsVowel && chunk.length > 1) {
      chunks.push(chunk);
      chunk = "";
    }
  }

  if (chunk) chunks.push(chunk);
  return chunks.length ? chunks : [word];
}

function splitWordingTokens(text) {
  const matches = String(text || "").match(WORD_TOKEN_PATTERN) || [];
  const tokens = [];
  matches.forEach((match) => {
    if (!/[A-Za-z0-9]/.test(match)) return;
    splitWordIntoSyllables(match).forEach((part) => tokens.push(part));
  });
  return tokens;
}

function buttonIdForPitchClass(pc) {
  const gridPcs = flattenRows(currentConfig().rows).map(noteNameToPc);
  let best = null;
  gridPcs.forEach((gridPc, index) => {
    const direct = Math.abs(gridPc - pc);
    const distance = Math.min(direct, 12 - direct);
    const centerCost = Math.abs(index + 1 - 8) * 0.03;
    const score = distance + centerCost;
    if (!best || score < best.score) {
      best = { buttonId: index + 1, score };
    }
  });
  return best ? best.buttonId : null;
}

function buttonIdForWordingToken(token) {
  const cleaned = String(token || "").trim();
  if (!cleaned) return null;

  const upper = cleaned.toUpperCase();
  const abcMatch = upper.match(/^([ABC])([1-5])$/);
  if (abcMatch) {
    return ROWS.indexOf(abcMatch[1]) * 5 + Number(abcMatch[2]);
  }

  if (/^\d{1,2}$/.test(cleaned)) {
    const value = Number(cleaned);
    return value >= 1 && value <= 15 ? value : null;
  }

  const solfege = {
    DO: 1,
    RE: 2,
    MI: 3,
    FA: 4,
    SOL: 5,
    SO: 5,
    LA: 6,
    TI: 7,
    SI: 7
  };
  if (solfege[upper]) return solfege[upper];

  const noteMatch = cleaned.match(/^([A-Ga-g])([#b]?)(?:\d+)?$/);
  if (noteMatch) {
    const note = `${noteMatch[1].toUpperCase()}${noteMatch[2] || ""}`;
    return buttonIdForPitchClass(noteNameToPc(note));
  }

  return null;
}

function noteForButtonId(buttonId, index = 0) {
  const midi = skyMidiForButton(buttonId);
  return {
    start: index * (60 / Math.max(30, state.bpm || 96)),
    end: (index + 1) * (60 / Math.max(30, state.bpm || 96)),
    buttonId,
    rawMidi: midi,
    midi,
    confidence: 1
  };
}

function alignWordingToNotes() {
  const tokens = splitWordingTokens(els.wordingInputText.value);
  if (!tokens.length) {
    setAudioStatus("Enter words or note names");
    return;
  }

  const directButtons = tokens.map(buttonIdForWordingToken);
  if (directButtons.every((buttonId) => buttonId !== null)) {
    state.chordAnalysis.wordingAssignments = directButtons.map((buttonId, index) => ({
      word: tokens[index],
      note: noteForButtonId(buttonId, index)
    }));
    renderChordAnalysis();
    setAudioStatus(`Converted ${directButtons.length} note words`);
    return;
  }

  const notes = state.chordAnalysis.melodyNotes || [];
  if (!notes.length) {
    setAudioStatus("Analyze audio first or enter note words");
    return;
  }

  state.chordAnalysis.wordingAssignments = notes.map((note, index) => {
    const tokenIndex = Math.min(tokens.length - 1, Math.floor(index * tokens.length / Math.max(1, notes.length)));
    return {
      word: tokens[tokenIndex],
      note
    };
  });
  renderChordAnalysis();
  setAudioStatus(`Aligned ${tokens.length} wording tokens to ${notes.length} melody notes`);
}

function melodyNotesToEvents(notes) {
  const beatSeconds = 60 / Math.max(30, Number(state.bpm) || 96);
  const events = [];
  const sorted = [...notes].sort((a, b) => a.start - b.start);
  const stopThreshold = estimateStopThreshold(sorted, beatSeconds);
  let cursor = sorted.length ? sorted[0].start : 0;

  sorted.forEach((note) => {
    const mapping = melodyMapping(note);
    if (!mapping) return;

    const gap = note.start - cursor;
    if (gap >= stopThreshold) {
      events.push({
        type: "rest",
        duration: quantizeBeatDuration(gap, beatSeconds),
        time: cursor,
        kind: "melody-rest"
      });
    }

    const noteSeconds = Math.max(MELODY_MIN_SECONDS, note.end - note.start);
    events.push({
      type: "note",
      notes: [mapping.buttonId],
      duration: quantizeBeatDuration(noteSeconds, beatSeconds),
      time: note.start,
      kind: "melody",
      strength: note.confidence || 0.5
    });
    cursor = Math.max(cursor, note.end);
  });

  const enhancerMode = els.enhancerSelect ? els.enhancerSelect.value : state.chordAnalysis.enhancerMode || "threePhase";
  const enhanced = enhanceSheetFlow(events, state.chordAnalysis.tempoEstimate, enhancerMode);
  return enhanced.events.length ? enhanced.events : events;
}

function importWordingNotes() {
  const assignments = state.chordAnalysis.wordingAssignments || [];
  const events = melodyNotesToEvents(assignments.map((assignment) => assignment.note));
  if (!events.length) {
    setAudioStatus("No wording notes to import");
    return;
  }

  state.events = events;
  state.pending = [];
  renderAll();
  setStatus("Imported wording notes into sheet");
}

async function refineChordsWithMimo() {
  const segments = state.chordAnalysis.segments;
  if (!segments.length) {
    setAudioStatus("Analyze audio first");
    return;
  }

  const chordLines = segments.map((segment) => {
    const mapping = mappingForChord(segment);
    const label = displayChordLabel(segment);
    const skyText = segment.label === "N.C." ? "rest" : mapping ? mapping.text : "not in selected Sky key";
    return `${formatTime(segment.start)}-${formatTime(segment.end)} | ${label} | ${skyText} | score ${segment.score.toFixed(2)}`;
  });
  const melodyLines = (state.chordAnalysis.melodyNotes || []).slice(0, 500).map((note) => {
    const mapping = melodyMapping(note);
    return `${formatTime(note.start)}-${formatTime(note.end)} | ${melodyNoteLabel(note)} | ${mapping.abc}:${mapping.noteName}`;
  });
  const rhythmLines = (state.chordAnalysis.rhythmHits || []).slice(0, 500).map((hit) => {
    return `${formatTime(hit.time)} | beat ${hit.beatLabel} | strength ${hit.strength.toFixed(2)}`;
  });
  const combinedLines = (state.chordAnalysis.combinedEvents || [])
    .filter((event) => event.type !== "bar" && event.type !== "line")
    .slice(0, 500)
    .map((event) => `${Number.isFinite(event.time) ? formatTime(event.time) : "-"} | ${eventLabel(event)} | ${event.kind || event.type} | ${event.duration || 0}b`);
  const playability = els.playabilitySelect ? els.playabilitySelect.value : state.chordAnalysis.playability || "human";
  const noteEvents = (state.chordAnalysis.combinedEvents || []).filter((event) => event.type === "note");
  const maxKeysSeen = noteEvents.reduce((max, event) => Math.max(max, Array.isArray(event.notes) ? event.notes.length : 0), 0);

  els.refineChordsBtn.disabled = true;
  setAudioStatus("Refining with MiMo");

  try {
    const response = await fetch("/api/mimo-refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: els.titleInput.value,
        selectedSkyKey: currentConfig().label,
        detectedKey: state.chordAnalysis.keyGuess ? state.chordAnalysis.keyGuess.label : "",
        duration: state.chordAnalysis.duration,
        playability,
        playabilityLabel: playabilitySettings(playability).label,
        combinedStats: {
          noteEvents: noteEvents.length,
          maxKeysSeen,
          feelDensity: state.chordAnalysis.feelDensity || "balanced"
        },
        chordLines,
        melodyLines,
        rhythmLines,
        combinedLines
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "MiMo request failed");
    }

    state.chordAnalysis.refinedText = payload.refinedText || "";
    renderChordAnalysis();
    setAudioStatus("MiMo refinement ready");
  } catch (error) {
    console.error(error);
    setAudioStatus(error.message || "MiMo refinement failed");
  } finally {
    els.refineChordsBtn.disabled = state.chordAnalysis.segments.length === 0;
  }
}

function importPlayableChords() {
  const beatSeconds = 60 / Math.max(30, Number(state.bpm) || 96);
  const events = [];

  state.chordAnalysis.segments.forEach((segment) => {
    const duration = Math.max(0.5, Math.round(((segment.end - segment.start) / beatSeconds) * 2) / 2);
    const mapping = mappingForChord(segment);
    if (segment.label === "N.C." || !mapping) {
      events.push({ type: "rest", duration });
      return;
    }
    events.push({ type: "note", notes: mapping.buttonIds, duration });
  });

  if (!events.length) {
    setAudioStatus("No playable chords");
    return;
  }

  state.events = events;
  state.pending = [];
  renderAll();
  setStatus("Imported audio chords into sheet");
}

function importMelodyNotes() {
  const events = melodyNotesToEvents(state.chordAnalysis.melodyNotes || []);
  if (!events.length) {
    setAudioStatus("No melody notes to import");
    return;
  }

  state.events = events;
  state.pending = [];
  renderAll();
  setStatus("Imported melody into sheet");
}

function importCombinedArrangement() {
  const events = (state.chordAnalysis.combinedEvents || [])
    .filter((event) => event.type === "note" || event.type === "rest" || event.type === "bar" || event.type === "line")
    .map((event) => {
      if (event.type === "note") {
        return {
          type: "note",
          notes: [...event.notes],
          duration: event.duration,
          gate: event.gate,
          kind: event.kind
        };
      }
      if (event.type === "rest") {
        return {
          type: "rest",
          duration: event.duration,
          kind: event.kind
        };
      }
      return { type: event.type };
    });

  if (!events.some((event) => event.type === "note")) {
    setAudioStatus("No combined sheet to import");
    return;
  }

  state.events = events;
  state.pending = [];
  renderAll();
  setStatus("Imported combined audio feel into sheet");
}

function getAudioContext() {
  if (!audioContext) {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextConstructor();
  }
  return audioContext;
}

function getAudioGraph() {
  const ctx = getAudioContext();
  if (audioGraph && audioGraph.context === ctx) return audioGraph;

  const input = ctx.createGain();
  const body = ctx.createBiquadFilter();
  const compressor = ctx.createDynamicsCompressor();
  const output = ctx.createGain();

  body.type = "lowpass";
  body.frequency.setValueAtTime(5200, ctx.currentTime);
  body.Q.setValueAtTime(0.42, ctx.currentTime);

  compressor.threshold.setValueAtTime(-15, ctx.currentTime);
  compressor.knee.setValueAtTime(10, ctx.currentTime);
  compressor.ratio.setValueAtTime(1.8, ctx.currentTime);
  compressor.attack.setValueAtTime(0.006, ctx.currentTime);
  compressor.release.setValueAtTime(0.16, ctx.currentTime);
  output.gain.setValueAtTime(0.86, ctx.currentTime);

  input.connect(body);
  body.connect(compressor);
  compressor.connect(output).connect(ctx.destination);

  audioGraph = {
    context: ctx,
    input
  };
  return audioGraph;
}

function frequencyForButton(id) {
  const midi = currentConfig().rootMidi + NOTE_STEPS[id - 1];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function flashPianoKey(id, milliseconds = 150) {
  const key = els.pianoGrid.querySelector(`[data-id="${id}"]`);
  if (!key) return;
  key.classList.add("playing");
  window.setTimeout(() => key.classList.remove("playing"), milliseconds);
}

function skySampleCacheKey(ctx, frequency) {
  return `${ctx.sampleRate}:${Math.round(frequency * 100)}`;
}

function createSkyPianoSample(ctx, frequency) {
  const seconds = frequency > 1200 ? 1.9 : frequency > 700 ? 2.35 : 2.85;
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  const attackSeconds = 0.0038;
  const bodyDecay = frequency > 1100 ? 3.55 : frequency > 700 ? 2.7 : 2.15;
  const tailDecay = frequency > 1100 ? 1.55 : frequency > 700 ? 1.25 : 1.02;
  let peak = 0.0001;
  const mono = new Float32Array(length);

  for (let index = 0; index < length; index += 1) {
    const time = index / ctx.sampleRate;
    const attack = Math.min(1, time / attackSeconds);
    const fadeOut = Math.min(1, (seconds - time) / 0.12);
    const envelope = attack * Math.max(0, fadeOut);
    const body = Math.exp(-time * bodyDecay);
    const tail = Math.exp(-time * tailDecay);
    const hammer = Math.exp(-time * 42);
    const fundamental = Math.sin(TWO_PI * frequency * time) * (0.66 * body + 0.16 * tail);
    const octave = Math.sin(TWO_PI * frequency * 2 * time + 0.18) * 0.082 * Math.exp(-time * 5.6);
    const third = Math.sin(TWO_PI * frequency * 3 * time + 0.52) * 0.018 * Math.exp(-time * 8.8);
    const hammerTone = Math.sin(TWO_PI * frequency * 4 * time + 0.74) * 0.016 * hammer;
    const value = (fundamental + octave + third + hammerTone) * envelope;
    mono[index] = value;
    peak = Math.max(peak, Math.abs(value));
  }

  const normalize = 0.64 / peak;
  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      data[index] = mono[index] * normalize;
    }
  }

  return buffer;
}

function getSkyPianoSample(ctx, frequency) {
  const key = skySampleCacheKey(ctx, frequency);
  if (!skyPianoSampleCache.has(key)) {
    skyPianoSampleCache.set(key, createSkyPianoSample(ctx, frequency));
  }
  return skyPianoSampleCache.get(key);
}

function uniquePlaybackButtonIds(events) {
  const ids = new Set();
  events.forEach((event) => {
    if (event.type !== "note" || !Array.isArray(event.notes)) return;
    event.notes.forEach((id) => {
      if (Number.isInteger(id) && id >= 1 && id <= 15) ids.add(id);
    });
  });
  return [...ids].sort((a, b) => a - b);
}

function nextAnimationFrame() {
  return new Promise((resolve) => window.requestAnimationFrame(resolve));
}

async function precachePlaybackSamples(events, ctx, onProgress) {
  const ids = uniquePlaybackButtonIds(events);
  let generated = 0;

  getAudioGraph();

  for (let index = 0; index < ids.length; index += 1) {
    const frequency = frequencyForButton(ids[index]);
    const key = skySampleCacheKey(ctx, frequency);
    if (!skyPianoSampleCache.has(key)) {
      getSkyPianoSample(ctx, frequency);
      generated += 1;
    }

    if (onProgress) onProgress(index + 1, ids.length, generated);
    if ((index + 1) % 3 === 0) await nextAnimationFrame();
  }

  return {
    noteCount: ids.length,
    generated
  };
}

function hashPlaybackSignature(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function playbackRenderCacheKey(events, bpm, keyId, sampleRate) {
  const eventSignature = events.map((event) => {
    if (event.type === "note") return `n:${Array.isArray(event.notes) ? event.notes.join(",") : ""}:${event.duration || 0}:${event.gate || ""}`;
    if (event.type === "rest") return `r:${event.duration || 0}`;
    return event.type;
  }).join("|");
  return `${sampleRate}:${keyId}:${bpm}:${hashPlaybackSignature(eventSignature)}`;
}

function scheduleOfflineTone(offline, frequency, startTime, level, totalSeconds) {
  const source = offline.createBufferSource();
  const gain = offline.createGain();
  const tone = offline.createBiquadFilter();
  const sample = getSkyPianoSample(offline, frequency);
  const safeStart = Math.max(0, startTime);
  const attackEnd = safeStart + 0.005;
  const tailStart = safeStart + Math.max(0.03, sample.duration - 0.14);
  const stopTime = Math.min(totalSeconds, safeStart + sample.duration + 0.02);
  const peakGain = 0.84 * Math.max(0.18, Math.min(1, level || 1));

  source.buffer = sample;
  tone.type = "lowpass";
  tone.frequency.setValueAtTime(frequency > 900 ? 4600 : 4100, safeStart);
  tone.Q.setValueAtTime(0.18, safeStart);

  gain.gain.cancelScheduledValues(safeStart);
  gain.gain.setValueAtTime(0.0001, safeStart);
  gain.gain.exponentialRampToValueAtTime(peakGain, attackEnd);
  gain.gain.setValueAtTime(peakGain, tailStart);
  gain.gain.exponentialRampToValueAtTime(0.0001, Math.min(totalSeconds, safeStart + sample.duration));

  source.connect(tone).connect(gain).connect(offline.destination);
  source.start(safeStart);
  if (stopTime > safeStart) source.stop(stopTime);
}

async function renderSheetAudioBuffer(playback, ctx) {
  const OfflineAudioContextConstructor = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!OfflineAudioContextConstructor) throw new Error("Offline audio rendering is unavailable in this browser");

  const sampleRate = ctx.sampleRate;
  const renderTailSeconds = 3.2;
  const totalSeconds = Math.max(0.25, playback.totalSeconds + renderTailSeconds);
  const frameCount = Math.max(1, Math.ceil(totalSeconds * sampleRate));
  const offline = new OfflineAudioContextConstructor(2, frameCount, sampleRate);

  playback.items.forEach((item) => {
    const event = item.event;
    if (event.type !== "note" || !Array.isArray(event.notes) || !event.notes.length) return;
    const noteCount = Math.max(1, event.notes.length);
    const chordLevel = Math.min(0.92, 1 / Math.pow(noteCount, 0.45));
    event.notes.forEach((id) => {
      scheduleOfflineTone(offline, frequencyForButton(id), item.time, chordLevel, totalSeconds);
    });
  });

  return offline.startRendering();
}

async function getRenderedPlaybackAudio(events, playback, ctx) {
  const bpm = Math.max(30, Number(state.bpm) || 96);
  const key = playbackRenderCacheKey(events, bpm, state.keyId, ctx.sampleRate);
  if (renderedPlaybackCache && renderedPlaybackCache.key === key) {
    return {
      buffer: renderedPlaybackCache.buffer,
      cached: true
    };
  }

  setStatus("Rendering cached audio file");
  await nextAnimationFrame();
  const buffer = await renderSheetAudioBuffer(playback, ctx);
  renderedPlaybackCache = {
    key,
    buffer
  };

  return {
    buffer,
    cached: false
  };
}

function playTone(frequency, startTime, duration, options = {}) {
  const ctx = getAudioContext();
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const tone = ctx.createBiquadFilter();
  const output = getAudioGraph().input;
  const sample = getSkyPianoSample(ctx, frequency);
  const level = Math.max(0.18, Math.min(1, options.level || 1));
  const safeStart = Math.max(ctx.currentTime + 0.004, startTime);
  const attackEnd = safeStart + 0.005;
  const tailStart = safeStart + Math.max(0.03, sample.duration - 0.14);
  const stopTime = safeStart + sample.duration + 0.02;
  const peakGain = 0.84 * level;

  source.buffer = sample;
  tone.type = "lowpass";
  tone.frequency.setValueAtTime(frequency > 900 ? 4600 : 4100, safeStart);
  tone.Q.setValueAtTime(0.18, safeStart);

  gain.gain.cancelScheduledValues(safeStart);
  gain.gain.setValueAtTime(0.0001, safeStart);
  gain.gain.exponentialRampToValueAtTime(peakGain, attackEnd);
  gain.gain.setValueAtTime(peakGain, tailStart);
  gain.gain.exponentialRampToValueAtTime(0.0001, safeStart + sample.duration);
  source.connect(tone).connect(gain).connect(output);
  source.start(safeStart);
  source.stop(stopTime);
  activeOscillators.push(source);
  source.onended = () => {
    activeOscillators = activeOscillators.filter((item) => item !== source);
  };
}

function playButton(id) {
  const ctx = getAudioContext();
  const now = ctx.currentTime + 0.01;
  playTone(frequencyForButton(id), now, 0.38, { level: 1 });
  flashPianoKey(id, 180);
}

function stopPlayback() {
  playbackSessionId += 1;
  if (playbackScheduler) {
    window.clearInterval(playbackScheduler);
    playbackScheduler = null;
  }
  if (activePlaybackSource) {
    try {
      activePlaybackSource.stop();
    } catch {
      // Already stopped.
    }
    activePlaybackSource = null;
  }
  scheduledTimers.forEach((timer) => window.clearTimeout(timer));
  scheduledTimers = [];
  activeOscillators.forEach((oscillator) => {
    try {
      oscillator.stop();
    } catch {
      // Already stopped.
    }
  });
  activeOscillators = [];
  renderTimeline();
}

function buildPlaybackItems(events, beatSeconds) {
  const items = [];
  let cursor = 0;

  events.forEach((event, index) => {
    if (event.type === "note") {
      const durationBeats = Math.max(0.03125, Number(event.duration) || 0.25);
      const durationSeconds = beatSeconds * durationBeats;
      items.push({
        event,
        index,
        time: cursor,
        durationSeconds
      });
      cursor += durationSeconds;
      return;
    }

    if (event.type === "rest") {
      const durationBeats = Math.max(0.03125, Number(event.duration) || 0.25);
      const durationSeconds = beatSeconds * durationBeats;
      items.push({
        event,
        index,
        time: cursor,
        durationSeconds
      });
      cursor += durationSeconds;
      return;
    }

    if (event.type === "bar" || event.type === "line") {
      items.push({
        event,
        index,
        time: cursor,
        durationSeconds: 0
      });
    }
  });

  return {
    items,
    totalSeconds: cursor
  };
}

function schedulePlaybackVisual(callback, eventTime, ctx) {
  const delay = Math.max(0, (eventTime - ctx.currentTime) * 1000);
  scheduledTimers.push(window.setTimeout(callback, delay));
}

async function playSheet() {
  stopPlayback();
  if (!state.events.length) return;

  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  const beatSeconds = 60 / Math.max(30, Number(state.bpm) || 96);
  const playback = buildPlaybackItems(state.events, beatSeconds);
  if (!playback.items.length) return;

  const sessionId = playbackSessionId;
  const cacheSummary = await precachePlaybackSamples(state.events, ctx, (done, total, generated) => {
    if (!total || !generated) return;
    setStatus(`Preparing sounds ${done}/${total}`);
  });
  if (playbackSessionId !== sessionId) return;

  let rendered;
  try {
    rendered = await getRenderedPlaybackAudio(state.events, playback, ctx);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Audio render failed");
    return;
  }
  if (playbackSessionId !== sessionId) return;

  const source = ctx.createBufferSource();
  source.buffer = rendered.buffer;
  source.connect(getAudioGraph().input);
  activePlaybackSource = source;

  const startTime = ctx.currentTime + 0.08;

  function scheduleVisualItem(item) {
    const event = item.event;
    const eventTime = startTime + item.time;
    if (event.type === "note") {
      const eventSeconds = item.durationSeconds;
      event.notes.forEach((id) => {
        schedulePlaybackVisual(() => {
          flashPianoKey(id, Math.min(190, Math.max(90, eventSeconds * 240)));
        }, eventTime, ctx);
      });
      schedulePlaybackVisual(() => renderTimeline(item.index, { followActive: true }), eventTime, ctx);
      return;
    }

    schedulePlaybackVisual(() => renderTimeline(item.index, { followActive: true }), eventTime, ctx);
  }

  playback.items.forEach(scheduleVisualItem);

  source.onended = () => {
    if (playbackSessionId !== sessionId) return;
    activePlaybackSource = null;
    renderTimeline();
    setStatus("Playback finished");
  };

  source.start(startTime);
  setStatus(rendered.cached
    ? "Playing pre-rendered cached audio"
    : cacheSummary.generated
      ? "Playing newly rendered cached audio"
      : "Playing rendered cached audio");
}

function saveSheet() {
  const payload = {
    title: els.titleInput.value,
    transcriber: els.authorInput.value,
    keyId: state.keyId,
    notation: state.notation,
    duration: state.duration,
    bpm: state.bpm,
    events: state.events
  };
  localStorage.setItem("sky-piano-sheet-maker", JSON.stringify(payload));
  setStatus("Saved locally");
}

function loadSheet() {
  const saved = localStorage.getItem("sky-piano-sheet-maker");
  if (!saved) {
    setStatus("No local save found");
    return;
  }

  try {
    const payload = JSON.parse(saved);
    els.titleInput.value = payload.title || "Untitled Sky Sheet";
    els.authorInput.value = payload.transcriber || "";
    state.keyId = payload.keyId || "C";
    state.notation = payload.notation || "abc";
    state.duration = Number(payload.duration) || 1;
    state.bpm = Number(payload.bpm) || 96;
    state.events = Array.isArray(payload.events) ? payload.events : [];
    state.pending = [];
    syncControls();
    renderAll();
    setStatus("Loaded local sheet");
  } catch {
    setStatus("Local save is not readable");
  }
}

function copyExport() {
  const text = els.exportText.value;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(
      () => setStatus("Copied export"),
      () => fallbackCopy(text)
    );
    return;
  }
  fallbackCopy(text);
}

function fallbackCopy(text) {
  els.exportText.focus();
  els.exportText.select();
  try {
    document.execCommand("copy");
    setStatus("Copied export");
  } catch {
    setStatus("Copy unavailable");
  }
  window.getSelection().removeAllRanges();
}

function syncControls() {
  els.keySelect.value = state.keyId;
  els.notationSelect.value = state.notation;
  els.durationSelect.value = String(state.duration);
  els.bpmInput.value = String(state.bpm);
  if (els.analysisProfileSelect) els.analysisProfileSelect.value = "translator";
  if (els.enhancerSelect) els.enhancerSelect.value = state.chordAnalysis.enhancerMode || "threePhase";
  if (els.playabilitySelect) els.playabilitySelect.value = state.chordAnalysis.playability || "human";
  if (els.wizardMelodySensitivityInput && els.melodySensitivityInput) els.wizardMelodySensitivityInput.value = els.melodySensitivityInput.value;
  if (els.wizardChordSensitivityInput && els.chordSensitivityInput) els.wizardChordSensitivityInput.value = els.chordSensitivityInput.value;
  if (els.wizardFeelDensitySelect && els.feelDensitySelect) els.wizardFeelDensitySelect.value = els.feelDensitySelect.value;
  if (els.wizardPlayabilitySelect && els.playabilitySelect) els.wizardPlayabilitySelect.value = els.playabilitySelect.value;
  if (els.wizardBpmInput) els.wizardBpmInput.value = String(state.bpm);
  if (els.wizardBpmInput && els.wizardAutoBpmInput) els.wizardBpmInput.disabled = els.wizardAutoBpmInput.checked;
  if (els.wizardEnhancerSelect && els.enhancerSelect) els.wizardEnhancerSelect.value = els.enhancerSelect.value;
}

function setConverterMode(mode) {
  const nextMode = ["landing", "home", "audio", "score"].includes(mode) ? mode : "home";
  state.converterMode = nextMode;
  document.body.classList.remove("view-landing", "view-home", "view-audio", "view-score");
  document.body.classList.add(`view-${nextMode}`);
  setAudioFinalExportMode(false);

  if (nextMode === "audio") {
    setStatus("Audio to Sky sheet");
    const hasCombinedOutput = state.chordAnalysis.combinedEvents.length > 0;
    document.body.classList.toggle("audio-results-open", hasCombinedOutput);
    if (hasCombinedOutput) {
      setAudioFinalExportMode(true);
      setAudioResultTab("sheets");
    } else {
      setAudioWizardStep("file");
    }
  } else if (nextMode === "score") {
    setStatus("Piano sheet to Sky sheet");
    document.body.classList.remove("audio-results-open");
  } else {
    document.body.classList.remove("audio-results-open");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindEvents() {
  els.authLoginBtn.addEventListener("click", startLogin);
  els.authUserBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    state.auth.menuOpen = !state.auth.menuOpen;
    renderAuth();
  });
  els.authMenuHomeBtn.addEventListener("click", () => {
    closeAuthMenu();
    setConverterMode("landing");
  });
  els.authLogoutBtn.addEventListener("click", () => {
    closeAuthMenu();
    logoutAuth();
  });
  document.addEventListener("click", (event) => {
    if (els.authShell && !els.authShell.contains(event.target)) closeAuthMenu();
  });
  els.tryItOutBtn.addEventListener("click", () => setConverterMode("home"));
  els.chooseAudioBtn.addEventListener("click", () => setConverterMode("audio"));
  els.chooseScoreBtn.addEventListener("click", () => setConverterMode("score"));
  els.homeBtn.addEventListener("click", () => setConverterMode("home"));
  [els.audioTabSheetsBtn, els.audioTabDetailsBtn, els.audioTabTimingBtn].forEach((button) => {
    if (!button) return;
    button.addEventListener("click", () => setAudioResultTab(button.dataset.audioTab));
  });
  els.audioWizardFileInput.addEventListener("change", () => {
    const file = els.audioWizardFileInput.files && els.audioWizardFileInput.files[0];
    setAudioStatus(file ? `${file.name} ready` : "No MP3 loaded");
    if (file) setAudioWizardStep("sensitivity");
  });
  els.audioSensitivityNextBtn.addEventListener("click", () => {
    syncAudioWizardControls();
    setAudioWizardStep("feel");
  });
  [
    els.wizardMelodySensitivityInput,
    els.wizardChordSensitivityInput,
    els.wizardFeelDensitySelect,
    els.wizardPlayabilitySelect,
    els.wizardBpmInput,
    els.wizardAutoBpmInput,
    els.wizardAutoKeyInput,
    els.wizardEnhancerSelect
  ].forEach((control) => {
    control.addEventListener("input", syncAudioWizardControls);
    control.addEventListener("change", syncAudioWizardControls);
  });
  els.audioWizardAnalyzeBtn.addEventListener("click", () => {
    syncAudioWizardControls();
    setAudioWizardStep("processing");
    analyzeAudioFile();
  });
  els.audioShowOutputBtn.addEventListener("click", openAudioResults);
  if (els.audioPlayResultBtn) {
    els.audioPlayResultBtn.addEventListener("click", () => {
      openAudioResults();
      if (!state.events.length && (state.chordAnalysis.combinedEvents || []).length) importCombinedArrangement();
      playSheet();
    });
  }
  els.audioRestartWizardBtn.addEventListener("click", () => {
    document.body.classList.remove("audio-results-open");
    if (els.audioWizardFileInput) els.audioWizardFileInput.value = "";
    if (els.audioFileInput) els.audioFileInput.value = "";
    if (els.wizardAutoBpmInput) els.wizardAutoBpmInput.checked = true;
    if (els.wizardAutoKeyInput) els.wizardAutoKeyInput.checked = true;
    syncControls();
    setAudioWizardStep("file");
    setAudioStatus("No MP3 loaded");
  });

  els.keySelect.addEventListener("change", () => {
    state.keyId = els.keySelect.value;
    state.pending = [];
    state.chordAnalysis.refinedText = "";
    state.chordAnalysis.tuning = null;
    rebuildCombinedAnalysis();
    renderAll();
    setStatus(`${currentConfig().label} selected`);
  });

  els.notationSelect.addEventListener("change", () => {
    state.notation = els.notationSelect.value;
    renderAll();
  });

  els.durationSelect.addEventListener("change", () => {
    state.duration = Number(els.durationSelect.value);
  });

  els.bpmInput.addEventListener("change", () => {
    state.bpm = Math.min(240, Math.max(30, Number(els.bpmInput.value) || 96));
    els.bpmInput.value = String(state.bpm);
    rebuildCombinedAnalysis();
    renderAll();
  });

  els.singleModeBtn.addEventListener("click", () => {
    state.chordMode = false;
    state.pending = [];
    renderAll();
  });

  els.chordModeBtn.addEventListener("click", () => {
    state.chordMode = true;
    renderAll();
  });

  els.addChordBtn.addEventListener("click", addChord);
  els.restBtn.addEventListener("click", addRest);
  els.barBtn.addEventListener("click", addBar);
  els.lineBtn.addEventListener("click", addLine);
  els.undoBtn.addEventListener("click", undo);
  els.clearBtn.addEventListener("click", clearSheet);
  els.playBtn.addEventListener("click", playSheet);
  els.stopBtn.addEventListener("click", () => {
    stopPlayback();
    setStatus("Playback stopped");
  });
  els.saveBtn.addEventListener("click", saveSheet);
  els.loadBtn.addEventListener("click", loadSheet);
  els.importAbcBtn.addEventListener("click", () => importSheet("abc"));
  els.importNumbersBtn.addEventListener("click", () => importSheet("numbers"));
  els.exportFormat.addEventListener("change", renderExport);
  els.copyExportBtn.addEventListener("click", copyExport);
  els.audioFileInput.addEventListener("change", () => {
    const file = els.audioFileInput.files && els.audioFileInput.files[0];
    setAudioStatus(file ? `${file.name} ready` : "No MP3 loaded");
  });
  els.scoreFileInput.addEventListener("change", () => {
    const file = els.scoreFileInput.files && els.scoreFileInput.files[0];
    setScoreStatus(file ? `${file.name} ready` : "No score loaded");
  });
  els.analyzeAudioBtn.addEventListener("click", analyzeAudioFile);
  els.analyzeScoreBtn.addEventListener("click", analyzeScoreFile);
  els.importScoreBtn.addEventListener("click", importScoreArrangement);
  els.autoTuneBtn.addEventListener("click", autoTuneMelody);
  els.refineChordsBtn.addEventListener("click", refineChordsWithMimo);
  els.importCombinedBtn.addEventListener("click", importCombinedArrangement);
  els.importMelodyBtn.addEventListener("click", importMelodyNotes);
  els.importChordsBtn.addEventListener("click", importPlayableChords);
  els.useEstimatedBpmBtn.addEventListener("click", useEstimatedBpm);
  els.useDetectedKeyBtn.addEventListener("click", useDetectedKey);
  els.alignWordingBtn.addEventListener("click", alignWordingToNotes);
  els.importWordingBtn.addEventListener("click", importWordingNotes);
  els.wordingInputText.addEventListener("input", () => {
    state.chordAnalysis.wordingAssignments = [];
    renderWordingAssignments();
  });
  els.analysisWindowSelect.addEventListener("change", () => {
    if (state.chordAnalysis.segments.length) setAudioStatus("Re-analyze for new window");
  });
  els.minChordSelect.addEventListener("change", () => {
    if (state.chordAnalysis.segments.length) setAudioStatus("Re-analyze for new minimum");
  });
  els.chordSensitivityInput.addEventListener("input", () => {
    if (state.chordAnalysis.segments.length) setAudioStatus("Re-analyze for new sensitivity");
  });
  els.melodySensitivityInput.addEventListener("input", () => {
    if (state.chordAnalysis.melodyNotes.length) setAudioStatus("Re-analyze for new melody sensitivity");
  });
  els.analysisProfileSelect.addEventListener("change", () => {
    els.analysisProfileSelect.value = "translator";
  });
  els.feelDensitySelect.addEventListener("change", () => {
    if (state.chordAnalysis.melodyNotes.length || state.chordAnalysis.rhythmHits.length) {
      rebuildCombinedAnalysis();
      renderChordAnalysis();
      setAudioStatus(`Combined feel rebuilt in ${feelDensitySettings(els.feelDensitySelect.value).label} mode`);
    }
  });
  els.playabilitySelect.addEventListener("change", () => {
    state.chordAnalysis.playability = els.playabilitySelect.value;
    if (state.chordAnalysis.melodyNotes.length || state.chordAnalysis.rhythmHits.length) {
      rebuildCombinedAnalysis();
      renderChordAnalysis();
      setAudioStatus(`Combined sheet rebuilt for ${playabilitySettings(els.playabilitySelect.value).label}`);
    }
  });
  els.enhancerSelect.addEventListener("change", () => {
    state.chordAnalysis.enhancerMode = els.enhancerSelect.value;
    if (state.chordAnalysis.melodyNotes.length || state.chordAnalysis.rhythmHits.length) {
      rebuildCombinedAnalysis();
      renderChordAnalysis();
      const summary = state.chordAnalysis.enhancementSummary;
      const detail = summary && summary.gridStep ? `, ${summary.gridStep} beat grid` : "";
      setAudioStatus(`${flowEnhancerSettings(els.enhancerSelect.value).label} timing enhancer applied${detail}`);
    }
    if (state.scoreAnalysis.scoreData) {
      applyScoreConversion({ name: state.scoreAnalysis.fileName || "Score" }, {
        scoreData: state.scoreAnalysis.scoreData,
        sourceType: state.scoreAnalysis.sourceType,
        omrModel: state.scoreAnalysis.omrModel
      });
    }
  });
  [els.scoreKeyStrategySelect, els.scoreArrangementSelect, els.scoreMaxKeysSelect].forEach((control) => {
    control.addEventListener("change", () => {
      if (!state.scoreAnalysis.scoreData) return;
      applyScoreConversion({ name: state.scoreAnalysis.fileName || "Score" }, {
        scoreData: state.scoreAnalysis.scoreData,
        sourceType: state.scoreAnalysis.sourceType,
        omrModel: state.scoreAnalysis.omrModel
      });
    });
  });
  els.titleInput.addEventListener("input", renderExport);
  els.authorInput.addEventListener("input", renderExport);

  document.addEventListener("keydown", (event) => {
    if (state.converterMode === "landing" || state.converterMode === "home") return;
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;

    const key = event.key.toUpperCase();
    const normalized = key === ":" ? ";" : key === "<" ? "," : key === ">" ? "." : key === "?" ? "/" : key;
    const button = SKY_BUTTONS.find((item) => item.keyboard === normalized);
    if (button) {
      event.preventDefault();
      handleButtonPress(button.id);
    } else if (key === "BACKSPACE") {
      event.preventDefault();
      undo();
    } else if (key === " ") {
      event.preventDefault();
      addRest();
    }
  });
}

function init() {
  renderKeyOptions();
  syncControls();
  setAudioResultTab("sheets");
  bindEvents();
  renderAll();
  loadAuthUser();
}

init();
