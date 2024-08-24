import "./ForgotPassword.css";
import ForgotPasswordForm from "./ForgotPasswordForm";
import CatALogLogo from "../Assets/CatALogLogo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-card">
        <div>
          <Link to={"/"}>
            <img
              className="login-logo"
              src={CatALogLogo}
              alt="Cat A Log Logo"
            />
          </Link>
        </div>
        <h2 className="forgotpassword-subtitle">Reset Password</h2>
        <ForgotPasswordForm></ForgotPasswordForm>
      </div>
    </div>
  );
};

export default ForgotPassword;
