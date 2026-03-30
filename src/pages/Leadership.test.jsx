import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Leadership from './Leadership'

describe('Leadership hub', () => {
  it('renders the page heading', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Leadership/i })).toBeInTheDocument()
  })

  it('renders all three philosophy pillars', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Authenticity/i)).toBeInTheDocument()
    expect(screen.getByText(/Competency/i)).toBeInTheDocument()
    expect(screen.getByText(/Growth/i)).toBeInTheDocument()
  })

  it('renders sub-page navigation cards', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Experience/i)).toBeInTheDocument()
    expect(screen.getByText(/Skills/i)).toBeInTheDocument()
    expect(screen.getByText(/Community & Service/i)).toBeInTheDocument()
  })

  it('links to the correct sub-page routes', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /Experience/i })).toHaveAttribute('href', '/leadership/experience')
    expect(screen.getByRole('link', { name: /Skills/i })).toHaveAttribute('href', '/leadership/skills')
    expect(screen.getByRole('link', { name: /Community/i })).toHaveAttribute('href', '/leadership/community')
  })
})
