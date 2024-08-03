import Navbar from "../../components/layout/Navbar";
import "./Examples.css";

export default function Examples() {
  return (
    <div className="home-container">
      <div className="banner">
        <h1>Cat-A-Log</h1>
      </div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="example-section">
        <h2>Examples of some cards!</h2>
      </div>
    </div>
  );
}
