import React from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';
import Navbar from '../HomePageNavbar';

export default function Home() {
    return (
        <div className="home-container">
            <div className="banner">
                <h1>Cat-A-Log</h1>
            </div>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='home-section'>
                <h2>Welcome!</h2>
                <p>
                    This app allows you to upload images of your cats, analyze their
                    features using AI, customize them with stickers and elements, and
                    even mint them as NFTs on the blockchain. Explore our page, or create an
                    account to start!
                </p>
            </div>
        </div>


    )
}