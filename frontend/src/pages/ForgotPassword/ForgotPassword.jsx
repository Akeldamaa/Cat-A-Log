import "./ForgotPassword.css";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-card">
        <h1 className="forgotpassword-title">Cat-A-Log</h1>
        <h2 className="forgotpassword-subtitle">Reset Password</h2>
        <ForgotPasswordForm></ForgotPasswordForm>
      </div>
    </div>
  );
};

export default ForgotPassword;
