import { useState, useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import ItemList from '../ItemList/ItemList';
import { useNavigate } from 'react-router-dom';
import { ProductosContext } from '../../core/contexts/ProductosContext';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const { productos, loading, setCategoria, categoria } = useContext(ProductosContext);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const manejarBusqueda = (e) => {
    e.preventDefault();
    searchId && navigate(`/productos/${searchId}`);
  };

  const manejarCambioDeCategoria = (e) => {
    setCategoria(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '200px' }}>
          <div style={{ marginRight: '20px' }}><ClipLoader color="lightblue" size={60} /></div> <p>Cargando productos...</p>
        </div>
      ) : (
        <>
          <h2 className="itemlist-title">Supermercado Siempre Viva</h2>
          <ItemList />
          <hr style={{ width: '80%'}}/>
          <h3>Busqueda</h3>
          <form onSubmit={manejarBusqueda} style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Buscar productos por ID"
              value={searchId}
              onChange={(elemento) => setSearchId(elemento.target.value)}
              className="buscar-input"
            />
            <button type="submit" className="buscar-btn">Buscar</button>
          </form>
          <form className="form-categoria">
            <label htmlFor="categoria">Filtrar por categoría: </label>
            <select
              id="categoria"
              value={categoria}
              onChange={manejarCambioDeCategoria}
            >
              <option value="">Todas 🛒</option>
              <option value="Almacen">Almacén 🏪</option>
              <option value="Lacteos">Lácteos 🧀</option>
              <option value="Panaderia">Panadería 🥖</option>
              <option value="Frescos">Frescos 🥚</option>
              <option value="Verduleria">Verdulería 🥦</option>
              <option value="Carniceria">Carnicería 🥩</option>
              <option value="Fiambreria">Fiambrería 🍖</option>
            </select>
          </form>
        </>
      )}
    </div>
  );
};

export default ItemListContainer;