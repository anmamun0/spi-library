import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notices, setNotices] = useState([]);  // <-- নতুন

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        localStorage.setItem('loader', true);
        setLoading(true);

        const [booksRes, studentsRes, categoriesRes, noticesRes] = await Promise.all([
          axios.get("https://spi-library.onrender.com/book/books/"),
          axios.get("https://spi-library.onrender.com/user/profile/"),
          axios.get("https://spi-library.onrender.com/book/categories/"),
          axios.get("https://spi-library.onrender.com/notices/diploma/")  // <-- তোমার নোটিস API
        ]);

        setBooks(booksRes.data);
        setStudents(studentsRes.data);
        setCategories(categoriesRes.data);
        setNotices(noticesRes.data);  // <-- এখানে ডেটা সেট করো

        console.log("✅ All data loaded successfully.");
      } catch (err) {
        console.error("❌ Error loading data:", err);
        setError(err);
      } finally {
        setLoading(false);
        localStorage.setItem('loader', false);
      }
    };

    fetchData();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books, setBooks,
        students, setStudents,
        categories, setCategories,
        notices, setNotices,  
        loading,
        error
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
