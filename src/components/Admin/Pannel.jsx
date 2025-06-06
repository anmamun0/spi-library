import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Grid,
  Book,
  Users,
  ClipboardList,
  Calendar,
  ShieldCheck,
  Search,
  FileText,
  Settings,
  LogOut,
  UserCircle,
  Sun,
  Moon,
} from "lucide-react";
import axios from "axios";

// const SidebarItem = ({ icon, label, to }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 group ${
//         isActive
//           ? "bg-slate-200 dark:bg-slate-700 text-blue-700 dark:text-blue-400 font-semibold border-l-4 border-blue-700 pl-2"
//           : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 pl-2"
//       }`
//     }
//   >
//     {React.cloneElement(icon, {
//       className:
//         "w-5 h-5 text-inherit transition-transform duration-150 group-hover:scale-110",
//     })}
//     <span className="ml-3">{label}</span>
//   </NavLink>
// );

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
        isActive
          ? "bg-blue-100 text-blue-600 font-semibold"
          : "text-gray-800 hover:bg-gray-100"
      }`
    }
  >
    {icon}
    <span className="ml-3">{label}</span>
  </NavLink>
);

const Pannel = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return true;
      }
      const saved = localStorage.getItem("darkMode");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    localStorage.setItem("loader", true);
    const token = localStorage.getItem("token_id");
    if (!token) {
      alert("No token found, you are probably already logged out.");
      return;
    }
    console.log("token_id", token);

    try {
      await axios.post(
        "https://spi-library.onrender.com/user/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${token}`, // or `Bearer ${token}` depending on your API
          },
        }
      );
      localStorage.removeItem("token_id");
      navigate("/admin"); // <-- use navigate here
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
    localStorage.removeItem("loader");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 h-screen overflow-hidden flex transition-colors duration-300">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar navigation"
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
        className="md:hidden z-50 py-1.5 px-2 bg-blue-700 text-white fixed top-3 left-4 rounded shadow-lg"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        role="navigation"
        aria-label="Sidebar navigation"
        className={`fixed md:relative inset-y-0 left-0 transform rounded-xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 flex flex-col
        bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 w-64 h-full shadow-lg z-50 border-r-2 border-gray-200 dark:border-gray-700`}
      >
        <div className="p-4 border-b border-slate-300  hover:bg-gray-50 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 rounded-t-xl text-center">
          <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 dark:hover:bg-gray-600 transition-colors cursor-default select-none">
            <img
              id="dashboard_user_image"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="User Avatar"
              className="h-9 w-9 rounded-full border-2 border-teal-500"
            />
            <div className="text-start">
              <div className="flex gap-2 mt-2">
                <span
                  id="dashboard_username"
                  className="text-gray-700 dark:text-gray-200 font-medium"
                >
                  @admin
                </span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className=" rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  aria-label="Toggle theme"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-500" />
                  )}
                </button>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col justify-between overflow-auto flex-1">
          <div className="px-4 py-6 space-y-2 flex-1">
            <SidebarItem to="/admin/home" icon={<Grid />} label="Dashboard" />
            <SidebarItem to="/admin/books" icon={<Book />} label="Books" />
            <SidebarItem
              to="/admin/students"
              icon={<Users />}
              label="Students"
            />
            <SidebarItem
              to="/admin/transaction-records"
              icon={<ClipboardList />}
              label="Transaction Records"
            />
            <SidebarItem
              to="/admin/reservations"
              icon={<Calendar />}
              label="Reservations"
            />
            <SidebarItem
              to="/admin/management"
              icon={<ShieldCheck />}
              label="Admin Management"
            />
            <SidebarItem
              to="/admin/reports"
              icon={<FileText />}
              label="Reports"
            />
            <SidebarItem
              to="/admin/settings"
              icon={<Settings />}
              label="Settings"
            />
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full mt-6 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-all p-3 font-semibold rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        role="main"
        className="flex-1 overflow-y-auto transition-colors duration-300"
      >
        {/* Render children */}
        {children}
      </main>
    </div>
  );
};

export default Pannel;
