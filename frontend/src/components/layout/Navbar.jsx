import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../pages/Assets/CatALogLogo.png";

export default function Navbar() {
  const userIsLoggedIn = false;

  return (
    <div className="navbar-container container">
      <div>
        <Link to={"/"}>
          <img className="logo" src={Logo} />
        </Link>
      </div>
      <nav className="top-nav">
        <ul className="nav-items">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/"
            >
              Home{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/featured-shelter"
            >
              Featured Shelter
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        {userIsLoggedIn ? (
          <button className="auth-btn">Logout</button>
        ) : (
          <Link to={"/login"} className="auth-btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
