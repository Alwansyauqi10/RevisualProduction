function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-[#071A33]/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="/"><img className="h-4 w-auto" src="/Logotype Revisual White.png" alt="Revisual Production"/></a>
        
        <div className="hidden items-center gap-8 md:flex">
          <a className="text-sm text-white/70 transition hover:text-white" href="/about">About</a>
          <a className="text-sm text-white/70 transition hover:text-white" href="/services">Services</a>
          <a className="text-sm text-white/70 transition hover:text-white" href="/portfolio">Portfolio</a>
          <a className="text-sm text-white/70 transition hover:text-white" href="/blogs">Blogs</a>
          <a className="text-sm text-white/70 transition hover:text-white" href="/teams">Teams</a>
          <a className="text-sm text-white/70 transition hover:text-white" href="/contact">Contact</a>
        </div>

        <a className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-[#071A33] transition hover:bg-white/90 md:block" href="/univ.terbuka">
          Find Photos
        </a>
      </div>
    </nav>
  )
}

export default Navbar;