const {
    createStudent,
    getAllStudents,
} = require("../models/studentModel");

const addStudent = async  (req,res) =>{
    try{
        const student = await createStudent(req.body);

        res.status(201).json({
            message:'student created Successfully',
            student,
        });
    }catch(error){
        res.status(500).json({
            message:'Failed to create Student',
            error:error.message,
        });
    }
};

const getStudents = async (req,res)=>{
    try{
        const students =await getAllStudents();
        res.json({
            students,
        });
    }catch(error){
        res.status(500).json({
            message:'Failed to Fetch Students',
            error:error.message,
        });
    }
};

module.exports = {
    addStudent,
    getStudents,
};