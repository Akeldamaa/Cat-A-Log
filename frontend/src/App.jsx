import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import Examples from "./pages/Examples/Examples";
import FeaturedShelter from "./pages/FeaturedShelter/FeaturedShelter";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="about" element={<About />} />
        <Route path="examples" element={<Examples />} />
        <Route path="featured-shelter" element={<FeaturedShelter />} />
        {/* Add more paths here in future */}
      </Routes>
    </div>
  );
}
