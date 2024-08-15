import "./Signup.css";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Cat-A-Log</h1>
        <h2 className="signup-subtitle">Sign Up</h2>
        <SignupForm></SignupForm>
      </div>
    </div>
  );
};

export default Signup;
