import { Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllCourses } from "../redux/slices/courses";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { courses, loading, error } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const itemsPerPage = 5
  const pages = new Array(Math.ceil(courses.length / itemsPerPage)).fill(0).map((_, index) => index + 1)

  const coursesPerPage = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return courses.slice(start, end);
  }, [currentPage, courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, courses]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

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

          <div className="flex w-full justify-end">
            <label className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-black/5 bg-white/80 px-4 py-3 shadow-sm">
              <Search size={18} className="shrink-0 text-[#7c5cff]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#1f2029] placeholder:text-[#a0a0aa] outline-none sm:text-[15px]"
              />
            </label>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {coursesPerPage.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-black/5 bg-white/70 p-8 text-center">
            <p className="text-lg font-semibold text-[#0A033C]">No courses found.</p>
            <p className="mt-2 text-sm text-[#5D5A6F]">Try a different search or category.</p>
          </div>
        ) : null}
      </div>
      {coursesPerPage.length > 0 ? <Pagination pages={pages} setCurrentPage={setCurrentPage}/> : null}
    </div>
  );
}

