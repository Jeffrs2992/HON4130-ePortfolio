import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  it('renders name and subtitle', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText('Japhe')).toBeInTheDocument()
    expect(screen.getByText(/Cyberspace Operations/i)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText(/View Resume/i)).toBeInTheDocument()
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument()
  })
})
