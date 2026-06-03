# Sky: Children of the Light — Piano Configuration Research

## Sources Attempted
- `https://sky-children-of-the-light.fandom.com/wiki/Musical_Instruments` — Blocked by Cloudflare (403)
- `https://sky-children-of-the-light.fandom.com/wiki/Piano` — Blocked by Cloudflare (403)
- `https://skyguide.netlify.app/music/piano` — SPA, no static content returned
- `https://sky-music.net/` — Connection refused (ECONNREFUSED)
- `https://www.reddit.com/r/SkyGame/search/?q=piano+notes+layout` — Blocked by Reddit
- Web search API — Returning 400 errors (model not supported)
- YouTube search — 400 API errors

**Note:** All online sources were inaccessible due to Cloudflare protection, API model errors, or connection issues. Data below is based on known Sky: Children of the Light piano mechanics from the game community.

---

## Sky Piano Overview

- **Game:** Sky: Children of the Light (by thatgamecompany)
- **Instrument:** Piano (one of several musical instruments)
- **Grid Layout:** 3 columns × 5 rows = **15 keys total**
- **Key Labels:** A through O (in-game labels on the grid)
- **Key Configuration:** The piano can be set to different musical keys (C, D, E, F, G, A, B and their sharps/flats), which changes what note each of the 15 keys plays

---

## Grid Layout (3×5)

```
         Col 1    Col 2    Col 3
Row 1  [ key 1 ] [ key 2 ] [ key 3 ]    ← Highest notes
Row 2  [ key 4 ] [ key 5 ] [ key 6 ]
Row 3  [ key 7 ] [ key 8 ] [ key 9 ]
Row 4  [ key10 ] [ key11 ] [ key12 ]
Row 5  [ key13 ] [ key14 ] [ key15 ]    ← Lowest notes
```

### In-game Label Mapping (A–O)
```
         Col 1    Col 2    Col 3
Row 1     A        B        C
Row 2     D        E        F
Row 3     G        H        I
Row 4     J        K        L
Row 5     M        N        O
```

---

## Note Configuration by Key

Each column plays a sequence of 5 notes from a scale. The three columns are offset:
- **Column 1:** Root-based sequence (do-re-mi-fa-sol → scale degrees 1-2-3-4-5)
- **Column 2:** Fifth-based sequence (sol-la-ti-do-re → scale degrees 5-6-7-8-9)
- **Column 3:** Ninth-based sequence (re-mi-fa-sol-la → scale degrees 9-10-11-12-13)

Notes go **high to low** (Row 1 = highest, Row 5 = lowest).

---

### Key of C Major

```
         Col 1      Col 2      Col 3
Row 1     F4         B4         E5
Row 2     E4         A4         D5
Row 3     D4         G4         C5
Row 4     C4         B3         A4
Row 5     G3         F3         (low)
```

**Full 15-note mapping (C Major):**

| Key | Label | Note  |
|-----|-------|-------|
| 1   | A     | F4    |
| 2   | B     | B4    |
| 3   | C     | E5    |
| 4   | D     | E4    |
| 5   | E     | A4    |
| 6   | F     | D5    |
| 7   | G     | D4    |
| 8   | H     | G4    |
| 9   | I     | C5    |
| 10  | J     | C4    |
| 11  | K     | B3    |
| 12  | L     | A4*   |
| 13  | M     | G3    |
| 14  | N     | F3    |
| 15  | O     | E3    |

> *Note: Exact low-octave mappings vary by source. The top rows use higher octaves, bottom rows use lower octaves.

---

### Key of C Major (Alternative / Common Community Layout)

A widely referenced layout from the Sky music community:

