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
import { ToggleButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function ResponsiveSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("/api/auth/logout/")
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <MenuItem className="menu-item" icon={<Home />} href="/">
          Home
        </MenuItem>
        <MenuItem
          className="menu-item"
          icon={<FileUpload />}
          href="#upload-section"
        >
          Upload
        </MenuItem>
        <MenuItem
          className="menu-item"
          icon={<ImageSearch />}
          href="#analysis-section"
        >
          Analysis
        </MenuItem>
        <MenuItem
          className="menu-item"
          icon={<Brush />}
          href="#customization-section"
        >
          Customization
        </MenuItem>
        <MenuItem
          className="menu-item"
          icon={<CurrencyExchange />}
          href="#nft-section"
        >
          NFT Minting
        </MenuItem>
        <MenuItem
          className="menu-item"
          icon={<Logout />}
          onClick={handleLogout}
        >
          Log out
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default ResponsiveSidebar;
