import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./navbar";
import Carousel from "./homePage/carousel";
import ProductsCarousel from "./homePage/homePage";
import AboutTeaFactory from "./homePage/home_aboutUs";
import Footer from "./footer";
import TeaTimeline from "./homePage/teaTimeLine";
import AllProduct from "./allProductPage/productPage";  //  import products page
import AdminPanel from "./UserManagement/components/AdminLayer"
import LoginPage from './UserManagement/components/LoginPage';
import CustomerSignUp from './UserManagement/components/CustomerSignUp';

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
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CustomerSignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
