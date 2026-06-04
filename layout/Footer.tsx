import logo from "../src/assets/images/Logo.png";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const courses = [
    {
      name: "Classroom courses",
      path: "#",
    },
    {
      name: "Virtual classroom courses",
      path: "#",
    },
    {
      name: "E-learning courses",
      path: "#",
    },
    {
      name: "Video Courses",
      path: "#",
    },
    {
      name: "Offline Courses",
      path: "#",
    },
  ];

  const community = [
    {
      name: "Learners",
      path: "#",
    },
    {
      name: "Partners",
      path: "#",
    },
    {
      name: "Developers",
      path: "#",
    },
    {
      name: "Transactions",
      path: "#",
    },
    {
      name: "Blog",
      path: "#",
    },
    {
      name: "Teaching Center",
      path: "#",
    },
  ];

  const quickLinks = [
    {
      name: "Home",
      path: "#",
    },
    {
      name: "Professional Education",
      path: "#",
    },
    {
      name: "Courses",
      path: "#",
    },
    {
      name: "Admissions",
      path: "#",
    },
    {
      name: "Testimonial",
      path: "#",
    },
    {
      name: "Programs",
      path: "#",
    },
  ];

  const more = [
    {
      name: "Press",
      path: "#",
    },
    {
      name: "Investors",
      path: "#",
    },
    {
      name: "Terms",
      path: "#",
    },
    {
      name: "Privacy",
      path: "#",
    },
    {
      name: "Help",
      path: "#",
    },
    {
      name: "Contact",
      path: "#",
    },
  ];

  return (
    <footer className="relative z-0 mx-auto mt-12 w-full max-w-7xl py-12 px-4 sm:py-16 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        {/* Column 1 - Brand & Info */}
        <div className="flex flex-col">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 mb-5"
        >
          <div className="rounded-lg">
            <img
              className="w-20 h-15 object-cover"
              loading="lazy"
              src={logo} alt="Logo" />
          </div>
        </Link>

          <div className="flex items-center flex-wrap justify-between gap-5 mb-8">
            <Link
              to="https://www.facebook.com/mohamed.elkinany.3910/"
              target="_blank"
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
            >
              <FaFacebookF
                fill="currentColor"
                strokeWidth={0}
                size={22}
              />
            </Link>
            <Link
              to="https://www.instagram.com/mohamed_elkinany1/"
              target="_blank"
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
            >
              <FaInstagram size={18} strokeWidth={2.5} />
            </Link>
            <Link
              to="https://www.linkedin.com/in/mohamed-elkinany-3659b5281"
              target="_blank"
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
            >
              <FaLinkedinIn
                fill="currentColor"
                strokeWidth={0}
                size={22}
              />
            </Link>
            <Link
              to="https://wa.me/201128819687"
              target="_blank"
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
            >
              <FaWhatsapp
                fill="currentColor"
                strokeWidth={20}
                size={22}
              />
            </Link>
          </div>
        </div>

        {/* Column 2 - Courses */}
        <div>
          <h3 className="text-[22px] font-semibold text-[#1f2029] mb-6">
            Courses
          </h3>
          <ul className="flex flex-col space-y-4 text-[#75757a] font-medium text-[15px]">
            {courses.map((course) => (
              <li key={course.name}>
                <Link to={course.path}>{course.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Community */}
        <div>
          <h3 className="text-[22px] font-semibold text-[#1f2029] mb-6">
            Community
          </h3>
          <ul className="flex flex-col space-y-4 text-[#75757a] font-medium text-[15px]">
            {community.map((community) => (
              <li key={community.name}>
                <Link to={community.path}>{community.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Quick links */}
        <div>
          <h3 className="text-[22px] font-semibold text-[#1f2029] mb-6">
            Quick links
          </h3>
          <ul className="flex flex-col space-y-4 text-[#75757a] font-medium text-[15px]">
            {quickLinks.map((quickLink) => (
              <li key={quickLink.name}>
                <Link to={quickLink.path}>{quickLink.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5 - More */}
        <div>
          <h3 className="text-[22px] font-semibold text-[#1f2029] mb-6">
            More
          </h3>
          <ul className="flex flex-col space-y-4 text-[#75757a] font-medium text-[15px]">
            {more.map((more) => (
              <li key={more.name}>
                <Link to={more.path}>{more.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
