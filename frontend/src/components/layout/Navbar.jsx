import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../pages/Assets/CatALogLogo.png"

export default function Navbar() {
  return (
    <div>
      <nav className="top-nav">
        <ul className="nav-items">
          <li>
            <img
              className="logo"
              src={Logo}
            />
          </li>
          <li>
            <NavLink activeClassName="active" className="nav-link" to="/featured-shelter">Featured Shelter</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" className="nav-link" to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" className="nav-link" to="/signup">Sign up</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" className="nav-link" to="/login">Login </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" className="nav-link" to="/">Home </NavLink>
          </li>
          
        </ul>
      </nav>
    </div>

  );
}
