import { useState, useContext } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom'
import { CarritoContext } from '../../core/contexts/CarritoContext';
import './ItemDetail.css'

const ItemDetail = ({ id, nombre, precio, descripcion, imagen, stock, descripcionLarga }) => {
    const [agregarCantidad, setAgregarCantidad] = useState(0)
    const { agregarAlCarrito } = useContext(CarritoContext)

    // Creamos una funcion que maneja la cantidad:
    const manejadorCantidad= (cantidad) => {
        setAgregarCantidad(cantidad)
        console.log("Productos agregados:" + cantidad)
        const item = {
        id,
        nombre,
        precio,
        descripcion,
        imagen,
    }
        agregarAlCarrito(item, cantidad) // Aca llamamos a la funcion agregarAlCarrito que viene del contexto
        console.log("Producto agregado al carrito: " + item.nombre)
    }

    return (
        <div className="item-detail-card">
            <h2 className="item-detail-nombre">{nombre}</h2>
            <h3 className="item-detail-id">ID: {id}</h3>
            <h3 className="item-detail-precio">Precio: <span>${precio}</span></h3>
            {imagen ? (
                <img src={imagen} alt={nombre} className="item-detail-img" />
            ) : null}
            <p className="item-detail-descripcion">{descripcion}</p>
            {descripcionLarga && <p className="item-detail-larga">{descripcionLarga}</p>}
            {
            agregarCantidad > 0 ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center', alignItems: 'center', marginTop: '8px'}}>
                    <Link to="/carrito" className="boton-gradiente">Ir al Carrito</Link>
                    <Link to="/" className="agregar-btn" style={{height: 'fit-content', alignSelf: 'center', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap', marginTop: '8px'}}>Seguir viendo la Tienda</Link>
                </div>
            ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center', alignItems: 'center', marginTop: '8px'}}>
                    <ItemCount inicial={0} stock={stock} funcionAgregar={manejadorCantidad}/>
                    <Link to="/" className="agregar-btn" style={{height: 'fit-content', alignSelf: 'center', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap'}}>Seguir viendo la Tienda</Link>
                </div>
            )
            }
        </div>
    );
};

export default ItemDetail