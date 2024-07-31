import React from 'react';
import './FeaturedShelter.css';
import Navbar from '../HomePageNavbar';

export default function FeaturedShelter(){
    return (
        <div className="home-container">
            <div className="banner">
                <h1>Cat-A-Log</h1>
            </div>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='featured-section'>
                <h2>Donate to a shelter!</h2>
            </div>
        </div>
    )
}