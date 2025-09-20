import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);
  async function AddProductToCart({ productId }) {
    let toastId = toast.loading("Adding product.... ");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success(data.message);
      }
      getCartProducts();
      console.log(data);
      console.log("product added seccess");
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function getCartProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
    }
  }
  async function RemoveProductFromCart({ productId }) {
    let toastId = toast.loading("Deleteing product.... ");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        setCartInfo(data);
        toast.success('Product has been deleted');
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
      toast.dismiss(toastId);
    }
  }
  async function ClearCart() {
    let toastId = toast.loading("Deleteing all products.... ");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        setCartInfo({numOfCartItems:0});
        toast.success('Products has been deleted');
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
      toast.dismiss(toastId);
    }
  }
  async function UpdateProductCount({productId , count}) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data:{
          count,
        }
      };
      let { data } = await axios.request(options);
      // if (data.status == "success") {
      //   setCartInfo(data);
      // }
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("done");
    }
  }



  return (
    <CartContext.Provider
      value={{
        AddProductToCart,
        getCartProducts,
        RemoveProductFromCart,
        UpdateProductCount,
        ClearCart,
        cartInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// import axios from "axios";
// import { createContext, useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { UserContext } from "./User.context";

// export const CartContext = createContext(null);

// function CartProvider({ children }) {
//   const { token } = useContext(UserContext);

//   const [numOfCartItems, setNumOfCartItems] = useState(0);
//   const [cartInfo, setCartInfo] = useState(null);
//   const [totalCartPrice, setTotalCartPrice] = useState(0);
//   const [cartProducts, setCartProducts] = useState(null);
//   const [cartId, setCartId] = useState(0);
//   const [loading, setIsLoading] = useState(false);

//   async function getCartProducts() {
//     try {
//       const options = {
//         url: "https://ecommerce.routemisr.com/api/v1/cart",
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await axios.request(options);
//       setCartInfo(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function AddProductToCart({ productId }) {
//     try {
//       const options = {
//         url: "https://ecommerce.routemisr.com/api/v1/cart",
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: { productId },
//       };
//       console.log("Headers sent:", options.headers);

//       console.log("token before request:", token);
//       const { data } = await axios.request(options);
//       toast.success("Product added to cart");
//       await getCartProducts();
//       return data;
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to add product to cart");
//     }
//   }

//   async function UpdateProductCount({ id, count }) {
//     try {
//       const options = {
//         url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: { count },
//       };
//       const { data } = await axios.request(options);
//       setNumOfCartItems(data.numOfCartItems);
//       setTotalCartPrice(data.data.totalCartPrice);
//       setCartProducts(data.data.products);
//       setCartId(data.cartId);
//       toast.success("Product quantity updated");
//       return data;
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update product quantity");
//     }
//   }

//   async function RemoveProductFromCart({ id }) {
//     try {
//       const options = {
//         url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await axios.request(options);
//       setNumOfCartItems(data.numOfCartItems);
//       setTotalCartPrice(data.data.totalCartPrice);
//       setCartProducts(data.data.products);
//       setCartId(data.cartId);
//       toast.success("Product removed from cart");
//       return data;
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to remove product");
//     }
//   }

//   async function ClearCart() {
//     try {
//       const options = {
//         url: "https://ecommerce.routemisr.com/api/v1/cart",
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.request(options);
//       setNumOfCartItems(0);
//       setTotalCartPrice(0);
//       setCartProducts([]);
//       toast.success("Cart cleared");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to clear cart");
//     }
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         token,
//         AddProductToCart,
//         UpdateProductCount,
//         RemoveProductFromCart,
//         ClearCart,
//         numOfCartItems,
//         cartProducts,
//         cartInfo,
//         totalCartPrice,
//         cartId,
//         setCartProducts,
//         setNumOfCartItems,
//         setTotalCartPrice,
//         getCartProducts,
//         loading,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;

// import axios from "axios";
// import { createContext, useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { UserContext } from "./User.context";

// export const CartContext = createContext(null);

// function CartProvider({ children }) {
//   const { token } = useContext(UserContext);
//   const [numOfCartItems, setNumOfCartItems] = useState(0);
//   const [cartInfo, setCartInfo] = useState(null);
//   const [totalCartPrice, setTotalCartPrice] = useState(0);
//   const [cartProducts, setCartProducts] = useState(null);
//   const [cartId, setCartId] = useState(0);
//   const [loading, setIsLoading] = useState(false);

//   const getAuthHeaders = () => ({
//     headers: {
//       token: `${token}`,
//     },
//   });

//   const AddProductToCart = async ({ productId }) => {
//     try {
//       const res = await axios.post(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         { productId },
//         getAuthHeaders()
//       );
//       toast.success("Product added to cart");
//       await getCartProducts();
//       return res.data;
//     } catch (error) {
//       toast.error("Failed to add product to cart");
//       console.error(error);
//     }
//   };

//   async function getCartProducts() {
//     try {
//       const options = {
//         url: "https://ecommerce.routemisr.com/api/v1/cart",
//         method: "GET",
//         headers: {
//           token,
//         },
//       };
//       let { data } = await axios.request(options);
//       setCartInfo(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const UpdateProductCount = async ({ id, count }) => {
//     try {
//       const res = await axios.put(
//         `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//         { count },
//         getAuthHeaders()
//       );
//       const { data } = res.data;
//       setNumOfCartItems(res.data.numOfCartItems);
//       setTotalCartPrice(data.totalCartPrice);
//       setCartProducts(data.products);
//       setCartId(res.data.cartId);
//       toast.success("Product quantity updated");
//       return res.data;
//     } catch (error) {
//       toast.error("Failed to update product quantity");
//       console.error(error);
//     }
//   };

//   const RemoveProductFromCart = async ({ id }) => {
//     try {
//       const res = await axios.delete(
//         `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//         getAuthHeaders()
//       );
//       const { data } = res.data;
//       setNumOfCartItems(res.data.numOfCartItems);
//       setTotalCartPrice(data.totalCartPrice);
//       setCartProducts(data.products);
//       setCartId(res.data.cartId);
//       toast.success("Product removed from cart");
//       return res.data;
//     } catch (error) {
//       toast.error("Failed to remove product");
//       console.error(error);
//     }
//   };

//   const ClearCart = async () => {
//     try {
//       await axios.delete(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         getAuthHeaders()
//       );
//       setNumOfCartItems(0);
//       setTotalCartPrice(0);
//       setCartProducts([]);
//       toast.success("Cart cleared");
//     } catch (error) {
//       toast.error("Failed to clear cart");
//       console.error(error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         token,
//         AddProductToCart,
//         UpdateProductCount,
//         RemoveProductFromCart,
//         ClearCart,
//         numOfCartItems,
//         cartProducts,
//         cartInfo,
//         totalCartPrice,
//         cartId,
//         setCartProducts,
//         setNumOfCartItems,
//         setTotalCartPrice,
//         getCartProducts,
//         loading,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;

// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { UserContext } from "./User.context";

// export const CartContext = createContext(null);

// function CartProvider({ children }) {
//   const { token } = useContext(UserContext);
//   const [numOfCartItems, setNumOfCartItems] = useState(0);
//   const [totalCartPrice, setTotalCartPrice] = useState(0);
//   const [cartProducts, setCartProducts] = useState(null);
//   const [CartId, setCartId] = useState(0);
//   const [loading, setIsLoading] = useState(false);

//   async function AddProductToCart({ productId }) {
//     try {
//       const res = await axios.post(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         { productId: productId },
//         token
//       );
//       toast.success("Product added to cart");
//       getCartProducts();
//       console.log(productId);
//       return res.data;
//     } catch (error) {
//       toast.error("Failed to add product to cart");
//       console.log(error);
//     }
//   }

//   async function getCartProducts() {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         token
//       );
//       setNumOfCartItems(res.data.numOfCartItems);
//       setTotalCartPrice(res.data.data.totalCartPrice);
//       setCartProducts(res.data.data.products);
//       setCartId(res.data.cartId);
//       toast.success("Cart loaded successfully");
//       setIsLoading(false);
//       console.log(res.data, "get cart data");
//       return res.data;
//     } catch (error) {
//       setIsLoading(false);
//       toast.error("Failed to load cart");
//       console.log(error);
//     }
//   }

//   async function UpdateProductCount({ id, count }) {
//     try {
//       const res = await axios.put(
//         `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//         { count: count },
//         token
//       );
//       setNumOfCartItems(res.data.numOfCartItems);
//       setTotalCartPrice(res.data.data.totalCartPrice);
//       setCartProducts(res.data.data.products);
//       setCartId(res.data.cartId);
//       toast.success("Product quantity updated");
//       console.log(res, "updatecount");
//       return res.data;
//     } catch (error) {
//       toast.error("Failed to update product quantity");
//       console.log(error, "updateCount");
//     }
//   }

//   async function RemoveProductFromCart({ id }) {
//     try {
//       const res = await axios.delete(
//         `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//         token
//       );
//       setNumOfCartItems(res.data.numOfCartItems);
//       setTotalCartPrice(res.data.data.totalCartPrice);
//       setCartProducts(res.data.data.products);
//       setCartId(res.data.cartId);
//       toast.success("Product removed from cart");
//       return res.data;
//     } catch (error) {
//       toast.error("Failed to remove product");
//       console.log(error, "remove from cart");
//     }
//   }

//   async function ClearCart() {
//     try {
//       const res = await axios.delete(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         token
//       );
//       setNumOfCartItems(0);
//       setTotalCartPrice(0);
//       setCartProducts([]);
//       toast.success("Cart cleared");
//       return res.data;
//     } catch (error) {
//       toast.error("Failed to clear cart");
//       console.log(error, "clear cart");
//     }
//   }

//   // useEffect(() => {
//   //   if (token) {
//   //     getCartProducts();
//   //   }
//   // }, [token]);

//   return (
//     <CartContext.Provider
//       value={{
//         token,
//         AddProductToCart,
//         UpdateProductCount,
//         RemoveProductFromCart,
//         ClearCart,
//         numOfCartItems,
//         cartProducts,
//         totalCartPrice,
//         CartId,
//         setCartProducts,
//         setNumOfCartItems,
//         setTotalCartPrice,
//         getCartProducts,
//         loading,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;

// // import { data } from "autoprefixer";
// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { UserContext } from "./User.context";
// export const CartContext = createContext(null);
// function CartProvider({ children }) {
//   const {token}= useContext(UserContext)
//   const [numOfCartItems, setNumOfCartItems] = useState(0);
//   const [totalCartPrice, setTotalCartPrice] = useState(0);
//   const [cartProducts, setCartProducts] = useState(null);
//   const [CartId, setCartId] = useState(0);
//   const [loading, setIsLoading] = useState(false);

//   async function AddProductToCart({productId}) {
//     try {
//       const res = await axios.post(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         { productId: productId },
//         token
//       );
//       toast.success("product Added")
//       getCartProducts();
//       console.log(productId);
//       return res.data;
//     } catch (error) {
//             toast.success("product not Added",error)

//       console.log(error);
//     }
//   }
//   async function getCartProducts() {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         token
//       );
//       setNumOfCartItems(res.data.numOfCartItems);
//       setTotalCartPrice(res.data.data.totalCartPrice);
//       setCartProducts(res.data.data.products);
//       setCartId(res.data.cartId);
//       setIsLoading(false);
//       console.log(res.data, "get cart data");
//       return res.data;
//     } catch (error) {
//       setIsLoading(false);
//       console.log(error);
//     }
//   }
//   async function UpdateProductCount({id, count}) {
//     try {
//       const res = await axios.put(
//         `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//         { count: count },
//         token
//       );
//       setNumOfCartItems(res.data.numOfCartItems);
//       setTotalCartPrice(res.data.data.totalCartPrice);
//       setCartProducts(res.data.data.products);
//       setCartId(res.data.cartId);
//       console.log(res, "updatecount");
//       return res.data;
//     } catch (error) {
//       console.log(error, "updateCount");
//     }
//   }
//   async function RemoveProductFromCart({id}) {
//     try {
//       const res = await axios.delete(
//         `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
//         token
//       );
//       setNumOfCartItems(res.data.numOfCartItems);
//       setTotalCartPrice(res.data.data.totalCartPrice);
//       setCartProducts(res.data.data.products);
//       setCartId(res.data.cartId);
//       return res.data;
//     } catch (error) {
//       console.log(error, "remove from cart");
//     }
//   }
//   async function ClearCart() {
//     try {
//       const res = await axios.delete(
//         "https://ecommerce.routemisr.com/api/v1/cart",
//         token
//       );
//       setNumOfCartItems(0);
//       setTotalCartPrice(0);
//       setCartProducts([]);
//       return res.data;
//     } catch (error) {
//       console.log(error, "clear cart");
//     }
//   }
//   useEffect(
//     function () {
//       if (token) {
//         getCartProducts();
//       }
//     },
//     [token]
//   );
//   return (
//     <CartContext.Provider
//       value={{
//         token,
//         AddProductToCart,
//         UpdateProductCount,
//         RemoveProductFromCart,
//         ClearCart,
//         numOfCartItems,
//         cartProducts,
//         totalCartPrice,
//         CartId,
//         setCartProducts,
//         setNumOfCartItems,
//         setTotalCartPrice,
//         getCartProducts,
//         loading,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;
