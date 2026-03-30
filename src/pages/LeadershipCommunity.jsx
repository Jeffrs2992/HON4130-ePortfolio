import { Link } from 'react-router-dom'

export default function LeadershipCommunity() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/leadership" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
        ← Leadership
      </Link>
      <h1 className="text-off-white text-3xl font-bold tracking-tight">Community & Service</h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-10" />
      <p className="text-muted text-sm">Content coming soon.</p>
    </div>
  )
}
