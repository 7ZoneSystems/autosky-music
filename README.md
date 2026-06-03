# Sky Piano Sheet Maker

A Vercel-ready browser tool for composing Sky: Children of the Light piano sheets on the 15-button in-game instrument grid.

## Run Locally

1. Copy `.env.example` to `.env`.
2. Set `MIMO_API_KEY` in `.env`.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local Vercel URL.

Static composing and local MP3 analysis work without MiMo. The "Refine with MiMo" button requires the serverless API route and `MIMO_API_KEY`.

The build creates a generated `public/` directory for Vercel from the root static files. `public/` is ignored by Git.

For local testing, `/api/mimo-refine` also loads `.env` directly when it is not running in Vercel production. Existing shell environment variables take priority over `.env` values.

## Vercel Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

- `MIMO_API_KEY`: required. Your Xiaomi MiMo API key.
- `MIMO_BASE_URL`: optional. Defaults to `https://token-plan-sgp.xiaomimimo.com/anthropic`.
- `MIMO_MESSAGES_URL`: optional exact endpoint override. Use this if a custom gateway does not follow the normal `/v1/messages` path.
- `MIMO_MODEL`: optional. Defaults to `mimo-v2.5`.

## What It Uses

- Sky non-percussion instruments use a 3x5 grid of 15 buttons.
- The grid spans two octaves of a major scale.
- The active key is controlled by a selected music sheet or the current background music key.
- This app stores the 12 Sky major-key layouts: C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, and B.
- `Cb` is treated as the practical enharmonic alias of B major, while the F#/Gb layout includes the `Cb` scale degree used in Sky's flat-key table.
- The app exports common Sky sheet notation: `A1` through `C5`, 1-15 button numbers, note names, and JSON.
- MP3 import uses the browser's Web Audio API to decode the full file, then runs local staged analyzers for 4-5 minute songs:
  - chord extraction with contextual 12-bin chroma, chord-template matching, smoothing, and segment merging;
  - melody extraction with a YIN-style dominant pitch tracker for voice or tune lines;
  - polyphonic piano fallback extraction with harmonic salience frames, foreground contour tracking, recurring-theme marking, and background pulse separation;
  - rhythm extraction with an onset-strength envelope, adaptive peak picking, and tempo-aware hit thinning;
  - a combined Sky arrangement pass that merges melody, chord accents, and rhythm pulses into one playable 15-button sheet.
- Detected chords can be imported into the Sky sheet when all chord tones exist in the currently selected Sky key. Unplayable chromatic chords become rests on import.
- Detected melody notes are snapped to the selected Sky 15-button grid and can be imported as a playable single-note sheet. This is the better mode for simple melodies such as "Twinkle Twinkle Little Star".
- Rhythm hits are shown as a separate output so you can inspect pulse/beat structure before importing anything.
- "Import combined" uses the melody/rhythm/chord merger. It is intentionally optimized for similar sound and feel on Sky's small grid, not literal transcription accuracy.
- Complex piano covers no longer depend only on the dominant-pitch tracker. If voice-style melody tracking is sparse, the app falls back to salience-based foreground piano contours and background accompaniment pulses.
- Foreground/theme and background pulse tracks are shown separately before the final combined sheet, so dense piano covers can be inspected without losing the arrangement context.
- Playback uses generated Sky-like bright piano samples with a shared room/reverb bus and chord gain scaling. It does not bundle extracted official game samples.
- Engine profile controls:
  - `Balanced`: faster analysis for short/medium songs.
  - `Long song`: default profile for 4-5 minute MP3s.
  - `Beast`: denser melody/rhythm frames and more chord probes; slower but better for complex mixes.
- Feel density controls how much harmony/rhythm is injected into the combined sheet: sparse, balanced, or full.
- The timing enhancer is a three-phase sheet cleanup pass:
  - snaps detected onsets to a beat grid selected from the detected note density;
  - reshapes note values, gates, and rests so fast notes finish cleanly before the next button while connected phrases stay legato;
  - rebuilds bars and splits long rests around bar lines for a more readable flow.
