import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserDashboard from "./components/pages/UserDashboard";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import About from "./components/pages/About";
import Examples from "./components/pages/Examples";
import FeaturedShelter from "./components/pages/FeaturedShelter";
import Signup from "./components/pages/Signup";
import ForgotPassword from "./components/pages/ForgotPassword";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path='signup' element={<Signup />}/>
        <Route path="user-dashboard" element={<UserDashboard />} />
        <Route path="about" element={<About />}/>
        <Route path="examples" element={<Examples />}/>
        <Route path="featured-shelter" element={<FeaturedShelter />}/>
        <Route path="forgot-password" element={<ForgotPassword />}/>
        {/* Add more paths here in future */}
      </Routes>
    </div>
  );
}
