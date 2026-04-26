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

  it('renders Education & Credentials card', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText('Education & Credentials')).toBeInTheDocument()
  })
})