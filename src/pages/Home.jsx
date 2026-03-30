import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="relative -mt-16 min-h-screen bg-background flex flex-col items-center justify-center text-center overflow-hidden">

      {/* Animated dot-grid background */}
      <div
        className="dot-grid absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial vignette over the dot grid — deepens toward edges for focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, #0D1117 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main content — sits above backgrounds */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center gap-4 px-6"
        style={{ animation: 'home-fade-in 0.9s ease both' }}
      >
        {/* Name — large callsign */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-off-white tracking-widest uppercase"
          style={{ letterSpacing: '0.15em' }}
        >
          Japheth
        </h1>

        {/* Rank stripe — columbia blue decorative rule */}
        <div className="w-16 h-0.5 bg-columbia-blue" aria-hidden="true" />

        {/* Subtitle — monospace terminal readout */}
        <p className="font-mono text-columbia-blue text-sm md:text-base tracking-wide">
          2Lt, USAF&nbsp;&nbsp;|&nbsp;&nbsp;Cyberspace Operations&nbsp;&nbsp;|&nbsp;&nbsp;University of Houston&nbsp;&#39;26
        </p>

        {/* Tagline */}
        <p className="text-muted text-base md:text-lg max-w-xl leading-relaxed mt-1">
          Bridging the gap between technology and leadership, one mission at a time.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 flex-wrap justify-center mt-8">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-uh-red text-white px-6 py-3 rounded-lg font-medium hover:bg-uh-red/90 transition-colors"
          >
            View Resume
          </a>
          <Link
            to="/contact"
            className="border border-columbia-blue text-columbia-blue px-6 py-3 rounded-lg font-medium hover:bg-columbia-blue/10 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Fade-in keyframe — scoped via inline style tag */}
      <style>{`
        @keyframes home-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
