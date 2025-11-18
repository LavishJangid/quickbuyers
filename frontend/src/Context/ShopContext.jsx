import React, { createContext, useState, useEffect } from 'react';
// Local fallback product data (used when backend is unavailable)
import localProducts from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

// Initialize cart with 0 for 300 items
const getDefaultCart = () => {
  const cart = {};
  for (let i = 0; i <= 300; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [loadingCart, setLoadingCart] = useState(true);

  // Fetch all products with retry logic
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/allproducts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || (Array.isArray(data) && data.length === 0)) {
          // fallback to local data when backend returns empty
          console.warn('Backend returned no products — using local fallback data.');
          setAll_Product(localProducts);
        } else {
          setAll_Product(data);
        }
      } catch (err) {
        console.warn('Error fetching products:', err.message);
        console.warn('Tip: Make sure backend is running on http://localhost:4000 and ad blocker is disabled for localhost');
        // Use local fallback so UI still shows products
        setAll_Product(localProducts);
      }
    };

    fetchProducts();
  }, []);

  // Fetch user's cart from backend if logged in
  useEffect(() => {
    const fetchUserCart = async () => {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setLoadingCart(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/getcart', {
          method: 'GET',
          headers: { 'auth-token': token },
        });
        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching user cart:", err);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchUserCart();
  }, []);

  // Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const response = await fetch('http://localhost:4000/addtocart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId }),
        });

        if (!response.ok) {
          console.warn("Add to cart request blocked. Check ad blocker settings.");
        }
        const data = await response.json();
        console.log("Add to cart response:", data);
      } catch (err) {
        console.warn("Add to cart failed (backend may be blocked):", err.message);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));

    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const response = await fetch('http://localhost:4000/removefromcart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId }),
        });

        const data = await response.json();
        console.log("Remove from cart response:", data);
      } catch (err) {
        console.error("Error removing from cart:", err);
      }
    }
  };

  // Update cart item manually
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Try to find product by MongoDB _id first, fallback to numeric id
        const product = all_product.find((p) => 
          p._id === item || p.id === Number(item)
        );
        if (product) totalAmount += product.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Get total cart items
  const totalCartItems = () => {
    let totalCount = 0;
    for (const item in cartItems) totalCount += cartItems[item];
    return totalCount;
  };

  const contextValue = {
    all_product,
    cartItems,
    loadingCart,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    totalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
