# Audio Engine Processing

This document explains what happens behind the hood when the app turns an
imported MP3 into Sky piano sheet material. It is written as an implementation
map for the current browser engine in `app.js`, not as a claim of studio-grade
automatic music transcription.

The goal of the engine is not literal piano transcription. The goal is to
produce a playable 15-button Sky piano arrangement that keeps the song's feel:
main melody, harmonic color, rhythm pulse, recurring motifs, and readable
timing.

## Scope

The audio engine runs in the browser.

The local engine handles:

- audio decode;
- mono conversion;
- resampling;
- pre-emphasis;
- tempo estimation;
- shared song-frequency caching;
- chord chroma analysis;
- YIN-style melody pitch tracking;
- rhythm/onset detection;
- song-lead translation from cached frequency candidates;
- playable accompaniment extraction from cached bass/chord evidence;
- optional neural-lattice note activation over piano salience frames;
- input/output chroma and timing comparison;
- self-correction recovery for missed lead, accompaniment, and rhythm events;
- Sky-key estimation;
- auto tuning to the best Sky key;
- melody, chord, rhythm, and combined-sheet generation;
- timing cleanup with the three-phase enhancer;
- local playback with a generated dry Sky-piano-style preset.

The local engine does not send raw audio to MiMo.

MiMo is only used by `/api/mimo-refine` after analysis. It receives compact text
summaries of detected chords, melody, rhythm, and combined events. It can refine
the text layout of chord results, but it does not decode audio and does not
replace the browser signal-processing pipeline.

## Main Files

`app.js`

The full client app, audio analysis pipeline, Sky-grid mapping, sheet import,
timing enhancer, and playback synthesizer.

`api/mimo-refine.js`

The Vercel serverless endpoint used by "Refine with MiMo". It reads
`MIMO_API_KEY` from server-side environment variables, builds endpoint
candidates from `MIMO_BASE_URL` or `MIMO_MESSAGES_URL`, sends a compact prompt,
and returns refined text.

`README.md`

The shorter project overview, install instructions, environment-variable notes,
source list, and user-facing feature summary.

`ARCHITECTURE.md`

The broad application architecture document. This file focuses only on the
audio pipeline.

## Audio Pipeline Summary

The imported file moves through these phases:

```text
MP3 file
  -> Web Audio decodeAudioData
  -> downmix all channels to mono
  -> resample to analysis rates
  -> pre-emphasize melody/rhythm paths
  -> estimate tempo from energy-onset autocorrelation
  -> extract chord chroma windows
  -> track monophonic melody with YIN-style pitch detection
  -> extract rhythm hits from onset envelope
  -> extract piano-range salience frames once
  -> build shared song-frequency cache with chroma, onset, lead, bass, harmony
  -> translate whole-song lead line from cached candidates
  -> recover chord frames from cached chroma and pitch votes
  -> build playable accompaniment pulses from cached bass/root evidence
  -> merge YIN melody with song-lead translation and salience fallback
  -> estimate major Sky key from chord+melody chroma
  -> build combined Sky arrangement from melody, harmony, rhythm, background
  -> compare generated Sky chroma/timing against input chroma/timing
  -> self-correct sparse outputs with cached lead/accompaniment/onset evidence
  -> run three-phase timing enhancer
  -> render separated outputs and importable sheet events
```

The important design choice is that the engine now treats the input as a song
to be arranged for Sky piano, not as a recording that must be separated into a
piano stem. It creates one cached frequency table, then asks that table for
melody, chord, rhythm, bass, and harmony evidence. YIN and chroma remain as
cross-checks, but the cache is the main alignment point.

## User Controls That Affect The Engine

Analysis profile:

- `Song translator`: the only exposed audio mode. It translates full-song
  frequency evidence into a playable Sky piano reduction.

Feel density:

- `Sparse`: fewer rhythm pulses, fewer harmony notes, lower simultaneous-note
  count, and fewer total combined events.
- `Balanced`: default compromise.
- `Full`: more rhythm injection, more harmony notes, higher event cap, and more
  simultaneous keys.

Timing enhancer:

- `Off`: keeps the raw generated event timing.
- `Gentle`: snaps less aggressively and leaves more of the raw timing intact.
- `Three phase`: default cleanup pass for readable Sky sheet flow.

Chord window:

- Controls the time span of each harmonic-analysis window.
- Larger windows are steadier but miss quick chord changes.
- Smaller windows react faster but can hallucinate chords in noisy sections.

Minimum chord duration:

- After chord windows are detected, short non-rest chord segments are absorbed
  into neighboring segments.
- This prevents one-frame chord flicker from becoming unreadable sheet output.

Chord sensitivity:

- Passed into `detectChord`.
- Higher sensitivity makes the engine output `N.C.` more often.
- Lower sensitivity accepts weaker template matches.

Melody sensitivity:

- Passed into the YIN-style pitch tracker.
- Lower values demand cleaner periodic pitch.
- Higher values accept weaker pitch candidates and can catch more melody, but
  also more false notes.

BPM:

- The engine estimates BPM from the audio.
- The user can copy that estimate into the sheet timing with "Use BPM".
- Imported melody and combined events use BPM to convert seconds into beat
  durations.

Key:

- The selected Sky key controls mapping from detected MIDI pitch to one of the
  15 Sky buttons.
- "Use detected key" selects the major-key estimate from the audio chroma.
- "Auto tune" selects the Sky key with the lowest average melody snapping error.

## Phase 0: Decode And Reset

Entry point: `analyzeAudioFile`.

The engine starts from the selected file in `els.audioFileInput`.

Before analysis begins, it disables buttons that depend on fresh audio state:

- analyze button;
- auto tune;
- refine with MiMo;
- import combined;
- import melody;
- import chords.

