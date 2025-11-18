import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/trash.png';

const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

  // ✅ Calculate subtotal safely
  const subtotal = all_product.reduce((acc, item) => {
    const quantity = cartItems[item.id] || 0;
    return acc + (item.new_price || 0) * quantity;
  }, 0);

  // Shipping is always free
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <div className="CartItems">
      {/* Header */}
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Products in cart */}
      {all_product.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <div key={item.id} className="cartItems-format">
              <img src={item.image} alt={item.name} className="carticon-product" />
              <p>{item.name}</p>
              <p>₹{item.new_price}</p>
              <button className="cartItems-quantity">{cartItems[item.id]}</button>
              <p>₹{item.new_price * cartItems[item.id]}</p>
              <img
                src={remove_icon}
                alt="remove"
                className="cartItems-remove"
                onClick={() => removeFromCart(item.id)}
              />
            </div>
          );
        }
        return null;
      })}

      {/* Bottom Section */}
      <div className="cartitems-down">
        {/* Total Summary */}
        <div className="cartitems-total">
          <h2>Cart Summary</h2>
          <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>₹{shippingFee}</p>
          </div>
          <hr />
          <div className="cartitems-total-item total">
            <h3>Total</h3>
            <h3>₹{total}</h3>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>

        {/* Promo Code Box */}
        <div className="promobox">
          <p>Have a Promo Code?</p>
          <div className="promo-input">
            <input type="text" placeholder="Enter promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
