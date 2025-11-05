"use client";
import React, { useState } from "react";

export default function GenderUpdateForm() {
  const [clearId, setClearId] = useState("");
  const [gender, setGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message: string, type: "info" | "success" | "error" = "info") => { 
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!clearId || !gender) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/updateGender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clearId, gender }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || "Clear ID not found", "error");
      } else {
        showToast("Gender updated successfully!", "success");
        setClearId("");
        setGender("");
      }
    } catch (error) {
      showToast("Something went wrong.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] px-4">
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-2 rounded-lg text-white shadow-lg transition-all ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-gray-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-md p-8 space-y-6 border border-gray-100"
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Gender Update
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your Clear ID and select gender carefully — updates are final.
          </p>
        </div>

        {/* Clear ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clear ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={clearId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClearId(e.target.value)}
            placeholder="Enter your unique Clear ID"
            className={`w-full rounded-lg border ${
              !clearId && isSubmitting
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            } p-2.5 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100`}
          />
          {!clearId && isSubmitting && (
            <p className="text-red-500 text-xs mt-1">Enter a valid Clear ID</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-gray-700">Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                className="accent-blue-600"
              />
              <span className="text-gray-700">Female</span>
            </label>
          </div>
          {!gender && isSubmitting && (
            <p className="text-red-500 text-xs mt-1">
              Please select a gender option
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!clearId || !gender || isSubmitting}
          className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all ${
            !clearId || !gender || isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-sm"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
