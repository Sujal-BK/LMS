import { generateToken } from "../Middlewares/auth.middleware.js";
import User from "../Models/user.model.js";
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv' 
dotenv.config()

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});



const uploadFile = async (filepath) => {
    try {
       
        const result = await cloudinary.uploader.upload(filepath);
       
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
};




export const SignUp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const photoPath = req.file ? req.file.path : null;

        if (!photoPath) {
            return res.status(400).json({ success: false, message: "Photo upload failed" });
        }
        

        if (!username) {
            return res.status(400).json({ success: false, message: "Username is required" });
        } else if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        } else if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        } else if (!role) {
            return res.status(400).json({ success: false, message: "Role is required" });
        } else if (!photoPath) {
            return res.status(400).json({ success: false, message: "Photo is required" });
        }

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User  Already Exists"
            });
        }

        // Upload the photo to Cloudinary
        const photoUrl = await uploadFile(photoPath);

        const hash_password = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hash_password,
            role,
            photo: photoUrl // Store the Cloudinary URL
        });

        return res.status(200).json({
            success: true,
            message: "Registration Successful",
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Sign up Error",
            error: error.message
        });
    }
}


export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body; // No need to destructure role here
        const isUserFound = await User.findOne({ email });
        if (!isUserFound) {
            return res.status(404).json({
                success: false,
                message: "You are not Logged in"
            });
        }

        const verifyPassword = await bcrypt.compare(password, isUserFound.password);
        if (!verifyPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is not Valid..."
            });
        }

        const token = generateToken({ email: isUserFound.email, role: isUserFound.role });

        return res.status(200).json({
            success: true,
            message: "Login Successfully...",
            token,
            role: isUserFound.role // Fetch role from the database
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Sign in Error",
            error
        });
    }
};


const otpStore = {}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (email == "") {
            return res.status(400).json({
                success: false,
                message: 'Please Enter Email'
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Does`t Exits"
            })
        }

        const otp = crypto.randomInt(100000, 999999).toString()
        otpStore[email] = otp
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS_KEY

            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP for Password Reset",
            text: `Here is your OTP: ${otp}`
        })
        return res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error in OTP Sending"
        })
    }
}


export const verifyOtpAndChangePassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;


        if (email == "") {
            return res.status(400).json({
                success: false,
                message: 'Please Enter Email'
            })
        }

        if (otpStore[email] !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }




        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User  doesn't exist"
            });
        }

        const hash_password = await bcrypt.hash(newPassword, 10)
        await user.save();

        delete otpStore[email];

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
            hash_password
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const getMentorDetails = async (req, res) => {
    try {
        const { id } = req.params
        const mentor = await User.findById(id)
        if (!mentor) {
            return res.status(400).json({
                success: false,
                message: "Mentor Not Found"
            })

        }
        return res.status(200).json({
            success: true,
            message: "Mentor Details",
            mentor

        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getMentor = async(req,res)=>{
    try {
        const {email} = req.currentuser
        const mentor = await User.findOne({email})
        if(!mentor){
            return res.status(400).json({
                success: false,
                message: "Mentor Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Mentor Details",
            mentor

        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


