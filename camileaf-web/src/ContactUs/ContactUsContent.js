import React from "react";
import ContactForm from "./ContactUsForm";
import "./ContactUsCss.css";

function ContactUsContent() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="hero-inner">
          <h1>Get in touch with CamiLeaf</h1>
          <p>
            We’d love to hear from you — whether it’s about our teas, orders,
            wholesale enquiries or factory tours. Drop a message and we’ll get
            back within 1–2 business days.
          </p>
        </div>
      </section>

      <section className="contact-grid">
        <div className="contact-card">
          <h3>Visit Us</h3>
          <p>CamiLeaf Tea Factory</p>
          <p>123 Tea Road, Nuwara Eliya, Sri Lanka</p>
          <p>Mon — Fri: 9:00 AM — 5:00 PM</p>
        </div>

        <div className="contact-card">
          <h3>Call</h3>
          <p>+94 7X XXX XXXX</p>
          <p>Mon — Fri: 9:00 AM — 5:00 PM</p>
          <a className="btn-ghost" href="tel:+947XXXXX">Call now</a>
        </div>

        <div className="contact-card">
          <h3>Email</h3>
          <p>support@camileaf.example</p>
          <a className="btn-ghost" href="mailto:support@camileaf.example">Send email</a>
        </div>

        <div className="contact-card map-card">
          <h3>Find us on map</h3>
          {/* Replace the src with your real Google Maps embed link if you have one */}
          <div className="map-placeholder" aria-hidden>
            <iframe
              title="CamiLeaf location"
              src="https://www.google.com/maps?q=Nuwara+Eliya&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-panel">
          <h2>Send us a message</h2>
          <p className="muted">
            Use the form and we’ll respond to the email you provide.
          </p>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}


export default ContactUsContent;