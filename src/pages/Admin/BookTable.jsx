import React, { useState, useEffect } from 'react';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = {
    image: 'Image',
    title: 'Title',
    author: 'Author',
    isbn: 'ISBN',
    language: 'Language',
    description: 'Description',
    copies: 'Copies',
    available: 'Available',
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

  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch books from API on component mount
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://spi-library.onrender.com/book/books/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  // Filter books by search query across visible columns (except image)
  const filteredBooks = books.filter((book) => {
    if (!search.trim()) return true;

    const lowerSearch = search.toLowerCase();

    return Object.keys(visibleColumns)
      .filter((col) => visibleColumns[col] && col !== 'image')
      .some((col) => {
        const value = book[col];
        return value && value.toString().toLowerCase().includes(lowerSearch);
      });
  });

  if (loading) return <div className="p-4">Loading books...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4 space-y-6 max-w-full">
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search books..."
          className="border rounded px-3 py-2 w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Column Toggle */}
      <div className="flex flex-wrap gap-4 mb-4">
        {Object.entries(columns).map(([key, label]) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={visibleColumns[key]}
              onChange={() => toggleColumn(key)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              {visibleColumns.image && <th className="px-4 py-2">Image</th>}
              {visibleColumns.title && <th className="px-4 py-2">Title</th>}
              {visibleColumns.author && <th className="px-4 py-2">Author</th>}
              {visibleColumns.isbn && <th className="px-4 py-2">ISBN</th>}
              {visibleColumns.language && <th className="px-4 py-2">Language</th>}
              {visibleColumns.description && <th className="px-4 py-2">Description</th>}
              {visibleColumns.copies && <th className="px-4 py-2">Copies</th>}
              {visibleColumns.available && <th className="px-4 py-2">Available</th>}
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id} className="border-b hover:bg-gray-50">
                  {visibleColumns.image && (
                    <td className="px-4 py-2">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </td>
                  )}
                  {visibleColumns.title && <td className="px-4 py-2">{book.title}</td>}
                  {visibleColumns.author && <td className="px-4 py-2">{book.author}</td>}
                  {visibleColumns.isbn && <td className="px-4 py-2">{book.isbn}</td>}
                  {visibleColumns.language && <td className="px-4 py-2">{book.language}</td>}
                  {visibleColumns.description && (
                    <td className="px-4 py-2 max-w-xl truncate" title={book.description}>
                      {book.description}
                    </td>
                  )}
                  {visibleColumns.copies && <td className="px-4 py-2">{book.copies}</td>}
                  {visibleColumns.available && <td className="px-4 py-2">{book.available}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.values(visibleColumns).filter(Boolean).length} className="text-center py-4">
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
