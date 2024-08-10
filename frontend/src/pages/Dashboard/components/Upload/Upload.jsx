import { useState } from "react";
import { Button } from "../../../../components/ui/Button";
import { UploadIcon } from "../../../../components/ui/icons";
import "./Upload.css";

function Upload() {
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleImageUpload = async (files) => {
    const fileArray = Array.from(files);
    const previews = fileArray.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(previews);

    const formData = new FormData();
    fileArray.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Upload successful!");
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
          />
          <Button variant="default" className="upload-button">
            Upload
          </Button>
        </div>
      </div>

      {previewImages.length > 0 && (
        <div className="preview-container">
          {previewImages.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index}`} className="preview-image" />
          ))}
        </div>
      )}

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
}

export default Upload;
