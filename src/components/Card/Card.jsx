import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";


function Card({productInfo}) {
 const {imageCover, title, price,category ,description ,ratingsAverage ,_id}=productInfo
 const {AddProductToCart}=useContext(CartContext)
  return (
    <>
      <div className="Card group/card rounded-lg overflow-hidden shadow-lg ">
        <div className="relative">
          <img className="object-cover w-full h-full" src={imageCover} alt="" />
          <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 flex gap-4 justify-center items-center absolute w-full h-full bg-slate-400 bg-opacity-40 left-0 top-0 opacity-0 ">
            <div className="icon cursor-pointer w-8 h-8 flex justify-center items-center rounded-full bg-mainColor-400 text-white">
              <i className="fas fa-heart"></i>
            </div>
            <div onClick={()=>{AddProductToCart({productId :_id})}} className="icon cursor-pointer w-8 h-8 flex justify-center items-center rounded-full bg-mainColor-400 text-white">
              <i className="fas fa-cart-shopping"></i>
            </div>
            <Link to={`/ProductDetails/${_id}`} className="icon cursor-pointer w-8 h-8 flex justify-center items-center rounded-full bg-mainColor-400 text-white">
              <i className="fas fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="card-body p-4 space-y-3">
          <header>
            <h3 className="text-lg text-gray-600 font-tmedium line-clamp-1"><Link to={`/ProductDetails/${_id}`}>{title}</Link></h3>
            <h4 className=" text-mainColor-500 font-semibold">{category.name}</h4>
          </header>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center bottom-0">
            <span>{price}L.E</span>
            <div className=" ">
              <i className="fa-star fa-solid text-yellow-400 mr-1"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-8 rounded-t-lg"
            src="/docs/images/products/apple-watch.png"
            alt="product image"
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
            </h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              $599
            </span>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Card;
