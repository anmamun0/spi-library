import React from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  LogIn,
  BookOpen,
  FileText,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const HelpSupport = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Help & Support
      </h1>

      <div className="space-y-10">
        {/* Registration Section */}
        <section className="bg-white shadow-md rounded-2xl p-6 border">
          <div className="flex items-center mb-4">
            <UserPlus className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Registration</h2>
          </div>
          <p className="text-gray-600">
            Register at{" "}
            <Link to="/register" className="text-indigo-600 underline">
              https://spi-library.vercel.app/register
            </Link>{" "}
            with the following <strong>unique fields</strong>:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-600 space-y-1">
            <li>Username</li>
            <li>Email</li>
            <li>Phone Number</li>
            <li>Roll Number</li>
            <li>Registration Number</li>
          </ul>
          <p className="mt-2 text-gray-600">
            Admin will verify your account within 2–3 working days.
          </p>
        </section>

        {/* Login Section */}
        <section className="bg-white shadow-md rounded-2xl p-6 border">
          <div className="flex items-center mb-4">
            <LogIn className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Login & Profile</h2>
          </div>
          <p className="text-gray-600">
            After verification, login at{" "}
            <Link to="/login" className="text-indigo-600 underline">
              /login
            </Link>{" "}
            to access your profile at <span className="text-gray-800 font-medium">/profile</span>.
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-600 space-y-1">
            <li>View your student info (not editable)</li>
            <li>Update profile image & present address</li>
            <li>Track transaction status</li>
          </ul>
        </section>

        {/* Book Request Section */}
        <section className="bg-white shadow-md rounded-2xl p-6 border">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Book Requests</h2>
          </div>
          <p className="text-gray-600">
            Go to the{" "}
            <Link to="/books" className="text-indigo-600 underline">
              /books
            </Link>{" "}
            page to request books. You can select a borrowing period of:
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            {[3, 7, 10, 15, 30, 40].map((day) => (
              <span
                key={day}
                className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
              >
                {day} Days
              </span>
            ))}
          </div>
          <p className="mt-3 text-gray-600">
            Once requested, collect the book from the library in person. Your status will change from <strong>Pending</strong> to <strong>Borrowed</strong>.
          </p>
        </section>

        {/* Transaction Section */}
        <section className="bg-white shadow-md rounded-2xl p-6 border">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
          </div>
          <p className="text-gray-600">Your profile will show:</p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-600 space-y-1">
            <li><strong>Pending:</strong> Requested but not issued</li>
            <li><strong>Borrowed:</strong> Book has been issued</li>
            <li><strong>Returned:</strong> Book has been returned</li>
          </ul>
          <p className="mt-2 text-gray-600">You can filter records by status, date, or book title.</p>
        </section>

        {/* Help Section */}
        <section className="bg-white shadow-md rounded-2xl p-6 border">
          <div className="flex items-center mb-4">
            <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Need Help?</h2>
          </div>
          <p className="text-gray-600">
            For assistance or issues:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 text-gray-600 space-y-1">
            <li>Visit the physical library</li>
            <li>Report bugs to the system admin</li>
            <li>Use the contact page if available</li>
          </ul>
        </section>

        {/* Back to Home */}
        <div className="text-center pt-6">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:underline text-sm font-medium"
          >
            <ArrowRight className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
