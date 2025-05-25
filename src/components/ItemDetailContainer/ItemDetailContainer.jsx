import React, { useEffect, useState } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import ClipLoader from 'react-spinners/ClipLoader'
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ItemDetailContainer = () => {
    const { id } = useParams(); // Obtener el id de la URL
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerProducto = async () => {
            setLoading(true);
            try {
                const productosRef = collection(db, 'productos');
                const q = query(productosRef, where('id', '==', parseInt(id)));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const docSnap = querySnapshot.docs[0];
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setProducto({ nombre: "Producto no encontrado", descripcion: "", precio: "-", imagen: "" });
                }
            } catch (error) {
                console.log(error);
                setProducto({ nombre: "Error al cargar producto", descripcion: "", precio: "-", imagen: "" });
            }
            setLoading(false);
        };
        obtenerProducto();
    }, [id]); // Dependencia en el id para que se actualice al cambiar

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <div style={{ marginRight: '20px' }}><ClipLoader color="lightblue" size={50} /></div> <p>Cargando detalles...</p>
                </div>
            ) : (
                <ItemDetail {...producto} descripcionLarga={producto.descripcionLarga} />
            )}
        </div>
    );
};

export default ItemDetailContainer