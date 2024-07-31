import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
    return (
        <>
            <h1>Home page</h1>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to='/user-dashboard'>User Dashboard</Link>
                </li>
            </ul>
        </>
    )
}