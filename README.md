# Sky Piano Sheet Maker

A standalone browser tool for composing Sky: Children of the Light piano sheets on the 15-button in-game instrument grid.

Open `index.html` in a browser. No install or dev server is required.

## What It Uses

- Sky non-percussion instruments use a 3x5 grid of 15 buttons.
- The grid spans two octaves of a major scale.
- The active key is controlled by a selected music sheet or the current background music key.
- This app stores the 12 Sky major-key layouts: C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, and B.
- `Cb` is treated as the practical enharmonic alias of B major, while the F#/Gb layout includes the `Cb` scale degree used in Sky's flat-key table.
- The app exports common Sky sheet notation: `A1` through `C5`, 1-15 button numbers, note names, and JSON.

## Sources Checked

- Official Sky Help Center, Music Sheets: https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1345-how-do-i-use-music-sheets-in-sky/?l=en
- Sky Wiki, Instruments: https://sky-children-of-the-light.fandom.com/wiki/Instruments
- Sky Wiki, Music Key: https://sky-children-of-the-light.fandom.com/wiki/Music_Key
- Sky Music, make-your-own sheet notation: https://sky-music.github.io/make-your-own-sheet.html
- Sky Studio app format notes: https://play.google.com/store/apps/details?id=com.Maple.SkyStudio
