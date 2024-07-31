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
                <li>
                    <Link to='/about'>Future link to About Page</Link>
                </li>
                <li>
                    <Link to='/examples'>Future Link to Examples Page</Link>
                </li>
                <li>
                    <Link to="/featured-shelter">Future link to Featured Shelter</Link>
                </li>
            </ul>
        </>
    )
}