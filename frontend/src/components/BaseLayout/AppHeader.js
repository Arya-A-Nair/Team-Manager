import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
  Modal,
  TextField,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { AuthContext } from "../../contexts/AuthContextsPovider";
import useRequestAuth from "../../hooks/useRequestAuth";

const drawerWidth = 240;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function AppHeader({ mobileOpen, setMobileOpen }) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { logout, logoutPending } = useRequestAuth();

  const handleLogout = () => {
    logout();
  };
  const { user } = React.useContext(AuthContext);

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const modal = (
    <Modal open={modalIsOpen} onClose={handleCloseModal}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 3,
          }}
        >
          Profile
        </Typography>
        <TextField
          id="username"
          variant="outlined"
          label="username"
          value={user ? user.username : ""}
          disabled
          sx={{
            mb: 3,
            width: "100%",
          }}
        ></TextField>
        <TextField
          id="email"
          variant="outlined"
          label="email"
          value={user ? user.email : ""}
          disabled
          sx={{
            mb: 3,
            width: "100%",
          }}
        ></TextField>
      </Box>
    </Modal>
  );

  const authLinks = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        size="large"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenModal}>Profile</MenuItem>
        <MenuItem disabled={logoutPending} onClick={handleLogout}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {logoutPending === true ? (
              <CircularProgress
                size={20}
                sx={{
                  mr: 2,
                }}
              />
            ) : null}
          </Box>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      xs={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Collab
        </Typography>
        {authLinks}
      </Toolbar>
      {modal}
    </AppBar>
  );
}

AppHeader.propTypes = {
  mobileOpen: PropTypes.bool,
  setMobileOpen: PropTypes.func.isRequired,
};

export default AppHeader;
