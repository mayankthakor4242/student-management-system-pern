import { useState } from "react";
import api from "../services/api"; // adjust path to match your project structure

const initialFormState = {
  user_id: 1,
  enrollment_number: "",
  phone: "",
  date_of_birth: "",
  gender: "",
  address: "",
  department: "",
  semester: "",
};

const inputClass =
  "w-full px-3 py-2.5 rounded-md border text-sm text-[#14213D] placeholder-[#9AA3B8] " +
  "focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent transition-all duration-150";

const labelClass = "block text-xs font-semibold uppercase tracking-wide text-[#5C6787] mb-1.5";

const StudentForm = ({ fetchStudent }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      await api.post("/students", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData(initialFormState);
      fetchStudent(); // Refresh the student list after adding a new student
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Failed to add student. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-[#E7E9F0] p-6 max-w-2xl"
    >
      <div className="mb-6 pb-4 border-b border-[#EEF0F5]">
        <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#C89B3C] mb-1">
          New Record
        </p>
        <h2
          className="text-xl font-semibold text-[#14213D]"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
        >
          Add Student
        </h2>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-md text-sm text-[#9B2C2C] bg-[#FDECEC] border border-[#F5C6C6]">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Enrollment Number</label>
          <input
            type="text"
            name="enrollment_number"
            placeholder="e.g. ENR2026001"
            value={formData.enrollment_number}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Department</label>
          <input
            type="text"
            name="department"
            placeholder="e.g. Computer Science"
            value={formData.department}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Semester</option>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Address</label>
          <textarea
            name="address"
            placeholder="Full address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-md text-sm font-medium text-white transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#14213D" }}
          onMouseEnter={(e) => {
            if (!submitting) e.currentTarget.style.backgroundColor = "#1F2F52";
          }}
          onMouseLeave={(e) => {
            if (!submitting) e.currentTarget.style.backgroundColor = "#14213D";
          }}
        >
          {submitting ? "Adding..." : "Add Student"}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;