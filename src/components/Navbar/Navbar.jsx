import freshCart from "../../assets/images/freshcart-logo.svg";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faTiktok,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faSpinner,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";

export default function Navbar() {
  const { token, clearToken } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);

  // Fetch cart data whenever token changes or when the component mounts
  useEffect(() => {
    if (token) {
      getCartProducts(); // Fetch the cart when logged in
    }
  }, [token, getCartProducts]); // Depend on token to refetch cart if user logs in

  return (
    <nav className="bg-slate-100 py-2 shadow px-40 fixed top-0 right-0 left-0 z-50">
      <div className="justify-center flex items-center gap-8 py-1 px-2">
        <NavLink to="">
          <img src={freshCart} alt="freshCart" />
        </NavLink>

        {/* Render Navigation Links only when user is logged in */}
        {token && (
          <>
            <ul className="flex gap-2">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative before:absolute before:w-0 before:h-0.5 before:bg-mainColor-500 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-tmedium" : ""}`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative before:absolute before:w-0 before:h-0.5 before:bg-mainColor-500 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-tmedium" : ""}`
                  }
                  to="/Cart"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative before:absolute before:w-0 before:h-0.5 before:bg-mainColor-500 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-tmedium" : ""}`
                  }
                  to="/Products"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative before:absolute before:w-0 before:h-0.5 before:bg-mainColor-500 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-tmedium" : ""}`
                  }
                  to="/Categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative before:absolute before:w-0 before:h-0.5 before:bg-mainColor-500 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-tmedium" : ""}`
                  }
                  to="/Brands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative before:absolute before:w-0 before:h-0.5 before:bg-mainColor-500 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${isActive ? "before:!w-full font-tmedium" : ""}`
                  }
                  to="/Orders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>

            {/* Shopping Cart */}
            <Link to={"/Cart"} className="cart relative ml-auto cursor-pointer text-lg">
              <FontAwesomeIcon icon={faCartShopping} />
              <div className="cart-counter absolute right-0 top-0 rounded-xl h-4 w-4 flex items-center justify-center bg-mainColor-500 text-white translate-x-1/2 -translate-y-1/2">
                {cartInfo ? (
                  <span className="text-sm font-tmedium">
                    {cartInfo.numOfCartItems}
                  </span>
                ) : (
                  <FontAwesomeIcon icon={faSpinner} spin className="text-sm" />
                )}
              </div>
            </Link>
          </>
        )}

        {/* Social Media Links (always visible) */}
        <ul className={`flex gap-5 ${!token && "ms-auto"}`}>
          <li>
            <NavLink to="https://instagram.com">
              <FontAwesomeIcon icon={faInstagram} />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://facebook.com">
              <FontAwesomeIcon icon={faFacebook} />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://tiktok.com">
              <FontAwesomeIcon icon={faTiktok} />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://twitter.com">
              <FontAwesomeIcon icon={faTwitter} />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://linkedin.com">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://youtube.com">
              <FontAwesomeIcon icon={faYoutube} />
            </NavLink>
          </li>
        </ul>

        {/* Authentication Links */}
        <ul className="flex gap-5">
          {!token ? (
            <>
              <li>
                <NavLink to="/SignUp">Sign up</NavLink>
              </li>
              <li>
                <NavLink to="/Login">Login</NavLink>
              </li>
            </>
          ) : (
            <li onClick={clearToken}>
              <NavLink to="">
                <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}