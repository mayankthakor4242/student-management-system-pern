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

const getStudentById = async (id) =>{
    const result = await pool.query(
        "SELECT * FROM students where id =$1 ",[id]
    );

    return result.rows[0];
};

const updateStudent = async (id,studentData) =>{
    const {
        phone,
        date_of_birth,
        gender,
        address,
        department,
        semester,
    } = studentData;

    const result = await pool.query(
        `UPDATE students SET phone = $1,date_of_birth = $2,gender = $3, address = $4, department = $5,semester = $6 WHERE id = $7 RETURNING *`,[phone,date_of_birth,gender,address,department,semester,id,]
    );
    return result.rows[0];
};

const deleteStudent = async (id) =>{
    const result = await pool.query(
        "DELETE FROM students WHERE id = $1 RUTURNING * ",[id]
    );
    
    return result.rows[0];
};
module.exports = {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    getStudentById,
}