
// import * as React from "react";
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Home from "./routing/Home";
// import NavBar from "./routing/NavBar";
// import Products from "./routing/Products";
// import About from "./routing/About";
// import Employees from "./routing/Employees";
// import Login from "./routing/Login";
// import ProtectedRoute from "./routing/ProtectedRoute";
// import CartPage from "./routing/CartPage"; 
// import ProductDetail from "./routing/Pdp";


// const Layout = () => { 
//   return (
//     <>
//       <NavBar />
//       <Outlet />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/login", 
//     element: <Login />,
//   },
//   {
//     path: "/",
//     element: <ProtectedRoute />, 
//     children: [
//       {
//         path: "/",
//         element: <Layout />,
//         children: [
//           {
//             path: "/",
//             element: <Home />,
//           },
//           {
//             path: "/products",
//             element: <Products />,
//           },
//           {
//             path: "/cart", 
//             element: <CartPage />,
//           },
//           {
//             path: "/about",
//             element: <About />,
//           },
//           {
//             path: "/employees",
//             element: <Employees />,
//           },
//           {
//             path: "/productdetail",
//             element: <ProductDetail/>,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;




import * as React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./routing/Home";
import NavBar from "./routing/NavBar";
import Products from "./routing/Products";
import About from "./routing/About";
import Employees from "./routing/Employees";
import Login from "./routing/Login";
import ProtectedRoute from "./routing/ProtectedRoute";
import CartPage from "./routing/CartPage"; 
import ProductDetail from "./routing/Pdp";
import ErrorPage from "./routing/ErrorPage"; 

const Layout = () => { 
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/login", 
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/:id", 
            element: <ProductDetail />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/cart", 
            element: <CartPage />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/employees",
            element: <Employees />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;