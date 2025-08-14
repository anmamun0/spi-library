import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLibraryData } from "../../context/Admin/useLibraryData";
import {
  LoaderCircle,
  Pencil,
  Save,
  X,
  BookOpenCheck,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import DeshboardHead from "../../components/Admin/DeshboardHead";
import Select from "react-select";
import axios from "axios";


const BookDetailsAdmin = () => {
  const { book_id } = useParams();
  const { allBooks, loading, error } = useLibraryData();

  const isAddMode = book_id === "add";

  const [book, setBook] = useState(null);
  const [editMode, setEditMode] = useState(isAddMode); // Add mode starts in edit
  const [editedBook, setEditedBook] = useState({
    title: "",
    author: "",
    isbn: "",
    language: "",
    description: "",
    category: [],
    copies: 1,
    available: 1,
    image: "",
  });
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    fetch("https://spi-library.onrender.com/book/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  // Load book for edit/view
  useEffect(() => {
    if (!isAddMode && allBooks && allBooks.length > 0) {
      const foundBook = allBooks.find((b) => b.id === parseInt(book_id));
      if (foundBook) {
        setBook(foundBook);
        setEditedBook(foundBook);
      }
    }
  }, [allBooks, book_id, isAddMode]);

  if (loading)
    return (
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <DeshboardHead
          icon={BookOpenCheck}
          heading="All Books"
          subheading="Manage and view all library books"
        />
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center text-center gap-2 text-gray-500 text-sm animate-pulse py-6">
            <LoaderCircle className="w-8 h-8 animate-spin" />
            <span>Loading book details...</span>
          </div>
        </div>
      </div>
    );

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  // Handlers
  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    if (!isAddMode) setEditedBook(book);
    else
      setEditedBook({
        title: "",
        author: "",
        isbn: "",
        language: "",
        description: "",
        category: [],
        copies: 1,
        available: 1,
        image: "",
      });
  };

  const handleChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setEditedBook({ ...editedBook, image: URL.createObjectURL(file) });
  };

const token = localStorage.getItem("token_id"); 
const headers = {
  Authorization: `Token ${token}`,
};

const handleSave = async () => {
  // Build payload exactly as backend expects
  const payload = {
    image: editedBook.image || null,           // Book image URL
    title: editedBook.title,
    author: editedBook.author,
    isbn: editedBook.isbn,
    language: editedBook.language,
    description: editedBook.description,
    copies: editedBook.copies,
    available: editedBook.available,
    category_ids: editedBook.category.map((c) => c.id), // IDs array
  };

  try {
    let response;
    if (isAddMode) {
      // POST request for new book
      console.log(payload);

      response = await axios.post(
        "http://spi-library.onrender.com/book/books/",
        payload,
        { headers }
      );
      alert(`New Book Added with ID ${response.data.id}`);
    } else {
      // PATCH request to update existing book
      response = await axios.patch(
        `http://spi-library.onrender.com/book/books/${book_id}/`,
        payload,
        { headers }
      );
      alert(`Book ${book_id} updated successfully`);
    }

    setBook(response.data);
    setEditMode(false);

  } catch (err) {
    console.error("Failed to save book", err);
    if (err.response && err.response.data) {
      // Show detailed error from backend
      alert(`Failed to save book: ${JSON.stringify(err.response.data)}`);
    } else {
      alert("Failed to save book: Network or unknown error");
    }
  }
};


const handleDelete = async () => {
  try {
    await axios.delete(
      `https://spi-library.onrender.com/book/books/${book_id}/`,
      { headers }
    );
    alert(`Book ${book_id} deleted successfully`);
    setShowConfirm(false);
    // Optional: redirect to books list
    window.location.href = "/admin/books"; 
  } catch (err) {
    console.error("Failed to delete book", err);
    if (err.response && err.response.data) {
      alert(`Failed to delete book: ${JSON.stringify(err.response.data)}`);
    } else {
      alert("Failed to delete book: Network or unknown error");
    }
  }
};



  return (
    <div className="p-4 space-y-6 max-w-full mb-10">
      <DeshboardHead
        icon={BookOpenCheck}
        heading={isAddMode ? "Add Book" : "Book Details"}
        subheading={
          isAddMode
            ? "Fill the form to add a new book"
            : "View and manage the book details"
        }
      />

      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6  ">
        {/* Left Column - Image + Copies */}
        <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
          {/* Image Preview or Placeholder */}
          {editedBook.image ? (
            <img
              src={editedBook.image}
              alt={editedBook.title || "Book Image"}
              className="border-2 border-dashed border-gray-400 rounded-xl h-80 w-auto "
            />
          ) : (
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded-xl text-gray-500 text-sm border border-gray-200">
              No Image
            </div>
          )}

          {/* Editable Mode */}
          {editMode && (
            <>
{/* Image URL Input */}
<div className="w-full">
  <input
    type="text"
    name="image"
    value={editedBook.image || ""}
    onChange={(e) =>
      setEditedBook({ ...editedBook, image: e.target.value })
    }
    placeholder="Paste image URL here"
    className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
  />
</div>



              {/* Copies Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 w-full">
                {/* Total Copies */}
                <div className="relative">
                  <input
                    type="number"
                    name="copies"
                    value={editedBook.copies}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 shadow-sm bg-gray-50"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-200">
                    Total Copies
                  </label>
                </div>

                {/* Available Copies */}
                <div className="relative">
                  <input
                    type="number"
                    name="available"
                    value={editedBook.available}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 shadow-sm bg-gray-50"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-200">
                    Available Copies
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Form / Details */}
        <div className="w-full md:w-2/3 space-y-8 py-2">
          {editMode ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-gray-700">
                    Book Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editedBook.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-0 focus:ring-gray-400 focus:border-gray-500 shadow-sm transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-gray-700">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={editedBook.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-gray-700">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={editedBook.isbn}
                    onChange={handleChange}
                    placeholder="Enter ISBN number"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-gray-700">
                    Language
                  </label>
                  <input
                    type="text"
                    name="language"
                    value={editedBook.language}
                    onChange={handleChange}
                    placeholder="Enter book language"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                  />
                </div>

                {/* Categories Multi-Select */}
                <div className="flex flex-col md:col-span-2">
                  <label className="mb-2 font-medium text-gray-700">
                    Categories
                  </label>
                  <Select
                    isMulti
                    isClearable
                    value={editedBook.category.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                    options={categories.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                    onChange={(selectedOptions) => {
                      setEditedBook({
                        ...editedBook,
                        category: selectedOptions
                          ? selectedOptions.map((opt) => ({
                              id: opt.value,
                              name: opt.label,
                            }))
                          : [],
                      });
                    }}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select categories..."
                  />
                </div>
              </div>
            </>
          ) : (
            book && (
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-800">
                  {book.title}
                </h2>
                <p className="text-gray-600">
                  <span className="font-semibold">Author:</span> {book.author}
                </p>
                <p className="text-gray-600 space-x-3">
                  <span className="font-semibold">ISBN:</span>
                  <span className="bg-purple-100 text-md text-red-500 px-4 py-1 rounded-full text-sm font-bold">
                    {book.isbn}
                  </span>
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Language:</span>{" "}
                  {book.language}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Categories:</span>{" "}
                  {book.category
                    ? book.category.map((c) => c.name).join(", ")
                    : ""}
                </p>
                {/* Copies Status */}
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg shadow-sm">
                    <span className="text-2xl font-bold text-gray-900">
                      {book.copies}
                    </span>
                    <span className="text-gray-500 text-sm">Total Copies</span>
                  </div>
                  <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg shadow-sm">
                    <span className="text-2xl font-bold text-green-700">
                      {book.available}
                    </span>
                    <span className="text-green-600 text-sm">Available</span>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Action Buttons */}
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
              !isAddMode && (
                <div className="flex items-center gap-3">
                  {/* Edit Button */}
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition"
                  >
                    <Pencil size={18} /> Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-sm transition"
                  >
                    <Trash2 size={18} /> Delete
                  </button>

                  {/* Confirmation Modal */}
                  {showConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <AlertTriangle className="text-red-500" size={24} />
                          <h2 className="text-lg font-semibold text-gray-800">
                            Confirm Delete
                          </h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                          Are you sure you want to delete this book? This action
                          cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                          <button onClick={() => setShowConfirm(false)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-xl md:col-span-2">
        <label className="mb-1 font-semibold text-gray-700">Description</label>
        <textarea
          name="description"
          value={editedBook.description}
          onChange={(e) => {
            handleChange(e); // your existing state update
            e.target.style.height = "auto"; // reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // adjust height to content
          }}
          placeholder="Enter book description"
          className="border p-6 text-gray-700 bg-gray-50 border-gray-300 rounded-lg p-3 focus:outline-none 
    focus:ring-0 focus:ring-gray-500 focus:border-gray-500 shadow-sm transition 
    resize-none   min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default BookDetailsAdmin;
