import React from 'react';
import './Signup.css';

export default function Signup() {
    return (
        <div>
            <div>
                <h1>Sign up page</h1>
                {/* Eventually turn this into a react object */}
                <form>
                    <div>
                        <label>Email:</label>
                        <input></input>
                    </div>
                    <div>
                        <label>Username:</label>
                        <input></input>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input></input>
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input></input>
                    </div>
                </form>
            </div>
        </div>
    )
}