function Footer() {
  return (
    <footer className="bg-[#071A33]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Footer Top */}
        <div className="flex flex-col gap-8 border-b border-white/50 pb-8  sm:flex-row sm:items-center sm:justify-between">
          
          {/* Logo */}
          <a href="/" className="shrink-0">
            <img
              src="/Logotype Revisual White.png"
              alt="Revisual Production"
              className="h-6 w-auto"
            />
          </a>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/60">
            <a
              href="/about"
              className="transition hover:text-white"
            >
              About
            </a>

            <a
              href="/services"
              className="transition hover:text-white"
            >
              Services
            </a>

            <a
              href="/portfolio"
              className="transition hover:text-white"
            >
              Portfolio
            </a>

            <a
              href="/blogs"
              className="transition hover:text-white"
            >
              Blogs
            </a>

            <a
              href="/teams"
              className="transition hover:text-white"
            >
              Teams
            </a>

            <a
              href="/contact"
              className="transition hover:text-white"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Copyright */}
          <p className="text-xs text-white/50">
            © 2026 Revisual Production. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex items-center gap-5 text-xs text-white/50">
            <a
              href="#"
              aria-label="Instagram"
              className="transition hover:text-white"
            >
              Instagram
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="transition hover:text-white"
            >
              YouTube
            </a>

            <a
              href="#"
              aria-label="Spotify"
              className="transition hover:text-white"
            >
              Spotify
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer