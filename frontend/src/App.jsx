import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import FeaturedShelter from "./pages/FeaturedShelter/FeaturedShelter";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path='signup' element={<Signup />}/>
        <Route path="featured-shelter" element={<FeaturedShelter />}/>
        <Route path="forgot-password" element={<ForgotPassword />}/>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="about" element={<About />} />
        {/* Add more paths here in future */}
      </Routes>
    </div>
  );
}
