# ePortfolio — Project Handoff

This document gives a new Claude conversation full context to continue work on Japheth's personal ePortfolio.

---

## Owner

Japheth Silva — UH senior graduating May 2026, commissioning as 2Lt USAF 17X Cyberspace Operations. Double major: Accounting + MIS, Honors College, AFROTC Det 003.

---

## Tech Stack

| Thing | What |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 with custom colors |
| Routing | React Router v6, **HashRouter** (required for GitHub Pages) |
| Testing | Vitest + React Testing Library |
| Hosting | GitHub Pages via `peaceiris/actions-gh-pages@v3` |
| Node | Portable at `C:\Users\japhe\AppData\Local\nodejs\node-v22.14.0-win-x64` — NOT in PATH |

### Running tests
```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run
```

### Building
```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vite/bin/vite.js build
```

### Custom Tailwind colors
`columbia-blue`, `uh-red`, `off-white`, `muted`, `surface`, `background`

---

## Repo

`https://github.com/Jeffrs2992/HON4130-ePortfolio`  
Branch: `main` — pushes to main trigger GitHub Pages deploy automatically.

---

## Site Structure

| Route | Page |
|---|---|
| `/` | Home (hero) |
| `/about` | About Me — timeline rail |
| `/travel` | Travel — card grid |
| `/timeline/:id` | Timeline entry detail page |
| `/leadership` | Leadership hub |
| `/leadership/experience` | Experience sub-page |
| `/leadership/skills` | Education & Credentials sub-page |
| `/leadership/community` | Community sub-page |
| `/contact` | Contact |

Nav links: **About Me · Leadership · Travel · Contact**  
Education was folded into `/leadership/skills` (renamed "Education & Credentials").

---

## Key Files

```
src/
  data/
    timeline.json          ← single source of truth for all entries
    tagRoutes.js           ← maps tag names to routes + colors
    education.js           ← UH degree + AFROTC data (used in LeadershipSkills)
  components/
    Navbar.jsx
    layout/PageLayout.jsx
    timeline/
      TimelineRail.jsx     ← filters highlight:true, sorts descending
      TimelineCard.jsx     ← card shown on About Me rail
      PhotoGallery.jsx     ← carousel + lightbox + placeholder
      templates/
        RoleDetail.jsx
        TrainingDetail.jsx
        TravelDetail.jsx
        MilestoneDetail.jsx
        AwardDetail.jsx
    travel/
      TravelCard.jsx       ← card shown on /travel grid
  pages/
    About.jsx
    Travel.jsx             ← filters type:"travel", renders TravelCard grid
    TimelineEntry.jsx      ← routes to correct template based on entry.type
    Leadership.jsx
    LeadershipSkills.jsx   ← Education & Credentials (UH + AFROTC + skills)
    LeadershipExperience.jsx
    LeadershipCommunity.jsx
    Home.jsx
    Contact.jsx
public/
  resume.pdf               ← Japheth's resume
  images/
    <entry-id>/            ← one folder per timeline entry, pre-created
      .gitkeep             ← placeholder; delete once real photos uploaded
```

---

## Timeline Data Format

`src/data/timeline.json` is an array of entries. All entry types share these fields:

```json
{
  "id": "kebab-case-unique-id",
  "date": "YYYY-MM",
  "type": "role | milestone | training | award | travel",
  "title": "Display title",
  "organization": "Org or location",
  "dateRange": "Human-readable date label",
  "tags": ["afrotc", "travel", ...],
  "summary": "1-2 sentence card description",
  "bullets": ["Bullet 1", "Bullet 2"],
  "paragraphs": ["Essay paragraph 1", "Essay paragraph 2"],
  "photo": "/images/entry-id/cover.jpg",
  "photos": ["/images/entry-id/photo1.jpg", "/images/entry-id/photo2.jpg"],
  "highlight": true
}
```

**Field notes:**
- `highlight: true` → appears on the About Me timeline rail
- `type: "travel"` → also appears on the `/travel` card grid
- `photo` → hero image on detail page + thumbnail on Travel card
- `photos` → carousel gallery on detail page (click-through lightbox)
- `paragraphs` → essay shown on detail page (array of strings, one per paragraph)
- `summary` → short description shown on cards; fallback on detail page if no paragraphs yet
- `blocks` field was an earlier approach — now replaced by `paragraphs` + `photos`

