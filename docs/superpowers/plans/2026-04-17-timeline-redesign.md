# Timeline Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio so the About Me page hosts a scrollable curated timeline where each entry links to a dedicated detail page, while the Home page and existing section pages remain intact.

**Architecture:** A `timeline.json` data file drives all timeline content. A `TimelineRail` component renders the left-rail timeline on the About Me page, grouping entries by year. A `TimelineEntry` page reads `:id` from the URL and renders one of four type-specific templates (role, milestone, training, award). Tags on detail pages navigate to top-level routes via `tagMeta` in `tagRoutes.js`.

**Tech Stack:** React 18, React Router v6 (HashRouter), Tailwind CSS v3, Vitest + React Testing Library. Node.js at `C:\Users\japhe\AppData\Local\nodejs\node-v22.14.0-win-x64\node.exe` — use full path or prepend to PATH for all commands.

---

## File Map

**Create:**
- `src/data/timeline.json` — all timeline entries as a JSON array
- `src/data/tagRoutes.js` — tag metadata (route + color class per tag)
- `src/components/timeline/TimelineCard.jsx` — single entry card (photo, tags, title, teaser, Explore link)
- `src/components/timeline/YearMarker.jsx` — year anchor dot with label
- `src/components/timeline/TimelineRail.jsx` — full timeline, filters+sorts entries, inserts year markers
- `src/components/timeline/TimelineCard.test.jsx`
- `src/components/timeline/TimelineRail.test.jsx`
- `src/pages/TimelineEntry.jsx` — reads `:id`, picks template by `entry.type`
- `src/pages/TimelineEntry.test.jsx`
- `src/components/timeline/templates/RoleDetail.jsx`
- `src/components/timeline/templates/MilestoneDetail.jsx`
- `src/components/timeline/templates/TrainingDetail.jsx`
- `src/components/timeline/templates/AwardDetail.jsx`

**Modify:**
- `src/App.jsx` — add `/timeline/:id` route, remove `/certifications`
- `src/components/Navbar.jsx` — remove Certifications link, rename About → About Me
- `src/components/Navbar.test.jsx` — update assertions
- `src/pages/About.jsx` — remove Guiding Principles, embed TimelineRail
- `src/pages/About.test.jsx` — update assertions
- `src/pages/Leadership.jsx` — compact philosophy paragraph, update Skills card label
- `src/pages/Leadership.test.jsx` — update assertions
- `src/pages/LeadershipSkills.jsx` — rename heading, add certifications tile grid

**Delete:**
- `src/pages/Certifications.jsx`
- `src/pages/Certifications.test.jsx`

---

## Task 1: Create `src/data/timeline.json`

**Files:**
- Create: `src/data/timeline.json`

- [ ] **Step 1: Write timeline.json**

