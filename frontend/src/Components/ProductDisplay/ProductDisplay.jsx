import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  if (!product) {
    return <div className="productDisplay">Product not found</div>;
  }

  return (
    <div className="productDisplay">
      {/* Left Section */}
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productDisplay-img">
          <img
            className="productDisplay-main-img"
            src={product.image}
            alt={product.name}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="productDisplay-right">
        <h1>{product.name}</h1>

        {/* Rating */}
        <div className="productDisplay-right-star">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star dull" />
          <p>(122 reviews)</p>
        </div>

        {/* Prices */}
        <div className="productDisplay-right-prices">
          <span className="old-price">₹{product.old_price}</span>
          <span className="new-price">₹{product.new_price}</span>
        </div>

        {/* Description */}
        <p className="productDisplay-description">
          A premium product with excellent quality and design, perfect for your
          style and comfort.
        </p>

        {/* Sizes */}
        <div className="productDisplay-sizes">
          <p>Select Size:</p>
          <div className="sizes">
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </div>
        </div>

        {/* Add to Cart */}
        <button onClick={() => addToCart(product._id || product.id)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDisplay
