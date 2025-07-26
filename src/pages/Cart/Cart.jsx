import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User.context";

export default function Cart() {
  // const {token} = useContext(UserContext);
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdhMWI5YmE4MDNmNzZiZjAwOTg0ZThhIiwiaWF0IjoxNzUwMzU4MTM0fQ.FnteI95XnEx4P97MvGwHm8oA-pkpJmEY4wMsdJhp_BE"
  const {
    getCartProducts,
    ClearCart,
    numOfCartItems,
    cartProducts,
    cartInfo,
    totalCartPrice,
  } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, [token]);

  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section>
          <div className="flex gap-4 items-center mb-6">
            <i className="fa-brands fa-opencart text-3xl"></i>
            <h2 className="text-xl text-slate-600 pl-4 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">
              Your shopping cart
            </h2>
          </div>

          {cartInfo.numOfCartItems === 0 || cartProducts.length === 0 ? (
            <div className="mt-6 bg-gray-100 p-5 rounded-md shadow-lg flex flex-col gap-6 items-center justify-center">
              <h2>
                Oops! Your cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </h2>
              <Link
                to="/"
                className="btn bg-mainColor-600 hover:bg-mainColor-700 transition-colors duration-300 text-white"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartProducts.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="flex justify-between items-center mt-5">
                <p className="text-xl">
                  <i className="fa-solid fa-dollar-sign text-xl mr-2 text-mainColor-600"></i>{" "}
                  Your Total Cart Price{" "}
                  <span className="text-mainColor-600">
                    {totalCartPrice} L.E
                  </span>
                </p>
                <button
                  onClick={ClearCart}
                  type="button"
                  className="bg-red-500 btn hover:bg-red-600 text-white"
                >
                  <i className="fa-solid fa-trash mr-2"></i> Clear cart
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}

// import { useContext, useEffect } from "react";
// import { CartContext } from "../../context/Cart.context";
// import Loading from "../../components/Loading/Loading";
// import CartItem from "../../components/CartItem/CartItem";
// import { Link } from "react-router-dom";

// export default function Cart() {
//   const { getCartProducts, CartInfo, ClearCart } = useContext(CartContext);

//   useEffect(() => {
//     getCartProducts();
//   }, []);

//   return (
//     <>
//       {/* {!CartInfo || !CartInfo.products ? (
//         <Loading />
//       ) : ( */}
//         <section>
//           <div className="flex gap-4 items-center mb-6">
//             <i className="fa-brands fa-opencart text-3xl"></i>
//             <h2 className="text-xl text-slate-600 pl-4 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">
//               Your shopping cart
//             </h2>
//           </div>
//           {CartInfo.numOfCartItems === 0 || CartInfo.products.length === 0 ? (
//             <div className="mt-6 bg-gray-100 p-5 rounded-md shadow-lg flex flex-col gap-6 items-center justify-center">
//               <h2>
//                 Oops! Your cart is empty. Start shopping now by clicking the
//                 button below and find something you love!
//               </h2>
//               <Link
//                 to="/"
//                 type="button"
//                 className="btn bg-mainColor-600 hover:bg-mainColor-700 transition-colors duration-300 text-white"
//               >
//                 Back to Home
//               </Link>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 {CartInfo.products.map((product) => (
//                   <CartItem key={product._id} productInfo={product} />
//                 ))}
//               </div>
//               <div className="flex justify-between items-center mt-5">
//                 <p className="text-xl">
//                   <i className="fa-solid fa-dollar-sign text-xl mr-2 text-mainColor-600"></i>{" "}
//                   Your Total Cart Price{" "}
//                   <span className="text-mainColor-600">
//                     {CartInfo.totalCartPrice} L.E
//                   </span>
//                 </p>
//                 <button
//                   onClick={ClearCart}
//                   type="button"
//                   className="bg-red-500 btn hover:bg-red-600 text-white"
//                 >
//                   <i className="fa-solid fa-trash mr-2"></i> Clear cart
//                 </button>
//               </div>
//             </>
//           )}
//         </section>
//       {/* )} */}
//     </>
//   );
// }
