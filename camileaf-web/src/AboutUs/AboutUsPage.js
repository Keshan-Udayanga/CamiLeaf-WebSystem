// File: AboutUs.js
import React from "react";
import "./AboutUs.css";
import TeaHero from "../assets/tea_hero.jpeg";

// process images
import Process01 from "../assets/process01.jpeg";
import Process02 from "../assets/process02.jpeg";
import Process03 from "../assets/process03.jpeg";
import Process04 from "../assets/process04.jpeg";
import Process05 from "../assets/process05.jpeg";
import Process06 from "../assets/process06.jpeg";
import Process07 from "../assets/process07.jpeg";

// team images
import Team1 from "../assets/team1.png";
import Team2 from "../assets/team2.png";
import Team3 from "../assets/team3.png";
import Team4 from "../assets/team4.png";
import Team5 from "../assets/team5.png";

import { FaLeaf, FaHeart, FaEye, FaCogs, FaUsers, FaArrowRight } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="about-page">
      {/* Hero Section */}
      <div
        className="about-hero"
        style={{ backgroundImage: `url(${TeaHero})` }}
      >
        <div className="overlay" />
        <div className="about-hero-inner">
          <h1 className="title">About Cami Leaf</h1>
          <p className="subtitle">Where every leaf tells a story — fresh tea, naturally</p>
          <div className="scroll-indicator">
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Company Values Section */}
        <div className="values-grid">
          <article className="value-card">
            <div className="card-icon"><FaLeaf /></div>
            <h2>Our Story</h2>
            <p>
              Cami Leaf started with a simple idea: produce high-quality tea while caring for people and the land.
              Nestled in the green hills, our tea is handpicked with care and guided by generations of knowledge.
              Our Tea Factory System tracks every leaf from harvest to packaging, ensuring fresh, high-quality tea in every cup.
              Tradition meets innovation — tea made with love, delivered with care.
            </p>
          </article>

          <article className="value-card">
            <div className="card-icon"><FaHeart /></div>
            <h2>Our Mission</h2>
            <p>
              To deliver high-quality, fresh tea by combining traditional hand-picked methods with modern
              tracking and processing systems, ensuring sustainability, transparency, and excellence in every cup.
            </p>
          </article>

          <article className="value-card">
            <div className="card-icon"><FaEye /></div>
            <h2>Our Vision</h2>
            <p>
              To be a leading tea provider recognized for innovation, quality, and sustainable practices,
              connecting people to the rich heritage of tea while embracing technology for a better future.
            </p>
          </article>

          <article className="value-card">
            <div className="card-icon"><FaCogs /></div>
            <h2>Our Process</h2>
            <ol>
              <li><strong>Harvest:</strong> Hand-picked leaves at optimal maturity.</li>
              <li><strong>Intake:</strong> Fresh leaves weighed and logged at the intake.</li>
              <li><strong>Grading:</strong> Leaves are inspected and sorted by quality.</li>
              <li><strong>Drying:</strong> Careful drying preserve flavor.</li>
              <li><strong>Production:</strong> Expert processing of tea leaves.</li>
              <li><strong>Categorization:</strong> Sorting into quality grades.</li>
              <li><strong>Packing:</strong>Sealed to lock in freshness.</li>

            </ol>
          </article>
        </div>

        {/* Team Section */}
        <article className="card team-card">
          <div className="section-header">
            <div className="card-icon"><FaUsers /></div>
            <h2>Meet the Team</h2>
            <p className="section-subtitle">The passionate people behind Cami Leaf's excellence</p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="avatar"><img src={Team1} alt="D.M. Dissanayake" loading="lazy" /></div>
              <p className="name">D.M. Dissanayake</p>
              <p className="role">Leaf Clerk</p>
            </div>

            <div className="team-member">
              <div className="avatar"><img src={Team2} alt="M. Shehan" loading="lazy" /></div>
              <p className="name">M. Shehan</p>
              <p className="role">User Manager</p>
            </div>

            <div className="team-member">
              <div className="avatar"><img src={Team3} alt="I.M.K. Udayanga" loading="lazy" /></div>
              <p className="name">I.M.K. Udayanga</p>
              <p className="role">Product Manager</p>
            </div>

            <div className="team-member">
              <div className="avatar"><img src={Team4} alt="K.N. Dilhara" loading="lazy" /></div>
              <p className="name">K.N. Dilhara</p>
              <p className="role">Order Manager</p>
            </div>

            <div className="team-member">
              <div className="avatar"><img src={Team5} alt="L.P. Dissanayake" loading="lazy" /></div>
              <p className="name">L.P. Dissanayake</p>
              <p className="role">Resource Manager</p>
            </div>
          </div>
        </article>

        {/* Process Gallery Section */}
        <article className="card process-cards">
          <div className="section-header">
            <div className="card-icon"><FaCogs /></div>
            <h2>Our Tea Journey</h2>
            <p className="section-subtitle">
              From leaf to cup - witness the careful process that brings you the finest tea
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-image-container">
                <img src={Process01} alt="Tea Plucking" loading="lazy" />
                <div className="process-step">1</div>
              </div>
              <h3>Tea Plucking</h3>
              <p>Hand-picked leaves at optimal maturity</p>
            </div>

            <div className="process-card">
              <div className="process-image-container">
                <img src={Process02} alt="Factory Intake" loading="lazy" />
                <div className="process-step">2</div>
              </div>
              <h3>Factory Intake</h3>
              <p>Fresh leaves weighed and logged</p>
            </div>

            <div className="process-card">
              <div className="process-image-container">
                <img src={Process03} alt="Grading" loading="lazy" />
                <div className="process-step">3</div>
              </div>
              <h3>Grading</h3>
              <p>Leaves inspected and sorted by quality</p>
            </div>

            <div className="process-card">
              <div className="process-image-container">
                <img src={Process04} alt="Drying" loading="lazy" />
                <div className="process-step">4</div>
              </div>
              <h3>Drying</h3>
              <p>Careful drying to preserve flavor</p>
            </div>

            <div className="process-card">
              <div className="process-image-container">
                <img src={Process05} alt="Production" loading="lazy" />
                <div className="process-step">5</div>
              </div>
              <h3>Production</h3>
              <p>Expert processing of tea leaves</p>
            </div>

            <div className="process-card">
              <div className="process-image-container">
                <img src={Process06} alt="Categorization" loading="lazy" />
                <div className="process-step">6</div>
              </div>
              <h3>Categorization</h3>
              <p>Sorting into quality grades</p>
            </div>

            <div className="process-card">
              <div className="process-image-container">
                <img src={Process07} alt="Packing" loading="lazy" />
                <div className="process-step">7</div>
              </div>
              <h3>Packing</h3>
              <p>Sealed to lock in freshness</p>
            </div>
          </div>
        </article>

        <div className="callout">
          <div className="callout-content">
            <h3>Want to visit our factory?</h3>
            <p>Contact us to arrange a tour and taste our latest batches.</p>
          </div>
          <a className="btn" href="/contact">
            Contact Us <FaArrowRight className="btn-icon" />
          </a>
        </div>
      </div>

      <footer className="about-footer">
        <p>© {new Date().getFullYear()} Cami Leaf — All rights reserved.</p>
      </footer>
    </section>
  );
}