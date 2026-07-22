const pool = require("../config/db");

const createUser = async (name,email,password,role)=>{
    const result = await pool.query(
        `INSERT INTO USERS(NAME ,EMAIL,PASSWORD,ROLE) VALUES  ($1,$2,$3,$4) RETURNING ID,NAME,EMAIL,ROLE`,[name,email,password,role]
    )
    return result.row[0];
};

const findUserByEmail = async (email) =>{
    const result = await pool.query(
        "SELECT * FROM USERS WHERE EMAIL =  $1",[email]
    );
    return result.rows[0]
};

module.exports ={
    createUser,findUserByEmail,
}