import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="nav">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="#upload-section" className="nav-link">
          Upload
        </a>
        <a href="#analysis-section" className="nav-link">
          Analysis
        </a>
        <a href="#customization-section" className="nav-link">
          Customization
        </a>
        <a href="#nft-section" className="nav-link">
          NFT Minting
        </a>
        <a href="/" className="nav-link">
          Log out
        </a>
      </nav>
      <div className="avatar-container">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Sidebar;
