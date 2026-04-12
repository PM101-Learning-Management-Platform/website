import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "../src/assets/data/courses";

type Course = (typeof courses)[number];

function formatPrice(course: Course) {
  if (course.isFree || course.price === 0) return "Free";
  return `$${course.price}`;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link to={`/courses/${course.id}`} className="block">
      <article className="group flex flex-col overflow-hidden h-full rounded-3xl border border-black/5 bg-white/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-44 w-full object-cover sm:h-48"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-[#0A033C]/90 px-3 py-1 text-xs font-semibold text-white">
            {course.level}
          </span>
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#7c5cff]">
            {course.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-balance text-lg font-bold text-[#0A033C] sm:text-xl">
            {course.title}
          </h2>
          <span className="shrink-0 rounded-xl bg-[#7c5cff]/10 px-3 py-1.5 text-sm font-extrabold text-[#7c5cff]">
            {formatPrice(course)}
          </span>
        </div>

        <p className="flex flex-1 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
          {course.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-4 text-sm text-[#5D5A6F]">
          <p className="font-medium">
            Instructor:{" "}
            <span className="font-semibold">{course.instructor}</span>
          </p>
          <div className="flex items-center gap-2">
            <Star size={16} className="text-amber-500" fill="currentColor" />
            <span className="font-semibold text-[#1f2029]">
              {course.rating}
            </span>
            <span className="text-[#5D5A6F]">
              ({course.studentsCount} students)
            </span>
          </div>
        </div>
      </div>
      </article>
    </Link>
  );
}
