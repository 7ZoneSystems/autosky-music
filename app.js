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
  events: []
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
  copyExportBtn: document.querySelector("#copyExportBtn")
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

function renderAll() {
  renderMode();
  renderPiano();
  renderPending();
  renderKeyData();
  renderTimeline();
  renderExport();
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

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
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
