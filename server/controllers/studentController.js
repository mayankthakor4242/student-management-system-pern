const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,

} = require("../models/studentModel");

//create Student
const addStudent = async  (req,res) =>{
    try{
        const student = await createStudent(req.body);

        res.status(201).json({
            success: true,
            message:'student created Successfully',
            student,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Failed to create Student',
            error:error.message,
        });
    }
};

//Get All Students
const getStudents = async (req,res)=>{
    try{
        const { search = "",page = 1,limit = 10} = req.query;
        const students =await getAllStudents(search,
            Number(page),
            Number(limit)
        );
        res.status(200).json({
            success:true,
            page : Number(page),
            limit : Number(limit),
            count:students.lenght,
            students,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Failed to Fetch Students',
            error:error.message,
        });
    }
};

//get Single student
const getStudent = async (req,res) =>{
    try{
        const {id} = req.params;

        const student = await getStudentById(id);

        if(!student){
            return res.status(404).json({
                success:false,
                message:"student Not Found "
            })
        }

        res.status(200).json({
            success:true,
            student,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Falied to Fetch Student",
            error:error.message,
        });
    }
}
//update Student

const updateStudentData = async (req,res) =>{
    try{
        const {id} = req.params;
        
        const existingStudent = await getStudentById(id);

        if(!existingStudent){
            return res.status(404).json({
                success:false,
                message : "Student Not Found ",
            });
        }
        const student = await updateStudent(id,req.body);

        res.status(200).json({
            success:true,
            message:"Student Update Successfully ",
            student,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message : "Failed to Updated Student",
            error:error.message,
        });
    }
}
//Delete Student 
const removeStudent = async (req,res) =>{
    try{
        const {id}= req.params;
        const existingStudent = await getStudentById(id);

        if(!existingStudent){
            return res.status(404).json({
                success:false,
                message:"Student NOt Found",
            });
        };

        await deleteStudent(id);

        res.status(200).json({
            success:true,
            message:"Student Deleted Successfully",
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to Delete Student",
            error:error.message,
    
        });
    }
};
module.exports = {
    addStudent,
    getStudents,
    getStudent,
    updateStudentData,
    removeStudent,
};