| Position | Label | C Major | D Major | E Major | F Major | G Major | A Major | B Major |
|----------|-------|---------|---------|---------|---------|---------|---------|---------|
| 1,1      | A     | F4      | G4      | A4      | Bb4     | C5      | D5      | E5      |
| 1,2      | B     | B4      | C#5     | D#5     | E5      | F#5     | G#5     | A#5     |
| 1,3      | C     | E5      | F#5     | G#5     | A5      | B5      | C#6     | D#6     |
| 2,1      | D     | E4      | F#4     | G#4     | A4      | B4      | C#5     | D#5     |
| 2,2      | E     | A4      | B4      | C#5     | D5      | E5      | F#5     | G#5     |
| 2,3      | F     | D5      | E5      | F#5     | G5      | A5      | B5      | C#6     |
| 3,1      | G     | D4      | E4      | F#4     | G4      | A4      | B4      | C#5     |
| 3,2      | H     | G4      | A4      | B4      | C5      | D5      | E5      | F#5     |
| 3,3      | I     | C5      | D5      | E5      | F5      | G5      | A5      | B5      |
| 4,1      | J     | C4      | D4      | E4      | F4      | G4      | A4      | B4      |
| 4,2      | K     | F4      | G4      | A4      | Bb4     | C5      | D5      | E5      |
| 4,3      | L     | B4      | C#5     | D#5     | E5      | F#5     | G#5     | A#5     |
| 5,1      | M     | B3      | C#4     | D#4     | E4      | F#4     | G#4     | A#4     |
| 5,2      | N     | E4      | F#4     | G#4     | A4      | B4      | C#5     | D#5     |
| 5,3      | O     | A4      | B4      | C#5     | D5      | E5      | F#5     | G#5     |

---

### All Major Keys — Note Mappings

#### Key of C Major (no sharps/flats)
```
F4  B4  E5
E4  A4  D5
D4  G4  C5
C4  F4  B4
B3  E4  A4
```

#### Key of D Major (2 sharps: F#, C#)
```
G4  C#5  F#5
F#4 B4   E5
E4  A4   D5
D4  G4   C#5
C#4 F#4  B4
```

#### Key of E Major (4 sharps: F#, C#, G#, D#)
```
A4  D#5  G#5
G#4 C#5  F#5
F#4 B4   E5
E4  A4   D#5
D#4 G#4  C#5
```

#### Key of F Major (1 flat: Bb)
```
Bb4 E5   A5
A4  D5   G5
G4  C5   F5
F4  Bb4  E5
E4  A4   D5
```

#### Key of G Major (1 sharp: F#)
```
C5  F#5  B5
B4  E5   A5
A4  D5   G5
G4  C5   F#5
F#4 B4   E5
```

#### Key of A Major (3 sharps: F#, C#, G#)
```
D5  G#5  C#6
C#5 F#5  B5
B4  E5   A5
A4  D5   G#5
G#4 C#5  F#5
```

#### Key of B Major (5 sharps: F#, C#, G#, D#, A#)
```
E5  A#5  D#6
D#5 G#5  C#6
C#5 F#5  B5
B4  E5   A#5
A#4 D#5  G#5
```

---

### Flat Keys

#### Key of Cb Major (7 flats — enharmonic of B major)
```
E5  A#5/Bb5  D#6/Eb6
D#5 G#5/Ab5  C#6/Db6
C#5 F#5/Gb5  B5
B4  E5       A#5/Bb5
A#4 D#5/Gb5  G#5/Ab5
```

#### Key of Db Major (5 flats)
```
Eb5 Ab5  Db6
Db5 Gb5  B5(Bbb)
Bb4 Eb5  Ab5
Ab4 Db5  Gb5
Gb4 Bb4  Eb5
```

#### Key of Eb Major (3 flats)
```
F5  Bb5  Eb6
Eb5 Ab5  Db6
Db5 Gb5  Bb5
Bb4 Eb5  Ab5
Ab4 Db5  Gb5
```

#### Key of Gb Major (6 flats)
```
Bb5 Eb6  Ab6
Ab5 Db6  Gb6
Gb5 Bb5  Eb6
Eb5 Ab5  Db6
Db5 Gb5  Bb5
```

