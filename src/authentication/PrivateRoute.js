import { Navigate } from "react-router-dom";
import { useAuthValue } from "./AuthContext";

//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
// in router 6
// Routes takes only JSX code as children
// Routes will just take the props of PrivateRoute and ignore it's
// body totally. Even a console.log inside
// PrivateRoute will not be shown.
// we make changes in App.js also

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuthValue();
  console.log("currUser from private routes: ", currentUser);
  return currentUser?.emailVerified ? children : <Navigate to="/login" />;

  // old code for router 5
  //   return (
  //     <Route
  //       {...rest}
  //       render={(props) => {
  //         return currUser?.emailVerified ? (
  //           <Component {...props} />
  //         ) : (
  //           <Navigate to="/login" />
  //         );
  //       }}
  //     ></Route>
  //   );
};

export default PrivateRoute;
