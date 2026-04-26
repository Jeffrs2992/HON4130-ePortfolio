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
