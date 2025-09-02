import './App.css';
import Navbar from "./navbar";
import Carousel from "./carousel";
import ProductsCarousel from "./homePage/homePage";
import AboutTeaFactory from "./homePage/home_aboutUs";
import Footer from "./footer";
import TeaTimeline from "./homePage/teaTimeLine";


function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <Carousel />
      <AboutTeaFactory />
      <ProductsCarousel />
      <TeaTimeline/>
      <Footer />
    </div>
  );
}

export default App;
