import React from "react";
import { Box, Typography } from "@mui/material";
import teaPro1 from "../assets/teaPro1.jpg";
import teaPro2 from "../assets/teaPro2.jpg";

function AboutTeaFactory() {
  return (
    <Box id="home_about"
      sx={{
        position: "relative",
        width: "100%",
        py: 6,
        overflow: "hidden",
      }}
    >
      {/* Blurred Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",   // 👈 blur effect
          transform: "scale(1.1)", // to cover edges after blur
          zIndex: 0,
        }}
      />

      {/* Foreground Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          width: "90%",
          margin: "auto",
        }}
      >
        {/* Left Image */}
        <Box
          component="img"
          src={teaPro1}
          width={"80%"}
          alt="Tea Factory"
          sx={{
            width: { xs: "100%", md: "20%" },
            borderRadius: "16px",
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />

        {/* Middle Text */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: "#2aae18ff",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            About Our Tea Factory
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              backgroundColor:"#fff",
              lineHeight: 1.8,
              fontFamily: "Poppins, sans-serif",
              color: "#000000ff", // white for contrast
            }}
          >
            Our tea factory is committed to crafting the finest quality teas, 
            carefully handpicked from lush, green plantations. 
            We honor traditional methods while embracing modern techniques,
            ensuring every leaf retains its natural flavor and aroma. 
            Our expert tea masters oversee each step of production—from plucking and 
            withering to rolling and fermentation—guaranteeing consistent excellence.
            We offer a diverse range of teas, including classic green and black teas,
            delicate herbal blends, and unique specialty infusions. <br></br><br></br>
            Every cup reflects our dedication to quality, sustainability, 
            and the rich heritage of tea cultivation. At our factory, passion meets precision, 
            bringing tea lovers around the world a truly memorable and satisfying experience in every sip.
          </Typography>
        </Box>

        {/* Right Image */}
        <Box
          component="img"
          src={teaPro2}
          alt="Tea Production"
          sx={{
            width: { xs: "100%", md: "20%" },
            borderRadius: "16px",
            objectFit: "cover",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />
      </Box>
    </Box>
  );
}

export default AboutTeaFactory;
