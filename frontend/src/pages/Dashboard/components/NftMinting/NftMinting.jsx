import { useState } from "react";
import { Button } from "../../../../components/ui/Button";
import { EclipseIcon, OctagonIcon } from "../../../../components/ui/icons";
import "./NftMinting.css";

function NftMinting() {
  const [nftMinting, setNftMinting] = useState({ blockchain: "Ethereum" });

  const handleNftMinting = (blockchain) => {
    setNftMinting({ blockchain });
  };

  return (
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
  );
}

export default NftMinting;
