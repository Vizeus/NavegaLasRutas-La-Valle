import { useState } from "react";
import { CarritoContext } from "../contexts/CarritoContext";

export const CarritoProvider = ({ children }) => {
    // Creamos el estado para el carrito, el monto total y la cantidad total
    const [carrito, setCarrito] = useState([]);
    const [montoTotal, setMontoTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);

    console.log(carrito)

    const agregarAlCarrito = (item, cantidad) => {

        // Verificamos si el item que queremos agregar, ya está en el carrito
        const productoExistente = carrito.find(producto => producto.item.id === item.id);

        if(!productoExistente) 
            { // Si el item no esta en el carrito...
            setCarrito (previo => [...previo, {item, cantidad}]); // Agregamos el item al array "carrito" (que esta compuesto por objetos con pares item-cantidad)
            setCantidadTotal(previo => previo + cantidad); // Aumentamos la cantidad total
            setMontoTotal(previo => previo + (item.precio * cantidad)); // Aumentamos el monto total
        } 
        else // Si el item ya está en el carrito...    
        {        
            const carritoActualizado = carrito.map(producto => { // Recorremos el carrito
                if (producto.item.id === item.id) { 
                    return { // Retornamos un nuevo objeto con la cantidad del producto actualizada
                        ...producto, 
                        cantidad: producto.cantidad + cantidad // Aumentamos la cantidad (suamamos la cantidad anterior del producto con la nueva)
                    };
                }
                return producto;
            });
            setCarrito(carritoActualizado); // Actualizamos el carrito con el nuevo item
            setCantidadTotal(previo => previo + cantidad); // Aumentamos la cantidad total
            setMontoTotal(previo => previo + (item.precio * cantidad)); // Aumentamos el monto total
        }
    }

    const eliminarDelCarrito = (id) => {
        const productoEliminado = carrito.find(producto => producto.item.id === id); // Buscamos el item que queremos eliminar
        const carritoActualizado = carrito.filter(producto => producto.item.id !== id); // Filtramos el carrito para eliminar el item con el id que se pasa por parametro
    
        setCarrito(carritoActualizado); // Actualizamos el carrito
        setCantidadTotal(previo => previo - productoEliminado.cantidad); // Restamos la cantidad total
        setMontoTotal(previo => previo - (productoEliminado.item.precio * productoEliminado.cantidad)); // Restamos el monto total
    }

    const vaciarCarrito = () => {
        setCarrito([]); // Vaciamos el carrito
        setCantidadTotal(0); // Reiniciamos la cantidad total
        setMontoTotal(0); // Reiniciamos el monto total
    }   

    // Retornamos el provider con el valor del carrito, monto total y cantidad total
    return (
        <CarritoContext.Provider value={{ carrito, cantidadTotal, montoTotal, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}