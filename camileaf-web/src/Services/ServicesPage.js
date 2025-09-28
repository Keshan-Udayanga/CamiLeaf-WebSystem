import React, { useEffect } from "react";
import "./ServicesPage.css";

// ✅ Import images from assets
import teaCollection from "./assets/tea-collection.jpeg";
import billing from "./assets/billing.jpeg";
import orders from "./assets/orders.jpeg";
import cashDelivery from "./assets/cash-delivery.jpeg";

const services = [
  {
    id: 1,
    title: "Tea Leaf Collection & Grading",
    desc: "Suppliers can submit tea leaves to the factory. Each batch is carefully graded to maintain high quality standards.",
    icon: "🌱",
    image: teaCollection,
  },
  {
    id: 2,
    title: "Monthly Billing & Earnings Reports",
    desc: "Transparent monthly billing system with detailed earnings reports. Fertilizer and other expenses are automatically deducted.",
    icon: "💲",
    image: billing,
  },
  {
    id: 3,
    title: "Tea Orders for Buyers",
    desc: "Buyers can browse premium tea products and place online orders with ease through our digital platform.",
    icon: "🛒",
    image: orders,
  },
  {
    id: 4,
    title: "Cash on Delivery Facilities",
    desc: "Convenient cash-on-delivery payment option available for customers purchasing tea online.",
    icon: "🎁",
    image: cashDelivery,
  },
];

function ServicesPage() {
  // 👇 Scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll(".service-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Modern tea factory solutions for suppliers and buyers</p>
          <div className="scroll-indicator">
            <span>Scroll down</span>
            <div className="arrow"></div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Services List */}
      <div className="services-container">
        {services.map((service, index) => (
          <section
            key={service.id}
            className={`service-section ${index % 2 === 0 ? "" : "reverse"}`}
          >
            <div className="service-image">
              <img src={service.image} alt={service.title} />
              <div className="image-overlay"></div>
            </div>
            <div className="service-content">
              <div className="service-icon">{service.icon}</div>
              <h2>{service.title}</h2>
              <p>{service.desc}</p>
              <button className="service-cta">Learn More</button>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="cta-content">
          <h2>Ready to Partner with Us?</h2>
          <p>
            Join our growing network of suppliers and buyers in the tea industry.
          </p>
          <div className="cta-buttons">
            <button className="cta-secondary">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
