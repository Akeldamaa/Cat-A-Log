import React from 'react';
import './HomePageNavbar.css';

export default function HomeNavbar() {
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <a href='/' className='nav-link'>Home</a>
                </li>
                <li>
                    <a href="/login" className='nav-link'>Login</a>
                </li>
                <li>
                    <a href="/user-dashboard" className='nav-link'>User Dashboard</a>
                </li>
                <li>
                    <a href="/about" className='nav-link'>Future link to About Page</a>
                </li>
                <li>
                    <a href="/examples" className='nav-link'>Future Link to Examples Page</a>
                </li>
                <li>
                    <a href="/featured-shelter" className='nav-link'>Future link to Featured Shelter</a>
                </li>
            </ul>
        </nav>
    )
}