- The BPM manager estimates tempo from the audio onset envelope. "Use BPM" copies that estimate into the sheet playback/import timing.
- Melody import uses a stop/rest estimator based on gaps between detected notes and quantizes durations to the selected BPM.
- "Auto tune" chooses the Sky key with the lowest melody pitch-snapping error, sets that key, and applies the estimated BPM when available.
- The wording converter aligns typed lyrics/wordings to detected melody notes. It also accepts direct note words such as `do re mi`, `C D E`, `A1 A2 A3`, or `1 2 3`.
- The browser engine does not perform full studio-grade neural source separation. Busy mixes with drums, stacked vocals, or dense harmony still need manual cleanup or a server-side ML model.

## MiMo API Note

The audio engine runs locally. Xiaomi MiMo is called only by `/api/mimo-refine`, which reads `MIMO_API_KEY` from server-side environment variables. The key is never shipped to the browser. The current default endpoint is `https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages`. Use the dedicated Anthropic-compatible base URL, not the OpenAI-compatible `https://token-plan-sgp.xiaomimimo.com/v1`, for this route. If `MIMO_BASE_URL` is set to a gateway that returns 404, the route retries likely Anthropic-compatible paths and includes `attemptedEndpoints` in the error response.

## Sources Checked

- Official Sky Help Center, Music Sheets: https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1345-how-do-i-use-music-sheets-in-sky/?l=en
- Sky Wiki, Instruments: https://sky-children-of-the-light.fandom.com/wiki/Instruments
- Sky Wiki, Music Key: https://sky-children-of-the-light.fandom.com/wiki/Music_Key
- Sky Music, make-your-own sheet notation: https://sky-music.github.io/make-your-own-sheet.html
- Sky Studio app format notes: https://play.google.com/store/apps/details?id=com.Maple.SkyStudio
- MDN, BaseAudioContext.decodeAudioData: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
- arXiv, Omnizart automatic music transcription toolbox: https://arxiv.org/abs/2106.00497
- arXiv, Feature Learning for Chord Recognition / Deep Chroma Extractor: https://arxiv.org/abs/1612.05065
- arXiv, JEPOO joint estimation of pitch, onset, and offset: https://arxiv.org/abs/2306.01304
- arXiv, Interactive singing melody extraction based on active adaptation: https://arxiv.org/abs/2402.07599
- arXiv, Harmonic-Percussive Source Separation with DNNs and phase recovery: https://arxiv.org/abs/1807.11298
- arXiv, high-resolution piano onset/offset transcription: https://arxiv.org/abs/2010.01815
- arXiv, affordable piano transcription with onset/velocity CNNs: https://arxiv.org/abs/2303.04485
- arXiv, melody extraction from polyphonic music review: https://arxiv.org/abs/2202.01078
- MDPI, chroma-level note tracking and pitch mapping for melody extraction: https://www.mdpi.com/2076-3417/8/9/1618
- arXiv, audio-to-score alignment with onset features: https://arxiv.org/abs/1711.04480
- NeurIPS, tempo tracking and rhythm quantization: https://proceedings.neurips.cc/paper_files/paper/2001/file/5ec829debe54b19a5f78d9a65b900a39-Paper.pdf
- Essentia PitchContourSegmentation, minimum note duration and quantized note events: https://essentia.upf.edu/reference/std_PitchContourSegmentation.html
- MIDI Association forum, legato/staccato note length and articulation: https://midi.org/community/midi-specifications/midi-note-length
- librosa beat tracking documentation, onset strength -> tempo -> beat picking: https://librosa.org/doc/latest/generated/librosa.beat.beat_track.html
- Grosche/Jiang/Mueller/Serra, chroma/template chord recognition overview: https://petergrosche.github.io/publication/jiang-2011-analyzing/
- Springer, reassigned spectrum-based automatic chord recognition: https://link.springer.com/article/10.1186/1687-4722-2013-15
- Xiaomi MiMo Anthropic compatibility docs: https://platform.xiaomimimo.com/docs/api/chat/anthropic-api
