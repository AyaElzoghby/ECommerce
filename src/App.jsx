import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Layout from "./Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProvider from "./context/User.context";
import CartProvider from "./context/Cart.context";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import GuestRoute from "./components/GuestRoute/GuestRoute";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "Checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "ProductDetails/:id", element: <ProductDetails /> },
      ],
    },
    {
      path: "/",
 element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),      children: [
        { path: "/Login", element: <Login /> },
        { path: "Signup", element: <Signup /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
      <Toaster position="top-right" />
    </>
  );
}
