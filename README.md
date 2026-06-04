# Sky Piano Sheet Maker

A Vercel-ready browser tool for composing Sky: Children of the Light piano sheets on the 15-button in-game instrument grid.

For the full implementation map, see `ARCHITECTURE.md`. For the behind-the-hood audio pipeline, see `AUDIO_ENGINE.md`.

## Run Locally

1. Copy `.env.example` to `.env` if you want MiMo chord-text refinement.
2. Set `MIMO_API_KEY` in `.env` only for MiMo refinement.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://127.0.0.1:5173`.

Static composing, local MP3 analysis, direct MusicXML/JSON/text score imports, and PNG/JPG/PDF score vision import work without MiMo. The "Refine with MiMo" button is the only normal user flow that needs `MIMO_API_KEY`.

For MXL score import locally, keep `npm run dev` running because MXL unzip uses `/api/sheet-omr`. PNG/JPG/PDF score import is read by the browser's local vision pipeline.

For Google login locally, the app reads `tenant_id` from `.cohesivity` or `COHESIVITY_TENANT_ID` from `.env`. Cohesivity login is already provisioned for localhost ports 5173-5175 with callback path `/api/auth/callback`.

The build creates a generated `public/` directory for Vercel from the root static files. `public/` is ignored by Git.

For local testing, the Node server serves the static app and API routes. `/api/mimo-refine` loads `.env` directly when it is not running in Vercel production. Existing shell environment variables take priority over `.env` values.

## Vercel Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

- `MIMO_API_KEY`: required only for optional MiMo refinement. Your Xiaomi MiMo API key.
- `MIMO_BASE_URL`: optional. Defaults to `https://token-plan-sgp.xiaomimimo.com/anthropic`.
- `MIMO_MESSAGES_URL`: optional exact endpoint override. Use this if a custom gateway does not follow the normal `/v1/messages` path.
- `MIMO_MODEL`: optional. Defaults to `mimo-v2.5`.
- `COHESIVITY_TENANT_ID`: required for Google login on Vercel. Current generated tenant: `calm-salmon-dealing`.
- `COHESIVITY_ORIGIN`: optional. Defaults to `https://cohesivity.ai`.

## What It Uses

- Sky non-percussion instruments use a 3x5 grid of 15 buttons.
- The grid spans two octaves of a major scale.
- The active key is controlled by a selected music sheet or the current background music key.
- This app stores the 12 Sky major-key layouts: C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, and B.
- The first screen is an animated dark piano-note landing page; `Try it out` opens the two-option Audio to Sky sheet or Piano sheet to Sky sheet chooser.
- The audio workflow is a guided wizard: attach audio, set melody/chord sensitivity, set feel/playability/auto BPM/auto key/timing, review the selected Sky key, then open a tabbed final page with SHEETS, Details, and Timing details.
- `Cb` is treated as the practical enharmonic alias of B major, while the F#/Gb layout includes the `Cb` scale degree used in Sky's flat-key table.
- The app exports common Sky sheet notation: `A1` through `C5`, 1-15 button numbers, note names, JSON, and timed JSON with BPM, beat timing, second timing, key, and per-note frequencies.
- Traditional score import accepts MusicXML/XML, JSON, text note names, MXL, images, and PDFs. MusicXML/JSON/text are parsed locally; MXL is unzipped by `/api/sheet-omr`; PNG/JPG/PDF pages are read by a local browser vision OMR pass.
- Visual score import now runs a complex-page classifier: it detects grand-staff systems, estimates notehead/stem/beam shape, groups simultaneous cross-staff onsets, counts dense piano chord stacks, classifies texture such as melody + accompaniment or piano chordal, and shows those stats in the score panel.
- Score import reads the full detected score, chooses the best Sky key unless told to keep the current key, estimates or uses BPM, separates melody/background, identifies chord names including common inversions, maps unavailable chromatic notes to nearest or color-pair Sky buttons, and splits dense piano chords into alternating playable gestures.
- MP3 import uses the browser's Web Audio API to decode the full file, then runs local staged analyzers for 4-5 minute songs:
  - a shared song-frequency cache that stores piano-range salience, chroma, onset strength, lead candidates, bass candidates, and harmony candidates once, then feeds the rest of the pipeline;
  - chord extraction with contextual 12-bin chroma, chord-template matching, smoothing, and segment merging;
  - melody extraction with a YIN-style dominant pitch tracker for voice or tune lines;
  - song-lead translation from cached frequency candidates, so the app arranges the whole song into playable piano instead of trying to isolate a piano stem;
  - harmonic salience fallback with recurring-theme marking and accompaniment pulse extraction;
  - rhythm extraction with an onset-strength envelope, adaptive peak picking, and tempo-aware hit thinning;
  - input/output self-checking that compares input chroma and timing bins against the generated Sky sheet, then recovers missing lead notes, accompaniment notes, and rhythm hits when the first pass is too sparse;
  - a combined Sky arrangement pass that merges melody, chord accents, and rhythm pulses into one playable 15-button sheet.
