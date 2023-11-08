import React from 'react';
import "/src/UI_components/Footers.css"

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-links">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
      <div className="contact-us">
        <p>Contact Us: support@example.com</p>
      </div>
    </footer>
  );
};

export default Footer;
