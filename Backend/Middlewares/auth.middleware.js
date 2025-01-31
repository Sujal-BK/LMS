import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";


export const generateToken = (userData) =>{
    const payload = {
      email : userData.email,
      role : userData.role
    }

    return jwt.sign(payload,process.env.JWT_SECRET_KEY)
}

export const jsonAuthMiddleware = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.currentuser = {email : verifyToken.email,role : verifyToken.role}
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : "Invalid Token or Unauthorized Access..."
        })
        
    }
}


export const isMentor = async (req, res, next) => {
    try {
       
        
        // Check if req.currentuser is defined
        if (!req.currentuser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user found"
            });
        }

       

        // Find the mentor in the database
        const mentor = await User.findOne({ role: req.currentuser.role });

        if (!mentor) {
            return res.status(401).json({
                success: false,
                message: "Mentor Not Found"
            });
        }

        if (mentor && mentor.role === 'Mentor') {
            return next(); // Proceed to the next middleware
        } else {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Not a Mentor"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const isAdmin = async(req,res,next)=>{
    try {
        const admin  = await User.findOne({role:req.currentuser.role})
        if(!admin){
            return res.status(401).json({
                success : false,
                message : "Admin Not Found"
            })
        }
        if(admin && admin.role==='Admin'){
           next()
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Server Error"
        })
        
    }
}

