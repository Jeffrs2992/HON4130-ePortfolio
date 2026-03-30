import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Certifications from './Certifications'

describe('Certifications', () => {
  it('renders page heading', () => {
    render(<MemoryRouter><Certifications /></MemoryRouter>)
    expect(screen.getByText(/Certifications & Awards/i)).toBeInTheDocument()
  })

  it('renders certification entries', () => {
    render(<MemoryRouter><Certifications /></MemoryRouter>)
    expect(screen.getByText(/Field Training Graduate/i)).toBeInTheDocument()
  })
})
