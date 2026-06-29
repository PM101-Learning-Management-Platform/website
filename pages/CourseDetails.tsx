import {
  ArrowLeft,
  Clock3,
  Star,
  Users2,
  Play,
  PlayCircle,
  BookOpen,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Course } from "../types/courses";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCourseById } from "../redux/slices/courses";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { courseEnrollment } from "../api/enrollment";
import { getUserEnrolledCourses } from "../redux/slices/enrolledCourses";
import { markLessonComplete } from "../api/lessons";

function formatPrice(course: Course) {
  if (course.price == 0) return "Free";
  return `$${course.price}`;
}

export default function CourseDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { course, error, loading } = useAppSelector((state) => state.courses);
  const { enrolledCourses } = useAppSelector((state) => state.enrolledCourses);
  const [lessonId, setLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (id) dispatch(getCourseById(id));
    dispatch(getUserEnrolledCourses());
  }, [id, dispatch]);

  const authContext = useContext(AuthContext);
  const { user } = authContext || {};

  const isEnrolled = user?.role === 'admin' || user?.role === 'subAdmin' || enrolledCourses.some(
    (enrollment) => enrollment.courseId === id,
  );

  const handleEnroll = async () => {
    try {
      await courseEnrollment(id!);
      navigate(`/student/my-courses`);
    } catch {
      <ErrorMessage message="Error enrolling in course!" />;
    }
  };

  const handleCompleteLesson = async () => {
    try {
      await markLessonComplete(id!, lessonId!);
      setLessonId(null);
    } catch {
      <ErrorMessage message="Error Occured, Try again!" />;
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  if (!course) {
    return (
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-sm font-semibold text-[#fb6d56] sm:text-base">
            Course
          </p>
          <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#0A033C] sm:text-4xl">
            Course not found
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
            The course you&apos;re looking for doesn&apos;t exist (or was
            removed).
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
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:flex-col lg:items-end">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0A033C]/15 bg-white/80 px-6 py-3 text-center text-sm font-semibold text-[#0A033C] transition hover:bg-white sm:text-[15px]"
              >
                <ArrowLeft size={18} />
                Back to courses
              </Link>
              {!isEnrolled ? (
                <button
                  type="button"
                  className="inline-flex bg-[#fb6d56] text-white items-center justify-center rounded-xl px-6 py-3 text-center text-sm font-semibold shadow-sm transition hover:bg-[#6e50ff] sm:text-[15px]"
                  onClick={handleEnroll}
                >
                  Enroll now
                </button>
              ) : (
                <div className="inline-flex items-center justify-center rounded-xl bg-green-900/50 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm sm:text-[15px] cursor-not-allowed">
                  Enrolled
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-sm">
              <img
                src={course.thumbnailUrl || ""}
                alt={course.title}
                className="h-56 w-full object-cover sm:h-72"
                loading="lazy"
              />
              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-bold text-[#0A033C] sm:text-2xl">
                  About this course
                </h2>
                <p className="mt-3 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
                  {course.description}
                </p>
                <div className="mt-6 rounded-2xl border border-black/5 bg-white/70 p-4 sm:p-5">
                  <p className="text-sm font-semibold text-[#0A033C]">
                    What you&apos;ll get
                  </p>
                  <ul className="mt-3 grid gap-2 text-sm text-[#5D5A6F] sm:grid-cols-2 sm:text-[15px]">
                    <li className="rounded-xl bg-white/70 px-3 py-2">
                      Clear, structured lessons
                    </li>
                    <li className="rounded-xl bg-white/70 px-3 py-2">
                      Hands-on practice
                    </li>
                    <li className="rounded-xl bg-white/70 px-3 py-2">
                      Progress you can track
                    </li>
                    <li className="rounded-xl bg-white/70 px-3 py-2">
                      Community learning
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-black/5 bg-white/80 p-5 shadow-sm sm:p-6">
              <h3 className="text-lg font-bold text-[#0A033C] sm:text-xl">
                Course info
              </h3>
              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-[#5D5A6F] sm:text-[15px]">
                    <Clock3 size={18} className="text-[#7c5cff]" />
                    Duration
                  </p>
                  <p className="text-sm font-semibold text-[#0A033C] sm:text-[15px]">
                    {course.duration} H
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
                    <Star
                      size={18}
                      className="text-amber-500"
                      fill="currentColor"
                    />
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
                <a
                  href={"#curriculum"}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#fb6d56] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f45f49] sm:text-[15px]"
                >
                  Start learning
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="px-4 pb-20 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-[#0A033C] sm:text-3xl">
                Course Curriculum
              </h2>
              <p className="mt-2 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
                Explore the structured learning path we've designed to help you
                master this subject from scratch.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/70 p-2 shadow-sm border border-black/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7c5cff]/10 text-[#7c5cff]">
                <BookOpen size={20} />
              </div>
              <div className="px-2">
                <p className="text-xs font-bold text-[#0A033C]">
                  {course.modules?.length || 0} Modules
                </p>
                <p className="text-[10px] text-[#5D5A6F]">
                  {course.modules?.reduce(
                    (acc, m) => acc + (m.lessons?.length || 0),
                    0,
                  ) || 0}{" "}
                  Total Lessons
                </p>
              </div>
            </div>
          </div>

          {isEnrolled ? (
            <div className="grid gap-4">
              {course.modules?.length ? (
                course.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="group overflow-hidden rounded-3xl border border-black/5 bg-white/80 transition-all hover:border-[#7c5cff]/20 hover:shadow-md"
                  >
                    <div className="flex w-full items-center justify-between p-5 text-left sm:p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0A033C]/5 text-[#0A033C] transition-colors group-hover:bg-[#7c5cff]/10 group-hover:text-[#7c5cff]">
                          <span className="text-sm font-bold">
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#0A033C]">
                            {module.title}
                          </h3>
                          <p className="text-xs font-medium text-[#5D5A6F]">
                            {module.lessons?.length || 0} Lessons •{" "}
                            {module.description.slice(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-black/3 bg-white/40">
                      {module.lessons?.map((lesson) => (
                        <div key={lesson.id}>
                          <div className="flex items-center justify-between border-b border-black/2 px-6 py-4 last:border-0 hover:bg-white/80 sm:px-10">
                            <div className="flex items-center gap-4">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm border border-black/5 text-[#7c5cff]">
                                <PlayCircle size={16} />
                              </div>
                              <span className="text-sm font-semibold text-[#5D5A6F] sm:text-[15px]">
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex flex-col items-end gap-4">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D5A6F]/40">
                                15:00
                              </span>
                              <div className="flex items-center">
                                <Link
                                  to={`${lesson.videoUrl}`}
                                  onClick={handleCompleteLesson}
                                  target="_blank"
                                  className="rounded-lg bg-green-500/10 px-2 py-1 text-[10px] font-bold text-green-600 transition hover:bg-green-500/20 disabled:opacity-50"
                                >
                                  <Play size={16} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-end p-4">
                      {module.assessment && (
                        <Link
                          to={`/student/assessments/${module.assessment.id}/take`}
                          className="rounded-lg bg-[#fb6d56] px-2 py-1 text-[10px] text-white transition hover:bg-[#f45f49]"
                        >
                          TAKE ASSESSMENT
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-black/10 bg-white/40 py-16 text-center">
                  <p className="text-[#5D5A6F]">
                    No modules available for this course yet.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-black/10 bg-white/40 py-16 text-center">
              <p className="text-[#5D5A6F]">
                You need to enroll in this course to view the curriculum.
              </p>
              <button
                onClick={() => handleEnroll()}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#fb6d56] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f45f49] sm:text-[15px]"
              >
                Enroll Now
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
