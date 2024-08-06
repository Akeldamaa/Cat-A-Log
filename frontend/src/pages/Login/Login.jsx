import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="home-container">
            <div>
                <h1>Cat-A-Log</h1>
                <form>
                    <div className="login-fields">
                        <div className="username">
                            <label>Username</label>
                            <input></input>
                        </div>
                        <div className="password">
                            <label>Password</label>
                            <input></input>
                        </div>
                    </div>
                </form>
                <div className="forgot-password">
                    <p><a href="forgot-password">Forgot Password?</a></p>
                </div>
                <div className="login-button">
                    <button>Log in</button>
                </div>
                <div>
                    <button>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Login;


