import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, TextField } from "@mui/material";
import logo from "./assets/logo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      enableColorOnDark
      sx={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.9)" : "transparent",
        transition: "background-color 0.3s ease",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left - Logo */}
        <Box component="img" src={logo} alt="Company Logo" sx={{ height: 80, width: "auto" }} />

        {/* Center - Nav Links */}
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
          <li><a href="/">Home</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </Box>

        {/* Right - Search */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          sx={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            width: "200px",
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
