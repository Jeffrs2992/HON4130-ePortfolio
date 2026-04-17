import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LeadershipSkills from './LeadershipSkills'

describe('LeadershipSkills', () => {
  it('renders Skills & Certifications heading', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument()
  })

  it('renders Certifications & Awards section', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByText('Certifications & Awards')).toBeInTheDocument()
  })

  it('renders CompTIA Security+ certification tile', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByText('CompTIA Security+')).toBeInTheDocument()
  })

  it('renders back link to /leadership', () => {
    render(<MemoryRouter><LeadershipSkills /></MemoryRouter>)
    expect(screen.getByText('← Leadership')).toBeInTheDocument()
  })
})