const pool = require("../config/db")

const createStudent = async (studentData)=>{
    const {
        user_id,
        enrollment_number,
        phone,
        date_of_birth,
        gender,
        address,
        department,
        semester,
    } = studentData;

    const result =await pool.query(`INSERT INTO students (user_id,enrollment_number,phone,date_of_birth,gender,adddress,department,semester) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * `,[user_id,enrollment_number,phone,date_of_birth,gender,address,department,semester]);
    return result.rows[0];
};

const getAllStudents = async ()=>{
    const result = await pool.query(
        "SELECT * FROM STUDENTS ORDER BY ID DESC"
    );
    return result.rows;
}

module.exports = {
    createStudent,getAllStudents,
}