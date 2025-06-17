import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null); // holds the image URL
  const [formSubmit, setformSubmit] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setformSubmit(true);

    try {
      // Step 1: Send Login Request
      const response = await axios.post(
        "https://spi-library.onrender.com/user/login/",
        {
          email,
          password,
        }
      );

      const { token_id, profile_id } = response.data;

      // Step 2: Save token & profile ID to localStorage
      localStorage.setItem("token_id", token_id);
      localStorage.setItem("profile_id", profile_id);

      // Step 3: Fetch Profile Data (if needed)
      try {
        const profileResponse = await axios.get(
          `https://spi-library.onrender.com/user/profile/${profile_id}/`,
          {
            headers: {
              Authorization: `Token ${token_id}`, // 🔒 Pass token if authentication is required
            },
          }
        );

        const image = profileResponse.data.image; // adjust based on actual field name
        setProfileImage(image); // ✅ Set image in state

        console.log("Profile Data:", image);
      } catch (error) {
        console.error(
          "Profile fetch failed:",
          error.response?.data || error.message
        );
      }

      // Step 4: Redirect to Dashboard (optional)
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container mx-auto min-h-[85vh] flex items-center justify-center mb-6">
      <div className=" relative bg-slate-50 rounded-lg p-8 w-full max-w-6xl grid grid-cols-1 md:grid-cols-5  items-center">
        {/* Left Image Section */}

        <div className="flex justify-center col-span-3 py-16 rounded-lg">
          <div className="">
            <div className="relative w-60 h-60 flex items-center justify-center">
              <div
                className={clsx(
                  "absolute w-full h-full border-4 border-t-transparent border-b-green-400 border-l-transparent border-r-green-500 rounded-full animate-spin",
                  !formSubmit && "hidden"
                )}
              />

              {/* https://cdn-icons-png.flaticon.com/512/747/747376.png */}
              <div className="relative">
                <img
                  src={
                    profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/747/747376.png"
                  }
                  alt="Login"
                  className="w-44 h-44 rounded-full z-10 object-cover bg-white"
                />
                {profileImage && (
                  <button className="absolute bottom-0 right-8 bg-green-600 hover:bg-green-700 text-white  px-1 rounded-full transition shadow-md">
                    <i className="fa-solid fa-check"></i>
                  </button>
                )}

                {!profileImage && (
                  <p onClick={(event) => { setEmail('anmamun0@gmail.com'); setPassword('12345mamun'); event.target.classList.add('hidden');}} className="text-center px-3 py-1.5 text-sm font-medium text-slate-800 hover:text-red-600 border border-slate-500 hover:border-red-500 rounded-md transition duration-200 bg-white hover:bg-red-50 cursor-pointer">
                    Demo user
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate(`/profile`)}
                className={clsx(
                  "bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition",
                  !profileImage && "hidden"
                )}
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className=" col-span-2">
          <div className="mb-10 text-center space-y-2 ">
            <h2
              className="text-4xl font-semibold text-slate-800"
              style={{ fontFamily: `"Open Sans", sans-serif` }}
            >
              Sign In
            </h2>
            <p className="italic text-gray-700">
              | Access Your Student Account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-6">
              <div className="relative">
                <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {profileImage ? (
                    <i class="fa-solid fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-user"></i>
                  )}
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-200 pl-16 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-gray-500"
                />
              </div>

              <div className="relative">
                
                 <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {profileImage ? (
                    <i class="fa-solid fa-check text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-lock"></i>
                  )}
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-200 pl-16 pr-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              LOGIN
            </button>
          </form>

          <div className="flex justify-between mt-4 text-sm text-slate-600">
            <a href="#" className="hover:underline">
              Forgot Username / Password?
            </a>
            <Link to="/register" className="hover:underline">
              Create your Account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
