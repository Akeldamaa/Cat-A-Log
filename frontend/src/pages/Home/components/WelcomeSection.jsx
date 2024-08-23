import React from "react";
import HowItWorksGraphic from "../../Assets/howItWorks.jpg"

export default function WelcomeSection(){
    return (
        <div className="welcome-section">
            <div className="flex-container">
              <div className="column">
                <div>
                  <h2>Welcome!</h2>
                </div>
                <div>
                  <p>
                    <strong>Cat-A-Log</strong> is a web app that leverages AI to scan images of cats, analyze their patterns and characteristics, and generate digital trading cards based on rarity.
                  </p>
                  <p>
                    <ol>
                      <li>
                        Upload an image of your cat
                      </li>
                      <li>
                        AI Analyzes your image.
                      </li>
                      <li>
                        Produces a fun trading card with fun facts about your cat! With the option of Minting them on blockchain.
                      </li>
                    </ol>
                  </p>
                </div>
              </div>
              <div className="column">
                <img
                  src={HowItWorksGraphic}
                  alt="how it works"
                />
              </div>
            </div>
          </div>
    )
}