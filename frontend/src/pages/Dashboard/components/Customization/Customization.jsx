import { useState } from "react";
import { Button } from "../../../../components/ui/Button";
import {
  Clock3Icon,
  ComponentIcon,
  Link2Icon,
  StickerIcon,
} from "../../../../components/ui/icons";
import "./Customization.css";

function Customization() {
  const [customizations, setCustomizations] = useState({
    stickers: [],
    elements: [],
  });

  const handleCustomization = (type, value) => {
    // Function to handle customization
  };

  return (
    <div id="customization-section" className="section customization">
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
  );
}

export default Customization;
