// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Public components
import './App.css';
import Navbar from "./navbar";
import Carousel from "./homePage/carousel";
import ProductsCarousel from "./homePage/homePage";
import AboutTeaFactory from "./homePage/home_aboutUs";
import Footer from "./footer";
import TeaTimeline from "./homePage/teaTimeLine";


import AdminLayout from './UserManagement/components/AdminLayout';


// Layout-aware component wrapper
function LayoutWrapper() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    );
  }

  // Public site layout
  return (
    <>
      <Navbar />
      <Carousel />
      <AboutTeaFactory />
      <ProductsCarousel />
      <TeaTimeline />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Router>
        <LayoutWrapper />
      </Router>
    </div>
  );
}

export default App;
