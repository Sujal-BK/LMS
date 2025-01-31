import express from 'express'
import { forgotPassword, getMentor,  SignIn, SignUp, verifyOtpAndChangePassword } from '../Controllers/user.controller.js'
import { isMentor, jsonAuthMiddleware } from '../Middlewares/auth.middleware.js'
import multer from 'multer'
const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Temporary upload folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage})

router.post('/sign-up',upload.single('photo'),SignUp)

router.post('/sign-in',SignIn)

router.post('/forgot-password',forgotPassword)

router.post('/verify-otp',verifyOtpAndChangePassword)

router.get('/mentor',jsonAuthMiddleware,isMentor,getMentor)



export default router