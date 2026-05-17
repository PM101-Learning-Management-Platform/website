import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../src/assets/images/Logo.png";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import { getToken, removeToken, getUser, removeUser } from "../lib/setToken";

export default function Navbar() {
  const Navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  // const context = useContext(AuthContext);
  const user = getUser();
  // if (!context) {
  //   throw new Error("Navbar must be used within an AuthProvider");
  // }
  // const { setUser } = context;
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Courses",
      path: "/courses",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const token = getToken();

  const closeMenu = () => setMenuOpen(false);
  const closeUserMenu = () => setUserMenu(false);

  const toggleUserMenu = () => setUserMenu(!userMenu);

  const handleLogout = () => {
    removeToken();
    removeUser();
    Navigate("/login");
  };

  return (
    <nav className="border-b border-black/5 bg-[#f5f5f5] backdrop-blur-sm text-center">
      <div className="flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMenu}
        >
          <div className="rounded-lg">
            <img className="w-20 h-15 object-cover" src={logo} alt="Logo" />
          </div>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-[15px] font-medium text-[#1f2029] transition-colors hover:border-b-2 hover:border-amber-600 hover:pb-0.5"
                onClick={() => {
                  closeMenu();
                  closeUserMenu();
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {token ? (
          <div className="hidden items-center gap-4 md:flex">
            <div
              onClick={toggleUserMenu}
              className="relative flex items-center gap-2 text-[15px] font-medium text-[#1f2029] bg-transparent border-none cursor-pointer"
            >
              {user?.name}
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={user?.avatar}
                alt={user?.name}
              />
            </div>

            {userMenu && (
              <div className="absolute right-0 top-full z-60 mt-2 w-48 rounded-lg border border-black/5 bg-white/80 p-2 shadow-[0_20px_80px_-30px_rgba(124,92,255,0.35)] backdrop-blur-sm">
                <Link
                  onClick={toggleUserMenu}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-black/5 cursor-pointer"
                  to="/student"
                >
                  Dashboard
                </Link>
                <Link
                  onClick={toggleUserMenu}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-black/5 cursor-pointer"
                  to="/student/my-courses"
                >
                  My Courses
                </Link>
                <Link
                  onClick={toggleUserMenu}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-black/5 cursor-pointer"
                  to="/student/certificates"
                >
                  Certificates
                </Link>
                <Link
                  onClick={toggleUserMenu}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-black/5 cursor-pointer"
                  to="/student/settings"
                >
                  Settings
                </Link>
                <button
                  className="w-full text-center border-t border-black/5 rounded-lg px-3 py-3 text-[15px] font-medium hover:text-[#fb6d56]/70 transition-all duration-3000 ease-in-out cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/login"
              className="text-[15px] font-medium text-[#1f2029]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-[#fb6d56] px-4 py-2 text-[15px] font-semibold text-white"
            >
              Register
            </Link>
          </div>
        )}

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#1f2029] md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X size={26} strokeWidth={2.5} />
          ) : (
            <Menu size={26} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-black/5 bg-[#f5f5f5] px-4 py-4 shadow-lg md:hidden transition-all duration-3000 ease-in-out">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium text-[#1f2029] hover:bg-black/5"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {!token ? (
            <div className="mt-4 flex flex-col gap-2 border-t border-black/5 pt-4">
              <Link
                to="/login"
                className="block rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-black/5"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block rounded-lg bg-[#fb6d56] px-3 py-3 text-center text-[15px] font-semibold text-white"
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2 border-t border-black/5 pt-4">
              <Link
                to="/student"
                className="block rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-black/5"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/student/my-courses"
                className="block rounded-lg px-3 py- text-[15px] font-semibold"
                onClick={closeMenu}
              >
                My Courses
              </Link>
              <Link
                to="/student/certificates"
                className="block rounded-lg px-3 py-3  text-[15px] font-semibold"
                onClick={closeMenu}
              >
                Certificates
              </Link>
              <Link
                to="/student/settings"
                className="block rounded-lg  px-3 py-3  text-[15px] font-semibold "
                onClick={closeMenu}
              >
                Settings
              </Link>
              <button
                className="w-full border-t text-center border-black/5 rounded-lg px-3 py-3 text-[15px] font-medium hover:text-[#fb6d56]/70 transition-all duration-3000 ease-in-out cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
}
