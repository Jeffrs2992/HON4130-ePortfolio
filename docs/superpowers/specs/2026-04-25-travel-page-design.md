# Travel Page — Design Spec
Date: 2026-04-25

## Overview

Add a `/travel` page to the ePortfolio as a top-level nav item. Travel entries live in `timeline.json` alongside professional and academic entries, distinguished by `type: "travel"`. Highlighted travel entries (`highlight: true`) automatically appear on the About Me timeline rail using the existing compact `TimelineCard` component. The `/travel` page shows a photo card grid. Clicking any card routes to the existing `/timeline/:id` detail page using a new `TravelDetail` template.

---

## Data

**New fields added to `timeline.json` entries with `type: "travel"`:**

```json
{
  "id": "morocco-project-go",
  "date": "2024-06",
  "type": "travel",
  "title": "Morocco",
  "organization": "University of Maryland · Project GO",
  "dateRange": "Summer 2024",
  "tags": ["travel", "study-abroad", "afrotc"],
  "summary": "Spent the summer studying Modern Standard Arabic in Morocco through Project GO — a DoD-funded program for ROTC cadets.",
  "narrative": "",
  "bullets": [
    "Earned OPIc score of 1 in Modern Standard Arabic",
    "Studied abroad through DoD Project GO program",
    "Explored Marrakech, Fes, and the Atlas Mountains"
  ],
  "photo": null,
  "photos": [],
  "highlight": true
}
```

All existing timeline entry fields are reused. No new fields are required. Travel-specific context goes in `bullets` (highlights) and `narrative`.

**Four initial entries:**
- `morocco-project-go` — Summer 2024, tags: travel, study-abroad, afrotc
- `seattle-boston` — Thanksgiving 2024, tags: travel
- `national-parks-road-trip` — Winter 2024, tags: travel, road-trip
- `virginia-north-carolina` — Spring 2025, tags: travel

All four have `highlight: true` so they appear on the About Me timeline.

---

## Routing

| Route | Component | Notes |
|---|---|---|
| `/travel` | `Travel.jsx` | New page, photo card grid |
| `/timeline/:id` | `TimelineEntry.jsx` | Existing route, new TravelDetail template |

No new routing pattern — travel detail pages reuse the existing `/timeline/:id` route with a `TravelDetail` template dispatched by `type === "travel"`.

---

## Components

### `src/pages/Travel.jsx`
- Reads `timeline.json`, filters by `type === "travel"`, sorts descending by `date`
- Renders page header ("Travel", columbia-blue rule, short tagline)
- Renders `TravelCard` grid: 1 col mobile, 2 col sm, 3 col md+
- No sub-navigation; standalone page

### `src/components/travel/TravelCard.jsx`
- Props: `entry` (timeline entry object)
- Layout: cover photo (full-width, fixed height) or placeholder; tag pills; title; organization + dateRange; "Explore →" Link to `/timeline/${id}`
- Visually consistent with the existing `TimelineCard` aesthetic (surface bg, columbia-blue border hover, muted text)

### `src/components/timeline/templates/TravelDetail.jsx`
- Props: `entry`, `related`
- Sections (top to bottom):
  1. Tag links (navigate to `/travel` for travel/study-abroad/road-trip tags)
  2. Title, organization, dateRange
  3. Hero photo (`entry.photo`) or omitted if null
  4. Narrative paragraph (`entry.narrative`) with left columbia-blue border, omitted if empty
  5. "Highlights" — bulleted list from `entry.bullets`, omitted if empty
  6. Photo gallery — 3-column grid from `entry.photos[]`, omitted if empty
  7. Related entries strip (shared-tag entries, max 3)

---

## Navigation

**`Navbar.jsx`** — add "Travel" link between "About Me" and "Education":
```
About Me | Travel | Education | Leadership | Contact
```

**`tagRoutes.js`** — add three new tags, all routing to `/travel`:
```js
travel:       { to: '/travel', colorClass: 'bg-columbia-blue/10 text-columbia-blue' },
'study-abroad': { to: '/travel', colorClass: 'bg-emerald-500/15 text-emerald-400' },
'road-trip':  { to: '/travel', colorClass: 'bg-yellow-500/15 text-yellow-400' },
```

---

## About Me Timeline

No code changes required. `TimelineRail` already filters by `highlight: true` across all entry types. Travel entries with `highlight: true` appear automatically using the existing `TimelineCard` component — same compact format (photo thumb, tags, title, org, dateRange, summary teaser, Explore link) as every other entry.

---

## Tests

| File | Tests |
|---|---|
| `Travel.test.jsx` | renders heading; renders all 4 travel cards; non-travel entries excluded |
| `TravelCard.test.jsx` | renders title/org/dateRange; renders tags; Explore href; photo placeholder |
| `TravelDetail.test.jsx` | renders title/tags/narrative; renders bullets; renders photo gallery; omits sections when empty |
| `Navbar.test.jsx` | Travel link present; order correct |
| `TimelineRail.test.jsx` | travel entries with highlight:true appear on rail |

---

## Content Update Workflow

To add a new trip after deployment:
1. Edit `src/data/timeline.json` on GitHub web UI
2. Add a new entry with `type: "travel"` and all fields
3. Set `highlight: true` to also show it on the About Me timeline
4. Upload photos to `public/images/` and reference them in `photo` / `photos[]`
5. Commit — GitHub Actions deploys automatically