It then sets the status to `Decoding audio`.

Decode is performed by the Web Audio API:

```js
const ctx = getAudioContext();
const buffer = await ctx.decodeAudioData(await file.arrayBuffer());
```

This is the only true audio decode stage. If the browser cannot decode the file
format, the pipeline fails here and the catch block displays `Audio analysis
failed: ...`.

Practical result:

- MP3 support depends on the browser's built-in decoder.
- The app does not ship a custom MP3 decoder.
- Local analysis works without MiMo because the full audio path is browser-side.

## Phase 1: Channel And Sample Preparation

After decode, the engine prepares three signal paths:

1. general harmonic path;
2. melody path;
3. rhythm path.

The original `AudioBuffer` may have one or more channels. `downmixAudioBuffer`
averages all channels into one `Float32Array`.

```text
mono[index] = sum(channel[index]) / numberOfChannels
```

Why mono:

- Chord and melody extraction do not need stereo imaging.
- Mono avoids one channel dominating the analysis.
- Stereo phase quirks are simplified before Goertzel/chroma and YIN analysis.

The general path is resampled to:

```text
targetRate = min(11025, originalSampleRate)
```

That path is used for:

- chord analysis;
- tempo estimation;
- piano salience fallback.

The melody path is resampled to:

```text
MELODY_TARGET_RATE = 8000
```

Then it is pre-emphasized.

The rhythm path is resampled to:

```text
min(RHYTHM_TARGET_RATE, originalSampleRate)
RHYTHM_TARGET_RATE = 11025
```

Then it is also pre-emphasized.

`resampleLinear` uses linear interpolation:

```text
sourceIndex = outputIndex * sourceRate / targetRate
sample = left * (1 - fraction) + right * fraction
```

This is simple, fast, and good enough for the app's intentionally low analysis
rates. It is not a hi-fi resampler.

`preEmphasize` applies a first-difference style filter:

```text
output[index] = current - previous * 0.97
```

Why pre-emphasis helps:

- it reduces low-frequency mud;
- it makes attacks clearer for rhythm detection;
- it makes pitch transitions more visible to the melody tracker;
- it helps with voice/tune extraction in busy mixes.

## Phase 2: Song Translator Profile

Function: `analysisProfileSettings`.

The single profile tunes batch sizes, hop sizes, chord probes, and piano frame
sizes.

`Song translator`:

```text
melodyHopLength: 256
melodyBatchSize: 14
chordProbeRatios: [0.18, 0.34, 0.5, 0.66, 0.82]
chordBatchSize: 3
rhythmHopLength: 192
rhythmBatchSize: 48
pianoFrameLength: 4096
pianoHopLength: 640
pianoBatchSize: 4
translatorMaxFrameNotes: 6
translatorLeadSensitivity: 0.19
translatorChordSensitivity: 0.48
selfCorrectPasses: 2
```

The profile keeps the translator path deterministic. It changes no user-facing
mode names and remains the only audio decoding template.

The translator settings mean:

- more browser work;
- more frame-level detail;
- slower completion;
- less chance that dense piano covers return blank foreground tracks.

## Phase 3: Cooperative Browser Scheduling

Long tracks can take time. The engine avoids freezing the UI by processing
large frame loops in batches and yielding with `window.requestAnimationFrame`.

This pattern appears in:

- `buildChordFrames`;
- `buildMelodyNotes`;
- `buildOnsetEnvelope`;
- `buildPianoCoverTracks`.

Each batch updates the status text with a percentage:

- analyzing chords;
- tracking melody;
- extracting rhythm;
- separating piano foreground.

This is why analysis can run for 4-5 minute songs without a long synchronous
main-thread lock. It still uses the main thread, but it cooperates with the
browser between batches.

## Phase 4: Tempo Estimation

Function: `estimateTempo`.

Tempo is estimated from the general analysis samples, not from decoded stereo.

Steps:

1. Slice the mono signal into 1024-sample frames with a 512-sample hop.
2. Compute RMS energy for each frame.
3. Keep positive increases over a smoothed previous-energy value.
4. Subtract a mean-based floor from the onset-like envelope.
5. Score candidate BPM values from 56 to 188 using autocorrelation.
6. Include the second lag with lower weight to catch regular pulse structure.
7. Fold extreme estimates:
   - BPM below 72 is doubled;
   - BPM above 168 is halved.

The returned object:

```js
{
  bpm: Math.round(bpm),
  confidence: normalizedScore
}
```

Tempo is used by:

- rhythm hit labeling;
- minimum rhythm-hit spacing;
- background note spacing;
- melody import duration quantization;
- combined arrangement pulse spacing;
- three-phase timing enhancer;
- playback if the user applies the estimate.

Tempo confidence is currently displayed only as part of the stored object. The
UI mainly uses the BPM value.

## Phase 5: Chord Extraction

Main functions:

- `buildAnalysisKernel`;
- `goertzelPower`;
- `extractFrameChroma`;
- `extractWindowChroma`;
- `detectChord`;
- `smoothChordFrames`;
- `mergeFrames`;
- `enforceMinimumChordDuration`.

### Chord Kernel

The chord kernel builds one Goertzel bin for each MIDI note from:

```text
ANALYSIS_MIDI_START = 36
ANALYSIS_MIDI_END = 88
```

Each bin stores:

- MIDI note;
- pitch class;
- Goertzel coefficient;
- a mild high-note weight reduction.

The frame window is Hann-shaped.

The frame length is derived from the selected chord window:

```text
frameLength = min(4096, max(2048, floor(targetRate * min(0.5, windowSeconds))))
```

### Window Chroma

For each chord time window, `extractWindowChroma` probes one or more positions
inside the window.

Examples:

- Song translator probes at 18, 34, 50, 66, and 82 percent.

