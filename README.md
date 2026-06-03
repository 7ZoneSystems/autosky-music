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

## Vercel Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

- `MIMO_API_KEY`: required. Your Xiaomi MiMo API key.
- `MIMO_BASE_URL`: optional. Defaults to `https://token-plan-sgp.xiaomimimo.com/v1`.
- `MIMO_MODEL`: optional. Defaults to `mimo-v2.5`.

## What It Uses

- Sky non-percussion instruments use a 3x5 grid of 15 buttons.
- The grid spans two octaves of a major scale.
- The active key is controlled by a selected music sheet or the current background music key.
- This app stores the 12 Sky major-key layouts: C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, and B.
- `Cb` is treated as the practical enharmonic alias of B major, while the F#/Gb layout includes the `Cb` scale degree used in Sky's flat-key table.
- The app exports common Sky sheet notation: `A1` through `C5`, 1-15 button numbers, note names, and JSON.
- MP3 import uses the browser's Web Audio API to decode the full file, extracts 12-bin chroma from short windows, matches chord templates, smooths one-off changes, and merges short segments into a minimal chord progression.
- Detected chords can be imported into the Sky sheet when all chord tones exist in the currently selected Sky key. Unplayable chromatic chords become rests on import.

## MiMo API Note

The audio engine runs locally. Xiaomi MiMo is called only by `/api/mimo-refine`, which reads `MIMO_API_KEY` from server-side environment variables. The key is never shipped to the browser. The current default base URL is `https://token-plan-sgp.xiaomimimo.com/v1`; the serverless route appends `/messages` for the Anthropic-compatible Messages API.

## Sources Checked

- Official Sky Help Center, Music Sheets: https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1345-how-do-i-use-music-sheets-in-sky/?l=en
- Sky Wiki, Instruments: https://sky-children-of-the-light.fandom.com/wiki/Instruments
- Sky Wiki, Music Key: https://sky-children-of-the-light.fandom.com/wiki/Music_Key
- Sky Music, make-your-own sheet notation: https://sky-music.github.io/make-your-own-sheet.html
- Sky Studio app format notes: https://play.google.com/store/apps/details?id=com.Maple.SkyStudio
- MDN, BaseAudioContext.decodeAudioData: https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData
- Grosche/Jiang/Mueller/Serra, chroma/template chord recognition overview: https://petergrosche.github.io/publication/jiang-2011-analyzing/
- Springer, reassigned spectrum-based automatic chord recognition: https://link.springer.com/article/10.1186/1687-4722-2013-15
- Xiaomi MiMo Anthropic compatibility docs: https://platform.xiaomimimo.com/docs/api/chat/anthropic-api