```json
[
  {
    "id": "commission-2lt-usaf",
    "date": "2026-05-10",
    "type": "milestone",
    "title": "Commission — 2Lt, USAF",
    "organization": "17X Cyberspace Operations",
    "dateRange": "May 2026",
    "tags": ["milestone", "afrotc"],
    "summary": "In May 2026, after four years of AFROTC, I was commissioned as a Second Lieutenant in the United States Air Force, designated as a 17X Cyberspace Operations officer. Everything — the leadership labs, the roles, the late nights — converged into this moment.",
    "bullets": [],
    "photo": null,
    "photos": [],
    "highlight": true
  },
  {
    "id": "bba-graduation-uh",
    "date": "2026-05-09",
    "type": "milestone",
    "title": "B.B.A. Graduation",
    "organization": "University of Houston",
    "dateRange": "May 2026",
    "tags": ["milestone", "education"],
    "summary": "Graduated from the University of Houston with a Bachelor of Business Administration in Accounting and Management Information Systems, completing four years of coursework in the Honors College.",
    "bullets": [],
    "photo": null,
    "photos": [],
    "highlight": true
  },
  {
    "id": "deputy-wing-commander",
    "date": "2026-01",
    "type": "role",
    "title": "Deputy Wing Commander",
    "organization": "AFROTC Det 003",
    "dateRange": "Jan – May 2026",
    "tags": ["afrotc", "leadership"],
    "summary": "As the second-ranking cadet in the Cadet Wing, I worked directly with the Wing Commander to coordinate operations across four squadrons and more than 80 cadets.",
    "bullets": [
      "Served as the principal advisor to the Wing Commander across a cadet wing of 80+ cadets",
      "Coordinated operations across four squadrons, ensuring mission continuity and standards compliance",
      "Represented the Wing Commander at events and briefings when unavailable"
    ],
    "photo": null,
    "photos": [],
    "highlight": true
  },
  {
    "id": "support-squadron-commander",
    "date": "2025-08",
    "type": "role",
    "title": "Support Squadron Commander",
    "organization": "AFROTC Det 003",
    "dateRange": "Aug – Dec 2025",
    "tags": ["afrotc", "leadership"],
    "summary": "Led the Support Squadron, managing administrative operations and logistical coordination for the Cadet Wing during the fall 2025 semester.",
    "bullets": [
      "Commanded a squadron responsible for administrative and support functions across the wing",
      "Managed scheduling, records, and coordination for wing-level training events",
      "Mentored junior cadets on professionalism and military bearing"
    ],
    "photo": null,
    "photos": [],
    "highlight": true
  },
  {
    "id": "cyber-officer",
    "date": "2025-01",
    "type": "role",
    "title": "Cyber Officer",
    "organization": "AFROTC Det 003",
    "dateRange": "Jan – May 2025",
    "tags": ["afrotc", "leadership"],
    "summary": "Served as the Cyber Officer for the Cadet Wing, managing technology-related operations and advising wing leadership on digital tools and information systems.",
    "bullets": [
      "Managed digital communications and information systems for the cadet wing",
      "Advised wing leadership on technology integration for training and operations",
      "Coordinated with university IT on AFROTC-specific systems access"
    ],
    "photo": null,
    "photos": [],
    "highlight": true
  },
  {
    "id": "pwc-start-audit-intern",
    "date": "2024-05",
    "type": "role",
    "title": "START Audit Intern",
    "organization": "PwC",
    "dateRange": "Summer 2024",
    "tags": ["professional", "accounting"],
    "summary": "Spent the summer embedded with audit teams at PwC as part of the START Audit program, learning how a Big Four firm serves clients and what a professional career in accounting looks like on the ground.",
    "bullets": [
      "Assisted senior associates on financial statement audits for mid-market clients",
      "Prepared and reviewed workpapers in line with PCAOB standards",
      "Participated in START cohort workshops on audit methodology and firm culture"
    ],
    "photo": null,
    "photos": [],
    "highlight": true
  },
  {
    "id": "logistics-officer",
    "date": "2024-08",
    "type": "role",
    "title": "Logistics Officer",
    "organization": "AFROTC Det 003",
    "dateRange": "Aug – Dec 2024",
    "tags": ["afrotc", "leadership"],
    "summary": "Served as the Logistics Officer, responsible for coordinating equipment, scheduling, and resources across AFROTC Det 003 training activities.",
    "bullets": [
      "Coordinated equipment accountability and logistics for wing training events",
      "Managed scheduling and resource allocation across squadron activities",
      "Ensured readiness and availability of training materials and gear"
    ],
    "photo": null,
    "photos": [],
    "highlight": true
  },
  {
    "id": "field-training-graduate",
    "date": "2023-06",
    "type": "training",
    "title": "AFROTC Field Training Graduate",
    "organization": "Air Force ROTC",
    "dateRange": "Summer 2023",
    "tags": ["afrotc", "training"],
    "summary": "Completed AFROTC Field Training, a competitive summer encampment that evaluates leadership under pressure and is a required milestone for commissioning.",
    "bullets": [
      "Evaluated on leadership, military bearing, and performance under stress",
      "Competed with cadets from detachments nationwide",
      "Completed as a required milestone on the path to commissioning"
    ],
    "photo": null,
    "photos": [],
    "highlight": true
  },
  {
    "id": "uh-afrotc-start",
    "date": "2022-08",
    "type": "milestone",
    "title": "University of Houston — AFROTC Det 003",
    "organization": "University of Houston",
    "dateRange": "Aug 2022",
    "tags": ["milestone", "education", "afrotc"],
    "summary": "Enrolled at the University of Houston and joined AFROTC Detachment 003, beginning four years of simultaneous academic and military preparation toward a commission in the United States Air Force.",
    "bullets": [],
    "photo": null,
    "photos": [],
    "highlight": true
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/timeline.json
git commit -m "feat: add timeline.json data file"
```

---

## Task 2: Create `src/data/tagRoutes.js`

**Files:**
- Create: `src/data/tagRoutes.js`

- [ ] **Step 1: Write tagRoutes.js**

```js
// tagMeta maps each tag string to its navigation route and Tailwind color classes.
// Add new tags here as they are introduced in timeline.json.
export const tagMeta = {
  afrotc:       { to: '/leadership', colorClass: 'bg-columbia-blue/10 text-columbia-blue' },
  leadership:   { to: '/leadership', colorClass: 'bg-emerald-500/15 text-emerald-400' },
  milestone:    { to: '/about',      colorClass: 'bg-uh-red/10 text-uh-red' },
  professional: { to: '/about',      colorClass: 'bg-yellow-500/15 text-yellow-400' },
  accounting:   { to: '/education',  colorClass: 'bg-yellow-500/15 text-yellow-400' },
  education:    { to: '/education',  colorClass: 'bg-columbia-blue/10 text-columbia-blue' },
  training:     { to: '/leadership', colorClass: 'bg-emerald-500/15 text-emerald-400' },
}

// Fallback for tags not listed above
export const defaultTagColor = 'bg-white/5 text-muted'
```

- [ ] **Step 2: Commit**

```bash
git add src/data/tagRoutes.js
git commit -m "feat: add tagRoutes metadata for tag colors and navigation"
```

---

## Task 3: TimelineCard component + test

