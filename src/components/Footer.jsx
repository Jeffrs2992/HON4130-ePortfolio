export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">© 2026 Japheth. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href="mailto:placeholder@email.com"
            className="text-muted hover:text-columbia-blue transition-colors text-sm"
          >
            Email
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-columbia-blue transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-columbia-blue transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
