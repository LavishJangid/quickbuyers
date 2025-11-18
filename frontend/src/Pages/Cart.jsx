import React from 'react'
import CartItems from '../Components/CartItems/CartItems'   // ✅ Capitalized import

const Cart = () => {
  return (
    <div className="Cart">
      <CartItems />   {/* ✅ Render the component */}
    </div>
  )
}

export default Cart
