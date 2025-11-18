import React, { useState, useEffect } from 'react';
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const res = await fetch("http://localhost:4000/allproducts");
    const data = await res.json();
    setAllProducts(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
    fetchInfo();
  };

  return (
    <div className='list-product'>
      <h1>All Product List</h1>

      {/* Header Row */}
      <div className="listproduct-header">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      {/* Product Rows */}
      <div className="listproduct-allproducts">
        {allproducts.map((product) => (
          <div key={product._id || product.id} className="listproduct-format">
            <img src={product.image} alt={product.name} className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>{product.old_price}</p>
            <p>{product.new_price}</p>
            <p>{product.category}</p>
            <img 
              src={cross_icon} 
              alt="Remove" 
              className="listproduct-remove-icon"
              onClick={() => remove_product(product._id || product.id)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
