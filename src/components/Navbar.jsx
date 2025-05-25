import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white  border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-amber-600">
          SPI Library
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-slate-700 hover:text-amber-600 transition">
            Home
          </Link>
          <Link to="/book" className="text-slate-700 hover:text-amber-600 transition">
            Book
          </Link>

          <Link to="/login" className="text-slate-700 hover:text-amber-600 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition"
          >
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-700"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow border-t border-slate-200">
          <Link to="/" className="block py-2 text-slate-700 hover:text-amber-600">
            Home
          </Link>
          <Link to="/login" className="block py-2 text-slate-700 hover:text-amber-600">
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md mt-2 text-center"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
