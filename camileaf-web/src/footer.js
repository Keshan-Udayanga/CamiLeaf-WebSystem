import React from "react";
import "./Footer.css";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 1st Column: About */}
        <div className="footer-section">
          <h2 className="footer-title">CamiLeaf Tea Factory</h2>
          <p className="footer-text">
            We produce premium Ceylon tea with over 20 years of expertise. Freshness and quality in every leaf.
          </p>
          <div className="footer-socials">
            <a href="#"><Facebook /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><LinkedIn /></a>
          </div>
        </div>

        {/* 2nd Column: Quick Links */}
        <div className="footer-section">
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* 3rd Column: Locations */}
        <div className="footer-section">
          <h2 className="footer-title">Our Locations</h2>
          <ul className="footer-locations">
            <li>Colombo</li>
            <li>Kandy</li>
            <li>Galle</li>
            <li>Matale</li>
          </ul>
        </div>

        {/* 4th Column: Contact + Newsletter */}
        <div className="footer-section">
          <h2 className="footer-title">Contact & Newsletter</h2>
          <p>123, Main Street, Colombo, Sri Lanka</p>
          <p>+94 11 234 5678</p>
          <p>info@camileaf.com</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CamiLeaf Tea Factory. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
