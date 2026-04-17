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