import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserEnrolledCourses } from "../../redux/slices/enrolledCourses";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

type CourseStatus = "in_progress" | "completed" | "not_started";

const FILTERS: { key: "all" | CourseStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Completed" },
  { key: "not_started", label: "Not started" },
];

export default function MyCourses() {
  const [filter, setFilter] = useState<"all" | CourseStatus>("all");

  const dispatch = useAppDispatch();
  const { enrolledCourses, loading, error } = useAppSelector((state) => state.enrolledCourses);

  useEffect(() => {
    dispatch(getUserEnrolledCourses());
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (filter === "all") return enrolledCourses;
    console.log(enrolledCourses);
    return enrolledCourses.filter((c) => c.status === filter);
  }, [filter, enrolledCourses]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#fb6d56]">My learning</p>
          <h1 className="mt-1 text-balance text-2xl font-extrabold tracking-tight text-[#0A033C] sm:text-3xl">
            My courses
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5D5A6F]">
            Resume where you left off or explore courses you have enrolled in.
          </p>
        </div>
        <Link
          to="/courses"
          className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#0A033C] shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          Browse more courses
        </Link>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              filter === key
                ? "bg-[#7c5cff] text-white shadow-sm"
                : "border border-black/10 bg-white/80 text-[#0A033C] hover:bg-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-black/5 bg-white/80 p-10 text-center shadow-sm backdrop-blur-sm">
          <p className="text-base font-semibold text-[#0A033C]">
            No courses in this category
          </p>
          <p className="mt-2 text-sm text-[#5D5A6F]">
            Enroll in a course from the catalog to see it here.
          </p>
          <Link
            to="/courses"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#7c5cff] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6e50ff]"
          >
            Go to courses
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <li key={course.id}>
              <article className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-[0_20px_80px_-45px_rgba(124,92,255,0.35)]">
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center rounded-lg bg-[#fb6d56]/10 px-2 py-1 text-[11px] font-bold text-[#fb6d56]">
                    {course.course?.level}
                  </span>
                  <span
                    className={`rounded-lg px-2 py-1 text-[11px] font-bold ${
                      course.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-700"
                        : course.status === "not_started"
                          ? "bg-black/5 text-[#5D5A6F]"
                          : "bg-[#7c5cff]/10 text-[#7c5cff]"
                    }`}
                  >
                    {course.status === "in_progress"
                      ? "In progress"
                      : course.status === "completed"
                        ? "Completed"
                        : "Not started"}
                  </span>
                </div>
                <h2 className="mt-3 text-base font-extrabold text-[#0A033C]">
                  {course.course?.title}
                </h2>
                <p className="mt-1 text-sm text-[#5D5A6F]">{course.course.description}</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#5D5A6F]">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-black/5">
                    <div
                      className="h-2 rounded-full bg-linear-to-r from-[#7c5cff] to-[#fb6d56] transition-[width] duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-1 flex-col justify-end gap-2 sm:flex-row">
                  <Link
                    to={`/courses/${course.course.id}`}
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#0A033C] shadow-sm transition hover:bg-white"
                  >
                    Course details
                  </Link>
                  <Link
                    to={`/courses/${course.course.id}`}
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#7c5cff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff]"
                  >
                    {course.status === "completed" ? "Review" : "Continue"}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
