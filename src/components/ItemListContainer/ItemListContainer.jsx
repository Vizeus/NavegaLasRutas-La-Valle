import {useEffect, useState} from 'react';
import { ClipLoader } from 'react-spinners'; // Importamos el spinner
import { getProductos, getProductoPorCategorias } from '../../mocks/asyncmock';
import ItemList from '../ItemList/ItemList';
import { useNavigate } from 'react-router-dom';

const ItemListContainer = () => {
  // Definimos las variables de estado
    const [productos, setProductos] = useState([]); // Estado para los productos
    const [loading, setLoading] = useState(true); // Estado para el spinner
    const [searchId, setSearchId] = useState(''); // Estado para el ID de busqueda
    const [categoria, setCategoria] = useState(''); // Estado para la categoría seleccionada

    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        if (categoria) { // Si hay una categoría seleccionada (truthy), mostramos solo los productos de esa categoría
            setLoading(true); // Mostramos el spinner
            getProductoPorCategorias(categoria) // Obtenemos los productos por categoría
                .then(respuesta => {
                    setProductos(respuesta); // Actualizamos el estado con los productos filtrados
                    setLoading(false);
                 // navigate(`/${categoria.toLowerCase()}`); // ESTO NO LO PUDE SOLUCINAR PROFE, SI CAMBIA LA URL ME DA ERROR
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        } else {
            getProductos() // Si no hay categoría seleccionada, obtenemos todos los productos
                .then(respuesta => {
                    setProductos(respuesta);
                    setLoading(false); // Terminó de cargar, se oculta el spinner
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false); // Incluso en error, se apaga el spinner
                });
        }
    }, [categoria]); // Revisa si la categoría cambia y vuelve a cargar los productos

    const manejarBusqueda = (e) => {
        e.preventDefault(); // Evitamos que se recargue la página
        searchId && navigate(`/productos/${searchId}`); // Redirige a la ruta del producto
    };

    const manejarCambioDeCategoria = (e) => {
        setCategoria(e.target.value); // Cambiamos la categoría seleccionada
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {loading ? ( // Mostramos el spinner mientras loading es true
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '200px' }}>
                    <div style={{ marginRight: '20px' }}><ClipLoader color="lightblue" size={60} /></div> <p>Cargando productos...</p>
                </div>
            ) : (
                // Cuando loading es false, mostramos el contenido
                <>
                    <h2>Mis productos</h2>
                    <ItemList productos={productos} /> {/* Componente que renderiza la lista de productos */}
                    <hr style={{ width: '80%'}}/>
                    <h3>Busqueda</h3>
                    <form onSubmit={manejarBusqueda} style={{ marginBottom: '20px' }}> {/* Formulario para buscar por id*/}
                        <input
                            type="text"
                            placeholder="Buscar productos por ID"
                            value={searchId}
                            onChange={(elemento) => setSearchId(elemento.target.value)}
                            style={{ padding: '5px', marginRight: '10px' }}
                        />
                        <button type="submit" style={{ padding: '5px 10px' }}>Buscar</button>
                    </form>
                    <form style={{ marginBottom: '20px' }}> {/* Formulario para filtra por categoria*/}
                        <label htmlFor="categoria">Filtrar por categoría: </label>
                        <select
                            id="categoria"
                            value={categoria}
                            onChange={manejarCambioDeCategoria}
                            style={{ padding: '5px', marginLeft: '10px' }}
                        >
                            <option value="">Todas</option>
                            <option value="Almacen">Almacén</option>
                            <option value="Lacteos">Lácteos</option>
                        </select>
                    </form>
                </>
            )}
        </div>
    );
};

export default ItemListContainer;