# E-Portfolio Design Spec
**Date:** 2026-03-30
**Owner:** Japhe (UH '25 — Accounting + MIS, AFROTC, 2Lt USAF)

---

## Overview

A multi-page personal e-portfolio serving as a general professional presence for military, tech/cybersecurity, academic, and networking audiences. Resume-style (no projects section), built to grow and evolve across career phases in and out of the military.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Frontend framework and build tool |
| React Router v6 | Client-side multi-page routing |
| Tailwind CSS | Utility-first styling, dark mode support |
| GitHub Pages or Netlify | Static hosting (free tier) |

---

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#0D1117` | Page/app background |
| Surface | `#161B22` | Cards, panels, navbar |
| Columbia Blue | `#6DAEDB` | Primary accent, links, tech skill tags, CTA outlines |
| UH Red | `#C8102E` | Secondary accent, active nav underline, leadership tags, primary CTA button |
| White | `#F0F6FC` | Primary text |
| Muted | `#8B949E` | Secondary text, dates, labels |

---

## Design Principles

- Minimal dark-mode base with intentional pops of columbia blue and UH red
- Inspired by benroachdesign.com — clean, typographic, no clutter
- Tech/cyber aesthetic: subtle grid or circuit pattern on Home, not heavy
- No unnecessary animations — only subtle transitions (hover states, page fade-in)

---

## Pages & Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/education` | Education |
| `/leadership` | Leadership |
| `/certifications` | Certifications & Awards |
| `/contact` | Contact |

---

## Shared Layout

### Navbar
- Fixed top, dark surface background (`#161B22`)
- Logo/name left-aligned (white, bold)
- Nav links right-aligned: About, Education, Leadership, Certifications, Contact
- Active page indicated by UH red underline
- Hamburger menu on mobile

### Footer
- Minimal — name, year, social icon links (LinkedIn, GitHub, email)

---

## Page Designs

### Home (`/`)
- Full-viewport dark landing
- Name displayed large and bold in white
- Subtitle: *"2Lt, USAF | Cyberspace Operations | University of Houston '25"*
- Short 1-2 sentence tagline (filler, to be updated)
- Subtle background: CSS-only animated columbia blue dot grid (no canvas or JS animation libraries — keep it lightweight)
- Two CTA buttons:
  - **View Resume** — UH red filled
  - **Get in Touch** — Columbia blue outline
- Navbar overlaid at top

### About (`/about`)
- Short bio paragraph: background, personality, where you're from
- **Philosophy subsection**: 3-4 short personal principles displayed as styled cards
  - Left-border columbia blue accent per card
  - Examples (filler): *"Lead by example"*, *"Embrace discomfort"*, *"Serve something greater than yourself"*
- Optional professional photo placeholder (right-aligned on desktop, top on mobile)

### Education (`/education`)
- University of Houston card:
  - B.B.A. Accounting + B.S. Management Information Systems (expected May 2025)
  - Honors College badge
  - Minor: Leadership Studies
  - GPA placeholder
  - Relevant coursework section (placeholder list)
- AFROTC listed as concurrent program with UH (dates, Det number if desired)

### Leadership (`/leadership`)
Two subsections:

**Experience** (vertical timeline)
- Columbia blue vertical timeline line with dot markers
- Dark surface cards per entry
- Each entry: Role Title, Organization, Date Range, 2-3 bullet points
- Entries (filler): AFROTC roles (Flight Commander, etc.), internships, jobs, leadership positions

**Skills** (grouped tag grid)
- Technical skills: columbia blue tags — MIS, Cybersecurity, Accounting, Excel, Python (placeholder)
- Leadership skills: UH red tags — Team Command, Mission Planning, Drill & Ceremonies, etc.
- Soft skills: muted/white tags — Communication, Critical Thinking, Adaptability, etc.

### Certifications & Awards (`/certifications`)
- Card grid layout (2-3 columns desktop, 1 column mobile)
- Each card: certification/award name, issuing organization, date, small icon or badge placeholder
- Example entries (filler): Honors College recognition, AFROTC awards, academic awards, Security+ (placeholder)

### Contact (`/contact`)
- Minimal layout
- Headline: *"Let's connect."*
- Social/contact links as icon buttons: Email, LinkedIn, GitHub
- Simple contact form: Name, Email, Message fields + Submit button (UH red) — form submission handled via Formspree (no backend required, free tier)

---

## Responsiveness

- Mobile-first Tailwind breakpoints
- Navbar collapses to hamburger on mobile
- Timeline stacks vertically on mobile
- Card grids go to single column on mobile

---

## Content Strategy

All content is placeholder/filler at initial build. Real content to be swapped in:
- Resume upload to be provided by owner
- Photo to be provided by owner
- Certifications/awards to be confirmed
- AFROTC role details and dates to be confirmed

---

## Implementation Notes

- Use the **`frontend-design:frontend-design` skill** when building each page component to ensure production-grade, distinctive UI quality
- Apply the skill per page (Home, About, Education, Leadership, Certifications, Contact) and for shared components (Navbar, Footer)

---

## Out of Scope (for now)

- Blog or writing section
- Dynamic backend / CMS
- Authentication
- PDF resume viewer (can be added later as a link to hosted PDF)
- Dark/light mode toggle (dark mode only for now)
