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
import CartPage from './AllProductPage/CartPage';
import PaymentWizard from './AllProductPage/PaymentWizard';

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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentWizard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
