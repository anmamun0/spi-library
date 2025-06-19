import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/bteb -logo.png";
import LoaderProgress from "../pages/shared/LoaderProgress";
import { useBooks } from "../context/BookContext";

export default function Navbar() {
    const { books,students,categories,loading, error } = useBooks();
  
  
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const navigation = useNavigate();
  const [search, setSearch] = useState("");


const categoryList = (categories?.map(cat => cat.name) || []).slice(0, 18);

  const handleGoClick = () => {
    if (search.trim()) {
      const formattedSearch = encodeURIComponent(search.trim().toLowerCase().replace(/\s+/g, "-"));
      navigation(`/books?category=${formattedSearch}`);
    } else {
      navigation("/books");
    }
  };

    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGoClick();
    }
  };
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm ">
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
          <div className="mt-6 md:mt-0 flex">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter URL or keywords"
              className="px-4 py-2 border border-gray-300 rounded-l-md w-64 md:w-80"
            />
            <button
              onClick={handleGoClick}
              className="px-4 py-2 bg-slate-800 text-white rounded-r-md"
            >
              Go
            </button>
          </div>
          <div className="flex">
            <Link to="/auth-redirect">
              <button className="bg-blue-800 text-white px-4 py-2 rounded">
                My Account
              </button>
            </Link>
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
            {/* Other links */}
            <li>
              {" "}
              <NavLink to="/" className=" hover:text-amber-400">
                {" "}
                Home{" "}
              </NavLink>{" "}
            </li>

            {/* Catalog with Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
            >
              <NavLink to="//" className="hover:text-amber-400">
                {" "}
                Catalog{" "}
              </NavLink>

              {showCategories && (
                <div className="absolute left-0 mt-3 bg-white text-slate-800 shadow-lg rounded w-[700px] z-10 p-4">
                  <ul
                    className="grid grid-cols-3 gap-4  p-2 space-y-1"
                    onMouseLeave={() => setShowCategories(false)}
                  >
                    {categoryList.map((cat, index) => (
                      <li
                        key={index}
                        className="hover:bg-slate-100 cursor-pointer px-3 py-1 rounded-md"
                      >
                        <Link
                          to={`/books?category=${cat
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block w-full"
                        >
                          {cat}
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
              <NavLink to="/result" className=" hover:text-amber-400">
                {" "}
                Result{" "}
              </NavLink>{" "}
            </li>

            <li>
              {" "}
              <NavLink to="/research" className="hover:text-amber-400 ">
                {" "}
                Research & Databases{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/enent" className="hover:text-amber-400 ">
                {" "}
                Events & Programs{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/helpsupport" className="hover:text-amber-400">
                {" "}
                Help & Support{" "}
              </NavLink>{" "}
            </li>
            {/* <li>
              {" "}
              <NavLink to="/card" className="hover:text-amber-400 ">
                {" "}
                Library Card{" "}
              </NavLink>{" "}
            </li> */}
          </ul>
        </div>
      </div>
      <LoaderProgress />
      {/* Mobile Menu */}

      {isOpen && (
        <div className="lg:hidden bg-transparent border-t border-slate-200 p-2 pb-4  ">
          <div className="px-3 py-4 shadow-md rounded-md"> 
          <div className="flex mb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter URL or keywords"
              className="w-full px-3 py-2 border border-slate-300 rounded-l-md"
            />
            <button
              onClick={handleGoClick}
              className="bg-slate-800 text-white px-4 rounded-r-md"
            >
              Go
            </button>

           
          </div>

          <Link to="/auth-redirect">
              <button className="w-full bg-blue-800 text-white block text-center px-4 py-2 rounded mb-3">
              My Account
            </button>
          </Link>
          

    

          <div className="flex justify-between space-x-2 mb-4">
            <button className="bg-slate-800 text-white w-1/2 py-2 rounded">
              Catalog
            </button>
            <button className="bg-slate-400 text-white w-1/2 py-2 rounded">
              <Link to="books">Books</Link>
            </button>
          </div>

          <ul className="space-y-2 text-slate-700">
            <li>
              <Link to="/" className="block hover:text-amber-500">
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/books" className="block hover:text-amber-500">
                eBooks & Audiobooks
              </Link>
            </li>

            <li>
              <Link to="/helpsupport" className="block hover:text-amber-500">
                Help & Support
              </Link>
            </li>
          </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
