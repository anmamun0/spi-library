// src/components/AuthRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
    
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token_id");
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null; // or loading spinner while redirecting
};

export default AuthRedirect;
