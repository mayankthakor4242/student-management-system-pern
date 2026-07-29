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

    const result =await pool.query(`INSERT INTO students (user_id,enrollment_number,phone,date_of_birth,gender,address,department,semester) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * `,[user_id,enrollment_number,phone,date_of_birth,gender,address,department,semester]);
    return result.rows[0];
};

const getAllStudents = async (search = "",page = 1 ,limit = 10)=>{
    const offset = (page - 1) * limit;
    const result = await pool.query(
        `SELECT * FROM STUDENTS WHERE enrollment_number ILIKE $1 OR department ILIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3 `,[`%${search}%`,limit,offset]
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
        enrollment_number,
        phone,
        date_of_birth,
        gender,
        address,
        department,
        semester,
    } = studentData;

    const result = await pool.query(
        `UPDATE students SET enrollment_number=$1,phone = $2,date_of_birth = $3,gender = $4, address = $5, department = $6,semester = $7 WHERE id = $8 RETURNING *`,[enrollment_number,phone,date_of_birth,gender,address,department,semester,id,]
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