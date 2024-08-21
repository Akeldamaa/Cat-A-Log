import "./Footer.css";
import PurgrammersLogo from "../../pages/Assets/PurrgrammersLogo.png";

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="logoContainer">
        <img src={PurgrammersLogo} alt="The Purgrammers Logo" />
      </div>
      <div className="footerContent">
        <h4>The Purrgrammers&copy;</h4>
        <p>
          <a href="https://linktr.ee/thePurrgrammers" target="_blank">
            Visit our Linktree
          </a>
        </p>
      </div>
    </footer>
  );
}
