import React from 'react';
import { useState } from "react";
import './ForgotPassword.css';
import { Input } from '../../components/forms/Input';

const ForgotPassword = () => {
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState({
        email: "",
    });

    return (
        <div className="forgotpassword-container">
            <div className="forgotpassword-card">
                <h1 className="forgotpassword-title">Cat-A-Log</h1>
                <h2 className="forgotpassword-subtitle">Reset Password</h2>
                <form>
                    <div className="forgotpassword-fields">
                        <Input
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={forgotPasswordEmail.email}
                            onChange={(e) =>
                                setForgotPasswordEmail({ ...forgotPasswordEmail, email: e.target.value })
                            }
                            className="form-input"
                            label={"Email"}
                        />
                    </div>
                    <div className="login-footer">
                        <a href="login" className="login-link">Back to Login</a>
                        <a href="signup" className="signup-section">Create an Account</a>
                    </div>

                    <div className="forgotpassword-button">
                        <button className="forgotPassword-submit"> Send Reset Link</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default ForgotPassword;
