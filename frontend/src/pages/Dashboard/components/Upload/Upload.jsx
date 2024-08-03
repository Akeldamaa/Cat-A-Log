import { Button } from "../../../../components/ui/Button";
import { UploadIcon } from "../../../../components/ui/icons";
import "./Upload.css";

function Upload() {
  const handleImageUpload = (files) => {
    // Function to handle image upload
  };

  return (
    <div className="section upload">
      <h2 className="section-title">Image Upload</h2>
      <div className="upload-container">
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
    </div>
  );
}

export default Upload;
