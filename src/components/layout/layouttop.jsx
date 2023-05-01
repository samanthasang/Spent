import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import walletfront_2 from "../../assets/Frame70.png";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./layout.styles.css";
import {
  MenuIcon,
  Wallet,
  Logout,
  Copy,
  Home,
  Dashboard,
  Faq,
} from "../../assets/Icons/JSXs/index";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Grid, IconButton } from "@mui/material";
import {
  CheckCircle,
  ContentCopy,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import { DisconnectBtn } from "../services/ConnectionChecker";
import { UserWalletAddress } from "../../redux/user_redux/userAction";
import LogoComponent from "../global/logo.component";
import { Typography } from "antd";

const LayoutTop = () => {
  const walletAddress = useSelector((state) => state.user.walletAddress);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [state, setState] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 1000);
  };
  const toggleDrawer = () => {
    setOpenDrawer(true);
  };
  const toggleDraweroff = () => {
    setOpenDrawer(false);
  };

  const handleLogout = async () => {
    // DisconnectBtn();
    // window.location.reload();
    // localStorage.clear();
    // disconnectWallet();
    dispatch(UserWalletAddress(""));
    navigate("/");
  };
  const handleCopyClick = () => {
    console.log(walletAddress);
    copyTextToClipboard(walletAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDraweroff}
      onKeyDown={toggleDraweroff}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            className="sidebar-item-style"
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <Home style={{ width: 25, paddingTop: 5 }} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            className="sidebar-item-style"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <ListItemIcon>
              <Dashboard style={{ width: 25, paddingTop: 5 }} />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            className="sidebar-item-style"
            onClick={() => {
              navigate("/faq");
            }}
          >
            <ListItemIcon>
              <Faq style={{ width: 25, paddingTop: 5 }} />
            </ListItemIcon>
            <ListItemText primary={"FAQ"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Grid className="side_nav ">
      <Grid
        style={{
          width: "100%",
          position: "absolute",
          top: "0",
          height: "3rem",
        }}
      >
        <>
          <Box
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "999",
              margin: "5px 0",
            }}
          >
            {walletAddress.length > 0 && (
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                  color: "black",
                  minWidth: "30px",
                  padding: "5px 15px",
                }}
              >
                <Wallet sx={{ width: 32, height: 32 }} />
              </IconButton>
            )}
            <Button
              type="primary"
              startIcon={<MenuIcon />}
              onClick={toggleDrawer}
              style={{ color: "black", minWidth: "30px", padding: "5px 0" }}
            ></Button>
          </Box>
          <Drawer anchor={"right"} open={openDrawer} onClose={toggleDraweroff}>
            <div className="m-child between  h-100">
              {list("right")}
              <div className="m-child p-2">
                <Typography
                  style={{ fontSize: 14, fontWeight: 700 }}
                  color="#212121"
                  gutterBottom
                  lineHeight={1.2}
                >
                  Powered by
                </Typography>

                <LogoComponent
                  styles={{ width: 150, style: { marginTop: 10 } }}
                  dark
                />
              </div>
            </div>
          </Drawer>
        </>

        <div className=" between ">
          <LogoComponent
            styles={{
              width: 160,
              style: {
                marginTop: 10,
                marginLeft: 10,
                position: "absolute",
                top: "5px",
                left: "5px",
                zIndex: "999999",
                cursor: "pointer",
              },
            }}
          />
          <Outlet />
        </div>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <img
            src={walletfront_2}
            alt="avatar"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "15px",
              marginRight: "3px",
              backgroundSize: "inherit",
            }}
          />{" "}
          {walletAddress.length > 0 ? (
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCopyClick}>
          <ListItemIcon>
            {isCopied ? (
              <CheckCircle color="green" fontSize="small" />
            ) : (
              <ContentCopy fontSize="small" />
            )}
          </ListItemIcon>
          <span>{isCopied ? "Copied!" : "Copy Address"}</span>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Disconnect
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default LayoutTop;
