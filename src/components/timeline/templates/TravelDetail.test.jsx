import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TravelDetail from './TravelDetail'

const mockEntry = {
  id: 'morocco-project-go',
  title: 'Morocco',
  organization: 'University of Maryland · Project GO',
  dateRange: 'Summer 2025',
  tags: ['travel', 'study-abroad'],
  paragraphs: [
    'A transformative summer studying Arabic in Morocco.',
    'Nearly a year later I still think about it.',
  ],
  bullets: ['Earned OPIc score of 1', 'Explored Marrakech'],
  photos: ['/images/morocco/medina.jpg', '/images/morocco/atlas.jpg'],
  photo: null,
  type: 'travel',
  date: '2025-06',
  summary: 'A summer in Morocco.',
  highlight: true,
}

describe('TravelDetail', () => {
  it('renders title, organization, dateRange, and tags', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('Morocco')).toBeInTheDocument()
    expect(screen.getByText('University of Maryland · Project GO')).toBeInTheDocument()
    expect(screen.getByText('Summer 2025')).toBeInTheDocument()
    expect(screen.getByText('#travel')).toBeInTheDocument()
  })

  it('renders essay paragraphs', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('A transformative summer studying Arabic in Morocco.')).toBeInTheDocument()
    expect(screen.getByText('Nearly a year later I still think about it.')).toBeInTheDocument()
  })

  it('renders gallery thumbnails when photos present', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getAllByTestId('gallery-thumb').length).toBe(2)
  })

  it('renders Highlights section when bullets present', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('Highlights')).toBeInTheDocument()
    expect(screen.getByText('Earned OPIc score of 1')).toBeInTheDocument()
  })

  it('omits Highlights when bullets is empty', () => {
    const entry = { ...mockEntry, bullets: [] }
    render(<MemoryRouter><TravelDetail entry={entry} related={[]} /></MemoryRouter>)
    expect(screen.queryByText('Highlights')).not.toBeInTheDocument()
  })

  it('omits gallery when photos is empty', () => {
    const entry = { ...mockEntry, photos: [] }
    render(<MemoryRouter><TravelDetail entry={entry} related={[]} /></MemoryRouter>)
    expect(screen.queryByTestId('gallery-thumb')).not.toBeInTheDocument()
  })

  it('renders nothing from paragraphs when paragraphs is empty', () => {
    const entry = { ...mockEntry, paragraphs: [] }
    render(<MemoryRouter><TravelDetail entry={entry} related={[]} /></MemoryRouter>)
    expect(screen.queryByText('A transformative summer studying Arabic in Morocco.')).not.toBeInTheDocument()
  })
})