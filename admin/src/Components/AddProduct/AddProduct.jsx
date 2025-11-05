import React, { useState } from 'react';
import "./AddProduct.css";
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(upload_area);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  // Handle image selection and preview
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImageURL(URL.createObjectURL(file));
    else setImageURL(upload_area);
  };

  // Handle input changes
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Add product
  const Add_Product = async () => {
    try {
      // Check required fields
      if (!productDetails.name || !productDetails.category || !productDetails.old_price || !productDetails.new_price) {
        alert("Please fill all fields");
        return;
      }
      if (!image) {
        alert("Please upload an image");
        return;
      }

      // Upload image first
      console.log("Uploading image...");
      const formData = new FormData();
      formData.append('product', image); // <-- Must match backend multer field name

      const uploadResp = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const uploadData = await uploadResp.json();
      console.log("Upload response:", uploadData);

      if (!uploadData.success) {
        alert("Image upload failed");
        return;
      }

      // Add product to DB
      const product = { ...productDetails, image: uploadData.image_url };
      console.log("Adding product:", product);

      const addResp = await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const addData = await addResp.json();
      console.log("Add product response:", addData);

      addData.success
        ? alert("Product Added Successfully!")
        : alert("Failed to add product");

      // Reset form
      setProductDetails({
        name: "",
        image: "",
        category: "",
        new_price: "",
        old_price: "",
      });
      setImage(null);
      setImageURL(upload_area);

    } catch (error) {
      console.error("Error in Add_Product:", error);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <div className='add-product'>
      {/* Product Title */}
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name='name'
          placeholder='Type here'
        />
      </div>

      {/* Price Fields */}
      <div className="price-fields">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Discounted Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      {/* Category */}
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="">Select Category</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      {/* File Upload */}
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={imageURL}
            alt="Upload Thumbnail"
            className='addproduct-thumbnail-img'
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name='image'
          id='file-input'
          hidden
        />
      </div>

      {/* Submit Button */}
      <button onClick={Add_Product} className='addproduct-btn'>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
