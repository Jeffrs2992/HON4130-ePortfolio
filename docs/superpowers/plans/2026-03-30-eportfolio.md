# E-Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page dark-mode e-portfolio for a USAF-commissioning UH senior using React + Vite + React Router v6 + Tailwind CSS.

**Architecture:** Six-page site with React Router v6 client-side routing; shared Navbar/Footer via a PageLayout outlet component; Tailwind CSS with custom color tokens; static JS data files for all content; Formspree for contact form; each page built using the `frontend-design:frontend-design` skill for production-grade UI quality.

**Tech Stack:** React 18, Vite 5, React Router v6, Tailwind CSS v3, Formspree (contact form), Vitest + React Testing Library (tests), Netlify or GitHub Pages (hosting)

---

## File Map

```
/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── public/
│   └── resume-placeholder.pdf
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── test/
│   │   └── setup.js
│   ├── data/
│   │   ├── education.js
│   │   ├── experience.js
│   │   ├── skills.js
│   │   └── certifications.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── layout/
│   │       └── PageLayout.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── About.jsx
│       ├── Education.jsx
│       ├── Leadership.jsx
│       ├── Certifications.jsx
│       └── Contact.jsx
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Scaffold Vite + React project**

Run in `c:/Users/japhe/OneDrive/Documents/ProgramsVSClaude`:
```bash
npm create vite@latest . -- --template react
```
Answer prompts: select "React", then "JavaScript".

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
npx tailwindcss init -p
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite dev server running at `http://localhost:5173` with default React page.

- [ ] **Step 4: Commit scaffold**

```bash
git init
git add .
git commit -m "chore: scaffold React + Vite project"
```

---

## Task 2: Tailwind Config + Color Tokens + Fonts

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Update tailwind.config.js**

Replace the contents of `tailwind.config.js` with:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D1117',
        surface: '#161B22',
        'columbia-blue': '#6DAEDB',
        'uh-red': '#C8102E',
        'off-white': '#F0F6FC',
        muted: '#8B949E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Update src/index.css**

Replace the contents of `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@layer base {
  body {
    @apply bg-background text-off-white font-sans;
  }

  * {
    @apply antialiased;
  }
}

/* CSS-only dot grid animation used on Home page */
.dot-grid {
  background-image: radial-gradient(circle, #6DAEDB22 1px, transparent 1px);
  background-size: 32px 32px;
  animation: grid-drift 25s linear infinite;
}

@keyframes grid-drift {
  0%   { background-position: 0 0; }
  100% { background-position: 32px 32px; }
}
```

- [ ] **Step 3: Add font preconnect to index.html**

In `index.html`, add inside `<head>` before the title:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

- [ ] **Step 4: Verify Tailwind is working**

Replace `src/App.jsx` temporarily:
```jsx
export default function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <h1 className="text-columbia-blue text-4xl font-bold">Color test</h1>
    </div>
  )
}
```
Run `npm run dev`. Expected: dark page with columbia blue heading.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: configure Tailwind with custom color tokens and fonts"
```

---

## Task 3: Vitest + Testing Setup

**Files:**
- Modify: `vite.config.js`
- Create: `src/test/setup.js`

- [ ] **Step 1: Update vite.config.js to include test config**

Replace `vite.config.js` with:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] **Step 2: Create src/test/setup.js**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Add test script to package.json**

In `package.json`, ensure the `"scripts"` section includes:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Run tests to confirm setup works**

```bash
npm test
```
Expected: `No test files found` (no error — setup is correct).

- [ ] **Step 5: Commit**

```bash
git add vite.config.js src/test/setup.js package.json
git commit -m "chore: add Vitest and React Testing Library setup"
```

---

## Task 4: Static Content Data Files

**Files:**
- Create: `src/data/education.js`
- Create: `src/data/experience.js`
- Create: `src/data/skills.js`
- Create: `src/data/certifications.js`

- [ ] **Step 1: Create src/data/education.js**

```js
export const education = {
  school: 'University of Houston',
  location: 'Houston, TX',
  degrees: [
    { type: 'B.B.A.', field: 'Accounting' },
    { type: 'B.S.', field: 'Management Information Systems' },
  ],
  minor: 'Leadership Studies',
  college: 'Honors College',
  graduation: 'May 2025',
  gpa: '3.X / 4.0',
  coursework: [
    'Information Security',
    'Database Management Systems',
    'Financial Accounting',
    'Managerial Accounting',
    'Systems Analysis & Design',
    'Network Administration',
    'Leadership Theory & Practice',
    'Business Law',
    'Cybersecurity Fundamentals',
  ],
}

