import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLibraryData } from "../../context/Admin/useLibraryData";
import { Loader2, Pencil, Save, X ,LoaderCircle,BookOpenCheck} from "lucide-react";
import DeshboardHead from "../../components/Admin/DeshboardHead";

const BookDetailsAdmin = () => {
  const { book_id } = useParams();
  const { allBooks, loading, error } = useLibraryData();

  const [book, setBook] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    fetch("https://spi-library.onrender.com/book/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  // Find book when allBooks are loaded
  useEffect(() => {
    if (allBooks && allBooks.length > 0) {
      const foundBook = allBooks.find((b) => b.id === parseInt(book_id));
      setBook(foundBook);
      setEditedBook(foundBook); // initialize for editing
    }
  }, [loading, allBooks, book_id]);

  if (loading)
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4">
      <DeshboardHead icon={BookOpenCheck} heading="All Books" subheading="Manage and view all library books" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center text-center gap-2 text-gray-500 text-sm animate-pulse py-6">
            <LoaderCircle className="w-8 h-8 animate-spin" />
            <span>Loading student details...</span>
          </div>
        </div>
      </div>
    );
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  if (!book) {
    return (
      <div className="text-center text-gray-500 font-medium">
        Book not found.
      </div>
    );
  }

  // Handlers
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedBook(book); // reset
  };

  const handleChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => ({
      id: parseInt(opt.value),
      name: opt.text,
    }));
    setEditedBook({ ...editedBook, category: selected });
  };

  const handleSave = () => {
    // Send to backend if needed
    // Example: await axios.put(`/api/book/${book.id}`, payload);
    const updatedBook = {
      ...editedBook,
      category: editedBook.category.map((c) => c.id),
    };

    console.log("Saving Book:", updatedBook);

    setBook(editedBook); // update UI
    setEditMode(false);
  };

  return (
    <div className="p-4 space-y-6 max-w-full">
      <DeshboardHead icon={BookOpenCheck} heading="All Books" subheading="Manage and view all library books" />

      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img
            src={book.image}
            alt={book.title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          {editMode ? (
            <>
              <input
                type="text"
                name="title"
                value={editedBook.title}
                onChange={handleChange}
                className="w-full border rounded p-2 text-xl font-bold"
              />
              <input
                type="text"
                name="author"
                value={editedBook.author}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Author"
              />
              <input
                type="text"
                name="isbn"
                value={editedBook.isbn}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="ISBN"
              />
              <input
                type="text"
                name="language"
                value={editedBook.language}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Language"
              />

              <div>
                <label className="font-semibold">Categories:</label>
                <select
                  multiple
                  value={editedBook.category.map((c) => String(c.id))}
                  onChange={handleCategoryChange}
                  className="w-full border p-2 rounded"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="number"
                name="copies"
                value={editedBook.copies}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Total Copies"
              />
              <input
                type="number"
                name="available"
                value={editedBook.available}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Available"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
              <p className="text-gray-600">
                <span className="font-semibold">Author:</span> {book.author}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Language:</span> {book.language}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Categories:</span>{" "}
                {book.category.map((cat) => cat.name).join(", ")}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Total Copies:</span>{" "}
                {book.copies}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Available:</span>{" "}
                {book.available}
              </p>
            </>
          )}

          <div className="flex gap-3 mt-4">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  <Save size={18} /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  <X size={18} /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Pencil size={18} /> Edit
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
        {editMode ? (
          <textarea
            name="description"
            value={editedBook.description}
            onChange={handleChange}
            rows={6}
            className="w-full border rounded p-3"
          />
        ) : (
          <p className="text-gray-700 leading-relaxed">{book.description}</p>
        )}
      </div>
    </div>
  );
};

export default BookDetailsAdmin;
