import { Link } from 'react-router-dom'

const subPages = [
  {
    to: '/leadership/experience',
    icon: '💼',
    title: 'Experience',
    description: 'Roles, responsibilities, and the teams I\'ve led.',
  },
  {
    to: '/leadership/skills',
    icon: '⚡',
    title: 'Skills & Certifications',
    description: 'Technical, leadership, language capabilities, and credentials.',
  },
  {
    to: '/leadership/community',
    icon: '🌐',
    title: 'Community & Service',
    description: 'How I give back and stay connected.',
  },
]

export default function Leadership() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Leadership</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-8" />

      {/* Philosophy */}
      <p className="text-muted text-base leading-relaxed mb-16 max-w-2xl">
        I believe effective leadership is built on authenticity, continuous learning, and a genuine
        investment in the people around you. Four years of AFROTC and hands-on roles in logistics,
        support, and cyber operations have shaped how I think about leading — stay honest, stay
        competent, and always leave things better than you found them.
      </p>

      {/* Sub-page navigation cards */}
      <div className="border-t border-white/5 pt-12">
        <h2 className="text-off-white text-xl font-semibold mb-8">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {subPages.map(({ to, icon, title, description }) => (
            <Link
              key={to}
              to={to}
              className="bg-surface rounded-xl p-6 border border-white/5 hover:border-columbia-blue/40 transition-colors group"
            >
              <span className="text-2xl">{icon}</span>
              <p className="text-off-white font-semibold mt-3 group-hover:text-columbia-blue transition-colors">
                {title}
              </p>
              <p className="text-muted text-sm mt-1 leading-relaxed">{description}</p>
              <p className="text-columbia-blue text-sm mt-4 font-medium">Explore →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
