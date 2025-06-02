// src/context/ProfileContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [studentContext, setStudentContext] = useState(null);
  const [transactionsContext, setTransactionsContext] = useState(null);
  const [loading, setLoading] = useState(true); // optional
  const [error, setError] = useState(null); // optional

  useEffect(() => {
     const profile_id = localStorage.getItem("profile_id");
      const token = localStorage.getItem("token_id");
    const fetchProfileAndTransactions = async () => { 
      const headers = {
        Authorization: `Token ${token}`,
      };

      try {
        localStorage.setItem('loader', true); 

        const [profileRes, transactionRes] = await Promise.all([
          axios.get(
            `https://spi-library.onrender.com/user/profile/${profile_id}`,
            { headers }
          ),
          axios.get(
            "https://spi-library.onrender.com/transaction/transactions/",
            { headers }
          ),
        ]);

        setStudentContext(profileRes.data);
        setTransactionsContext(transactionRes.data);
        console.log(
          "Success ProfileContext Data loaded!",
          profileRes.data.full_name
        );
      } catch (err) {
        console.error("Error fetching profile or transactions:", err);
        setError(err);
      } finally {
        setLoading(false);
        localStorage.setItem('loader', false); 

      }
    };

    if (token) {
      
      fetchProfileAndTransactions();
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ studentContext, transactionsContext, loading, error }} >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
