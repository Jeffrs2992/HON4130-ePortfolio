import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Leadership from './Leadership'

describe('Leadership', () => {
  it('renders Leadership heading', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText('Leadership')).toBeInTheDocument()
  })

  it('renders philosophy paragraph', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/authenticity, continuous learning/i)).toBeInTheDocument()
  })

  it('renders Experience card', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders Skills & Certifications card', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument()
  })
})