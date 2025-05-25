import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-title">Supermercado La Valle</span>
        <span className="footer-copy">&copy; {new Date().getFullYear()} Todos los derechos reservados</span>
        <span className="footer-links">
          <a href="https://www.instagram.com/" target="_blank">Instagram</a> |
          <a href="https://www.facebook.com/" target="_blank">Facebook</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
