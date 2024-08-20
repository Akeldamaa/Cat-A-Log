import "./Signup.css";
import SignupForm from "./SignupForm";
import CatALogLogo from "../Assets/CatALogLogo.png"

const Signup = () => {
  return (
    <div className="signup-container">

      <div className="signup-card">
        <div>
          <img
            className="login-logo"
            src={CatALogLogo}
            alt="Cat A Log Logo"
          />
        </div>
        <h2 className="signup-subtitle">Sign Up</h2>
        <SignupForm></SignupForm>
      </div>
    </div>
  );
};

export default Signup;
