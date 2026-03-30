import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Leadership from './Leadership'

describe('Leadership', () => {
  it('renders experience heading', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Experience/i)).toBeInTheDocument()
  })

  it('renders skills heading', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Skills/i)).toBeInTheDocument()
  })

  it('renders at least one experience entry', () => {
    render(<MemoryRouter><Leadership /></MemoryRouter>)
    expect(screen.getByText(/Deputy Wing Commander/i)).toBeInTheDocument()
  })
})
