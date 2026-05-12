import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserEnrolledCourses } from "../../redux/slices/enrolledCourses";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { useEffect } from "react";


export default function Dashboard() {
  const { enrolledCourses, loading, error } = useAppSelector(
    (state) => state.enrolledCourses,
  );
  const dispatch = useAppDispatch();

  const featuredCourses = enrolledCourses.slice(0, 2);

  const name = (() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { name?: string; fullName?: string };
      return parsed?.name ?? parsed?.fullName ?? null;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    dispatch(getUserEnrolledCourses());
  }, [dispatch]);

  const stats = [
    { label: "Enrolled courses", value: enrolledCourses.length },
    { label: "Completed", value: enrolledCourses.filter((c) => c.progress === 100).length },
    { label: "In progress", value: enrolledCourses.filter((c) => c.progress < 100).length },
    { label: "Certificates", value: enrolledCourses.filter((c) => c.progress === 100).length },
  ];

  const activity = [
    { title: "Completed quiz", meta: "React Fundamentals • 2 hours ago" },
    { title: "Watched video", meta: "UI/UX Essentials • Yesterday" },
    { title: "Started a course", meta: "TypeScript Basics • 3 days ago" },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#fb6d56]">Student Dashboard</p>
          <h1 className="mt-1 text-balance text-2xl font-extrabold tracking-tight text-[#0A033C] sm:text-3xl">
            Welcome back {name ? `${name}` : ""}.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5D5A6F]">
            Track your progress, continue learning, and see what’s next.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/courses"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#0A033C] shadow-sm backdrop-blur-sm transition hover:bg-white"
          >
            Browse courses
          </a>
          <a
            href="/student/my-courses"
            className="inline-flex items-center justify-center rounded-xl bg-[#7c5cff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff]"
          >
            My Courses
          </a>
        </div>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-[0_20px_80px_-45px_rgba(124,92,255,0.45)] backdrop-blur-sm"
          >
            <p className="text-xs font-semibold text-[#5D5A6F]">{s.label}</p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#0A033C]">
              {s.value}
            </p>
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
              Continue learning
            </h2>
            <a
              href="/student/my-courses"
              className="text-sm font-semibold text-[#7c5cff] hover:underline"
            >
              View all
            </a>
          </div>

          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {featuredCourses.map((c) => (
              <div
                key={c.id}
                className="group rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-[0_20px_80px_-45px_rgba(251,109,86,0.35)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center rounded-lg bg-[#fb6d56]/10 px-2 py-1 text-[11px] font-bold text-[#fb6d56]">
                      {c.course.level}
                    </p>
                    <h3 className="mt-2 text-base font-extrabold text-[#0A033C]">
                      {c.course.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#5D5A6F]">{c.course.description}</p>
                  </div>
                  <div className="rounded-xl bg-white px-2.5 py-1.5 text-xs font-extrabold text-[#0A033C] shadow-sm">
                    {c.progress}%
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 w-full rounded-full bg-black/5">
                    <div
                      className="h-2 rounded-full bg-linear-to-r from-[#7c5cff] to-[#fb6d56] transition-[width] duration-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#5D5A6F]">
                      Keep it up!
                    </p>
                    <a
                      href="/student/my-courses"
                      className="text-xs font-extrabold text-[#0A033C] underline-offset-4 group-hover:underline"
                    >
                      Resume →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
          <h2 className="text-lg font-extrabold tracking-tight text-[#0A033C]">
            Recent activity
          </h2>
          <ul className="mt-3 space-y-3">
            {activity.map((a) => (
              <li
                key={a.title + a.meta}
                className="rounded-xl border border-black/5 bg-white/60 p-3"
              >
                <p className="text-sm font-bold text-[#0A033C]">{a.title}</p>
                <p className="mt-1 text-xs text-[#5D5A6F]">{a.meta}</p>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl bg-[#7c5cff]/10 p-4">
            <p className="text-sm font-extrabold text-[#0A033C]">
              Next step
            </p>
            <p className="mt-1 text-sm text-[#5D5A6F]">
              Finish 1 lesson today to keep your streak.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
