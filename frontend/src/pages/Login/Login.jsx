import "./Login.css";
import LoginForm from "./LoginForm";
import CatALogLogo from "../Assets/CatALogLogo.png"

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div>
          <img
            className="login-logo"
            src={CatALogLogo}
            alt="Cat A Log Logo"
          />
        </div>
        <h2 className="login-subtitle">Login</h2>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default Login;
