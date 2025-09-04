import "./index.css"; // Ensure you import your CSS file
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ListCourses from "./pages/ListCourses";
import UserHeader from "./components/layout/UserHeader";
import DetailCourse from "./pages/DetailCourse";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./components/layout/Sidebar";
import CreateCourse from "./pages/admin/CreateCourse";
import CreateSubject from "./pages/admin/CreateSubject";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Group các routes bình thường */}
          <Route element={<UserHeader />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/courses" element={<ListCourses />} />
            <Route path="/courses/:id" element={<DetailCourse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Group admin */}
          <Route element={<Sidebar />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/course/create" element={<CreateCourse />} />
            <Route path="/admin/course/:id/subject/create" element={<CreateSubject />} />
          </Route>
        </Routes>
      </Router>
      
      {/* Toaster hiển thị toast */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
