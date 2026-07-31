import React, { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

const Dashboard = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      setError(
        error.response?.data?.message ||
        "Failed to Fetch Students"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchStudents();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  const deleteStudent = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/students/${id}`, {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      fetchStudents();

    } catch (error) {

      console.log(error);

    }

  };

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen text-2xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar handleLogout={handleLogout} />

        <div className="p-6">

          <h2 className="text-3xl font-bold mb-6">

            Dashboard

          </h2>

          {/* Dashboard Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            <div className="bg-white shadow rounded-xl p-5">

              <h3 className="text-gray-500">

                Total Students

              </h3>

              <p className="text-3xl font-bold text-blue-600">

                {students.length}

              </p>

            </div>

            <div className="bg-white shadow rounded-xl p-5">

              <h3 className="text-gray-500">

                Departments

              </h3>

              <p className="text-3xl font-bold text-green-600">

                MCA

              </p>

            </div>

            <div className="bg-white shadow rounded-xl p-5">

              <h3 className="text-gray-500">

                Active Users

              </h3>

              <p className="text-3xl font-bold text-red-600">

                1

              </p>

            </div>

          </div>

          {error && (

            <p className="text-red-600 mb-4">

              {error}

            </p>

          )}

          <StudentForm fetchStudents={fetchStudents} />

          <div className="mt-8">

           {/* <StudentTable
  students={students}
  onDelete={deleteStudent}
  onEdit={() => {}}
/> */}

          </div>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;