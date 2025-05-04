import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Plans from "./Pages/Plans";
import TeachOnLMS from "./Pages/TeachOnLMS";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Payment from "./Pages/Payment";
import Courses from "./User/Courses";
import Enroll from "./User/Enroll";
import CoursePayment from "./User/CoursePayment";
import MentorProfile from "./User/MentorProfile";
import ProtectedAuth from "./ProtectedRoutes/ProtectedAuth";
import ProtectedMentor from "./ProtectedRoutes/ProtectedMentor";
import ProtectedUser from "./ProtectedRoutes/ProtectedUser";
import GetMentorDetails from "./Mentor/GetMentorDetails";
import AddCourses from "./Mentor/AddCourses";
import DeleteCourse from "./Mentor/DeleteCourse";
import UpdateCourse from "./Mentor/UpdateCourse";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/teach" element={<TeachOnLMS />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes - Authentication */}
        <Route element={<ProtectedAuth />}>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/subscribe" element={<Payment />} />
        </Route>

        {/* Protected Routes - Mentor */}
        <Route element={<ProtectedMentor />}>
          <Route path="/mentor" element={<GetMentorDetails />} />
          <Route path="/mentor/delete-course/:courseId" element={<DeleteCourse />} />
          <Route path="/mentor/update-course/:courseId" element={<UpdateCourse />} />
          <Route path="/mentor/add-course" element={<AddCourses />} />
        </Route>

        {/* Protected Routes - User */}
        <Route element={<ProtectedUser />}>
          <Route path="/show-courses" element={<Courses />} />
          <Route path="/show-courses/enroll/:id" element={<Enroll />}>
            <Route path="payment" element={<CoursePayment />} />
          </Route>
          <Route path="/show-courses/:id" element={<MentorProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
