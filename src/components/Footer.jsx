import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-sm">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-300">
            Sylhet Polytechnic Library System is committed to providing easy
            access to academic resources and improving student learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-amber-400"> Home</Link> </li>
            <li> <Link to="/login" className="hover:text-amber-400"> Login</Link> </li>
            <li><Link to="/register" className="hover:text-amber-400"> Register</Link> </li>
            <li><Link to="/helpsupport" className="hover:text-amber-400"> Contact</Link> </li> 
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li> <Link to="/" className="hover:text-amber-400"> FAQ</Link> </li>
            <li><Link to="/books" className="hover:text-amber-400"> Browse Books</Link> </li>
            <li> <Link to="/auth-redirect" className="hover:text-amber-400"> Student Dashboard </Link></li>
            <li><Link to="/admin" className="hover:text-amber-400"> Admin Panel</Link> </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-300">
            <li> Email:{" "} <a href="mailto:librarian@spi.edu.bd" className="hover:text-amber-400" > librarian@spi.edu.bd</a></li>
            <li>Phone: +880 1234 567890</li>
            <li>Address: Sylhet Polytechnic Institute, Sylhet, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-600 mt-8 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Sylhet Polytechnic Library System. All rights reserved.
      </div>
    </footer>
  );
}
