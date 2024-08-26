import Navbar from "./Navbar";
import "./Header.css";
import CatALogLogo from "../../pages/Assets/CatALogLogo.png";

export default function Banner() {
  return (
    <header>
      <div className="banner">
        <div>
          <img src={CatALogLogo} className="img" />
        </div>
      </div>
      <div className="navbar">
        <Navbar />
      </div>
    </header>
  );
}
