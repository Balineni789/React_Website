
// import React, { useState, useEffect } from 'react';(PopView-Product)
// import { useNavigate } from 'react-router-dom';
// import './Products.css';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(false);
//   const [cartTimeout, setCartTimeout] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('https://fakestoreapi.com/products');
//       const jsonData = await response.json();
//       setProducts(jsonData);
//       setFilteredProducts(jsonData);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const results = products.filter(product =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [searchTerm, products]);

//   const handleCartIconClick = () => {
//     setShowCart(true);
//     resetCartTimeout();
//   };

//   const resetCartTimeout = () => {
//     if (cartTimeout) {
//       clearTimeout(cartTimeout);
//     }
//     const timeout = setTimeout(() => {
//       if (!document.querySelector('.cart-dropdown:hover') && 
//           !document.querySelector('.cart-icon-container:hover')) {
//         setShowCart(false);
//       }
//     }, 2000);
//     setCartTimeout(timeout);
//   };

//   const handleCartMouseEnter = () => {
//     if (cartTimeout) {
//       clearTimeout(cartTimeout);
//     }
//   };

//   const handleCartMouseLeave = () => {
//     resetCartTimeout();
//   };

//   const goToCartPage = () => {
//     navigate('/cart', { state: { cart } });
//   };

//   const addToCart = (product) => {
//     const existingItem = cart.find(item => item.id === product.id);
//     if (existingItem) {
//       const updatedCart = cart.map(item =>
//         item.id === product.id 
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       setCart(updatedCart);
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//     setShowCart(true);
//     resetCartTimeout();
//   };

//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//     resetCartTimeout();
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(productId);
//       return;
//     }
    
//     const updatedCart = cart.map(item =>
//       item.id === productId 
//         ? { ...item, quantity: newQuantity }
//         : item
//     );
//     setCart(updatedCart);
//     resetCartTimeout();
//   };

//   const isInCart = (productId) => {
//     return cart.some(item => item.id === productId);
//   };

//   const getProductQuantity = (productId) => {
//     const item = cart.find(item => item.id === productId);
//     return item ? item.quantity : 0;
//   };

//   const openProductDetail = (product) => {
//     setSelectedProduct(product);
//     document.body.style.overflow = 'hidden'; 
//   };

//   const closeProductDetail = () => {
//     setSelectedProduct(null);
//     document.body.style.overflow = 'auto'; 
//   };

//   useEffect(() => {
//     return () => {
//       if (cartTimeout) {
//         clearTimeout(cartTimeout);
//       }
//       document.body.style.overflow = 'auto'; 
//     };
//   }, [cartTimeout]);

//   return (
//     <div className="products-container">
//       <header className="products-header">
//         <h1 className="products-title">Our Products</h1>
//         <div className="search-cart-container">
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <span className="search-icon">🔍</span>
//           </div>
//           <div 
//             className="cart-icon-container" 
//             onClick={handleCartIconClick}
//             onMouseEnter={handleCartMouseEnter}
//             onMouseLeave={handleCartMouseLeave}
//           >
//             <span className="cart-icon">🛒</span>
//             {cart.length > 0 && (
//               <span className="cart-count">
//                 {cart.reduce((sum, item) => sum + item.quantity, 0)}
//               </span>
//             )}
//           </div>
//         </div>
//       </header>

//       {showCart && (
//         <div 
//           className="cart-dropdown"
//           onMouseEnter={handleCartMouseEnter}
//           onMouseLeave={handleCartMouseLeave}
//         >
//           <h3>Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
//           {cart.length === 0 ? (
//             <p>Your cart is empty</p>
//           ) : (
//             <>
//               <div className="cart-items">
//                 {cart.map((item) => (
//                   <div key={item.id} className="cart-item">
//                     <img src={item.image} alt={item.title} width="40" />
//                     <div className="cart-item-details">
//                       <span>{item.title.substring(0, 30)}...</span>
//                       <span>${item.price} × {item.quantity}</span>
//                     </div>
//                     <button 
//                       className="remove-item"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       × 
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <div className="cart-total">
//                 Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
//               </div>
//               <button className="checkout-btn" onClick={goToCartPage}>
//                 Proceed to Checkout
//               </button>
//             </>
//           )}
//         </div>
//       )}

