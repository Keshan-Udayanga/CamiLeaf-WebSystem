import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import bgImg from "../assets/slider.jpg";

const textSlides = [
  "Experience the finest Ceylon tea, carefully hand-picked and crafted to deliver unmatched flavor and freshness every time.",
  "From our lush tea gardens to your cup, CamiLeaf brings premium quality, tradition, and sustainability together.",
  "Discover a journey of taste and aroma with our ethically sourced, expertly graded Ceylon tea for tea enthusiasts.",
  "Join our tea lovers community and enjoy premium teas crafted with care, passion, and over 20 years of expertise.",
  "Savor the essence of Ceylon in every sip, a perfect blend of freshness, quality, and heritage delivered to you."
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
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Background Image */}
      <Box
        sx={{
          height: { xs: "400px", sm: "600px", md: "800px" }, // responsive height
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Text Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          textAlign: "center",
          width: { xs: "90%", sm: "80%", md: "70%" },
        }}
      >
        <Slider {...settings}>
          {textSlides.map((text, index) => (
            <Box key={index}>
              <Typography
                variant="h5"
                sx={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  px: { xs: 2, sm: 3, md: 5 },
                  py: { xs: 2, sm: 3, md: 5 },
                  borderRadius: 2,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Carousel;
