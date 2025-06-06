import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../../context/BookContext";
import { BookUserIcon } from "lucide-react";
import axios from "axios";
import BookViewers from "./BookViewers";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]);

  const { books, setBooks } = useBooks();
  const [showModal, setShowModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState(7); // default
  const [borrowError, setBorrowError] = useState(""); // Error state
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        localStorage.setItem("loader", true);
        const res = await fetch("https://spi-library.onrender.com/book/books/");
        const data = await res.json();
        setBooks(data);
        console.log("Successfully Books data loaded");
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        localStorage.setItem("loader", false);
      }
    };

    if (!books) {
      fetchBooks();
    }
  }, [books, setBooks]);

  useEffect(() => {
    if (!books) {
      setAllBooks([]);
    } else {
      setAllBooks(books);
    }
  }, [books]);
  // Mock data for related and suggested books

  const suggestedBooks = ["Clean Code", "You Don’t Know JS", "Design Patterns"];

  const handleBookClick = (id, isbn, title) => {
    navigate(`/bookdetails/${id}/${isbn}/${title}/`);
  };

  // Mock reviews
  const reviews = [
    {
      reviewer: "AN Mamun",
      rating: 5,
      comment: "Fantastic book! Helped me a lot with my studies.",
    },
    {
      reviewer: "Shuvo",
      rating: 4,
      comment: "Very informative and well-written.",
    },
    {
      reviewer: "Jannat",
      rating: 3,
      comment: "Good, but could be more detailed in some chapters.",
    },
  ];

  useEffect(() => {
    if (allBooks.length > 0) {
      // Find the book with the matching id (id from params might be string, so convert to number if needed)
      const foundBook = allBooks.find((b) => String(b.id) === String(id));
      setBook(foundBook || null);
    }
  }, [allBooks, id]);

  const handleBorrow = () => {
    setShowModal(true);
  };
  const confirmBorrow = async () => {
    setIsLoading(true);
    setBorrowError("");

    try {
      const token = localStorage.getItem("token_id");
      const headers = {
        Authorization: `Token ${token}`,
      };

      const response = await axios.post(
        "https://spi-library.onrender.com/transaction/transactions/",
        {
          book: book.id,
          due_date: selectedDays,
        },
        { headers }
      );

      setShowModal(false);
    } catch (error) {
      if (error.response) {
        setBorrowError(
          error.response.data?.existing ||
            error.response.data?.error ||
            "Failed to borrow the book."
        );
      } else {
        setBorrowError("Network error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get("https://spi-library.onrender.com/book/categories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  if (!book) return <div className="text-center py-20 text-lg">Loading...</div>;

  return (
    <div className=" p-6 flex justify-center">
      <div className="w-full max-w-7xl mx-auto rounded-lg  ">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-6"
        >
          ← Back to Library
        </button>
        {/* Book Detail Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow-md">
          {/* Book Image */}
          <div className="flex  items-start">
            <img
              src={book.image}
              alt={book.title}
              className="h-52 w-auto md:h-auto md:w-full max-w-xs mx-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="  p-2">
            <h1 className="md:text-2xl  sm:text-3xl font-bold mb-4">
              {book.title}
            </h1>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">ISBN:</span> {book.isbn}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Language:</span> {book.language}
            </p>

            {/* Availability Badge */}
            <div className="mt-2">
              <span
                className={`inline-block px-4 py-1 text-sm font-medium rounded-xl border ${
                  book.available > 0
                    ? "bg-green-100 text-green-800 border-green-500"
                    : "bg-red-100 text-red-800 border-red-500"
                }`}
              >
                {book.available > 0
                  ? `Available (${book.available} copies)`
                  : "Not Available"}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-800 text-sm sm:text-base">
              {book.description.slice(0, 400)}
            </p>

            {/* Borrow Button */}
            <button
              onClick={handleBorrow}
              disabled={book.available === 0}
              className={`mt-6 px-6 py-2 text-white font-semibold rounded-xl shadow transition ${
                book.available > 0
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {book.available > 0 ? "Borrow Book" : "Not Available"}
            </button>
          </div>
        </div>
        {/* Suggested Books */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Category of the book</h2>
          <div className="flex flex-wrap gap-3">
            {book.category.map((cat) => (
              <span
                key={cat.id}
                className="bg-slate-200 px-3 py-1 rounded-full text-sm hover:bg-slate-300 cursor-pointer"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* Related Books Slider */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Books</h2>
          <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {allBooks.length === 0 && (
              <p className="text-gray-600">No related books found.</p>
            )}
            {allBooks.map((relatedBook) => (
              <div
                key={relatedBook.id}
                className="flex-shrink-0 w-36 p-3 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-green-100"
                onClick={() =>
                  handleBookClick(
                    relatedBook.id,
                    relatedBook.isbn,
                    relatedBook.title
                  )
                }
              >
                <img
                  src={relatedBook.image}
                  alt={relatedBook.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3
                  className="text-sm font-semibold truncate"
                  title={relatedBook.title}
                >
                  {relatedBook.title}
                </h3>
                <p className="text-xs text-gray-600">
                  ISBN: {relatedBook.isbn}
                </p>
                <p
                  className={`text-xs font-medium mt-1 ${
                    relatedBook.available > 0
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {relatedBook.available > 0
                    ? `${relatedBook.available} available`
                    : "Not available"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Reader Reviews</h2>
          <div className="space-y-4">
            {book && (
              <div>
                <BookViewers viewers_profile={book.viewers_profile} />
              </div>
            )}
          </div>
        </div>

        {/* All Categories */}
        <div className="my-12">
          <h2 className="text-xl font-semibold mb-4">Suggested for You</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category.id}
                className="bg-green-100 px-4 py-1 rounded-full text-sm hover:bg-green-200 cursor-pointer"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
            <div className="backdrop-blur-md bg-white/80 rounded-2xl shadow-xl p-10 max-w-lg w-full relative">
              <h2 className="text-2xl font-bold mb-3 text-center text-blue-700">
                Confirm Borrow
              </h2>
              <p className="text-sm text-gray-600 text-center mb-4">
                You are borrowing: <strong>{book.title}</strong>
                <br />
                ISBN:{" "}
                <span className="text-gray-800 font-medium">{book.isbn}</span>
              </p>

              <div className="my-4">
                <label className="block font-medium mb-1 text-gray-700">
                  Select Duration:
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[3, 7, 10, 15, 30, 40].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDays(day)}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold border border-gray-400 transition-all duration-200 ${
                        selectedDays === day
                          ? "bg-blue-600 text-white border-blue-700"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {day} days
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBorrow}
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 shadow flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>

              {borrowError && (
                <p className="text-red-600 text-sm mt-4 text-center">
                  {borrowError}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
