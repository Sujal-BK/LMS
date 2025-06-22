import express from 'express'
import { addCourse,getAllCourse,getCourseById,getSelfCourses,updateCourse,deleteCourse, searchCourse } from '../Controllers/course.controller.js'
import { isMentor, jsonAuthMiddleware } from '../Middlewares/auth.middleware.js'
import { uploadFields } from '../Middlewares/multer.middleware.js'

// import multer from 'multer'

const router = express.Router()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Temporary upload folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
//         if (allowedTypes.includes(file.mimetype)) {
//             cb(null, true);
//         } else {
//             cb(new Error('Invalid file type. Only JPEG, PNG, and MP4 are allowed.'));
//         }
//     },
// });




// router.post(
//     '/add-course',
//     upload.fields([
//         { name: 'coverImg', maxCount: 1 },
//         { name: 'videos', maxCount: 5 }, 
//     ]),
//     jsonAuthMiddleware,
//     isMentor,
//     addCourse
// );

router.post('/add-course',jsonAuthMiddleware,isMentor,uploadFields,addCourse)

router.put('/update-course/:courseId', jsonAuthMiddleware, isMentor, uploadFields,updateCourse)

router.delete('/delete-course/:id', jsonAuthMiddleware, isMentor, deleteCourse)

router.get('/get-course/:id', jsonAuthMiddleware, getCourseById)

router.get('/get-course', jsonAuthMiddleware, getAllCourse)

router.get('/search-course',searchCourse)

router.get('/get-courses/:mentorId', jsonAuthMiddleware, getSelfCourses)


export default router