Each probe:

1. centers a Hann window;
2. computes Goertzel power for each note bin;
3. folds note powers into 12 pitch classes;
4. logs the power with `log1p`;
5. normalizes the chroma vector.

Multiple probes are averaged. This makes chord detection more stable across
arpeggios and piano-roll style covers where not every chord tone sounds at the
exact same instant.

### Chord Templates

`detectChord` compares the normalized chroma against every configured chord
template in every root position.

Scoring uses cosine similarity plus small local biases:

- root note gets a tiny boost;
- templates with more than three notes get a small complexity penalty;
- if the best score is below sensitivity threshold, output is `N.C.`;
- if the best and second-best scores are too close, output is `N.C.`.

Quiet windows with RMS below `0.004` are also `N.C.`.

### Smoothing And Merging

After raw frames:

1. `smoothChordFrames` removes isolated one-frame label changes when the left
   and right labels agree.
2. `mergeFrames` combines adjacent frames with the same label.
3. `enforceMinimumChordDuration` absorbs short non-rest chord segments into a
   longer neighbor for up to eight passes.

The output is a list of chord segments:

```js
{
  start,
  end,
  label,
  rootPc,
  template,
  suffix,
  intervals,
  score
}
```

These segments drive:

- chord output display;
- chord import;
- harmony accents in combined arrangement;
- MiMo refine context.

## Phase 6: YIN-Style Melody Extraction

Main functions:

- `detectPitchYin`;
- `smoothPitchFrames`;
- `pitchFramesToNotes`;
- `buildMelodyNotes`.

The melody path is intended for voice-like or lead-line-like pitch tracking.

It uses:

```text
MELODY_TARGET_RATE = 8000
MELODY_FRAME_LENGTH = 1024
MELODY_MIN_FREQ = 82
MELODY_MAX_FREQ = 1175
MELODY_MIN_SECONDS = 0.12
MELODY_JOIN_GAP_SECONDS = 0.13
```

Song translator controls the hop length:

- melody hop length: 256 samples.

### Pitch Detection

For each frame:

1. Reject low-energy frames with RMS below `0.006`.
2. Compute the YIN difference function over allowed lags.
3. Compute cumulative mean normalized difference.
4. Select the first local dip under the melody sensitivity threshold.
5. Fall back to the best dip if it is within `threshold * 1.35`.
6. Refine the lag with parabolic interpolation.
7. Convert frequency to MIDI.
8. Reject MIDI outside 36 to 96.

The returned frame contains:

- MIDI pitch;
- frequency;
- confidence;
- RMS.

### Frame Smoothing

`smoothPitchFrames` replaces each detected frame MIDI value with the median MIDI
of nearby detected frames in a five-frame window.

This reduces warble and short pitch jumps.

### Frame-To-Note Conversion

`pitchFramesToNotes` converts smoothed pitch frames into Sky-mapped notes.

For each frame:

1. Map raw MIDI to nearest Sky button in the current key.
2. Continue the current note if the Sky button is the same and the gap is under
   `MELODY_JOIN_GAP_SECONDS`.
3. Otherwise flush the current note and start a new one.
4. Discard notes shorter than `MELODY_MIN_SECONDS`.
5. Merge adjacent notes with the same button if they are close.

The output note structure:

```js
{
  start,
  end,
  buttonId,
  rawMidi,
  midi,
  confidence
}
```

The melody result is useful for:

- simple tunes;
- vocal lead extraction;
- word/lyrics alignment;
- auto-tune key selection;
- combined arrangement anchors.

## Phase 7: Rhythm Extraction

Main functions:

- `buildOnsetEnvelope`;
- `smoothEnvelope`;
- `subtractLocalAverage`;
- `pickRhythmHits`;
- `buildRhythmTrack`.

The rhythm path uses pre-emphasized mono audio.

`buildOnsetEnvelope` frames the audio and computes a flux-like value from:

- RMS increase;
- high-frequency energy increase;
- absolute-amplitude increase;
- zero-crossing-rate increase.

The envelope is then:

1. smoothed with neighbor weighting;
2. cleaned by subtracting local average;
3. thresholded using median, mean, and standard deviation;
4. peak-picked;
5. thinned according to feel density and estimated BPM.

Feel density affects rhythm hit selection:

```text
Sparse rhythmThreshold: 0.72, minRhythmGapBeats: 0.62
Balanced rhythmThreshold: 0.52, minRhythmGapBeats: 0.38
Full rhythmThreshold: 0.34, minRhythmGapBeats: 0.24
```

Each hit contains:

```js
{
  time,
  strength,
  score,
  beatIndex,
  beatLabel
}
```

Rhythm hits do not directly become the final sheet by themselves. They influence
combined arrangement by triggering chord accent pulses near melody or between
melody notes.

## Phase 8: Song-Frequency Cache And Salience Translation

Main functions:

- `buildPianoSalienceKernel`;
- `extractPianoSalienceFrame`;
- `smoothSalienceFrames`;
- `buildSongFrequencyCache`;
- `pickSongFrameCandidates`;
- `buildTranslatorMelodyNotes`;
- `buildTranslatorChordFrames`;
- `buildTranslatorRhythmHits`;
- `buildTranslatorBackgroundNotes`;
- `buildNeuralActivationFrames`;
- `pickNeuralFrameCandidates`;
- `neuralCandidateFramesToNotes`;
- `annotateNeuralNoteRoles`;
- `buildNeuralChordFrames`;
- `fuseAudioChordSegments`;
- `pickForegroundCandidate`;
- `pickBackgroundCandidates`;
- `contourFramesToNotes`;
- `markRecurringThemes`;
- `buildBackgroundTrackFromFrames`;
- `buildPianoCoverTracks`.

