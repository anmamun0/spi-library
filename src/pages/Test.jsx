import React from "react";
import { BookOpen, CalendarDays, UserCheck, Clock, Activity, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Test = () => {
  const student = {
    name: "Nur Mohummod Al Mamun",
    role: "Product Designer",
    rating: 8.6,
    phone: "+123 456 7890",
    address: "1234 Web Street, NY 10001",
    email: "hello@jeremyrose.com",
    website: "jeremyrose.com",
    birthday: "June 5, 1992",
    gender: "Male",
    blood: "O+",
    username: "anmamun0",
    department: "CSE",
    roll: "676229",
    registration: "1502221114",
    session: "2122",
    nationality_type: "NID",
    nationality_number: "3242334",
    permanentAddress: "123 Permanent Ave, NY 10001",
    residentialAddress: "456 Residential Blvd, NY 10002",
    avatar: "https://i.ibb.co/0RyZjLt7/cv-Profile.png",
    work: ["Spotify New York", "Metropolitan Museum"],
    tags: ["Branding", "Visual", "Product Design", "Print & Editorial"],
    education: [
      {
        level: "Masters",
        institution: "Vision Institute of Pharmacy",
        marks: "80%",
        year: "2015-2018",
      },
      {
        level: "Bachelors",
        institution: "Vision Institute of Pharmacy",
        marks: "80%",
        year: "2009-2015",
      },
    ],
  };
  const transactions = [
    {
      id: 1,
      status: "pending",
      book_title: "Atomic Habits",
      profile: "Mamun",
      request_date: "2025-05-24",
    },
    {
      id: 2,
      status: "borrow",
      book_title: "Clean Code",
      profile: "Mamun",
      request_date: "2025-05-25",
    },
    {
      id: 3,
      status: "returned",
      book_title: "The Pragmatic Programmer",
      profile: "Mamun",
      request_date: "2025-05-20",
    },
      {
      id: 4,
      status: "pending",
      book_title: "The Pragmatic Programmer",
      profile: "Mamun",
      request_date: "2025-05-20",
    },
        {
      id: 5,
      status: "borrow",
      book_title: "The Pragmatic Programmer",
      profile: "Mamun",
      request_date: "2025-05-20",
    },
          {
      id: 6,
      status: "pending",
      book_title: "The Pragmatic Programmer",
      profile: "Mamun",
      request_date: "2025-05-20",
    },
            {
      id: 7,
      status: "borrow",
      book_title: "The Pragmatic Programmer",
      profile: "Mamun",
      request_date: "2025-05-20",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "borrow":
        return <BookOpen className="text-blue-600 w-5 h-5" />;
      case "returned":
        return <CheckCircle className="text-green-600 w-5 h-5" />;
      default:
        return <Clock className="text-gray-400 w-5 h-5" />;
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token_id");
    if (!token) {
      alert("No token found, you are probably already logged out.");
      return;
    }

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
  };

  return (
    <div className="bg-gray-100 py-6 flex justify-center">
      <div className="w-full max-w-7xl  rounded-lg  ">
        {/* Header */}
        <div className="flex flex-col bg-white md:flex-row md:justify-between items-center border-b border-gray-300 pb-6 mb-6 p-8 rounded-md">
          <div className="flex items-center space-x-6">
            <img
              src={student.avatar}
              alt="Avatar"
              className="w-36 h-36 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2> 
              <p className="text-gray-600">anmamun0@gmail.com</p>
              <p className="text-gray-600">+8801782 059949</p>
              <p className="text-gray-600">CSE 21-22</p>
              <p className="text-blue-600 font-semibold text-sm">
                {student.rating} ★★★★★
              </p>
            </div>
          </div>
<div className="flex flex-wrap items-start gap-6 p-6 bg-white rounded-lg shadow-sm max-w-lg">
  {/* Student Info */}
  <ul className="flex flex-col gap-3 text-gray-700 text-sm flex-grow">
    <li className="flex items-center gap-3">
      <BookOpen className="w-5 h-5 text-gray-500" />
      <span><strong>Books Read:</strong> {student.booksRead}</span>
    </li>
    <li className="flex items-center gap-3">
      <UserCheck className="w-5 h-5 text-gray-500" />
      <span><strong>Account Activated:</strong> {student.accountCreated}</span>
    </li>
    <li className="flex items-center gap-3">
      <Clock className="w-5 h-5 text-gray-500" />
      <span><strong>Last Active:</strong> 4 July 2025</span>
    </li>
  </ul>

  {/* Buttons Stack */}
  <div className="flex flex-col gap-3">
      <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800 text-sm transition">
      Books
    </button> 
    <button onClick={handleLogout} className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-800 text-sm transition">
      Logout
    </button>
 
  </div>
</div>


          

        </div>

        {/* Personal Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 my-4 ">
          <div className="bg-white rounded-md  p-10 shadow-sm">
            <div className="flex justify-between pb-3">
              <h3 className="font-semibold text-lg mb-4">Personal Details</h3>
              <i class="fa-solid fa-pen text-gray-600"></i>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-700">
              <ul className="space-y-3">
                <li>
                  <strong>Full Name</strong>
                  <div>{student.name}</div>
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
                  <div>{student.permanentAddress}</div>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <strong>Username</strong>
                  <div>{student.username}</div>
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

          {/* Academic Info */}
          <div className="bg-white rounded-md  p-8 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Transaction</h3>
            <div className="flex gap-4 mb-6">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-yellow-400 text-yellow-700 bg-yellow-100 hover:bg-yellow-200 transition">
                <Clock className="w-4 h-4" />
                Pending
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-blue-400 text-blue-700 bg-blue-100 hover:bg-blue-200 transition">
                <BookOpen className="w-4 h-4" />
                Borrow
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-green-400 text-green-700 bg-green-100 hover:bg-green-200 transition">
                <CheckCircle className="w-4 h-4" />
                Returned
              </button>
            </div>
            <div className="h-[400px] overflow-y-auto ">
              <ul className="space-y-4 p-4 bg-white shadow rounded-lg max-w-xl  mx-auto mt-6">
                {transactions.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex gap-4 items-start border-b pb-3 "
                  >
                    {/* Icon */}
                    <div className="mt-1">{getStatusIcon(tx.status)}</div>
                    {/* Info */}
                    <div className="w-3/4">
                      <h4 className="font-medium text-gray-800">
                        {tx.book_title}
                      </h4>
                      <div className="flex justify-between gap-6 ">
                        <p className="text-sm text-gray-600">
                          Status:{" "}
                          <span className="capitalize">{tx.status}</span>
                        </p>
                        <p className="text-sm -mt-2 text-gray-500">
                          {new Date(tx.request_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Workplaces */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Workplaces</h3>
          <ul className="text-gray-700 text-sm space-y-1">
            {student.work.map((item, idx) => (
              <li key={idx} className="bg-gray-100 p-2 rounded">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            {student.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
