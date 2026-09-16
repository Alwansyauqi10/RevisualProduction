function UniversitasTerbuka() {
  return (
    <>
      <section className="min-h-screen bg-[#071A33] bg-[url('/background-section1.jpg')] text-white">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-32">
          <div className="w-full max-w-4xl lg:pt-18">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
              Universitas Terbuka Graduation
            </p>

            <h1 className="font-display max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
              YOUR GRADUATION,
              <br />
              YOUR STORY.
            </h1>

            <p className="mt-8 max-w-4xl text-base leading-7 text-white/60 sm:text-lg">
              Find your graduation photos and keep the moment forever.
            </p>

            <div className="mt-10 max-w-4xl">
              <div className="flex flex-col gap-3 sm:flex-row w-full">
                <input
                  type="text"
                  placeholder="Enter your NIM"
                  className="h-14 flex-1 rounded-full border border-white/15 bg-white/5 px-6 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/30"
                />
                <button
                  type="button"
                  className="h-14 rounded-full bg-white px-7 text-sm font-medium text-[#071A33] transition hover:bg-white/90"
                >
                  Search Photos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-[#071a33] bg-[url('/background-section3.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[#071A33]/70" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              How it works
            </p>

            <h2 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-white">
              YOUR MEMORIES,
              <br />
              DELIVERED.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-7 text-white/50">
              A simple way to find, relive, and keep your graduation photos.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-sm tracking-[0.2em] text-white/50">
                  01
                </span>
                <div className="h-px w-16 bg-white/30" />
              </div>

              <h3 className="mt-5 text-xl font-medium tracking-tight text-white">
                SEARCH
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Enter your NIM
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <span className="text-sm tracking-[0.2em] text-white/50">
                  02
                </span>
                <div className="h-px w-16 bg-white/30" />
              </div>

              <h3 className="mt-5 text-xl font-medium tracking-tight text-white">
                FIND
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Find your graduation photos
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <span className="text-sm tracking-[0.2em] text-white/50">
                  03
                </span>
                <div className="h-px w-16 bg-white/30" />
              </div>

              <h3 className="mt-5 text-xl font-medium tracking-tight text-white">
                KEEP
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Download and keep your memories
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UniversitasTerbuka;
