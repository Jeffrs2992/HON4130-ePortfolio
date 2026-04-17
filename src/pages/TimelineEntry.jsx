import { useParams, Link } from 'react-router-dom'
import timelineData from '../data/timeline.json'
import RoleDetail from '../components/timeline/templates/RoleDetail'
import MilestoneDetail from '../components/timeline/templates/MilestoneDetail'
import TrainingDetail from '../components/timeline/templates/TrainingDetail'
import AwardDetail from '../components/timeline/templates/AwardDetail'

const templates = {
  role: RoleDetail,
  milestone: MilestoneDetail,
  training: TrainingDetail,
  award: AwardDetail,
}

function getRelated(entry, allEntries) {
  return allEntries
    .filter((e) => e.id !== entry.id && e.tags.some((t) => entry.tags.includes(t)))
    .slice(0, 3)
}

export default function TimelineEntry() {
  const { id } = useParams()
  const entry = timelineData.find((e) => e.id === id)

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link to="/about" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
          ← Timeline
        </Link>
        <p className="text-muted">Entry not found.</p>
      </div>
    )
  }

  const Template = templates[entry.type] || RoleDetail
  const related = getRelated(entry, timelineData)

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link to="/about" className="text-muted text-sm hover:text-columbia-blue transition-colors mb-8 inline-block">
        ← Timeline
      </Link>
      <Template entry={entry} related={related} />
    </div>
  )
}