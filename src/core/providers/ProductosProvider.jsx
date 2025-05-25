import { useEffect, useState } from 'react';
import { ProductosContext } from '../contexts/ProductosContext';
import { db } from '../../services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState('');

  // Aqui se define el efecto que se ejecutará al cargar el componente
  useEffect(() => {
    setLoading(true);
    const productosRef = collection(db, 'productos');
    let q;
    if (categoria) {
      q = query(productosRef, where('idCat', '==', categoria));
    } else {
      q = productosRef;
    }
    getDocs(q)
      .then((snapshot) => {
        const productosObtenidos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(productosObtenidos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoria]); // Se ejecuta cada vez que cambia la categoria

  return (
    <ProductosContext.Provider value={{ productos, loading, setCategoria, categoria }}>
      {children}
    </ProductosContext.Provider>
  );
};
