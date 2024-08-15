import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import "./ResponsiveSidebar.css";

import { Home, Folder, Message, Brush } from "@mui/icons-material";
import BrushIcon from "@mui/icons-material/Brush";
import LogoutIcon from '@mui/icons-material/Logout';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

function ResponsiveSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Sidebar className="sidebar" collapsed={collapsed}>
            <Menu className="menu">
                <MenuItem className="menu-item icon" icon={<AccountBoxIcon />}>
                    <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </MenuItem>
                <a class="nav-link" href="/"><MenuItem className="menu-item" icon={<Home />}>Home</MenuItem></a>
                <a class="nav-link" href="#upload-section"><MenuItem className="menu-item" icon={<FileUploadIcon />}>Upload</MenuItem></a>
                <a class="nav-link" href="#analysis-section"><MenuItem className="menu-item" icon={<ImageSearchIcon />}>Analysis</MenuItem></a>
                <a class="nav-link" href="#customization-section"><MenuItem className="menu-item" icon={<BrushIcon />}>Customization</MenuItem></a>
                <a class="nav-link" href="#nft-section"><MenuItem className="menu-item" icon={<CurrencyExchangeIcon />}>NFT Minting</MenuItem></a>
                <MenuItem className="menu-item" icon={<LogoutIcon />}>Log out</MenuItem>
            </Menu>
            <button className="toggle-button" onClick={handleToggleSidebar}>Toggle Sidebar</button>
        </Sidebar>
    )
}

export default ResponsiveSidebar;