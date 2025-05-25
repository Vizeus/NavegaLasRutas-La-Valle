import "./CartWidget.css"
import { useContext, useEffect, useRef } from "react";
import { CarritoContext } from "../../core/contexts/CarritoContext";
import { Link } from "react-router-dom";


const CartWidget = () => {
  const { cantidadTotal } = useContext(CarritoContext);
  const cantidadRef = useRef();

  useEffect(() => {
    if (cantidadTotal > 0 && cantidadRef.current) {
      cantidadRef.current.classList.remove("bump");
      // Forzar reflow para reiniciar la animación
      void cantidadRef.current.offsetWidth;
      cantidadRef.current.classList.add("bump");
    }
  }, [cantidadTotal]);

  const imgCarrito = "../../../public/images/carrito.png";
    
  return (
    <div>
      <Link to="/carrito">
        <div className="carrito-container">
          <img className="imgCarrito" src={imgCarrito} alt="Imagen de un carrito" />
          {cantidadTotal > 0 && (
            <span ref={cantidadRef} className="cantidadCarrito">{cantidadTotal}</span>
          )}
        </div>
      </Link>
    </div>
  )
}

export default CartWidget
