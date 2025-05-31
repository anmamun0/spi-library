import React, { useState } from "react";
import { FaBars, FaCog, FaEllipsisH } from "react-icons/fa";
import { HiOutlineViewGrid, HiPlus, HiUserGroup } from "react-icons/hi";

const Pannel = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [activeContent, setActiveContent] = useState("dashboard");
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleAccountMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  const showContent = (section) => {
    setActiveContent(section);
    setShowSettingsMenu(false);
  };

  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden z-40 py-1 px-2 bg-gray-700 text-white fixed top-2 left-4 rounded"
      >
        ☰
      </button>

      {/* Layout Grid */}
      <div className="grid grid-cols-12 h-full">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 md:flex md:flex-col col-span-2 bg-gray-800 text-white text-sm md:text-md lg:text-lg w-64 md:w-auto h-full z-50`}
        >
          <div className="p-4 text-center border-b border-gray-700 relative">
            <h2 className="text-lg font-bold">Instructor Panel</h2>
            {/* Close sidebar on small screen */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-white absolute top-1 right-4"
            >
              <FaBars />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 md:space-y-4">
            <div
              onClick={() => showContent("dashboard")}
              className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <HiOutlineViewGrid className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </div>
            <div
              onClick={() => showContent("create-course")}
              className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <HiPlus className="w-5 h-5 mr-3" />
              <span>Create Course</span>
            </div>
            <div
              onClick={() => showContent("manage-courses")}
              className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <FaEllipsisH className="w-5 h-5 mr-3" />
              <span>Manage Courses</span>
            </div>
            <div
              onClick={() => showContent("students")}
              className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <HiUserGroup className="w-5 h-5 mr-3" />
              <span>My Students</span>
            </div>

            {/* Account Settings */}
            <div className="relative">
              <div
                onClick={toggleAccountMenu}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer"
              >
                <FaCog className="w-5 h-5 mr-3" />
                <span>Account Settings</span>
              </div>

              {/* Dropdown Menu */}
              {showSettingsMenu && (
                <ul className="absolute top-10 left-40 bg-gray-800 border border-gray-300 shadow-lg p-2 rounded-md w-56 z-10 text-sm space-y-2">
                  <li
                    onClick={() => showContent("edit-profile")}
                    className="p-2 hover:bg-gray-700 rounded-md cursor-pointer"
                  >
                    Edit Profile
                  </li>
                  <li
                    onClick={() => showContent("change-password")}
                    className="p-2 hover:bg-gray-700 rounded-md cursor-pointer"
                  >
                    Change Password
                  </li>
                  <li
                    onClick={() => showContent("privacy-settings")}
                    className="p-2 hover:bg-gray-700 rounded-md cursor-pointer"
                  >
                    Privacy Settings
                  </li>
                  <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                    Manage Devices
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="col-span-12 md:col-span-10 ml-0   overflow-y-auto">
          <div
            data-aos="fade-right"
            className="w-full py-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex justify-between items-center px-12 text-xs"
          >
            {/* Loading Animation */}
            <div id="dashboard_loading" className="hidden ml-6 md:ml-0">
              <div className="flex justify-center items-center font-mono text-teal-400 text-4xl space-x-3">
                <div className="dot w-2 md:w-5 h-2 md:h-5 bg-gray-500 rounded-full opacity-0"></div>
                <div className="dot w-2 md:w-5 h-2 md:h-5 bg-gray-600 rounded-full opacity-0 delay-200"></div>
                <div className="dot w-2 md:w-5 h-2 md:h-5 bg-gray-700 rounded-full opacity-0 delay-400"></div>
              </div>
            </div>

            {/* Left Spacer */}
            <div></div>

            {/* Right Section: Profile and Back Button */}
            <div className="flex items-center justify-end space-x-4">
              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <span id="dashboard_username" className="text-sm">
                  @username
                </span>
                <img
                  id="dashboard_user_image"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </div>

              {/* Back Home Button */}
              <a href="/">
                <button
                  id="backHome"
                  className="m-1 px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-xl shadow-xl transform hover:underline transition-all duration-300"
                >
                  ← Home
                </button>
              </a>
            </div>
                  </div>
                  






                  {children}
                  



                  
          {/* {activeContent === "dashboard" && <h1 className="text-2xl font-bold">Dashboard</h1>}
          {activeContent === "create-course" && <h1 className="text-2xl font-bold">Create Course</h1>}
          {activeContent === "manage-courses" && <h1 className="text-2xl font-bold">Manage Courses</h1>}
          {activeContent === "students" && <h1 className="text-2xl font-bold">My Students</h1>}
          {activeContent === "edit-profile" && <h1 className="text-2xl font-bold">Edit Profile</h1>}
          {activeContent === "change-password" && <h1 className="text-2xl font-bold">Change Password</h1>}
          {activeContent === "privacy-settings" && <h1 className="text-2xl font-bold">Privacy Settings</h1>} */}
        </main>
      </div>
    </div>
  );
};

export default Pannel;
