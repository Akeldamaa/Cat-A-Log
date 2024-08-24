import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../pages/Assets/CatALogLogo.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Navbar() {
  const privateAxios = useAxiosPrivate();
  const user = localStorage.getItem("user");
  const handleLogout = () => {
    privateAxios
      .get("/api/auth/logout/")
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        localStorage.removeItem("user");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        {user ? (
          <button className="auth-btn" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <Link to={"/login"} className="auth-btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
