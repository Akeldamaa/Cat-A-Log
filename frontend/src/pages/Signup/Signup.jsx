import React from 'react';
import { useState } from "react";
import './Signup.css';
import SignupForm from './SignupForm';

const Signup = () => {
    const [signupInfo, setSignUpInfo] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        name: ""
    });

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1 className="signup-title">Cat-A-Log</h1>
                <h2 className="signup-subtitle">Sign Up</h2>
                <SignupForm></SignupForm>
            </div>
        </div>
    );
}

export default Signup;