This path exists because the goal is playable piano translation, not exact
source separation. YIN can catch voice-like lead lines, and chord chroma can
catch global harmony, but a song arrangement needs one consistent source of
frequency evidence for lead, bass, harmony, and rhythm.

The cache creates a harmonic salience map over a restricted piano range and
extracts likely song lead, accompaniment, bass, and harmony candidates.

### Salience Kernel

The kernel tracks MIDI notes from:

```text
PIANO_MIDI_START = 40
PIANO_MIDI_END = 88
```

For every MIDI bin it stores:

- fundamental Goertzel coefficient;
- second-harmonic coefficient if below Nyquist;
- third-harmonic coefficient if below Nyquist;
- melody bias for higher notes;
- bass bias for lower notes.

### Salience Frame

`extractPianoSalienceFrame` computes:

- fundamental power;
- second harmonic power weighted by `0.38`;
- third harmonic power weighted by `0.18`;
- log-scaled combined score;
- normalized per-bin scores;
- RMS.

This catches piano notes even when the fundamental is not the only strong
component.

### Shared Frequency Cache

`buildSongFrequencyCache` consumes smoothed salience frames once and stores:

- normalized chroma per frame;
- onset strength from RMS rise and spectral flux;
- lead candidates;
- bass candidates;
- harmony candidates;
- global chroma;
- cache hop size and frame count.

This is the main rebuild. Chords, melody, rhythm, accompaniment, input/output
comparison, and self-correction now read from this shared table instead of
building unrelated guesses.

`pickSongFrameCandidates` chooses several local pitch peaks per frame. It
suppresses lower-octave and fifth harmonic shadows so the arrangement does not
turn every overtone into a Sky key. It stores separate lead, bass, and harmony
scores for each candidate.

`buildTranslatorMelodyNotes` follows the strongest lead candidates with a
continuity bonus and turns them into Sky-mappable note objects.

`buildTranslatorChordFrames` aggregates cached chroma over chord windows and
cross-checks it against pitch-vote chords from the same cached frames.

`buildTranslatorRhythmHits` reads the cached onset curve with the same adaptive
peak picker used by the rhythm path.

`buildTranslatorBackgroundNotes` creates playable accompaniment pulses from
cached bass candidates or the current chord root. This is not source
separation; it is arranging the song's harmonic support for Sky piano.

### Legacy Foreground Picking

`pickForegroundCandidate` searches for a likely top-line candidate.

It rejects frames if:

- frame RMS is below `0.002`;
- max salience score is below `0.02`;
- MIDI is below 48.

It scores remaining candidates with:

- raw salience;
- melody/high-note bias;
- continuity from previous foreground MIDI;
- small octave-jump penalty.

The result is a contour-like top line.

### Legacy Background Picking

`pickBackgroundCandidates` finds non-foreground accompaniment candidates.

It avoids notes within two semitones of the foreground MIDI and prefers:

- strong salience;
- lower/bass support notes;
- candidates not too close to already picked background candidates.

`buildBackgroundTrackFromFrames` turns those candidates into pulse notes spaced
by the estimated beat.

### Recurring Theme Marking

`markRecurringThemes` scans foreground notes for repeated three-button patterns.

When a pattern repeats, the notes receive `themeStrength`.

This is not a true motif model. It is a lightweight way to keep repeated hooks
visible in the output and give them a chance to survive source merging.

### Optional Neural-Lattice Note Activation

The neural-lattice layer is a local approximation of onset/frame AMT behavior.
It does not load a trained checkpoint, but it uses the same practical shape of
evidence: frame-level pitch presence, onset strength, and offset/gap grouping.

`buildNeuralActivationFrames` starts from smoothed piano salience frames and
builds per-MIDI activations. Each bin combines:

- current salience;
- neighboring-frame sustain;
- positive onset delta;
- local pitch-peak evidence;
- harmonic-shadow suppression from lower octave/fifth bins;
- a small register bias so likely foreground notes survive.

`pickNeuralFrameCandidates` then chooses several simultaneous pitch candidates
per frame. This is the main change for complex covers: instead of forcing one
foreground pitch, the engine keeps a small polyphonic set.

`neuralCandidateFramesToNotes` groups those frame candidates into note events
with short gap bridging, minimum duration checks, confidence averaging, and
onset-strength storage.

`annotateNeuralNoteRoles` groups near-simultaneous notes and labels them as:

- `foreground` for the highest likely lead note;
- `background` for bass/lower support;
- `harmony` for middle chord tones.

`buildNeuralChordFrames` reads the resulting MIDI notes inside each chord
window and calls the same pitch-set chord detector used by score import.

`fuseAudioChordSegments` compares chroma chords against translator cache
chords. This prevents blank chord output without exposing separate engine
templates.

## Phase 9: Melody Source Fusion

Function: `mergeMelodySources`.

The engine compares:

- YIN melody notes;
- song-translator lead notes;
- piano foreground notes;
- recovery foreground notes.

It calculates coverage for each source:

```text
coverage = totalNoteDuration / audioDuration
```

Rules:

- If song-translator lead is strong, use it as the main lead source.
- If YIN is stronger on a simple vocal/tune line, keep it.
- If both are sparse, use legacy piano foreground.
- Otherwise start with the best-covered source and add non-overlapping notes
  from the other sources.
- Theme-marked piano notes with confidence above `0.38` can be added even when
  some overlap exists.
- recovery foreground notes remain internal evidence and are not exposed as a
  separate engine profile.

Then the engine:

- merges near-duplicate notes;
- marks recurring themes again;
- stores the fused output as `state.chordAnalysis.melodyNotes`.

This is the main robustness layer for complex covers. It gives simple songs the
clean YIN path while allowing full songs to become playable piano-style lead
lines from the cached song-frequency table.

