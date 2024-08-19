import { useState } from "react";
import axios from "axios";
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
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleImageUpload = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post("http://localhost:8000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.status === "success") {
        setUploadedImages(response.data.cards); // Store the uploaded and analyzed cards
        setUploadStatus("Upload successful!");
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div id="analysis-section" className="section analysis">
      <h2 className="section-title">AI Analysis</h2>
      <div className="analysis-container">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={image.trading_card} // Display the generated trading card image
                alt={`Uploaded Image ${index + 1}`}
                className="image"
              />
              <div className="image-info">
                <div className="image-breed">Species: {image.species}</div>
                <div className="image-characteristics">Description: {image.analysis}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-images">No images uploaded yet.</div>
        )}
      </div>
      {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
    </div>
  );
}

export default Analysis;
