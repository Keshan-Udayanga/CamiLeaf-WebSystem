import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';
import Navbar from "./navbar";
import Carousel from "./homePage/carousel";
import ProductsCarousel from "./homePage/homePage";
import AboutTeaFactory from "./homePage/home_aboutUs";
import Footer from "./footer";
import TeaTimeline from "./homePage/teaTimeLine";
import AdminPanel from "./UserManagement/components/AdminLayer";


function App() {
  return (
    <Router>
      <div style={{ overflowX: "hidden" }}>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Carousel />
              <AboutTeaFactory />
              <ProductsCarousel />
              <TeaTimeline />
              <Footer />
            </>
          } />

          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
