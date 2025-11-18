import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';

// Polyfill for documentPictureInPicture to prevent errors from extensions
if (typeof window !== 'undefined' && !window.documentPictureInPicture) {
  window.documentPictureInPicture = undefined;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
);

