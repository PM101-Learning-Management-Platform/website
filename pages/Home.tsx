import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import heroImage from "../src/assets/images/learning.jpg";
import { Headphones, Play, Radio } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");

  const courses_links = [
    {
      id: 1,
      icon: <Headphones size={24} />,
      title: "Audio Classes",
    },
    {
      id: 2,
      icon: <Radio size={24} />,
      title: "Live Classes",
    },
    {
      id: 3,
      icon: <Play size={24} />,
      title: "Recorded Classes",
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full flex-col items-center sm:min-h-[calc(100vh-68px)]">
      <section className="min-h-[calc(100vh-60px)] overflow-hidden sm:min-h-[calc(100vh-68px)] lg:min-h-screen">
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-20 lg:py-20">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left content */}
            <div className="order-2 max-w-xl lg:order-1">
              <div className="inline-flex items-center rounded-xl bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#fb6d56] shadow-sm sm:px-4 sm:py-2 sm:text-sm">
                Never Stop Learning
              </div>

              <h1 className="mt-4 text-balance text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#0A033C]/80 sm:mt-6 sm:text-[42px] sm:leading-[1.08] md:text-[56px] lg:text-[64px]">
                Grow up your skills
                <br />
                by online courses
                <br />
                with <span className="text-[#fb6d56]">PM101</span>
              </h1>

              <p className="mt-4 max-w-lg text-pretty text-sm leading-7 text-[#5D5A6F] sm:mt-6 sm:text-[15px]">
                101 is a Global training provider based across the UK that
                specialises in accredited and bespoke training courses. We crush
                the barriers together to get a degree.
              </p>

              {/* Search bar */}
              <div className="mt-8 w-full rounded-2xl bg-white/95 p-2 shadow-[0_20px_80px_-30px_rgba(124,92,255,0.55)] sm:mt-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3 text-[#111]">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for a course"
                      className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-[#2b2b33] placeholder:text-[#a0a0aa] outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c5cff] px-6 py-3 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#6e50ff] sm:w-auto"
                  >
                    <Search size={18} />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Right showcase */}
            <div className="order-1 w-full max-w-xl overflow-hidden rounded-2xl lg:order-2">
              <img
                src={heroImage}
                alt="Students learning online"
                className="aspect-4/3 w-full object-cover sm:aspect-auto sm:h-full sm:min-h-[280px] lg:min-h-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-12 text-center sm:gap-10 sm:px-6 sm:py-14 md:px-8">
        <h2 className="max-w-3xl text-balance text-2xl font-bold text-[#0A033C] sm:text-3xl md:text-[32px]">
          High quality video, audio & live classes
        </h2>
        <p className="max-w-3xl text-pretty text-sm leading-7 text-[#5D5A6F] sm:text-[15px]">
          High-definition video is video of higher resolution and quality than
          standard-definition. While there is no standardized meaning for
          high-definition, generally any video image with considerably more than
          480 vertical scan lines or 576 vertical lines is considered
          high-definition.
        </p>
        <Link to="/courses">
          <button className="w-full max-w-sm rounded-2xl px-6 py-3 text-lg font-semibold text-white shadow-sm transition sm:w-auto sm:py-4 sm:text-xl md:text-2xl">
            Visit Courses
          </button>
        </Link>

        <video
          src="https://res.cloudinary.com/davlsnwbk/video/upload/v1775995233/teacher_zmpahq.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-4xl rounded-2xl bg-white p-3 shadow-sm sm:p-5"
        />

        <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row md:items-stretch md:justify-between md:gap-4 lg:gap-6">
          {courses_links.map((link) => {
            return (
              <button
                key={link.id}
                type="button"
                className="flex w-full items-center justify-start gap-3 rounded-2xl bg-white p-4 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl md:flex-1 md:gap-2 lg:p-3"
              >
                <span className="shrink-0 rounded-md bg-[#FF6652]/10 p-2">
                  {link.icon}
                </span>
                <span className="text-base font-semibold sm:text-lg md:text-xl">
                  {link.title}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
