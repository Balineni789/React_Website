
// (Old Api) 
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './pdp.css';

// const ProductDetail = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const product = state?.product;
//   const [quantity, setQuantity] = useState(1);

//   const handleIncrement = () => setQuantity(prev => prev + 1);
//   const handleDecrement = () => quantity > 1 && setQuantity(prev => prev - 1);

//   const handleAddToCart = () => {
//     alert(Added ${quantity} ${product.title} to cart!);
//   };

//   const handleDelete = () => {
//     alert(Are You Sure Want To Delete ${product.title}!);
//     navigate('/products');
//   }; 

//   if (!product) {
//     return (
//       <div className="product-detail-page">
//         <div className="product-not-found">
//           <p>Product not found</p>
//           <button onClick={() => navigate('/')}>Back to Products</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="product-detail-page">
//       <button className="back-button" onClick={() => navigate(-1)}>
//         ← Back to Products
//       </button>

//       <div className="product-detail-content">
//         <div className="detail-main">
//           <div className="detail-image-container">
//             <img 
//               src={product.image} 
//               alt={product.title} 
//               className="detail-image"
//             />
//           </div>

//           <div className="detail-info">
//             <h2 className="detail-title">{product.title}</h2>
//             <p className="detail-description">{product.description}</p>
//             <div className="detail-meta">
//               <span className="detail-price">${product.price}</span>
//               <span className={detail-rating ${product.rating.rate > 4 ? 'high-rating' : ''}}>
//                 ★ {product.rating.rate} ({product.rating.count} reviews)
//               </span>
//               <span className="detail-category">Category: {product.category}</span>
//             </div>

//             <div className="action-buttons">
//               <div className="quantity-control">
//                 <button onClick={handleDecrement} className="qty-btn">-</button>
//                 <span className="qty-value">{quantity}</span>
//                 <button onClick={handleIncrement} className="qty-btn">+</button>
//               </div>

//               <button 
//                 onClick={handleAddToCart}
//                 className="add-to-cart-btn"
//               >
//                 Add to Cart (${(product.price * quantity).toFixed(2)})
//               </button>

//               <button 
//                 onClick={handleDelete}
//                 className="delete-btn"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



// New Api
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pdp.css';

const ProductDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(prev => prev - 1);
  
  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.title} to cart!`);
  };

  const handleDelete = () => {
    alert(`Are You Sure Want To Delete ${product.title}!`);
    navigate('/products');
  }; 

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-not-found">
          <p>Product not found</p>
          <button onClick={() => navigate('/')}>Back to Products</button>
        </div>
      </div>
    );
  }

  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/400';

  const categoryName = product.category && product.category.name 
    ? product.category.name 
    : 'Uncategorized';

  return (
    <div className="product-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>
      
      <div className="product-detail-content">
        <div className="detail-main">
          <div className="detail-image-container">
            <img 
              src={productImage} 
              alt={product.title} 
              className="detail-image"
            />
          </div>
          
          <div className="detail-info">
            <h2 className="detail-title">{product.title}</h2>
            <p className="detail-description">{product.description}</p>
            <div className="detail-meta">
              <span className="detail-price">${product.price}</span>
              
              {product.rating && (
                <span className={`detail-rating ${product.rating.rate > 4 ? 'high-rating' : ''}`}>
                  ★ {product.rating.rate} ({product.rating.count} reviews)
                </span>
              )}
              
              <span className="detail-category">Category: {categoryName}</span>
            </div>

            <div className="action-buttons">
              <div className="quantity-control">
                <button onClick={handleDecrement} className="qty-btn">-</button>
                <span className="qty-value">{quantity}</span>
                <button onClick={handleIncrement} className="qty-btn">+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="add-to-cart-btn"
              >
                Add to Cart (${(product.price * quantity).toFixed(2)})
              </button>
              
              <button 
                onClick={handleDelete}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;