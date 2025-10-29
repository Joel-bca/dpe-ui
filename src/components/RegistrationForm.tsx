"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// Define interfaces for TypeScript
interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  collegeName: string;
  collegeRollNumber: string;
  academicStatus: "UG" | "PG";
  selectedSport: string;
  dateOfBirth: string;
}

const RegistrationForm: React.FC = () => {
  // Hardcoded sports based on ASM events
  const sports = [
    { id: "1", sportName: "Football" },
    { id: "2", sportName: "Volleyball" },
    { id: "3", sportName: "Basketball" },
    { id: "4", sportName: "Cricket" },
    { id: "5", sportName: "Table Tennis" },
    { id: "6", sportName: "100m Sprint" },
    { id: "7", sportName: "Long Jump" },
    { id: "8", sportName: "High Jump" },
    { id: "9", sportName: "Shot Put" },
    { id: "10", sportName: "Relay" },
  ];

  // State management
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    collegeName: "",
    collegeRollNumber: "",
    academicStatus: "UG",
    selectedSport: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError(""); // Clear error on input
  };

  // Handle form submission (mock - no backend)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.collegeName ||
        !formData.collegeRollNumber || !formData.academicStatus || !formData.selectedSport || !formData.dateOfBirth) {
      setFormError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setFormError("");

    // Mock submission delay
    setTimeout(() => {
      console.log("Mock registration data:", formData);
      toast.success("Registration Successful! (Mock - Check console for data)");
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        collegeName: "",
        collegeRollNumber: "",
        academicStatus: "UG",
        selectedSport: "",
        dateOfBirth: "",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faff] via-[#eef2ff] to-[#f7f9ff] flex items-center justify-center py-12 px-4">
      <Toaster position="top-right" />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Player Registration</h2>
          <p className="mt-2 text-sm text-gray-600">Join the Annual Sports Meet 2025</p>
        </div>

        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number (with country code)"
            />
          </div>

          {/* College Name */}
          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">
              College Name *
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your college name"
            />
          </div>

          {/* College Roll Number */}
          <div>
            <label htmlFor="collegeRollNumber" className="block text-sm font-medium text-gray-700 mb-1">
              College Roll Number *
            </label>
            <input
              type="text"
              id="collegeRollNumber"
              name="collegeRollNumber"
              value={formData.collegeRollNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your roll number"
            />
          </div>

          {/* Academic Status */}
          <div>
            <label htmlFor="academicStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Academic Status *
            </label>
            <select
              id="academicStatus"
              name="academicStatus"
              value={formData.academicStatus}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
            </select>
          </div>

          {/* Sport Selection */}
          <div>
            <label htmlFor="selectedSport" className="block text-sm font-medium text-gray-700 mb-1">
              Select Sport *
            </label>
            <select
              id="selectedSport"
              name="selectedSport"
              value={formData.selectedSport}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a sport</option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.sportName}>
                  {sport.sportName}
                </option>
              ))}
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          * Required fields. (Mock UI - No backend integration)
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
