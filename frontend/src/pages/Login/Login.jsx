import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Cat-A-Log</h1>
                <h2 className="login-subtitle">Login</h2>
                <form>
                    <div className="login-fields">
                        <div className="input-container">
                            <input type="text" placeholder="Username" className="login-input" />
                        </div>
                        <div className="input-container">
                            <input type="password" placeholder="Password" className="login-input" />
                        </div>
                    </div>
                </form>
                <div className="login-footer">
                    <a href="forgot-password" className="forgot-password">forgot password?</a>
                    <a href="signup" className="signup-link">Already a member?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
