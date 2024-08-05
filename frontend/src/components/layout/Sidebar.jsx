import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="nav">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/dashboard/upload" className="nav-link">
          Upload
        </a>
        <a href="/dashboard/analysis" className="nav-link">
          Analysis
        </a>
        <a href="/dashboard/customization" className="nav-link">
          Customization
        </a>
        <a href="/dashboard/nft-minting" className="nav-link">
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
  );
}

export default Sidebar;