## Phase 10: Key Estimation And Auto Tune

Main functions:

- `melodyChromaFromNotes`;
- `addChroma`;
- `estimateMajorKey`;
- `scoreSkyKeyForMelody`;
- `estimateBestSkyKeyForMelody`;
- `autoTuneMelody`.

After chord and melody analysis, the engine builds:

```text
combinedChroma = chordGlobalChroma + melodyChroma * 1.4
```

The melody is weighted because the final Sky sheet cares heavily about playable
lead-line feel.

`estimateMajorKey` compares combined chroma against a major-key profile in all
12 roots. It returns the best Sky major key.

`autoTuneMelody` works differently. It tests every Sky key and measures how far
each detected melody pitch must snap to a 15-button Sky note.

The weighted error uses:

- note duration;
- note confidence;
- semitone distance from raw MIDI to chosen Sky button.

The best key is the key with the lowest average snapping error.

When auto tune succeeds:

- `state.keyId` changes;
- `state.chordAnalysis.tuning` stores the result;
- detected BPM is copied into `state.bpm` if available;
- combined analysis is rebuilt for the new key.

## Phase 11: Combined Arrangement

Main functions:

- `buildCombinedArrangement`;
- `addCombinedAnchor`;
- `collapseCombinedAnchors`;
- `thinCombinedAnchors`;
- `rebuildCombinedAnalysis`.

The combined arrangement is the app's main "make it sound like the song" pass.
It is not a direct transcription. It builds playable Sky events from multiple
streams.

Inputs:

- fused melody notes;
- chord segments;
- rhythm hits;
- tempo estimate;
- feel density;
- playability target;
- background notes.

### Melody Anchors

Every mapped melody note becomes a candidate anchor.

If a rhythm hit is close to the melody start and strong enough, the anchor can
receive harmony notes from the current chord segment.

The harmony selection uses:

- chord intervals;
- current Sky key;
- nearest playable pitch class;
- center-of-grid preference;
- density limits.

### Background Anchors

Background notes from salience analysis can become anchors with chord accents.

This is how piano-cover accompaniment can survive in the final arrangement
without overwhelming every lead note.

### Rhythm Anchors

Rhythm hits can create chord-pulse anchors.

These use the current chord segment at the hit time and pick one or more chord
accent buttons depending on density.

If rhythm is sparse, the engine also creates fallback chord pulses inside long
chord segments.

### Human Playability Reduction

Before final collapse, `compressAnchorsForPlayability` reduces candidate
anchors according to the selected target:

```text
Simple 1-key: melody-first, no harmony stacking
Human 2-key: melody plus one nearby support key
Balanced 3-key: moderate chord/rhythm support
Rich 4-key: fuller Sky chord gestures
```

This pass trims simultaneous notes, spaces repeated rhythm/background pulses,
keeps stronger melody/theme anchors, and drops weak support hits that land too
close to recent notes. It is a piano-reduction step: the goal is recognizable
melody, chord identity, and groove with fewer Sky button presses.

### Collapse And Thinning

`collapseCombinedAnchors` merges anchors that are very close in time.

It limits simultaneous keys according to both density and playability:

```text
Sparse maxSimultaneous: 2
Balanced maxSimultaneous: 3
Full maxSimultaneous: 4
Simple playability cap: 1
Human playability cap: 2
Balanced playability cap: 3
Rich playability cap: 4
```

`thinCombinedAnchors` respects event caps:

```text
Sparse maxCombinedEvents: 1000
Balanced maxCombinedEvents: 1700
Full maxCombinedEvents: 2600
```

The thinning logic favors melody anchors first, then the strongest rhythm and
background anchors. If a long song still has more melody anchors than the
selected cap, it samples the melody timeline evenly so import does not create an
unbounded sheet.

### Raw Event Construction

Raw anchors become note/rest/bar events.

The engine:

- inserts rests for large gaps;
- estimates note durations from gap-to-next-anchor;
- quantizes beat durations;
- inserts four-beat bars;
- labels event kind, source, strength, and timing metadata.

Then `rebuildCombinedAnalysis` passes those events through the timing enhancer.

## Phase 11A: Input/Output Self-Correction

Main functions:

- `buildInputFeatureSignature`;
- `buildSkyOutputFeatureSignature`;
- `compareAudioToSkyOutput`;
- `deriveRhythmHitsFromNotes`;
- `mergeMelodyWithNeuralForeground`;
- `mergeBackgroundSources`;
- `applyAudioSelfCorrection`.

The self-correction pass checks whether the generated Sky sheet is too far from
the input summary.

The input signature contains:

- normalized 12-bin chord chroma;
- cached song-lead and accompaniment chroma;
- rhythm/onset envelope bins;
- cached onset bins;
- expected note-onset count.

The output signature contains:

- Sky-button chroma reconstructed from the generated note events;
- generated event timing bins;
- generated note-event count.

`compareAudioToSkyOutput` combines three scores:

```text
score = chromaSimilarity * 0.44
      + timingSimilarity * 0.34
      + noteCoverage * 0.22
```

If the score or note coverage is weak, `applyAudioSelfCorrection` adds
high-confidence missing song-lead notes, accompaniment support, and
onset-derived rhythm hits. It then rebuilds the combined arrangement and
compares again. `Song translator` can do this twice.

The UI shows:

- `Input/output match`: final comparison score;
- `Self corrections`: recovered item count and pass count.

This loop is intentionally similarity-focused. It does not claim the final
Sky sheet is literal MIDI transcription; it tries to avoid blank/sparse output
and preserve the input's broad pitch and timing shape.

## Phase 12: Three-Phase Timing Enhancer

Main functions:

