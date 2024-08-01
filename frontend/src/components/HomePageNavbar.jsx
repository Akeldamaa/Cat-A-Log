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
                    <a href='/signup' className='nav-link'>Sign up</a>
                </li>
                <li>
                    <a href="/user-dashboard" className='nav-link'>User Dashboard</a>
                </li>
                <li>
                    <a href="/about" className='nav-link'>About</a>
                </li>
                <li>
                    <a href="/examples" className='nav-link'>Examples</a>
                </li>
                <li>
                    <a href="/featured-shelter" className='nav-link'>Featured Shelter</a>
                </li>
            </ul>
        </nav>
    )
}