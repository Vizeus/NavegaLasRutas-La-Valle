import { Link } from "react-router-dom"

const Item = ({id, nombre, precio, descripcion, imagen}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px", border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
        <h2>{nombre}</h2>
        <h3>Precio: ${precio}</h3>
        <p>{descripcion}</p>
        <img src={imagen} alt={nombre} style={{width: '150px', height: 'auto'}} />
        <Link to={`/productos/${id}`} style={{textDecoration: 'none', color: 'blue', marginTop: '10px'}}> <button>Ver detalles</button> </Link>
    </div>
  )
}

export default Item