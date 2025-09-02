import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import teaPro1 from "../assets/teaPro1.jpg";
import teaPro2 from "../assets/teaPro2.jpg";
// ...etc


// Dummy product data
const products = [
  { id: 1, name: "Green Tea", img: teaPro1 },
  { id: 2, name: "Black Tea", img: teaPro2 },
  { id: 3, name: "Herbal Tea", img: teaPro1 },
  { id: 4, name: "White Tea", img: teaPro2 },
  { id: 5, name: "Oolong Tea", img: teaPro1 },
  { id: 6, name: "Matcha", img: teaPro2 },
  { id: 7, name: "Iced Tea", img: teaPro1 },
  { id: 8, name: "Masala Chai", img: teaPro2 },
];

function ProductsCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,      // 4 products visible at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", py: 5, height: "400px", backgroundColor: "#c795278b" ,borderRadius:"25px"}}>
        {/* Heading */}
    <Typography
      variant="h3"
      sx={{
        color:"#168008ff",
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Poppins, sans-serif",
        mb: 8,  
      }}
    >
      Our Products
    </Typography>
      <Slider {...settings}>
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: "flex",
              flexDirection: "column",   // stack vertically
              alignItems: "center",      // center horizontally
              justifyContent: "center",  // center vertically in slide
              height: "100%",
              px: 2,
            }}
          >
            {/* Circle Image */}
            <Box 
              component="img"
              src={product.img}
              alt={product.name}
              sx={{
                width: { xs: "100px", md: "180px" },
                height: { xs: "100px", md: "180px" },
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                mb: 2,
              }}
            />
            {/* Product Name */}
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                textAlign: "center",
              }}
            >
              {product.name}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default ProductsCarousel;
