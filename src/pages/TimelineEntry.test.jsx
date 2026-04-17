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