//       {selectedProduct && (
//         <div className="product-detail-modal">
//           <div className="product-detail-content">
//             <button className="close-detail-btn" onClick={closeProductDetail}>
//               ×
//             </button>
//             <div className="detail-main">
//               <div className="detail-image-container">
//                 <img 
//                   src={selectedProduct.image} 
//                   alt={selectedProduct.title} 
//                   className="detail-image"
//                 />
//               </div>
//               <div className="detail-info">
//                 <h2 className="detail-title">{selectedProduct.title}</h2>
//                 <p className="detail-description">{selectedProduct.description}</p>
//                 <div className="detail-meta">
//                   <span className="detail-price">${selectedProduct.price}</span>
//                   <span className={`detail-rating ${selectedProduct.rating.rate > 4 ? 'high-rating' : ''}`}>
//                     ★ {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
//                   </span>
//                   <span className="detail-category">Category: {selectedProduct.category}</span>
//                 </div>
//                 {isInCart(selectedProduct.id) ? (
//                   <div className="quantity-controls-detail">
//                     <button 
//                       className="quantity-btn"
//                       onClick={() => updateQuantity(selectedProduct.id, getProductQuantity(selectedProduct.id) - 1)}
//                     >
//                       -
//                     </button>
//                     <span className="quantity-display">{getProductQuantity(selectedProduct.id)}</span>
//                     <button 
//                       className="quantity-btn"
//                       onClick={() => updateQuantity(selectedProduct.id, getProductQuantity(selectedProduct.id) + 1)}
//                     >
//                       +
//                     </button>
//                     <button 
//                       className="go-to-cart-btn"
//                       onClick={goToCartPage}
//                     >
//                       Go to Cart
//                     </button>
//                   </div>
//                 ) : (
//                   <button 
//                     className="add-to-cart-btn detail-add-btn"
//                     onClick={() => {
//                       addToCart(selectedProduct);
//                       closeProductDetail();
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {isLoading ? (
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//           <p>Loading products...</p>
//         </div>
//       ) : filteredProducts.length > 0 ? (
//         <div className="product-grid">
//           {filteredProducts.map((product) => (
//             <div key={product.id} className="product-card">
//               <div 
//                 className="product-image-container"
//                 onClick={() => openProductDetail(product)}
//               >
//                 <img 
//                   src={product.image} 
//                   alt={product.title} 
//                   className="product-image"
//                 />
//               </div>
//               <div className="product-info">
//                 <h3 className="product-title">{product.title}</h3>
//                 <p className="product-description">
//                   {product.description.length > 100 
//                     ? `${product.description.substring(0, 100)}...` 
//                     : product.description}
//                 </p>
//                 <div className="product-footer">
//                   <span className="product-price">${product.price}</span>
//                   <span className={`product-rating ${product.rating.rate > 4 ? 'high-rating' : ''}`}>
//                     ★ {product.rating.rate} ({product.rating.count})
//                   </span>
//                 </div>
//                 {isInCart(product.id) ? (
//                   <div className="quantity-controls-product">
//                     <button 
//                       className="quantity-btn"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         updateQuantity(product.id, getProductQuantity(product.id) - 1);
//                       }}
//                     >
//                       -
//                     </button>
//                     <span className="quantity-display">{getProductQuantity(product.id)}</span>
//                     <button 
//                       className="quantity-btn"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         updateQuantity(product.id, getProductQuantity(product.id) + 1);
//                       }}
//                     >
//                       +
//                     </button>
//                     <button 
//                       className="go-to-cart-btn"
//                       onClick={goToCartPage}
//                     >
//                       Go to Cart
//                     </button>
//                   </div>
//                 ) : (
//                   <button 
//                     className="add-to-cart-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart(product);
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-results">
//           <p>No products match your search. Try different keywords.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;




//(Css Styling)

// .products-container {
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 20px;
//     font-family: 'Arial', sans-serif;
//   }
  
//   .products-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 30px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #eee;
//   }
  
//   .products-title {
//     font-size: 28px;
//     color: #333;
//     margin: 0;
//   }
  
//   .search-cart-container {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//   }
  
//   .search-bar {
//     position: relative;
//     display: flex;
//     align-items: center;
//   }
  
//   .search-bar input {
//     padding: 10px 15px;
//     padding-right: 40px;
//     border: 2px solid lightblue;
//     border-radius: 6px;
//     width: 300px;
//     font-size: 16px;
//     font-weight: bold;
//     transition: border-color 0.3s, box-shadow 0.3s;
//   }
  
//   .search-bar input:focus {
//     outline: none;
//     border-color: #4a90e2;
//     box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
//   }
  
//   .search-icon {
//     position: absolute;
//     right: 12px;
//     color: #888;
//   }
  
//   .cart-icon-container {
//     position: relative;
//     cursor: pointer;
//     padding: 8px;
//     border-radius: 50%;
//     transition: background-color 0.3s;
//   }
  
//   .cart-icon-container:hover {
//     background-color: rgba(0, 0, 0, 0.05);
//   }
  
//   .cart-icon {
//     font-size: 24px;
//   }
  
//   .cart-count {
//     position: absolute;
//     top: 0;
//     right: 0;
//     background-color: #ff5252;
//     color: white;
//     font-size: 12px;
//     min-width: 18px;
//     height: 18px;
//     border-radius: 9px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-weight: bold;
//   }
  
//   .cart-dropdown {
//     position: absolute;
//     right: 20px;
//     top: 80px;
//     width: 350px;
//     background-color: white;
//     border-radius: 8px;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//     padding: 15px;
//     z-index: 100;
//     animation: slideDown 0.3s ease-out forwards;
//     transform-origin: top center;
//   }
  
//   @keyframes slideDown {
//     from {
//       opacity: 0;
//       transform: scaleY(0);
//     }
//     to {
//       opacity: 1;
//       transform: scaleY(1);
//     }
//   }
  
//   .cart-dropdown h3 {
//     margin-top: 0;
//     padding-bottom: 10px;
//     border-bottom: 1px solid #eee;
//   }
  
//   .cart-items {
//     max-height: 300px;
//     overflow-y: auto;
//     margin-bottom: 15px;
//   }
  
//   .cart-item {
//     display: flex;
//     align-items: center;
//     padding: 10px 0;
//     border-bottom: 1px solid #f0f0f0;
//     transition: background-color 0.3s ease;
//   }
  
//   .cart-item:hover {
//     background-color: #f0f0f0;
//   }
  
//   .cart-item img {
//     object-fit: contain;
//     background-color: #f9f9f9;
//     border-radius: 4px;
//     margin-right: 10px;
//   }
  
//   .cart-item-details {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     font-size: 14px;
//   }
  
//   .cart-total {
//     font-weight: bold;
//     text-align: right;
//     padding: 10px 0;
//     font-size: 16px;
//   }
  
//   .checkout-btn {
//     background-color: #4CAF50;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     padding: 10px 16px;
//     cursor: pointer;
//     font-weight: 600;
//     width: 100%;
//     transition: all 0.2s ease;
//   }
  
//   .checkout-btn:hover {
//     background-color: #3e8e41;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   }
  
//   .remove-item {
//     background-color: transparent;
//     color: #ff5252;
//     border: none;
//     font-size: 30px;
//     cursor: pointer;
//     transition: transform 0.2s ease, color 0.2s ease;
//   }
  
//   .remove-item:hover {
//     transform: scale(1.2);
//     color: #ff0000;
//   }
  
//   .product-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//     gap: 25px;
//   }
  
//   .product-card {
//     border-radius: 8px;
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//     overflow: hidden;
//     transition: transform 0.3s ease, box-shadow 0.3s ease;
//     background-color: lightcyan;
//     border: 1px solid lightgrey;
//   }
  
//   .product-card:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
//     cursor: pointer;
//   }
  
//   .product-image-container {
//     height: 200px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 20px;
//     background-color: #f9f9f9;
//     overflow: hidden;
//     position: relative;
//   }
  
//   .product-image {
//     max-height: 100%;
//     max-width: 100%;
//     object-fit: contain;
//     transition: transform 0.5s ease;
//   }
  
//   .product-card:hover .product-image {
//     transform: scale(1.05);
//   }
  
//   .product-info {
//     padding: 16px;
//     transition: background-color 0.3s ease;
//   }
  
//   .product-card:hover .product-info {
//     background-color: #f8f9fa;
//   }
  
//   .product-title {
//     margin-top: 0;
//     margin-bottom: 10px;
//     font-size: 16px;
//     height: 40px;
//     overflow: hidden;
//     transition: color 0.3s ease;
//   }
  
//   .product-card:hover .product-title {
//     color: #4a90e2;
//   }
  
//   .product-description {
//     color: gray;
//     font-size: 15px;
//     height: 60px;
//     overflow: hidden;
//     margin-bottom: 15px;
//   }
  
//   .product-footer {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 15px;
//   }
  
//   .product-price {
//     font-size: 18px;
//     font-weight: bold;
//     color: #333;
//   }
  
//   .product-rating {
//     color: #ffa41c;
//     font-size: 14px;
//   }
  
//   .high-rating {
//     font-weight: bold;
//   }
  
//   .add-to-cart-btn {
//     background-color: #4a90e2;
//     color: white;
//     border: none;
//     border-radius: 15px;
//     padding: 10px 16px;
//     cursor: pointer;
//     font-weight: 600;
//     width: 100%;
//     transition: all 0.2s ease;
//     position: relative;
//     overflow: hidden;
//   }
  
//   .add-to-cart-btn:hover {
//     background-color: #357abD;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   }
  
//   .add-to-cart-btn:active {
//     transform: translateY(0);
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//   }
  
//   .add-to-cart-btn::after {
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 5px;
//     height: 5px;
//     background: rgba(255, 255, 255, 0.5);
//     opacity: 0;
//     border-radius: 100%;
//     transform: scale(1, 1) translate(-50%);
//     transform-origin: 50% 50%;
//   }
  
//   .add-to-cart-btn:focus:not(:active)::after {
//     animation: ripple 1s ease-out;
//   }
  
//   @keyframes ripple {
//     0% {
//       transform: scale(0, 0);
//       opacity: 0.5;
//     }
//     20% {
//       transform: scale(25, 25);
//       opacity: 0.3;
//     }
//     100% {
//       opacity: 0;
//       transform: scale(40, 40);
//     }
//   }
  
//   .no-results {
//     text-align: center;
//     padding: 30px;
//     color: #666;
//   }
  
//   .loading-spinner {
//     border: 4px solid #f3f3f3;
//     border-top: 4px solid #4a90e2;
//     border-radius: 50%;
//     width: 40px;
//     height: 40px;
//     animation: spin 1s linear infinite;
//     margin: 30px auto;
//   }
  
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
  
//   @media (max-width: 768px) {
//     .products-header {
//       flex-direction: column;
//       align-items: flex-start;
//       gap: 15px;
//     }
    
//     .search-bar input {
//       width: 100%;
//     }
    
//     .cart-dropdown {
//       width: calc(100% - 40px);
//       right: 20px;
//       left: 20px;
//     }
    
//     .product-grid {
//       grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//     }
//   }
  
//   .popup-message {
//     position: fixed;
//     top: 20px;
//     left: 50%;
//     transform: translateX(-50%);
//     background-color: #333;
//     color: white;
//     padding: 12px 24px;
//     border-radius: 4px;
//     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
//     z-index: 1000;
//     animation: fadeInOut 3s ease-in-out;
//   }
  
//   .product-added-popup {
//     background-color: #4CAF50;
//   }
  
//   @keyframes fadeInOut {
//     0% {
//       opacity: 0;
//       top: 0;
//     }
//     10% {
//       opacity: 1;
//       top: 20px;
//     }
//     90% {
//       opacity: 1;
//       top: 20px;
//     }
//     100% {
//       opacity: 0;
//       top: 0;
//     }
//   }
  
//   .quantity-controls-product {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     margin-top: 10px;
//     margin-left: 5px;
//   }
  
//   .quantity-controls-product .quantity-btn {
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//     border: 1px solid #ddd;
//     background: white;
//     cursor: pointer;
//     font-weight: bold;
//   }
  
//   .quantity-controls-product .quantity-display {
//     min-width: 20px;
//     text-align: center;
//   }
  
//   .go-to-cart-btn {
//     margin-left: 10px;
//     padding: 10px 10px;
//     background: #4CAF50;
//     color: white;
//     border: none;
//     border-radius: 10px;
//     cursor: pointer;
//     font-size: 17px;
//     margin-left: 25px;
//     width: 150px;
//   }
  
//   .cart-dropdown {
//     transition: opacity 0.3s ease;
//   }
  
  

//   (Popup-view)
//   .product-detail-modal {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   }
  
//   .product-detail-content {
//     background: white;
//     padding: 2rem;
//     border-radius: 10px;
//     max-width: 800px;
//     width: 90%;
//     max-height: 90vh;
//     overflow-y: auto;
//     position: relative;
//   }
  
//   .close-detail-btn {
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     background: none;
//     border: none;
//     font-size: 1.5rem;
//     cursor: pointer;
//     color: #333;
//   }
  
//   .detail-main {
//     display: flex;
//     gap: 2rem;
//   }
  
//   .detail-image-container {
//     flex: 1;
//   }
  
//   .detail-image {
//     width: 100%;
//     max-height: 400px;
//     object-fit: contain;
//   }
  
//   .detail-info {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//   }
  
//   .detail-title {
//     margin-top: 0;
//     font-size: 1.8rem;
//   }
  
//   .detail-description {
//     margin: 1rem 0;
//     line-height: 1.5;
//   }
  
//   .detail-meta {
//     display: flex;
//     flex-direction: column;
//     gap: 0.5rem;
//     margin-bottom: 1rem;
//   }
  
//   .detail-price {
//     font-size: 1.5rem;
//     font-weight: bold;
//     color: #2c3e50;
//   }
  
//   .detail-rating {
//     color: #f39c12;
//   }
  
//   .detail-category {
//     text-transform: capitalize;
//     color: #7f8c8d;
//   }
  
//   .quantity-controls-detail {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     margin-top: auto;
//   }
  
//   .detail-add-btn {
//     margin-top: auto;
//     padding: 0.8rem;
//     font-size: 1rem;
//   }
  
//   @media (max-width: 768px) {
//     .detail-main {
//       flex-direction: column;
//     }
    
//     .product-detail-content {
//       padding: 1rem;
//     }
//   } 