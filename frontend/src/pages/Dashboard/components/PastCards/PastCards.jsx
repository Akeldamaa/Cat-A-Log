import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import "./PastCards.css";
import { useState, useEffect } from "react";
import download from "downloadjs";

const PastCards = () => {
  const [cards, setCards] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/api/cards/user/")
      .then((res) => {
        setCards(res.data.cards);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, []);

  const downloadImg = (url) => {
    download(url);
  };

  return (
    <div id="past-cards" className="section past-cards">
      <h2 className="section-title">Past Cards</h2>
      <div className="cards-container">
        {cards && cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index} className="card">
              <img
                src={card.url} // Adjust this path if needed
                alt={`Generated Card ${index + 1}`}
                className="card-image"
              />

              <button
                onClick={() => downloadImg(card.url)}
                className="download-card-btn"
              >
                Download
              </button>

              {/* <div className="card-info">
                <div className="card-breed">{card.breed}</div>
                <div className="card-analysis">
                  {card.analysis}
                </div>
              </div> */}
            </div>
          ))
        ) : (
          <div className="no-cards">No cards generated yet.</div>
        )}
      </div>
    </div>
  );
};

export default PastCards;
