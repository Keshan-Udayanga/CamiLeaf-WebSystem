import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Button,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./assets/web-logo.png";
import { Link, useNavigate } from "react-router-dom";
import api from "./axiosConfig";

function Navbar({ className }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);

    if (token) {
      // Fetch current user profile
      api.get("/api/v1/user/me")
        .then(res => setUser(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoggedIn(false);
    setAnchorEl(null);
    navigate("/", { replace: true });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        className={className}
        sx={{
          backgroundColor: className
            ? undefined
            : scrolled
            ? "rgba(0,0,0,0.9)"
            : "transparent",
          transition: "background-color 0.3s ease",
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          {/* Left: Logo + Menu */}
          <Box sx={{ display: "flex", alignItems: "center", width: "75%" }}>
            <Box component="img" src={logo} alt="Logo" sx={{ height: 80, p: 1 }} />

            {!isMobile && (
              <Box component="ul" sx={{
                display: "flex",
                listStyle: "none",
                gap: 10,
                m: 0,
                px: 10,
                py: 2,
                border: "1px solid white",
                borderRadius: "50px",
                "& li a": { color: "#fff", textDecoration: "none", fontWeight: "500", "&:hover": { color: "#d5a924" } }
              }}>
                {navLinks.map((link) => (
                  <li key={link.name}><a href={link.path}>{link.name}</a></li>
                ))}
              </Box>
            )}

            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Right: Profile / Login */}
          <Box sx={{ display: "flex", alignItems: "center", mt: isMobile ? 1 : 0 }}>
            {loggedIn ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar>{user.firstName ? user.firstName.charAt(0) : "U"}</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                sx={{
                  backgroundColor: "#1c3c1e",
                  color: "white",
                  borderRadius: "20px",
                  padding: "6px 20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#2e4e30" },
                }}
              >
                <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                  Login
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          {navLinks.map((link) => (
            <ListItem button key={link.name} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