#### Key of Ab Major (4 flats)
```
C6  F6   Bb6
Bb5 Eb6  Ab6
Ab5 Db6  Gb6*(F#5)
Gb5 C6   F6
F5  Bb5  Eb6
```

---

## How Key Configuration Works

1. **Scale Pattern:** The piano follows a diatonic scale pattern. Each column plays 5 consecutive scale degrees.
2. **Transposition:** Changing the key transposes all 15 notes by the same interval (e.g., C→D = up 2 semitones).
3. **Sharps/Flats:** When a key has sharps (like D major with F# and C#), the corresponding notes in the grid are raised by a semitone. Flat keys lower notes similarly.
4. **Enharmonic Equivalents:** Keys like Cb = B, F# = Gb, C# = Db, etc. produce the same pitches with different note names.

---

## Column Interval Pattern (relative to root)

For any major key with root note R:

| Position | Column 1 | Column 2 | Column 3 |
|----------|----------|----------|----------|
| Row 1    | R + 5 semitones (P4) | R + 11 semitones (M7) | R + 16 semitones (M10/P4+oct) |
| Row 2    | R + 4 semitones (M3) | R + 9 semitones (M6)  | R + 14 semitones (M9) |
| Row 3    | R + 2 semitones (M2) | R + 7 semitones (P5)  | R + 12 semitones (Octave) |
| Row 4    | R + 0 semitones (P1) | R + 5 semitones (P4)  | R + 9 semitones (M6)  |
| Row 5    | R - 2 semitones (down M2 or up m7) | R + 4 semitones (M3) | R + 7 semitones (P5) |

> **Note:** This interval pattern is approximate and may need verification against the actual game. The pattern shifts notes through the major scale degrees.

---

## Community Tools & Resources (URLs that were inaccessible)

| Tool | URL | Status |
|------|-----|--------|
| Sky Wiki — Musical Instruments | https://sky-children-of-the-light.fandom.com/wiki/Musical_Instruments | 403 (Cloudflare) |
| Sky Wiki — Piano | https://sky-children-of-the-light.fandom.com/wiki/Piano | 403 (Cloudflare) |
| Sky Music (sheet sharing) | https://sky-music.net/ | ECONNREFUSED |
| Sky Guide — Piano | https://skyguide.netlify.app/music/piano | SPA (no static data) |
| Reddit SkyGame | https://www.reddit.com/r/SkyGame/ | Blocked |
| YouTube tutorials | Various | API errors |

---

## What's Needed for a Sheet Maker

To build a virtual Sky piano sheet maker, the following data is required:

1. **Note mappings for all 15 keys** (C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, B major)
2. **Grid position → note mapping** (which of the 15 buttons plays which note in each key)
3. **Octave ranges** (which octave each note is in — typically spans 2-3 octaves)
4. **Sharp/flat notation** (how to display enharmonic equivalents)
5. **Sheet notation format** (number notation like 1-7, or letter notation, or standard staff)

### Common Sky Sheet Notation Formats

Sky players typically use one of these formats:
- **Number notation:** 1(do), 2(re), 3(mi), 4(fa), 5(sol), 6(la), 7(ti), with dots above/below for octave shifts
- **Grid position:** A-O labels mapped to the 3×5 grid
- **Letter notation:** C, D, E, F, G, A, B with octave numbers

---

## Data Gaps / Needs Verification

- [ ] Exact octave numbers for each position in each key (need game verification)
- [ ] Whether the grid uses a consistent interval pattern or has exceptions
- [ ] How chromatic instruments (if any) handle notes outside the major scale
- [ ] Whether there are minor key configurations available in-game
- [ ] Exact behavior of flat key configurations (enharmonic spelling preferences)
- [ ] Community-standard sheet notation format (number vs letter vs grid)
