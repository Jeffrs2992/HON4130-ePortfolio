# Timeline Redesign — Design Spec
**Date:** 2026-04-17
**Project:** HON4130 ePortfolio (jeffrs2992.github.io/HON4130-ePortfolio)

---

## Overview

Redesign the portfolio from a multi-page resume site into a timeline-centered experience. The Home page stays clean and unchanged. The About Me page becomes the primary content hub: a short personal bio at the top followed by a scrollable, curated timeline of career milestones. Each timeline entry has an "Explore" link to a dedicated detail page with richer content, more photos, and deeper narrative.

---

## Routing

```
/                        → Home (unchanged — name, subtitle, tagline)
/about                   → About Me (bio + embedded timeline)
/timeline/:id            → TimelineEntry (flexible detail page by entry type)
/education               → Education (unchanged)
/leadership              → Leadership (compact philosophy paragraph — replaces 3-pillar layout)
/leadership/experience   → LeadershipExperience (unchanged)
/leadership/skills       → Skills & Certifications (expanded — absorbs Certifications page)
/leadership/community    → LeadershipCommunity (unchanged)
/contact                 → Contact (unchanged)

REMOVED: /certifications
```

---

## Navigation

Navbar links: **Home · About Me · Education · Leadership · Contact**

The "Certifications" nav link is removed. Certifications and awards content moves to `/leadership/skills` (renamed "Skills & Certifications").

---

## Data Architecture

### `src/data/timeline.js`

Single source of truth for all timeline entries. Shape:

```js
{
  id: 'deputy-wing-commander',     // slug used in URL: /timeline/:id
  date: '2026-01',                 // ISO-ish YYYY-MM, used for sort + year grouping
  type: 'role',                    // role | milestone | training | award
  title: 'Deputy Wing Commander',
  organization: 'AFROTC Det 003',
  dateRange: 'Jan – May 2026',
  tags: ['afrotc', 'leadership'],  // map to top-level routes via tagRoutes.js
  summary: 'Short teaser paragraph shown inline on the timeline.',
  bullets: [...],                  // optional — used by role and training types
  photo: null,                     // path to hero image, null until added
  photos: [],                      // additional photos for detail page
  highlight: true,                 // false = in data but hidden from timeline
}
```

**Entry types:**
- `role` — AFROTC positions, internships. Body: narrative + bullets + one supporting photo.
- `milestone` — Commissioning, graduation. Body: narrative + photo grid (multiple photos).
- `training` — Field training, courses, workshops. Body: narrative + key takeaways + one photo.
- `award` — Dean's List, AAS, certifications. Body: short narrative + criteria/significance.

**Curated highlight entries (initial set):**
- Commission — 2Lt, USAF (milestone, May 2026)
- Deputy Wing Commander (role, Spring 2026)
- B.B.A. Graduation — UH (milestone, May 2026)
- Support Squadron Commander (role, Fall 2025)
- Cyber Officer (role, Spring 2025)
- START Audit Intern — PwC (role, Summer 2024)
- Logistics Officer (role, Fall 2024)
- AFROTC Field Training Graduate (training)
- UH enrollment / AFROTC start (milestone, Aug 2022)
- [Future: scholarships, training programs, personal highlights as added]

### `src/data/tagRoutes.js`

Maps tag strings to top-level routes. Clicking a tag on a detail page navigates to the corresponding section.

```js
export const tagRoutes = {
  leadership: '/leadership',
  afrotc: '/leadership',
  education: '/education',
  professional: '/about',
  accounting: '/education',
  milestone: '/about',
  // extend as new tags are added
}
```

---

## About Me Page (`/about`)

**Structure:**
1. Page heading: "About Me"
2. Short personal bio paragraph — who you are, background, character, what drives you. No guiding principles list, no AF Core Values section.
3. Section heading: "Timeline" with Columbia Blue underline rule
4. Full scrollable timeline (see Timeline Component below)

The guiding principles block (AF Core Values) is removed entirely from this page.

---

## Timeline Component

**Visual design:**
- Left vertical rail: 1px Columbia Blue at 18% opacity
- **Year markers:** larger dot (12px) with Columbia Blue glow ring, YYYY label in uppercase spaced tracking. Separated from surrounding entries by a thin full-width horizontal rule.
- **Entry dots:** 7px Columbia Blue, no border
- **Entry layout (no card borders):** content flows directly into page background
  - Inline photo slot (full-width, rounded corners) — placeholder shown until photo added
  - Color-coded tags
  - Title (bold, off-white)
  - Organization + date range (muted)
  - Teaser paragraph (muted, 1.75 line-height)
  - "Explore →" link in Columbia Blue

