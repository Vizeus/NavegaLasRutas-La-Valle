import { useContext } from 'react';
import Item from '../Item/Item';
import { ProductosContext } from '../../core/contexts/ProductosContext';

const ItemList = () => {
  const { productos } = useContext(ProductosContext);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {productos.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
};

export default ItemList