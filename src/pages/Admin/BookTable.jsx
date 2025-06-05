import React, { useState, useEffect } from "react";
import { LayoutList, LoaderCircle,BookOpen ,BookOpenCheck } from "lucide-react";
import { useLibraryData } from "../../context/Admin/useLibraryData";
import { useNavigate } from "react-router-dom";

const BookTable = () => {
    const { allStudents, allBooks, allTransactions, loading, error } = useLibraryData();
   const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/admin/books/info/${id}`);
  };
  const [books, setBooks] = useState([]); 

  const columns = {
    image: "Image",
    isbn: "ISBN",
    title: "Title",
    author: "Author",
    copies: "Copies",
    available: "Available",
    language: "Language",
    description: "Description",
  };

  const [visibleColumns, setVisibleColumns] = useState({
    image: true,
    title: true,
    author: true,
    isbn: true,
    language: true,
    description: false,
    copies: true,
    available: true,
  });

  const [search, setSearch] = useState("");
  // Fetch students from API on component mount
  useEffect(() => {
        setBooks(allBooks);
  }, [loading]);
 

  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  // Filter books by search query across visible columns (except image)
  const filteredBooks = books.filter((book) => {
    if (!search.trim()) return true;

    const lowerSearch = search.toLowerCase();

    return Object.keys(visibleColumns)
      .filter((col) => visibleColumns[col] && col !== "image")
      .some((col) => {
        const value = book[col];
        return value && value.toString().toLowerCase().includes(lowerSearch);
      });
  });

  if (loading)
    return (
      <div>
        <div className="flex items-center text-center gap-2 text-gray-500 text-sm animate-pulse py-6">
          <LoaderCircle className="w-8 h-8 animate-spin" />
          <span>Loading all books data...</span>
        </div>
      </div>
    );
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 space-y-6 max-w-full">
     <div className="">
  <div className="flex items-center justify-between bg-white border border-gray-200 shadow-md rounded-xl px-6 py-4">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full bg-green-100 text-green-600">
        <BookOpenCheck size={28} />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">All Books</h1>
        <p className="text-sm text-gray-500">Manage and view all library books</p>
      </div>
    </div>
  </div>
</div>
      {/* Column Toggle Filters */}
      <div className="w-full  p-6  rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm">
        <div className="flex flex-col sm:flex-row  gap-6 mb-4 text-gray-800 ">
          <div className="flex items-center gap-2 ">
            <LayoutList className="w-5 h-5 text-blue-600" />
            <h3 className="text-md font-semibold">Show Columns</h3>
          </div>

          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search books..."
              className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div
          className="flex flex-wrap gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={{ scrollbarWidth: "thin", msOverflowStyle: "none" }} // Firefox + IE
        >
          {Object.entries(columns).map(([key, label]) => {
            const isActive = visibleColumns[key];
            return (
              <div
                key={key}
                onClick={() => toggleColumn(key)}
                className={`flex-shrink-0 flex items-center justify-center gap-2 text-sm rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition cursor-pointer select-none font-medium
            ${
              isActive
                ? "bg-blue-100 border border-blue-400 text-blue-700"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-300 border-b">
            <tr>
              {visibleColumns.image && <th className="px-4 py-3">Image</th>}
              {visibleColumns.isbn && <th className="px-4 py-2">ISBN</th>}
              {visibleColumns.title && <th className="px-4 py-2">Title</th>}
              {visibleColumns.author && <th className="px-4 py-2">Author</th>}
              {visibleColumns.description && (
                <th className="px-4 py-2">Description</th>
              )}
              {visibleColumns.copies && <th className="px-4 py-2">Copies</th>}
              {visibleColumns.available && (
                <th className="px-4 py-2">Available</th>
              )}
              {visibleColumns.language && (
                <th className="px-4 py-2">Language</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id} className="border-b hover:bg-gray-50" onClick={() => handleRowClick(book.id)}>
                  {visibleColumns.image && (
                    <td className="px-4 py-2" >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </td>
                  )}
                  {visibleColumns.isbn && (
                    <td className="px-4 py-2">{book.isbn}</td>
                  )}
                  {visibleColumns.title && (
                    <td className="px-4 py-2">{book.title}</td>
                  )}
                  {visibleColumns.author && (
                    <td className="px-4 py-2">{book.author}</td>
                  )}
                  {visibleColumns.description && (
                    <td
                      className="px-4 py-2 max-w-xl truncate"
                      title={book.description}
                    >
                      {book.description}
                    </td>
                  )}
                  {visibleColumns.copies && (
                    <td className="px-4 py-2">{book.copies}</td>
                  )}
                  {visibleColumns.available && (
                    <td className="px-4 py-2">{book.available}</td>
                  )}
                  {visibleColumns.language && (
                    <td className="px-4 py-2">{book.language}</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Object.values(visibleColumns).filter(Boolean).length}
                  className="text-center py-4"
                >
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;
