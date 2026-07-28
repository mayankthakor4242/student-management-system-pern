import { useState } from "react"



const StudentForm =({fectStudent}) =>{
    const [formData,setFormData] = useState({
        user_id: 1,
        enrollment_number: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        address: "",
        department: "",
        semester: "",
    });

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            await api.post("/students", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Student Added Successfully");
            setFormData({
                user_id: 1,
                enrollment_number: "",
                phone: "",
                date_of_birth: "",
                gender: "",
                address: "",
                department: "",
                semester: "",
            }); 

            fectStudent(); // Refresh the student list after adding a new student
        }catch (error) {
            console.log(error.resposnse?.data)
            alert("Failed To Add Student");
        }
    };
        return(
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="enrollment_number"
                    value={formData.enrollment_number}  
                    onChange={handleChange}

                    />

                    <br /><br />
                    <input 
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={formData.phone}
                        onChange={handleChange}

                        />
                        <br /><br />

                        <input 
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                        />

                        <br /><br />

                        <select
                            name="gender"   
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <br /><br />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                        />

                        <br /><br />
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                        <br /><br />
                        <input
                            type="text"
                            name="semester"
                            placeholder="Semester"
                            value={formData.semester}
                            onChange={handleChange}
                        />

                        <br/><br />
                        <button type="submit">Add Student</button>
            </form>
        );
    };               
        
        


export default StudentForm;