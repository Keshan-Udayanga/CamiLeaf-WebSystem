import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import AboutUs from "./AboutUsPage";
import "./navBar.css"; 


function Products() {
  return (
    <>
      <Navbar className="products-navbar" />
      {/* <CartPage/> */}
      <AboutUs/>
      <Footer />
    </>
  );
}

export default Products;
