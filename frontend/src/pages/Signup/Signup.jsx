import React from 'react';
import { useState } from "react";
import './Signup.css';
import { Input } from '../../components/forms/Input';

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
                <form className="signup-form">
                    <div className="signup-fields">
                        <Input
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={signupInfo.name}
                            onChange={(e) =>
                                setSignUpInfo({ ...signupInfo, name: e.target.value })
                            }
                            className="form-input"
                            label={"Name"}
                        />
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={signupInfo.username}
                            onChange={(e) =>
                                setSignUpInfo({ ...signupInfo, username: e.target.value })
                            }
                            className="form-input"
                            label={"Username"}
                        />
                        <Input
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={signupInfo.email}
                            onChange={(e) =>
                                setSignUpInfo({ ...signupInfo, email: e.target.value })
                            }
                            className="form-input"
                            label={"Email"}
                        />
                        <Input
                            id="password"
                            type="text"
                            placeholder="Password"
                            value={signupInfo.password}
                            onChange={(e) =>
                                setSignUpInfo({ ...signupInfo, password: e.target.value })
                            }
                            className="form-input"
                            label={"Password"}
                        />
                        <Input
                            id="confirmPassword"
                            type="text"
                            placeholder="Confirm Password"
                            value={signupInfo.confirmPassword}
                            onChange={(e) =>
                                setSignUpInfo({ ...signupInfo, confirmPassword: e.target.value })
                            }
                            className="form-input"
                            label={"Confirm Password"}
                        />
                    </div>

                    <div className="signup-footer">
                        <a href="/login" className="login-link">Already a member?</a>
                    </div>
                    <div className="signup-button">
                        <button className="signup-submit"> Sign up! </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;