# Leadership Section Redesign

**Date:** 2026-03-30
**Status:** Approved

## Overview

Expand the current single Leadership page into a hub-and-spoke hierarchy with 4 pages total: a hub page and three sub-pages (Experience, Skills, Community & Service). Uses nested React Router routes under `/leadership`.

## Routing

```
/leadership               → Leadership.jsx (hub, redesigned)
/leadership/experience    → LeadershipExperience.jsx
/leadership/skills        → LeadershipSkills.jsx
/leadership/community     → LeadershipCommunity.jsx
```

Navbar continues to link only to `/leadership`. No sub-nav bar needed — hub page handles sub-page navigation.

## Files

**Modified:**
- `src/App.jsx` — add three nested routes under `/leadership`
- `src/pages/Leadership.jsx` — redesign as hub page (remove timeline + skills pills)

**Created:**
- `src/pages/LeadershipExperience.jsx` — timeline moved from current Leadership.jsx
- `src/pages/LeadershipSkills.jsx` — skills content moved + highlights section added
- `src/pages/LeadershipCommunity.jsx` — placeholder page

## Hub Page (`/leadership`)

### Philosophy Section
Three pillars stacked vertically with generous spacing. Each pillar uses an editorial layout:
- Pillar word rendered large (~text-5xl, columbia-blue, slightly transparent) as a visual anchor
- 2–3 sentences of supporting text beside or below it
- Subtle spacing/divider between pillars

Pillars and their themes:
- **Authenticity** — leading as yourself, building trust through consistency and transparency
- **Competency** — continuous learning, mastering your domain, earning the confidence of those you lead
- **Growth** — developing yourself and those around you, embracing challenge as the path forward

### Sub-page Navigation Section
Three cards in a row (stacked on mobile), below the philosophy section.

Each card contains:
- Icon (briefcase → Experience, globe → Community, lightning bolt → Skills)
- Title
- One-line description
- "Explore →" link to the sub-page

Card style: `bg-surface` base, columbia-blue accent border on hover, consistent with site design language.

Timeline and skills pills are removed from this page entirely.

## Sub-pages

### Experience (`/leadership/experience`)
Identical to current Leadership.jsx timeline section. Page heading + columbia-blue underline bar + vertical timeline from `experience.js` data. No layout or data changes.

### Skills (`/leadership/skills`)

**Featured Highlights (top)**
Cards for standout skills with narrative context. Initial highlight:
- **Arabic** — low-intermediate proficiency. Scored OPIc 1 after studying abroad in Morocco during summer under Project GO (Global Officer) with the University of Maryland. Tag: "Language / Study Abroad"

Each highlight card: skill name, short narrative, subtle category tag.

**General Skills (below)**
Existing three pill groups unchanged:
- Technical (columbia-blue pills)
- Leadership (uh-red pills)
- Core (muted pills)

### Community & Service (`/leadership/community`)
Placeholder page. Heading + columbia-blue underline bar + short message: "Content coming soon." Same structural shell as other sub-pages for easy future fill-in.

## Data

No new data files needed. Existing `experience.js` and `skills.js` are used as-is. Arabic highlight is hardcoded in `LeadershipSkills.jsx` as it is a specific narrative, not tabular data.

## Testing

Existing `Leadership.test.jsx` renders the hub page — update snapshot/assertions to match new hub content. No new test files required for sub-pages (placeholders with minimal content).
