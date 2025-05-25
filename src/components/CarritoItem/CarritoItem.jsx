import { useContext } from "react";
import { toast } from 'react-toastify';
import { CarritoContext } from "../../core/contexts/CarritoContext";

export const CarritoItem = ({ item, cantidad }) => {

    const { eliminarDelCarrito } = useContext(CarritoContext);

    return (
        <div className="carrito-item-card">
            {item.imagen && (
                <img className="mini-img" src={item.imagen} alt={item.nombre} />
            )}
            <div className="carrito-item-info">
                <h4>{item.nombre}</h4>
                <p>Cantidad: {cantidad}</p>
                <p>Precio: ${item.precio}</p>
            </div>
            {/* Boton para eliminar el producto */}
            <button className="btn-eliminar" onClick={() => {
                eliminarDelCarrito(item.id);
                toast.error(`Eliminaste ${item.nombre} del carrito`);
            }}>Eliminar</button>
        </div>
    )
}

export default CarritoItem