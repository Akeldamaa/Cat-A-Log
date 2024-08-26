import { useState, useRef } from "react";
import { Button } from "../../../../components/ui/Button";
import { UploadIcon } from "../../../../components/ui/icons";
import ProgressBar from "../../../../components/ProgressBar";
import "./Upload.css";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import PropTypes from "prop-types";

function Upload({ onCardsGenerated }) {
  // Receive the onCardsGenerated prop
  const [images, setImages] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSendOffButton, setShowSendOffButton] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading
  const fileInputRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  const handleImageChange = (files) => {
    setShowSendOffButton(false); // Hide the "Send off" button when new images are uploaded
    setErrorMsg(null); // Reset the error message
    setPreviewImages([]);

    setImages(files);
    Array.from(files).forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => [...prev, imageUrl]);
    });

    setUploadStatus("Upload successful!");
    setShowSendOffButton(true); // Show the "Send off" button after images are uploaded
  };

  const handleImageUpload = async (files) => {
    setLoading(true);
    setUploadStatus(null);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    axiosPrivate
      .post("/api/cards/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        onCardsGenerated(response.data.cards);
        setShowSendOffButton(false);
        // console.log("Full API Response:", response.data); // Log full API response for debugging
      })
      .catch((error) => {
        console.error("Error creating card:", error);
        setErrorMsg("Card creation failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSendOff = () => {
    setUploadStatus("Creating cards...");
    setErrorMsg(null); // Reset the error message
    handleImageUpload(images); // Send off the images for processing
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // only allow dropping one image
    if (e.dataTransfer.files.length > 1) {
      setShowSendOffButton(false);
      setPreviewImages([]);
      setUploadStatus(null);
      setErrorMsg("Please upload only one image");
      // only allow image files
    } else if (!e.dataTransfer.files[0].type.startsWith("image/")) {
      setShowSendOffButton(false);
      setPreviewImages([]);
      setUploadStatus(null);
      setErrorMsg("Please upload an image file");
    } else {
      handleImageChange(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
            id="file"
            type="file"
            // multiple
            className="upload-input"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                handleImageChange(e.target.files);
              }
            }}
            accept="image/*"
            ref={fileInputRef} // Attach the ref to the file input
            style={{ display: "none" }} // Hide the input field
          />
          <label htmlFor="file" className="upload-button">
            Upload
          </label>
        </div>
      </div>
      {loading && (
        <div style={{ marginTop: "10px" }}>
          <ProgressBar />
        </div>
      )}{" "}
      {/* Display progress bar during loading */}
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {previewImages.length > 0 && (
        <div className="preview-container">
          {previewImages.map((src, index) => (
            <div key={index} className="preview-image-wrapper">
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="preview-image"
              />
            </div>
          ))}
        </div>
      )}
      {showSendOffButton && (
        <Button
          variant="default"
          onClick={handleSendOff}
          className="send-off-button"
          disabled={loading}
        >
          {loading ? "Creating card..." : "Create card"}
        </Button>
      )}
    </div>
  );
}

Upload.propTypes = {
  onCardsGenerated: PropTypes.func,
};

export default Upload;
