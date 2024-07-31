import React from 'react';
import './About.css';
import Navbar from '../HomePageNavbar';

export default function About(){
    return (
        <div className="home-container">
            <div className="banner">
                <h1>Cat-A-Log</h1>
            </div>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='about-section'>
                <h2>About Cat-A-Log</h2>
            </div>
        </div>
    )
}