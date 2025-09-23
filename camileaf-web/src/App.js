import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Carousel from "./HomePage/carousel";
import ProductsCarousel from "./HomePage/homePage";
import AboutTeaFactory from "./HomePage/home_aboutUs";
import Footer from "./footer";
import TeaTimeline from "./HomePage/teaTimeLine";
import AllProduct from "./AllProductPage/productPage";  //  import products page
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

          {/* products → AllProduct.js */}
          <Route path="/products" element={<AllProduct />} />

          {/* Other routes */}
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
