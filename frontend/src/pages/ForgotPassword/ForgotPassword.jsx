import React from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
    return (
        <div className="forgotpassword-container">
            <div className="forgotpassword-card">
                <h1 className="forgotpassword-title">Cat-A-Log</h1>
                <h2 className="forgotpassword-subtitle">Reset Password</h2>
                <form>
                    <div className="forgotpassword-fields">
                        <div className="input-container">
                            <input type="text" placeholder="Email" className="forgotpassword-input" />
                        </div>
                    </div>
                </form>
                <div className="forgotpassword-button">
                        <button> Send Reset Link</button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
