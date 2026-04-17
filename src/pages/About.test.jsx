import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

describe('About', () => {
  it('renders About Me heading', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('does not render Guiding Principles', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.queryByText(/Guiding Principles/i)).not.toBeInTheDocument()
  })

  it('renders the Timeline section heading', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText('Timeline')).toBeInTheDocument()
  })
})