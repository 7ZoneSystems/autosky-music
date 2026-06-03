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
  { suffix: "", name: "major", intervals: [0, 4, 7] },
  { suffix: "m", name: "minor", intervals: [0, 3, 7] },
  { suffix: "sus2", name: "sus2", intervals: [0, 2, 7] },
  { suffix: "sus4", name: "sus4", intervals: [0, 5, 7] },
  { suffix: "dim", name: "diminished", intervals: [0, 3, 6] },
  { suffix: "aug", name: "augmented", intervals: [0, 4, 8] },
  { suffix: "7", name: "dominant seventh", intervals: [0, 4, 7, 10] },
  { suffix: "maj7", name: "major seventh", intervals: [0, 4, 7, 11] },
  { suffix: "m7", name: "minor seventh", intervals: [0, 3, 7, 10] },
  { suffix: "6", name: "major sixth", intervals: [0, 4, 7, 9] },
  { suffix: "m6", name: "minor sixth", intervals: [0, 3, 7, 9] }
];
const MAJOR_KEY_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const ANALYSIS_MIDI_START = 36;
const ANALYSIS_MIDI_END = 88;
const PIANO_MIDI_START = 40;
const PIANO_MIDI_END = 88;
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
const TWO_PI = Math.PI * 2;
const KEY_ALIASES = new Map();
KEY_CONFIGS.forEach((config) => {
  KEY_ALIASES.set(config.id.toLowerCase(), config.id);
  config.aliases.forEach((alias) => KEY_ALIASES.set(alias.toLowerCase(), config.id));
});

const state = {
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
    rhythmHits: [],
    combinedEvents: [],
    tempoEstimate: null,
    tuning: null,
    analysisProfile: "long",
    feelDensity: "balanced",
    enhancerMode: "threePhase",
    enhancementSummary: null,
    wordingAssignments: []
  }
};

const els = {
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
  audioDurationText: document.querySelector("#audioDurationText"),
  chordOutputText: document.querySelector("#chordOutputText"),
  chordResultList: document.querySelector("#chordResultList"),
  melodyOutputText: document.querySelector("#melodyOutputText"),
  melodyResultList: document.querySelector("#melodyResultList"),
  rhythmOutputText: document.querySelector("#rhythmOutputText"),
  rhythmResultList: document.querySelector("#rhythmResultList"),
  foregroundOutputText: document.querySelector("#foregroundOutputText"),
  backgroundOutputText: document.querySelector("#backgroundOutputText"),
  combinedOutputText: document.querySelector("#combinedOutputText"),
  combinedResultList: document.querySelector("#combinedResultList"),
  wordingInputText: document.querySelector("#wordingInputText"),
  alignWordingBtn: document.querySelector("#alignWordingBtn"),
  importWordingBtn: document.querySelector("#importWordingBtn"),
  wordingResultList: document.querySelector("#wordingResultList")
};

let audioContext;
let scheduledTimers = [];
let activeOscillators = [];
let audioGraph = null;
const skyPianoSampleCache = new Map();

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