**Files:**
- Create: `src/components/timeline/TimelineCard.jsx`
- Create: `src/components/timeline/TimelineCard.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/timeline/TimelineCard.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TimelineCard from './TimelineCard'

const entry = {
  id: 'test-entry',
  title: 'Test Role',
  organization: 'Test Org',
  dateRange: 'Jan – May 2026',
  tags: ['afrotc', 'leadership'],
  summary: 'A short summary of the role.',
  photo: null,
  highlight: true,
}

describe('TimelineCard', () => {
  it('renders title, org, and summary', () => {
    render(<MemoryRouter><TimelineCard entry={entry} /></MemoryRouter>)
    expect(screen.getByText('Test Role')).toBeInTheDocument()
    expect(screen.getByText('Test Org')).toBeInTheDocument()
    expect(screen.getByText('A short summary of the role.')).toBeInTheDocument()
  })

  it('renders all tags', () => {
    render(<MemoryRouter><TimelineCard entry={entry} /></MemoryRouter>)
    expect(screen.getByText('#afrotc')).toBeInTheDocument()
    expect(screen.getByText('#leadership')).toBeInTheDocument()
  })

  it('renders Explore link pointing to /timeline/test-entry', () => {
    render(<MemoryRouter><TimelineCard entry={entry} /></MemoryRouter>)
    const link = screen.getByRole('link', { name: /explore/i })
    expect(link).toHaveAttribute('href', '/timeline/test-entry')
  })

  it('shows photo placeholder when photo is null', () => {
    render(<MemoryRouter><TimelineCard entry={entry} /></MemoryRouter>)
    expect(screen.getByTestId('photo-placeholder')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
cd "c:/Users/japhe/OneDrive/Documents/ProgramsVSClaude" && PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/timeline/TimelineCard.test.jsx
```

Expected: FAIL — `Cannot find module './TimelineCard'`

- [ ] **Step 3: Write TimelineCard.jsx**

```jsx
// src/components/timeline/TimelineCard.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../data/tagRoutes'

export default function TimelineCard({ entry }) {
  const { id, title, organization, dateRange, tags, summary, photo } = entry

  return (
    <div className="pl-1 mb-12">
      {/* Photo */}
      {photo ? (
        <img
          src={photo}
          alt={title}
          className="w-full rounded-lg object-cover mb-3"
          style={{ maxHeight: '260px' }}
        />
      ) : (
        <div
          data-testid="photo-placeholder"
          className="w-full rounded-lg bg-surface border border-white/5 flex items-center justify-center mb-3"
          style={{ height: '160px' }}
        >
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => {
          const meta = tagMeta[tag]
          return (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded font-medium ${meta ? meta.colorClass : defaultTagColor}`}
            >
              #{tag}
            </span>
          )
        })}
      </div>

      {/* Title block */}
      <p className="text-off-white font-bold text-lg leading-snug">{title}</p>
      <p className="text-columbia-blue text-sm mt-0.5">{organization}</p>
      <p className="text-muted text-xs mt-0.5 mb-3">{dateRange}</p>

      {/* Teaser */}
      <p className="text-muted text-sm leading-relaxed mb-3">{summary}</p>

      {/* Explore link */}
      <Link
        to={`/timeline/${id}`}
        className="text-columbia-blue text-sm font-semibold hover:underline"
      >
        Explore →
      </Link>
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/timeline/TimelineCard.test.jsx
```

Expected: 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/timeline/TimelineCard.jsx src/components/timeline/TimelineCard.test.jsx
git commit -m "feat: add TimelineCard component"
```

---

## Task 4: YearMarker component

**Files:**
- Create: `src/components/timeline/YearMarker.jsx`

- [ ] **Step 1: Write YearMarker.jsx**

```jsx
// src/components/timeline/YearMarker.jsx
export default function YearMarker({ year }) {
  return (
    <div className="relative flex items-center gap-3 mb-6 -ml-[25px]">
      <div
        className="w-3 h-3 rounded-full bg-columbia-blue shrink-0"
        style={{ boxShadow: '0 0 0 3px rgba(100, 160, 220, 0.2)' }}
        data-testid="year-marker-dot"
      />
      <span className="text-columbia-blue text-xs font-bold uppercase tracking-[0.15em]">
        {year}
      </span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/timeline/YearMarker.jsx
git commit -m "feat: add YearMarker component"
```

---

## Task 5: TimelineRail component + tests

**Files:**
- Create: `src/components/timeline/TimelineRail.jsx`
- Create: `src/components/timeline/TimelineRail.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/timeline/TimelineRail.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TimelineRail from './TimelineRail'

// Override timeline.json with controlled test data
vi.mock('../../data/timeline.json', () => ({
  default: [
    {
      id: 'entry-a',
      date: '2026-05',
      type: 'milestone',
      title: 'Entry A',
      organization: 'Org A',
      dateRange: 'May 2026',
      tags: ['milestone'],
      summary: 'Summary A',
      photo: null,
      photos: [],
      highlight: true,
    },
    {
      id: 'entry-b',
      date: '2025-08',
      type: 'role',
      title: 'Entry B',
      organization: 'Org B',
      dateRange: 'Aug 2025',
      tags: ['afrotc'],
      summary: 'Summary B',
      photo: null,
      photos: [],
      highlight: true,
    },
    {
      id: 'entry-hidden',
      date: '2025-01',
      type: 'role',
      title: 'Hidden Entry',
      organization: 'Org C',
      dateRange: 'Jan 2025',
      tags: ['afrotc'],
      summary: 'Should not appear',
      photo: null,
      photos: [],
      highlight: false,
    },
  ],
}))

describe('TimelineRail', () => {
  it('renders highlighted entries only', () => {
    render(<MemoryRouter><TimelineRail /></MemoryRouter>)
    expect(screen.getByText('Entry A')).toBeInTheDocument()
    expect(screen.getByText('Entry B')).toBeInTheDocument()
    expect(screen.queryByText('Hidden Entry')).not.toBeInTheDocument()
  })

  it('renders entries in descending date order (newest first)', () => {
    render(<MemoryRouter><TimelineRail /></MemoryRouter>)
    const titles = screen.getAllByText(/Entry [AB]/)
    expect(titles[0].textContent).toBe('Entry A')
    expect(titles[1].textContent).toBe('Entry B')
  })

  it('renders a year marker for each distinct year', () => {
    render(<MemoryRouter><TimelineRail /></MemoryRouter>)
    expect(screen.getByText('2026')).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/timeline/TimelineRail.test.jsx
```

