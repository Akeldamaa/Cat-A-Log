export default function FeaturesSection() {
  return (
    <div className="features-section">
      <div className="features-title">
        <h2>Cat-A-Log Features</h2>
      </div>
      <div className="flex-container">
        <div className="column">
          <div className="current-abilities">
            <div>
              <h3>Current</h3>
            </div>
            <div>
              <p>
                <strong>Cat-A-Log</strong> currently features a user dashboard
                that allows users to create trading cards based off of their
                cat.
              </p>
              <ul>
                <li>Upload an image of your cat.</li>
                <li>
                  Receive a custom analysis of your cat on a trading Card.
                </li>
                <li>
                  Choose between 3 stickers to go on your card, like you're
                  pulling from a trading card pack.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="feature-timeline">
            <div>
              <h3>Future</h3>
            </div>
            <div>
              <p>
                The Purrgrammers are continuing to expand{" "}
                <strong>Cat-A-Log</strong> into a greater and better app!
              </p>
              <ul>
                <li>
                  User Trading: Trade cat trading cards and items securely using
                  blockchain.
                </li>
                <li>
                  Collections and Achievements: Earn points and badges by
                  completing tasks and displaying collections.
                </li>
                <li>
                  Points System: Earn points through achievements and battles;
                  spend on items for virtual cats.
                </li>
                <li>
                  Leader Boards: Compete on global and tiered leader boards for
                  trading, battles, and achievements.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
