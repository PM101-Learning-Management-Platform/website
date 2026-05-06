import { Link } from "react-router-dom";
import type { Course } from "../types/courses";


export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link to={`/courses/${course.id}`} className="block">
      <article className="group flex flex-col overflow-hidden h-full rounded-3xl border border-black/5 bg-white/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <img
          src={course.thumbnailUrl || ""}
          alt={course.title}
          className="h-44 w-full object-cover sm:h-48"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-[#0A033C]/90 px-3 py-1 text-xs font-semibold text-white">
            {course.level}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-balance text-lg font-bold text-[#0A033C] sm:text-xl">
            {course.title}
          </h2>
          <span className="text-pretty text-sm font-medium text-[#5D5A6F] sm:text-[15px]">
            ${course.price}
          </span>
        </div>

        <p className="flex flex-1 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
          {course.description}
        </p>
      </div>
      </article>
    </Link>
  );
}
