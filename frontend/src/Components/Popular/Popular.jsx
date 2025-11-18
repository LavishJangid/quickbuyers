import React, { useState, useEffect, useContext } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const Popular = () => {
  const { all_product } = useContext(ShopContext);
  const [popularProducts, setPopularProducts] = useState([]);

  // Derive popular women products from the central product list (uses local fallback if backend blocked)
  useEffect(() => {
    if (!all_product || all_product.length === 0) {
      setPopularProducts([]);
      return;
    }

    const women = all_product.filter((p) => p.category === 'women' || p.category === 'women ');
    setPopularProducts(women.slice(0, 4));
  }, [all_product]);

  return (
    <div className='popular'>
      <h2>POPULAR IN WOMEN</h2>
      <hr />
      <div className="popular-items">
        {popularProducts.map((item, i) => (
          <Item
            key={item._id || item.id || i}
            id={item._id || item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default Popular;
