import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../context/BookContext";
import { BookUserIcon } from "lucide-react";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [book, setBook] = useState(null);

  const { books } = useBooks();
  // Mock data for related and suggested books
 

  const suggestedBooks = ["Clean Code", "You Don’t Know JS", "Design Patterns"];

  const handleBookClick = (id,isbn,title) => {
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
    if (books.length > 0) {
      // Find the book with the matching id (id from params might be string, so convert to number if needed)
      const foundBook = books.find((b) => String(b.id) === String(id));
      setBook(foundBook || null);
    }
    }, [books, id]);
  
  

  const handleBorrow = () => {
    if (book.available > 0) {
      alert(`You have successfully borrowed "${book.title}"`);
    } else {
      alert(`"${book.title}" is currently not available.`);
    }
  };

  if (!book) return <div className="text-center py-20 text-lg">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 ">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-6"
      >
        ← Back to Library
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start ">
        <div className=" ">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-auto max-w-xs rounded-lg shadow-lg mx-auto  "
          />
        </div>

        <div className=" my-auto p-4">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">ISBN:</span> {book.isbn}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">Language:</span> {book.language}
          </p>

          <div className="mt-2">
            <span
              className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${
                book.available > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {book.available > 0 ? "Available" : "Not Available"}
            </span>
          </div>

          <p className="mt-4 text-gray-800">{book.description.slice(0, 400)}</p>

          <button
            onClick={handleBorrow}
            disabled={book.available === 0}
            className={`mt-6 px-6 py-2 text-white font-semibold rounded-xl shadow ${
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
    {books.length === 0 && (
      <p className="text-gray-600">No related books found.</p>
    )}
    {books.map((relatedBook) => (
      <div
        key={relatedBook.id}
        className="flex-shrink-0 w-36 p-3 bg-green-50 rounded-lg shadow cursor-pointer hover:bg-green-100"
        onClick={() =>
          handleBookClick(relatedBook.id, relatedBook.isbn, relatedBook.title)
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
        <p className="text-xs text-gray-600">ISBN: {relatedBook.isbn}</p>
        <p
          className={`text-xs font-medium mt-1 ${
            relatedBook.available > 0 ? "text-green-700" : "text-red-600"
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
          {reviews.map((review, i) => (
            <div
              key={i}
              className="border border-gray-200 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold">{review.reviewer}</h4>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}{" "}
                  <span className="text-gray-400">
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
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