- `flowEnhancerSettings`;
- `anchorsFromSheetEvents`;
- `chooseFlowGridStep`;
- `snapFlowAnchors`;
- `mergeCoincidentFlowAnchors`;
- `gateForGap`;
- `buildFlowEventsFromAnchors`;
- `enhanceSheetFlow`.

The enhancer's job is to make generated sheet events playable and readable.
Without it, detected audio events can have awkward micro-gaps, uneven fast-note
spacing, and abrupt note endings.

### Phase 1: Beat-Grid Selection And Snap

The enhancer converts note event times into beat-space anchors.

It chooses a grid step from median event spacing:

```text
median <= 0.34 beats -> 0.125 beat grid
median <= 0.72 beats -> 0.25 beat grid
otherwise           -> 0.5 beat grid
```

Each anchor is moved toward the nearest grid point using snap strength:

```text
Gentle snapStrength: 0.62
Three phase snapStrength: 0.88
```

The result is still forced to obey a minimum gap between anchors.

### Phase 2: Coincident Merge And Duration Shaping

Anchors landing on the same snapped beat are merged into one chord event.

The event keeps:

- unique notes;
- source kind;
- strongest strength;
- longest natural duration;
- simultaneous-note limit.

Then the enhancer shapes durations:

- fast next gaps use shorter gate values;
- normal next gaps use medium gates;
- phrase-connected gaps use legato gate values;
- long gaps stop at a maximum hold length and leave rest space.

Current default three-phase values:

```text
minGapBeats: 0.125
minNoteBeats: 0.125
phraseGapBeats: 1
longHoldBeats: 0.875
legatoGate: 0.96
normalGate: 0.90
fastGate: 0.78
```

This is where fast notes are kept clean without turning every note into a
robotic full-length hold.

### Phase 3: Rest And Bar Rebuild

The enhancer rebuilds rests and bars in a bar-aware way.

`pushBarAwareRest` splits long rests across bar lines.

`pushBarAwareNote` inserts bars when the cursor crosses the next four-beat bar.

The output summary records:

- snapped event count;
- shaped duration count;
- inserted bar count;
- inserted rest count;
- selected grid step;
- enhancer label.

## Phase 13: Import Paths

The engine exposes several import modes because no single output is best for
every song.

### Import Chords

Function: `importPlayableChords`.

Chord segments are converted into sheet events.

If a chord cannot be represented in the selected Sky key, it becomes a rest.

This is useful for harmonic sketches, not for melody-heavy songs.

### Import Melody

Function: `importMelodyNotes`.

Fused melody notes are converted into single-note Sky events.

`estimateStopThreshold` decides when gaps are real rests instead of tiny
detection holes.

Durations are converted from seconds to beats with:

```text
quantizeBeatDuration(seconds, beatSeconds, step = 0.25)
```

Then the timing enhancer cleans the result.

This mode is best for simple tunes such as nursery melodies and clear vocal
hooks.

### Import Combined

Function: `importCombinedArrangement`.

This imports the already-built combined arrangement:

- melody;
- chord accents;
- rhythm pulses;
- background pulses;
- enhancer-shaped durations;
- bars/rests.

This mode is best when the user wants similarity of feel instead of a strict
single-note melody line.

### Import Wording Notes

Functions:

- `splitWordingTokens`;
- `buttonIdForWordingToken`;
- `alignWordingToNotes`;
- `importWordingNotes`.

If every wording token is a direct note reference, the engine converts the
tokens directly.

Supported direct forms include:

- `A1`, `B3`, `C5`;
- `1` through `15`;
- solfege like `do re mi`;
- note names like `C D E`.

If tokens are regular words, the engine aligns them across detected melody
notes. This is useful for lyric syllable placement, not speech recognition.

## Phase 14: Playback Synthesis

Main functions:

- `getAudioGraph`;
- `createSkyPianoSample`;
- `getSkyPianoSample`;
- `uniquePlaybackButtonIds`;
- `precachePlaybackSamples`;
- `playTone`;
- `playButton`;
- `playSheet`.

Playback is separate from audio analysis. It turns sheet events into generated
Web Audio notes.

The current preset is intentionally dry and piano-like:

- no bundled official game samples;
- no bell preset;
- no harp preset;
- no vibrato;
- no random pitch detune;
- no random reverb or delay;
- no hold-synth pad tail;
- no event-duration tail chopping.

### Shared Audio Graph

`getAudioGraph` creates a simple output chain:

```text
input gain
  -> lowpass body filter at 5200 Hz, Q 0.42
  -> dynamics compressor
  -> output gain 0.86
  -> browser audio destination
```

The compressor is mild:

```text
threshold: -15 dB
knee: 10
ratio: 1.8
attack: 0.006
release: 0.16
```

This keeps chords from clipping while avoiding a big artificial effect.

### Generated Sky Piano Sample

`createSkyPianoSample` creates a cached stereo buffer for each frequency.

Duration depends on pitch:

```text
> 1200 Hz: 1.90 seconds
>  700 Hz: 2.35 seconds
else     : 2.85 seconds
```

Envelope:

- attack: `0.0038` seconds;
- fade out: final `0.12` seconds;
- lower notes decay slower than high notes.

Partial structure:

```text
fundamental body: 0.66
fundamental tail: 0.16
octave:           0.082
third:            0.018
hammerTone:       0.016
```

The sample is normalized to a peak of `0.64` and copied identically to both
stereo channels. That keeps the tone centered and avoids phase weirdness in
chords.

### Event Playback

`playSheet` converts `state.events` into a pre-rendered audio buffer before
sound playback starts.

Before rendering starts, it calls `precachePlaybackSamples`:

1. Scan the sheet for unique note button ids.
2. Resolve each id to the selected Sky key frequency.
3. Warm the shared playback graph.
4. Generate any missing `AudioBuffer` samples in `skyPianoSampleCache`.
5. Yield to `requestAnimationFrame` every few notes so the browser can paint.
6. Continue only after the required note buffers are ready.

