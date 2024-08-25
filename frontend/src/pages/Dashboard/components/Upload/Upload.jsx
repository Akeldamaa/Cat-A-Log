import { useState, useRef } from "react";
import { Button } from "../../../../components/ui/Button";
import { UploadIcon } from "../../../../components/ui/icons";
import ProgressBar from "../../../../components/ProgressBar";
import "./Upload.css";

function Upload({ onCardsGenerated }) {
  // Receive the onCardsGenerated prop
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showSendOffButton, setShowSendOffButton] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading
  const fileInputRef = useRef(null);

  const handleImageUpload = async (files) => {
    setLoading(true);
    setUploadStatus(null);
    setShowSendOffButton(false);
    setPreviewImages([]);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/cards/upload/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Full API Response:", result); // Log full API response for debugging

      if (response.ok && result.status === "success" && result.cards) {
        onCardsGenerated(result.cards);
        setPreviewImages(files.map((file) => URL.createObjectURL(file)));
        setUploadStatus("Upload successful!");
        setShowSendOffButton(true);
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOff = () => {
    setUploadStatus("Upload successful!"); // Show success message when "Send off" button is clicked
    setShowSendOffButton(false); // Hide the "Send off" button after it's clicked
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div id="upload-section" className="section upload">
      <h2 className="section-title">Image Upload</h2>
      <div
        className="upload-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-content">
          <UploadIcon className="upload-icon" />
          <p className="upload-text">Drag and drop or click to upload</p>
          <input
            type="file"
            multiple
            className="upload-input"
            onChange={(e) => handleImageUpload(e.target.files)}
            ref={fileInputRef} // Attach the ref to the file input
            style={{ display: "none" }} // Hide the input field
          />
          <Button
            variant="default"
            className="upload-button"
            onClick={handleButtonClick}
          >
            Upload
          </Button>
        </div>
      </div>
      {loading && <ProgressBar />} {/* Display progress bar during loading */}
      {previewImages.length > 0 && (
        <div className="preview-container">
          {previewImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="preview-image"
            />
          ))}
        </div>
      )}
      {showSendOffButton && (
        <Button
          variant="default"
          onClick={handleSendOff}
          className="send-off-button"
        >
          Send off
        </Button>
      )}
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
}

export default Upload;
