/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "https://spi-library.onrender.com/user/admin_login/",
        formData
      );

      const { token_id, profile_id } = response.data;

      localStorage.setItem("token_id", token_id);
      localStorage.setItem("profile_id", profile_id);
      localStorage.setItem("isAdmin", true);

      navigate("/admin/home");
    } catch (err) {
      const backendMessage =
        err?.response?.data?.error || "Login failed. Please try again.";
      setError(backendMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className=" w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className=" relative space-y-5">
          <button
            onClick={() =>
              setFormData({
                email: "al1007mamun@gmail.com",
                password: "12345mamun",
              })
            }
            className="absolute -top-4 right-0 bg-gray-100 border border-gray-400 text-gray-800 px-2 py-1 text-xs rounded-md hover:bg-gray-200 transition-all duration-200"
          >
            Demo User
          </button>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Sign in
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} SPI Library. All rights reserved.
        </p>
      </div>
    </div>
  );
}