The playback cache key includes sample rate, selected Sky key, BPM, and the
sheet event signature. If those inputs have not changed, Play reuses the
already-rendered full-sheet buffer.

When a new render is needed, `renderSheetAudioBuffer` creates an
`OfflineAudioContext`, schedules every note into that offline context, and
stores the finished buffer in memory. Runtime playback then starts a single
`AudioBufferSourceNode`; it no longer depends on live per-note audio scheduling
for sound.

For each note during offline rendering:

1. Convert beat duration to seconds using current BPM.
2. Scale chord gain by note count:

```text
chordLevel = min(0.92, 1 / noteCount^0.45)
```

3. Place every chord button at the same offline cursor time.
4. Render the complete sample tail into the sheet buffer.
5. Advance the cursor by the full event duration.

The generated sample itself is allowed to ring out. Event duration controls
timeline spacing, not note cutoff. Rests render no new button, but previous
notes continue their natural decay. Consecutive notes overlap as one-shot Sky
piano strikes instead of cutting each other off.

Timeline highlighting and key flashes are still scheduled as lightweight visual
timers. If those timers drift under browser load, the already-rendered audio
continues without stutter or missing notes.

## Phase 15: Timed Sheet Export

The `Timed JSON` export format preserves performance timing:

- title and transcriber;
- selected Sky key id, label, and setup;
- BPM and seconds per beat;
- default manual duration;
- total beat and second length;
- every event's start beat, start second, duration, and end time;
- note button id, ABC label, Sky note name, and playback frequency.

This export is meant for round-tripping timing into external tools or debugging
why a sheet plays with certain gaps.

## Phase 16: MiMo Refinement

Main functions:

- `refineChordsWithMimo`;
- server route `api/mimo-refine.js`.

MiMo receives text, not audio.

The browser sends up to 500 lines from each context:

- chord lines;
- melody lines;
- rhythm lines;
- combined sheet lines.
- selected playability target and combined-sheet density.

The route builds a prompt asking MiMo to:

- keep output compact;
- merge repeated adjacent chord rows;
- use melody/rhythm/combined context only to avoid obvious harmonic mistakes;
- treat the result as a playable Sky piano reduction;
- prefer melody plus one nearby support tone for human modes;
- preserve useful timestamps and Sky mappings;
- mark unplayable rows as rest or not playable;
- return minimal chord format.

Environment handling:

- `MIMO_API_KEY` or `XIAOMI_MIMO_API_KEY` is required.
- `.env` is loaded locally when not running on Vercel.
- Vercel production uses server-side environment variables.
- `MIMO_BASE_URL` defaults to the Anthropic-compatible dedicated URL.
- `MIMO_MESSAGES_URL` can override the exact endpoint.

The route sanitizes long key-like tokens in error messages before returning
them.

## Runtime State Written By Analysis

After successful analysis, `state.chordAnalysis` stores:

```js
{
  fileName,
  duration,
  keyGuess,
  segments,
  refinedText,
  melodyNotes,
  foregroundNotes,
  backgroundNotes,
  neuralNotes,
  rhythmHits,
  combinedEvents,
  tempoEstimate,
  tuning,
  analysisProfile,
  feelDensity,
  playability,
  enhancerMode,
  enhancementSummary,
  quality,
  correctionSummary,
  inputSignature,
  wordingAssignments
}
```

This object is the shared contract between:

- analysis rendering;
- import buttons;
- auto tune;
- BPM manager;
- MiMo refine;
- separated track display;
- combined arrangement display.
- input/output match display;
- self-correction count display.

On failure, the same object is reset to an empty safe shape so the UI does not
keep stale audio results.

## Failure Handling

The most common failure points are:

Decode failure:

- browser cannot decode the selected file;
- file is not a real MP3/audio file;
- file is corrupt;
- browser codec support is missing.

Blank melody:

- YIN path found no stable periodic lead pitch;
- song-frequency lead translation or legacy salience foreground may still
  produce notes;
- if all lead paths are blank, the mix is too dense, too percussive, or too
  noisy for the current local engine.

No chords:

- RMS is below the quiet threshold;
- sensitivity threshold is too high;
- best and second-best chord templates are too close;
- song has non-triadic or highly chromatic harmony not represented well by the
  template set.

Messy combined sheet:

- wrong BPM estimate;
- too-dense feel setting;
- wrong Sky key;
- chord window too short for arpeggios;
- melody sensitivity too permissive;
- timing enhancer disabled.

MiMo 404:

- usually means `MIMO_BASE_URL` points to an OpenAI-compatible endpoint while
  the route is using Anthropic `/v1/messages`;
- set the dedicated Anthropic base URL or exact `MIMO_MESSAGES_URL`.

## Performance Notes For Long Songs

The engine supports 4-5 minute songs by lowering analysis rates and processing
frames in batches.

Important choices:

- general analysis capped at 11025 Hz;
- melody analysis at 8000 Hz;
- Hann windows and Goertzel bins instead of a full FFT library;
- requestAnimationFrame yielding between batches;
- density-specific combined event caps;
- MiMo prompt lines capped to avoid huge server requests.

The Song translator profile is intentionally thorough because:

- melody hop is smaller;
- rhythm hop is smaller;
- chord windows have more probe positions;
- piano salience hop is smaller;
- the shared cache keeps lead, bass, harmony, chroma, and onset candidates;
- self-correction can rebuild the combined arrangement twice;
- batch sizes are smaller, giving the browser more chances to breathe.

## Tuning Guide

For simple melody songs:

- use `Song translator`;
- use `Import melody`;
- lower feel density if combined output is too busy;
- use auto tune after analysis.

