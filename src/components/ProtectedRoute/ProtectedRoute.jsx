import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";
// import Login from "../../pages/Login/Login";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import Signup from "../../pages/Signup/Signup";
function ProtectedRoute({ children }) {
  const { token, loading } = useContext(UserContext);
  // const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (token) {
    return children
  } else {
    return <Navigate to="/Login"/>;
  }
}

export default ProtectedRoute;

// import Login from "../../auth/Login";
// import GuestRoute from "../GuestRoute/GuestRoute";

// function ProtectedRoute({ children }) {
//   if (localStorage.getItem("token") == null) {
//     return (
//       <>
//         <GuestRoute/>
//       </>
//     );
//   } else {
//     return <>{children}</>;
//   }
// }

// export default ProtectedRoute;
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { UserContext } from "../../context/User.context";

// function ProtectedRoute({ children }) {
//   const { token, loading } = useContext(UserContext);

//   // If loading, you might want to show a loader or nothing
//   if (loading) {
//     return <div>Loading...</div>; // You can adjust this to a loader component
//   }

//   if (token) {
//     return children; // User is authenticated
//   } else {
//     return <Navigate to="/Login" />; // Redirect to Login if not authenticated
//   }
// }

// export default ProtectedRoute;
