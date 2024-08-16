import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import FeaturedShelter from "./pages/FeaturedShelter/FeaturedShelter";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Error from "./pages/Error/Error";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AuthenticatedRoutes from "./utils/AuthenticatedRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="featured-shelter" element={<FeaturedShelter />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="about" element={<About />} />
      <Route element={<AuthenticatedRoutes />}>
        {/* All authenticated routes (routes that can only be accessed when users are not logged in) are stored here. Remove the signup and login route from here to access them without logging out*/}
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        {/* All protected routes (routes that can only be accessed when users are logged in) are stored here. Remove the dashboard route from here to access it without logging in*/}
        <Route path="dashboard" element={<DashBoard />} />
      </Route>
      {/* Add more paths here in future. All new paths should be added above this line. The path with path='*' should always be the last */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
