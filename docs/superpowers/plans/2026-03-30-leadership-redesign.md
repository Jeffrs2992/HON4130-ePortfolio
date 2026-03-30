# Leadership Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the single Leadership page into a hub page + three sub-pages (Experience, Skills, Community) using nested React Router routes.

**Architecture:** The existing `/leadership` route becomes a hub page with a philosophy section and sub-page nav cards. Three new nested routes (`/leadership/experience`, `/leadership/skills`, `/leadership/community`) hold the content currently on Leadership.jsx plus new content. No new data files — existing `experience.js` and `skills.js` are used as-is.

**Tech Stack:** React, React Router v6 (HashRouter, nested Routes), Tailwind CSS, Vitest + React Testing Library

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/App.jsx` | Modify | Add three nested routes under `/leadership` |
| `src/pages/Leadership.jsx` | Modify | Hub page: philosophy pillars + sub-page nav cards |
| `src/pages/LeadershipExperience.jsx` | Create | Timeline from experience.js (moved from Leadership.jsx) |
| `src/pages/LeadershipSkills.jsx` | Create | Featured highlight cards + skill pill groups |
| `src/pages/LeadershipCommunity.jsx` | Create | Placeholder page |
| `src/pages/Leadership.test.jsx` | Modify | Update assertions to match new hub page content |

---

### Task 1: Add nested routes in App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx routes**

Replace the current `/leadership` route with a parent route and three nested child routes:

```jsx
import { HashRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Leadership from './pages/Leadership'
import LeadershipExperience from './pages/LeadershipExperience'
import LeadershipSkills from './pages/LeadershipSkills'
import LeadershipCommunity from './pages/LeadershipCommunity'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/leadership/experience" element={<LeadershipExperience />} />
          <Route path="/leadership/skills" element={<LeadershipSkills />} />
          <Route path="/leadership/community" element={<LeadershipCommunity />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
```

- [ ] **Step 2: Commit (app will error until sub-page files are created — that's fine, commit the routing intent)**

```bash
git add src/App.jsx
git commit -m "feat: add nested leadership sub-routes"
```

---

### Task 2: Create LeadershipExperience.jsx

**Files:**
- Create: `src/pages/LeadershipExperience.jsx`

- [ ] **Step 1: Create the file with the timeline extracted from the current Leadership.jsx**

```jsx
import { experience } from '../data/experience'

export default function LeadershipExperience() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Experience</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />

      <div className="relative pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-columbia-blue/30" />

        {experience.map((entry) => (
          <div key={entry.id} className="relative mb-6">
            <div className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-columbia-blue top-6" />

            <div className="bg-surface rounded-xl p-6 ml-4">
              <p className="text-off-white font-bold text-lg">{entry.role}</p>
              <p className="text-columbia-blue text-sm font-medium mt-0.5">{entry.organization}</p>
              <p className="text-muted text-xs mt-1">{entry.dateRange}</p>

              <ul className="mt-4 space-y-1">
                {entry.bullets.map((bullet, i) => (
                  <li key={i} className="text-muted text-sm flex gap-2">
                    <span className="text-columbia-blue shrink-0">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/LeadershipExperience.jsx
git commit -m "feat: add LeadershipExperience sub-page"
```

---

### Task 3: Create LeadershipCommunity.jsx (placeholder)

**Files:**
- Create: `src/pages/LeadershipCommunity.jsx`

- [ ] **Step 1: Create the placeholder file**

```jsx
export default function LeadershipCommunity() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Community & Service</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />
      <p className="text-muted text-sm">Content coming soon.</p>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/LeadershipCommunity.jsx
git commit -m "feat: add LeadershipCommunity placeholder sub-page"
```

---

### Task 4: Create LeadershipSkills.jsx

**Files:**
- Create: `src/pages/LeadershipSkills.jsx`

- [ ] **Step 1: Create the file with featured highlights + pill groups**

```jsx
import { technicalSkills, leadershipSkills, softSkills } from '../data/skills'

const highlights = [
  {
    id: 1,
    skill: 'Arabic',
    narrative:
      'Developed low-intermediate proficiency after spending a summer studying abroad in Morocco under Project GO (Global Officer), a DoD-funded program administered through the University of Maryland. Earned an OPIc score of 1 upon return.',
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
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Skills</h1>
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
      <div className="border-t border-white/5 pt-10">
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
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/LeadershipSkills.jsx
git commit -m "feat: add LeadershipSkills sub-page with Arabic highlight"
```

---

### Task 5: Redesign Leadership.jsx as hub page

**Files:**
- Modify: `src/pages/Leadership.jsx`

- [ ] **Step 1: Replace the entire file with the hub page**

```jsx
import { Link } from 'react-router-dom'

const pillars = [
  {
    word: 'Authenticity',
    body: 'Leadership starts with knowing who you are. I lead as myself — openly, consistently, and without pretense. People follow those they trust, and trust is built through honesty and transparency over time.',
  },
  {
    word: 'Competency',
    body: 'A leader earns credibility through their craft. Continuous learning, domain mastery, and the discipline to prepare thoroughly are what allow you to make sound decisions under pressure and give those you lead reason to follow.',
  },
  {
    word: 'Growth',
    body: 'The goal isn\'t to stay where you are — it\'s to leave people and organizations better than you found them. I actively seek challenge, embrace discomfort, and invest in developing the people around me.',
  },
]

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
    title: 'Skills',
    description: 'Technical, leadership, and language capabilities.',
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
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-14" />

      {/* Philosophy pillars */}
      <div className="space-y-16 mb-20">
        {pillars.map(({ word, body }) => (
          <div key={word} className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
            <p className="text-5xl font-bold text-columbia-blue/30 leading-none shrink-0 w-full sm:w-64">
              {word}
            </p>
            <p className="text-muted text-base leading-relaxed pt-1">{body}</p>
          </div>
        ))}
      </div>

      {/* Sub-page navigation cards */}
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

- [ ] **Step 2: Commit**

```bash
git add src/pages/Leadership.jsx
git commit -m "feat: redesign Leadership as hub page with philosophy and sub-page cards"
```

---

### Task 6: Update Leadership.test.jsx

**Files:**
- Modify: `src/pages/Leadership.test.jsx`

The old tests check for "Experience", "Skills", and "Deputy Wing Commander" — all content that no longer lives on the hub page. Replace with assertions that match the new hub content.

- [ ] **Step 1: Replace the test file**

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Leadership from './Leadership'

describe('Leadership hub', () => {
  it('renders the page heading', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Leadership/i })).toBeInTheDocument()
  })

  it('renders all three philosophy pillars', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Authenticity/i)).toBeInTheDocument()
    expect(screen.getByText(/Competency/i)).toBeInTheDocument()
    expect(screen.getByText(/Growth/i)).toBeInTheDocument()
  })

  it('renders sub-page navigation cards', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Experience/i)).toBeInTheDocument()
    expect(screen.getByText(/Skills/i)).toBeInTheDocument()
    expect(screen.getByText(/Community & Service/i)).toBeInTheDocument()
  })

  it('links to the correct sub-page routes', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /Experience/i })).toHaveAttribute('href', '/leadership/experience')
    expect(screen.getByRole('link', { name: /Skills/i })).toHaveAttribute('href', '/leadership/skills')
    expect(screen.getByRole('link', { name: /Community/i })).toHaveAttribute('href', '/leadership/community')
  })
})
```

- [ ] **Step 2: Run tests**

```bash
npm test
```

Expected: all tests pass (green).

- [ ] **Step 3: Commit**

```bash
git add src/pages/Leadership.test.jsx
git commit -m "test: update Leadership tests for hub page redesign"
```
