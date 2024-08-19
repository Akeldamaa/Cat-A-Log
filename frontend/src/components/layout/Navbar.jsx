import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="top-nav">
      <ul className="nav-items">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/featured-shelter" className="nav-link">
            Featured Shelter
          </Link>
        </li>
      </ul>
    </nav>
  );
}
