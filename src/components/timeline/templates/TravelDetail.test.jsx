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