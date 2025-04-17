import React from 'react'
import Item from '../Item/Item'

const ItemList = ({productos}) => {
  return (
    <div>
        {productos.map(item => <Item key={item.id} {...item}/>)}
    </div>
  )
}

export default ItemList