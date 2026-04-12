import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function PageNotFound() {

  return (
    <div className="w-full px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 lg:order-1">
          <p className="text-7xl font-extrabold text-[#fb6d56] sm:text-base">404</p>
          <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[#0A033C] sm:text-4xl md:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
            We couldn&apos;t find the page you&apos;re looking for. The URL may be
            wrong, or the page may have moved.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7c5cff] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#6e50ff] sm:text-[15px]"
            >
              <Home size={18} />
              Go home
            </Link>

            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0A033C]/15 bg-white/80 px-6 py-3 text-center text-sm font-semibold text-[#0A033C] transition hover:bg-white sm:text-[15px]"
            >
              <SearchX size={18} />
              Browse courses
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0A033C]/15 bg-transparent px-6 py-3 text-center text-sm font-semibold text-[#0A033C] transition hover:bg-white/60 sm:text-[15px]"
            >
              <ArrowLeft size={18} />
              Go back
            </button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-3xl border border-black/5 bg-white/70 p-6 shadow-[0_24px_80px_-40px_rgba(124,92,255,0.45)] sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#5D5A6F] sm:text-sm">
                  Tip
                </p>
                <p className="mt-1 text-base font-bold text-[#0A033C] sm:text-lg">
                  Use the navbar to navigate
                </p>
              </div>
              <span className="rounded-2xl bg-[#fb6d56]/10 p-3 text-[#fb6d56]">
                <SearchX className="size-8 sm:size-10" strokeWidth={2.25} />
              </span>
            </div>
            <p className="mt-4 text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
              If you typed the address manually, double-check spelling. Otherwise,
              head back to the homepage and explore the latest courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
