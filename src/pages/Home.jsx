import { Link } from "react-router-dom";

export default function Home() {
  return (

    

    <div className="bg-white text-slate-800 shadow-sm border-b ">
<section className=" py-4 px-4  whitespace-nowrap scrollbar-hide bg-amber-50 border-green-200">
  <div className="flex space-x-4 px-10 ">
    {[
      "Science",
      "Technology",
      "Engineering",
      "Mathematics",
      "Fiction",
      "Non-Fiction",
      "History",
      "Biographies",
      "Comics",
      "Mystery",
      "Romance",
      "Programming",
      "Python",
      "Data Science",
      "Machine Learning",
      "Databases",
    ].map((category, index) => (
      <span
        key={index}
        className="inline-block bg-slate-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition cursor-pointer"
      >
        {category}
      </span>
    ))}
  </div>
</section>

      
      {/* Hero Section */}
      <section className="bg-amber-50 border-b border-amber-100 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-600">
          Sylhet Polytechnic Library System
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-slate-700">
          Streamline your academic life. Borrow books, explore digital resources, and manage your library account — all from one place.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-3 font-medium rounded hover:bg-green-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-amber-100 text-slate-800 px-6 py-3 font-medium rounded hover:bg-amber-200 transition"
          >
            Register
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center bg-slate-50">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">About Our Library</h2>
        <p className="text-slate-700 text-lg">
          SPI Library is your academic assistant. Access a wide collection of books and digital materials, manage borrowing, and stay informed with real-time updates.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Book Borrowing", desc: "Easily borrow and return physical or digital books." },
              { title: "Student Dashboard", desc: "Track borrowed books, due dates, and history." },
              { title: "Advanced Search", desc: "Find books by title, author, category, or ISBN." },
              { title: "Digital Resources", desc: "Access e-books, PDFs, and study materials online." },
              { title: "Notifications", desc: "Get alerts before due dates and new book arrivals." },
              { title: "Admin Panel", desc: "Manage books, users, and inventory efficiently." },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-lg p-6 border border-slate-200 hover:shadow transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-green-700">
                  {feature.title}
                </h3>
                <p className="text-slate-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-slate-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                step: "1",
                title: "Create Account",
                desc: "Register online with your student ID and credentials.",
              },
              {
                step: "2",
                title: "Browse & Borrow",
                desc: "Search and borrow books easily from the system.",
              },
              {
                step: "3",
                title: "Track & Return",
                desc: "View due dates and return books before deadlines.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white p-6 rounded border border-slate-200 shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl font-bold text-amber-500 mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-1 text-slate-800">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Showcase */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">
            Explore Popular Books
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {["Clean Code", "The Pragmatic Programmer", "Data Structures", "Python Crash Course"].map(
              (title, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded shadow-sm hover:shadow-md transition text-center border border-slate-200"
                >
                  <div className="h-40 bg-slate-100 rounded mb-3"></div>
                  <p className="font-medium text-slate-800">{title}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="mb-6 text-lg">
          Register now and begin your journey with SPI Library.
        </p>
        <Link
          to="/register"
          className="bg-white text-green-700 px-6 py-3 font-semibold rounded hover:bg-slate-100"
        >
          Get Started
        </Link>
      </section>

      {/* Contact / FAQ */}
      <section className="py-16 px-4 text-center max-w-3xl mx-auto bg-white">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Need Help?</h2>
        <p className="text-slate-700 mb-4">
          Reach out to us at{" "}
          <a href="mailto:librarian@spi.edu.bd" className="underline text-amber-600">
            librarian@spi.edu.bd
          </a>{" "}
          or visit the help desk.
        </p>
        <p className="text-slate-500 text-sm">
          View our FAQ page for common questions and support.
        </p>
      </section>
    </div>
  );
}
