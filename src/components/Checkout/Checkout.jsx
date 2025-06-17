import { useContext, useState } from "react";
import "./Checkout.css";
import { CarritoContext } from "../../core/contexts/CarritoContext";
import { db } from "../../services/firebase";
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

const Checkout = () => {
  const { carrito, vaciarCarrito, montoTotal, cantidadTotal } = useContext(CarritoContext);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ordenID, setOrdenID] = useState("");
  const [compraRealizada, setCompraRealizada] = useState(false);
  const [ordenTotal, setOrdenTotal] = useState(0);
  const [ordenCantidad, setOrdenCantidad] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") setNombre(value);
    if (name === "apellido") setApellido(value);
    if (name === "telefono") setTelefono(value);
    if (name === "email") setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !telefono || !email) return;
    setOrdenTotal(montoTotal);
    setOrdenCantidad(cantidadTotal);
    setLoading(true); // Mostrar spinner
    try {
      // Descontar stock de cada producto usando el id numérico de la propiedad
      await Promise.all(
        carrito.map(async (producto) => {
          const productoIdNum = producto.item.id; // id numérico de la propiedad
          // Buscar el documento cuyo campo 'id' sea igual a productoIdNum
          const productosRef = collection(db, "productos");
          const q = query(productosRef, where("id", "==", productoIdNum));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const productoRef = doc(db, "productos", docSnap.id);
            const productoData = docSnap.data();
            if (typeof productoData.stock !== "number") {
              throw new Error(`El producto con id ${productoIdNum} no tiene stock definido.`);
            }
            await updateDoc(productoRef, {
              stock: productoData.stock - producto.cantidad
            });
          } else {
            throw new Error(`No se encontró el producto con id ${productoIdNum} en la base de datos.`);
          }
        })
      );
      // Crear la orden usando el id numérico
      const orden = {
        items: carrito.map(producto => ({
          id: producto.item.id, // id numérico
          nombre: producto.item.nombre,
          cantidad: producto.cantidad,
        })),
        total: montoTotal,
        fecha: new Date(),
        nombre,
        apellido,
        telefono,
        email
      };
      const docRef = await addDoc(collection(db, "ordenes"), orden);
      setOrdenID(docRef.id);
      vaciarCarrito();
      setCompraRealizada(true);
    } catch (error) {
      console.error("Error al actualizar el stock o crear la orden: ", error);
    } finally {
      setLoading(false); // Ocultar spinner
    }
  };

  if (loading) {
    return (
      <div className="checkout-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '200px' }}>
        <div style={{ marginBottom: '20px' }}>
          <ClipLoader color="lightblue" size={60} />
        </div>
        <p>Procesando tu compra...</p>
      </div>
    );
  }

  if (compraRealizada) {
    return (
      <div className="checkout-container">
        <h2>¡Gracias por tu compra, {nombre}!</h2>
        <p>Te enviaremos un correo a <b>{email}</b> con los detalles.</p>
        <p>Pronto nos comunicaremos al teléfono: <b>{telefono}</b>.</p>
        <p>Tu orden ha sido registrada con el ID: <strong>{ordenID}</strong>.</p>
        <div className="checkout-resumen">
          <h3>Resumen de compra</h3>
          <p>Total: <b>${ordenID ? ordenTotal : montoTotal}</b></p>
          <p>Cantidad de productos: <b>{ordenID ? ordenCantidad : cantidadTotal}</b></p>
        </div>
      </div>
    );
  }

  return (
   <>
   <meta name="robots" content="noindex" />
    <div className="checkout-container">
      <h2>Finalizar compra</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={nombre} onChange={handleChange} required />
        </label>
        <label>
          Apellido:
          <input type="text" name="apellido" value={apellido} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={handleChange} required />
        </label>
        <label>
          Teléfono:
          <input type="tel" name="telefono" value={telefono} onChange={handleChange} required />
        </label>
        <button type="submit" className="boton-gradiente">Confirmar compra</button>
      </form>
      <div className="checkout-resumen">
        <h3>Resumen de compra</h3>
        <p>Total: <b>${montoTotal}</b></p>
        <p>Cantidad de productos: <b>{cantidadTotal}</b></p>
      </div>
    </div>
   </>  
  );
};

export default Checkout;
