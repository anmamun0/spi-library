import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import campus from "../assets//images/spi-5.jpg";
import campus1 from "../assets/images/spi-3.jpg";
import campus2 from "../assets/images/spi-6.jpg";
import campus3 from "../assets/images/spi-1.jpg";

import {
  BookOpen,
  Code,
  Brain,
  Database,
  Server,
  Lock,
  Globe,
  Calculator,
  Cloud,
  Atom,
  Cpu,
  LayoutDashboard,
  Paintbrush,
  Music,
  Book,
  MessageCircle,
  FileText,
  Hammer,
  FlaskConical,
  GraduationCap,
  Users,
  ShieldCheck,
  BarChart3,
  Languages,
  FolderGit2,
  Search,
  Download,
  Music2,
  History,
  Library,
  BookOpenCheck,
  CalendarDays,
  MapPin,
  BookMarked,
  Clock,
  User,
  Hash,
  Calendar,
  Star,
} from "lucide-react";
import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";
import { useBooks } from "../context/BookContext";
import axios from "axios";

export default function Home() {
  const [activeTab, setActiveTab] = useState("toppers");

  const { books, students, loading, error } = useBooks();

  const [notices] = useState([
    { title: "Final Exam Routine Published", date: "2025-06-10" },
    { title: "Library Will Remain Closed on June 15", date: "2025-06-09" },
    { title: "Project Submission Deadline Extended", date: "2025-06-08" },
  ]);

  const [topBooks] = useState([
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      cover: "https://example.com/book1.jpg",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      cover: "https://example.com/book2.jpg",
    },
    {
      title: "Introduction to Algorithms",
      author: "Cormen et al.",
      cover: "https://example.com/book3.jpg",
    },
  ]);

  const categories = [
    { id: 1, name: "Programming", icon: Code },
    { id: 2, name: "Artificial Intelligence", icon: Brain },
    { id: 3, name: "Database", icon: Database },
    { id: 4, name: "Cybersecurity", icon: Lock },
    { id: 5, name: "Cloud Computing", icon: Cloud },
    { id: 6, name: "Web Development", icon: LayoutDashboard },
    { id: 7, name: "Networking", icon: Globe },
    { id: 8, name: "Mathematics", icon: Calculator },
    { id: 9, name: "Physics", icon: Atom },
    { id: 10, name: "Computer Architecture", icon: Cpu },
    { id: 11, name: "Library Science", icon: BookOpen },
    { id: 12, name: "Design & UI/UX", icon: Paintbrush },
    { id: 13, name: "Music Theory", icon: Music },
    { id: 14, name: "Literature", icon: Book },
    { id: 15, name: "Communication", icon: MessageCircle },
    { id: 16, name: "Writing & Publishing", icon: FileText },
    { id: 17, name: "Engineering", icon: Hammer },
    { id: 18, name: "Chemistry", icon: FlaskConical },
    { id: 19, name: "Education", icon: GraduationCap },
    { id: 20, name: "Social Science", icon: Users },
    { id: 21, name: "Law & Ethics", icon: ShieldCheck },
    { id: 22, name: "Data Analysis", icon: BarChart3 },
    { id: 23, name: "Linguistics", icon: Languages },
    { id: 24, name: "DevOps & Git", icon: FolderGit2 },
    { id: 25, name: "Server & Infrastructure", icon: Server },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Featured Library Section – Left Column */}
          <div className="lg:w-2/3">
            <img
              src={campus}
              alt="Library Reading Space"
              className="w-full h-96 object-cover rounded shadow pt-2"
            />

            <h3 className="text-2xl font-semibold mt-4 text-gray-800 flex items-center gap-2">
              <BookMarked className="text-blue-800" size={24} />
              Student Research & Digital Resource Center
            </h3>

            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <Clock className="text-gray-500" size={18} />
              Open Daily • Institute Operating Hours
            </p>

            <p className="text-sm text-gray-800 flex items-center gap-2">
              <MapPin className="text-gray-600" size={18} />
              Sylhet Polytechnic Institute, Sylhet, Bangladesh
            </p>

            <p className="text-sm text-gray-700 mt-3">
              Access a growing collection of research papers, academic books,
              journals, and e-learning tools at our dedicated student center.
              Designed to support your academic journey with a quiet reading
              environment and digital facilities.
            </p>

            <button className="mt-6 border border-blue-800 text-blue-800 px-6 py-2 rounded-full hover:bg-blue-50 transition">
              <Link to="/helpsupport">Learn More → </Link>
            </button>
          </div>

          <div className="lg:w-1/3 space-y-6">
            {/* Tabs */}
            <div className="grid grid-cols-3 pb-2 text-sm font-semibold uppercase text-center">
              <span
                onClick={() => setActiveTab("toppers")}
                className={`cursor-pointer ${
                  activeTab === "toppers"
                    ? "text-blue-800 border-b-2 border-blue-800 "
                    : "hover:text-blue-800"
                }`}
              >
                Toppers
              </span>
              <span
                onClick={() => setActiveTab("notices")}
                className={`cursor-pointer ${
                  activeTab === "notices"
                    ? "text-blue-800 border-b-2 border-blue-800"
                    : "hover:text-blue-800"
                }`}
              >
                Notices
              </span>
              <span
                onClick={() => setActiveTab("books")}
                className={`cursor-pointer ${
                  activeTab === "books"
                    ? "text-blue-800 border-b-2 border-blue-800"
                    : "hover:text-blue-800"
                }`}
              >
                Top Books
              </span>
            </div>

            {/* Conditional Sections */}
            {activeTab === "toppers" && (
              <div className="max-w-lg mx-auto">
                <h3 className="flex items-center gap-2 text-md font-semibold text-gray-800 mb-4">
                  <span>Top 10 Readers Students </span>
                </h3>

                {/* Container with max height on md screens and vertical scroll with thin scrollbar */}
                <div
                  className=" md:max-h-[25.5rem] lg:max-h-[20.5rem] md:max-h-66 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#EBEBEA #fff", // Firefox thumb and track
                  }}
                >
                  {students.map((student, index) => (
                    <div
                      key={student.id}
                      className="flex flex-col p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-500 transition cursor-pointer shadow-sm"
                      title={`${student.full_name} - ${student.department}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-semibold text-indigo-600">{`#${
                            index + 1
                          }`}</div>
                          <User size={22} className="text-indigo-500" />
                          <h4 className="font-semibold text-gray-900">
                            {student.full_name}
                          </h4>
                        </div>

                        <div className="flex space-x-1">
                          {[...Array(Math.round(student.rating))].map(
                            (_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-yellow-400"
                              />
                            )
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium">
                          Roll: {student.roll}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                          Session: {student.session}
                        </span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium capitalize">
                          {student.department}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notices" && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg"> Recent Notices</h3>
                {notices.map((notice, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-semibold">{notice.title}</p>
                    <p className="text-gray-500 text-xs">{notice.date}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "books" && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Top Books</h3>
                {topBooks.map((book, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded shadow"
                    />
                    <div>
                      <p className="font-semibold text-sm">{book.title}</p>
                      <p className="text-xs text-gray-500">by {book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="my-10 px-4 mx-auto">
          <div className="p-2 mx-auto flex justify-center">
            <h2 className="relative text-2xl lg:text-3xl text-center font-semibold text-gray-800 mb-8 select-none max-w-max">
              Browse Book Categories
              <span className="absolute left-0 -bottom-2 w-20 h-1 bg-blue-700 rounded-full"></span>
            </h2>
          </div>

          <div
            className="py-8 mx-auto max-w-5xl flex overflow-x-auto gap-6 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 scroll-smooth
    "
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#DDDEDC #f3f4f6", // Firefox thumb and track
            }}
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  to={`/books?category=${cat.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="block"
                >
                  <div
                    key={cat.id}
                    className="relative group flex-shrink-0 bg-white border border-gray-200 shadow-sm rounded-3xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    tabIndex={0}
                    data-tooltip-id={`tooltip-${cat.id}`}
                    data-tooltip-content={cat.name}
                  >
                    <Tooltip
                      id={`tooltip-${cat.id}`}
                      place="top"
                      className=" text-sm font-semibold rounded-md px-2 py-1 bg-black text-white z-20"
                    />
                    <Icon
                      className="text-indigo-600 transition-colors duration-300 group-hover:text-indigo-800"
                      size={36} // increased size here
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <section className="bg-white text-gray-800 py-14 px-4 md:px-16 rounded rounded-2xl my-10">
          {/* Search Area */}
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Text */}
              <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Welcome to our Digital Library — explore millions of free books,
                articles, documents, archives, audio, and more.
              </p>

              {/* Search Bar */}
              <div className="flex w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search by title, author, or keyword"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-900">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Library Help Cards */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
              <Search className="mx-auto text-indigo-600 mb-3" size={32} />
              <p className="text-sm font-medium text-gray-700">
                Searching Books & Journals
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
              <BookOpen className="mx-auto text-indigo-600 mb-3" size={32} />
              <p className="text-sm font-medium text-gray-700">
                Reading eBooks Online
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
              <Download className="mx-auto text-indigo-600 mb-3" size={32} />
              <p className="text-sm font-medium text-gray-700">
                Downloading PDF or EPUB
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
              <Library className="mx-auto text-indigo-600 mb-3" size={32} />
              <p className="text-sm font-medium text-gray-700">
                Explore Digital Archives
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
