# Travel Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/travel` top-level nav page with a photo card grid, travel detail pages reusing the existing `/timeline/:id` route, and travel entries integrated into the About Me timeline.

**Architecture:** Travel entries are added to `timeline.json` with `type: "travel"`. The `/travel` page filters that data and renders a `TravelCard` grid. Detail pages use the existing `/timeline/:id` route dispatching to a new `TravelDetail` template. Travel entries with `highlight: true` automatically surface on the About Me timeline with no code changes.

**Tech Stack:** React 18, Vite 5, React Router v6 (HashRouter), Tailwind CSS v3, Vitest + React Testing Library

**Test command:** `PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run <file>`

**Build command:** `PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vite/bin/vite.js build`

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Modify | `src/data/timeline.json` | Add 4 travel entries |
| Modify | `src/data/tagRoutes.js` | Add travel, study-abroad, road-trip tags |
| Create | `src/components/travel/TravelCard.jsx` | Card component for travel grid |
| Create | `src/components/travel/TravelCard.test.jsx` | Tests for TravelCard |
| Create | `src/components/timeline/templates/TravelDetail.jsx` | Detail page template for travel entries |
| Create | `src/components/timeline/templates/TravelDetail.test.jsx` | Tests for TravelDetail |
| Create | `src/pages/Travel.jsx` | Travel page — filters data, renders card grid |
| Create | `src/pages/Travel.test.jsx` | Tests for Travel page |
| Modify | `src/App.jsx` | Add `/travel` route |
| Modify | `src/pages/TimelineEntry.jsx` | Add TravelDetail to templates, type-aware back link |
| Modify | `src/pages/TimelineEntry.test.jsx` | Add travel entry test + back link test |
| Modify | `src/components/Navbar.jsx` | Add Travel link between About Me and Education |
| Modify | `src/components/Navbar.test.jsx` | Assert Travel link present |
| Modify | `src/components/timeline/TimelineRail.test.jsx` | Assert travel entries appear on rail |

---

### Task 1: Add travel entries to timeline.json and tagRoutes.js

**Files:**
- Modify: `src/data/timeline.json`
- Modify: `src/data/tagRoutes.js`

- [ ] **Step 1: Add 4 travel entries to timeline.json**

Insert these 4 entries into `src/data/timeline.json` in the correct descending-date positions. The full updated array (showing insertion points relative to existing entries) — insert:
- `virginia-north-carolina` (2025-03) after `support-squadron-commander` (2025-08), before `cyber-officer` (2025-01)
- `national-parks-road-trip` (2024-12) after `cyber-officer` (2025-01), before `seattle-boston` (2024-11)
- `seattle-boston` (2024-11) after `national-parks-road-trip` (2024-12), before `logistics-officer` (2024-08)
- `morocco-project-go` (2024-06) after `logistics-officer` (2024-08), before `pwc-start-audit-intern` (2024-05)

Add these four JSON objects at the correct positions:

```json
{
  "id": "virginia-north-carolina",
  "date": "2025-03",
  "type": "travel",
  "title": "Virginia + North Carolina",
  "organization": "USA",
  "dateRange": "Spring 2025",
  "tags": ["travel"],
  "summary": "A spring break road trip through Virginia and North Carolina.",
  "narrative": "",
  "bullets": [],
  "photo": null,
  "photos": [],
  "highlight": true
},
{
  "id": "national-parks-road-trip",
  "date": "2024-12",
  "type": "travel",
  "title": "14 National Parks",
  "organization": "USA",
  "dateRange": "Winter 2024",
  "tags": ["travel", "road-trip"],
  "summary": "A winter break road trip through 14 national parks across the American West.",
  "narrative": "",
  "bullets": [],
  "photo": null,
  "photos": [],
  "highlight": true
},
{
  "id": "seattle-boston",
  "date": "2024-11",
  "type": "travel",
  "title": "Seattle + Boston",
  "organization": "USA",
  "dateRange": "Thanksgiving 2024",
  "tags": ["travel"],
  "summary": "Thanksgiving break trips to Seattle and Boston.",
  "narrative": "",
  "bullets": [],
  "photo": null,
  "photos": [],
  "highlight": true
},
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
    "Completed DoD Project GO language immersion program",
    "Traveled to Marrakech, Fes, and the Atlas Mountains"
  ],
  "photo": null,
  "photos": [],
  "highlight": true
}
```

