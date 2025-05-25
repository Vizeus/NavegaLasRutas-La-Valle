import "./CartWidget.css"
import { useContext } from "react";
import { CarritoContext } from "../../core/contexts/CarritoContext";
import { Link } from "react-router-dom";


const CartWidget = () => {
  const { cantidadTotal } = useContext(CarritoContext);

  const imgCarrito = "../../../public/images/carrito.png";
    
  return (
    <div>
      <Link to="/carrito">
        <div className="carrito-container">
          <img className="imgCarrito" src={imgCarrito} alt="Imagen de un carrito" />
          {cantidadTotal > 0 && (
            <span className="cantidadCarrito">{cantidadTotal}</span>
          )}
        </div>
      </Link>
    </div>
  )
}

export default CartWidget
