import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import CartWidget from '../CartWidget/CartWidget';
import { ProductosContext } from '../../core/contexts/ProductosContext';

const Navbar = () => {
  const { setCategoria } = useContext(ProductosContext);

  const handleInicioClick = () => {
    setCategoria && setCategoria('');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" onClick={handleInicioClick}>Inicio</Link>
        </li>
        <li className="navbar-item">
          <Link to="/" onClick={handleInicioClick}>Productos</Link>
        </li>
        <li className="navbar-item"><Link to="/contacto">Contacto</Link></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default Navbar;