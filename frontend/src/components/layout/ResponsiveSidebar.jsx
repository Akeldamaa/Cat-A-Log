import "./ResponsiveSidebar.css";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Avatar, AvatarImage } from "../ui/Avatar";
import {
  Home,
  Brush,
  Logout,
  FileUpload,
  ImageSearch,
  CurrencyExchange,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ToggleButton } from "@mui/material";

function ResponsiveSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar className="sidebar" collapsed={collapsed}>
      <div className="toggle-button">
        <ToggleButton
          value="check"
          selected={collapsed}
          onChange={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <Fullscreen /> : <FullscreenExit />}
        </ToggleButton>
      </div>

      <Menu className="menu">
        <MenuItem className="menu-item icon">
          <Avatar>
            <AvatarImage src="/display-picture.png" />
          </Avatar>
        </MenuItem>
        <Link class="nav-link" to="/">
          <MenuItem className="menu-item" icon={<Home />}>
            Home
          </MenuItem>
        </Link>
        <Link class="nav-link" to="#upload-section">
          <MenuItem className="menu-item" icon={<FileUpload />}>
            Upload
          </MenuItem>
        </Link>
        <Link class="nav-link" to="#analysis-section">
          <MenuItem className="menu-item" icon={<ImageSearch />}>
            Analysis
          </MenuItem>
        </Link>
        <Link class="nav-link" to="#customization-section">
          <MenuItem className="menu-item" icon={<Brush />}>
            Customization
          </MenuItem>
        </Link>
        <Link class="nav-link" to="#nft-section">
          <MenuItem className="menu-item" icon={<CurrencyExchange />}>
            NFT Minting
          </MenuItem>
        </Link>
        <MenuItem className="menu-item" icon={<Logout />}>
          Log out
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default ResponsiveSidebar;
