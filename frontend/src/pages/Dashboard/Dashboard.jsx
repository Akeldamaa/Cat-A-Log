import { useState } from "react";
import "./Dashboard.css";
// import TestApi from "../TestApi";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/forms/Input";
import TestApi from "../../components/TestApi";
import ProgressBar from "../../components/ProgressBar";

const DashBoard = () => {
  const [catData, setCatData] = useState({
    breed: "",
    characteristics: "",
    age: "",
    gender: "",
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [pastCreations, setPastCreations] = useState([]);
  const [currentCollection, setCurrentCollection] = useState([]);
  const [customizations, setCustomizations] = useState({
    stickers: [],
    elements: [],
  });
  const [nftMinting, setNftMinting] = useState({ blockchain: "Ethereum" });

  //placeholder for progress bar interval - Abby Boggs 7/25/2024
  const [completed, setCompleted] = useState();

  const handleImageUpload = (files) => {
    // Function to handle image upload
  };

  const handleCustomization = (type, value) => {
    // Function to handle customization
  };

  const handleNftMinting = (blockchain) => {
    setNftMinting({ blockchain });
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <nav className="nav">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="user-dashboard/upload" className="nav-link">
            Upload
          </a>
          <a href="user-dashboard/analysis" className="nav-link">
            Analysis
          </a>
          <a href="user-dashboard/customization" className="nav-link">
            Customization
          </a>
          <a href="user-dashboard/nft-minting" className="nav-link">
            NFT Minting
          </a>
        </nav>
        <div className="avatar-container">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="content">
        <TestApi />
        <div className="section welcome">
          <h2 className="section-title">Cat-a-Log </h2>
          <p className="section-description">
            This app allows you to upload images of your cats, analyze their
            features using AI, customize them with stickers and elements, and
            even mint them as NFTs on the blockchain. Explore the different
            sections of the app to get started.
          </p>
        </div>
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
        <div className="section analysis">
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
                      <div className="image-gender">
                        Gender: {catData.gender}
                      </div>
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
        <div className="section data-input">
          <h2 className="section-title">Data Input</h2>
          <form className="data-input-form">
            <div className="form-group">
              <Label htmlFor="breed" className="form-label">
                Breed
              </Label>
              <div className="form-control">
                <Input
                  id="breed"
                  type="text"
                  placeholder="Enter breed"
                  value={catData.breed}
                  onChange={(e) =>
                    setCatData({ ...catData, breed: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-control">
                <Input
                  id="characteristics"
                  type="text"
                  placeholder="Enter characteristics"
                  value={catData.characteristics}
                  onChange={(e) =>
                    setCatData({ ...catData, characteristics: e.target.value })
                  }
                  className="form-input"
                  label={"characteristics"}
                />
              </div>
            </div>
            <div className="form-group">
              <Label htmlFor="age" className="form-label">
                Age
              </Label>
              <div className="form-control">
                <Input
                  id="age"
                  type="text"
                  placeholder="Enter age"
                  value={catData.age}
                  onChange={(e) =>
                    setCatData({ ...catData, age: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <Label htmlFor="gender" className="form-label">
                Gender
              </Label>
              <div className="form-control">
                <Input
                  id="gender"
                  type="text"
                  placeholder="Enter gender"
                  value={catData.gender}
                  onChange={(e) =>
                    setCatData({ ...catData, gender: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="section customization">
          <h2 className="section-title">Customization</h2>
          <div className="customization-options">
            <div className="customization-group">
              <h3 className="customization-title">Stickers</h3>
              <div className="customization-items">
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("sticker", "sticker1")}
                >
                  <StickerIcon className="customization-icon" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("sticker", "sticker2")}
                >
                  <StickerIcon className="customization-icon" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("sticker", "sticker3")}
                >
                  <StickerIcon className="customization-icon" />
                </Button>
              </div>
            </div>
            <div className="customization-group">
              <h3 className="customization-title">Elements</h3>
              <div className="customization-items">
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("element", "element1")}
                >
                  <ComponentIcon className="customization-icon" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("element", "element2")}
                >
                  <Link2Icon className="customization-icon" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("element", "element3")}
                >
                  <Clock3Icon className="customization-icon" />
                </Button>
              </div>
            </div>
          </div>
          <div className="customization-preview">
            <h3 className="customization-title">
              Transform your cat into a stylized trading card
            </h3>
            <div className="preview-container">
              <div className="preview-content">
                <img
                  src="/placeholder.svg"
                  alt="Cat Trading Card"
                  className="preview-image"
                />
                {customizations.stickers.map((sticker, index) => (
                  <div key={index} className="preview-sticker">
                    <StickerIcon className="preview-icon" />
                  </div>
                ))}
                {customizations.elements.map((element, index) => (
                  <div key={index} className="preview-element">
                    <ComponentIcon className="preview-icon" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="customization-sticker-pack">
            <h3 className="customization-title">AI Stylized Sticker Pack</h3>
            <div className="sticker-pack-container">
              <div className="sticker-pack-items">
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("sticker", "sticker4")}
                >
                  <StickerIcon className="sticker-pack-icon" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("sticker", "sticker5")}
                >
                  <StickerIcon className="sticker-pack-icon" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCustomization("sticker", "sticker6")}
                >
                  <StickerIcon className="sticker-pack-icon" />
                </Button>
              </div>
              <div className="sticker-pack-save">
                <Button variant="default">Save Sticker Pack</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="section nft-minting">
          <h2 className="section-title">NFT Minting</h2>
          <div className="nft-minting-options">
            <Button
              variant="default"
              onClick={() => handleNftMinting("Ethereum")}
              className={nftMinting.blockchain === "Ethereum" ? "active" : ""}
            >
              <EclipseIcon className="nft-icon" />
              <span>Ethereum</span>
            </Button>
            <Button
              variant="default"
              onClick={() => handleNftMinting("Polygon")}
              className={nftMinting.blockchain === "Polygon" ? "active" : ""}
            >
              <OctagonIcon className="nft-icon" />
              <span>Polygon</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// custom icons here as SVG components
const UploadIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const LoaderIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v4" />
    <path d="m16.2 7.8 2.9-2.9" />
    <path d="M18 12h4" />
    <path d="m16.2 16.2 2.9 2.9" />
    <path d="M12 18v4" />
    <path d="m4.9 19.1 2.9-2.9" />
    <path d="M2 12h4" />
    <path d="m4.9 4.9 2.9 2.9" />
  </svg>
);

const StickerIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
    <path d="M14 3v4a2 2 0 0 0 2 2h4" />
    <path d="M8 13h0" />
    <path d="M16 13h0" />
    <path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />
  </svg>
);

const ComponentIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
    <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
    <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
    <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
  </svg>
);

const EclipseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a7 7 0 1 0 10 10" />
  </svg>
);

const Link2Icon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 17H7A5 5 0 0 1 7 7h2" />
    <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
    <line x1="8" x2="16" y1="12" y2="12" />
  </svg>
);

const OctagonIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
  </svg>
);

const Clock3Icon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16.5 12" />
  </svg>
);

export default DashBoard;
