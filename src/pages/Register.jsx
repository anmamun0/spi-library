import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    password: '',
    email: '',
    phone: '',
    roll: '',
    registration: '',
    session: '',
    department: '',
    address: '',
    blood: 'A+',
    nationality_type: 'NID',
    nationality_number: '',
    role: 'student',
  });

  const departments = ['CSE', 'EEE', 'ME', 'CE', 'BBA', 'ECE', 'IPE'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const nationalityTypes = [
    { value: 'NID', label: 'NID' },
    { value: 'BIRTH', label: 'Birth Certificate' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-api-url.com/user/register/', formData);
      console.log(response.data);
      alert('Registration successful!');
      // Optionally reset form or redirect here
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg mt-8 rounded-lg mb-6">
      <h2 className="text-3xl font-semibold mb-12 text-center text-blue-800">Student Registration</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900">
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
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
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            {nationalityTypes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Nationality Number */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="nationality_number" className="mb-1 font-medium">
            NID/Birth Certificate Number <span className="text-red-600">*</span>
          </label>
          <input
            id="nationality_number"
            type="text"
            name="nationality_number"
            placeholder="Enter NID or Birth Certificate Number"
            value={formData.nationality_number}
            onChange={handleChange}
            required
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 justify-center mt-8 pb-12">
          <button
            type="submit"
            className="bg-blue-700 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition font-semibold shadow-md"
          >
            Register
          </button>
          <button
            type="reset"
            onClick={() => setFormData({
              username: '',
              full_name: '',
              password: '',
              email: '',
              phone: '',
              roll: '',
              registration: '',
              session: '',
              department: '',
              address: '',
              blood: 'A+',
              nationality_type: 'NID',
              nationality_number: '',
              role: 'student',
            })}
            className="bg-gray-700 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition font-semibold shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
