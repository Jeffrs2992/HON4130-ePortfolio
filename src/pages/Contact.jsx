export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-off-white">
        Let&apos;s connect.
      </h1>
      <div className="w-16 h-0.5 bg-columbia-blue mt-2 mb-6 mx-auto" />
      <p className="text-muted text-base md:text-lg max-w-lg mx-auto">
        Whether you&apos;re a recruiter, colleague, or fellow cadet &mdash; my inbox is open.
      </p>

      {/* Social links */}
      <div className="flex gap-8 justify-center my-10">
        {/* Email */}
        <a
          href="mailto:placeholder@email.com"
          className="text-muted hover:text-columbia-blue transition-colors text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <polyline points="2,4 12,13 22,4" />
          </svg>
          Email
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-columbia-blue transition-colors text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="7" y="17" fontSize="11" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">in</text>
          </svg>
          LinkedIn
        </a>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-columbia-blue transition-colors text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          GitHub
        </a>
      </div>

      {/* Contact form */}
      <div className="text-left mt-2">
        {/* Replace REPLACE_WITH_FORM_ID with your Formspree form ID from formspree.io */}
        <form
          action="https://formspree.io/f/REPLACE_WITH_FORM_ID"
          method="POST"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-muted text-sm mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-off-white placeholder:text-muted focus:outline-none focus:border-columbia-blue transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-muted text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-off-white placeholder:text-muted focus:outline-none focus:border-columbia-blue transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-muted text-sm mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Your message..."
                className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-off-white placeholder:text-muted focus:outline-none focus:border-columbia-blue transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-uh-red text-white px-8 py-3 rounded-lg font-medium hover:bg-uh-red/90 transition-colors mt-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
