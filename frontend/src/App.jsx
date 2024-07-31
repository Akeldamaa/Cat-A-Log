import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserDashboard from "./components/pages/UserDashboard";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import About from "./components/pages/About";
import Examples from "./components/pages/Examples";
import FeaturedShelter from "./components/pages/FeaturedShelter";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="user-dashboard" element={<UserDashboard />} />
        <Route path="about" element={<About />}/>
        <Route path="examples" element={<Examples />}/>
        <Route path="featured-shelter" element={<FeaturedShelter />}/>
        {/* Add more paths here in future */}
      </Routes>
    </div>
  );
}
