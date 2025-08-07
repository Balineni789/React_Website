

// import React, { useState, useEffect } from 'react';(All Products)

// const Products = () => {
  
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     const response = await fetch('https://fakestoreapi.com/products');
//     const jsonData = await response.json();
//     setProducts(jsonData); 
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h1>Products</h1>
     
//       {products.length > 0 ? (
//         <div className="product-list">
//           {products.map((product) => (
//             <div key={product.id} className="product">
//               <img src={product.image} alt={product.title} width={150} />
//               <h3>{product.title}</h3>
//               <p>{product.description}</p>
//               <p><strong>Price:</strong> ${product.price}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading products...</p>
//       )}
//     </div>
//   );
// };

// export default Products;






// import React, { useState, useEffect } from 'react';(One Product)

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     const response = await fetch('https://fakestoreapi.com/products');
//     const jsonData = await response.json();
//     setProducts(jsonData); 
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h1>Products</h1>
//       {products.length > 0 ? (
//         <div className="product">
//           <img
//             src={products[2].image}
//             alt={products[2].title}
//             width={200}
//           />
//           <h3>{products[2].title}</h3>
//           <p>{products[2].description}</p>
//           <p><strong>Price:</strong> ${products[0].price}</p>
//         </div>
//       ) : (
//         <p>Loading product...</p>
//       )}
//     </div>
//   );
// };

// export default Products;
