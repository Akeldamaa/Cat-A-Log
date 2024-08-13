import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="/login" className="nav-link">
            Login
          </a>
        </li>
        <li>
          <a href="/signup" className="nav-link">
            Sign Up
          </a>
        </li>
        <li>
          <a href="/dashboard" className="nav-link">
            Dashboard {/*Eventually only Accessible through the log in and sign up pages*/}
          </a>
        </li>
        <li>
          <a href="/about" className="nav-link">
            About
          </a>
        </li>
        <li>
          <a href="/featured-shelter" className="nav-link">
            Featured Shelter
          </a>
        </li>
      </ul>
    </nav>
  );
}
