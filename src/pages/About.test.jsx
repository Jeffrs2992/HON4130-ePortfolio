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
