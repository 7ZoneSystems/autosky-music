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
const ANALYSIS_MIDI_END = 83;
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
    refinedText: ""
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
  refineChordsBtn: document.querySelector("#refineChordsBtn"),
  importChordsBtn: document.querySelector("#importChordsBtn"),
  analysisWindowSelect: document.querySelector("#analysisWindowSelect"),
  minChordSelect: document.querySelector("#minChordSelect"),
  chordSensitivityInput: document.querySelector("#chordSensitivityInput"),
  audioStatus: document.querySelector("#audioStatus"),
  detectedKeyText: document.querySelector("#detectedKeyText"),
  useDetectedKeyBtn: document.querySelector("#useDetectedKeyBtn"),
  chordCountText: document.querySelector("#chordCountText"),
  playableCountText: document.querySelector("#playableCountText"),
  audioDurationText: document.querySelector("#audioDurationText"),
  chordOutputText: document.querySelector("#chordOutputText"),
  chordResultList: document.querySelector("#chordResultList")
};

let audioContext;
let scheduledTimers = [];
let activeOscillators = [];

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

function playableChordSegments() {
  return state.chordAnalysis.segments.filter((segment) => segment.label !== "N.C." && mappingForChord(segment));
}

function renderChordAnalysis() {
  if (!els.chordResultList) return;
  const analysis = state.chordAnalysis;
  const segments = analysis.segments;
  const playable = playableChordSegments();

  els.audioDurationText.textContent = analysis.duration ? formatTime(analysis.duration) : "-";
  els.chordCountText.textContent = String(segments.filter((segment) => segment.label !== "N.C.").length);
  els.playableCountText.textContent = String(playable.length);
  els.importChordsBtn.disabled = playable.length === 0;
  els.refineChordsBtn.disabled = segments.length === 0;

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
    return;
  }

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

function extractWindowChroma(samples, startSecond, endSecond, kernel) {
  const startSample = Math.max(0, Math.floor(startSecond * kernel.sampleRate));
  const endSample = Math.min(samples.length, Math.floor(endSecond * kernel.sampleRate));
  const span = Math.max(1, endSample - startSample);
  const probeRatios = span > kernel.frameLength * 2 ? [0.25, 0.5, 0.75] : [0.5];
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

function buildChordFrames(samples, duration, kernel, windowSeconds, threshold, onProgress) {
  const frames = [];
  const globalChroma = Array(12).fill(0);
  const windowCount = Math.max(1, Math.ceil(duration / windowSeconds));

  return new Promise((resolve) => {
    let index = 0;

    function processBatch() {
      const batchEnd = Math.min(windowCount, index + 4);
      for (; index < batchEnd; index += 1) {
        const start = index * windowSeconds;
        const end = Math.min(duration, start + windowSeconds);
        const extracted = extractWindowChroma(samples, start, end, kernel);
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

async function analyzeAudioFile() {
  const file = els.audioFileInput.files && els.audioFileInput.files[0];
  if (!file) {
    setAudioStatus("Choose an MP3 file");
    return;
  }

  els.analyzeAudioBtn.disabled = true;
  els.refineChordsBtn.disabled = true;
  els.importChordsBtn.disabled = true;
  setAudioStatus("Decoding audio");

  try {
    const ctx = getAudioContext();
    const buffer = await ctx.decodeAudioData(await file.arrayBuffer());
    const targetRate = Math.min(11025, buffer.sampleRate);
    const mono = downmixAudioBuffer(buffer);
    const samples = resampleLinear(mono, buffer.sampleRate, targetRate);
    const windowSeconds = Number(els.analysisWindowSelect.value) || 1;
    const minimumSeconds = Number(els.minChordSelect.value) || 2;
    const threshold = Number(els.chordSensitivityInput.value) || 0.62;
    const frameLength = Math.min(4096, Math.max(2048, Math.floor(targetRate * Math.min(0.5, windowSeconds))));
    const kernel = buildAnalysisKernel(targetRate, frameLength);

    const analysis = await buildChordFrames(samples, buffer.duration, kernel, windowSeconds, threshold, (done, total) => {
      setAudioStatus(`Analyzing ${Math.round((done / total) * 100)}%`);
    });

    const smoothed = smoothChordFrames(analysis.frames);
    const merged = enforceMinimumChordDuration(mergeFrames(smoothed), minimumSeconds);
    state.chordAnalysis = {
      fileName: file.name,
      duration: buffer.duration,
      keyGuess: estimateMajorKey(analysis.globalChroma),
      segments: merged,
      refinedText: ""
    };
    renderChordAnalysis();
    setAudioStatus(`${file.name} analyzed`);
  } catch (error) {
    state.chordAnalysis = { fileName: "", duration: 0, keyGuess: null, segments: [], refinedText: "" };
    renderChordAnalysis();
    setAudioStatus("Audio decode failed");
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
  syncControls();
  renderAll();
  setStatus(`${guess.label} selected from audio`);
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
        chordLines
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

function getAudioContext() {
  if (!audioContext) {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextConstructor();
  }
  return audioContext;
}

function frequencyForButton(id) {
  const midi = currentConfig().rootMidi + NOTE_STEPS[id - 1];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function playTone(frequency, startTime, duration) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(0.05, duration));
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.04);
  activeOscillators.push(oscillator);
}

function playButton(id) {
  const ctx = getAudioContext();
  const now = ctx.currentTime + 0.01;
  playTone(frequencyForButton(id), now, 0.42);
  const key = els.pianoGrid.querySelector(`[data-id="${id}"]`);
  if (key) {
    key.classList.add("playing");
    window.setTimeout(() => key.classList.remove("playing"), 180);
  }
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
      event.notes.forEach((id) => playTone(frequencyForButton(id), cursor, beatSeconds * event.duration * 0.86));
      scheduledTimers.push(window.setTimeout(() => renderTimeline(index), visualDelay));
      visualDelay += beatSeconds * event.duration * 1000;
      cursor += beatSeconds * event.duration;
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
}

function bindEvents() {
  els.keySelect.addEventListener("change", () => {
    state.keyId = els.keySelect.value;
    state.pending = [];
    state.chordAnalysis.refinedText = "";
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
    renderExport();
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
  els.refineChordsBtn.addEventListener("click", refineChordsWithMimo);
  els.importChordsBtn.addEventListener("click", importPlayableChords);
  els.useDetectedKeyBtn.addEventListener("click", useDetectedKey);
  els.analysisWindowSelect.addEventListener("change", () => {
    if (state.chordAnalysis.segments.length) setAudioStatus("Re-analyze for new window");
  });
  els.minChordSelect.addEventListener("change", () => {
    if (state.chordAnalysis.segments.length) setAudioStatus("Re-analyze for new minimum");
  });
  els.chordSensitivityInput.addEventListener("input", () => {
    if (state.chordAnalysis.segments.length) setAudioStatus("Re-analyze for new sensitivity");
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
