import React, { useState, useEffect, useContext } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext'

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);
  const [new_Collection, setNew_Collection] = useState([]);

  // Use the central product list and pick the latest/newest 8 items.
  useEffect(() => {
    if (!all_product || all_product.length === 0) {
      setNew_Collection([]);
      return;
    }

    // If backend provides date sorting, use it; fallback: take first 8 items
    const sorted = [...all_product];
    // If items have a `date` property, sort by it; otherwise keep original order
    if (sorted[0] && sorted[0].date) {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setNew_Collection(sorted.slice(0, 8));
  }, [all_product]);

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_Collection.map((collection, i) => (
          <Item
            key={collection._id || collection.id || i}
            id={collection._id || collection.id}
            name={collection.name}
            image={collection.image}
            new_price={collection.new_price}
            old_price={collection.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default NewCollections;
