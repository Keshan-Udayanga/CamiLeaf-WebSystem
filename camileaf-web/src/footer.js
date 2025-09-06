import React from "react";
import { Box, Typography, Link, IconButton, Grid } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        color: "#fff",
        py: 6,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid container spacing={4}>
        {/* 1st Part */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Our Factory</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            We are a leading manufacturer of high-quality textile products with over 20 years of experience.
          </Typography>
          <Box>
            <IconButton href="#" sx={{ color: "#fff" }}><Facebook /></IconButton>
            <IconButton href="#" sx={{ color: "#fff" }}><Twitter /></IconButton>
            <IconButton href="#" sx={{ color: "#fff" }}><Instagram /></IconButton>
            <IconButton href="#" sx={{ color: "#fff" }}><LinkedIn /></IconButton>
          </Box>
        </Grid>

        {/* 2nd Part */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Pages</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="/" underline="hover" color="inherit">Home</Link>
            <Link href="/#about" underline="hover" color="inherit">About</Link>
            <Link href="/services" underline="hover" color="inherit">Services</Link>
            <Link href="/contact" underline="hover" color="inherit">Contact</Link>
          </Box>
        </Grid>

        {/* 3rd Part */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Our Factory Locations</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography>Colombo</Typography>
            <Typography>Kandy</Typography>
            <Typography>Galle</Typography>
          </Box>
        </Grid>

        {/* 4th Part */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Contact Us</Typography>
          <Typography>123, Main Street, Colombo, Sri Lanka</Typography>
          <Typography>+94 11 234 5678</Typography>
          <Typography>info@ourfactory.com</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
