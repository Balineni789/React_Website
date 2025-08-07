
// (Old Api)
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const CartPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cart, setCart] = useState(location.state?.cart || []);

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     setCart(prevCart => 
//       prevCart.map(item => 
//         item.id === productId 
//           ? { ...item, quantity: Math.max(1, newQuantity) } 
//           : item
//       ).filter(item => item.quantity > 0)
//     );
//   };

//   const removeItem = (productId) => {
//     setCart(prevCart => prevCart.filter(item => item.id !== productId));
//   };

//   const handleCancel = () => {
//     navigate('/products');
//   };

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
//       <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>Your Shopping Cart</h1>
      
//       {cart.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '40px 0' }}>
//           <svg style={{ width: '64px', height: '64px', marginBottom: '16px', color: '#d1d5db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
//           </svg>
//           <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '8px' }}>Your cart is empty</p>
//           <p style={{ fontSize: '16px', color: '#9ca3af' }}>Start shopping to add items to your cart</p>
//         </div>
//       ) : (
//         <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
//           <div>
//             <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
//               <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>Cart Items ({cart.length})</h2>
              
//               {cart.map((product) => (
//                 <div key={product.id} style={{ display: 'flex', padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
//                   <div style={{ width: '100px', height: '100px', backgroundColor: '#f9fafb', borderRadius: '8px', overflow: 'hidden', marginRight: '16px' }}>
//                     <img 
//                       src={product.image} 
//                       alt={product.name} 
//                       style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                     />
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: '#111827' }}>{product.name}</h3>
//                     <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{product.description}</p>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <span style={{ fontWeight: '600', color: '#111827' }}>${product.price}</span>
//                       <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <button 
//                           onClick={() => updateQuantity(product.id, product.quantity - 1)}
//                           style={{ 
//                             backgroundColor: 'lightgray', 
//                             color: 'black',
//                             border: 'none', 
//                             borderRadius: '4px', 
//                             padding: '5px 10px', 
//                             marginRight: '8px',
//                             fontSize: '24px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           -
//                         </button>
//                         <span style={{ margin: '0 8px' }}>{product.quantity}</span>
//                         <button 
//                           onClick={() => updateQuantity(product.id, product.quantity + 1)}
//                           style={{ 
//                             backgroundColor: 'lightgray', 
//                             color: 'black',
//                             border: 'none', 
//                             borderRadius: '4px', 
//                             padding: '4px 8px', 
//                             marginLeft: '8px' ,
//                             fontSize: '24px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={() => removeItem(product.id)}
//                       style={{ 
//                         marginTop: '8px', 
//                         backgroundColor: '#ef4444', 
//                         color: 'white', 
//                         border: 'none', 
//                         borderRadius: '4px', 
//                         padding: '6px 12px', 
//                         fontSize: '14px' ,
//                         cursor:'pointer', 
//                       }}
//                     >
//                       Remove Item
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <div>
//             <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
//               <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>Order Summary</h2>
              
//               <div style={{ marginBottom: '16px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                   <span style={{ color: '#6b7280' }}>Subtotal</span>
//                   <span style={{ fontWeight: '600' }}>${calculateTotal()}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                   <span style={{ color: '#6b7280' }}>Shipping</span>
//                   <span style={{ fontWeight: '600' }}>$0.00</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
//                   <span style={{ color: '#6b7280' }}>Tax</span>
//                   <span style={{ fontWeight: '600' }}>$0.00</span>
//                 </div>
                
//                 <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '16px 0' }}></div>
                
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
//                   <span style={{ fontWeight: '600', fontSize: '18px' }}>Total</span>
//                   <span style={{ fontWeight: '600', fontSize: '18px' }}>${calculateTotal()}</span>
//                 </div>
                
