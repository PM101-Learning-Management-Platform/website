export default function Certificates() {
  const Mock_certificates = [
    {
      title: "React Fundamentals",
      issuer: "PM101 E-Learning",
      date: "2026-04-18",
      status: "Issued",
    },
    {
      title: "UI/UX Essentials",
      issuer: "PM101 E-Learning",
      date: "—",
      status: "In progress",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#fb6d56]">Certificates</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0A033C] sm:text-3xl">
            Your achievements
          </h1>
          <p className="mt-2 text-sm leading-7 text-[#5D5A6F]">
            Download and share certificates you’ve earned.
          </p>
        </div>
        <a
          href="/student/my-courses"
          className="inline-flex items-center justify-center rounded-xl bg-[#7c5cff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff]"
        >
          Continue learning
        </a>
      </header>

      <section className="mt-6 rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
            Certificates
          </h2>
          <p className="text-sm font-semibold text-[#5D5A6F]">
            {Mock_certificates.length} total
          </p>
        </div>

        {Mock_certificates.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {Mock_certificates.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-black/5 bg-white/60 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="inline-flex items-center rounded-lg bg-[#fb6d56]/10 px-2 py-1 text-[11px] font-bold text-[#fb6d56]">
                    {c.status}
                  </p>
                  <h3 className="mt-2 text-base font-extrabold text-[#0A033C]">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#5D5A6F]">{c.issuer}</p>
                </div>
                <div className="rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-extrabold text-[#0A033C] shadow-sm">
                  {c.date}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0A033C] shadow-sm transition hover:bg-white disabled:opacity-60"
                  disabled={c.status !== "Issued"}
                >
                  Preview
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-[#7c5cff] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff] disabled:opacity-60"
                  disabled={c.status !== "Issued"}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-black/5 bg-white/60 p-5">
            <p className="text-sm text-[#5D5A6F]">No certificates found</p>
          </div>
        )}

        <div className="mt-6 rounded-xl bg-[#7c5cff]/10 p-4">
          <p className="text-sm font-extrabold text-[#0A033C]">
            Coming next
          </p>
          <p className="mt-1 text-sm text-[#5D5A6F]">
            When you connect your backend, we can generate real PDFs and show
            verification links.
          </p>
        </div>
      </section>
    </div>
  );
}
