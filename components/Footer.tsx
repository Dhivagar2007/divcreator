import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          <div className="footer-about">
            <a href="#home" className="footer-logo">Div<span>Creator</span></a>
            <p>Innovative tech solutions for businesses and students. We combine creativity with technical expertise to deliver exceptional results.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Cybersecurity</a></li>
              <li><a href="#services">Student Projects</a></li>
              <li><a href="#">Consulting</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact Info</h4>
            <ul>
              <li><i className="fas fa-map-marker-alt" aria-hidden="true"></i> Mackkinaickenpatti (Post), Udumalai Road, Pollachi-642003, Coimbatore, Tamil Nadu</li>
              <li><i className="fas fa-envelope" aria-hidden="true"></i> divcreator31@gmail.com</li>
              <li><i className="fas fa-phone-alt" aria-hidden="true"></i> +91 7548835268</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Div Creator. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;