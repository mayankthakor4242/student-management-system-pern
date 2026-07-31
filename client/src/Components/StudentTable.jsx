const StudentTable = ({ students, onDelete, onEdit }) => {
    console.log("students =", students);
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Enrollment</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Semester</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students && students.length > 0 ? (
          students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.enrollment_number}</td>
              <td>{student.phone}</td>
              <td>{student.department}</td>
              <td>{student.semester}</td>
              <td>
                <button onClick={() => onEdit?.(student)}>
                  Edit
                </button>

                <button onClick={() => onDelete?.(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No Students Found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;