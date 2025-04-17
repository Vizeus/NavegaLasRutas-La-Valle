import { useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom'

const ItemDetail = ({ id, nombre, precio, descripcion, imagen, stock }) => {

    const [agregarCantidad, setAgregarCantidad] = useState(0)

    //creamos una funcon manejadora de la cantidad:

    const manejadorCantidad= (cantidad) => {
      setAgregarCantidad(cantidad)
      console.log("Productos agregados:" + cantidad)
    }

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px' }}>
            <h2>Nombre: {nombre}</h2>
            <h3>Id: {id}</h3>
            <h3>Precio: ${precio}</h3>
            <p>Descripción: {descripcion}</p>
            <img src={imagen} alt={nombre} style={{ width: '200px', height: 'auto' }} />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam totam unde, nulla debitis quos similique beatae corporis sapiente quam reiciendis consectetur illum deserunt placeat sed aliquam ipsum dignissimos repellendus labore.</p>
            {
            agregarCantidad > 0 ?( <Link to="/cart"> Terminar Compra</Link> ) : ( <ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad}/> )
            }
        </div>
    );
};

export default ItemDetail