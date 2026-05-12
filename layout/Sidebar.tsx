import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { removeToken, getUser, removeUser } from "../lib/setToken";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

const user = getUser();

const navItems = [
  { to: "/student", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/student/my-courses", icon: BookOpen, label: "My Courses" },
  { to: "/student/certificates", icon: Award, label: "Certificates" },
  { to: "/student/settings", icon: Settings, label: "Settings" },
  { to: "/", icon: Home, label: "Home" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  // const context = useContext(AuthContext);
  // if (!context) {
  //   throw new Error("Sidebar must be used within an AuthProvider");
  // }
  // const { user, setUser } = context;

  const handleLogout = () => {
    removeToken();
    removeUser();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-bold">{user?.name}</h1>
            <p className="text-xs text-gray-400">Student Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/student"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
