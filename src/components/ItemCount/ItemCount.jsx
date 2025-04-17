import { useState } from "react"
import './ItemCount.css';

const ItemCount = ({stock, inicial, funcionAgregar}) => {

    const [contador, setContador] = useState(inicial)

    const incrementar = () => {
        if(contador < stock) {
            setContador(contador +1)
        }
    }

    const decrementar = () => {
        if(contador > inicial) {
            setContador (contador -1)
        }
    }

    console.log(contador)

  return (
    <div>
        <div className="contador">
            <button onClick={decrementar}> - </button>
            <p>{contador}</p>
            <button onClick={incrementar}> + </button>
        </div>
        <div>
            <button onClick={()=> funcionAgregar(contador)}> Agregar al carrito</button>
        </div>
    </div>
  )
}

export default ItemCount