import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // Optional: Icon

{/* <Route path="*" element={<Error message="Page not found" statusCode={404} />} /> */}

const Error = ({ message = "Something went wrong!", statusCode = 500 }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full p-20">
        <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
           Oops! Error {statusCode}
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => navigate("/")}
          className="inline-block px-6 py-2 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700 transition duration-200 shadow-md"
        >
          ⬅ Go to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
