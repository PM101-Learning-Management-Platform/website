import { ArrowLeft, Clock3, Layers3, Star, Users2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { courses } from "../src/assets/data/courses";

type Course = (typeof courses)[number];

function formatPrice(course: Course) {
  if (course.isFree || course.price === 0) return "Free";
  return `$${course.price}`;
}

export default function CourseDetails() {
  const { id } = useParams();
  const courseId = Number(id);
  const course = courses.find((c) => c.id === courseId);

  if (!Number.isFinite(courseId) || !course) {
    return (
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-sm font-semibold text-[#fb6d56] sm:text-base">Course</p>
          <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#0A033C] sm:text-4xl">
            Course not found
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
            The course you&apos;re looking for doesn&apos;t exist (or was removed).
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7c5cff] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff] sm:text-[15px]"
            >
              <ArrowLeft size={18} />
              Back to courses
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-[#0A033C]/15 bg-white/80 px-6 py-3 text-center text-sm font-semibold text-[#0A033C] transition hover:bg-white sm:text-[15px]"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="border-b border-black/5 bg-white/40 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#0A033C]/90 px-3 py-1 text-xs font-semibold text-white">
                  {course.level}
                </span>
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#7c5cff]">
                  {course.category}
                </span>
                <span className="rounded-full bg-[#fb6d56]/10 px-3 py-1 text-xs font-semibold text-[#fb6d56]">
                  {formatPrice(course)}
                </span>
              </div>

              <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-[#0A033C] sm:text-4xl md:text-5xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
                {course.description}
              </p>

              <p className="mt-4 text-sm font-medium text-[#5D5A6F] sm:text-[15px]">
                Instructor: <span className="font-semibold text-[#0A033C]">{course.instructor}</span>
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:flex-col lg:items-end">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0A033C]/15 bg-white/80 px-6 py-3 text-center text-sm font-semibold text-[#0A033C] transition hover:bg-white sm:text-[15px]"
              >
                <ArrowLeft size={18} />
                Back to courses
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-[#7c5cff] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff] sm:text-[15px]"
              >
                Enroll now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-sm">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-56 w-full object-cover sm:h-72"
                loading="lazy"
              />
              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-bold text-[#0A033C] sm:text-2xl">About this course</h2>
                <p className="mt-3 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
                  {course.description}
                </p>
                <div className="mt-6 rounded-2xl border border-black/5 bg-white/70 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-[#0A033C]">What you&apos;ll get</p>
                  <ul className="mt-3 grid gap-2 text-sm text-[#5D5A6F] sm:grid-cols-2 sm:text-[15px]">
                    <li className="rounded-xl bg-white/70 px-3 py-2">Clear, structured lessons</li>
                    <li className="rounded-xl bg-white/70 px-3 py-2">Hands-on practice</li>
                    <li className="rounded-xl bg-white/70 px-3 py-2">Progress you can track</li>
                    <li className="rounded-xl bg-white/70 px-3 py-2">Community learning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-black/5 bg-white/80 p-5 shadow-sm sm:p-6">
              <h3 className="text-lg font-bold text-[#0A033C] sm:text-xl">Course info</h3>
              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-[#5D5A6F] sm:text-[15px]">
                    <Clock3 size={18} className="text-[#7c5cff]" />
                    Duration
                  </p>
                  <p className="text-sm font-semibold text-[#0A033C] sm:text-[15px]">
                    {course.duration}h
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-[#5D5A6F] sm:text-[15px]">
                    <Layers3 size={18} className="text-[#7c5cff]" />
                    Lessons
                  </p>
                  <p className="text-sm font-semibold text-[#0A033C] sm:text-[15px]">
                    {course.lessons}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-[#5D5A6F] sm:text-[15px]">
                    <Users2 size={18} className="text-[#7c5cff]" />
                    Students
                  </p>
                  <p className="text-sm font-semibold text-[#0A033C] sm:text-[15px]">
                    {course.studentsCount}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-[#5D5A6F] sm:text-[15px]">
                    <Star size={18} className="text-amber-500" fill="currentColor" />
                    Rating
                  </p>
                  <p className="text-sm font-semibold text-[#0A033C] sm:text-[15px]">
                    {course.rating}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-black/5 pt-6">
                <p className="text-sm font-semibold text-[#0A033C]">Price</p>
                <p className="mt-2 text-3xl font-extrabold text-[#7c5cff]">
                  {formatPrice(course)}
                </p>
                <button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#fb6d56] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f45f49] sm:text-[15px]"
                >
                  Start learning
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

