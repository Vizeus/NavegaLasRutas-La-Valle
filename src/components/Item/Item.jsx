import { Link } from "react-router-dom";
import './Item.css';

const Item = ({id, nombre, precio, descripcion, imagen}) => {
  return (
    <Link to={`/productos/${id}`} className="item-link" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="item-card item-card-lindo">
        <h2 className="item-nombre">{nombre}</h2>
        <h3 className="item-precio">Precio: <span>${precio}</span></h3>
        <img src={imagen} alt={nombre} className="item-img item-img-linda" />
        <p className="item-descripcion">{descripcion}</p>
        <div className="item-botonera">
          <button className="botoncito">Ver detalles</button>
        </div>
      </div>
    </Link>
  )
}

export default Item