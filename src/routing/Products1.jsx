
//(With Out Fetch-Method)  (//Static Way)
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AirFryer from '../assets/Cart-Images/Air Fryer.jpg';
// import BackPack from '../assets/Cart-Images/Back Pack.jpg';
// import BlutoothSpeakers from '../assets/Cart-Images/Bluetooth Speakers.jpg';
// import Charger from '../assets/Cart-Images/Charger.jpg';
// import CoffeeMug from '../assets/Cart-Images/Coffee Mug.jpg';
// import GymBag from '../assets/Cart-Images/Gym Bag.jpg';
// import HeadPhones from '../assets/Cart-Images/Head Phones.jpg';
// import SmartPhone from '../assets/Cart-Images/Smart Phone.jpg';
// import SmartWatch from '../assets/Cart-Images/Smart Watch.jpg';
// import Tshirt from '../assets/Cart-Images/T Shirt.jpg';
// import WaffleMaker from '../assets/Cart-Images/Waffle Maker.jpg';
// import Wallet from '../assets/Cart-Images/Wallet.jpg';

// const Products = () => {
//   const [cart, setCart] = useState([]);
//   const [showCartPopup, setShowCartPopup] = useState(false);
//   const [lastAddedProduct, setLastAddedProduct] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 200]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(6);

//   const navigate = useNavigate();

//   const initialProducts = [
//     { id: 1, name: "Wireless Headphones", price: 79.99, description: "Noise-cancelling headphones", category: "Electronics", rating: 4.5, image: HeadPhones },
//     { id: 2, name: "Air Fryer", price: 99.99, description: "Healthy cooking appliance", category: "Home Appliances", rating: 4.7, image: AirFryer },
//     { id: 3, name: "Back Pack", price: 29.99, description: "Durable backpack", category: "Accessories", rating: 4.3, image: BackPack },
//     { id: 4, name: "Bluetooth Speakers", price: 59.99, description: "Portable bluetooth speaker", category: "Electronics", rating: 4.6, image: BlutoothSpeakers },
//     { id: 5, name: "Charger", price: 19.99, description: "Fast charging cable", category: "Accessories", rating: 4.2, image: Charger },
//     { id: 6, name: "Coffee Mug", price: 14.99, description: "Ceramic coffee mug", category: "Home", rating: 4.1, image: CoffeeMug },
//     { id: 7, name: "Gym Bag", price: 49.99, description: "Spacious gym bag", category: "Accessories", rating: 4.5, image: GymBag },
//     { id: 8, name: "Smartphone", price: 399.99, description: "Latest smartphone model", category: "Electronics", rating: 4.8, image: SmartPhone },
//     { id: 9, name: "Smart Watch", price: 149.99, description: "Fitness tracking smartwatch", category: "Electronics", rating: 4.7, image: SmartWatch },
//     { id: 10, name: "T-Shirt", price: 19.99, description: "Comfortable cotton T-shirt", category: "Clothing", rating: 4.3, image: Tshirt },
//     { id: 11, name: "Waffle Maker", price: 39.99, description: "Makes crispy waffles", category: "Home Appliances", rating: 4.4, image: WaffleMaker },
//     { id: 12, name: "Wallet", price: 24.99, description: "Leather wallet", category: "Accessories", rating: 4.2, image: Wallet }
//   ];

//   useEffect(() => {
//     const filtered = initialProducts.filter((product) => {
//       const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
//       const withinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
//       return matchesQuery && withinPriceRange;
//     });
//     setFilteredProducts(filtered);
//     setCurrentPage(1); 
//   }, [searchQuery, priceRange]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   const addToCart = (product) => {
//     const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
//     if (existingProductIndex > -1) {
//       const updatedCart = [...cart];
//       updatedCart[existingProductIndex].quantity += 1;
//       setCart(updatedCart);
//     } else {
//       setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
//     }
    