export const afrotc = {
  program: 'Air Force Reserve Officer Training Corps',
  detachment: 'Detachment 850',
  school: 'University of Houston',
  dateRange: 'Aug 2021 – May 2025',
  commissioning: '2nd Lieutenant, United States Air Force',
  afsc: '17X – Cyberspace Operations',
  description:
    'Completed four years of military officer training alongside a full academic course load. Developed leadership, mission planning, and command skills through weekly labs, field training, and progressive leadership roles within the detachment.',
}
```

- [ ] **Step 2: Create src/data/experience.js**

```js
export const experience = [
  {
    id: 1,
    role: 'Cadet Wing Commander',
    organization: 'AFROTC Det. 850 – University of Houston',
    dateRange: 'Aug 2024 – May 2025',
    bullets: [
      'Led a 120-cadet detachment in weekly physical training, leadership labs, and military instruction.',
      'Coordinated with the Detachment Commander on scheduling, evaluations, and unit readiness reporting.',
      'Served as the primary liaison between cadet leadership and cadre, driving a 95% retention rate.',
    ],
  },
  {
    id: 2,
    role: 'Flight Commander',
    organization: 'AFROTC Det. 850 – University of Houston',
    dateRange: 'Jan 2024 – Aug 2024',
    bullets: [
      'Commanded a 30-cadet flight through daily operations, PT, and training evaluations.',
      'Mentored junior cadets on officer candidate standards, academic performance, and leadership development.',
      'Planned and executed two community service events with 40+ cadet participants.',
    ],
  },
  {
    id: 3,
    role: 'Accounting Intern (Placeholder)',
    organization: 'Company Name, Houston, TX',
    dateRange: 'Summer 2023',
    bullets: [
      'Assisted with financial statement preparation and reconciliation for mid-size clients.',
      'Analyzed accounts payable/receivable data using Excel pivot tables and VLOOKUP formulas.',
      'Shadowed senior accountants in client-facing audit preparation sessions.',
    ],
  },
]
```

- [ ] **Step 3: Create src/data/skills.js**

```js
export const technicalSkills = [
  'Cybersecurity Fundamentals',
  'Network Security',
  'Risk Management',
  'Management Information Systems',
  'SQL / Database Management',
  'Python',
  'Microsoft Excel (Advanced)',
  'Systems Analysis & Design',
  'Financial Accounting',
]

export const leadershipSkills = [
  'Team Command',
  'Mission Planning',
  'Drill & Ceremonies',
  'Performance Evaluations',
  'Training Management',
  'Officer Candidate Standards',
  'Strategic Communication',
]

