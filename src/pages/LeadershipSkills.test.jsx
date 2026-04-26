import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LeadershipSkills from './LeadershipSkills'

describe('LeadershipSkills', () => {
  it('renders Education & Credentials heading', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByText('Education & Credentials')).toBeInTheDocument()
  })

  it('renders University of Houston card', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'University of Houston' })).toBeInTheDocument()
  })

  it('renders AFROTC card', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByText(/Air Force Reserve Officer Training Corps/i)).toBeInTheDocument()
  })

  it('renders Certifications & Awards section', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByText('Certifications & Awards')).toBeInTheDocument()
  })

  it('renders back link to /leadership', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByText('← Leadership')).toBeInTheDocument()
  })
})