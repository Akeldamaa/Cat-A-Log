import React from 'react';
import { useState } from "react";
import './Login.css';
import LoginForm from './LoginForm';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });
   
    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Cat-A-Log</h1>
                <h2 className="login-subtitle">Login</h2>
                <LoginForm></LoginForm>
            </div>
        </div>
    );
}

export default Login;
