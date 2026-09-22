import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-[#071A33]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <a href="/" onClick={closeMenu}>
          <img
            className="h-4 w-auto"
            src="/Logotype Revisual White.png"
            alt="Revisual Production"/>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/about"
            className="text-sm text-white/70 transition hover:text-white">
            About
          </a>
          <a
            href="/services"
            className="text-sm text-white/70 transition hover:text-white">
            Services
          </a>
          <a
            href="/portfolio"
            className="text-sm text-white/70 transition hover:text-white">
            Portfolio
          </a>
          <a
            href="/blog"
            className="text-sm text-white/70 transition hover:text-white">
            Blogs
          </a>

          <a
            href="/teams"
            className="text-sm text-white/70 transition hover:text-white">
            Teams
          </a>
          <a
            href="/contact"
            className="text-sm text-white/70 transition hover:text-white">
            Contact
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}>

          {isMenuOpen ? (
            <span className="text-3xl font-light leading-none">×</span>
          ) : (
            <div className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
            </div>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#071A33]/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="/about"
              onClick={closeMenu}
              className="text-sm text-white/70 transition hover:text-white">
              About
            </a>
            <a
              href="/services"
              onClick={closeMenu}
              className="text-sm text-white/70 transition hover:text-white">
              Services
            </a>
            <a
              href="/portfolio"
              onClick={closeMenu}
              className="text-sm text-white/70 transition hover:text-white">
              Portfolio
            </a>
            <a
              href="/blog"
              onClick={closeMenu}
              className="text-sm text-white/70 transition hover:text-white">
              Blogs
            </a>
            <a
              href="/teams"
              onClick={closeMenu}
              className="text-sm text-white/70 transition hover:text-white">
              Teams
            </a>
            <a
              href="/contact"
              onClick={closeMenu}
              className="text-sm text-white/70 transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
