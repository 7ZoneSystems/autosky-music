0001 # Sky Piano Sheet Maker Architecture
0002 This document describes the current Vercel app, browser client, API routes, audio engine, score import engine, and deployment model.
0003 Scope includes UI composition, Sky key data, sheet editing, score OMR, audio analysis, timing enhancement, playback, and MiMo refinement.
0004 The document is intentionally line-numbered so it can serve as a large architecture checklist.
0005 It does not include secret values, local `.env` contents, or user-specific credentials.
0006 The application is a browser-first static app with two serverless API routes.
0007 Static files live at the project root and are copied into `public/` during build.
0008 Vercel deploys the generated `public/` directory plus the `api/` serverless route.
0009 The primary runtime file is `app.js`.
0010 The primary markup file is `index.html`.
0011 The primary styling file is `styles.css`.
0012 The server endpoints are `api/mimo-refine.js` and `api/sheet-omr.js`.
0013 The user-facing product is a Sky: Children of the Light 15-button piano sheet maker.
0014 The app is designed around Sky piano grids, not a normal 88-key piano.
0015 The app supports composing manually on a virtual 3x5 button grid.
0016 The app supports importing text sheets in common Sky notation.
0017 The app supports exporting sheets as ABC-style buttons, numbers, note names, or JSON.
0018 The app supports decoding local audio files in the browser.
0019 The app supports extracting chords, melody, rhythm, foreground, background, and combined sheets.
0020 The app supports traditional score import from MusicXML, JSON, text, MXL, images, and PDFs.
0021 The app keeps API keys server-side only.
0022 Browser audio analysis does not call MiMo.
0023 MiMo refinement does not receive raw audio, and visual score import stays in the browser.
0024 MiMo refinement receives compact chord, melody, rhythm, and combined context lines.
0025 The app uses no build-time frontend framework.
0026 The app uses vanilla HTML, CSS, and JavaScript.
0027 The app uses Web Audio APIs for decode, analysis support, and playback.
0028 The app uses a generated Sky-piano-style preset for local playback.
0029 The app does not bundle official game audio samples.
0030 The app does not require network access for static composing, local audio analysis, or direct symbolic score imports.
0031 The app requires network access for MiMo refinement and first-time PDF.js loading for PDF score rendering.
0032 The app is optimized for pragmatic similarity and feel, not studio-grade transcription accuracy.
0033 The codebase is intentionally small and deployable with `npm run build`.
0034 The package name is `sky-piano-sheet-maker`.
0035 The package is marked private.
0036 The only declared dev dependency is `vercel`.
0037 The build command validates JavaScript syntax before generating `public/`.
0038 The build command checks `app.js`.
0039 The build command checks `api/mimo-refine.js` and `api/sheet-omr.js`.
0040 The build command creates `public/`.
0041 The build command copies `index.html` into `public/`.
0042 The build command copies `styles.css` into `public/`.
0043 The build command copies `app.js` into `public/`.
0044 The Vercel config points `outputDirectory` at `public`.
0045 The Vercel config enables clean URLs.
0046 The Vercel config disables trailing slash redirects.
0047 The repository ignores generated `public/`.
0048 The repository ignores local environment files through `.gitignore`.
0049 `.env.example` documents expected MiMo variables.
0050 `.env.example` must not contain real secrets.
0051 Runtime environment variable `MIMO_API_KEY` is required only for optional MiMo refinement.
0052 Runtime environment variable `XIAOMI_MIMO_API_KEY` is accepted as an alternate key name.
0053 Runtime environment variable `MIMO_BASE_URL` overrides the MiMo Anthropic base.
0054 Runtime environment variable `MIMO_MESSAGES_URL` overrides the exact MiMo messages endpoint.
0055 Runtime environment variable `MIMO_MODEL` overrides the MiMo model.
0056 The default MiMo base URL is `https://token-plan-sgp.xiaomimimo.com/anthropic`.
0057 The default MiMo messages URL is `https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages`.
0058 The default MiMo model is `mimo-v2.5`.
0059 Local API execution loads `.env` when not running on Vercel.
0060 Vercel execution relies on Vercel project environment variables.
0061 The API route never exposes the raw API key in browser JavaScript.
0062 The API route redacts long token-like strings in error messages.
0063 The refine API route limits text bodies; the score route accepts larger MXL zip payloads.
0064 The API route accepts only POST.
0065 Non-POST API requests return 405.
0066 Missing API key returns 500 with a configuration message.
0067 Missing chord lines or missing score files return 400.
0068 Failed MiMo calls return the upstream status when available.
0069 MiMo 404 responses trigger fallback endpoint attempts.
0070 Endpoint candidates are deduplicated before use.
0071 The prompt instructs MiMo to return compact deterministic chord text.
0072 The prompt asks MiMo to preserve timestamps when useful.
0073 The prompt asks MiMo to keep Sky mappings when useful.
0074 The prompt asks MiMo to mark unplayable rows as rest or not in selected key.
0075 The prompt includes title metadata.
0076 The prompt includes selected Sky key metadata.
0077 The prompt includes detected audio key metadata.
0078 The prompt includes duration metadata.
0079 The prompt includes raw detected chord lines.
0080 The prompt optionally includes melody context lines.
0081 The prompt optionally includes rhythm context lines.
0082 The prompt optionally includes combined Sky sketch lines.
0083 The API parses Anthropic-like content arrays.
0084 The API parses string content.
0085 The API parses completion-style responses as a fallback.
0086 The API responds with refined text, model, and endpoint on success.
0087 The app shell is a single page.
0088 The page title is Sky Piano Sheet Maker.
0089 The topbar contains branding and save/load actions.
0090 The main workspace contains piano, sheet, key data, audio, score import, and export panels.
0091 The piano panel exposes key, notation, step, and BPM controls.
0092 The piano panel renders 15 interactive buttons.
0093 The piano panel supports single-note entry.
0094 The piano panel supports chord-buffer entry.
0095 The sheet panel renders generated events.
0096 The sheet panel supports playback and stop.
0097 The sheet panel supports title and transcriber metadata.
0098 The sheet panel supports rest, bar, line, undo, and clear actions.
0099 The key data panel documents current Sky key configuration.
0100 The audio panel contains MP3/audio file selection.
0101 The audio panel contains analysis window size.
0102 The audio panel contains minimum chord duration.
0103 The audio panel contains chord sensitivity.
0104 The audio panel contains melody sensitivity.
0105 The audio panel contains engine profile.
0106 The audio panel contains feel density and playability controls.
0107 The audio panel contains timing enhancer mode.
0108 The audio panel displays detected key.
0109 The audio panel displays estimated BPM.
0110 The audio panel displays chord count.
0111 The audio panel displays melody note count.
0112 The audio panel displays rhythm hit count.
0113 The audio panel displays combined box count.
0114 The audio panel displays playable counts.
0115 The audio panel displays input/output match, self-correction count, and audio duration.
0116 The audio panel shows minimal chord output.
0117 The audio panel shows chord map rows.
0118 The audio panel shows melody Sky output.
0119 The audio panel shows melody map rows.
0120 The audio panel shows rhythm output.
0121 The audio panel shows rhythm map rows.
0122 The audio panel shows foreground/theme track text.
0123 The audio panel shows background pulse track text.
0124 The audio panel shows combined feel output.
0125 The audio panel shows combined map rows.
0126 The audio panel contains wordings and lyrics input.
0127 The audio panel shows word-note alignment.
0128 The score panel accepts MusicXML, XML, MXL, JSON, text, image, and PDF files.
0129 The score panel exposes key strategy, arrangement, and max-key controls.
0130 The score panel displays Sky key, BPM, note count, chord count, texture, simultaneous groups, substitutions, split chords, boxes, and source.
0131 The score panel renders mapped score rows and a Sky-format score output.
0132 The export panel supports text import, ABC1-5 import, number import, export format selection, and copy export.
0133 The export panel links source references.
0134 CSS uses a light utilitarian interface.
0135 CSS keeps panels as bounded work surfaces.
0136 CSS uses responsive grids for desktop and mobile.
0137 CSS avoids horizontal overflow through global max-width handling.
0138 CSS uses row colors for piano key rows.
0139 CSS uses compact cards for stats and repeated map rows.
0140 CSS keeps cards at 8px radius through the shared radius variable.
0141 CSS uses dashed containers for timelines and maps.
0142 CSS uses generated media only through Web Audio, not external images.
0143 The main global state object is `state`.
0144 `state.keyId` stores the selected Sky key.
0145 `state.notation` stores button label mode.
0146 `state.chordMode` stores single or chord-entry mode.
0147 `state.duration` stores manual event duration in beats.
0148 `state.bpm` stores playback tempo.
0149 `state.pending` stores the chord buffer.
0150 `state.events` stores the current sheet events.
0151 `state.chordAnalysis` stores audio-derived analysis data and is also populated by score import.
0152 `state.chordAnalysis.fileName` stores analyzed file name.
0153 `state.chordAnalysis.duration` stores audio duration.
0154 `state.chordAnalysis.keyGuess` stores estimated major key.
0155 `state.chordAnalysis.segments` stores chord segments.
0156 `state.chordAnalysis.refinedText` stores MiMo refinement output.
0157 `state.chordAnalysis.melodyNotes` stores merged playable melody notes.
0158 `state.chordAnalysis.foregroundNotes` stores piano foreground notes.
0159 `state.chordAnalysis.backgroundNotes` stores accompaniment pulse notes.
0160 `state.chordAnalysis.neuralNotes`, quality, correction, input signature, and rhythm hits store recovery data.
0161 `state.chordAnalysis.combinedEvents` stores combined sheet events.
0162 `state.chordAnalysis.tempoEstimate` stores BPM estimate.
0163 `state.chordAnalysis.tuning` stores auto-tune result.
0164 `state.chordAnalysis.analysisProfile` stores engine profile.
0165 `state.chordAnalysis.feelDensity` and `playability` store richness and reduction modes.
0166 `state.chordAnalysis.enhancerMode` stores timing enhancer mode.
0167 `state.chordAnalysis.enhancementSummary` stores enhancer metrics.
0168 `state.chordAnalysis.wordingAssignments` stores lyrics-to-note alignment.
0169 `state.scoreAnalysis` stores score-import source, mapping, substitution, and combined-output metadata.
0170 `els` is the DOM element registry.
0171 Event binding reads from `els`.
0172 Rendering writes through `els`.
0173 `audioContext` caches the Web Audio context.
0174 `scheduledTimers` tracks playback timers.
0175 `activeOscillators` tracks stoppable audio sources.
0176 `audioGraph` caches the shared playback graph.
0177 `skyPianoSampleCache` caches generated samples by sample rate and frequency.
0178 The Sky grid uses three rows named A, B, and C.
0179 Each Sky grid row contains five columns.
0180 `SKY_BUTTONS` creates 15 button descriptors.
0181 Each button descriptor has numeric id.
0182 Each button descriptor has row.
0183 Each button descriptor has column.
0184 Each button descriptor has ABC label.
0185 Each button descriptor has keyboard shortcut.
0186 Keyboard row one maps to Y U I O P.
0187 Keyboard row two maps to H J K L semicolon.
0188 Keyboard row three maps to N M comma period slash.
0189 `KEY_CONFIGS` stores all supported Sky major layouts.
0190 `KEY_CONFIGS` includes C major.
0191 `KEY_CONFIGS` includes C sharp or D flat major.
0192 `KEY_CONFIGS` includes D major.
0193 `KEY_CONFIGS` includes D sharp or E flat major.
0194 `KEY_CONFIGS` includes E major.
0195 `KEY_CONFIGS` includes F major.
0196 `KEY_CONFIGS` includes F sharp or G flat major.
0197 `KEY_CONFIGS` includes G major.
0198 `KEY_CONFIGS` includes G sharp or A flat major.
0199 `KEY_CONFIGS` includes A major.
0200 `KEY_CONFIGS` includes A sharp or B flat major.
0201 `KEY_CONFIGS` includes B major.
0202 B major also acts as practical C flat major.
0203 G flat layout explicitly includes C flat scale degrees.
0204 Each key config has id.
0205 Each key config has label.
0206 Each key config has aliases.
0207 Each key config has setup notes.
0208 Each key config has convenient places.
0209 Each key config has rows of note names.
0210 Each key config has root MIDI.
0211 `NOTE_STEPS` maps 15 buttons to two major-scale octaves.
0212 `NOTE_STEPS` begins at scale degree one.
0213 `NOTE_STEPS` spans 24 semitones.
0214 `PC_NAMES_SHARP` stores sharp pitch-class labels.
0215 `PC_NAMES_FLAT` stores flat pitch-class labels.
0216 `FLAT_KEY_IDS` selects flat naming keys.
0217 `SKY_KEY_BY_PC` maps pitch classes to supported key ids.
0218 `NOTE_TO_PC` maps note strings to pitch classes.
0219 `CHORD_TEMPLATES` stores audio and score chord interval templates.
0220 Chord templates include major triad.
0221 Chord templates include minor triad.
0222 Chord templates include suspended second.
0223 Chord templates include suspended fourth.
0224 Chord templates include diminished.
0225 Chord templates include augmented.
0226 Chord templates include dominant seventh.
0227 Chord templates include major seventh.
0228 Chord templates include minor seventh.
0229 Chord templates include sixth, diminished seventh, half-diminished seventh, and minor-major seventh.
0230 Chord templates include minor sixth, add ninth, minor add ninth, and power dyads.
0231 `MAJOR_KEY_PROFILE` stores a Krumhansl-like major-key profile.
0232 `ANALYSIS_MIDI_START` begins chord analysis at MIDI 36.
0233 `ANALYSIS_MIDI_END` ends chord analysis at MIDI 88.
0234 `PIANO_MIDI_START` begins piano salience at MIDI 40.
0235 `PIANO_MIDI_END` ends piano salience at MIDI 88.
0236 Melody target sample rate is 8000 Hz.
0237 Melody frame length is 1024 samples.
0238 Melody default hop length is 256 samples.
0239 Melody minimum frequency is 82 Hz.
0240 Melody maximum frequency is 1175 Hz.
0241 Melody minimum note duration is 0.12 seconds.
0242 Melody join gap is 0.13 seconds.
0243 Rhythm target sample rate is 11025 Hz.
0244 Rhythm frame length is 1024 samples.
0245 Rhythm default hop length is 256 samples.
0246 Combined bars use four beats per bar.
0247 Word token parsing uses `WORD_TOKEN_PATTERN`.
0248 `TWO_PI` caches two times pi.
0249 Key aliases are indexed in `KEY_ALIASES`.
0250 `currentConfig` resolves selected key configuration.
0251 `flattenRows` flattens a 3x5 key matrix.
0252 `getButton` resolves a button descriptor by id.
0253 `getCellNote` resolves the selected-key note name for a button.
0254 `normalizePc` wraps pitch classes into zero through eleven.
0255 `noteNameToPc` converts note names to pitch classes.
0256 `prefersFlatNames` selects flat or sharp names.
0257 `noteNameForPc` formats pitch-class names.
0258 `chordLabel` and `chordLabelWithBass` build root and inversion labels.
0259 `midiToFrequency` converts MIDI to Hertz.
0260 `formatTime` renders seconds as MM:SS.
0261 `formatDuration` renders seconds compactly.
0262 `labelForButton` renders a button according to notation mode.
0263 `eventLabel` renders a sheet event.
0264 `setStatus` writes main status text.
0265 `setAudioStatus` writes audio status text.
0266 `renderKeyOptions` populates the key selector.
0267 `renderPiano` renders the 15 button grid.
0268 `renderPiano` applies selected state for pending chord buttons.
0269 `renderPiano` sets aria labels for buttons.
0270 `renderPiano` binds button clicks to `handleButtonPress`.
0271 `renderKeyData` writes selected key metadata.
0272 `renderKeyData` renders the note matrix.
0273 `renderKeyData` renders convenient place chips.
0274 `renderPending` renders chord buffer text.
0275 `renderPending` enables or disables add chord.
0276 `makeMiniGrid` creates a compact 15-dot event preview.
0277 `renderTimeline` renders the editable sheet timeline.
0278 `renderTimeline` shows Empty when no events exist.
0279 `renderTimeline` creates clickable tiles for event removal.
0280 `renderTimeline` renders notes with mini grids.
0281 `renderTimeline` renders rests as dots.
0282 `renderTimeline` renders bars as vertical bars.
0283 `renderTimeline` renders line breaks as full-width separators.
0284 `renderTimeline` updates box count metadata.
0285 `renderMode` highlights single or chord mode.
0286 `renderExport` refreshes export text.
0287 `renderAll` coordinates all major render functions.
0288 Manual sheet events use objects with a `type` field.
0289 Note events use `type: note`.
0290 Note events contain `notes` as button ids.
0291 Note events contain `duration` in beats.
0292 Rest events use `type: rest`.
0293 Rest events contain `duration` in beats.
0294 Bar events use `type: bar`.
0295 Line events use `type: line`.
0296 Generated note events may include `time`.
0297 Generated note events may include `kind`.
0298 Generated note events may include `strength`.
0299 Generated note events may include `gate`.
0300 Manual adding normalizes note ids.
0301 `handleButtonPress` plays immediate audio feedback.
0302 `handleButtonPress` toggles pending notes in chord mode.
0303 `handleButtonPress` appends a note in single mode.
0304 `addChord` appends the pending chord.
0305 `addRest` appends a rest event.
0306 `addBar` appends a bar event.
0307 `addLine` appends a line event.
0308 `undo` removes the last event.
0309 `clearSheet` clears events and pending state.
0310 `clearSheet` stops active playback.
0311 `abcForEvent` exports events as ABC1-5 tokens.
0312 `numbersForEvent` exports events as 1-15 tokens.
0313 `notesForEvent` exports events as ABC plus note names.
0314 `joinTokens` joins event tokens with spaces.
0315 `joinTokens` preserves line breaks.
0316 `getExportText` selects export serializer.
0317 JSON export includes title.
0318 JSON export includes transcriber.
0319 JSON export includes key id.
0320 JSON export includes key label.
0321 JSON export includes BPM.
0322 JSON export includes notation description.
0323 JSON export includes events.
0324 `parseAbcToken` parses rest dots.
0325 `parseAbcToken` parses bars.
0326 `parseAbcToken` parses ABC row-column tokens.
0327 `parseAbcToken` supports chords by concatenated ABC tokens.
0328 `parseNumberToken` parses rests.
0329 `parseNumberToken` parses bars.
0330 `parseNumberToken` parses comma-separated note ids.
0331 `parseNumberToken` parses plus-separated note ids.
0332 `parseNumberToken` parses slash-separated note ids.
0333 `parseNumberToken` parses compact single-digit chords.
0334 `importSheet` reads multiline text.
0335 `importSheet` applies parser mode.
0336 `importSheet` inserts line events between input lines.
0337 `importSheet` replaces the current sheet on success.
0338 Local save uses browser localStorage.
0339 `saveSheet` stores title, transcriber, key, notation, duration, BPM, and events.
0340 `loadSheet` restores localStorage data.
0341 `loadSheet` falls back safely for missing fields.
0342 `copyExport` prefers clipboard API.
0343 `copyExport` falls back to document execCommand.
0344 Keyboard shortcuts are ignored inside inputs, textareas, and selects.
0345 Keyboard shortcuts map key presses to Sky buttons.
0346 Backspace triggers undo.
0347 Space triggers rest.
0348 Chord mapping starts with `chordPcs`.
0349 `chordPcs` derives pitch classes from segment root and intervals.
0350 `chooseSkyButtonsForPcs` maps chord pitch classes onto current Sky key.
0351 `chooseSkyButtonsForPcs` rejects unplayable chromatic pitch classes.
0352 `chooseSkyButtonsForPcs` scores range compactness.
0353 `chooseSkyButtonsForPcs` scores center position.
0354 `chooseSkyButtonsForPcs` scores row position.
0355 `skyTextForButtons` formats ABC chord text.
0356 `displayChordLabel` formats chord names.
0357 `mappingForChord` returns Sky button ids and text.
0358 `keyConfigById` resolves any key id.
0359 `skyMidiForButton` maps a Sky button to MIDI.
0360 `chooseSkyButtonForMidi` snaps arbitrary MIDI to closest Sky button.
0361 `chooseSkyButtonForMidi` adds a small center-cost tie breaker.
0362 `melodyMapping` maps a note object to current Sky button.
0363 `melodyNoteLabel` formats note pitch class.
0364 `playableMelodyNotes` filters mapped melody notes.
0365 `playableChordSegments` filters mapped chord segments.
0366 `findChordSegmentAtTime` finds chord segment for a timestamp.
0367 `findChordSegmentAtTime` uses binary search.
0368 `chooseSkyButtonForPc` maps a pitch class to a button.
0369 `chooseSkyButtonForPc` avoids already used buttons.
0370 `chordAccentButtons` selects chord tones for combined arrangements.
0371 `chordAccentButtons` prioritizes root and fifth.
0372 `chordAccentButtons` then prioritizes third or seventh tones.
0373 `nearestRhythmHit` finds an onset near a melody time.
0374 `addCombinedAnchor` adds a normalized arrangement anchor.
0375 Combined anchors contain time.
0376 Combined anchors contain duration.
0377 Combined anchors contain button ids.
0378 Combined anchors contain kind.
0379 Combined anchors contain label.
0380 Combined anchors contain strength.
0381 Combined anchors may contain melody button id.
0382 `compressAnchorsForPlayability` trims anchors before collapse.
0383 `collapseCombinedAnchors` preserves melody button priority.
0384 `thinCombinedAnchors` limits maximum event count.
0385 `thinCombinedAnchors` always favors melody anchors.
0386 `buildCombinedArrangement` creates final human-playable arrangement anchors.
0387 `buildCombinedArrangement` starts from melody notes.
0388 `buildCombinedArrangement` adds harmony near rhythm hits.
0389 `buildCombinedArrangement` adds background notes.
0390 `buildCombinedArrangement` adds rhythm chord pulses.
0391 `buildCombinedArrangement` falls back to chord pulses when sparse.
0392 `buildCombinedArrangement` converts anchors to note, rest, and bar events.
0393 `buildCombinedArrangement` inserts rests based on gaps.
0394 `buildCombinedArrangement` inserts bars on beat boundaries.
0395 `rebuildCombinedAnalysis` reruns combined arrangement.
0396 `rebuildCombinedAnalysis` applies feel density and playability modes.
0397 `rebuildCombinedAnalysis` applies timing enhancer mode.
0398 `rebuildCombinedAnalysis` stores combined events.
0399 `rebuildCombinedAnalysis` stores enhancement summary.
0400 Analysis profiles tune processing cost and precision.
0401 Balanced profile is faster.
0402 Balanced profile uses melody hop 384.
0403 Balanced profile uses chord probes at 0.35 and 0.65.
0404 Balanced profile uses rhythm hop 320.
0405 Balanced profile uses piano frame 2048.
0406 Long song profile is default.
0407 Long song profile uses melody hop 512.
0408 Long song profile uses chord probes at 0.22, 0.5, and 0.78.
0409 Long song profile uses rhythm hop 256.
0410 Long song profile uses piano frame 4096.
0411 Song translator profile is the default full audio-to-Sky arranger.
0412 Song translator uses melody hop 256.
0413 Song translator uses five chord probes.
0414 Song translator uses rhythm hop 192.
0415 Song translator uses piano frame 4096 and hop 640.
0416 Song translator uses frequency caching plus two self-correction passes.
0417 Feel density controls arrangement richness.
0418 Playability controls maximum simultaneous Sky keys.
0419 Simple playability produces one-key melody-first output.
0420 Human playability produces two-key melody-plus-support output.
0421 Balanced density is the default.
0422 Balanced density permits moderate harmony injection.
0423 Full density lowers thresholds.
0424 Full density permits more simultaneous buttons.
0425 Full density permits more combined events.
0426 Timing enhancer modes are off, gentle, and threePhase.
0427 Off returns cloned events without shaping.
0428 Gentle uses weaker onset snapping.
0429 Three phase uses stronger beat-grid snapping.
0430 `flowEnhancerSettings` centralizes timing parameters.
0431 `eventDurationBeats` extracts beat duration.
0432 `chooseFlowGridStep` picks 1/8, 1/4, or 1/2 beat grid.
0433 `cloneSheetEvent` preserves note arrays when copying.
0434 `anchorsFromSheetEvents` converts events into timed anchors.
0435 `anchorsFromSheetEvents` normalizes first anchor to beat zero.
0436 `mergeCoincidentFlowAnchors` merges same-grid anchors.
0437 `snapFlowAnchors` performs phase one onset snapping.
0438 `gateForGap` computes a playback gate hint from note spacing.
0439 `pushBarAwareRest` splits rests across bars.
0440 `pushBarAwareNote` inserts notes while tracking bar position.
0441 `buildFlowEventsFromAnchors` performs phase two and three shaping.
0442 `enhanceSheetFlow` is the public enhancer entry point.
0443 `enhanceSheetFlow` returns events and summary.
0444 `quantizeBeatDuration` converts seconds to beat duration.
0445 `quantizeBeats` quantizes already-beat-based values.
0446 `estimateStopThreshold` computes rests from melody gaps.
0447 `estimateStopThreshold` adapts to beat duration and median gaps.
0448 Audio decode begins in `analyzeAudioFile`.
0449 `analyzeAudioFile` requires a selected file.
0450 `analyzeAudioFile` disables audio action buttons while running.
0451 `analyzeAudioFile` creates or reuses AudioContext.
0452 `analyzeAudioFile` decodes file data with Web Audio.
0453 `downmixAudioBuffer` creates mono samples.
0454 `resampleLinear` downsamples for analysis tracks.
0455 `preEmphasize` high-pass-emphasizes melody and rhythm streams.
0456 Chord analysis target rate is min 11025 Hz or source rate.
0457 Melody analysis target rate is 8000 Hz.
0458 Rhythm analysis target rate is min 11025 Hz or source rate.
0459 `estimateTempo` computes BPM from onset envelope.
0460 `estimateTempo` uses RMS flux over frames.
0461 `estimateTempo` tests BPM lags from 56 to 188.
0462 `estimateTempo` folds very slow tempos upward.
0463 `estimateTempo` folds very fast tempos downward.
0464 `estimateTempo` returns BPM and confidence.
0465 `createHannWindow` builds Hann windows.
0466 `buildOnsetEnvelope` computes rhythm onset flux.
0467 `buildOnsetEnvelope` uses RMS changes.
0468 `buildOnsetEnvelope` uses high-energy changes.
0469 `buildOnsetEnvelope` uses absolute amplitude changes.
0470 `buildOnsetEnvelope` uses zero-crossing changes.
0471 `smoothEnvelope` smooths local onset curves.
0472 `subtractLocalAverage` removes local baseline.
0473 `pickRhythmHits` peak-picks cleaned onset values.
0474 `pickRhythmHits` uses adaptive threshold.
0475 `pickRhythmHits` uses tempo-aware minimum gaps.
0476 `pickRhythmHits` labels hits by beat and bar position.
0477 `buildRhythmTrack` returns hits and raw envelope.
0478 `detectPitchYin` detects dominant pitch in a frame.
0479 `detectPitchYin` uses YIN difference function.
0480 `detectPitchYin` uses cumulative mean normalized difference.
0481 `detectPitchYin` applies sensitivity threshold.
0482 `detectPitchYin` refines tau by parabolic interpolation.
0483 `detectPitchYin` returns MIDI, frequency, confidence, and RMS.
0484 `smoothPitchFrames` median-smooths detected MIDI frames.
0485 `melodyChromaFromNotes` builds chroma from note durations.
0486 `pitchFramesToNotes` groups pitch frames into notes.
0487 `pitchFramesToNotes` merges repeated adjacent mapped buttons.
0488 `buildMelodyNotes` processes melody frames asynchronously.
0489 `buildMelodyNotes` uses requestAnimationFrame between batches.
0490 `buildMelodyNotes` returns notes and chroma.
0491 `buildAnalysisKernel` creates chord Goertzel bins.
0492 Chord Goertzel bins span MIDI 36 through 88.
0493 Chord bins track pitch class.
0494 Chord bins include low-register weighting.
0495 `frameRms` computes windowed RMS.
0496 `goertzelPower` computes narrowband power.
0497 `extractFrameChroma` accumulates pitch-class power.
0498 `extractWindowChroma` probes multiple frame positions inside a window.
0499 `extractWindowChroma` returns normalized chroma and RMS.
0500 `chordTemplateVector` builds a normalized chord vector.
0501 `detectChord` matches chroma against chord templates.
0502 `detectChord` rejects low RMS windows.
0503 `detectChord` rejects low-confidence matches.
0504 `detectChord` rejects ambiguous matches.
0505 `estimateMajorKey` scores global chroma against major profiles.
0506 `addChroma` combines chroma arrays.
0507 `scoreSkyKeyForMelody` computes average snap error per key.
0508 `estimateBestSkyKeyForMelody` chooses lowest snap error.
0509 `smoothChordFrames` removes single-frame chord glitches.
0510 `mergeFrames` merges adjacent same-label chord frames.
0511 `enforceMinimumChordDuration` absorbs short chord segments.
0512 `buildChordFrames` extracts chord windows asynchronously.
0513 `buildChordFrames` returns frames and global chroma.
0514 Piano fallback uses salience instead of single-pitch YIN.
0515 `buildPianoSalienceKernel` creates salience bins.
0516 Piano salience spans MIDI 40 through 88.
0517 Piano salience includes fundamental bins.
0518 Piano salience includes second partial bins when below Nyquist.
0519 Piano salience includes third partial bins when below Nyquist.
0520 Piano salience includes melody bias.
0521 Piano salience includes bass bias.
0522 `extractPianoSalienceFrame` extracts harmonic salience.
0523 `extractPianoSalienceFrame` returns normalized scores.
0524 `smoothSalienceFrames` smooths note salience over time and feeds neural activation frames.
0525 `pickForegroundCandidate` chooses top-line piano candidate.
0526 `pickForegroundCandidate` favors continuity.
0527 `pickForegroundCandidate` favors upper melody range.
0528 `pickForegroundCandidate` penalizes large octave jumps.
0529 `pickBackgroundCandidates` chooses accompaniment candidates.
0530 `pickBackgroundCandidates` avoids foreground overlap.
0531 `pickBackgroundCandidates` favors lower accompaniment.
0532 `contourFramesToNotes` groups foreground frames into notes.
0533 `markRecurringThemes` identifies repeated three-note motifs.
0534 `markRecurringThemes` annotates theme strength.
0535 `mergeNearDuplicateNotes` merges repeated adjacent note detections.
0536 `melodyCoverage` measures detected-note coverage of audio duration.
0537 `mergeMelodySources` fuses YIN and piano foreground notes.
0538 `mergeMelodySources` falls back when YIN is sparse.
0539 `mergeMelodySources` preserves recurring piano themes.
0540 `buildBackgroundTrackFromFrames` extracts accompaniment pulses.
0541 `buildPianoCoverTracks` runs the piano salience pipeline.
0542 `buildPianoCoverTracks` processes frames asynchronously.
0543 `buildPianoCoverTracks` returns foreground and background notes.
0544 After analysis, chord frames are smoothed.
0545 After analysis, chord frames are merged.
0546 After analysis, minimum chord duration is enforced.
0547 After analysis, YIN melody, piano foreground, and neural lattice notes are merged.
0548 After analysis, global chroma, neural chords, and merged melody chroma are reconciled.
0549 After analysis, major key is estimated.
0550 After analysis, `state.chordAnalysis` is replaced.
0551 After analysis, combined arrangement is rebuilt.
0552 After analysis, the UI is rerendered.
0553 Analysis status includes melody count.
0554 Analysis status includes background count.
0555 Analysis status includes rhythm count.
0556 Analysis status includes chord segment count.
0557 Analysis status includes BPM when available.
0558 Analysis status includes timing mode when enabled.
0559 Analysis status indicates cached song-frequency frames when used.
0560 Failed analysis clears chordAnalysis fields.
0561 Failed analysis shows an analysis failure message.
0562 Failed analysis logs the error to console.
0563 `useDetectedKey` applies estimated key.
0564 `useDetectedKey` clears refined text.
0565 `useDetectedKey` rebuilds combined output.
0566 `useEstimatedBpm` applies estimated BPM.
0567 `useEstimatedBpm` rebuilds combined output.
0568 `autoTuneMelody` chooses best Sky key for melody notes.
0569 `autoTuneMelody` also applies estimated BPM when available.
0570 `autoTuneMelody` reports average pitch error.
0571 Wording conversion starts with tokenization.
0572 `splitWordIntoSyllables` approximates syllable splits.
0573 `splitWordingTokens` removes non-alphanumeric punctuation tokens.
0574 `buttonIdForPitchClass` maps note words to Sky buttons.
0575 `buttonIdForWordingToken` accepts ABC labels.
0576 `buttonIdForWordingToken` accepts button numbers.
0577 `buttonIdForWordingToken` accepts solfege.
0578 `buttonIdForWordingToken` accepts note names.
0579 `noteForButtonId` creates synthetic note objects for direct words.
0580 `alignWordingToNotes` converts direct note words when possible.
0581 `alignWordingToNotes` otherwise aligns words across melody notes.
0582 `melodyNotesToEvents` converts notes to sheet events.
0583 `melodyNotesToEvents` inserts rests using stop threshold.
0584 `melodyNotesToEvents` adds time and source metadata.
0585 `melodyNotesToEvents` applies timing enhancer.
0586 `importWordingNotes` imports aligned wording notes.
0587 `importPlayableChords` imports chord segments into the sheet.
0588 `importPlayableChords` uses rests for unplayable chords.
0589 `importMelodyNotes` imports melody events.
0590 `importCombinedArrangement` imports combined events.
0591 `importCombinedArrangement` strips analysis-only metadata except gate and kind.
0592 `renderChordAnalysis` controls audio output rendering.
0593 `renderChordAnalysis` updates all stat cards.
0594 `renderChordAnalysis` enables use key when key guess exists.
0595 `renderChordAnalysis` enables use BPM when estimate exists.
0596 `renderChordAnalysis` enables MiMo when segments exist.
0597 `renderChordAnalysis` enables auto-tune when melody exists.
0598 `renderChordAnalysis` enables melody import when melody is playable.
0599 `renderChordAnalysis` enables chord import when chords are playable.
0600 `renderChordAnalysis` writes chord textarea.
0601 `renderChordAnalysis` writes chord rows.
0602 `renderChordAnalysis` writes melody textarea.
0603 `renderChordAnalysis` writes melody rows.
0604 `renderRhythmAnalysis` writes rhythm count.
0605 `renderRhythmAnalysis` writes rhythm textarea.
0606 `renderRhythmAnalysis` writes rhythm rows.
0607 `trackLineForNote` formats foreground and background note rows.
0608 `renderSeparatedTracks` writes foreground textarea.
0609 `renderSeparatedTracks` writes background textarea.
0610 `renderCombinedAnalysis` writes combined count.
0611 `renderCombinedAnalysis` enables combined import.
0612 `renderCombinedAnalysis` writes combined ABC output.
0613 `renderCombinedAnalysis` writes combined rows.
0614 `renderWordingAssignments` writes word-note alignment rows.
0615 `renderWordingAssignments` enables wording import.
0616 Playback starts with `playSheet`.
0617 Playback stops with `stopPlayback`.
0618 `getAudioContext` lazily creates AudioContext.
0619 `getAudioGraph` lazily creates shared playback graph.
0620 The current playback graph is dry and simple.
0621 The playback graph contains an input gain.
0622 The playback graph contains a low-pass body filter.
0623 The playback graph contains a soft compressor.
0624 The playback graph contains output gain.
0625 The playback graph contains no random convolution reverb.
0626 The playback graph contains no delay feedback.
0627 The playback graph contains no vibrato.
0628 `frequencyForButton` maps selected Sky key to frequency.
0629 `createSkyPianoSample` generates a dry procedural note.
0630 `createSkyPianoSample` generates identical stereo channels.
0631 `createSkyPianoSample` uses exact harmonic ratios.
0632 `createSkyPianoSample` avoids detuned partials.
0633 `createSkyPianoSample` avoids random noise.
0634 `createSkyPianoSample` avoids pitch motion.
0635 `createSkyPianoSample` uses a short attack.
0636 `createSkyPianoSample` uses fixed duration based on pitch range.
0637 `createSkyPianoSample` normalizes peak gain.
0638 `getSkyPianoSample` caches generated samples.
0639 `playTone` plays a cached buffer source.
0640 `playTone` routes through tone filter, gain, and shared graph.
0641 `playTone` does not cut the sample tail to event duration.
0642 `playTone` supports level scaling.
0643 `playButton` gives immediate note feedback.
0644 `flashPianoKey` applies visual playing state.
0645 `playbackGateForEvent` remains as timing metadata for generated events.
0646 `playSheet` schedules events using BPM.
0647 `playSheet` scales chord gain by note count.
0648 `playSheet` flashes keys during playback.
0649 `stopPlayback` clears timers.
0650 `stopPlayback` stops active buffer sources.
0651 The app does not use official Sky audio samples.
0652 The app cannot exactly match official Sky audio without licensed assets.
0653 The app intentionally avoids shipping extracted game assets.
0654 The generated preset is intended to be dry Sky-piano-style only.
0655 The generated preset is not a bell preset.
0656 The generated preset is not a harp preset.
0657 The generated preset is not a hold-sustain synth.
0658 `bindEvents` wires all UI controls.
0659 Key change clears pending notes.
0660 Key change clears refined text.
0661 Key change clears tuning metadata.
0662 Key change rebuilds combined analysis.
0663 Notation change rerenders the app.
0664 Duration change updates manual duration state.
0665 BPM change clamps between 30 and 240.
0666 BPM change rebuilds combined analysis.
0667 Single mode clears pending chord.
0668 Chord mode keeps pending interactions.
0669 File input change updates audio status.
0670 Analyze button starts `analyzeAudioFile`.
0671 Auto tune button starts `autoTuneMelody`.
0672 Refine button starts MiMo refinement.
0673 Import combined button imports combined events.
0674 Import melody button imports melody events.
0675 Import playable button imports chord events.
0676 Use BPM button applies estimate.
0677 Use key button applies detected key.
0678 Align words button aligns wording text.
0679 Import wording button imports wording events.
0680 Wording input edits clear existing wording assignments.
0681 Window select change asks for reanalysis.
0682 Minimum chord select change asks for reanalysis.
0683 Chord sensitivity input change asks for reanalysis.
0684 Melody sensitivity input change asks for reanalysis.
0685 Engine profile change asks for reanalysis.
0686 Feel density or playability change rebuilds combined output.
0687 Enhancer change rebuilds combined output.
0688 Title input change refreshes export.
0689 Author input change refreshes export.
0690 `init` renders key options.
0691 `init` syncs controls.
0692 `init` binds events.
0693 `init` renders the app.
0694 The static build does not bundle dependencies.
0695 The client uses a dynamic PDF.js CDN import only when PDF score rendering is needed.
0696 The client otherwise relies on browser globals.
0697 The client must remain compatible with modern browsers supporting Web Audio.
0698 Browser decoding support depends on browser codecs.
0699 MP3 decoding usually works in Chrome-based browsers.
0700 WAV decoding is accepted by the file input through `audio/*`.
0701 Audio analysis runs on the main thread in batches.
0702 Batch processing uses requestAnimationFrame for UI responsiveness.
0703 Long songs are supported by lower-density frame settings.
0704 Song translator mode increases quality at the cost of runtime.
0705 No Web Worker is currently used.
0706 No WASM is currently used.
0707 No external ML model is currently called directly from the browser.
0708 No server-side audio upload is currently performed.
0709 All local audio analysis happens client-side.
0710 The MiMo refine API receives compact textual summaries; visual score OMR runs in client code.
0711 The MiMo API routes are Node serverless code.
0712 The MiMo API routes use CommonJS.
0713 The browser code uses strict mode.
0714 The API code uses strict mode.
0715 Build syntax checks prevent obvious parse errors.
0716 Runtime browser smoke tests are useful after Web Audio changes.
0717 `searched.md` is present but not part of the app build.
0718 `searched.md` is not copied into public.
0719 `.env` is not part of the app build.
0720 `.env.example` is safe documentation.
0721 `README.md` is product and setup documentation.
0722 `ARCHITECTURE.md` is implementation architecture documentation.
0723 The current architecture favors clarity over framework abstraction.
0724 The current architecture keeps all client logic in one file.
0725 The current architecture makes refactoring easy by function groups.
0726 Future refactoring could split constants into modules.
0727 Future refactoring could split rendering into modules.
0728 Future refactoring could split audio analysis into modules.
0729 Future refactoring could split playback into modules.
0730 Future refactoring would require a bundler or native modules.
0731 The project currently avoids bundler complexity.
0732 The project currently avoids dependency churn.
0733 The project currently avoids external CDN dependencies.
0734 The project currently avoids exposing secrets.
0735 The project currently avoids official-game asset bundling.
0736 Data-model invariants matter for imports.
0737 Event `type` must be one of note, rest, bar, or line.
0738 Note event `notes` must contain button ids from 1 to 15.
0739 Note event `duration` should be positive when playable.
0740 Rest event `duration` should be positive.
0741 Bar events should not carry duration.
0742 Line events should not carry duration.
0743 Generated event `time` is optional.
0744 Generated event `kind` is optional.
0745 Generated event `gate` is optional.
0746 Export should ignore unknown generated metadata except JSON export.
0747 Import should validate note ids.
0748 Import should reject malformed tokens.
0749 Playback should tolerate generated metadata.
0750 Rendering should tolerate missing optional fields.
0751 Analysis should tolerate empty outputs.
0752 Analysis should not throw on silent audio.
0753 Analysis should not fail the whole pipeline if one track is sparse.
0754 Song-frequency lead and salience fallback reduce blank melody results.
0755 Chord-pulse and self-correction fallback reduce blank combined results.
0756 Timing enhancer reduces chaotic timing from raw analysis.
0757 Feel density and playability control arrangement busyness and hand load.
0758 Auto tune gives user control over Sky key fit.
0759 Use BPM gives user control over playback timing.
0760 Use key gives user control over detected music key.
0761 MiMo refinement is optional and post-processing only.
0762 MiMo refinement is not required to use the app.
0763 MiMo refinement should be treated as text and playability cleanup.
0764 MiMo refinement should not be treated as audio transcription.
0765 Audio chord detection is chroma-template based, while score chord detection is pitch-set-template based.
0766 Chord detection is approximate and now keeps inversion bass labels when available.
0767 Score classification separates melody-led, accompaniment, chordal, complex, and dense textures.
0768 Chord detection may mark chromatic chords unplayable in selected key.
0769 Melody detection is approximate.
0770 Melody detection may prefer top line after piano fallback.
0771 Melody detection may miss buried vocals.
0772 Rhythm detection is approximate.
0773 Rhythm detection may over-pick percussive mixes.
0774 Rhythm detection may under-pick soft legato piano.
0775 Key estimation is major-profile based.
0776 Key estimation may be wrong for minor songs.
0777 Sky grid is major-scale constrained.
0778 Chromatic notes are snapped to nearest Sky button.
0779 Snapping prioritizes playability over exact pitch.
0780 Combined output prioritizes feel over literal transcription.
0781 Dense songs require user adjustment.
0782 Song translator mode should be used when quality is more important than speed.
0783 Balanced mode should be used for quick iteration.
0784 Long song mode should be used for full-length MP3s.
0785 Human playability should be used for readable sheets.
0786 Balanced density should be used for default arrangements.
0787 Full density should be used for richer but busier arrangements.
0788 Three phase timing should be used for most generated sheets.
0789 Gentle timing should be used when original timing should remain looser.
0790 Off timing should be used for debugging raw output.
0791 Current playback preset is generated.
0792 Current playback preset is dry.
0793 Current playback preset is exact-pitch.
0794 Current playback preset is cached.
0795 Current playback preset uses fixed tails.
0796 Current playback preset scales chord loudness.
0797 Current playback preset is not authoritative Sky audio.
0798 Exact Sky audio would require licensed official samples or an official API.
0799 The app should not scrape or bundle game assets.
0800 Security boundary starts at the browser/API split.
0801 Browser receives no MiMo API key.
0802 Browser sends only text summaries to `/api/mimo-refine`.
0803 API route reads secret from server environment.
0804 API route sanitizes errors before returning.
0805 API route caps request size.
0806 API route handles JSON parse failure.
0807 API route handles endpoint fallback.
0808 API route returns attempted endpoints only as URLs, not secrets.
0809 Local `.env` loading is server-side only.
0810 Local `.env` loading respects existing process variables.
0811 Vercel should configure production secrets in dashboard.
0812 Vercel should not rely on committed `.env`.
0813 Users should rotate exposed API keys if accidentally shared.
0814 UI accessibility uses aria labels on piano buttons.
0815 Timeline uses aria-live.
0816 Buttons use normal button elements.
0817 Inputs use labels.
0818 Textareas are read-only when displaying generated output.
0819 File input accepts audio MIME types.
0820 Keyboard shortcuts improve manual entry speed.
0821 Responsive layout collapses workspace panels on smaller screens.
0822 Mobile grid keeps piano buttons visible.
0823 Mobile action buttons wrap.
0824 Mobile row maps hide score columns when needed.
0825 Print CSS hides non-sheet panels.
0826 Print CSS leaves sheet timeline visible.
0827 Source links in export panel document external references.
0828 README source list documents research references.
0829 Architecture doc documents implementation references without relying on secrets.
0830 Testing currently relies on build and browser smoke tests.
0831 `npm run build` is the minimum verification command.
0832 `git diff --check` catches whitespace issues.
0833 Headless Chrome can smoke-test layout and playback.
0834 Headless Chrome may require sandbox escalation in restricted environments.
0835 Generated audio smoke tests can validate analysis flow.
0836 Generated polyphonic piano tests can validate fallback output.
0837 Runtime tests should verify nonblank melody output.
0838 Runtime tests should verify nonblank combined output.
0839 Runtime tests should verify foreground and background outputs.
0840 Runtime tests should verify playback enters Playing sheet.
0841 Runtime tests should verify no JavaScript exceptions.
0842 Future automated tests could use Playwright.
0843 Future automated tests could synthesize WAV fixtures.
0844 Future automated tests could compare output counts.
0845 Future automated tests could compare deterministic exports.
0846 Future automated tests could validate API prompt construction.
0847 Future automated tests could mock MiMo fetch responses.
0848 Future automated tests could validate `.env` parser behavior.
0849 Known risk: browser decode support varies by file format.
0850 Known risk: long files consume memory because full buffers are decoded.
0851 Known risk: all analysis runs on the main thread.
0852 Known risk: requestAnimationFrame batching pauses in background tabs.
0853 Known risk: chord matching is not a full music model.
0854 Known risk: song-frequency caching and salience recovery are local heuristics.
0855 Known risk: minor-key songs are estimated as major keys.
0856 Known risk: Sky's key behavior can depend on in-game sheets and background music.
0857 Known risk: fan-referenced key locations may change.
0858 Known risk: exact Sky audio cannot be matched with generated samples.
0859 Known risk: MiMo endpoint compatibility may change.
0860 Known risk: MiMo errors may be gateway-specific.
0861 Known risk: Vercel serverless runtime may differ from local dev.
0862 Known risk: local `.env` loading assumes process cwd is project root.
0863 Known risk: large MiMo prompts are sliced to 500 lines per context kind.
0864 Known risk: lyrics syllable splitting is heuristic.
0865 Known risk: word alignment is proportional, not forced alignment.
0866 Known risk: auto tune may choose a playable but musically surprising key.
0867 Known risk: combined arrangement may overfill full-density output.
0868 Known risk: import combined may create many boxes for long songs.
0869 Known risk: localStorage can be cleared by the browser.
0870 Known risk: copy fallback may fail in locked-down browsers.
0871 Operational guidance: run `npm install` before local Vercel dev.
0872 Operational guidance: run `npm run dev` for local API and static app.
0873 Operational guidance: open the Vercel dev URL.
0874 Operational guidance: set `MIMO_API_KEY` before testing MiMo.
0875 Operational guidance: use dedicated Anthropic-compatible MiMo base for API route.
0876 Operational guidance: use `MIMO_MESSAGES_URL` only for exact endpoint overrides.
0877 Operational guidance: use Long song profile for four-to-five minute files.
0878 Operational guidance: use Song translator profile for complex songs.
0879 Operational guidance: use Human or Simple playability when output is too busy.
0880 Operational guidance: use full density when output feels empty.
0881 Operational guidance: use auto tune after audio analysis.
0882 Operational guidance: use BPM estimate before importing melody.
0883 Operational guidance: inspect foreground track for piano-cover themes.
0884 Operational guidance: inspect background track for accompaniment pulse.
0885 Operational guidance: inspect chord map for unplayable rows.
0886 Operational guidance: import combined for feel-first arrangements.
0887 Operational guidance: import melody for simple song lines.
0888 Operational guidance: import playable chords for harmonic pads.
0889 Operational guidance: use wording converter for lyrics-to-note sketches.
0890 Operational guidance: export JSON for debugging event structure.
0891 Code maintenance: keep constants near the top of `app.js`.
0892 Code maintenance: keep DOM selectors in `els`.
0893 Code maintenance: keep state schema stable.
0894 Code maintenance: prefer existing render patterns for UI additions.
0895 Code maintenance: prefer existing analysis batching pattern for heavy loops.
0896 Code maintenance: preserve generated `public/` through `npm run build`.
0897 Code maintenance: do not commit real `.env` values.
0898 Code maintenance: redact errors that may contain tokens.
0899 Code maintenance: avoid adding dependencies unless the benefit is clear.
0900 Code maintenance: avoid official game assets unless licensing is solved.
0901 Refactor candidate: split Sky key data into `sky-data.js`.
0902 Refactor candidate: split DOM rendering into `render.js`.
0903 Refactor candidate: split sheet parser/exporter into `sheet-format.js`.
0904 Refactor candidate: split audio utilities into `audio-utils.js`.
0905 Refactor candidate: split chord analysis into `chord-analysis.js`.
0906 Refactor candidate: split melody analysis into `melody-analysis.js`.
0907 Refactor candidate: split piano salience into `piano-analysis.js`.
0908 Refactor candidate: split rhythm analysis into `rhythm-analysis.js`.
0909 Refactor candidate: split arrangement into `arranger.js`.
0910 Refactor candidate: split playback into `playback.js`.
0911 Refactor candidate: add a bundler only after modules become necessary.
0912 Enhancement candidate: Web Worker analysis pipeline.
0913 Enhancement candidate: progress bars per analysis phase.
0914 Enhancement candidate: cancel analysis button.
0915 Enhancement candidate: selectable instrument presets if legal samples exist.
0916 Enhancement candidate: minor-key estimation.
0917 Enhancement candidate: scale-mode selection beyond major.
0918 Enhancement candidate: user-editable chord maps.
0919 Enhancement candidate: manual correction UI for melody notes.
0920 Enhancement candidate: drag-reorder sheet tiles.
0921 Enhancement candidate: duration editing per tile.
0922 Enhancement candidate: save multiple local sheets.
0923 Enhancement candidate: import Sky Studio formats.
0924 Enhancement candidate: export MIDI-like debug data.
0925 Enhancement candidate: visualization of onset envelope.
0926 Enhancement candidate: visualization of chroma timeline.
0927 Enhancement candidate: visualization of salience contour and match graph.
0928 Enhancement candidate: server-side ML transcription option.
0929 Enhancement candidate: source separation model if hosted securely.
0930 Enhancement candidate: apply MiMo suggestions directly to combined-sheet cleanup.
0931 Enhancement candidate: audio preview of separated foreground track.
0932 Enhancement candidate: audio preview of separated background track.
0933 Enhancement candidate: controlled phrase-level arranger.
0934 Enhancement candidate: configurable max combined event count.
0935 Enhancement candidate: more explicit rest sensitivity control.
0936 Enhancement candidate: alternate notation for mobile users.
0937 Enhancement candidate: keyboard shortcut help modal.
0938 Enhancement candidate: accessibility improvements for screen readers.
0939 Enhancement candidate: persistence of audio settings.
0940 Enhancement candidate: import from URL if CORS and licensing allow.
0941 Source reference: official Sky help documents music sheets.
0942 Source reference: Sky Wiki documents instruments.
0943 Source reference: Sky Wiki documents music keys.
0944 Source reference: Sky Music documents ABC1-5 notation.
0945 Source reference: MDN documents Web Audio decodeAudioData.
0946 Source reference: Omnizart paper informs transcription toolbox context.
0947 Source reference: Deep Chroma Extractor informs chord feature context.
0948 Source reference: Onsets and Frames, JEPOO, and high-resolution piano AMT inform onset/offset framing.
0949 Source reference: melody extraction review informs polyphonic melody limits.
0950 Source reference: librosa beat track informs onset-to-beat pipeline.
0951 Source reference: Essentia segmentation informs minimum-note ideas.
0952 Source reference: MiMo, MusicXML, OMR, chord taxonomy, and PDF.js docs inform score import behavior.
0953 The architecture is intentionally pragmatic.
0954 The UI is the first screen, not a marketing page.
0955 The sheet maker remains usable without audio analysis.
0956 The audio analyzer remains usable without MiMo.
0957 The serverless route remains isolated from the static composer.
0958 The generated sheet remains editable after import.
0959 The current output is best treated as a draft arrangement.
0960 The user should manually clean generated sheets for performance quality.
0961 The project should keep user changes in dirty worktrees intact.
0962 The build should be rerun after any source edit.
0963 The generated `public/` directory should reflect latest static files.
0964 The API route should be syntax-checked with every build.
0965 The browser app should be smoke-tested after audio or DOM changes.
0966 The architecture doc should be updated after major pipeline changes.
0967 The README should stay shorter than this architecture doc.
0968 The README should focus on setup and user-facing behavior.
0969 The architecture doc should focus on internals and maintenance.
0970 The app currently has no database.
0971 The app currently has no authentication.
0972 The app currently has no user accounts.
0973 The app uploads only selected MXL zip payloads to the score route when that feature is used.
0974 The app currently has no telemetry.
0975 The app currently has no analytics.
0976 The app currently has no background jobs.
0977 The app currently has no external CSS framework.
0978 The app currently has no client package bundle.
0979 The app currently has no test runner dependency.
0980 The app currently has no TypeScript.
0981 The app currently has no service worker.
0982 The app currently has no offline cache beyond browser cache.
0983 The app currently stores only one local sheet.
0984 The app currently renders all timeline tiles directly.
0985 The app currently stores all audio analysis in memory.
0986 The app currently discards analysis on page reload.
0987 The app currently requires the user to reselect audio after reload.
0988 The app currently generates playback audio at runtime.
0989 The app currently caches playback samples during the page session.
0990 The app currently treats Sky key layouts as static curated data.
0991 The app currently treats Cb as B major for practical Sky use.
0992 The app currently treats G flat layout as containing C flat note names.
0993 The app currently treats combined arrangements as generated suggestions.
0994 The app currently treats MiMo text refinement as optional and visual score OMR as a local browser pass.
0995 The app currently treats official Sky audio as out of scope.
0996 The app currently treats exact audio transcription as out of scope.
0997 The app currently targets browser deployment on Vercel.
0998 The app currently targets practical Sky piano sheet creation.
0999 This document should remain synchronized with `app.js`, `index.html`, `api/mimo-refine.js`, and `api/sheet-omr.js`.
1000 End of architecture document.
