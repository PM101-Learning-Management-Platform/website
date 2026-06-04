export default function Profile() {
  const user = (() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw) as {
        name?: string;
        fullName?: string;
        email?: string;
        role?: string;
      };
    } catch {
      return null;
    }
  })();

  const displayName = user?.fullName ?? user?.name ?? "Student";
  const email = user?.email ?? "student@example.com";

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#fb6d56]">Profile</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0A033C] sm:text-3xl">
            {displayName}
          </h1>
          <p className="mt-2 text-sm leading-7 text-[#5D5A6F]">
            Update your personal info and see your account details.
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 text-sm shadow-sm backdrop-blur-sm">
          <p className="font-semibold text-[#0A033C]">{email}</p>
          <p className="text-xs font-semibold text-[#5D5A6F]">
            {user?.role ? `Role: ${user.role}` : "Role: student"}
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
            Personal information
          </h2>
          <p className="mt-1 text-sm text-[#5D5A6F]">
            This is a front-end placeholder until your API is connected.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0A033C]">
                Full name
              </label>
              <input
                defaultValue={displayName}
                placeholder="Your name"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0A033C]">
                Email
              </label>
              <input
                defaultValue={email}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-[#0A033C]">
                Bio
              </label>
              <textarea
                rows={4}
                placeholder="Tell us a bit about you..."
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#0A033C] shadow-sm transition hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-[#fb6d56] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Save changes
            </button>
          </div>
        </section>

        <aside className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
            Account
          </h2>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-black/5 bg-white/60 p-4">
              <p className="text-sm font-bold text-[#0A033C]">Member since</p>
              <p className="mt-1 text-sm text-[#5D5A6F]">—</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white/60 p-4">
              <p className="text-sm font-bold text-[#0A033C]">Learning goal</p>
              <p className="mt-1 text-sm text-[#5D5A6F]">
                Complete 1 course per month
              </p>
            </div>
            <div className="rounded-xl bg-[#fb6d56]/10 p-4">
              <p className="text-sm font-extrabold text-[#0A033C]">
                Tip
              </p>
              <p className="mt-1 text-sm text-[#5D5A6F]">
                Add a bio to help mentors personalize your experience.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
