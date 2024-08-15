import { useState } from "react";
import { LoaderIcon } from "../../../../components/ui/icons";
import ProgressBar from "../../../../components/ProgressBar";
import "./Analysis.css";

function Analysis() {
  const [catData, setCatData] = useState({
    breed: "",
    characteristics: "",
    age: "",
    gender: "",
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentCollection, setCurrentCollection] = useState([]);
  const [pastCreations, setPastCreations] = useState([]);

  return (
    <div id="analysis-section" className="section analysis">
      <h2 className="section-title">AI Analysis</h2>
      <div className="analysis-container">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src="/placeholder.svg"
                alt={`Uploaded Image ${index + 1}`}
                className="image"
              />
              {catData.breed ? (
                <div className="image-info">
                  <div className="image-breed">{catData.breed}</div>
                  <div className="image-characteristics">
                    {catData.characteristics}
                  </div>
                  <div className="image-age">Age: {catData.age}</div>
                  <div className="image-gender">Gender: {catData.gender}</div>
                </div>
              ) : (
                <div className="image-loading">
                  <LoaderIcon className="loading-icon" />
                  <span className="loading-text">Analyzing...</span>
                  <div className="loading-bar">
                    <ProgressBar />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="image-container">
            <img
              src="/placeholder.svg"
              alt="Placeholder Image"
              className="image"
            />
            <div className="image-info"></div>
          </div>
        )}
      </div>
      <div className="past-creations">
        <h3 className="section-title">Your Past Creations</h3>
        <div className="creations-container">
          {pastCreations.map((creation, index) => (
            <div key={index} className="creation-item">
              <img
                src="/placeholder.svg"
                alt={`Past Creation ${index + 1}`}
                className="creation-image"
              />
              <div className="creation-info">
                <div className="creation-name">{creation.name}</div>
                <div className="creation-details">
                  {creation.stickers.length} Stickers,{" "}
                  {creation.elements.length} Elements
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="current-collection">
        <h3 className="section-title">Your Current Collection</h3>
        <div className="collection-container">
          {currentCollection.map((item, index) => (
            <div key={index} className="collection-item">
              <img
                src="/placeholder.svg"
                alt={`Collection Item ${index + 1}`}
                className="collection-image"
              />
              <div className="collection-info">
                <div className="collection-name">{item.name}</div>
                <div className="collection-details">
                  {item.stickers.length} Stickers, {item.elements.length}{" "}
                  Elements
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
