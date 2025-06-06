import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/bteb -logo.png";
import LoaderProgress from "../pages/shared/LoaderProgress";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const navigation = useNavigate();
  const categoryList = [
    "All Categories",
    "Science",
    "Technology",
    "Engineering",
    "Mathematics",
    "History",
    "Literature",
    "Biographies",
    "Technology",
    "Engineering",
    "Mathematics",
    "History",
    "Literature",
    "Biographies",
    "Engineering",
    "Mathematics",
    "History",
    "Literature",
    "Biographies",
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex max-w-7xl justify-between items-center">
        {/* Logo and Name */}
        <div className="flex space-x-2">
          <div>
            <Link path="/">
              <img src={logo} alt="Library Logo" className="w-16 h-16" />{" "}
            </Link>
          </div>
          <div className="block pt-1">
            <span className="text-xl text-left font-bold text-blue-700 uppercase">
              {" "}
              <Link path="/">SPI-Library </Link>{" "}
            </span>
            <span className="block text-sm">Sylhet Polytechnic Institute</span>
          </div>
        </div>

        {/* Account + Search */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="mt-6 md:mt-0">
            <input
              type="text"
              placeholder="Enter URL or keywords"
              className="px-4 py-2 border border-gray-300 rounded-l-md w-64 md:w-80"
            /> 
             <button onClick={()=>{navigation('/books')}} className="px-4 py-2 bg-slate-800 text-white rounded-r-md">
               
              Go{" "}
            </button>   
          </div>

          <div className="flex">
            <button className="bg-blue-800 text-white px-4 py-2 rounded">
              <Link to="/auth-redirect">My Account</Link>
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-slate-700"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Full Menu Bar  container mx-auto */}
      <div className="bg-slate-800  ">
        <div className="container max-w-7xl mx-auto px-4  text-white text-sm font-medium hidden lg:flex relative">
          <ul className="flex space-x-6 py-3">
            {/* Catalog with Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <NavLink to="/" className="hover:text-amber-400">
                {" "}
                Catalog{" "}
              </NavLink>

              {showCategories && (
                <div className="absolute left-0 mt-3 bg-white text-slate-800 shadow-lg rounded w-[700px] z-10 p-4">
                  <ul className="grid grid-cols-3 gap-4  p-2 space-y-1">
                    {categoryList.map((cat, index) => (
                      <li
                        key={index}
                        className="hover:bg-slate-100 cursor-pointer"
                      >
                        <Link
                          to={`/category/${cat
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {" "}
                          {cat}{" "}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* Other links */}
            <li>
              {" "}
              <NavLink to="/books" className=" hover:text-amber-400">
                {" "}
                eBooks & Audiobooks{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/teen" className="hover:text-amber-400">
                {" "}
                Teen Zone{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/research" className="hover:text-amber-400">
                {" "}
                Research & Databases{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/enent" className="hover:text-amber-400">
                {" "}
                Events & Programs{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/help" className="hover:text-amber-400">
                {" "}
                Help & Support{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/card" className="hover:text-amber-400 ">
                {" "}
                Library Card{" "}
              </NavLink>{" "}
            </li>
          </ul>
          
        </div>

      </div>
        <LoaderProgress />
      {/* Mobile Menu */} 

{isOpen && (
  <div className="lg:hidden bg-white border-t border-slate-200 px-6 pb-4">
    <Link
      to="/auth-redirect"
      className="bg-blue-800 text-white block text-center px-4 py-2 rounded mb-3"
    >
      My Account
    </Link>

    <div className="flex mb-3">
      <input
        type="text"
        placeholder="Search our catalog..."
        className="w-full px-3 py-2 border border-slate-300 rounded-l-md"
      />
      <button className="bg-slate-800 text-white px-4 rounded-r-md">
        Go
      </button>
    </div>

    <div className="flex justify-between space-x-2 mb-4">
      <button className="bg-slate-800 text-white w-1/2 py-2 rounded">
        Catalog
      </button>
      <button className="bg-slate-400 text-white w-1/2 py-2 rounded">
        Website
      </button>
    </div>

   <ul className="space-y-2 text-slate-700">
  <li>
    <Link to="/" className="block hover:text-amber-500">Catalog</Link>
  </li>
  <li>
    <Link to="/books" className="block hover:text-amber-500">eBooks & Audiobooks</Link>
  </li>
  <li>
    <Link to="/teen" className="block hover:text-amber-500">Teen Zone</Link>
  </li>
  <li>
    <Link to="/research" className="block hover:text-amber-500">Research & Databases</Link>
  </li>
  <li>
    <Link to="/enent" className="block hover:text-amber-500">Events & Programs</Link>
  </li>
  <li>
    <Link to="/help" className="block hover:text-amber-500">Help & Support</Link>
  </li>
  <li>
    <Link to="/card" className="block text-teal-600 font-medium hover:underline">Library Card</Link>
  </li>
</ul>

  </div>
)}

    </nav>
  );
}
