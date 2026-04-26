// tagMeta maps each tag string to its navigation route and Tailwind color classes.
// Add new tags here as they are introduced in timeline.json.
export const tagMeta = {
  afrotc:       { to: '/leadership', colorClass: 'bg-columbia-blue/10 text-columbia-blue' },
  leadership:   { to: '/leadership', colorClass: 'bg-emerald-500/15 text-emerald-400' },
  milestone:    { to: '/about',      colorClass: 'bg-uh-red/10 text-uh-red' },
  professional: { to: '/about',      colorClass: 'bg-yellow-500/15 text-yellow-400' },
  accounting:   { to: '/leadership/skills', colorClass: 'bg-yellow-500/15 text-yellow-400' },
  education:    { to: '/leadership/skills', colorClass: 'bg-columbia-blue/10 text-columbia-blue' },
  training:     { to: '/leadership', colorClass: 'bg-emerald-500/15 text-emerald-400' },
  travel:          { to: '/travel', colorClass: 'bg-columbia-blue/10 text-columbia-blue' },
  'study-abroad':  { to: '/travel', colorClass: 'bg-emerald-500/15 text-emerald-400' },
  'road-trip':     { to: '/travel', colorClass: 'bg-yellow-500/15 text-yellow-400' },
}

// Fallback for tags not listed above
export const defaultTagColor = 'bg-white/5 text-muted'