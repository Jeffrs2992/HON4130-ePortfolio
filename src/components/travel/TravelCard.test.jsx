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
