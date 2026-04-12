import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { courses } from "../src/assets/data/courses";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const c of courses) set.add(c.category);
    return ["All", ...Array.from(set).sort()];
  }, []);

  const itemsPerPage = 3
  const pages = new Array(Math.ceil(courses.length / itemsPerPage)).fill(0).map((_, index) => index + 1)

  const coursesPerPage = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return courses.slice(start, end);
  }, [currentPage]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return coursesPerPage.filter((c) => {
      const matchesCategory = category === "All" ? true : c.category === category;
      const matchesQuery =
        q.length === 0
          ? true
          : `${c.title} ${c.description} ${c.instructor} ${c.level} ${c.category}`
              .toLowerCase()
              .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [coursesPerPage, category, query]);

  return (
    <div className="w-full px-4 py-10 sm:px-6 sm:py-12 md:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-base font-bold tracking-wide text-[#fb6d56] sm:text-lg">
              Courses
            </p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#0A033C] sm:text-4xl md:text-5xl">
              Find the right course for your next step
            </h1>
            <p className="mt-4 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
              Browse by category, search by topic, and pick the level that matches your goals.
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 md:w-[440px]">
            <label className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/80 px-4 py-3 shadow-sm">
              <Search size={18} className="shrink-0 text-[#7c5cff]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses..."
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#1f2029] placeholder:text-[#a0a0aa] outline-none sm:text-[15px]"
              />
            </label>

            <label className="rounded-2xl border border-black/5 bg-white/80 px-4 py-3 shadow-sm">
              <span className="sr-only">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-[#1f2029] outline-none sm:text-[15px]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-black/5 bg-white/70 p-8 text-center">
            <p className="text-lg font-semibold text-[#0A033C]">No courses found.</p>
            <p className="mt-2 text-sm text-[#5D5A6F]">Try a different search or category.</p>
          </div>
        ) : null}
      </div>
      {filtered.length > 0 ? <Pagination pages={pages} setCurrentPage={setCurrentPage}/> : null}
    </div>
  );
}

