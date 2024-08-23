import "./Footer.css";
import PurrgrammersLogo from "../../pages/Assets/PurrgrammersLogo.png";

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="logoContainer">
        <img src={PurrgrammersLogo} alt="The Purrgrammers Logo" />
      </div>
      <div className="footerContent">
        <h4>The Purrgrammers &copy;</h4>
        <p>
          <a href="https://linktr.ee/thePurrgrammers" target="_blank">
            Visit our Linktree
          </a>
        </p>
      </div>
    </footer>
  );
}