**Tag color scheme:**
| Tag category | Color |
|---|---|
| `#afrotc` | Columbia Blue |
| `#leadership` | Green (#60c090) |
| `#milestone` | UH Red (#e07060) |
| `#professional` / `#accounting` | Gold (#d4a840) |
| `#education` | Columbia Blue |

Tags are colored consistently across both the timeline and detail pages.

**Sort order:** Newest first (descending by `date`). Year markers inserted automatically when the year changes between entries.

---

## Timeline Entry Detail Pages (`/timeline/:id`)

All detail pages share a common outer structure:

1. Back link: `← Timeline` → `/about`
2. Hero photo (full-width, rounded) — placeholder shown until photo added
3. Color-coded tags (each tag is a link navigating to the corresponding top-level page)
4. Title (bold, large)
5. Organization (Columbia Blue)
6. Date range (muted)
7. Narrative paragraph (muted, left-rail blue accent border)
8. Type-specific body (see below)
9. "Related" entries — 1–3 other timeline entries linked by shared tags

**Type-specific body:**

- `role`: "What I did" section with bullet list + one supporting photo below
- `milestone`: "More from this day" 3-column photo grid (expandable as photos are added)
- `training`: "Key takeaways" bullet list + one photo
- `award`: Short significance paragraph, no bullets

---

## Leadership Page Changes

**`/leadership`** — Replace the 3-pillar layout (Authenticity, Competency, Growth displayed at 5xl font weight) with a compact leadership philosophy paragraph. Shorter, more conversational, less visually dominant. The sub-page nav cards update:

| Card | Route |
|---|---|
| Experience | `/leadership/experience` |
| Skills & Certifications | `/leadership/skills` |
| Community & Service | `/leadership/community` |

**`/leadership/skills`** — Renamed to "Skills & Certifications". Absorbs the 9 certification/award tiles from the removed Certifications page (Security+, Dean's List, AAS, Field Training Graduate, + 5 placeholders). Existing skills content stays.

---

## Files to Create

| File | Purpose |
|---|---|
| `src/data/timeline.js` | Timeline entries data |
| `src/data/tagRoutes.js` | Tag → route mapping |
| `src/pages/TimelineEntry.jsx` | Detail page router (reads `:id`, selects template by type) |
| `src/components/timeline/TimelineRail.jsx` | Timeline scroll component used on About Me |
| `src/components/timeline/TimelineCard.jsx` | Single entry card (photo + tags + teaser + Explore) |
| `src/components/timeline/YearMarker.jsx` | Year anchor with glow dot and label |
| `src/components/timeline/templates/RoleDetail.jsx` | Detail template for role entries |
| `src/components/timeline/templates/MilestoneDetail.jsx` | Detail template for milestone entries |
| `src/components/timeline/templates/TrainingDetail.jsx` | Detail template for training entries |
| `src/components/timeline/templates/AwardDetail.jsx` | Detail template for award entries |

---

## Files to Modify

| File | Change |
|---|---|
| `src/App.jsx` | Add `/timeline/:id` route, remove `/certifications` route |
| `src/components/Navbar.jsx` | Remove Certifications link, rename About → About Me |
| `src/pages/About.jsx` | Rewrite: bio + embed TimelineRail |
| `src/pages/Leadership.jsx` | Replace 3-pillar section with compact philosophy paragraph, update sub-page card labels |
| `src/pages/LeadershipSkills.jsx` | Rename to "Skills & Certifications", absorb certification tiles |
| `src/data/experience.js` | Kept as-is — LeadershipExperience.jsx continues to use it directly. timeline.js is self-contained and duplicates the role entries it needs. |

---

## Files to Delete

| File | Reason |
|---|---|
| `src/pages/Certifications.jsx` | Content moved to LeadershipSkills |
| `src/data/certifications.js` | Kept as-is — LeadershipSkills continues to use it for the tile grid. Any award entries that appear on the timeline are defined separately in timeline.js. |

---

## Testing

Existing tests for Leadership, Home, and Education pages should continue to pass. New tests needed:

- Timeline renders entries in descending date order
- Year markers appear between entries from different years
- Clicking a tag navigates to the correct top-level route
- TimelineEntry renders the correct template for each entry type
- `highlight: false` entries do not appear on the timeline
