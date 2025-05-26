import React from "react";
import { useNavigate } from "react-router-dom";

const BookDetails = () => {
  const navigate = useNavigate();

  // Simulated Book Data (Replace with props or API fetch)
  const book = {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    genre: "Programming",
    published: "1999",
    description: `One of the most influential books in software engineering. Covers best practices, code craftsmanship, and timeless career advice.`,
    coverImage:
      "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX380_BO1,204,203,200_.jpg",
    availability: true,
    categories: ["Programming", "Software", "Career", "Development"],
    reviews: [
      {
        reviewer: "John Doe",
        rating: 5,
        comment: "Absolutely essential for every programmer!",
      },
      {
        reviewer: "Jane Smith",
        rating: 4,
        comment: "Very practical and insightful.",
      },
    ],
  };

  const relatedBooks = [
    "Clean Code",
    "You Don’t Know JS",
    "Code Complete",
    "Refactoring",
  ];

  const suggestedBooks = [
    "Design Patterns",
    "Structure and Interpretation of Computer Programs",
    "The Mythical Man-Month",
  ];

  const handleBorrow = () => {
    if (book.availability) {
      alert(`You have successfully borrowed "${book.title}"`);
    } else {
      alert(`"${book.title}" is currently not available.`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-6"
      >
        ← Back to Library
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Cover Image */}
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-auto max-w-sm rounded-lg shadow-lg mx-auto"
        />

        {/* Book Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Published:</span> {book.published}
          </p>

          {/* Availability */}
          <div className="mt-2">
            <span
              className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${
                book.availability
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {book.availability ? "Available" : "Not Available"}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-800">{book.description}</p>

          {/* Borrow Button */}
          <button
            onClick={handleBorrow}
            disabled={!book.availability}
            className={`mt-6 px-6 py-2 text-white font-semibold rounded-full shadow ${
              book.availability
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {book.availability ? "Borrow Book" : "Not Available"}
          </button>

          {/* Categories */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {book.categories.map((cat, i) => (
                <span
                  key={i}
                  className="bg-slate-200 px-3 py-1 rounded-full text-sm hover:bg-slate-300 cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reader Reviews</h2>
        <div className="space-y-4">
          {book.reviews.map((review, i) => (
            <div
              key={i}
              className="border border-gray-200 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold">{review.reviewer}</h4>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}{" "}
                  <span className="text-gray-400">
                    {5 - review.rating > 0 ? "☆".repeat(5 - review.rating) : ""}
                  </span>
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Books */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Books</h2>
        <div className="flex flex-wrap gap-3">
          {relatedBooks.map((title, index) => (
            <span
              key={index}
              className="bg-green-100 px-4 py-1 rounded-full text-sm hover:bg-green-200 cursor-pointer"
            >
              {title}
            </span>
          ))}
        </div>
      </div>

      {/* Suggested Books */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Suggested for You</h2>
        <div className="flex flex-wrap gap-3">
          {suggestedBooks.map((title, index) => (
            <span
              key={index}
              className="bg-blue-100 px-4 py-1 rounded-full text-sm hover:bg-blue-200 cursor-pointer"
            >
              {title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
