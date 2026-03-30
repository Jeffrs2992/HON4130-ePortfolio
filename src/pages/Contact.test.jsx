import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact'

describe('Contact', () => {
  it("renders the connect heading", () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByText(/Let's connect/i)).toBeInTheDocument()
  })

  it('renders the contact form fields', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })
})
