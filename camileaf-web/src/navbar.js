import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./assets/logo.png";

function Navbar({ className }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
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
          {/* Left: Logo + Menu Icon / NavLinks */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "75%",
            }}
          >
            <Box component="img" src={logo} alt="Logo" sx={{ height: 60, width: "auto", p: 1 }} />
            
            {!isMobile && (
              <Box
                component="ul"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  listStyle: "none",
                  gap: 10,
                  m: 0,
                  px: 10,
                  py: 2,
                  border: "1px solid white",
                  borderRadius: "50px",
                  "& li a": {
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    textDecoration: "none",
                    color: "#fff",
                    "&:hover": { color: "#d5a924" },
                  },
                }}
              >
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.path}>{link.name}</a>
                  </li>
                ))}
              </Box>
            )}

            {isMobile && (
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Right: Search */}
          <Box sx={{ width: isMobile ? "100%" : "auto", mt: isMobile ? 1 : 0 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              fullWidth={isMobile}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                width: isMobile ? "100%" : 200,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                  "&:hover fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "none" },
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
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
