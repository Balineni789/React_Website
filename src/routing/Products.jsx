
// (Old Api)
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Products.css';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(false);
//   const [cartTimeout, setCartTimeout] = useState(null);
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
//       !document.querySelector('.cart-icon-container:hover')) {
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
       // ? { ...item, quantity: newQuantity }
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
//     navigate(`/products/${product.id}`, { state: { product } });
//   };

//   useEffect(() => {
//     return () => {
//       if (cartTimeout) {
//         clearTimeout(cartTimeout);
//       }
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
//               style={{cursor:'pointer'}}
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








// New Api
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartTimeout, setCartTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=36');   //('https://api.escuelajs.co/api/v1/products');
      const jsonData = await response.json();
      setProducts(jsonData);
      setFilteredProducts(jsonData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category && product.category.name && 
       product.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleCartIconClick = () => {
    setShowCart(true);
    resetCartTimeout();
  };

  const resetCartTimeout = () => {
    if (cartTimeout) {
      clearTimeout(cartTimeout);
    }
    const timeout = setTimeout(() => {
      if (!document.querySelector('.cart-dropdown:hover') && 
          !document.querySelector('.cart-icon-container:hover')) {
        setShowCart(false);
      }
    }, 2000);
    setCartTimeout(timeout);
  };

  const handleCartMouseEnter = () => {
    if (cartTimeout) {
      clearTimeout(cartTimeout);
    }
  };

  const handleCartMouseLeave = () => {
    resetCartTimeout();
  };

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
    resetCartTimeout();
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    resetCartTimeout();
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    resetCartTimeout();
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const openProductDetail = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  useEffect(() => {
    return () => {
      if (cartTimeout) {
        clearTimeout(cartTimeout);
      }
    };
  }, [cartTimeout]);

  return (
    <div className="products-container">
      <header className="products-header">
        <h1 className="products-title">Our Products</h1>
        <div className="search-cart-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{cursor:'pointer'}}
            />
            <span className="search-icon">🔍</span>
          </div>
          <div 
            className="cart-icon-container" 
            onClick={handleCartIconClick}
            onMouseEnter={handleCartMouseEnter}
            onMouseLeave={handleCartMouseLeave}
          >
            <span className="cart-icon">🛒</span>
            {cart.length > 0 && (
              <span className="cart-count">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </header>

      {showCart && (
        <div 
          className="cart-dropdown"
          onMouseEnter={handleCartMouseEnter}
          onMouseLeave={handleCartMouseLeave}
        >
          <h3>Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.images && item.images[0]} alt={item.title} width="40" />
                    <div className="cart-item-details">
                      <span>{item.title.substring(0, 30)}...</span>
                      <span>${item.price} × {item.quantity}</span>
                    </div>
                    <button 
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      × 
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </div>
              <button className="checkout-btn" onClick={goToCartPage}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div 
                className="product-image-container"
                onClick={() => openProductDetail(product)}
              >
                <img 
                  src={product.images && product.images[0]} 
                  alt={product.title} 
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">
                  {product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...` 
                    : product.description}
                </p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <span className="product-category">
                    {product.category && product.category.name}
                  </span>
                </div>
                {isInCart(product.id) ? (
                  <div className="quantity-controls-product">
                    <button 
                      className="quantity-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(product.id, getProductQuantity(product.id) - 1);
                      }}
                    >
                      -
                    </button>
                    <span className="quantity-display">{getProductQuantity(product.id)}</span>
                    <button 
                      className="quantity-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(product.id, getProductQuantity(product.id) + 1);
                      }}
                    >
                      +
                    </button>
                    <button 
                      className="go-to-cart-btn"
                      onClick={goToCartPage}
                    >
                      Go to Cart
                    </button>
                  </div>
                ) : (
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No products match your search. Try different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Products;