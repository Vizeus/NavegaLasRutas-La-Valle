import "./CartWidget.css"

const CartWidget = () => {

    const imgCarrito = "../../../public/images/carrito.png";
    
  return (
    <div>
        <img className="imgCarrito" src={imgCarrito} alt="Imagen de un carrito" />
    </div>
  )
}

export default CartWidget
