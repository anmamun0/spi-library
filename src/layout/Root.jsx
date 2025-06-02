// src/layouts/Root.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BookProvider } from "../context/BookContext";
import { ProfileProvider } from "../context/ProfileContext";

function Root() {
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