- Detected chords can be imported into the Sky sheet when all chord tones exist in the currently selected Sky key. Unplayable chromatic chords become rests on import.
- Detected melody notes are snapped to the selected Sky 15-button grid and can be imported as a playable single-note sheet. This is the better mode for simple melodies such as "Twinkle Twinkle Little Star".
- Rhythm hits are shown as a separate output so you can inspect pulse/beat structure before importing anything.
- "Import combined" uses the melody/rhythm/chord merger. It is intentionally optimized for similar sound and feel on Sky's small grid, not literal transcription accuracy.
- Complex piano covers no longer depend only on the dominant-pitch tracker. If voice-style melody tracking is sparse, the app falls back to salience-based foreground piano contours and background accompaniment pulses.
- Foreground/theme and background pulse tracks are shown separately before the final combined sheet, so dense piano covers can be inspected without losing the arrangement context.
- The audio panel reports an input/output match score and a self-correction count after MP3 analysis.
- Playback is locked to a dry generated Sky-piano-style preset: struck one-shot piano notes, exact pitch, natural decay tails through rests, pre-rendered full-sheet audio on Play, no vibrato, no random reverb/delay, no bell/harp/hold-synth preset, and chord gain scaling. It does not bundle extracted official game samples.
- The audio engine exposes one mode: `Song translator` for audio-to-playable-Sky-piano translation. It uses the shared frequency cache as the main evidence source.
- Feel density controls how much harmony/rhythm is injected into the combined sheet: sparse, balanced, or full.
- Playability controls how many Sky keys the combined translator may use at once: simple 1-key, human 2-key, balanced 3-key, or rich 4-key. Human 2-key is the default so song translation favors melody plus one nearby support tone instead of dense automatic clusters.
- The timing enhancer is a three-phase sheet cleanup pass:
  - snaps detected onsets to a beat grid selected from the detected note density;
  - reshapes note values, gates, and rests so fast notes finish cleanly before the next button while connected phrases stay legato;
  - rebuilds bars and splits long rests around bar lines for a more readable flow.
- The BPM manager estimates tempo from the audio onset envelope. "Use BPM" copies that estimate into the sheet playback/import timing.
- Melody import uses a stop/rest estimator based on gaps between detected notes and quantizes durations to the selected BPM.
- "Auto tune" chooses the Sky key with the lowest melody pitch-snapping error, sets that key, and applies the estimated BPM when available.
- The wording converter aligns typed lyrics/wordings to detected melody notes. It also accepts direct note words such as `do re mi`, `C D E`, `A1 A2 A3`, or `1 2 3`.
- The browser engine is now a local song-to-piano translator with a cached frequency-analysis core. It still does not bundle a trained source-separation or AMT checkpoint. Busy studio mixes with drums, stacked vocals, or dense harmony may still need manual cleanup or a server-side ML model.

## MiMo API Note

The audio engine and visual score reader run locally. Xiaomi MiMo is called by `/api/mimo-refine` only for optional chord text/playability cleanup. The route reads `MIMO_API_KEY` from server-side environment variables, so the key is never shipped to the browser. The refine route defaults to `https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages`.

## Cohesivity Login Note

Google login uses Cohesivity social-login. The browser starts at `/api/auth/login`, Cohesivity redirects back to `/api/auth/callback` with tokens, and the server stores those tokens as httpOnly SameSite=Lax cookies. `/api/auth/user` verifies or refreshes the session through Cohesivity, and `/api/auth/logout` clears the local cookies and revokes the refresh token.

## Sources Checked

- Cohesivity social-login offering docs: https://cohesivity.ai/offerings/social-login
- Official Sky Help Center, Music Sheets: https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1345-how-do-i-use-music-sheets-in-sky/?l=en
- Sky Wiki, Instruments: https://sky-children-of-the-light.fandom.com/wiki/Instruments
- Sky Wiki, Music Key: https://sky-children-of-the-light.fandom.com/wiki/Music_Key
- Sky Music, make-your-own sheet notation: https://sky-music.github.io/make-your-own-sheet.html
- Sky Studio app format notes: https://play.google.com/store/apps/details?id=com.Maple.SkyStudio
- MDN, BaseAudioContext.decodeAudioData: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
- arXiv, Omnizart automatic music transcription toolbox: https://arxiv.org/abs/2106.00497
- arXiv, PiCoGen two-stage piano cover generation: https://arxiv.org/abs/2407.20883
- arXiv, AMT-APC automatic piano cover from AMT models: https://arxiv.org/abs/2409.14086
- arXiv, Pop2Piano audio-based piano cover generation: https://arxiv.org/abs/2211.00895
- arXiv, Onsets and Frames dual-objective piano transcription: https://arxiv.org/abs/1710.11153
- arXiv, Understanding Optical Music Recognition: https://arxiv.org/abs/1908.03608
- arXiv, Practical End-to-End Optical Music Recognition for Pianoform Music: https://arxiv.org/abs/2403.13763
- Springer, End-to-End Full-Page Optical Music Recognition for Pianoform Sheet Music: https://link.springer.com/article/10.1007/s11263-025-02654-6
- W3C MusicXML divisions and duration reference: https://w3c.github.io/musicxml/musicxml-reference/elements/divisions/
- W3C MusicXML MIDI-compatible tutorial: https://www.w3.org/2021/06/musicxml40/tutorial/midi-compatible-part/
- Mozilla PDF.js project: https://github.com/mozilla/pdf.js
- arXiv, Feature Learning for Chord Recognition / Deep Chroma Extractor: https://arxiv.org/abs/1612.05065
- arXiv, JEPOO joint estimation of pitch, onset, and offset: https://arxiv.org/abs/2306.01304
- arXiv, Interactive singing melody extraction based on active adaptation: https://arxiv.org/abs/2402.07599
- arXiv, Harmonic-Percussive Source Separation with DNNs and phase recovery: https://arxiv.org/abs/1807.11298
- arXiv, high-resolution piano onset/offset transcription: https://arxiv.org/abs/2010.01815
- arXiv, Mel-RoFormer vocal separation and melody transcription: https://arxiv.org/abs/2409.04702
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
