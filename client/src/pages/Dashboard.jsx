import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(response.data.students);
    } catch (error) {
      console.error(
        "Failed to Fetch Students:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return <h2>Loading Students.....</h2>;
  }

  return (
    <div>
      <h1>Student Dashboard</h1>

      {students.length === 0 ? (
        <p>No Students Found</p>
      ) : (
        students.map((student) => (
          <div key={student.id}>
            <p>
              Enrollment Number: {student.enrollment_number}
            </p>

            <p>
              Phone: {student.phone}
            </p>

            <p>
              Department: {student.department}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;