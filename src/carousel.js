import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import bgImg from "./assets/slider.jpg";

const textSlides = [
  "Welcome to Our Company",
  "We Provide the Best Services",
  "Your Success is Our Mission",
];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <Box sx={{ maxWidth: "100%", overflowX: "hidden", position: "relative" }}>
      {/* Background Image */}
      <Box
        sx={{
          height: "800px",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
      }}
      ></Box>

      {/* Text Carousel Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          textAlign: "center",
          width: "80%",
        }}
      >
        <Slider {...settings}>
          {textSlides.map((text, index) => (
            <Typography
              key={index}
              variant="h3"
              sx={{
                backgroundColor: "rgba(0,0,0,0.5)",
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              {text}
            </Typography>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Carousel;
