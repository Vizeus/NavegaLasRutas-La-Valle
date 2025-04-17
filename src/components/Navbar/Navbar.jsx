import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import CartWidget from '../CartWidget/CartWidget';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Inicio</Link></li>
        <li className="navbar-item"><Link to="/">Productos</Link></li>
        <li className="navbar-item"><Link to="/contacto">Contacto</Link></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default Navbar;