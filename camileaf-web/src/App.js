import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./navbar";
import Carousel from "./HomePage/carousel";
import ProductsCarousel from "./HomePage/homePage";
import AboutTeaFactory from "./HomePage/home_aboutUs";
import Footer from "./footer";
import TeaTimeline from "./HomePage/teaTimeLine";
import AllProduct from "./AllProductPage/ProductPage";
import ContactUs from "./ContactUs/ContactUsPage"; 
import AdminPanel from "./UserManagement/components/AdminLayer";
import CartPage from "./AllProductPage/CartPage";  // 🟢 import at the top


function App() {
  return (
    <Router>
      <div style={{ overflowX: "hidden" }}>

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Carousel />
                <AboutTeaFactory />
                <ProductsCarousel />
                <TeaTimeline />
                <Footer />
              </>
            }
          />

          {/* Products Page */}
          <Route path="/products" element={<AllProduct />} />

          {/* About Page */}
          <Route path="/about" element={<h1>About Page</h1>} />

          {/* Contact Page */}
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin Panel */}
          <Route path="/admin/*" element={<AdminPanel />} />
                  <Route path="/cart" element={<CartPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
