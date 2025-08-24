import "./index.css"; // Ensure you import your CSS file
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserHeader from "./components/layout/UserHeader";
import DetailCourse from "./pages/DetailCourse";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Sidebar from "./components/layout/Sidebar";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Group các routes bình thường */}
        <Route element={<UserHeader />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:id" element={<DetailCourse />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Group admin */}
        <Route element={<Sidebar />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}