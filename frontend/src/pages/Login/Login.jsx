import React from 'react';
import { useState } from "react";
import './Login.css';
import { Input } from '../../components/forms/Input';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });

    function test_input(){
        
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Cat-A-Log</h1>
                <h2 className="login-subtitle">Login</h2>
                <form className="login-form">
                    <div className="login-fields">
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={loginInfo.username}
                            onChange={(e) =>
                                setLoginInfo({ ...loginInfo, username: e.target.value })
                            }
                            className="form-input"
                            label={"Username"}
                        />
                        <Input
                            id="password"
                            type="text"
                            placeholder="Password"
                            value={loginInfo.password}
                            onChange={(e) =>
                                setLoginInfo({ ...loginInfo, password: e.target.value })
                            }
                            className="form-input"
                            label={"Password"}
                        />
                    </div>

                    <div className="login-footer">
                        <a href="forgot-password" className="forgot-password">Forgot Password?</a>
                        <a href="signup" className="signup-section">Create an Account</a>
                    </div>
                    <button className="login-submit" type="submit">
                        Login!
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
