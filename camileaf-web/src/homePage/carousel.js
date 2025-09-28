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
                backgroundColor: "rgba(0,0,0,0.3)",
                px: 3,
                py: 1,
                borderRadius: 2,
                height:"500px",
                margin:"auto",
                padding:"120px 50px",
                textAlign:"center",
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
