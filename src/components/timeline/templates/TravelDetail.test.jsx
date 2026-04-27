import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TravelDetail from './TravelDetail'

const mockEntry = {
  id: 'morocco-project-go',
  title: 'Morocco',
  organization: 'University of Maryland · Project GO',
  dateRange: 'Summer 2024',
  tags: ['travel', 'study-abroad'],
  blocks: [
    { text: 'A transformative summer studying Arabic in Morocco.' },
    { photos: ['/images/morocco1.jpg', '/images/morocco2.jpg'], caption: 'Marrakech medina' },
  ],
  bullets: ['Earned OPIc score of 1', 'Explored Marrakech'],
  photo: null,
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

  it('renders text blocks', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('A transformative summer studying Arabic in Morocco.')).toBeInTheDocument()
  })

  it('renders photo block images', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    const imgs = screen.getAllByTestId('block-photo')
    expect(imgs.length).toBeGreaterThanOrEqual(2)
  })

  it('renders photo block caption', () => {
    render(<MemoryRouter><TravelDetail entry={mockEntry} related={[]} /></MemoryRouter>)
    expect(screen.getByText('Marrakech medina')).toBeInTheDocument()
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

  it('renders nothing from blocks when blocks is empty', () => {
    const entry = { ...mockEntry, blocks: [] }
    render(<MemoryRouter><TravelDetail entry={entry} related={[]} /></MemoryRouter>)
    expect(screen.queryByText('A transformative summer studying Arabic in Morocco.')).not.toBeInTheDocument()
  })
})