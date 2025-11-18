import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import drop_down_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      {/* Banner */}
      <img 
        src={props.banner} 
        alt={props.category} 
        className='category-banner' 
      />

      {/* Top Bar */}
      <div className="shopcategory-index-sort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={drop_down_icon} alt="sort" />
        </div>
      </div>

      {/* Products */}
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item 
                key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price} 
              />
            )
          } else {
            return null;
          }
        })}
      </div>
    </div>
  )
}

export default ShopCategory;
