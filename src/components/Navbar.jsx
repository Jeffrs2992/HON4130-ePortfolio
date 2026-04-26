import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
  { to: '/about', label: 'About Me' },
  { to: '/travel', label: 'Travel' },
  { to: '/education', label: 'Education' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <NavLink to="/" className="text-off-white font-bold text-lg tracking-tight hover:text-columbia-blue transition-colors">
          Japheth
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors pb-1 border-b-2 ${
                  isActive
                    ? 'text-off-white border-uh-red'
                    : 'text-muted border-transparent hover:text-off-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted hover:text-off-white transition-colors text-xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-off-white' : 'text-muted hover:text-off-white'} transition-colors`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
