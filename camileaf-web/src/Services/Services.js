import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import ServicesPage from "./ServicesPage";
import "./navBar.css"; 


function Products() {
  return (
    <>
      <Navbar className="products-navbar" />
      {/* <CartPage/> */}
      <ServicesPage/>
      <Footer />
    </>
  );
}

export default Products;
