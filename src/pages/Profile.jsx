import React, { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  UserCheck,
  Clock,
  Activity,
  CheckCircle,
  Calendar,
  RefreshCcw,
  Star,
} from "lucide-react";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import LoaderProgress from "./shared/LoaderProgress";
import { useProfile } from "../context/ProfileContext";

const Profile = () => {
  // I dont want to change data here, that way commanted
  // const { studentContext, setStudentContext, transactionsContext, setTransactionsContext,loading,error} = useProfile();
  const { studentContext, transactionsContext, loading, error } = useProfile();

  const [filter, setFilter] = useState("all");
  const [student, setStudent] = useState(studentContext || {});
  const [transactions, setTransactions] = useState(transactionsContext || []);
  const navigate = useNavigate();

  useEffect(() => {
    if (studentContext && transactionsContext) {
      setStudent(studentContext);
      setTransactions(transactionsContext);
    }
  }, [loading]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-red-50 text-red-600 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Failed to Load Profile</h2>
        <p className="mb-4 text-center">
          We encountered an error while loading your profile data.
        </p>
        <Link
          to="/login"
          className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Login Again
        </Link>
      </div>
    );
  }

  const booksRead = transactions.filter(
    (tx) => tx.status === "returned"
  ).length;
  // Calculate number of full stars based on booksRead
  const starCount = Math.round((50 / 100) * 5);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "borrowed":
        return <BookOpen className="text-blue-600 w-5 h-5" />;
      case "returned":
        return <CheckCircle className="text-green-600 w-5 h-5" />;
      default:
        return <Clock className="text-gray-400 w-5 h-5" />;
    }
  };

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
      navigate("/login"); // <-- use navigate here
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
    localStorage.removeItem("loader");
  };

  return (
    <div className="bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-7xl mx-auto rounded-lg ">
        {/* Header */}
        <div className="flex flex-col bg-white md:flex-row md:justify-between items-center border-b border-gray-300 pb-6 mb-6 p-8 rounded-md">
          <div className="flex items-center space-x-6 pb-1 text-sm">
            <img
              src={student.image}
              alt="Avatar"
              className="w-32 md:w-36 h-32 md:h-36 rounded-full object-cover"
            />
            <div>
              <h2 className="text-md md:text-2xl font-bold break-work">
                {student.full_name}
              </h2>
              <p className="md:text-md text-gray-600">{student.email}</p>
              <p className="md:text-md text-gray-600">{student.phone}</p>
              <p className="md:text-md text-gray-600">
                {student.department} {student.session}
              </p>
              <div className="flex items-center gap-1 text-blue-600">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < student.rating
                        ? "fill-blue-500 text-blue-500"
                        : "text-blue-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-3 md:gap-6 md:p-6 bg-white rounded-lg shadow-sm max-w-lg">
            {/* Student Info */}
            <ul className="flex flex-col gap-2 md:gap-3 text-gray-700 text-sm flex-grow">
              <li className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-500" />
                <span>
                  <strong>Books Read:</strong> {student.total_book_read}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-gray-500" />
                <span>
                  <strong>Account</strong>{" "}
                  <span className="font-semibold text-green-500">
                    {" "}
                    Activated
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>
                  <strong>Last Active:</strong>{" "}
                  {new Date().toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Dhaka",
                  })}
                </span>
              </li>
            </ul>

            {/* Buttons Stack */}
            <div className="flex md:flex-col gap-3">
              <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800 text-sm transition">
                <Link to="/books">Books</Link>
              </button>

              <button
                onClick={handleLogout}
                className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800 text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 my-4 ">
          <div className="bg-white rounded-md  p-10 shadow-sm">
            <div className="flex justify-between pb-3">
              <h3 className="font-semibold text-lg mb-4">Personal Details</h3>
              <i class="fa-solid fa-pen text-gray-600"></i>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10  text-sm text-gray-700">
              <ul className="space-y-3">
                <li>
                  <strong>Full Name</strong>
                  <div>{student.full_name}</div>
                </li>

                <li>
                  <strong>Role</strong>
                  <div>{student.role}</div>
                </li>
                <li>
                  <strong>Session</strong>
                  <div>{student.session}</div>
                </li>

                <li>
                  <strong>Phone</strong>
                  <div>{student.phone}</div>
                </li>

                <li>
                  <strong>Gender</strong>
                  <div>{student.gender}</div>
                </li>
                <li>
                  <strong>Nationality Type</strong>
                  <div>{student.nationality_type}</div>
                </li>
                <li>
                  <strong>Address</strong>
                  <div>{student.address}</div>
                </li>

                <li>
                  <strong>Permanent Address</strong>
                  <div> </div>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <strong>Username</strong>
                  <div>{student.user}</div>
                </li>
                <li>
                  <strong>Registration</strong>
                  <div>{student.registration}</div>
                </li>
                <li>
                  <strong>Department</strong>
                  <div>{student.department}</div>
                </li>
                <li>
                  <strong>Email</strong>
                  <div>{student.email}</div>
                </li>
                <li>
                  <strong>Birthday</strong>
                  <div>{student.birthday}</div>
                </li>

                <li>
                  <strong>Nationality Number</strong>
                  <div>{student.nationality_number}</div>
                </li>
                <li>
                  <strong>Blood Group</strong>
                  <div>{student.blood}</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Transaction Info */}
          <div className="bg-white rounded-md  p-8 shadow-sm">
            <div className="flex justify-between gap-6">
              <h3 className="font-semibold text-lg mb-4">Transaction</h3>
              <button
                onClick={() => setFilter("all")}
                className="p-2 hover:bg-gray-100 rounded"
                title="Reset Filter"
              >
                <RefreshCcw className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Filter pending/borrowed/returned */}

            <div className="flex gap-2 md:gap-4 mb-6 text-xs md:text-sm ">
              <button
                onClick={() => setFilter("pending")}
                className={`flex items-center gap-2 px-2 md:px-4 py-2 rounded-full  font-medium border transition ${
                  filter === "pending"
                    ? "border-yellow-400 text-yellow-700 bg-yellow-200"
                    : "border-yellow-300 text-yellow-600 bg-yellow-100 hover:bg-yellow-200"
                }`}
              >
                <Clock className="w-4 h-4" />
                Pending
              </button>

              <button
                onClick={() => setFilter("borrowed")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full  font-medium border transition ${
                  filter === "borrowed"
                    ? "border-blue-400 text-blue-700 bg-blue-200"
                    : "border-blue-300 text-blue-600 bg-blue-100 hover:bg-blue-200"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Borrow
              </button>

              <button
                onClick={() => setFilter("returned")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full  font-medium border transition ${
                  filter === "returned"
                    ? "border-green-400 text-green-700 bg-green-200"
                    : "border-green-300 text-green-600 bg-green-100 hover:bg-green-200"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Returned
              </button>
            </div>

            <div className="h-[400px] overflow-y-auto ">
              <ul className="space-y-4 md:p-4 bg-white shadow rounded-lg max-w-xl mx-auto mt-6">
                {filteredTransactions.map((tx) => {
                  const borrowDate = tx.borrow_date
                    ? new Date(tx.borrow_date)
                    : null;
                  const returnDate = tx.return_date
                    ? new Date(tx.return_date)
                    : null;

                  // Calculate days left only if status is "borrowed" and dates exist
                  let daysLeft = null;
                  if (tx.status === "borrowed" && borrowDate && returnDate) {
                    const diffTime =
                      returnDate.getTime() - borrowDate.getTime();
                    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
                  }

                  return (
                    <li
                      key={tx.id}
                      className="flex gap-4 items-start border-b pb-3"
                    >
                      {/* Icon */}
                      <div className="mt-1">{getStatusIcon(tx.status)}</div>

                      {/* Info Container */}
                      <div className="flex justify-between w-full">
                        {/* Left Side */}
                        <div className="flex flex-col gap-1 max-w-[65%]">
                          {/* ✅ Show Transaction ID */}
                          <p className=" font-medium text-gray-800">
                            Transaction ID: {tx.id}
                          </p>

                          <h4 className="text-sm text-gray-600">
                            {tx.book_title || `Book ISBN: ${tx.book}`}
                          </h4>

                          <p className="text-sm text-gray-600">
                            Due in: {tx.due_date} day
                            {tx.due_date !== 1 ? "s" : ""}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            Request:{" "}
                            {new Date(tx.request_date).toLocaleDateString(
                              "en-GB",
                              { timeZone: "Asia/Dhaka" }
                            )}
                          </p>
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col gap-1 text-sm text-gray-600 text-right ">
                          <p className="text-sm text-gray-600">
                            Status:{" "}
                            <span className="capitalize">{tx.status}</span>
                          </p>

                          {borrowDate && (
                            <p>
                              Borrowed:{" "}
                              {borrowDate.toLocaleDateString("en-GB", {
                                timeZone: "Asia/Dhaka",
                              })}
                            </p>
                          )}
                          {returnDate && (
                            <p>
                              Returned:{" "}
                              {returnDate.toLocaleDateString("en-GB", {
                                timeZone: "Asia/Dhaka",
                              })}
                            </p>
                          )}
                          {tx.status === "borrowed" &&
                            tx.warning !== null &&
                            (tx.warning > 0 ? (
                              <p className="text-green-600 font-semibold flex items-center gap-1">
                                <Calendar className="w-5 h-5" />
                                {tx.warning} day{tx.warning !== 1 ? "s" : ""}{" "}
                                left to return
                              </p>
                            ) : (
                              <p className=" text-red-600 font-semibold gap-1">
                                <span className="flex justify-between gap-1">
                                  <Calendar className="w-5 h-5" />
                                  Blackout period!
                                </span>
                                Overdue by {Math.abs(tx.warning)} day
                                {Math.abs(tx.warning) !== 1 ? "s" : ""}
                              </p>
                            ))}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Workplaces */}
        <div className="mb-6 hidden">
          <h3 className="font-semibold text-lg mb-2">Workplaces</h3>
        </div>

        {/* Tags */}
        <div className="hidden">
          <h3 className="font-semibold text-lg mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2 text-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