### Available tags and where they link
```js
afrotc       → /leadership
leadership   → /leadership
professional → /leadership/experience
milestone    → /about
education    → /leadership/skills
accounting   → /leadership/skills
travel       → /travel
study-abroad → /travel
road-trip    → /travel
training     → /about
```

---

## Current Timeline Entries (15 total)

| ID | Type | Date | Highlight |
|---|---|---|---|
| commission-2lt-usaf | milestone | 2026-05 | ✓ |
| bba-graduation-uh | milestone | 2026-05 | ✓ |
| deputy-wing-commander | role | 2026-01 | ✓ |
| support-squadron-commander | role | 2025-08 | ✓ |
| virginia-north-carolina | travel | 2025-03 | ✓ |
| cyber-officer | role | 2025-01 | ✓ |
| national-parks-road-trip | travel | 2025-12 | ✓ |
| seattle-boston | travel | 2025-11 | ✓ |
| morocco-project-go | travel | 2025-06 | ✓ |
| logistics-officer | role | 2024-08 | ✓ |
| pwc-start-audit-intern | role | 2024-05 | ✓ |
| field-training-graduate | training | 2024-06 | ✓ |
| you-can-fly | training | 2023-08 | ✓ |
| uh-afrotc-start | milestone | 2022-08 | ✓ |

**Travel entries on `/travel` page:** virginia-north-carolina, national-parks-road-trip, seattle-boston, morocco-project-go

**All paragraphs written** for: deputy-wing-commander, support-squadron-commander, cyber-officer, national-parks-road-trip, seattle-boston, morocco-project-go, logistics-officer, pwc-start-audit-intern, field-training-graduate, you-can-fly

**Paragraphs still empty:** commission-2lt-usaf, bba-graduation-uh, virginia-north-carolina, uh-afrotc-start

---

## PhotoGallery Component

`src/components/timeline/PhotoGallery.jsx` — used by all three detail templates.

- **Empty `photos[]`** → shows a dashed "Photos coming soon" placeholder (360px tall)
- **1+ photos** → horizontal carousel with left/right arrows (appear on hover), dot indicators (≤12 photos), counter (>12)
- **Click any photo** → full-screen lightbox with arrow nav + keyboard (←/→/Escape)

To add photos: upload to `public/images/<entry-id>/` on GitHub, then add paths to the entry's `photos` array in `timeline.json`. The `photo` field (singular) is the card thumbnail on the Travel grid and the hero on detail pages.

---

## Testing

46 tests across 12 test files. All passing. Run before committing.

Key patterns:
- JSON mocks use `vi.mock('../data/timeline.json', () => ({ default: [...] }))`
- Images with `alt=""` have role `presentation` not `img` — use `data-testid` instead
- Duplicate text (e.g. heading + body both saying "University of Houston") → use `getByRole('heading', { name: '...' })`

---

## .gitignore Notes

`.superpowers/` and `public/JPM_2012.pdf` are explicitly ignored — they kept sneaking into commits. **Do not use `git add -A`** — always add files by name.

---

## Content Still Needed from Japheth

- Essay + photos for: Virginia + North Carolina, UH/AFROTC start, graduation, commissioning
- Cover photo (`photo` field) for every entry — this shows on the Travel card grid and as the detail page hero
- Photos for every entry uploaded to their `public/images/<entry-id>/` folder

---

## Known Issues / Decisions Made

- **`blocks` field** on travel entries in older code — fully replaced by `paragraphs` + `photos`. If you see `blocks` anywhere it's stale.
- **Education page deleted** — content lives in `/leadership/skills` (LeadershipSkills.jsx). Tag routes for `education` and `accounting` point to `/leadership/skills`.
- **HashRouter** is non-negotiable — GitHub Pages doesn't support server-side routing.
- **`vi.mock()` format** for JSON in Vitest must be `{ default: [...] }` not just `[...]`.