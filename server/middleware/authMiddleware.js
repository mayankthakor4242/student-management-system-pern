const jwt = require("jsonwebtoken");
const protect = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startswith("Bearer")){
            return res.status(401).json({
                message:"Access Denied . Token Required.",
            })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user= decoded;

        next();
    }catch(error){
        return res.status(401).json({
            message:"Invalid Or Expired Token",
        })
    }
}

module.exports = protect;