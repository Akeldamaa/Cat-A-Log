import Navbar from "../../components/layout/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="banner">
          <h1>Cat-A-Log</h1>
        </div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="home-section">
          <div className="welcome-section">
            <h2>Welcome!</h2>
            <p>
              This app allows you to upload images of your cats, analyze their
              features using AI, customize them with stickers and elements, and
              even mint them as NFTs on the blockchain. Explore our page, or
              create an account to start!
            </p>
          </div>
          <div className="mission-statement">
            <h2>Our Mission</h2>
            <p>

            </p>
          </div>
          <div className="about-us">
            <h2>About Us</h2>
            <p>

            </p>
          </div>
          <div className="current-abilities">
            <h2>Current Features</h2>
            <p>

            </p>
          </div>
          <div className="feature-timeline">
            <h2>Future Feature Timeline</h2>
            <p>
              
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
