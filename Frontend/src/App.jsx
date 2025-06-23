import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";

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
import AboutUs from "./Pages/AboutUs";
import Career from "./Pages/Career";
import ContactUs from "./Pages/ContactUs";
import InvestmentInfo from "./Pages/InvestmentInfo";
import ScrollToTop from "./Helper/ScrollToTop";
import Affiliate from "./Pages/Affiliate";
import HelpSupport from "./Pages/HelpSupport";
import LegalPages from "./Pages/LegalPages";

function App() {
  return (
    <>
    <ScrollToTop/>
    <Routes>
      {/* Public Routes - Wrapped in Layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/plans" element={<Layout><Plans /></Layout>} />
      <Route path="/teach" element={<Layout><TeachOnLMS /></Layout>} />
      <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
      <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
      <Route path="/career" element={<Layout><Career /></Layout>} />
      <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
      <Route path="/investment" element={<Layout><InvestmentInfo /></Layout>} />
       <Route path="/affiliate" element={<Layout><Affiliate /></Layout>} />
        <Route path="/help" element={<Layout><HelpSupport /></Layout>} />
         <Route path="/legel-page" element={<Layout><LegalPages /></Layout>} />

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