- [ ] **Step 2: Add travel tags to tagRoutes.js**

In `src/data/tagRoutes.js`, add these three entries inside the `tagMeta` object (after the existing `training` entry):

```js
  travel:          { to: '/travel', colorClass: 'bg-columbia-blue/10 text-columbia-blue' },
  'study-abroad':  { to: '/travel', colorClass: 'bg-emerald-500/15 text-emerald-400' },
  'road-trip':     { to: '/travel', colorClass: 'bg-yellow-500/15 text-yellow-400' },
```

- [ ] **Step 3: Commit**

```bash
git add src/data/timeline.json src/data/tagRoutes.js
git commit -m "feat: add travel entries to timeline.json and travel tags to tagRoutes"
```

---

### Task 2: TravelCard component

**Files:**
- Create: `src/components/travel/TravelCard.jsx`
- Create: `src/components/travel/TravelCard.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/travel/TravelCard.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TravelCard from './TravelCard'

const mockEntry = {
  id: 'morocco-project-go',
  title: 'Morocco',
  organization: 'University of Maryland · Project GO',
  dateRange: 'Summer 2024',
  tags: ['travel', 'study-abroad'],
  summary: 'A summer in Morocco.',
  photo: null,
  photos: [],
  highlight: true,
  type: 'travel',
  date: '2024-06',
  narrative: '',
  bullets: [],
}

describe('TravelCard', () => {
  it('renders title, organization, and dateRange', () => {
    render(<MemoryRouter><TravelCard entry={mockEntry} /></MemoryRouter>)
    expect(screen.getByText('Morocco')).toBeInTheDocument()
    expect(screen.getByText('University of Maryland · Project GO')).toBeInTheDocument()
    expect(screen.getByText('Summer 2024')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<MemoryRouter><TravelCard entry={mockEntry} /></MemoryRouter>)
    expect(screen.getByText('#travel')).toBeInTheDocument()
    expect(screen.getByText('#study-abroad')).toBeInTheDocument()
  })

  it('renders Explore link to /timeline/:id', () => {
    render(<MemoryRouter><TravelCard entry={mockEntry} /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /explore/i })).toHaveAttribute('href', '/timeline/morocco-project-go')
  })

  it('renders photo placeholder when photo is null', () => {
    render(<MemoryRouter><TravelCard entry={mockEntry} /></MemoryRouter>)
    expect(screen.getByTestId('photo-placeholder')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/travel/TravelCard.test.jsx
```

Expected: FAIL — `TravelCard` not found.

- [ ] **Step 3: Write the component**

Create `src/components/travel/TravelCard.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../data/tagRoutes'

export default function TravelCard({ entry }) {
  const { id, title, organization, dateRange, tags, photo } = entry

  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-columbia-blue/40 transition-colors">
      {photo ? (
        <img
          src={photo}
          alt={title}
          className="w-full object-cover"
          style={{ height: '180px' }}
        />
      ) : (
        <div
          data-testid="photo-placeholder"
          className="w-full bg-surface border-b border-white/5 flex items-center justify-center"
          style={{ height: '180px' }}
        >
          <span className="text-muted text-xs">Photo Coming Soon</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
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
        <p className="text-off-white font-bold text-base leading-snug">{title}</p>
        <p className="text-muted text-xs mt-1">{organization}</p>
        <p className="text-muted text-xs mt-0.5 mb-4">{dateRange}</p>
        <Link
          to={`/timeline/${id}`}
          className="text-columbia-blue text-sm font-semibold hover:underline"
        >
          Explore →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/travel/TravelCard.test.jsx
```

Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/travel/TravelCard.jsx src/components/travel/TravelCard.test.jsx
git commit -m "feat: add TravelCard component"
```

---

### Task 3: TravelDetail template

**Files:**
- Create: `src/components/timeline/templates/TravelDetail.jsx`
- Create: `src/components/timeline/templates/TravelDetail.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/timeline/templates/TravelDetail.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TravelDetail from './TravelDetail'

const mockEntry = {
  id: 'morocco-project-go',
  title: 'Morocco',
  organization: 'University of Maryland · Project GO',
  dateRange: 'Summer 2024',
  tags: ['travel', 'study-abroad'],
  narrative: 'A transformative summer studying Arabic in Morocco.',
  bullets: ['Earned OPIc score of 1', 'Explored Marrakech'],
  photo: null,
  photos: ['/images/morocco1.jpg', '/images/morocco2.jpg'],
  type: 'travel',
  date: '2024-06',
  summary: 'A summer in Morocco.',
  highlight: true,
}

