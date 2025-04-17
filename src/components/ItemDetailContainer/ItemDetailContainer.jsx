import React, { useEffect, useState } from 'react'
import { getUnProducto } from '../asyncmock'
import ItemDetail from '../ItemDetail/ItemDetail'
import ClipLoader from 'react-spinners/ClipLoader'
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const { id } = useParams(); // Obtener el id de la URL
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUnProducto(parseInt(id)) // Usar el id de la URL para obtener el producto
            .then((respuesta) => {
                if (respuesta) {
                    setProducto(respuesta);
                } else {
                    setProducto({ nombre: "Producto no encontrado", descripcion: "", precio: "-", imagen: "" });
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]); // Dependencia en el id para que se actualice al cambiar

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
                    <div style={{ marginRight: '20px' }}><ClipLoader color="lightblue" size={50} /></div> <p>Cargando detalles...</p>
                </div>
            ) : (
                <ItemDetail {...producto} />
            )}
        </div>
    );
};

export default ItemDetailContainer