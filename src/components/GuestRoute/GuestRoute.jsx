import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";

function GuestRoute({ children }) {
  const { token, loading } = useContext(UserContext);
// const navigate = useNavigation()
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
     return children
  } else {
    return <Navigate to="/"/>;
  }
}

export default GuestRoute;

// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { UserContext } from "../../context/User.context";
// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// function GuestRoute({ children }) {
//   const { token, loading } = useContext(UserContext);

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   if (!token) {
//     return children;
//   } else {
//     return <ProtectedRoute/>;
//   }
// }

// export default GuestRoute;