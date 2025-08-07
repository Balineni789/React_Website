
// import { useRouteError, useNavigate } from 'react-router-dom';

// export default function ErrorPage() {
//   const error = useRouteError();
//   const navigate = useNavigate();

//   return (
//     <div className="error-page">
//       <h1>Oops!</h1>
//       <p>Sorry, an unexpected error occurred.</p>
//       <p>{error.statusText || error.message}</p>
//       <button onClick={() => navigate('/')}>Return Home</button>
//     </div>
//   );
// }




import { useRouteError, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error occurred.</p>
      <p>{error.statusText || error.message}</p>
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
}
