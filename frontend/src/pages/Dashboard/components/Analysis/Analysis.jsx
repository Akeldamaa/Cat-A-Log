import React from "react";
import "./Analysis.css";

function Analysis({ cardsData }) {
  return (
    <div id="analysis-section" className="section analysis">
      <h2 className="section-title">AI Analysis</h2>
      <div className="analysis-container">
        {cardsData && cardsData.length > 0 ? (
          cardsData.map((card, index) => (
            <div key={index} className="image-container">
           <img
  src={`http://127.0.0.1:8000${card.trading_card}`}  // Adjust this path if needed
  alt={`Generated Card ${index + 1}`}
  className="image"
/>

              <div className="image-info">
                <div className="image-breed">Species: {card.species}</div>
                <div className="image-characteristics">Description: {card.analysis}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-images">No images uploaded yet.</div>
        )}
      </div>
    </div>
  );
}

export default Analysis;
