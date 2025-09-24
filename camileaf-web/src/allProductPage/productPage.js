import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import BrowseProducts from './BrowseProducts';
import "./navBar.css"; 


function Products() {
  return (
    <>
      <Navbar className="products-navbar" />
      <BrowseProducts/>
      <Footer />
    </>
  );
}

export default Products;
