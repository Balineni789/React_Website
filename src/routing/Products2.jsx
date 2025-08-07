
// import React, { useEffect, useState } from 'react'; //(TailwindCss-Styling)
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProduct = async () => {
//     try {
//       const response = await fetch('https://fakestoreapi.com/products');
//       const jsonData = await response.json();
//       setProducts(jsonData);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   return (
//     <div className="container py-4 mt-3">
//       <h1 className="text-center mb-4">Our Products</h1>
      
//       {loading ? (
//         <div className="text-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-2">Loading Products...</p>
//         </div>
//       ) : (
//         <div className="row row-cols-1 row-cols-md-3 g-4">
//           {products.map((product) => (
//             <div key={product.id} className="col">
//               <div 
//                 className="card h-100 transition-all"
//                 style={{
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                   transform: 'translateY(0)'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
//                   e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                   e.currentTarget.style.boxShadow = '';
//                 }}
//               >
//                 <div className="card-img-top p-3 bg-light d-flex justify-content-center" style={{ height: '200px' }}>
//                   <img 
//                     src={product.image} 
//                     alt={product.title} 
//                     className="img-fluid object-fit-contain transition-transform"
//                     style={{ transition: 'transform 0.3s ease', cursor:'pointer'}}
//                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                   />
//                 </div>
//                 <div className="card-body">
//                   <h5 className="card-title">{product.title}</h5>
//                   <p className="card-text text-truncate">{product.description}</p>
//                 </div>
//                 <div className="card-footer bg-white">
//                   <p className="h5 text-primary mb-0">${product.price}</p>
//                   <button 
//                     className="btn btn-primary mt-2 transition-all"
//                     style={{
//                       transition: 'all 0.3s ease',
//                       transform: 'scale(1)'
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;
