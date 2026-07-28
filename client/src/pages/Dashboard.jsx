import React, { useEffect, useState } from "react";
import api from "../api/axios";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Students
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.get("/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(response.data.students || []);
      setError("");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to fetch students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return <h2>Loading Students...</h2>;
  }

  return (
    <div className="container">

      <h1>🎓 Student Management Dashboard</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      {/* Add Student Form */}
      <StudentForm fetchStudents={fetchStudents} />

      <hr />

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Student Table */}
      {students.length === 0 ? (
        <p>No Students Found</p>
      ) : (
        <StudentTable students={students} />
      )}

    </div>
  );
};

export default Dashboard;