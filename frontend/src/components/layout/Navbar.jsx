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
          <a href="/dashboard" className="nav-link">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/about" className="nav-link">
            Future link to About Page
          </a>
        </li>
        <li>
          <a href="/examples" className="nav-link">
            Future Link to Examples Page
          </a>
        </li>
        <li>
          <a href="/featured-shelter" className="nav-link">
            Future link to Featured Shelter
          </a>
        </li>
      </ul>
    </nav>
  );
}
