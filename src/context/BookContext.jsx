// src/context/BookContext.jsx
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [categories, setCategories] = useState([]);  // New state for categories

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        localStorage.setItem('loader', true); 

        setLoading(true);

        // Fetch books, students, and categories simultaneously
        const [booksRes, studentsRes, categoriesRes] = await Promise.all([
          axios.get("https://spi-library.onrender.com/book/books/"),
          axios.get("https://spi-library.onrender.com/user/profile/"),
          axios.get("https://spi-library.onrender.com/book/categories/"),
        ]);

        setBooks(booksRes.data);
        setStudents(studentsRes.data);
        setCategories(categoriesRes.data);

        console.log("✅ Library, students, and categories data loaded successfully.");
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
      value={{ books, setBooks, students, setStudents, categories, setCategories, loading, error }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
