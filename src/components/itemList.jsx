import React from 'react'
import Item from './Item'

const ItemList = ({data}) => {
  return (
    <div className='flex items-center justify-center gap-6 p-5 flex-wrap text-textColor'>
        {
          data && data.map(item=>(
            <Item id={item.id} name={item.name} price={item.price} isAddedToCart={item.isAddedToCart} imgSrc={item.imgURL}/>
          ))
        }
    </div>
  )
}

export default ItemList