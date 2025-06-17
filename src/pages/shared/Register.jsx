import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { useBooks } from "../../context/BookContext";
import { Check, X, LoaderCircle } from "lucide-react";

const Register = () => {
  const { books, students, categories, loading, error } = useBooks();

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
    nationality_number: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [duplicateError, setDuplicateError] = useState({});
  const [registerAnimation, setregisterAnimation] = useState(null);

  // Live check states
  const [fieldStatus, setFieldStatus] = useState({
    username: "idle", // idle, loading, available, taken
    email: "idle",
    phone: "idle",
    registration: "idle",
    roll: "idle",
    nationality_number: "idle", 

  });

  const departments = ["CSE", "EEE", "ME", "CE", "BBA", "ECE", "IPE"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const nationalityTypes = [
    { value: "NID", label: "NID" },
    { value: "BIRTH", label: "Birth Certificate" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 2. Add all fields that need live check
    if (["username", "email", "phone", "registration", "roll","nationality_number"].includes(name)) {
      setFieldStatus((prev) => ({ ...prev, [name]: "loading" }));
    }
  };

  // Live check for duplicate username and email
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // username
      if (formData.username) {
        const exists = students?.some(
          (s) =>
            s?.user?.toLowerCase() === formData.username.trim().toLowerCase()
        );
        setFieldStatus((prev) => ({
          ...prev,
          username: exists ? "taken" : "available",
        }));
      }

      // email
      if (formData.email) {
        const exists = students?.some(
          (s) => s?.email?.toLowerCase() === formData.email.trim().toLowerCase()
        );
        setFieldStatus((prev) => ({
          ...prev,
          email: exists ? "taken" : "available",
        }));
      }

      // phone
      if (formData.phone) {
        const exists = students?.some(
          (s) => s?.phone?.toLowerCase() === formData.phone.trim().toLowerCase()
        );
        setFieldStatus((prev) => ({
          ...prev,
          phone: exists ? "taken" : "available",
        }));
      }

      // registration
      if (formData.registration) {
        const exists = students?.some(
          (s) =>
            s?.registration?.toLowerCase() ===
            formData.registration.trim().toLowerCase()
        );
        setFieldStatus((prev) => ({
          ...prev,
          registration: exists ? "taken" : "available",
        }));
      }

      // roll
      if (formData.roll) {
        const exists = students?.some(
          (s) => s?.roll?.toLowerCase() === formData.roll.trim().toLowerCase()
        );
        setFieldStatus((prev) => ({
          ...prev,
          roll: exists ? "taken" : "available",
        }));
      }
      // nationality_number
      if (formData.nationality_number) {
        const exists = students?.some(
          (s) =>
            s?.nationality_number?.toLowerCase() ===
            formData.nationality_number.trim().toLowerCase()
        );
        setFieldStatus((prev) => ({
          ...prev,
          nationality_number: exists ? "taken" : "available",
        }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [
    formData.username,
  formData.email,
  formData.phone,
  formData.registration,
  formData.roll,
  formData.nationality_number, 
  students,
  ]);

const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

const handleSubmit = async (e) => {
  e.preventDefault();

        localStorage.setItem("loader", true);

  try {
    let imageUrl = "";

    if (selectedFile) {
      // Upload image first
      const form = new FormData();
      form.append("image", selectedFile);

      const apiKey = "99af3bf39b56183ca39470aa2ea81b31";
      const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

      const response = await axios.post(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      imageUrl = response.data.data.display_url;
    }

    // Now send full formData with image URL
    const payload = {
      ...formData,
      image: imageUrl || formData.image || "", // fallback to existing URL or empty
    };

    const res = await axios.post(
      "https://spi-library.onrender.com/user/register/",
      payload
    );

    console.log(res.data);
    setFormData(initialFormState);
    setSelectedFile(null);
    setDuplicateError((prev) => ({ ...prev, successRegistration: true }));
  } catch (error) {
        localStorage.setItem("loader", false);

    console.error(error);
    if (error.response && error.response.status === 400) {
      const errors = error.response.data?.duplicate_errors;
      if (errors) {
        setDuplicateError(errors);
        console.log(errors);
      }
    }
  } finally {
        localStorage.setItem("loader", false);
  }
};


  const usernameExists = students?.some(
    (student) => student.user?.toLowerCase() === formData.username.toLowerCase()
  );
  const renderStatusIcon = (status) => {
    if (status === "loading")
      return <LoaderCircle className="animate-spin text-blue-500 w-5 h-5" />;
    if (status === "taken") return <X className="text-red-500 w-5 h-5" />;
    if (status === "available")
      return <Check className="text-green-500 w-5 h-5" />;
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto  bg-white shadow-lg  rounded-lg mb-6 bg-gray-50">
      <div className="bg-gray-200 py-6 rounded-t-nd rounded-b-xl shadow">
        <h2 className="text-3xl font-semibold  text-center text-blue-800">
          Student Registration
        </h2>
      </div>

     

      <div className="p-10">
        <form
          onSubmit={handleSubmit}
          className="md:grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 space-y-4 md:space-y-1"
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
          <div className="flex  flex-col relative">
            <label htmlFor="username" className="mb-1 font-medium">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
              className="border px-4 py-2 rounded-xl pr-10 focus:ring-2 focus:ring-blue-500"
            />
            {formData.username && (
              <span className="absolute right-3 top-[70%] -translate-y-1/2">
                {renderStatusIcon(fieldStatus.username)}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col relative">
            <label htmlFor="email" className="mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="border px-4 py-2 rounded-xl pr-10 focus:ring-2 focus:ring-blue-500"
            />
            {formData.email && (
              <span className="absolute right-3 top-[70%] -translate-y-1/2">
                {renderStatusIcon(fieldStatus.email)}
              </span>
            )}
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
          <div className="relative flex flex-col">
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
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition pr-10"
            />
            {formData.phone && (
              <span className="absolute right-3 top-[70%] -translate-y-1/2">
                {fieldStatus.phone === "loading" ? (
                  <LoaderCircle className="animate-spin w-5 h-5 text-blue-500" />
                ) : fieldStatus.phone === "taken" ? (
                  <X className="text-red-500 w-5 h-5" />
                ) : fieldStatus.phone === "available" ? (
                  <Check className="text-green-500 w-5 h-5" />
                ) : null}
              </span>
            )}
          </div>

          {/* Roll */}
          <div className="relative flex flex-col">
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
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition pr-10"
            />
            {formData.roll && (
              <span className="absolute right-3 top-[70%] -translate-y-1/2">
                {fieldStatus.roll === "loading" ? (
                  <LoaderCircle className="animate-spin w-5 h-5 text-blue-500" />
                ) : fieldStatus.roll === "taken" ? (
                  <X className="text-red-500 w-5 h-5" />
                ) : fieldStatus.roll === "available" ? (
                  <Check className="text-green-500 w-5 h-5" />
                ) : null}
              </span>
            )}
          </div>

          {/* Registration */}
          <div className="relative flex flex-col">
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
              className="border border-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition pr-10"
            />
            {formData.registration && (
              <span className="absolute right-3 top-[70%] -translate-y-1/2">
                {fieldStatus.registration === "loading" ? (
                  <LoaderCircle className="animate-spin w-5 h-5 text-blue-500" />
                ) : fieldStatus.registration === "taken" ? (
                  <X className="text-red-500 w-5 h-5" />
                ) : fieldStatus.registration === "available" ? (
                  <Check className="text-green-500 w-5 h-5" />
                ) : null}
              </span>
            )}
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
          <div className="flex flex-col  ">
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
          <div className="flex flex-col md:col-span-1 relative">
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
            {formData.nationality_number && (
              <span className="absolute right-3 top-[70%] -translate-y-1/2">
                {fieldStatus.nationality_number === "loading" ? (
                  <LoaderCircle className="animate-spin w-5 h-5 text-blue-500" />
                ) : fieldStatus.nationality_number === "taken" ? (
                  <X className="text-red-500 w-5 h-5" />
                ) : fieldStatus.nationality_number === "available" ? (
                  <Check className="text-green-500 w-5 h-5" />
                ) : null}
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            
            <label htmlFor="image" className="mb-1 font-medium">
              Upload Image
            </label>

            <div className="flex gap-4 justify-between">
  
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-400 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
                       {selectedFile && (
    <img
      src={URL.createObjectURL(selectedFile)}
      alt="Preview"
      className="h-12 w-12 object-cover rounded-md border"
    />
  )}
            </div>

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
