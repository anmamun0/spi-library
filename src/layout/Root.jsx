// src/layouts/Root.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BookProvider } from "../context/BookContext";
import { ProfileProvider } from "../context/ProfileContext";
import { useEffect } from "react";

function Root() {
   useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      localStorage.removeItem("token_id");
      localStorage.removeItem("profile_id");
      localStorage.removeItem("isAdmin");
    }
   }, []);
  
  return (
    <>
      <BookProvider>
        <ProfileProvider>
          <Navbar />
          
          <Outlet />

          <Footer />
        </ProfileProvider>
      </BookProvider>
    </>
  );
}

export default Root;
