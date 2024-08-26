import "./Analysis.css";
import PropTypes from "prop-types";

function Analysis({ cardsData }) {
  return (
    <div id="analysis-section" className="section analysis">
      <h2 className="section-title">AI Analysis</h2>
      <div className="analysis-container">
        {cardsData && cardsData.length > 0 ? (
          cardsData.map((card, index) => (
            <div key={index} className="image-container">
              <img
                src={card.url} // Adjust this path if needed
                alt={`Generated Card ${index + 1}`}
                className="image"
              />

              <div className="image-info">
                {/* <div className="image-breed"></div> */}
                <div className="image-characteristics">{card.description}</div>
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

Analysis.propTypes = {
  cardsData: PropTypes.array,
};

export default Analysis;
