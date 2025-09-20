import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User.context";

export default function Cart() {
  const { token } = useContext(UserContext);
  const { getCartProducts, ClearCart, cartInfo } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []);

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

          {cartInfo.numOfCartItems === 0 ? (
            <div className="mt-6 bg-gray-100 p-5 rounded-md shadow-lg flex flex-col gap-6 items-center justify-center">
              <h2 className="text-center">
                Oops! Your cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </h2>
              <Link
                to="/"
                className="btn bg-mainColor-600 hover:bg-mainColor-500 transition-colors shadow-md border-[0.5px] duration-300 text-white hover:text-gray-50"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mt-6">
                {cartInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="flex justify-between items-center mt-5">
                <p className="text-xl flex gap-2 items-center font-semibold text-gray-600 ">
                  <div className="rounded-md border-[0.5px] shadow-md w-8 h-8 flex  bg-mainColor-600 justify-center">
                    <i className="fa-solid fa-dollar-sign m-auto text-xl  text-white"></i>{" "}
                  </div>
                  Your Total Cart Price{" "}
                  <span className="text-mainColor-600">
                    {cartInfo.data.totalCartPrice} L.E
                  </span>
                </p>
                <button
                  onClick={() => ClearCart()}
                  type="button"
                  className="bg-red-500 btn hover:bg-red-600 shadow-md text-base border-[0.5px] font-semibold text-white"
                >
                  <i className="fa-solid fa-trash mr-2"></i> Clear cart
                </button>
              </div>
              <div className=" my-2 w-full flex">
                <Link to="/Checkout" className="w-full btn inline-block  bg-mainColor-600 py-2 rounded-md border-[0.5px] shadow-md text-center text-white font-tmedium hover:text-gray-100 hover:bg-mainColor-500 ">
                  {" "}
                  Next Step{" "}
                </Link>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
