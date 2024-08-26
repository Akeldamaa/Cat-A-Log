import "./Signup.css";
import SignupForm from "./SignupForm";
import CatALogLogo from "../Assets/CatALogLogo.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <div>
          <Link to={"/"}>
            <img
              className="login-logo"
              src={CatALogLogo}
              alt="Cat A Log Logo"
            />
          </Link>
        </div>
        <h2 className="signup-subtitle">Sign Up</h2>
        <SignupForm></SignupForm>
      </div>
    </div>
  );
};

export default Signup;
