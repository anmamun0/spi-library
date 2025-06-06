// src/context/LibraryDataContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LibraryDataContext = createContext();

export const LibraryDataProvider = ({ children }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = {
          Authorization: `Token ${token}`,
        };

        const [studentsRes, booksRes, transactionsRes] = await Promise.all([
          axios.get("https://spi-library.onrender.com/user/profile/", {
            headers,
          }),
          axios.get("https://spi-library.onrender.com/book/books/", {
            headers,
          }),
          axios.get("https://spi-library.onrender.com/transaction/transactions/", {
            headers,
          }),
        ]);

        setAllStudents(studentsRes.data);
        setAllBooks(booksRes.data);
        setAllTransactions(transactionsRes.data); 
        console.log("✅ Library data loaded successfully.");
      } catch (err) {
        console.error("❌ Error loading library data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <LibraryDataContext.Provider
      value={{
        allStudents,
        allBooks,
        allTransactions,
        loading,
        error,
      }}
    >
      {children}
    </LibraryDataContext.Provider>
  );
};

export const useLibraryData = () => useContext(LibraryDataContext);
