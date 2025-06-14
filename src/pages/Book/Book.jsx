import React, { useState, useEffect } from "react";
import { useBooks } from "../../context/BookContext";
import {
  RotateCcw,
  LayoutGrid,
  AlignVerticalJustifyCenter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Book() {
  const { books } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    author: "",
    language: "",
    available: "",
    publisher: "",
  });
  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      author: "",
      language: "",
      available: "",
      publisher: "",
    });
  };
 

  useEffect(() => {
    if (books) {
      let result = [...books];

      // Search filter
      if (filters.search) {
        result = result.filter(
          (book) =>
            book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            book.isbn.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Category filter
      if (filters.category) {
        result = result.filter((book) =>
          book.category?.some(
            (cat) => cat.name.toLowerCase() === filters.category.toLowerCase()
          )
        );
      }

      // Author filter
      if (filters.author) {
        result = result.filter((book) =>
          book.author.toLowerCase().includes(filters.author.toLowerCase())
        );
      }

      // Language filter
      if (filters.language) {
        result = result.filter(
          (book) =>
            book.language &&
            book.language.toLowerCase() === filters.language.toLowerCase()
        );
      }

      // Publisher filter
      if (filters.publisher) {
        result = result.filter(
          (book) =>
            book.publisher &&
            book.publisher.toLowerCase() === filters.publisher.toLowerCase()
        );
      }

      // Availability filter
      if (filters.available === "available") {
        result = result.filter((book) => book.available > 0);
      } else if (filters.available === "not-available") {
        result = result.filter((book) => book.available === 0);
      }

      setFilteredBooks(result);
    }
  }, [books, filters]);

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  const handleBookClick = (id, isbn, title) => {
    navigate(`/bookdetails/${id}/${isbn}/${title}/`);
  };

  const uniqueCategories = books
    ? [
        ...new Set(
          books.flatMap((book) =>
            book.category ? book.category.map((cat) => cat.name) : []
          )
        ),
      ]
    : [];

  const uniqueLanguages = books
    ? [...new Set(books.map((book) => book.language).filter(Boolean))]
    : [];

  const uniquePublishers = books
    ? [...new Set(books.map((book) => book.publisher).filter(Boolean))]
    : [];

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="md:grid grid-cols-12 md:flex-row gap-6">
        <div className="col-span-9 px-4 ">
          {/* Book Count Box */}
          <div className="mb-6">
            <div className="flex justify-between bg-white border border-gray-300  rounded-xl shadow-sm px-4 py-3">
              <h2 className="md:text-lg font-semibold text-slate-700">
                Showing {filteredBooks.length}{" "}
                {filteredBooks.length === 1 ? "book" : "books"}
              </h2>

              <div className="flex items-center gap-4 text-slate-600">
                {/* Grid Layout Icon */}
                {/* Grid Layout Icon */}
                <LayoutGrid
                  onClick={() => setViewMode("grid")}
                  className={`w-5 h-5 transition cursor-pointer ${
                    viewMode === "grid"
                      ? "text-blue-700"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                  title="Grid Layout"
                />

                {/* List Layout Icon */}
                <AlignVerticalJustifyCenter
                  onClick={() => setViewMode("list")}
                  className={`w-5 h-5 transition cursor-pointer ${
                    viewMode === "list"
                      ? "text-blue-700"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                  title="List Layout"
                />

                {/* Reset Filters Button */}
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600 border border-slate-300 hover:border-red-500 rounded-md transition duration-200 bg-white hover:bg-red-50"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="flex flex-col space-y-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() =>
                    handleBookClick(book.id, book.isbn, book.title)
                  }
                  className="flex cursor-pointer bg-gray-50 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-4 px-6"
                >
                  <div className="w-20 h-full flex-shrink-0 mr-4">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover rounded-xl shadow-xl border border-gray-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-1">
                      <span className="font-medium">Category:</span>{" "}
                      {book.category?.map((cat) => cat.name).join(", ") ||
                        "Unknown"}
                    </p>
                    <p className="text-slate-600 text-sm mb-1">
                      <span className="font-medium">ISBN:</span> {book.isbn}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        book.available > 0
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {book.available > 0
                        ? `Available (${book.available} copies)`
                        : "Not Available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookClick(book.id)}
                  className="flex flex-col justify-between cursor-pointer bg-gray-50 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-4"
                >
                  <div>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-28 h-auto object-cover mx-auto rounded-lg border border-gray-300 mb-3"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-1">
                      <span className="font-medium">Category:</span>{" "}
                      {book.category?.map((cat) => cat.name).join(", ") ||
                        "Unknown"}
                    </p>
                    <p className="text-slate-600 text-sm mb-1">
                      <span className="font-medium">ISBN:</span> {book.isbn}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        book.available > 0
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {book.available > 0
                        ? `Available (${book.available} copies)`
                        : "Not Available"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="w-full md:w-80 shadow-sm sticky top-4 p-4 md:p-0 self-start">
          {/* 🔍 Search */}

          <div className="flex items-center gap-3 justify-between mb-4">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search books by isbn or title ..."
              className="w-full border border-gray-300  px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500 "
            />
          </div>

          <div className="bg-slate-50 border rounded  p-6 border-gray-300 ">
            {/* 🗂 Category */}
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 🌐 Language */}
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Language</label>
              <select
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All</option>
                {uniqueLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* 🏢 Publisher */}
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Publisher</label>
              <select
                name="publisher"
                value={filters.publisher}
                onChange={handleFilterChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All</option>
                {uniquePublishers.map((pub) => (
                  <option key={pub} value={pub}>
                    {pub}
                  </option>
                ))}
              </select>
            </div>

            {/* ✍️ Author */}
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Author</label>
              <input
                type="text"
                name="author"
                value={filters.author}
                onChange={handleFilterChange}
                placeholder="Author name..."
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* ✅ Availability */}
            <div className="mb-3">
              <label className="block mb-1 font-semibold">Availability</label>
              <select
                name="available"
                value={filters.available}
                onChange={handleFilterChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
