import React from 'react';
import './Signup.css';

const Signup = () => {
    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1 className="signup-title">Cat-A-Log</h1>
                <h2 className="signup-subtitle">Sign Up</h2>
                <form>
                    <div className="signup-fields">
                        <div className="input-container">
                            <input type="text" placeholder="Name" className="signup-input" />
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Username" className="signup-input" />
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="Email" className="signup-input" />
                        </div>
                        <div className="input-container">
                            <input type="password" placeholder="Password" className="signup-input" />
                        </div>
                        <div className="input-container">
                            <input type="password" placeholder="Confirm Password" className="signup-input" />
                        </div>
                    </div>
                </form>
                
                <div className="signup-footer">
                    <a href="/login" className="signup-link">Already a member?</a>
                </div>
                <div className="signup-button">
                        <button> Sign up! </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;