For dense piano covers:

- use `Song translator`;
- use `Full` or `Balanced` feel density;
- inspect foreground/background tracks;
- import combined;
- try a longer chord window if chords flicker;
- use auto tune before importing.

For fast songs:

- apply detected BPM;
- keep the three-phase enhancer on;
- use `Full` only if the output remains readable;
- if notes smear, reduce feel density.

For songs with many drums:

- rhythm extraction may over-fire;
- sparse feel density can help;
- melody import may be cleaner than combined import.

For songs that sound close but not Sky-like:

- ensure playback is using the generated dry piano preset;
- avoid importing overly dense combined sheets;
- use the selected Sky key that minimizes melody snapping error;
- keep simultaneous-note count under control.

## Implementation Limits

The current engine is a local DSP song-to-piano translator with a cached
frequency-analysis core. It does not bundle a trained neural transcription
checkpoint.

Known limits:

- no true vocal/instrument source separation;
- no trained deep-learning onset/offset detector;
- no official Sky sample playback;
- no beat-grid phase tracker beyond autocorrelation and event snapping;
- no minor-key-specific Sky layout model;
- no full polyphonic score transcription;
- no guarantee that chromatic notes outside the selected Sky key survive;
- no server-side audio analysis for very large files.

These limits are acceptable for the app's current purpose: a local, Vercel-ready
Sky sheet maker that turns audio into a playable approximation and gives the
user separate melody, chord, rhythm, background, and combined outputs.

## Future Engine Improvements

Possible next upgrades:

- add a Web Worker for analysis loops so UI remains smoother during translation;
- use an FFT library for faster multi-bin spectral analysis;
- add optional WASM resampling;
- add optional neural source separation on a backend;
- add onset/offset-specific melody confidence;
- add minor-mode key estimation;
- add per-section BPM correction;
- add phrase-aware repetition compression;
- add a user-editable confidence filter before import;
- add offline reference-sample matching if legally usable Sky piano samples are
  provided by the user.

## Function Map

Decode and preprocessing:

- `analyzeAudioFile`;
- `downmixAudioBuffer`;
- `resampleLinear`;
- `preEmphasize`.

Statistics:

- `median`;
- `mean`;
- `standardDeviation`.

Profiles:

- `analysisProfileSettings`;
- `feelDensitySettings`;
- `flowEnhancerSettings`.

Tempo and rhythm:

- `estimateTempo`;
- `createHannWindow`;
- `buildOnsetEnvelope`;
- `smoothEnvelope`;
- `subtractLocalAverage`;
- `pickRhythmHits`;
- `buildRhythmTrack`.

Chord analysis:

- `buildAnalysisKernel`;
- `frameRms`;
- `goertzelPower`;
- `extractFrameChroma`;
- `extractWindowChroma`;
- `chordTemplateVector`;
- `detectChord`;
- `smoothChordFrames`;
- `mergeFrames`;
- `enforceMinimumChordDuration`;
- `buildChordFrames`.

Melody analysis:

- `detectPitchYin`;
- `smoothPitchFrames`;
- `melodyChromaFromNotes`;
- `pitchFramesToNotes`;
- `buildMelodyNotes`.

Piano cover fallback:

- `buildPianoSalienceKernel`;
- `extractPianoSalienceFrame`;
- `smoothSalienceFrames`;
- `pickForegroundCandidate`;
- `pickBackgroundCandidates`;
- `contourFramesToNotes`;
- `markRecurringThemes`;
- `mergeNearDuplicateNotes`;
- `melodyCoverage`;
- `mergeMelodySources`;
- `buildBackgroundTrackFromFrames`;
- `buildPianoCoverTracks`.

Sky mapping and tuning:

- `skyMidiForButton`;
- `chooseSkyButtonForMidi`;
- `melodyMapping`;
- `estimateMajorKey`;
- `scoreSkyKeyForMelody`;
- `estimateBestSkyKeyForMelody`;
- `useDetectedKey`;
- `useEstimatedBpm`;
- `autoTuneMelody`.

Combined arrangement:

- `findChordSegmentAtTime`;
- `chordAccentButtons`;
- `nearestRhythmHit`;
- `addCombinedAnchor`;
- `collapseCombinedAnchors`;
- `thinCombinedAnchors`;
- `buildCombinedArrangement`;
- `rebuildCombinedAnalysis`.

Timing enhancer:

- `eventDurationBeats`;
- `chooseFlowGridStep`;
- `cloneSheetEvent`;
- `anchorsFromSheetEvents`;
- `mergeCoincidentFlowAnchors`;
- `snapFlowAnchors`;
- `gateForGap`;
- `pushBarAwareRest`;
- `pushBarAwareNote`;
- `buildFlowEventsFromAnchors`;
- `enhanceSheetFlow`;
- `quantizeBeatDuration`;
- `quantizeBeats`;
- `estimateStopThreshold`.

Wording and import:

- `splitWordIntoSyllables`;
- `splitWordingTokens`;
- `buttonIdForWordingToken`;
- `alignWordingToNotes`;
- `melodyNotesToEvents`;
- `importWordingNotes`;
- `importPlayableChords`;
- `importMelodyNotes`;
- `importCombinedArrangement`.

Playback:

- `getAudioContext`;
- `getAudioGraph`;
- `frequencyForButton`;
- `createSkyPianoSample`;
- `getSkyPianoSample`;
- `playTone`;
- `playButton`;
- `playSheet`;
- `stopPlayback`.

MiMo refinement:

- `refineChordsWithMimo`;
- `api/mimo-refine.js` route handler;
- `loadLocalEnvFile`;
- `buildEndpointCandidates`;
- `callMimoEndpoint`;
- `extractText`;
- `sanitizeErrorText`.