export const softSkills = [
  'Critical Thinking',
  'Adaptability',
  'Integrity',
  'Communication',
  'Problem Solving',
  'Attention to Detail',
]
```

- [ ] **Step 4: Create src/data/certifications.js**

```js
export const certifications = [
  {
    id: 1,
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'In Progress',
    type: 'certification',
  },
  {
    id: 2,
    name: 'Honors College Scholar',
    issuer: 'University of Houston Honors College',
    date: '2021 – 2025',
    type: 'award',
  },
  {
    id: 3,
    name: "Dean's List",
    issuer: 'University of Houston',
    date: 'Multiple Semesters',
    type: 'award',
  },
  {
    id: 4,
    name: 'AFROTC Arnold Air Society Member',
    issuer: 'Arnold Air Society',
    date: '2022 – 2025',
    type: 'award',
  },
  {
    id: 5,
    name: 'Field Training Graduate',
    issuer: 'Air Force ROTC',
    date: 'Summer 2023',
    type: 'military',
  },
]
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add static content data files"
```

---

## Task 5: PageLayout + Navbar + Footer

**Files:**
- Create: `src/components/layout/PageLayout.jsx`
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Footer.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Write failing test for Navbar**

Create `src/components/Navbar.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Leadership')).toBeInTheDocument()
    expect(screen.getByText('Certifications')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm test
```
Expected: FAIL — `Cannot find module './Navbar'`

- [ ] **Step 3: Create src/components/Navbar.jsx**

```jsx
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/education', label: 'Education' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <NavLink to="/" className="text-off-white font-bold text-lg tracking-tight hover:text-columbia-blue transition-colors">
          Japhe
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors pb-1 border-b-2 ${
                  isActive
                    ? 'text-off-white border-uh-red'
                    : 'text-muted border-transparent hover:text-off-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted hover:text-off-white transition-colors text-xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-off-white' : 'text-muted hover:text-off-white'} transition-colors`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 4: Create src/components/Footer.jsx**

```jsx
export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">© 2025 Japhe. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href="mailto:placeholder@email.com"
            className="text-muted hover:text-columbia-blue transition-colors text-sm"
          >
            Email
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-columbia-blue transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-columbia-blue transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Create src/components/layout/PageLayout.jsx**

```jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function PageLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 6: Update src/App.jsx with router and all routes**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Leadership from './pages/Leadership'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 7: Create stub pages so the router doesn't error**

Create each of the following with a minimal stub:

`src/pages/Home.jsx`:
```jsx
export default function Home() { return <div className="p-8 text-off-white">Home</div> }
```
`src/pages/About.jsx`:
```jsx
export default function About() { return <div className="p-8 text-off-white">About</div> }
```
`src/pages/Education.jsx`:
```jsx
export default function Education() { return <div className="p-8 text-off-white">Education</div> }
```
`src/pages/Leadership.jsx`:
```jsx
export default function Leadership() { return <div className="p-8 text-off-white">Leadership</div> }
```
`src/pages/Certifications.jsx`:
```jsx
export default function Certifications() { return <div className="p-8 text-off-white">Certifications</div> }
```
`src/pages/Contact.jsx`:
```jsx
export default function Contact() { return <div className="p-8 text-off-white">Contact</div> }
```

- [ ] **Step 8: Update src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 9: Run tests — confirm Navbar test passes**

```bash
npm test
```
Expected: PASS — 1 test suite, 1 test passing.

- [ ] **Step 10: Run dev server and verify routing works**

```bash
npm run dev
```
Expected: Dark page with Navbar, navigate to `/about`, `/education`, etc. — stub text appears, active link gets UH red underline.

- [ ] **Step 11: Commit**

```bash
git add src/
git commit -m "feat: add PageLayout, Navbar, Footer, and route stubs"
```

---

## Task 6: Home Page

**Files:**
- Modify: `src/pages/Home.jsx`

> **REQUIRED:** Invoke the `frontend-design:frontend-design` skill before implementing this page. Provide it with the spec below and let it guide the implementation.

**Page spec for frontend-design skill:**
- Full-viewport dark landing (`min-h-screen`, `bg-background`)
- Name "Japhe" displayed large and bold in white (responsive: `text-5xl md:text-7xl lg:text-8xl`)
- Subtitle line: `"2Lt, USAF | Cyberspace Operations | University of Houston '25"` in columbia blue, monospace font
- Short tagline paragraph in muted color (1-2 sentences, filler)
- CSS-only dot grid background (use `.dot-grid` class defined in `index.css`) — full-viewport, positioned absolutely behind content
- Two CTA buttons side by side:
  - **View Resume** — UH red filled (`bg-uh-red text-white hover:bg-uh-red/90`)
  - **Get in Touch** — Columbia blue outline (`border border-columbia-blue text-columbia-blue hover:bg-columbia-blue/10`)
- Content centered vertically and horizontally (`flex flex-col items-center justify-center text-center`)
- The `pt-16` from PageLayout already accounts for the fixed Navbar — set `Home` to `-mt-16 min-h-screen` so it is truly full viewport

- [ ] **Step 1: Write failing smoke test**

Create `src/pages/Home.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  it('renders name and subtitle', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText('Japhe')).toBeInTheDocument()
    expect(screen.getByText(/Cyberspace Operations/i)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText(/View Resume/i)).toBeInTheDocument()
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm test
```
Expected: FAIL — test content not found in stub.

- [ ] **Step 3: Invoke frontend-design skill and implement Home.jsx**

Invoke `frontend-design:frontend-design` with the page spec above. Implement the result in `src/pages/Home.jsx`.

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```
Expected: PASS — all tests green.

- [ ] **Step 5: Visual check in browser**

```bash
npm run dev
```
Navigate to `/`. Expected: full-viewport dark landing with dot grid, large name, columbia blue subtitle, two CTA buttons.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "feat: implement Home page"
```

---

## Task 7: About Page

**Files:**
- Modify: `src/pages/About.jsx`

> **REQUIRED:** Invoke the `frontend-design:frontend-design` skill before implementing this page.

**Page spec for frontend-design skill:**
- Page max-width `max-w-4xl mx-auto px-6 py-20`
- Section heading: `"About Me"` — large, white, with a short columbia blue underline accent
- Two-column layout on desktop: left = text content, right = photo placeholder (gray square with "Photo Coming Soon" text, aspect-ratio square, rounded-lg)
- Bio paragraph: filler text about a senior at UH studying Accounting + MIS, serving in AFROTC, commissioning into the USAF as a Cyberspace Operations officer. Passionate about the intersection of technology, leadership, and service.
- **Philosophy section** below bio:
  - Subheading: `"Guiding Principles"`
  - 3 philosophy cards in a responsive grid (`grid grid-cols-1 md:grid-cols-3 gap-4`)
  - Each card: `bg-surface`, `border-l-4 border-columbia-blue`, `rounded-r-lg p-5`
  - Filler principles: `"Lead by example, not by title."` / `"Embrace discomfort — growth lives there."` / `"Serve something greater than yourself."`

- [ ] **Step 1: Write failing smoke test**

Create `src/pages/About.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

describe('About', () => {
  it('renders the about heading', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText(/About Me/i)).toBeInTheDocument()
  })

  it('renders philosophy section', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText(/Guiding Principles/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm test
```
Expected: FAIL.

- [ ] **Step 3: Invoke frontend-design skill and implement About.jsx**

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

- [ ] **Step 5: Visual check**

```bash
npm run dev
```
Navigate to `/about`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/About.jsx src/pages/About.test.jsx
git commit -m "feat: implement About page"
```

---

## Task 8: Education Page

**Files:**
- Modify: `src/pages/Education.jsx`

> **REQUIRED:** Invoke the `frontend-design:frontend-design` skill before implementing this page.

**Page spec for frontend-design skill:**
- Import `education` and `afrotc` from `../data/education`
- Page max-width `max-w-4xl mx-auto px-6 py-20`
- Section heading: `"Education"` with columbia blue accent
- **UH card** (`bg-surface rounded-xl p-8 mb-6`):
  - University name large and bold with a small UH Honors College badge (text badge: `bg-columbia-blue/10 text-columbia-blue text-xs px-2 py-1 rounded`)
  - Two degree pills side by side: `bg-surface border border-white/10 rounded px-3 py-1 text-sm`
  - Minor + graduation date in muted text
  - GPA row: label in muted, value in white
  - **Relevant Coursework** subsection: coursework items as small tag pills (`bg-background text-muted text-xs px-2 py-1 rounded border border-white/5`)
- **AFROTC card** below (`bg-surface rounded-xl p-8 border-l-4 border-uh-red`):
  - Program name + detachment
  - Date range in muted
  - Commissioning info in columbia blue bold
  - AFSC in white
  - Description paragraph in muted

- [ ] **Step 1: Write failing smoke test**

Create `src/pages/Education.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Education from './Education'

describe('Education', () => {
  it('renders University of Houston', () => {
    render(<MemoryRouter><Education /></MemoryRouter>)
    expect(screen.getByText(/University of Houston/i)).toBeInTheDocument()
  })

  it('renders AFROTC section', () => {
    render(<MemoryRouter><Education /></MemoryRouter>)
    expect(screen.getByText(/Air Force Reserve Officer Training Corps/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm test
```

- [ ] **Step 3: Invoke frontend-design skill and implement Education.jsx**

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

- [ ] **Step 5: Visual check**

Navigate to `/education`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Education.jsx src/pages/Education.test.jsx
git commit -m "feat: implement Education page"
```

---

## Task 9: Leadership Page

**Files:**
- Modify: `src/pages/Leadership.jsx`

> **REQUIRED:** Invoke the `frontend-design:frontend-design` skill before implementing this page.

**Page spec for frontend-design skill:**
- Import `experience` from `../data/experience`, `technicalSkills`, `leadershipSkills`, `softSkills` from `../data/skills`
- Page max-width `max-w-4xl mx-auto px-6 py-20`
- Section heading: `"Leadership"` with columbia blue accent

**Experience subsection (vertical timeline):**
- Subheading: `"Experience"`
- Left-side columbia blue vertical line (`border-l-2 border-columbia-blue ml-3`)
- Each `experience` entry is a card connected to the timeline:
  - A columbia blue dot on the left (`w-3 h-3 rounded-full bg-columbia-blue -ml-[7px]`)
  - Card to the right: `bg-surface rounded-xl p-6 ml-6 mb-6`
  - Role title bold white, organization in columbia blue, date range in muted
  - Bullet points as `<ul>` with `text-muted text-sm` and `list-disc ml-4`

**Skills subsection:**
- Subheading: `"Skills"` with spacing above
- Three groups, each with a label and tag pills:
  - **Technical** — tags with `bg-columbia-blue/10 text-columbia-blue border border-columbia-blue/20`
  - **Leadership** — tags with `bg-uh-red/10 text-uh-red border border-uh-red/20`
  - **Core** — tags with `bg-white/5 text-muted border border-white/10`
- Tags: `text-xs px-3 py-1 rounded-full font-medium`

- [ ] **Step 1: Write failing smoke test**

Create `src/pages/Leadership.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Leadership from './Leadership'

describe('Leadership', () => {
  it('renders experience heading', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Experience/i)).toBeInTheDocument()
  })

  it('renders skills heading', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Skills/i)).toBeInTheDocument()
  })

  it('renders at least one experience entry', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Cadet Wing Commander/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm test
```

- [ ] **Step 3: Invoke frontend-design skill and implement Leadership.jsx**

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

- [ ] **Step 5: Visual check**

Navigate to `/leadership`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Leadership.jsx src/pages/Leadership.test.jsx
git commit -m "feat: implement Leadership page"
```

---

## Task 10: Certifications & Awards Page

**Files:**
- Modify: `src/pages/Certifications.jsx`

> **REQUIRED:** Invoke the `frontend-design:frontend-design` skill before implementing this page.

**Page spec for frontend-design skill:**
- Import `certifications` from `../data/certifications`
- Page max-width `max-w-4xl mx-auto px-6 py-20`
- Section heading: `"Certifications & Awards"` with columbia blue accent
- Card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- Each card (`bg-surface rounded-xl p-6`):
  - Type badge top-right corner:
    - `certification` → columbia blue badge
    - `award` → UH red badge
    - `military` → muted badge
  - Name: white bold
  - Issuer: muted text
  - Date: muted small text, bottom of card

- [ ] **Step 1: Write failing smoke test**

Create `src/pages/Certifications.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Certifications from './Certifications'

describe('Certifications', () => {
  it('renders page heading', () => {
    render(<MemoryRouter><Certifications /></MemoryRouter>)
    expect(screen.getByText(/Certifications & Awards/i)).toBeInTheDocument()
  })

  it('renders certification entries', () => {
    render(<MemoryRouter><Certifications /></MemoryRouter>)
    expect(screen.getByText(/Honors College Scholar/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm test
```

- [ ] **Step 3: Invoke frontend-design skill and implement Certifications.jsx**

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

- [ ] **Step 5: Visual check**

Navigate to `/certifications`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Certifications.jsx src/pages/Certifications.test.jsx
git commit -m "feat: implement Certifications & Awards page"
```

---

## Task 11: Contact Page

**Files:**
- Modify: `src/pages/Contact.jsx`

> **REQUIRED:** Invoke the `frontend-design:frontend-design` skill before implementing this page.

**Page spec for frontend-design skill:**
- Page max-width `max-w-2xl mx-auto px-6 py-20 text-center`
- Large heading: `"Let's connect."` — white, bold
- Short subline in muted: `"Whether you're a recruiter, colleague, or fellow cadet — my inbox is open."`
- **Social links row** (centered, `flex gap-6 justify-center my-8`):
  - Email icon link → `mailto:placeholder@email.com`
  - LinkedIn icon link → `https://linkedin.com`
  - GitHub icon link → `https://github.com`
  - Style: `text-muted hover:text-columbia-blue transition-colors text-sm flex items-center gap-2`
  - Use text labels with simple inline SVG icons or emoji for now (no icon library dependency)
- **Contact form** below (`text-left mt-10`):
  - Fields: Name, Email, Message (textarea)
  - Field style: `w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-off-white placeholder:text-muted focus:outline-none focus:border-columbia-blue transition-colors`
  - Submit button: `bg-uh-red text-white px-8 py-3 rounded-lg font-medium hover:bg-uh-red/90 transition-colors w-full`
  - Form `action` attribute set to `https://formspree.io/f/REPLACE_WITH_FORM_ID` and `method="POST"`
  - Note in a comment above the form: `{/* Replace REPLACE_WITH_FORM_ID with your Formspree form ID from formspree.io */}`

- [ ] **Step 1: Write failing smoke test**

Create `src/pages/Contact.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact'

describe('Contact', () => {
  it("renders the connect heading", () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByText(/Let's connect/i)).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```bash
npm test
```

- [ ] **Step 3: Invoke frontend-design skill and implement Contact.jsx**

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

- [ ] **Step 5: Visual check**

Navigate to `/contact`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Contact.jsx src/pages/Contact.test.jsx
git commit -m "feat: implement Contact page"
```

---

## Task 12: Deploy Setup

**Files:**
- Modify: `vite.config.js`
- Create: `.github/workflows/deploy.yml` (optional, for GitHub Pages CI)

- [ ] **Step 1: Choose hosting target**

Pick one:
- **Netlify** (simplest): drag-and-drop `dist/` folder at netlify.com, or connect GitHub repo
- **GitHub Pages**: requires `base` config in vite and a deploy workflow

- [ ] **Step 2 (Netlify path): Build and deploy**

```bash
npm run build
```
Expected: `dist/` folder created. Upload `dist/` to Netlify via netlify.com/drop.

- [ ] **Step 2 (GitHub Pages path): Configure vite base and deploy workflow**

Update `vite.config.js` — add `base`:
```js
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',   // replace with your GitHub repo name
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 3: Run final build and test**

```bash
npm test && npm run build
```
Expected: All tests pass. `dist/` generated with no errors.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: add deploy configuration"
```

---

## Content Swap Checklist (post-build)

Once live, replace placeholders with real content:

- [ ] Replace name `"Japhe"` in Navbar with full name if desired
- [ ] Update `src/data/education.js` — fill in real GPA, coursework
- [ ] Update `src/data/experience.js` — fill in real AFROTC roles and dates, real internship
- [ ] Update `src/data/certifications.js` — add real certs/awards as earned
- [ ] Add real `public/resume.pdf` and update the **View Resume** button `href`
- [ ] Register at formspree.io and replace `REPLACE_WITH_FORM_ID` in Contact.jsx
- [ ] Add real photo to `public/` and update About page photo src
- [ ] Update Footer email, LinkedIn, and GitHub links
- [ ] Update Navbar brand name if using full name
