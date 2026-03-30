import { Link } from 'react-router-dom'

const pillars = [
  {
    word: 'Authenticity',
    body: 'Leadership starts with knowing who you are. I lead as myself — openly, consistently, and without pretense. People follow those they trust, and trust is built through honesty and transparency over time.',
  },
  {
    word: 'Competency',
    body: 'A leader earns credibility through their craft. Continuous learning, domain mastery, and the discipline to prepare thoroughly are what allow you to make sound decisions under pressure and give those you lead reason to follow.',
  },
  {
    word: 'Growth',
    body: 'The goal isn\'t to stay where you are — it\'s to leave people and organizations better than you found them. I actively seek challenge, embrace discomfort, and invest in developing the people around me.',
  },
]

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
    title: 'Skills',
    description: 'Technical, leadership, and language capabilities.',
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
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-14" />

      {/* Philosophy pillars */}
      <div className="space-y-16 mb-20">
        {pillars.map(({ word, body }) => (
          <div key={word} className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
            <p className="text-5xl font-bold text-columbia-blue/30 leading-none shrink-0 w-full sm:w-64">
              {word}
            </p>
            <p className="text-muted text-base leading-relaxed pt-1">{body}</p>
          </div>
        ))}
      </div>

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
