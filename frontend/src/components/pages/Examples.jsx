import React from 'react';
import "./Examples.css";
import Navbar from '../HomePageNavbar';

export default function Examples(){
    return (
        <div className="home-container">
            <div className="banner">
                <h1>Cat-A-Log</h1>
            </div>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='example-section'>
                <h2>Examples of some cards!</h2>
            </div>
        </div>
    )
}
