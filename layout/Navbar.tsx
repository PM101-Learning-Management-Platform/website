import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useSetLoggedIn } from "../hooks/useSetLoggedIn";
import logo from "../src/assets/images/Logo.png"; 

function Navbar() {
  const { isLoggedIn } = useSetLoggedIn();
  const [loggedIn, setLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn)
  }, [isLoggedIn])


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

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-[#f5f5f5] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMenu}
        >
          <div className="rounded-lg">
            <img
              className="w-20 h-15 object-cover"
              src={logo} alt="Logo" />
          </div>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-[15px] font-medium text-[#1f2029] transition-colors hover:border-b-2 hover:border-amber-600 hover:pb-0.5"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {loggedIn ? (
          <div className="hidden items-center gap-4 md:flex lg:gap-6">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-[15px] font-medium text-[#1f2029]"
            >
              <ShoppingCart size={20} color="#c6592a" strokeWidth={2.5} />
              <span className="hidden lg:inline">Cart</span>
            </Link>
            <Link
              to="/account"
              className="flex items-center gap-2 text-[15px] font-medium text-[#1f2029]"
            >
              <User size={20} color="#c6592a" strokeWidth={2.5} />
              <span className="hidden lg:inline">
                Account
              </span>
            </Link>
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
          <div className="mt-4 flex flex-col gap-2 border-t border-black/5 pt-4">
            {loggedIn ? (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-black/5"
                  onClick={closeMenu}
                >
                  <ShoppingCart size={20} color="#c6592a" strokeWidth={2.5} />
                  Cart
                </Link>
                <Link
                  to="/account"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-black/5"
                  onClick={closeMenu}
                >
                  <User size={20} color="#c6592a" strokeWidth={2.5} />
                  Account
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
