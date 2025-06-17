import { useContext } from "react";
import { CarritoContext } from "../../core/contexts/CarritoContext";
import { Link } from "react-router-dom";
import CarritoItem from "../CarritoItem/CarritoItem";
import { toast } from 'react-toastify';
import './Carrito.css';

const Carrito = () => {

    const { carrito, vaciarCarrito, montoTotal, cantidadTotal } = useContext(CarritoContext);

    if (cantidadTotal === 0) {
        return (
            <div className="carrito-centrado">
                <h2>No hay productos en el carrito</h2>
                <Link to="/">Volver a la tienda</Link>
            </div>
        )
    }



  return (
    <>
    <meta name="robots" content="noindex" />
    <div>
        {
        carrito.map(producto => <CarritoItem key={producto.item.id} {...producto}/>) 
        }
        <h3>Total: ${montoTotal}</h3>
        <h3>Cantidad total: {cantidadTotal}</h3>
        <div className="carrito-botones">
            <button 
                onClick={() => {
                    vaciarCarrito();
                    toast.error('Vaciaste el carrito');
                }} 
                className="boton-rojo"
            >
                Vaciar carrito
            </button>
            <Link to="/checkout">
                <button className="boton-gradiente">
                    Finalizar compra
                </button>
            </Link>
        </div>
    </div>
    </>
  )
}

export default Carrito