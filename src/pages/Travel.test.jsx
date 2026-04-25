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