//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <button
//                     onClick={handleCancel}
//                     style={{
//                       backgroundColor: 'red',
//                       opacity:'0.8',
//                       color: 'white',
//                       padding: '14px',
//                       borderRadius: '8px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       width: '50%',
//                       fontWeight: '500',
//                       fontSize: '16px',
//                       transition: 'background-color 0.3s ease'
//                     }}
//                     onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
//                     onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'red'}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     style={{
//                       backgroundColor: '#3b82f6',
//                       color: 'white',
//                       padding: '14px',
//                       borderRadius: '8px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       width: '50%',
//                       fontWeight: '500',
//                       fontSize: '16px',
//                       transition: 'background-color 0.3s ease'
//                     }}
//                     onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
//                     onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
//                   >
//                     Proceed to Checkout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;






//New Api
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cart.length > 0 && cart.some(item => !item.image || !item.image.startsWith('http'))) {
        setIsLoading(true);
        setError(null);
        
        try { 
          const response = await fetch('https://api.escuelajs.co/api/v1/products');
          if (!response.ok) throw new Error('Failed to fetch product data');
          
          const products = await response.json();
          
          const productMap = products.reduce((map, product) => {
            map[product.id] = product;
            return map;
          }, {});
          
          setCart(prevCart => 
            prevCart.map(item => ({
              ...item,
              image: productMap[item.id]?.images?.[0] || item.image
            }))
          );
        } catch (err) {
          console.error('Error fetching product details:', err);
          setError('Failed to load product images. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchProductDetails();
  }, [cart.length]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(1, newQuantity) } 
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (isLoading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', textAlign: 'center' }}>
        <p>Loading cart items...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#111827' }}>Your Shopping Cart</h1>
      
      {error && (
        <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '8px', marginBottom: '24px' }}>
          {error}
        </div>
      )}
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <svg style={{ width: '64px', height: '64px', marginBottom: '16px', color: '#d1d5db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '8px' }}>Your cart is empty</p>
          <p style={{ fontSize: '16px', color: '#9ca3af' }}>Start shopping to add items to your cart</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>Cart Items ({cart.length})</h2>
              
              {cart.map((product) => (
                <div key={product.id} style={{ display: 'flex', padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ width: '150px', height: '150px', backgroundColor: '#f9fafb', borderRadius: '8px', overflow: 'hidden', marginRight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb' }}>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>No Image</span>
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: '#111827' }}>{product.name}</h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', color: '#111827' }}>${product.price}</span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button 
                          onClick={() => updateQuantity(product.id, product.quantity - 1)}
                          style={{ 
                            backgroundColor: 'lightgray', 
                            color: 'black',
                            border: 'none', 
                            borderRadius: '4px', 
                            padding: '5px 10px', 
                            marginRight: '8px',
                            fontSize: '24px',
                            cursor: 'pointer',
                          }}
                        >
                          -
                        </button>
                        <span style={{ margin: '0 8px' }}>{product.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          style={{ 
                            backgroundColor: 'lightgray', 
                            color: 'black',
                            border: 'none', 
                            borderRadius: '4px', 
                            padding: '4px 8px', 
                            marginLeft: '8px' ,
                            fontSize: '24px',
                            cursor: 'pointer',
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(product.id)}
                      style={{ 
                        marginTop: '8px', 
                        backgroundColor: '#ef4444', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        padding: '6px 12px', 
                        fontSize: '14px' ,
                        cursor:'pointer', 
                      }}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#111827' }}>Order Summary</h2>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Subtotal</span>
                  <span style={{ fontWeight: '600' }}>${calculateTotal()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Shipping</span>
                  <span style={{ fontWeight: '600' }}>$0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: '#6b7280' }}>Tax</span>
                  <span style={{ fontWeight: '600' }}>$0.00</span>
                </div>
                
                <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '16px 0' }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{ fontWeight: '600', fontSize: '18px' }}>Total</span>
                  <span style={{ fontWeight: '600', fontSize: '18px' }}>${calculateTotal()}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleCancel}
                    style={{ 
                      backgroundColor: 'red',
                      opacity:'0.8',
                      color: 'white',
                      padding: '14px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      width: '50%',
                      fontWeight: '500',
                      fontSize: '16px',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'red'}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '14px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      width: '50%',
                      fontWeight: '500',
                      fontSize: '16px',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
