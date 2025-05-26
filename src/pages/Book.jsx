import React, { useState, useEffect } from "react";

const allBooks = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    image: "https://covers.openlibrary.org/b/id/9642096-L.jpg",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    category: "Programming",
    image: "https://covers.openlibrary.org/b/id/11132089-L.jpg",
  },
  {
    id: 3,
    title: "Data Structures",
    author: "Seymour Lipschutz",
    category: "Education",
    language: "English",
    image: "https://covers.openlibrary.org/b/id/8232006-L.jpg",
  },
  {
    id: 4,
    title: "Python Crash Course",
    author: "Eric Matthes",
    category: "Programming",
    image: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
  },
  {
    id: 5,
    title: "History of the World",
    author: "J.M. Roberts",
    category: "History",
    image: "https://covers.openlibrary.org/b/id/10222307-L.jpg",
  },
  {
    id: 6,
    title: "Mystery Novel",
    author: "Jane Doe",
    category: "Mystery",
    image: "https://via.placeholder.com/150x220?text=Mystery+Book",
  },

  {
    id: 7,
    title: "Mystery Novel",
    author: "Jane Doe",
    category: "Mystery",
    image: "https://via.placeholder.com/150x220?text=Mystery+Book",
  },

  {
    id: 8,
    title: "Mystery Novel",
    author: "Jane Doe",
    category: "Mystery",
    image: "https://via.placeholder.com/150x220?text=Mystery+Book",
  },
  {
    id: 8,
    title: "Mystery Novel",
    author: "Jane Doe",
    category: "Mystery",
    image: "https://via.placeholder.com/150x220?text=Mystery+Book",
  },

  {
    id: 8,
    title: "Mystery Novel",
    author: "Jane Doe",
    category: "Mystery",
    image: "https://via.placeholder.com/150x220?text=Mystery+Book",
  },

  {
    id: 8,
    title: "Mystery Novel",
    author: "Jane Doe",
    category: "Mystery",
    image: "https://via.placeholder.com/150x220?text=Mystery+Book",
  },
];

const uniqueCategories = [...new Set(allBooks.map((book) => book.category))];
const uniqueLanguages = [...new Set(allBooks.map((book) => book.language))];
const uniquePublishers = [...new Set(allBooks.map((book) => book.publisher))];

export default function Book() {
  const [filteredBooks, setFilteredBooks] = useState(allBooks);
  const [filters, setFilters] = useState({
    category: "",
    author: "",
    available: "",
    yearFrom: "",
    yearTo: "",
    search: "",
    language: "",
    ratingFrom: "",
    ratingTo: "",
    publisher: "",
    minPages: "",
    maxPages: "",
  });

  function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    let result = allBooks;

    if (filters.search)
      result = result.filter((book) =>
        book.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    if (filters.category)
      result = result.filter((book) => book.category === filters.category);
    if (filters.language)
      result = result.filter((book) => book.language === filters.language);
    if (filters.publisher)
      result = result.filter((book) => book.publisher === filters.publisher);
    if (filters.author)
      result = result.filter((book) =>
        book.author.toLowerCase().includes(filters.author.toLowerCase())
      );
    if (filters.available) {
      const avail = filters.available === "available";
      result = result.filter((book) => book.available === avail);
    }
    if (filters.yearFrom)
      result = result.filter((book) => book.year >= Number(filters.yearFrom));
    if (filters.yearTo)
      result = result.filter((book) => book.year <= Number(filters.yearTo));
    if (filters.ratingFrom)
      result = result.filter(
        (book) => book.rating >= Number(filters.ratingFrom)
      );
    if (filters.ratingTo)
      result = result.filter((book) => book.rating <= Number(filters.ratingTo));
    if (filters.minPages)
      result = result.filter((book) => book.pages >= Number(filters.minPages));
    if (filters.maxPages)
      result = result.filter((book) => book.pages <= Number(filters.maxPages));

    setFilteredBooks(result);
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto p-4 py-12">
      <h3 className="text-2xl font-semibold mt-1 pb-8">
        New Centennial Exhibition! 100: A Century of Collections, Community
      </h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.length === 0 ? (
            <p className="text-slate-600 col-span-full text-center">
              No books match your filters.
            </p>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white border border-slate-200 p-4 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-3 rounded"
                />
                <h3 className="text-xl font-bold text-slate-700 mb-1">
                  {book.title}
                </h3>
                <p className="text-slate-700">Author: {book.author}</p>
                <p className="text-slate-700">Category: {book.category}</p>
                <p
                  className={`font-semibold mt-1 ${
                    book.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.available ? "Available" : "Not Available"}
                </p>
              </div>
            ))
          )}
        </div>

        <aside className="w-full md:w-80 bg-slate-50 p-4 border rounded shadow-sm sticky top-4 self-start">
          <div className="mb-6">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search books..."
              className="w-full border px-4 py-2 rounded shadow-sm focus:ring-2 focus:ring-green-500"
            />
          </div>

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

          <div className="mb-3">
            <label className="block mb-1 font-semibold">Year Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="yearFrom"
                value={filters.yearFrom}
                onChange={handleFilterChange}
                placeholder="From"
                className="w-1/2 border px-2 py-1 rounded"
              />
              <input
                type="number"
                name="yearTo"
                value={filters.yearTo}
                onChange={handleFilterChange}
                placeholder="To"
                className="w-1/2 border px-2 py-1 rounded"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-semibold">Rating</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="ratingFrom"
                step="0.1"
                value={filters.ratingFrom}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-1/2 border px-2 py-1 rounded"
              />
              <input
                type="number"
                name="ratingTo"
                step="0.1"
                value={filters.ratingTo}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-1/2 border px-2 py-1 rounded"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-semibold">Pages</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPages"
                value={filters.minPages}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-1/2 border px-2 py-1 rounded"
              />
              <input
                type="number"
                name="maxPages"
                value={filters.maxPages}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-1/2 border px-2 py-1 rounded"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
