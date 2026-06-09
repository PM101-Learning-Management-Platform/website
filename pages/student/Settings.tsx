import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <header>
        <p className="text-sm font-semibold text-[#fb6d56]">Settings</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0A033C] sm:text-3xl">
          Preferences
        </h1>
        <p className="mt-2 text-sm leading-7 text-[#5D5A6F]">
          Manage your notifications, privacy, and learning preferences.
        </p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
              Notifications
            </h2>
            <p className="mt-1 text-sm text-[#5D5A6F]">
              Choose what you want to hear about.
            </p>

            <div className="mt-5 space-y-3">
              {[
                {
                  title: "Course updates",
                  desc: "New lessons, announcements, and materials.",
                },
                {
                  title: "Reminders",
                  desc: "Nudges to keep your learning streak.",
                },
                {
                  title: "Promotions",
                  desc: "Discounts and special offers.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-4 rounded-xl border border-black/5 bg-white/60 p-4"
                >
                  <div>
                    <p className="text-sm font-bold text-[#0A033C]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-[#5D5A6F]">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-[#0A033C] shadow-sm transition hover:bg-white"
                  >
                    Toggle
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
              Privacy
            </h2>
            <p className="mt-1 text-sm text-[#5D5A6F]">
              Control what others can see.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Link to="/student/profile" className="rounded-xl border border-black/5 bg-white/60 p-4">
                <p className="text-sm font-bold text-[#0A033C]">
                  Show my profile
                </p>
                <p className="mt-1 text-sm text-[#5D5A6F]">
                  Allow others to view your profile page.
                </p>
              </Link>
              <Link to="/student/certificates" className="rounded-xl border border-black/5 bg-white/60 p-4">
                <p className="text-sm font-bold text-[#0A033C]">
                  Show certificates
                </p>
                <p className="mt-1 text-sm text-[#5D5A6F]">
                  Display earned certificates publicly.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <aside className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
            Learning preferences
          </h2>
          <p className="mt-1 text-sm text-[#5D5A6F]">
            Tune your experience.
          </p>

          <div className="mt-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0A033C]">
                Weekly goal (hours)
              </label>
              <input
                type="number"
                min={1}
                defaultValue={5}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0A033C]">
                Preferred difficulty
              </label>
              <select className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#111] outline-none focus:border-[#7c5cff]/40 focus:shadow-[0_0_0_4px_rgba(124,92,255,0.12)]">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#fb6d56] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Save preferences
            </button>

            <div className="rounded-xl bg-[#fb6d56]/10 p-4">
              <p className="text-sm font-extrabold text-[#0A033C]">
                Note
              </p>
              <p className="mt-1 text-sm text-[#5D5A6F]">
                These controls are UI-only until connected to your backend.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
