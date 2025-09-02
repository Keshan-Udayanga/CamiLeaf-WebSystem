import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import bgImage from "../assets/manufacHomeBg.jpg";

// Tea process steps
const steps = [
  {
    title: "PLUCKING",
    description:
      "The green leaf is harvested on a regular basis at intervals ranging from 5 days to 8 days from each field.",
  },
  {
    title: "WITHERING",
    description:
      "No sooner it is received at the estate, the leaf is weighed and spread on troughs.",
  },
  {
    title: "DRYING",
    description:
      "The primary objective of drying is the extraction of moisture and the arresting of fermentation. The fermented leaf contains from 45% to 50% moisture.",
  },
  {
    title: "ROLLING",
    description:
      "Is the process by which the leaf is twisted and the leaf cell walls ruptured to bring the juices to the surface of the leaf.",
  },
  {
    title: "FERMENTATION",
    description:
      "Of the tea juices is an essential process in the manufacture of black tea.",
  },
  {
    title: "GRADING (SIFTING)",
    description:
      "The fired teas after cooling are graded/sifted according to size and shape, as the trade demands.",
  },
];

function TeaTimeline() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        py: 10,
        px: { xs: 2, md: 10 },
      }}
    >
      {/* Background image blurred */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />

      <Typography
        variant="h3"
        sx={{
          color: "#fff",
          textAlign: "center",
          mb: 6,
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
        }}
      >
        Tea Manufacturing Process
      </Typography>

      <Box sx={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
        {/* Vertical Line */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "4px",
            bgcolor: "#d5a924",
            transform: "translateX(-50%)",
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: index % 2 === 0 ? "flex-start" : "flex-end" },
              mb: 6,
              position: "relative",
            }}
          >
            <Paper
              elevation={5}
              sx={{
                width: { xs: "100%", md: "45%" }, 
                p: 3,
                backgroundColor: "rgba(255,255,255,0.85)",
                borderRadius: 2,
                position: "relative",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "20px",
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: index % 2 === 0 ? "10px 10px 10px 0" : "10px 0 10px 10px",
                  borderColor:
                    index % 2 === 0
                      ? "transparent #fff transparent transparent"
                      : "transparent transparent transparent #fff",
                  left: { xs: "0", md: index % 2 === 0 ? "100%" : undefined },
                  right: { xs: "0", md: index % 2 !== 0 ? "100%" : undefined },
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {step.title}
              </Typography>
              <Typography variant="body2">{step.description}</Typography>
            </Paper>

            {/* Circle on the line */}
            <Box
              sx={{
                position: "absolute",
                top: "25px",
                left: "50%",
                width: "20px",
                height: "20px",
                bgcolor: "#d5a924",
                borderRadius: "50%",
                transform: "translateX(-50%)",
                border: "3px solid #fff",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default TeaTimeline;
