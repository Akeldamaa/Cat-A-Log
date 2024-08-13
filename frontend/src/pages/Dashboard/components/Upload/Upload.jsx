import { useState, useRef } from "react";
import { Button } from "../../../../components/ui/Button";
import { UploadIcon } from "../../../../components/ui/icons";
import "./Upload.css";

function Upload() {
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showSendOffButton, setShowSendOffButton] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (files) => {
    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);

    const formData = new FormData();
    fileArray.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setShowSendOffButton(true); // Show "Send off" button after successful upload
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Upload failed. Please try again.");
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
    // Programmatically trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="section upload">
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
