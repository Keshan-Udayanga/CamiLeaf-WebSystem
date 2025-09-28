import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./navbar";
import Carousel from "./HomePage/carousel";
import ProductsCarousel from "./HomePage/homePage";
import AboutTeaFactory from "./HomePage/home_aboutUs";
import Footer from "./footer";
import TeaTimeline from "./HomePage/teaTimeLine";
import AllProduct from "./AllProductPage/productPage";  
import AdminPanel from "./UserManagement/components/AdminLayer"
import LoginPage from './UserManagement/components/LoginPage';
import CustomerSignUp from './UserManagement/components/CustomerSignUp';
import CartPage from './AllProductPage/CartPage';
import PaymentWizard from './AllProductPage/PaymentWizard';
import AboutUs from './AboutUs/AboutUs';
import ContactUs from './ContactUs/ContactUsPage';
import Services from './Services/Services';
import ProtectedRoute from './ProtectedRoute';

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
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />

          <Route 
            path="/admin/*" 
            element={
            <ProtectedRoute allowedRoles={["ADMIN", "RESOURCE MANAGER", "LEAF CLERK"]}>
            <AdminPanel />
            </ProtectedRoute>
            } 
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CustomerSignUp />} />
          <Route path="/cart" element={<CartPage />} />
          <Route 
            path="/payment" 
            element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <PaymentWizard />
            </ProtectedRoute>
            } 
          />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
