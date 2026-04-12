import {
  Award,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active learners", value: "20k+" },
  { label: "Course hours", value: "12k+" },
  { label: "Expert instructors", value: "180+" },
  { label: "Countries reached", value: "40+" },
];

const values = [
  {
    icon: GraduationCap,
    title: "Learner-first",
    body: "Courses are structured so you can progress with clarity, from foundations to job-ready skills.",
  },
  {
    icon: HeartHandshake,
    title: "Accessible education",
    body: "We reduce friction with flexible formats: live sessions, recordings, and resources you can revisit anytime.",
  },
  {
    icon: Globe2,
    title: "Global community",
    body: "Study alongside peers worldwide and learn from instructors with real industry experience.",
  },
  {
    icon: Award,
    title: "Quality you can trust",
    body: "Content is reviewed for accuracy and practicality so your time translates into measurable outcomes.",
  },
];

export default function About() {
  return (
    <div className="w-full">
      <section className="border-b border-black/5 bg-white/40 px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-base font-bold tracking-wide text-[#fb6d56] sm:text-lg">
            About PM101
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-[#0A033C] sm:mt-4 sm:text-4xl md:text-5xl">
            Training that meets you where you are
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
            101 is a training provider focused on accredited and bespoke
            learning-helping individuals and teams grow through structured
            online programs, live instruction, and high-quality materials you
            can apply immediately.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff] sm:text-[15px]">
              <Link to="/courses">Explore courses</Link>
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-[#0A033C]/15 bg-white/80 px-6 py-3 text-center text-sm font-semibold text-[#0A033C] transition hover:bg-white sm:text-[15px]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0A033C] sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-4 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
              We exist to make professional education practical and reachable.
              Whether you are upskilling, changing careers, or supporting a
              team, we combine clear curriculum with instructor support so
              learners stay motivated and finish strong.
            </p>
            <p className="mt-4 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
              From introductory topics to advanced specializations, 101
              emphasizes real workflows, assessments that reinforce
              understanding, and pathways that align with how work gets done
              today.
            </p>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-[0_24px_80px_-40px_rgba(124,92,255,0.45)] sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-[#fb6d56]/10 p-3 text-[#fb6d56]">
                <Users className="size-7 sm:size-8" strokeWidth={2.25} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0A033C] sm:text-xl">
                  Built for busy schedules
                </h3>
                <p className="mt-2 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
                  Learn in focused blocks, join live sessions when it suits you,
                  and revisit lesson recordings whenever you need a refresher.
                  Progress is designed to fit around work and life—not the other
                  way around.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white/35 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold text-[#0A033C] sm:text-3xl">
            Impact at a glance
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-pretty text-sm text-[#5D5A6F] sm:text-[15px]">
            Numbers tell part of the story—what matters most is consistent
            outcomes for learners.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-black/5 bg-white/80 p-5 text-center shadow-sm sm:p-6"
              >
                <p className="text-2xl font-extrabold text-[#fb6d56] sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-medium text-[#5D5A6F] sm:text-sm">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#0A033C] sm:text-3xl">
            What we stand for
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-[#5D5A6F] sm:text-[15px]">
            These principles guide how we design courses, support learners, and
            partner with organizations.
          </p>
          <ul className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2">
            {values.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex items-start justify-center gap-4 rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm sm:p-6"
              >
                <span className="rounded-xl bg-[#fb6d56]/10 p-3 text-[#fb6d56]">
                  <Icon className="size-6 sm:size-7" strokeWidth={2.25} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#0A033C]">
                    {title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
