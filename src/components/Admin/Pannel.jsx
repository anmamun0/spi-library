import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom"; 

import { Grid, Book, Users, ClipboardList, Calendar, ShieldCheck, Search, FileText, Settings, Lock, LogOut,UserCircle } from "lucide-react";

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-2 rounded-md cursor-pointer ${
        isActive ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'
      }`
    }
  >
    {icon}
    <span className="ml-3">{label}</span>
  </NavLink>
);

const Pannel = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 h-screen overflow-hidden flex">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar navigation"
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
        className="md:hidden z-40 py-1 px-2 bg-gray-700 text-white fixed top-2 left-4 rounded"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        role="navigation"
        aria-label="Sidebar navigation"
        className={`fixed md:relative inset-y-0 left-0 transform rounded-xl
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 flex flex-col bg-gray-800 text-white w-64 h-full z-50`}
      >
        <div className="p-4 text-center border-b border-gray-700">
          <h2 className="text-xl font-semibold">One</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-auto">
          <SidebarItem to="/admin/home" icon={<Grid className="w-5 h-5" />} label="Dashboard" />
          <SidebarItem to="/admin/books" icon={<Book className="w-5 h-5" />} label="Books" />
          <SidebarItem to="/admin/students" icon={<Users className="w-5 h-5" />} label="Students" />
          <SidebarItem to="/borrow-records" icon={<ClipboardList className="w-5 h-5" />} label="Borrow Records" />
          <SidebarItem to="/reservations" icon={<Calendar className="w-5 h-5" />} label="Reservations" />
          <SidebarItem to="/admin-management" icon={<ShieldCheck className="w-5 h-5" />} label="Admin Management" />
          <SidebarItem to="/search" icon={<Search className="w-5 h-5" />} label="Search Catalog" />
          <SidebarItem to="/reports" icon={<FileText className="w-5 h-5" />} label="Reports" />
          <SidebarItem to="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
          <SidebarItem to="/login" icon={<Lock className="w-5 h-5" />} label="Login" />

          <button
            onClick={() => {/* logout logic here */}}
            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 p-3 text-white font-semibold rounded-md mt-auto"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main role="main" className="flex-1 overflow-y-auto p-2">

    <div
      data-aos="fade-right"
      className="w-full bg-white shadow-md rounded-lg flex items-center justify-between px-8 py-3 text-sm font-sans"
    >
      {/* Loading Animation */}
      <div id="dashboard_loading" className="hidden">
        <div className="flex space-x-2 text-teal-500 animate-pulse">
          <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
          <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
          <div className="w-3 h-3 bg-teal-700 rounded-full"></div>
        </div>
      </div>

      {/* Left spacer or logo */}
      <div className="flex items-center space-x-2">
        {/* Example: Place for a logo or text */}
        <span className="font-bold text-gray-700">Dashboard</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Lucide User Icon */}
        <UserCircle
          size={28}
          className="text-gray-500 hover:text-teal-600 cursor-pointer transition-colors duration-300"
          title="User Profile"
          onClick={() => alert("User icon clicked!")}
        />

        {/* Username and Avatar */}
        <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors cursor-default select-none">
          <span id="dashboard_username" className="text-gray-700 font-medium">
            @username
          </span>
          <img
            id="dashboard_user_image"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User Avatar"
            className="h-9 w-9 rounded-full border-2 border-teal-500"
          />
        </div>
 
      </div>
    </div>
        {children}
      </main>
    </div>
  );
};

export default Pannel;
