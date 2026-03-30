export default function About() {
  const principles = [
    {
      title: 'Integrity First',
      body: 'Integrity is the foundation of trust. Do what is right, legally and morally, even when no one is watching.',
    },
    {
      title: 'Service Before Self',
      body: 'The needs of the nation and the mission come before personal comfort and gain. Leaders put their people first.',
    },
    {
      title: 'Excellence In All We Do',
      body: 'Pursue the highest standards in everything. Continuous improvement is not optional. It is the mission.',
    },
  ]

  return (
    <div
      className="max-w-4xl mx-auto px-6 py-20"
      style={{ animation: 'about-fade-in 0.7s ease both' }}
    >
      {/* Section label — monospace terminal style, matches Home subtitle */}
      <p className="font-mono text-columbia-blue text-xs tracking-widest uppercase mb-3 opacity-70">
        // about
      </p>

      {/* Page heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-off-white leading-tight">
        About Me
      </h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-8" aria-hidden="true" />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        {/* Left — bio (2/3 width) */}
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

        {/* Right — photo placeholder (1/3 width) */}
        <div className="md:col-span-1">
          <div className="bg-surface border border-white/10 rounded-xl aspect-square w-full flex items-center justify-center">
            <p className="text-muted text-sm text-center p-4">Photo Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Philosophy section */}
      <div className="border-t border-white/5 mt-12 pt-10">

        {/* Subheading */}
        <h2 className="text-xl font-bold text-off-white">Guiding Principles</h2>
        <div className="w-10 h-0.5 bg-columbia-blue mt-2 mb-6" aria-hidden="true" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="bg-surface border-l-4 border-columbia-blue rounded-r-xl p-5"
            >
              <p className="text-off-white font-semibold text-sm mb-2">
                {principle.title}
              </p>
              <p className="text-muted text-sm leading-relaxed">{principle.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped fade-in keyframe */}
      <style>{`
        @keyframes about-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
