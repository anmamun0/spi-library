import React, { useState } from "react";
import axios from "axios";
import clsx from "clsx";

const Register = () => {
  const initialFormState = {
    username: "",
    full_name: "",
    password: "",
    email: "",
    phone: "",
    roll: "",
    registration: "",
    session: "",
    department: "",
    address: "",
    blood: "A+",
    birthday: "",
    gender: "",
    nationality_type: "NID",
    nationality_number: ""
  };
  const [formData, setFormData] = useState(initialFormState);
  const [duplicateError, setDuplicateError] = useState({});
  const [registerAnimation, setregisterAnimation] = useState(null);

  const departments = ["CSE", "EEE", "ME", "CE", "BBA", "ECE", "IPE"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const nationalityTypes = [
    { value: "NID", label: "NID" },
    { value: "BIRTH", label: "Birth Certificate" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log(formData);

    try {
      setregisterAnimation(true);

      const response = await axios.post(
        "https://spi-library.onrender.com/user/register/",
        formData
      );
      console.log(response.data);
      setFormData(initialFormState); // Reset after successful submission
      setDuplicateError((prev) => ({ ...prev, successRegistration: true }));
      setregisterAnimation(false);
    } catch (error) {
      setregisterAnimation(false);

      if (error.response && error.response.status === 400) {
        const errors = error.response.data?.duplicate_errors;
        if (errors) {
          setDuplicateError(errors); // This should be an object like { username: "already exists" }
          console.log(duplicateError.username);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto  bg-white shadow-lg  rounded-lg mb-6 bg-gray-50">
      <div className="bg-gray-200 py-10 rounded-t-nd rounded-b-xl shadow">
        <h2 className="text-3xl font-semibold  text-center text-blue-800">
          Student Registration
        </h2>
      </div>

      {registerAnimation == true && (
        <div className=" relative w-full">
          <div className="relative h-[4px] overflow-hidden rounded-xl mx-2 -mt-1">
            <div className="absolute h-full w-1/2 bg-green-500 animate-borderFlow"></div>
          </div>
        </div>
      )}

      <div className="p-16">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900"
        >
          {/* Normal message */}
          <div
            className={clsx(
              duplicateError.username || duplicateError.email
                ? "border-red-700 bg-red-200 "
                : "border-gray-700 bg-gray-200 ",
              "col-span-2   p-4 rounded-md border-l-4"
            )}
          >
            {duplicateError.username || duplicateError.email ? (
              <p>
                Username or email already exists. Please use different
                credentials.
              </p>
            ) : (
              <p>
                Please enter a unique username and a valid email address that
                are not already registered in our system.
              </p>
            )}
          </div>

          {/* Username */}

          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 font-medium">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="full_name" className="mb-1 font-medium">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="full_name"
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Normal message */}
          <div
            className={clsx(
              duplicateError.roll ||
                duplicateError.registration ||
                duplicateError.phone
                ? "border-red-700 bg-red-200 "
                : "border-gray-700 bg-gray-200 ",
              "col-span-2 bg-gray-200 p-4 rounded-md border-l-4"
            )}
          >
            {duplicateError.roll ||
            duplicateError.registration ||
            duplicateError.phone ? (
              <p>
                One or more of your contact or identification details are
                invalid or already registered. Please double-check and try
                again.
              </p>
            ) : (
              <p>
                Please enter your unique contact and identification details
                carefully. Provide your valid Phone Number, Roll Number, and
                Registration Number exactly as issued.
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium">
              Phone <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^\+?\d{7,15}$"
              title="Enter a valid phone number"
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Roll */}
          <div className="flex flex-col">
            <label htmlFor="roll" className="mb-1 font-medium">
              Roll <span className="text-red-600">*</span>
            </label>
            <input
              id="roll"
              type="text"
              name="roll"
              placeholder="Enter your roll number"
              value={formData.roll}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Registration */}
          <div className="flex flex-col">
            <label htmlFor="registration" className="mb-1 font-medium">
              Registration No. <span className="text-red-600">*</span>
            </label>
            <input
              id="registration"
              type="text"
              name="registration"
              placeholder="Enter registration number"
              value={formData.registration}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Session */}
          <div className="flex flex-col">
            <label htmlFor="session" className="mb-1 font-medium">
              Session <span className="text-red-600">*</span>
            </label>
            <input
              id="session"
              type="text"
              name="session"
              placeholder="Enter session"
              value={formData.session}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label htmlFor="department" className="mb-1 font-medium">
              Department <span className="text-red-600">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label htmlFor="blood" className="mb-1 font-medium">
              Blood Group <span className="text-red-600">*</span>
            </label>
            <select
              id="blood"
              name="blood"
              value={formData.blood}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="address" className="mb-1 font-medium">
              Address <span className="text-red-600">*</span>
            </label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Normal message */}
          <div
            className={clsx(
              duplicateError.nationality_number
                ? "border-red-700 bg-red-200 "
                : "border-gray-700 bg-gray-200 ",
              "col-span-2 bg-gray-200 p-4 rounded-md border-l-4"
            )}
          >
            {duplicateError.nationality_number ? (
              <p>
                The identification number entered is invalid or already
                registered. Please verify your 17-digit Birth Registration
                Number or 11-digit National Identification (NID) Number.
              </p>
            ) : (
              <p>
                Please enter your unique identification number carefully.
                Provide either your 17-digit Birth Registration Number or your
                11-digit National Identification (NID) Number.
              </p>
            )}
          </div>
          {/* Birthday */}
          <div className="flex flex-col">
            <label htmlFor="birthday" className="mb-1 font-medium">
              Birthday <span className="text-red-600">*</span>
            </label>
            <input
              id="birthday"
              type="date"
              name="birthday"
              value={formData.birthday || ""}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-1 font-medium">
              Gender <span className="text-red-600">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option> 
            </select>
          </div>

          {/* Nationality Type */}
          <div className="flex flex-col">
            <label htmlFor="nationality_type" className="mb-1 font-medium">
              Nationality Type <span className="text-red-600">*</span>
            </label>
            <select
              id="nationality_type"
              name="nationality_type"
              value={formData.nationality_type}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              {nationalityTypes.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Nationality Number */}
          <div className="flex flex-col md:col-span-1">
            <label htmlFor="nationality_number" className="mb-1 font-medium">
              NID/Birth Certificate Number{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              id="nationality_number"
              type="text"
              name="nationality_number"
              placeholder="Enter NID or Birth Certificate Number"
              value={formData.nationality_number}
              onChange={handleChange}
              required
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          {duplicateError.successRegistration && (
            <div className="flex flex-col md:col-span-2 mt-4 bg-green-100 border border-green-400 text-green-700 px-6 py-2 rounded-xl shadow-md w-full text-center animate-fadeIn">
              Successfully submitted!
            </div>
          )}

          {/* Buttons */}
          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4 justify-center mt-8 pb-12">
            <button
              type="submit"
              className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition font-semibold shadow-md"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => setFormData(initialFormState)}
              className="bg-gray-300 text-gray-800 px-8 py-3 rounded-xl hover:bg-gray-400 transition font-semibold shadow-md"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
