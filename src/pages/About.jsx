import TimelineRail from '../components/timeline/TimelineRail'
import { imgSrc } from '../utils/imgSrc'

const HEADSHOT = imgSrc('headshot.jpg')

export default function About() {
  return (
    <div
      className="max-w-4xl mx-auto px-6 py-20"
      style={{ animation: 'about-fade-in 0.7s ease both' }}
    >
      {/* Section label */}
      <p className="font-mono text-columbia-blue text-xs tracking-widest uppercase mb-3 opacity-70">
        // about
      </p>

      <h1 className="text-4xl md:text-5xl font-bold text-off-white leading-tight">
        About Me
      </h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-8" aria-hidden="true" />

      {/* Bio + photo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
        <div className="md:col-span-2">
          <p className="text-off-white/90 text-base md:text-lg leading-relaxed">
            I&rsquo;m a senior at the University of Houston studying Accounting and
            Management Information Systems in the Honors College. I&rsquo;ve spent the
            last four years in AFROTC and will be commissioning as a 2nd Lieutenant
            in the United States Air Force as a 17X Cyberspace Operations officer.
            Outside of school and ROTC, I&rsquo;m interested in how technology and
            leadership overlap, and how that shows up in both the military and the
            private sector.
          </p>
        </div>
        <div className="md:col-span-1">
          <img
            src={HEADSHOT}
            alt="Japheth Silva"
            className="rounded-xl w-full object-cover object-top aspect-square"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
          />
          <div className="bg-surface border border-white/10 rounded-xl aspect-square w-full items-center justify-center hidden">
            <p className="text-muted text-sm text-center p-4">Photo Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-white/5 pt-12">
        <h2 className="text-off-white text-xl font-semibold mb-2">Timeline</h2>
        <div className="w-10 h-0.5 bg-columbia-blue mb-10" aria-hidden="true" />
        <TimelineRail />
      </div>

      <style>{`
        @keyframes about-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}