Expected: FAIL — `Cannot find module './TimelineRail'`

- [ ] **Step 3: Write TimelineRail.jsx**

```jsx
// src/components/timeline/TimelineRail.jsx
import timelineData from '../../data/timeline.json'
import TimelineCard from './TimelineCard'
import YearMarker from './YearMarker'

function getYear(dateStr) {
  return dateStr.slice(0, 4)
}

export default function TimelineRail() {
  const entries = [...timelineData]
    .filter((e) => e.highlight)
    .sort((a, b) => b.date.localeCompare(a.date))

  const items = []
  let lastYear = null

  entries.forEach((entry) => {
    const year = getYear(entry.date)
    if (year !== lastYear) {
      items.push({ type: 'year', year, key: `year-${year}` })
      lastYear = year
    }
    items.push({ type: 'entry', entry, key: entry.id })
  })

  return (
    <div className="relative pl-6">
      {/* Vertical rail */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-columbia-blue/20" />

      {items.map((item) => {
        if (item.type === 'year') {
          return <YearMarker key={item.key} year={item.year} />
        }
        return (
          <div key={item.key} className="relative mb-2">
            {/* Entry dot */}
            <div className="absolute -left-[23px] top-[18px] w-2 h-2 rounded-full bg-columbia-blue" />
            <TimelineCard entry={item.entry} />
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/timeline/TimelineRail.test.jsx
```

Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/timeline/TimelineRail.jsx src/components/timeline/TimelineRail.test.jsx
git commit -m "feat: add TimelineRail component with year grouping and highlight filter"
```

---

## Task 6: Detail page templates

**Files:**
- Create: `src/components/timeline/templates/RoleDetail.jsx`
- Create: `src/components/timeline/templates/MilestoneDetail.jsx`
- Create: `src/components/timeline/templates/TrainingDetail.jsx`
- Create: `src/components/timeline/templates/AwardDetail.jsx`

All templates receive a single `entry` prop and a `related` array prop (1–3 entries sharing tags).

- [ ] **Step 1: Write RoleDetail.jsx**

```jsx
// src/components/timeline/templates/RoleDetail.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'

