import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Plans from "./Pages/Plans"
import TeachOnLMS from "./Pages/TeachOnLMS"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import ForgotPassword from "./Pages/ForgotPassword"
import ProtectedAuth from "./ProtectedRoutes/ProtectedAuth"
import ProtectedMentor from "./ProtectedRoutes/ProtectedMentor"
import GetMentorDetails from "./Mentor/GetMentorDetails"
import AddCourses from "./Mentor/AddCourses"
import DeleteCourse from "./Mentor/deleteCourse"
import UpdateCourse from "./Mentor/UpdateCourse"
import Payment from "./Pages/Payment"
import ProtectedUser from "./ProtectedRoutes/ProtectedUser"
import Courses from "./User/Courses"
import Enroll from "./User/Enroll"
import CoursePayment from "./User/CoursePayment"
function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/plans" element={<Plans/>}/>
      <Route path="/teach" element={<TeachOnLMS/>}/>
      <Route element={<ProtectedAuth/>}>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/sign-in" element={<Login/>}/>
      <Route path="/subscribe" element={<Payment/>}/>

      </Route>
      <Route element={<ProtectedMentor/>}>
      <Route path="/mentor" element={<GetMentorDetails />} />
      <Route path="/mentor/delete-course/:courseId" element={<DeleteCourse />} />
      <Route path="/mentor/update-course/:courseId" element={<UpdateCourse/>} />
      <Route path="/mentor/add-course" element={<AddCourses/>}/>
      </Route>
      <Route element={<ProtectedUser/>}>
      <Route path="/show-courses" element={<Courses/>}/>
      <Route path="/show-courses/enroll/:id" element={<Enroll/>}>
      <Route path="payment" element={<CoursePayment/>}/>
      </Route>
      
     
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
     </Routes>
    </>
  )
}

export default App
