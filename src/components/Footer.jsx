export default function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8 text-sm">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-300">
            Sylhet Polytechnic Library System is committed to providing easy access to academic resources and improving student learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-green-300">Home</a></li>
            <li><a href="/login" className="hover:text-green-300">Login</a></li>
            <li><a href="/register" className="hover:text-green-300">Register</a></li>
            <li><a href="/contact" className="hover:text-green-300">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:text-green-300">FAQ</a></li>
            <li><a href="/books" className="hover:text-green-300">Browse Books</a></li>
            <li><a href="/dashboard" className="hover:text-green-300">Student Dashboard</a></li>
            <li><a href="/admin" className="hover:text-green-300">Admin Panel</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Email: <a href="mailto:librarian@spi.edu.bd" className="hover:text-green-300">librarian@spi.edu.bd</a></li>
            <li>Phone: +880 1234 567890</li>
            <li>Address: Sylhet Polytechnic Institute, Sylhet, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Sylhet Polytechnic Library System. All rights reserved.
      </div>
    </footer>
  );
}