//     setLastAddedProduct(product);
//     setShowCartPopup(true);
//     setTimeout(() => {
//       setShowCartPopup(false);
//     }, 3000);
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     const updatedCart = cart.map(item => 
//       item.id === productId 
//         ? { ...item, quantity: newQuantity }
//         : item
//     ).filter(item => item.quantity > 0);

//     setCart(updatedCart);
    
//     if (updatedCart.length === 0) {
//       setLastAddedProduct(null);
//       setShowCartPopup(true);
//       setTimeout(() => {
//         setShowCartPopup(false);
//       }, 3000);
//     }
//   };

//   const isProductInCart = (productId) => {
//     return cart.some(item => item.id === productId);
//   };

//   const getProductQuantityInCart = (productId) => {
//     const product = cart.find(item => item.id === productId);
//     return product ? product.quantity : 0;
//   };

//   const getTotalItems = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const navigateToCart = () => {
//     navigate('/cart', { state: { cart } });
//   };

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px', fontFamily: 'Arial, sans-serif', position: 'relative'}}>
//       <div 
//         style={{
//           position: 'fixed',
//           top: '20px',
//           right: '220px',
//           zIndex: 1000,
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           backgroundColor: 'white',
//           padding: '10px 16px',
//           borderRadius: '50px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//           transition: 'transform 0.2s ease, box-shadow 0.2s ease'
//         }}
//         onClick={navigateToCart}
//         onMouseOver={(e) => {
//           e.currentTarget.style.transform = 'scale(1.05)';
//           e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
//         }}
//         onMouseOut={(e) => {
//           e.currentTarget.style.transform = 'scale(1)';
//           e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
//         }}
//       >
//         <svg 
//           xmlns='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg'
//           width="24" 
//           height="24" 
//           viewBox="0 0 24 24" 
//           fill="none" 
//           stroke="currentColor" 
//           strokeWidth="2" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//         >
//           <circle cx="9" cy="21" r="1"></circle>
//           <circle cx="20" cy="21" r="1"></circle>
//           <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//         </svg>
//         <span 
//           style={{
//             backgroundColor: '#3b82f6',
//             color: 'white',
//             borderRadius: '50%',
//             width: '24px',
//             height: '24px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontSize: '12px',
//             fontWeight: 'bold'
//           }}
//         >
//           {getTotalItems()}
//         </span>
//       </div>

//       <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div style={{ flex: 1, maxWidth: '500px' }}>
//           <input
//             type="text"
//             placeholder="Search products by name or category..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '12px 16px',
//               borderRadius: '8px',
//               border: '1px solid lightblue',
//               fontSize: '16px',
//               outline: 'none',
//               boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//               transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
//             }}
//             onFocus={(e) => {
//               e.target.style.borderColor = 'lightgray';
//               e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = '#d1d5db';
//               e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
//             }}
//           />
//         </div>
        
//         <div style={{ marginLeft: '20px', minWidth: '250px' }}>
//           <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
//             Price Range: ${priceRange[0]} - ${priceRange[1]}
//           </label>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <span>${priceRange[0]}</span>
//             <input
//               type="range"
//               min="0"
//               max="200"
//               value={priceRange[1]}
//               onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//               style={{ flex: 1 }}
//             />
//             <span>${priceRange[1]}</span>
//           </div>
//         </div>
//       </div>

//       <div style={{ marginBottom: '24px' }}>
//         <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>
//           {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
//         </h2>
//         {currentProducts.length === 0 ? (
//           <p style={{ color: '#6b7280', textAlign: 'center', padding: '40px 0' }}>No products found matching your search.</p>
//         ) : (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
//             {currentProducts.map((product) => (
//               <div
//                 key={product.id}
//                 style={{
//                   border: '1px solid white',
//                   borderRadius: '12px',
//                   overflow: 'hidden',
//                   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
//                   transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//                   backgroundColor: 'white',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   height: '100%'
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.transform = 'translateY(-4px)';
//                   e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
//                 }}
//               >
//                 <div style={{ 
//                   height: '200px', 
//                   backgroundColor: '#f9fafb', 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'center',
//                   padding: '16px'
//                 }}>
//                   <img 
//                     src={product.image} 
//                     alt={product.name} 
//                     style={{ 
//                       maxWidth: '100%',
//                       maxHeight: '100%',
//                       objectFit: 'contain',
//                       width: 'auto',
//                       height: 'auto',
//                       borderRadius: '4px'
//                     }} 
//                   />
//                 </div>
//                 <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
//                   <h3 style={{ margin: '8px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>{product.name}</h3>
//                   <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px', flexGrow: 1 }}>{product.description}</p>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#111827' }}>${product.price}</span>
//                     {isProductInCart(product.id) ? (
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                         <button 
//                           onClick={() => updateQuantity(product.id, getProductQuantityInCart(product.id) - 1)}
//                           style={{ 
//                             backgroundColor: getProductQuantityInCart(product.id) === 1 ? '#ef4444' : '#3b82f6', 
//                             color: 'white', 
//                             padding: '4px 8px', 
//                             borderRadius: '4px', 
//                             border: 'none',
//                             cursor: 'pointer'
//                           }}
//                         >
//                           {getProductQuantityInCart(product.id) === 1 ? (
//                             <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                           ) : (
//                             '-'
//                           )}
//                         </button>
                        
//                         <span>{getProductQuantityInCart(product.id)}</span>
                        
//                         <button 
//                           onClick={() => updateQuantity(product.id, getProductQuantityInCart(product.id) + 1)}
//                           style={{ 
//                             backgroundColor: '#3b82f6', 
//                             color: 'white', 
//                             padding: '4px 8px', 
//                             borderRadius: '4px', 
//                             border: 'none',
//                             cursor: 'pointer'
//                           }}
//                         >
//                           +
//                         </button>
                        
//                         <button
//                           onClick={navigateToCart}
//                           style={{ 
//                             backgroundColor: '#10b981', 
//                             color: 'white', 
//                             padding: '8px 16px', 
//                             borderRadius: '6px', 
//                             border: 'none', 
//                             cursor: 'pointer',
//                             fontWeight: '500',
//                             fontSize: '14px',
//                             transition: 'background-color 0.2s ease'
//                           }}
//                           onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
//                           onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
//                         >
//                           Go to Cart
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => addToCart(product)}
//                         style={{ 
//                           backgroundColor: '#3b82f6', 
//                           color: 'white', 
//                           padding: '8px 16px', 
//                           borderRadius: '6px', 
//                           border: 'none', 
//                           cursor: 'pointer',
//                           fontWeight: '500',
//                           fontSize: '14px',
//                           transition: 'background-color 0.2s ease'
//                         }}
//                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
//                         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
//                       >
//                         Add to Cart
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             style={{
//               margin: '0 4px',
//               padding: '8px 12px',
//               backgroundColor: currentPage === i + 1 ? '#3b82f6' : 'white',
//               color: currentPage === i + 1 ? 'white' : '#3b82f6',
//               border: '1px solid #3b82f6',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       {showCartPopup && lastAddedProduct && (
//         <div style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           backgroundColor: 'white',
//           padding: '16px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '12px',
//           zIndex: 1000,
//           animation: 'fadeIn 0.3s ease'
//         }}>
//           <img 
//             src={lastAddedProduct.image} 
//             alt={lastAddedProduct.name} 
//             style={{ 
//               width: '50px',
//               height: '50px',
//               objectFit: 'cover',
//               borderRadius: '4px'
//             }} 
//           />
//           <div>
//             <p style={{ margin: 0, fontWeight: '500' }}>{lastAddedProduct.name} added to cart</p>
//             <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '14px' }}>
//               {getProductQuantityInCart(lastAddedProduct.id)} in cart (${(lastAddedProduct.price * getProductQuantityInCart(lastAddedProduct.id)).toFixed(2)})
//             </p>
//           </div>
//           <button 
//             onClick={() => setShowCartPopup(false)}
//             style={{
//               background: 'none',
//               border: 'none',
//               cursor: 'pointer',
//               color: '#6b7280',
//               fontSize: '20px',
//               marginLeft: '12px'
//             }}
//           >
//             &times;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;