export default function RoleDetail({ entry, related }) {
  const { title, organization, dateRange, tags, summary, photo, photos, bullets } = entry

  return (
    <>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => {
          const meta = tagMeta[tag]
          return (
            <Link
              key={tag}
              to={meta ? meta.to : '/about'}
              className={`text-xs px-2 py-0.5 rounded font-medium hover:opacity-80 transition-opacity ${meta ? meta.colorClass : defaultTagColor}`}
            >
              #{tag}
            </Link>
          )
        })}
      </div>

      {/* Title block */}
      <h1 className="text-off-white text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-columbia-blue text-sm font-medium mt-1">{organization}</p>
      <p className="text-muted text-xs mt-0.5 mb-6">{dateRange}</p>

      {/* Hero photo */}
      {photo ? (
        <img src={photo} alt={title} className="w-full rounded-lg object-cover mb-8" style={{ maxHeight: '340px' }} />
      ) : (
        <div className="w-full rounded-lg bg-surface border border-white/5 flex items-center justify-center mb-8" style={{ height: '200px' }}>
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}

      {/* Narrative */}
      <p className="text-muted text-base leading-relaxed border-l-2 border-columbia-blue/30 pl-4 mb-8">
        {summary}
      </p>

      {/* What I did */}
      {bullets && bullets.length > 0 && (
        <div className="mb-10">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">What I Did</p>
          <ul className="space-y-2">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-muted text-sm">
                <span className="text-columbia-blue shrink-0">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Supporting photo */}
      {photos && photos[0] && (
        <img src={photos[0]} alt={`${title} photo`} className="w-full rounded-lg object-cover mb-10" style={{ maxHeight: '240px' }} />
      )}

      {/* Related */}
      {related && related.length > 0 && (
        <div className="border-t border-white/5 pt-8">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Related</p>
          <div className="space-y-3">
            {related.map((r) => (
              <Link key={r.id} to={`/timeline/${r.id}`} className="block bg-surface rounded-lg p-4 border border-white/5 hover:border-columbia-blue/30 transition-colors">
                <p className="text-off-white font-semibold text-sm">{r.title}</p>
                <p className="text-muted text-xs mt-0.5">{r.dateRange} · Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Write MilestoneDetail.jsx**

```jsx
// src/components/timeline/templates/MilestoneDetail.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'

export default function MilestoneDetail({ entry, related }) {
  const { title, organization, dateRange, tags, summary, photo, photos } = entry

  return (
    <>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => {
          const meta = tagMeta[tag]
          return (
            <Link
              key={tag}
              to={meta ? meta.to : '/about'}
              className={`text-xs px-2 py-0.5 rounded font-medium hover:opacity-80 transition-opacity ${meta ? meta.colorClass : defaultTagColor}`}
            >
              #{tag}
            </Link>
          )
        })}
      </div>

      {/* Title block */}
      <h1 className="text-off-white text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-columbia-blue text-sm font-medium mt-1">{organization}</p>
      <p className="text-muted text-xs mt-0.5 mb-6">{dateRange}</p>

      {/* Hero photo */}
      {photo ? (
        <img src={photo} alt={title} className="w-full rounded-lg object-cover mb-8" style={{ maxHeight: '340px' }} />
      ) : (
        <div className="w-full rounded-lg bg-surface border border-white/5 flex items-center justify-center mb-8" style={{ height: '200px' }}>
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}

      {/* Narrative */}
      <p className="text-muted text-base leading-relaxed border-l-2 border-columbia-blue/30 pl-4 mb-8">
        {summary}
      </p>

      {/* Photo grid */}
      {photos && photos.length > 0 && (
        <div className="mb-10">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">More From This Day</p>
          <div className="grid grid-cols-3 gap-3">
            {photos.map((src, i) => (
              <img key={i} src={src} alt={`${title} photo ${i + 1}`} className="w-full rounded-lg object-cover aspect-square" />
            ))}
          </div>
        </div>
      )}

      {/* Related */}
      {related && related.length > 0 && (
        <div className="border-t border-white/5 pt-8">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Related</p>
          <div className="space-y-3">
            {related.map((r) => (
              <Link key={r.id} to={`/timeline/${r.id}`} className="block bg-surface rounded-lg p-4 border border-white/5 hover:border-columbia-blue/30 transition-colors">
                <p className="text-off-white font-semibold text-sm">{r.title}</p>
                <p className="text-muted text-xs mt-0.5">{r.dateRange} · Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 3: Write TrainingDetail.jsx**

```jsx
// src/components/timeline/templates/TrainingDetail.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'

export default function TrainingDetail({ entry, related }) {
  const { title, organization, dateRange, tags, summary, photo, bullets } = entry

  return (
    <>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => {
          const meta = tagMeta[tag]
          return (
            <Link
              key={tag}
              to={meta ? meta.to : '/about'}
              className={`text-xs px-2 py-0.5 rounded font-medium hover:opacity-80 transition-opacity ${meta ? meta.colorClass : defaultTagColor}`}
            >
              #{tag}
            </Link>
          )
        })}
      </div>

      {/* Title block */}
      <h1 className="text-off-white text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-columbia-blue text-sm font-medium mt-1">{organization}</p>
      <p className="text-muted text-xs mt-0.5 mb-6">{dateRange}</p>

      {/* Hero photo */}
      {photo ? (
        <img src={photo} alt={title} className="w-full rounded-lg object-cover mb-8" style={{ maxHeight: '340px' }} />
      ) : (
        <div className="w-full rounded-lg bg-surface border border-white/5 flex items-center justify-center mb-8" style={{ height: '200px' }}>
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}

      {/* Narrative */}
      <p className="text-muted text-base leading-relaxed border-l-2 border-columbia-blue/30 pl-4 mb-8">
        {summary}
      </p>

      {/* Key takeaways */}
      {bullets && bullets.length > 0 && (
        <div className="mb-10">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Key Takeaways</p>
          <ul className="space-y-2">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-muted text-sm">
                <span className="text-columbia-blue shrink-0">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related */}
      {related && related.length > 0 && (
        <div className="border-t border-white/5 pt-8">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Related</p>
          <div className="space-y-3">
            {related.map((r) => (
              <Link key={r.id} to={`/timeline/${r.id}`} className="block bg-surface rounded-lg p-4 border border-white/5 hover:border-columbia-blue/30 transition-colors">
                <p className="text-off-white font-semibold text-sm">{r.title}</p>
                <p className="text-muted text-xs mt-0.5">{r.dateRange} · Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 4: Write AwardDetail.jsx**

```jsx
// src/components/timeline/templates/AwardDetail.jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'

export default function AwardDetail({ entry, related }) {
  const { title, organization, dateRange, tags, summary, photo } = entry

  return (
    <>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => {
          const meta = tagMeta[tag]
          return (
            <Link
              key={tag}
              to={meta ? meta.to : '/about'}
              className={`text-xs px-2 py-0.5 rounded font-medium hover:opacity-80 transition-opacity ${meta ? meta.colorClass : defaultTagColor}`}
            >
              #{tag}
            </Link>
          )
        })}
      </div>

      {/* Title block */}
      <h1 className="text-off-white text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-columbia-blue text-sm font-medium mt-1">{organization}</p>
      <p className="text-muted text-xs mt-0.5 mb-6">{dateRange}</p>

      {/* Hero photo */}
      {photo ? (
        <img src={photo} alt={title} className="w-full rounded-lg object-cover mb-8" style={{ maxHeight: '340px' }} />
      ) : (
        <div className="w-full rounded-lg bg-surface border border-white/5 flex items-center justify-center mb-8" style={{ height: '200px' }}>
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}

      {/* Narrative */}
      <p className="text-muted text-base leading-relaxed border-l-2 border-columbia-blue/30 pl-4 mb-8">
        {summary}
      </p>

      {/* Related */}
      {related && related.length > 0 && (
        <div className="border-t border-white/5 pt-8">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Related</p>
          <div className="space-y-3">
            {related.map((r) => (
              <Link key={r.id} to={`/timeline/${r.id}`} className="block bg-surface rounded-lg p-4 border border-white/5 hover:border-columbia-blue/30 transition-colors">
                <p className="text-off-white font-semibold text-sm">{r.title}</p>
                <p className="text-muted text-xs mt-0.5">{r.dateRange} · Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/timeline/templates/
git commit -m "feat: add RoleDetail, MilestoneDetail, TrainingDetail, AwardDetail templates"
```

---

## Task 7: TimelineEntry page + tests

**Files:**
- Create: `src/pages/TimelineEntry.jsx`
- Create: `src/pages/TimelineEntry.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// src/pages/TimelineEntry.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import TimelineEntry from './TimelineEntry'

vi.mock('../data/timeline.json', () => ({
  default: [
    {
      id: 'role-entry',
      date: '2026-01',
      type: 'role',
      title: 'Role Entry Title',
      organization: 'Org',
      dateRange: 'Jan 2026',
      tags: ['afrotc'],
      summary: 'Role summary.',
      bullets: ['Did a thing'],
      photo: null,
      photos: [],
      highlight: true,
    },
    {
      id: 'milestone-entry',
      date: '2026-05',
      type: 'milestone',
      title: 'Milestone Entry Title',
      organization: 'Org',
      dateRange: 'May 2026',
      tags: ['milestone'],
      summary: 'Milestone summary.',
      bullets: [],
      photo: null,
      photos: [],
      highlight: true,
    },
  ],
}))

function renderEntry(id) {
  return render(
    <MemoryRouter initialEntries={[`/timeline/${id}`]}>
      <Routes>
        <Route path="/timeline/:id" element={<TimelineEntry />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('TimelineEntry', () => {
  it('renders role entry title and bullets', () => {
    renderEntry('role-entry')
    expect(screen.getByText('Role Entry Title')).toBeInTheDocument()
    expect(screen.getByText('Did a thing')).toBeInTheDocument()
  })

  it('renders milestone entry title', () => {
    renderEntry('milestone-entry')
    expect(screen.getByText('Milestone Entry Title')).toBeInTheDocument()
  })

  it('renders not found for unknown id', () => {
    renderEntry('does-not-exist')
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })

  it('renders back link to /about', () => {
    renderEntry('role-entry')
    expect(screen.getByRole('link', { name: /timeline/i })).toHaveAttribute('href', '/about')
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/TimelineEntry.test.jsx
```

Expected: FAIL — `Cannot find module './TimelineEntry'`

- [ ] **Step 3: Write TimelineEntry.jsx**

```jsx
// src/pages/TimelineEntry.jsx
import { useParams, Link } from 'react-router-dom'
import timelineData from '../data/timeline.json'
import RoleDetail from '../components/timeline/templates/RoleDetail'
import MilestoneDetail from '../components/timeline/templates/MilestoneDetail'
import TrainingDetail from '../components/timeline/templates/TrainingDetail'
import AwardDetail from '../components/timeline/templates/AwardDetail'

const templates = {
  role: RoleDetail,
  milestone: MilestoneDetail,
  training: TrainingDetail,
  award: AwardDetail,
}

function getRelated(entry, allEntries) {
  return allEntries
    .filter((e) => e.id !== entry.id && e.tags.some((t) => entry.tags.includes(t)))
    .slice(0, 3)
}

export default function TimelineEntry() {
  const { id } = useParams()
  const entry = timelineData.find((e) => e.id === id)

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link to="/about" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
          ← Timeline
        </Link>
        <p className="text-muted">Entry not found.</p>
      </div>
    )
  }

  const Template = templates[entry.type] || RoleDetail
  const related = getRelated(entry, timelineData)

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link to="/about" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
        ← Timeline
      </Link>
      <Template entry={entry} related={related} />
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/TimelineEntry.test.jsx
```

Expected: 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/TimelineEntry.jsx src/pages/TimelineEntry.test.jsx
git commit -m "feat: add TimelineEntry page with type-based template routing"
```

---

## Task 8: Update App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx**

Replace the entire file:

```jsx
// src/App.jsx — full file replacement
import { HashRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Leadership from './pages/Leadership'
import LeadershipExperience from './pages/LeadershipExperience'
import LeadershipSkills from './pages/LeadershipSkills'
import LeadershipCommunity from './pages/LeadershipCommunity'
import TimelineEntry from './pages/TimelineEntry'
import Contact from './pages/Contact'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/timeline/:id" element={<TimelineEntry />} />
          <Route path="/education" element={<Education />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/leadership/experience" element={<LeadershipExperience />} />
          <Route path="/leadership/skills" element={<LeadershipSkills />} />
          <Route path="/leadership/community" element={<LeadershipCommunity />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add /timeline/:id route, remove /certifications"
```

---

## Task 9: Update Navbar + test

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Navbar.test.jsx`

- [ ] **Step 1: Update Navbar.test.jsx first**

Replace the file:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Leadership')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('does not render Certifications link', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.queryByText('Certifications')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/Navbar.test.jsx
```

Expected: FAIL — `About Me` not found, `Certifications` still present

- [ ] **Step 3: Update Navbar.jsx**

Change only the `navLinks` array:

```jsx
const navLinks = [
  { to: '/about', label: 'About Me' },
  { to: '/education', label: 'Education' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/contact', label: 'Contact' },
]
```

- [ ] **Step 4: Run test — expect PASS**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/Navbar.test.jsx
```

Expected: 2 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.test.jsx
git commit -m "feat: update navbar — rename About to About Me, remove Certifications"
```

---

## Task 10: Rewrite About.jsx + test

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.test.jsx`

- [ ] **Step 1: Update About.test.jsx first**

Replace the file:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

describe('About', () => {
  it('renders About Me heading', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('does not render Guiding Principles', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.queryByText(/Guiding Principles/i)).not.toBeInTheDocument()
  })

  it('renders the Timeline section heading', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText('Timeline')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/About.test.jsx
```

Expected: FAIL — `Timeline` not found, `Guiding Principles` still present

- [ ] **Step 3: Rewrite About.jsx**

Replace the entire file:

```jsx
import TimelineRail from '../components/timeline/TimelineRail'

export default function About() {
  return (
    <div
      className="max-w-4xl mx-auto px-6 py-20"
      style={{ animation: 'about-fade-in 0.7s ease both' }}
    >
      {/* Section label */}
      <p className="font-mono text-columbia-blue text-xs tracking-widest uppercase mb-3 opacity-70">
        // about
      </p>

      <h1 className="text-4xl md:text-5xl font-bold text-off-white leading-tight">
        About Me
      </h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-8" aria-hidden="true" />

      {/* Bio + photo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
        <div className="md:col-span-2">
          <p className="text-off-white/90 text-base md:text-lg leading-relaxed">
            I&rsquo;m a senior at the University of Houston studying Accounting and
            Management Information Systems in the Honors College. I&rsquo;ve spent the
            last four years in AFROTC and will be commissioning as a 2nd Lieutenant
            in the United States Air Force as a 17X Cyberspace Operations officer.
            Outside of school and ROTC, I&rsquo;m interested in how technology and
            leadership overlap, and how that shows up in both the military and the
            private sector.
          </p>
        </div>
        <div className="md:col-span-1">
          <div className="bg-surface border border-white/10 rounded-xl aspect-square w-full flex items-center justify-center">
            <p className="text-muted text-sm text-center p-4">Photo Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-white/5 pt-12">
        <h2 className="text-off-white text-xl font-semibold mb-2">Timeline</h2>
        <div className="w-10 h-0.5 bg-columbia-blue mb-10" aria-hidden="true" />
        <TimelineRail />
      </div>

      <style>{`
        @keyframes about-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/About.test.jsx
```

Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/About.jsx src/pages/About.test.jsx
git commit -m "feat: rewrite About page — bio + embedded timeline, remove guiding principles"
```

---

## Task 11: Update Leadership.jsx + test

**Files:**
- Modify: `src/pages/Leadership.jsx`
- Modify: `src/pages/Leadership.test.jsx`

- [ ] **Step 1: Update Leadership.test.jsx first**

Replace the file:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Leadership from './Leadership'

describe('Leadership', () => {
  it('renders Leadership heading', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /^Leadership$/i })).toBeInTheDocument()
  })

  it('renders Experience sub-page card', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders Skills & Certifications sub-page card', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument()
  })

  it('renders Community & Service sub-page card', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText('Community & Service')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/Leadership.test.jsx
```

Expected: FAIL — `Skills & Certifications` not found

- [ ] **Step 3: Update Leadership.jsx**

Replace the entire file:

```jsx
import { Link } from 'react-router-dom'

const subPages = [
  {
    to: '/leadership/experience',
    icon: '💼',
    title: 'Experience',
    description: 'Roles, responsibilities, and the teams I\'ve led.',
  },
  {
    to: '/leadership/skills',
    icon: '⚡',
    title: 'Skills & Certifications',
    description: 'Technical, leadership, language capabilities, and credentials.',
  },
  {
    to: '/leadership/community',
    icon: '🌐',
    title: 'Community & Service',
    description: 'How I give back and stay connected.',
  },
]

export default function Leadership() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Leadership</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />

      {/* Philosophy */}
      <p className="text-muted text-base leading-relaxed max-w-2xl mb-16">
        I lead by showing up consistently, learning the craft, and investing in the people around me.
        Credibility is earned through preparation and honesty, not rank or title.
        The goal is always to leave the team better than I found it.
      </p>

      {/* Sub-page navigation */}
      <div className="border-t border-white/5 pt-12">
        <h2 className="text-off-white text-xl font-semibold mb-8">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {subPages.map(({ to, icon, title, description }) => (
            <Link
              key={to}
              to={to}
              className="bg-surface rounded-xl p-6 border border-white/5 hover:border-columbia-blue/40 transition-colors group"
            >
              <span className="text-2xl">{icon}</span>
              <p className="text-off-white font-semibold mt-3 group-hover:text-columbia-blue transition-colors">
                {title}
              </p>
              <p className="text-muted text-sm mt-1 leading-relaxed">{description}</p>
              <p className="text-columbia-blue text-sm mt-4 font-medium">Explore →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/Leadership.test.jsx
```

Expected: 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/Leadership.jsx src/pages/Leadership.test.jsx
git commit -m "feat: update Leadership page — compact philosophy, Skills & Certifications card"
```

---

## Task 12: Update LeadershipSkills.jsx + test

**Files:**
- Modify: `src/pages/LeadershipSkills.jsx`

- [ ] **Step 1: Update LeadershipSkills.jsx**

Add the certifications tile grid below the existing "All Skills" section. Replace the entire file:

```jsx
import { Link } from 'react-router-dom'
import { technicalSkills, leadershipSkills, softSkills } from '../data/skills'
import { certifications } from '../data/certifications'

const highlights = [
  {
    id: 1,
    skill: 'Arabic (MSA)',
    narrative:
      'Developed low-intermediate proficiency in Modern Standard Arabic after spending a summer studying abroad in Morocco under Project GO (Global Officer), a DoD-funded program administered through the University of Maryland. Earned an OPIc score of 1 upon return.',
    tag: 'Language / Study Abroad',
  },
]

const skillGroups = [
  {
    label: 'Technical',
    skills: technicalSkills,
    pillClass:
      'bg-columbia-blue/10 text-columbia-blue border border-columbia-blue/20 text-xs px-3 py-1 rounded-full font-medium',
  },
  {
    label: 'Leadership',
    skills: leadershipSkills,
    pillClass:
      'bg-uh-red/10 text-uh-red border border-uh-red/20 text-xs px-3 py-1 rounded-full font-medium',
  },
  {
    label: 'Core',
    skills: softSkills,
    pillClass:
      'bg-white/5 text-muted border border-white/10 text-xs px-3 py-1 rounded-full font-medium',
  },
]

export default function LeadershipSkills() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/leadership" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
        ← Leadership
      </Link>
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Skills & Certifications</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />

      {/* Featured highlights */}
      <h2 className="text-off-white text-xl font-semibold mb-6">Highlights</h2>
      <div className="space-y-4 mb-12">
        {highlights.map((item) => (
          <div key={item.id} className="bg-surface rounded-xl p-6 border border-columbia-blue/20">
            <div className="flex items-start justify-between gap-4">
              <p className="text-off-white font-bold text-lg">{item.skill}</p>
              <span className="text-xs text-columbia-blue border border-columbia-blue/30 px-2 py-0.5 rounded-full shrink-0">
                {item.tag}
              </span>
            </div>
            <p className="text-muted text-sm mt-3 leading-relaxed">{item.narrative}</p>
          </div>
        ))}
      </div>

      {/* General skill pills */}
      <div className="border-t border-white/5 pt-10 mb-14">
        <h2 className="text-off-white text-xl font-semibold mb-8">All Skills</h2>
        <div className="space-y-6">
          {skillGroups.map(({ label, skills, pillClass }) => (
            <div key={label}>
              <p className="text-muted text-xs uppercase tracking-widest mb-3">{label}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className={pillClass}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Awards */}
      <div className="border-t border-white/5 pt-10">
        <h2 className="text-off-white text-xl font-semibold mb-8">Certifications & Awards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-surface rounded-xl p-5 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <p className="text-off-white font-semibold text-sm">{cert.name}</p>
                <p className="text-muted text-xs mt-1">{cert.issuer}</p>
              </div>
              <p className="text-columbia-blue text-xs mt-3 font-medium">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run the full test suite to verify no regressions**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run
```

Expected: all existing tests PASS (Certifications.test.jsx will still pass at this point since the file hasn't been deleted yet)

- [ ] **Step 3: Commit**

```bash
git add src/pages/LeadershipSkills.jsx
git commit -m "feat: rename Skills to Skills & Certifications, add cert tiles"
```

---

## Task 13: Delete Certifications page + full suite

**Files:**
- Delete: `src/pages/Certifications.jsx`
- Delete: `src/pages/Certifications.test.jsx`

- [ ] **Step 1: Delete the files**

```bash
rm "c:/Users/japhe/OneDrive/Documents/ProgramsVSClaude/src/pages/Certifications.jsx"
rm "c:/Users/japhe/OneDrive/Documents/ProgramsVSClaude/src/pages/Certifications.test.jsx"
```

- [ ] **Step 2: Run the full test suite**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run
```

Expected: all tests PASS. Test count will be lower (Certifications tests removed). No failures.

- [ ] **Step 3: Build to verify no broken imports**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vite/bin/vite.js build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: remove Certifications page — content moved to Skills & Certifications"
```

- [ ] **Step 5: Push to trigger GitHub Pages deploy**

```bash
git push origin main
```