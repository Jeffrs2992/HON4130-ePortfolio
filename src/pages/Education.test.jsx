import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Education from './Education'

describe('Education', () => {
  it('renders University of Houston', () => {
    render(<MemoryRouter><Education /></MemoryRouter>)
    expect(screen.getByText(/University of Houston/i)).toBeInTheDocument()
  })

  it('renders AFROTC section', () => {
    render(<MemoryRouter><Education /></MemoryRouter>)
    expect(screen.getByText(/Air Force Reserve Officer Training Corps/i)).toBeInTheDocument()
  })
})