function renderTimeline(activeIndex = -1) {
  els.timeline.innerHTML = "";
  if (!state.events.length) {
    const empty = document.createElement("div");
    empty.className = "event-tile rest";
    empty.textContent = "Empty";
    els.timeline.append(empty);
  }

  state.events.forEach((event, index) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `event-tile ${event.type}`;
    if (index === activeIndex) tile.classList.add("playing");
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

function collapseCombinedAnchors(anchors, density) {
  const settings = feelDensitySettings(density);
  const collapsed = [];
  anchors
    .sort((a, b) => a.time - b.time || b.strength - a.strength)
    .forEach((anchor) => {
      const last = collapsed[collapsed.length - 1];
      if (last && anchor.time - last.time <= settings.collapseSeconds) {
        const merged = [...new Set([...last.notes, ...anchor.notes])];
        merged.sort((a, b) => {
          const aMelody = a === last.melodyButtonId ? -1 : 0;
          const bMelody = b === last.melodyButtonId ? -1 : 0;
          if (aMelody !== bMelody) return aMelody - bMelody;
          return Math.abs(a - 8) - Math.abs(b - 8);
        });
        last.notes = merged.slice(0, settings.maxSimultaneous).sort((a, b) => a - b);
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
  const rhythmAnchors = anchors
    .filter((anchor) => !anchor.kind.includes("melody"))
    .sort((a, b) => b.strength - a.strength);
  const keepRhythm = Math.max(0, maxCount - melodyAnchors.length);
  return [...melodyAnchors, ...rhythmAnchors.slice(0, keepRhythm)].sort((a, b) => a.time - b.time);
}

function buildCombinedArrangement(melodyNotes, chordSegments, rhythmHits, tempoEstimate, density, backgroundNotes = []) {
  const settings = feelDensitySettings(density);
  const beatSeconds = tempoEstimate && tempoEstimate.bpm ? 60 / tempoEstimate.bpm : 60 / Math.max(30, Number(state.bpm) || 96);
  const anchors = [];

  melodyNotes.forEach((note) => {
    const mapping = melodyMapping(note);
    if (!mapping) return;

    const segment = findChordSegmentAtTime(chordSegments, note.start);
    const nearbyHit = nearestRhythmHit(note.start, rhythmHits, Math.max(settings.collapseSeconds, beatSeconds * 0.18));
    const notes = [mapping.buttonId];
    const addHarmony = nearbyHit && nearbyHit.strength >= settings.melodyHarmonyStrength;
    if (addHarmony) {
      chordAccentButtons(segment, density, mapping.buttonId)
        .slice(0, settings.harmonyButtons)
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
    const buttons = chordAccentButtons(segment, density, note.buttonId).slice(0, settings.harmonyButtons);
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
      .slice(0, settings.rhythmButtons);
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
      const buttons = chordAccentButtons(segment, density).slice(0, Math.max(1, settings.rhythmButtons));
      if (!buttons.length) return;
      const pulseStep = density === "sparse" ? beatSeconds * 4 : beatSeconds * 2;
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

  const collapsed = thinCombinedAnchors(collapseCombinedAnchors(anchors, density), settings.maxCombinedEvents);
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
  const enhancerMode = els.enhancerSelect ? els.enhancerSelect.value : analysis.enhancerMode || "threePhase";
  const rawEvents = buildCombinedArrangement(
    analysis.melodyNotes || [],
    analysis.segments || [],
    analysis.rhythmHits || [],
    analysis.tempoEstimate,
    density,
    analysis.backgroundNotes || []
  );
  const enhanced = enhanceSheetFlow(rawEvents, analysis.tempoEstimate, enhancerMode);
  analysis.feelDensity = density;
  analysis.enhancerMode = enhancerMode;
  analysis.combinedEvents = enhanced.events;
  analysis.enhancementSummary = enhanced.summary;
}

function renderWordingAssignments() {
  const assignments = state.chordAnalysis.wordingAssignments || [];
  if (!els.wordingResultList) return;

  els.importWordingBtn.disabled = assignments.length === 0;
  els.wordingResultList.innerHTML = "";

  if (!assignments.length) {
    els.wordingResultList.innerHTML = '<div class="wording-row"><span class="name">No words aligned</span></div>';
    return;
  }

  assignments.forEach((assignment) => {
    const mapping = melodyMapping(assignment.note);
    const row = document.createElement("div");
    row.className = "wording-row";

    const word = document.createElement("span");
    word.className = "word";
    word.textContent = assignment.word;

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = melodyNoteLabel(assignment.note);

    const sky = document.createElement("span");
    sky.className = "sky";
    sky.textContent = `${mapping.abc}:${mapping.noteName}`;

    const score = document.createElement("span");
    score.className = "score";
    score.textContent = assignment.note.confidence.toFixed(2);

    row.append(word, name, sky, score);
    els.wordingResultList.append(row);
  });
}

function renderRhythmAnalysis() {
  const rhythmHits = state.chordAnalysis.rhythmHits || [];
  if (!els.rhythmResultList) return;

  els.rhythmCountText.textContent = String(rhythmHits.length);

  if (!rhythmHits.length) {
    els.rhythmOutputText.value = "";
    els.rhythmResultList.innerHTML = '<div class="rhythm-row"><span class="name">No rhythm hits yet</span></div>';
    return;
  }

  els.rhythmOutputText.value = rhythmHits
    .map((hit) => `${formatTime(hit.time)} | beat ${hit.beatLabel} | strength ${hit.strength.toFixed(2)}`)
    .join("\n");

  els.rhythmResultList.innerHTML = "";
  rhythmHits.slice(0, 800).forEach((hit) => {
    const row = document.createElement("div");
    row.className = "rhythm-row";

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = formatTime(hit.time);

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = `Beat ${hit.beatLabel}`;

    const sky = document.createElement("span");
    sky.className = "sky";
    sky.textContent = hit.strength >= 0.72 ? "strong" : "pulse";

    const score = document.createElement("span");
    score.className = "score";
    score.textContent = hit.strength.toFixed(2);

    row.append(time, name, sky, score);
    els.rhythmResultList.append(row);
  });
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
}

function renderCombinedAnalysis() {
  const combinedEvents = state.chordAnalysis.combinedEvents || [];
  if (!els.combinedResultList) return;

  const importable = combinedEvents.some((event) => event.type === "note");
  els.combinedCountText.textContent = String(combinedEvents.filter((event) => event.type !== "bar" && event.type !== "line").length);
  els.importCombinedBtn.disabled = !importable;

  if (!combinedEvents.length) {
    els.combinedOutputText.value = "";
    els.combinedResultList.innerHTML = '<div class="combined-row"><span class="name">No combined sheet yet</span></div>';
    return;
  }

  els.combinedOutputText.value = joinTokens(combinedEvents, abcForEvent);
  els.combinedResultList.innerHTML = "";

  combinedEvents.slice(0, 900).forEach((event, index) => {
    if (event.type === "bar" || event.type === "line") return;
    const row = document.createElement("div");
    row.className = "combined-row";

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = Number.isFinite(event.time) ? formatTime(event.time) : String(index + 1);

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = eventLabel(event);

    const sky = document.createElement("span");
    sky.className = "sky";
    sky.textContent = event.kind || event.type;

    const score = document.createElement("span");
    score.className = "score";
    score.textContent = event.type === "note" ? `${event.duration}b` : `${event.duration || 0}b`;

    row.append(time, name, sky, score);
    els.combinedResultList.append(row);
  });
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
    els.chordResultList.innerHTML = '<div class="chord-row"><span class="name">No chords yet</span></div>';
  } else {
    const outputLines = segments.map((segment) => {
      const mapping = mappingForChord(segment);
      const label = displayChordLabel(segment);
      const skyText = segment.label === "N.C." ? "rest" : mapping ? mapping.text : "not in selected Sky key";
      return `${formatTime(segment.start)}-${formatTime(segment.end)} | ${label} | ${skyText} | ${segment.score.toFixed(2)}`;
    });
    els.chordOutputText.value = analysis.refinedText || outputLines.join("\n");

    els.chordResultList.innerHTML = "";
    segments.forEach((segment) => {
      const mapping = mappingForChord(segment);
      const row = document.createElement("div");
      row.className = "chord-row";

      const time = document.createElement("span");
      time.className = "time";
      time.textContent = `${formatTime(segment.start)}-${formatTime(segment.end)}`;

      const name = document.createElement("span");
      name.className = "name";
      name.textContent = displayChordLabel(segment);

      const sky = document.createElement("span");
      sky.className = "sky";
      sky.textContent = segment.label === "N.C." ? "rest" : mapping ? mapping.text : "not in key";

      const score = document.createElement("span");
      score.className = "score";
      score.textContent = segment.score.toFixed(2);

      row.append(time, name, sky, score);
      els.chordResultList.append(row);
    });
  }

  if (!melodyNotes.length) {
    els.melodyOutputText.value = "";
    els.melodyResultList.innerHTML = '<div class="melody-row"><span class="name">No melody yet</span></div>';
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
  melodyNotes.forEach((note) => {
    const mapping = melodyMapping(note);
    const row = document.createElement("div");
    row.className = "melody-row";

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = `${formatTime(note.start)}-${formatTime(note.end)}`;

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = melodyNoteLabel(note);

    const sky = document.createElement("span");
    sky.className = "sky";
    sky.textContent = `${mapping.abc}:${mapping.noteName}`;

    const score = document.createElement("span");
    score.className = "score";
    score.textContent = note.confidence.toFixed(2);

    row.append(time, name, sky, score);
    els.melodyResultList.append(row);
  });

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

function getExportText() {
  const format = els.exportFormat.value;
  if (format === "numbers") return joinTokens(state.events, numbersForEvent);
  if (format === "notes") return joinTokens(state.events, notesForEvent);
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

function setAudioStatus(text) {
  els.audioStatus.textContent = text;
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

function analysisProfileSettings(profile) {
  if (profile === "beast") {
    return {
      label: "Beast",
      melodyHopLength: 256,
      melodyBatchSize: 14,
      chordProbeRatios: [0.16, 0.33, 0.5, 0.67, 0.84],
      chordBatchSize: 3,
      rhythmHopLength: 192,
      rhythmBatchSize: 46,
      pianoFrameLength: 4096,
      pianoHopLength: 768,
      pianoBatchSize: 4
    };
  }

  if (profile === "balanced") {
    return {
      label: "Balanced",
      melodyHopLength: 384,
      melodyBatchSize: 24,
      chordProbeRatios: [0.35, 0.65],
      chordBatchSize: 6,
      rhythmHopLength: 320,
      rhythmBatchSize: 64,
      pianoFrameLength: 2048,
      pianoHopLength: 1024,
      pianoBatchSize: 6
    };
  }

  return {
    label: "Long song",
    melodyHopLength: 512,
    melodyBatchSize: 30,
    chordProbeRatios: [0.22, 0.5, 0.78],
    chordBatchSize: 5,
    rhythmHopLength: 256,
    rhythmBatchSize: 70,
    pianoFrameLength: 4096,
    pianoHopLength: 1536,
    pianoBatchSize: 5
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
          frameCount
        });
      }
    }

    processBatch();
  });
}

async function analyzeAudioFile() {
  const file = els.audioFileInput.files && els.audioFileInput.files[0];
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
    const profile = els.analysisProfileSelect.value || "long";
    const density = els.feelDensitySelect.value || "balanced";
    const settings = analysisProfileSettings(profile);
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

    const pianoTracks = await buildPianoCoverTracks(samples, targetRate, buffer.duration, tempoEstimate, settings, (done, total) => {
      setAudioStatus(`${settings.label}: separating piano foreground ${Math.round((done / total) * 100)}%`);
    });

    const smoothed = smoothChordFrames(analysis.frames);
    const merged = enforceMinimumChordDuration(mergeFrames(smoothed), minimumSeconds);
    const mergedMelody = mergeMelodySources(melody.notes, pianoTracks.foregroundNotes, buffer.duration, tempoEstimate);
    const combinedChroma = addChroma(analysis.globalChroma, melodyChromaFromNotes(mergedMelody), 1.4);
    state.chordAnalysis = {
      fileName: file.name,
      duration: buffer.duration,
      keyGuess: estimateMajorKey(combinedChroma),
      segments: merged,
      refinedText: "",
      melodyNotes: mergedMelody,
      foregroundNotes: pianoTracks.foregroundNotes,
      backgroundNotes: pianoTracks.backgroundNotes,
      rhythmHits: rhythm.hits,
      combinedEvents: [],
      tempoEstimate,
      tuning: null,
      analysisProfile: profile,
      feelDensity: density,
      enhancerMode: els.enhancerSelect.value || "threePhase",
      enhancementSummary: null,
      wordingAssignments: []
    };
    rebuildCombinedAnalysis();
    renderChordAnalysis();
    const tempoText = tempoEstimate ? `, ${tempoEstimate.bpm} BPM` : "";
    const flow = state.chordAnalysis.enhancementSummary;
    const flowText = flow && flow.label !== "Off" ? `, ${flow.label} timing` : "";
    const fallbackText = pianoTracks.foregroundNotes.length > melody.notes.length ? ", piano foreground fallback" : "";
    setAudioStatus(`${file.name} analyzed: ${mergedMelody.length} melody notes, ${pianoTracks.backgroundNotes.length} background notes, ${rhythm.hits.length} rhythm hits, ${merged.length} chord segments${tempoText}${flowText}${fallbackText}`);
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
      rhythmHits: [],
      combinedEvents: [],
      tempoEstimate: null,
      tuning: null,
      analysisProfile: els.analysisProfileSelect.value || "long",
      feelDensity: els.feelDensitySelect.value || "balanced",
      enhancerMode: els.enhancerSelect.value || "threePhase",
      enhancementSummary: null,
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

function createRoomImpulse(ctx, seconds = 1.35, decay = 3.2) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      const time = index / length;
      const early = index < ctx.sampleRate * 0.035 ? 0.58 : 1;
      data[index] = (Math.random() * 2 - 1) * Math.pow(1 - time, decay) * early;
    }
  }
  return buffer;
}

function getAudioGraph() {
  const ctx = getAudioContext();
  if (audioGraph && audioGraph.context === ctx) return audioGraph;

  const input = ctx.createGain();
  const body = ctx.createBiquadFilter();
  const compressor = ctx.createDynamicsCompressor();
  const dry = ctx.createGain();
  const wet = ctx.createGain();
  const convolver = ctx.createConvolver();
  const delay = ctx.createDelay(0.8);
  const delayGain = ctx.createGain();
  const feedback = ctx.createGain();

  body.type = "lowpass";
  body.frequency.setValueAtTime(6200, ctx.currentTime);
  body.Q.setValueAtTime(0.42, ctx.currentTime);

  compressor.threshold.setValueAtTime(-18, ctx.currentTime);
  compressor.knee.setValueAtTime(18, ctx.currentTime);
  compressor.ratio.setValueAtTime(2.4, ctx.currentTime);
  compressor.attack.setValueAtTime(0.012, ctx.currentTime);
  compressor.release.setValueAtTime(0.22, ctx.currentTime);

  dry.gain.setValueAtTime(0.82, ctx.currentTime);
  wet.gain.setValueAtTime(0.18, ctx.currentTime);
  delay.delayTime.setValueAtTime(0.19, ctx.currentTime);
  delayGain.gain.setValueAtTime(0.055, ctx.currentTime);
  feedback.gain.setValueAtTime(0.18, ctx.currentTime);
  convolver.buffer = createRoomImpulse(ctx);

  input.connect(body);
  body.connect(compressor);
  compressor.connect(dry).connect(ctx.destination);
  compressor.connect(convolver).connect(wet).connect(ctx.destination);
  compressor.connect(delay);
  delay.connect(delayGain).connect(ctx.destination);
  delay.connect(feedback).connect(delay);

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
  const seconds = frequency > 1200 ? 1.35 : frequency > 700 ? 1.65 : 1.95;
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  const attackSeconds = 0.007;
  const bodyDecay = frequency > 900 ? 3.7 : 2.85;
  const phaseSeed = frequency * 0.0017;
  let peak = 0.0001;

  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    const stereoPhase = channel ? 0.018 : -0.014;
    for (let index = 0; index < length; index += 1) {
      const time = index / ctx.sampleRate;
      const attack = Math.min(1, time / attackSeconds);
      const fadeOut = Math.min(1, (seconds - time) / 0.08);
      const envelope = attack * Math.max(0, fadeOut);
      const body = Math.exp(-time * bodyDecay);
      const bell = Math.exp(-time * 5.4);
      const strike = Math.exp(-time * 18);
      const motion = 1 + Math.sin(time * 5.1 + phaseSeed) * 0.012;
      const fundamental = Math.sin(TWO_PI * frequency * time * motion + stereoPhase) * 0.54 * body;
      const octave = Math.sin(TWO_PI * frequency * 2.006 * time + 0.42 + stereoPhase) * 0.28 * bell;
      const twelfth = Math.sin(TWO_PI * frequency * 3.012 * time + 1.1) * 0.13 * Math.exp(-time * 7.2);
      const glass = Math.sin(TWO_PI * frequency * 4.18 * time + 0.2) * 0.075 * strike;
      const upper = Math.sin(TWO_PI * frequency * 5.01 * time + 1.8) * 0.045 * Math.exp(-time * 11.5);
      const value = (fundamental + octave + twelfth + glass + upper) * envelope;
      data[index] = value;
      peak = Math.max(peak, Math.abs(value));
    }
  }

  const normalize = 0.72 / peak;
  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      data[index] *= normalize;
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

function playTone(frequency, startTime, duration, options = {}) {
  const ctx = getAudioContext();
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const tone = ctx.createBiquadFilter();
  const output = getAudioGraph().input;
  const sample = getSkyPianoSample(ctx, frequency);
  const safeDuration = Math.max(0.08, duration);
  const release = Math.min(0.42, Math.max(0.16, options.release || safeDuration * 0.28));
  const level = Math.max(0.18, Math.min(1, options.level || 1));
  const playLength = Math.min(sample.duration, Math.max(0.42, safeDuration + release));

  source.buffer = sample;
  tone.type = "lowpass";
  tone.frequency.setValueAtTime(frequency > 900 ? 7600 : 6800, startTime);
  tone.Q.setValueAtTime(0.3, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.82 * level, startTime + 0.008);
  gain.gain.setTargetAtTime(0.0001, startTime + safeDuration, release * 0.42);
  source.connect(tone).connect(gain).connect(output);
  source.start(startTime);
  source.stop(startTime + playLength + 0.02);
  activeOscillators.push(source);
}

function playbackGateForEvent(event, eventSeconds) {
  if (Number.isFinite(event.gate)) return Math.max(0.55, Math.min(0.995, event.gate));
  if (eventSeconds <= 0.17) return 0.72;
  if (eventSeconds <= 0.34) return 0.82;
  if (eventSeconds <= 0.7) return 0.91;
  return 0.96;
}

function playButton(id) {
  const ctx = getAudioContext();
  const now = ctx.currentTime + 0.01;
  playTone(frequencyForButton(id), now, 0.38, { level: 1 });
  flashPianoKey(id, 180);
}

function stopPlayback() {
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

function playSheet() {
  stopPlayback();
  if (!state.events.length) return;

  const ctx = getAudioContext();
  const beatSeconds = 60 / Math.max(30, Number(state.bpm) || 96);
  let cursor = ctx.currentTime + 0.08;
  let visualDelay = 80;

  state.events.forEach((event, index) => {
    if (event.type === "note") {
      const eventSeconds = beatSeconds * event.duration;
      const gate = playbackGateForEvent(event, eventSeconds);
      const toneSeconds = Math.max(0.045, eventSeconds * gate);
      const release = Math.min(0.12, Math.max(0.024, eventSeconds * (1 - gate) + 0.018));
      const noteCount = Math.max(1, event.notes.length);
      const chordLevel = Math.min(0.92, 1 / Math.pow(noteCount, 0.45));
      event.notes.forEach((id, noteIndex) => {
        const spread = noteCount > 1 ? noteIndex * 0.0045 : 0;
        playTone(frequencyForButton(id), cursor + spread, toneSeconds, {
          release,
          level: chordLevel
        });
        scheduledTimers.push(window.setTimeout(() => flashPianoKey(id, Math.min(190, Math.max(90, eventSeconds * 240))), visualDelay));
      });
      scheduledTimers.push(window.setTimeout(() => renderTimeline(index), visualDelay));
      visualDelay += eventSeconds * 1000;
      cursor += eventSeconds;
    } else if (event.type === "rest") {
      scheduledTimers.push(window.setTimeout(() => renderTimeline(index), visualDelay));
      visualDelay += beatSeconds * event.duration * 1000;
      cursor += beatSeconds * event.duration;
    } else if (event.type === "bar" || event.type === "line") {
      scheduledTimers.push(window.setTimeout(() => renderTimeline(index), visualDelay));
    }
  });

  scheduledTimers.push(window.setTimeout(() => {
    renderTimeline();
    setStatus("Playback finished");
  }, visualDelay + 80));
  setStatus("Playing sheet");
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
  if (els.enhancerSelect) els.enhancerSelect.value = state.chordAnalysis.enhancerMode || "threePhase";
}

function bindEvents() {
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
  els.analyzeAudioBtn.addEventListener("click", analyzeAudioFile);
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
    if (state.chordAnalysis.segments.length || state.chordAnalysis.melodyNotes.length) {
      setAudioStatus("Re-analyze for new engine profile");
    }
  });
  els.feelDensitySelect.addEventListener("change", () => {
    if (state.chordAnalysis.melodyNotes.length || state.chordAnalysis.rhythmHits.length) {
      rebuildCombinedAnalysis();
      renderChordAnalysis();
      setAudioStatus(`Combined feel rebuilt in ${feelDensitySettings(els.feelDensitySelect.value).label} mode`);
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
  });
  els.titleInput.addEventListener("input", renderExport);
  els.authorInput.addEventListener("input", renderExport);

  document.addEventListener("keydown", (event) => {
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
  bindEvents();
  renderAll();
}

init();
