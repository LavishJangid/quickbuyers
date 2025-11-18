import React from 'react'
import { Link } from 'react-router-dom'   // ✅ Import Link
import './Item.css'

const Item = (props) => {
  return (
    <div className='item'>
      {/* Product Image with Link */}
      <Link to={`/product/${props.id}`}> 
        <img onClick={window.scrollTo(0,0)} src={props.image} alt={props.name} />
      </Link>

      {/* Product Name */}
      <p className="item-name">{props.name}</p>

      {/* Prices */}
      <div className="item-prices">
        <span className="item-new-price">₹{props.new_price}</span>
        <span className="item-old-price">₹{props.old_price}</span>
      </div>
    </div>
  )
}

export default Item