describe('TravelDetail', () => {
  it('renders title, organization, dateRange, and tags', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('Morocco')).toBeInTheDocument()
    expect(screen.getByText('University of Maryland · Project GO')).toBeInTheDocument()
    expect(screen.getByText('Summer 2024')).toBeInTheDocument()
    expect(screen.getByText('#travel')).toBeInTheDocument()
  })

  it('renders narrative when present', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('A transformative summer studying Arabic in Morocco.')).toBeInTheDocument()
  })

  it('renders Highlights section and bullets when present', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('Highlights')).toBeInTheDocument()
    expect(screen.getByText('Earned OPIc score of 1')).toBeInTheDocument()
  })

  it('renders Photos section when photos are present', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('Photos')).toBeInTheDocument()
    const imgs = screen.getAllByRole('img')
    expect(imgs.length).toBeGreaterThanOrEqual(2)
  })

  it('omits narrative when narrative is empty', () => {
    const entry = { ...mockEntry, narrative: '' }
    render(<MemoryRouter><TravelDetail entry={entry} related={[]} /></MemoryRouter>)
    expect(screen.queryByText('A transformative summer studying Arabic in Morocco.')).not.toBeInTheDocument()
  })

  it('omits Highlights section when bullets is empty', () => {
    const entry = { ...mockEntry, bullets: [] }
    render(<MemoryRouter><TravelDetail entry={entry} related={[]} /></MemoryRouter>)
    expect(screen.queryByText('Highlights')).not.toBeInTheDocument()
  })

  it('omits Photos section when photos is empty', () => {
    const entry = { ...mockEntry, photos: [] }
    render(<MemoryRouter><TravelDetail entry={entry} related={[]} /></MemoryRouter>)
    expect(screen.queryByText('Photos')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/timeline/templates/TravelDetail.test.jsx
```

Expected: FAIL — `TravelDetail` not found.

- [ ] **Step 3: Write the component**

Create `src/components/timeline/templates/TravelDetail.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { tagMeta, defaultTagColor } from '../../../data/tagRoutes'

export default function TravelDetail({ entry, related }) {
  const { title, organization, dateRange, tags, narrative, photo, photos, bullets } = entry

  return (
    <>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => {
          const meta = tagMeta[tag]
          return (
            <Link
              key={tag}
              to={meta ? meta.to : '/travel'}
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

      {/* Hero photo — omit if null */}
      {photo && (
        <img
          src={photo}
          alt={title}
          className="w-full rounded-lg object-cover mb-8"
          style={{ maxHeight: '340px' }}
        />
      )}

      {/* Narrative — omit if empty */}
      {narrative && (
        <p className="text-muted text-base leading-relaxed border-l-2 border-columbia-blue/30 pl-4 mb-8">
          {narrative}
        </p>
      )}

      {/* Highlights — omit if empty */}
      {bullets && bullets.length > 0 && (
        <div className="mb-10">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Highlights</p>
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

      {/* Photo gallery — omit if empty */}
      {photos && photos.length > 0 && (
        <div className="mb-10">
          <p className="text-columbia-blue text-xs font-bold uppercase tracking-widest mb-4">Photos</p>
          <div className="grid grid-cols-3 gap-3">
            {photos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${title} photo ${i + 1}`}
                className="w-full rounded-lg object-cover"
                style={{ height: '120px' }}
              />
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
              <Link
                key={r.id}
                to={`/timeline/${r.id}`}
                className="block bg-surface rounded-lg p-4 border border-white/5 hover:border-columbia-blue/30 transition-colors"
              >
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

- [ ] **Step 4: Run test to verify it passes**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/timeline/templates/TravelDetail.test.jsx
```

Expected: 7 passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/timeline/templates/TravelDetail.jsx src/components/timeline/templates/TravelDetail.test.jsx
git commit -m "feat: add TravelDetail template"
```

---

### Task 4: Travel page

**Files:**
- Create: `src/pages/Travel.jsx`
- Create: `src/pages/Travel.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `src/pages/Travel.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Travel from './Travel'

vi.mock('../data/timeline.json', () => ({
  default: [
    {
      id: 'morocco-project-go',
      type: 'travel',
      title: 'Morocco',
      organization: 'University of Maryland · Project GO',
      dateRange: 'Summer 2024',
      date: '2024-06',
      tags: ['travel', 'study-abroad'],
      summary: 'A summer in Morocco.',
      narrative: '',
      bullets: [],
      photo: null,
      photos: [],
      highlight: true,
    },
    {
      id: 'national-parks-road-trip',
      type: 'travel',
      title: '14 National Parks',
      organization: 'USA',
      dateRange: 'Winter 2024',
      date: '2024-12',
      tags: ['travel', 'road-trip'],
      summary: 'A winter road trip.',
      narrative: '',
      bullets: [],
      photo: null,
      photos: [],
      highlight: true,
    },
    {
      id: 'deputy-wing-commander',
      type: 'role',
      title: 'Deputy Wing Commander',
      organization: 'AFROTC Det 003',
      dateRange: 'Jan – May 2026',
      date: '2026-01',
      tags: ['afrotc', 'leadership'],
      summary: 'A leadership role.',
      narrative: '',
      bullets: [],
      photo: null,
      photos: [],
      highlight: true,
    },
  ],
}))

describe('Travel', () => {
  it('renders Travel heading', () => {
    render(<MemoryRouter><Travel /></MemoryRouter>)
    expect(screen.getByText('Travel')).toBeInTheDocument()
  })

  it('renders all travel entries', () => {
    render(<MemoryRouter><Travel /></MemoryRouter>)
    expect(screen.getByText('Morocco')).toBeInTheDocument()
    expect(screen.getByText('14 National Parks')).toBeInTheDocument()
  })

  it('excludes non-travel entries', () => {
    render(<MemoryRouter><Travel /></MemoryRouter>)
    expect(screen.queryByText('Deputy Wing Commander')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/Travel.test.jsx
```

Expected: FAIL — `Travel` not found.

- [ ] **Step 3: Write the component**

Create `src/pages/Travel.jsx`:

```jsx
import timelineData from '../data/timeline.json'
import TravelCard from '../components/travel/TravelCard'

export default function Travel() {
  const trips = [...timelineData]
    .filter((e) => e.type === 'travel')
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="font-mono text-columbia-blue text-xs tracking-widest uppercase mb-3 opacity-70">// travel</p>
      <h1 className="text-4xl md:text-5xl font-bold text-off-white leading-tight">Travel</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-4" aria-hidden="true" />
      <p className="text-muted text-base mb-12">Places I've been — and more to come.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trips.map((entry) => (
          <TravelCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/Travel.test.jsx
```

Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Travel.jsx src/pages/Travel.test.jsx
git commit -m "feat: add Travel page with card grid"
```

---

### Task 5: Wire routing — App.jsx + TimelineEntry.jsx

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/pages/TimelineEntry.jsx`
- Modify: `src/pages/TimelineEntry.test.jsx`

- [ ] **Step 1: Add /travel route to App.jsx**

In `src/App.jsx`, add the Travel import and route:

```jsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Travel from './pages/Travel'
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
          <Route path="/travel" element={<Travel />} />
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

- [ ] **Step 2: Update TimelineEntry.jsx — add TravelDetail, type-aware back link**

Replace `src/pages/TimelineEntry.jsx` with:

```jsx
import { useParams, Link } from 'react-router-dom'
import timelineData from '../data/timeline.json'
import RoleDetail from '../components/timeline/templates/RoleDetail'
import MilestoneDetail from '../components/timeline/templates/MilestoneDetail'
import TrainingDetail from '../components/timeline/templates/TrainingDetail'
import AwardDetail from '../components/timeline/templates/AwardDetail'
import TravelDetail from '../components/timeline/templates/TravelDetail'

const templates = {
  role: RoleDetail,
  milestone: MilestoneDetail,
  training: TrainingDetail,
  award: AwardDetail,
  travel: TravelDetail,
}

const backLinks = {
  travel: { to: '/travel', label: '← Travel' },
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
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link to="/about" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
          ← Timeline
        </Link>
        <p className="text-muted">Entry not found.</p>
      </div>
    )
  }

  const Template = templates[entry.type] || RoleDetail
  const related = getRelated(entry, timelineData)
  const back = backLinks[entry.type] || { to: '/about', label: '← Timeline' }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link to={back.to} className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
        {back.label}
      </Link>
      <Template entry={entry} related={related} />
    </div>
  )
}
```

- [ ] **Step 3: Update TimelineEntry.test.jsx — add travel entry + back link tests**

Replace `src/pages/TimelineEntry.test.jsx` with:

```jsx
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
      narrative: '',
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
      narrative: '',
      bullets: [],
      photo: null,
      photos: [],
      highlight: true,
    },
    {
      id: 'travel-entry',
      date: '2024-06',
      type: 'travel',
      title: 'Travel Entry Title',
      organization: 'Somewhere',
      dateRange: 'Summer 2024',
      tags: ['travel'],
      summary: 'A trip.',
      narrative: 'It was great.',
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

  it('renders travel entry using TravelDetail', () => {
    renderEntry('travel-entry')
    expect(screen.getByText('Travel Entry Title')).toBeInTheDocument()
    expect(screen.getByText('It was great.')).toBeInTheDocument()
  })

  it('renders not found for unknown id', () => {
    renderEntry('does-not-exist')
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })

  it('renders back link to /about for non-travel entries', () => {
    renderEntry('role-entry')
    expect(screen.getByRole('link', { name: /timeline/i })).toHaveAttribute('href', '/about')
  })

  it('renders back link to /travel for travel entries', () => {
    renderEntry('travel-entry')
    expect(screen.getByRole('link', { name: /← travel/i })).toHaveAttribute('href', '/travel')
  })
})
```

- [ ] **Step 4: Run tests**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/pages/TimelineEntry.test.jsx
```

Expected: 6 passed.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/pages/TimelineEntry.jsx src/pages/TimelineEntry.test.jsx
git commit -m "feat: add /travel route, wire TravelDetail template, type-aware back link"
```

---

### Task 6: Update Navbar

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Navbar.test.jsx`

- [ ] **Step 1: Add Travel to Navbar.jsx**

In `src/components/Navbar.jsx`, update the `navLinks` array:

```js
const navLinks = [
  { to: '/about', label: 'About Me' },
  { to: '/travel', label: 'Travel' },
  { to: '/education', label: 'Education' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/contact', label: 'Contact' },
]
```

No other changes needed — the existing render logic handles it.

- [ ] **Step 2: Update Navbar.test.jsx**

Replace `src/components/Navbar.test.jsx` with:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Travel')).toBeInTheDocument()
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

- [ ] **Step 3: Run tests**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/Navbar.test.jsx
```

Expected: 2 passed.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.test.jsx
git commit -m "feat: add Travel link to navbar"
```

---

### Task 7: Update TimelineRail test for travel entries

**Files:**
- Modify: `src/components/timeline/TimelineRail.test.jsx`

- [ ] **Step 1: Add travel entry to mock data and assert it appears**

Replace `src/components/timeline/TimelineRail.test.jsx` with:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import TimelineRail from './TimelineRail'

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
      narrative: '',
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
      narrative: '',
      photo: null,
      photos: [],
      highlight: true,
    },
    {
      id: 'entry-travel',
      date: '2024-06',
      type: 'travel',
      title: 'Morocco',
      organization: 'University of Maryland · Project GO',
      dateRange: 'Summer 2024',
      tags: ['travel', 'study-abroad'],
      summary: 'A summer in Morocco.',
      narrative: '',
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
      narrative: '',
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

  it('renders travel entries with highlight:true on the rail', () => {
    render(<MemoryRouter><TimelineRail /></MemoryRouter>)
    expect(screen.getByText('Morocco')).toBeInTheDocument()
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

- [ ] **Step 2: Run tests**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run src/components/timeline/TimelineRail.test.jsx
```

Expected: 4 passed.

- [ ] **Step 3: Commit**

```bash
git add src/components/timeline/TimelineRail.test.jsx
git commit -m "test: assert travel entries appear on About Me timeline rail"
```

---

### Task 8: Full suite, build, and push

- [ ] **Step 1: Run full test suite**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vitest/vitest.mjs run
```

Expected: All test files pass. Count will be higher than before (new files added in Tasks 2–4, 7).

- [ ] **Step 2: Production build**

```bash
PATH="$PATH:/c/Users/japhe/AppData/Local/nodejs/node-v22.14.0-win-x64" node ./node_modules/vite/bin/vite.js build
```

Expected: `✓ built in <N>ms` with no errors.

- [ ] **Step 3: Push to GitHub**

```bash
git push origin main
```

GitHub Actions will deploy to GitHub Pages automatically.