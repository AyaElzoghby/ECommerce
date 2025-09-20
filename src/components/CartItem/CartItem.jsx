import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;
  const { RemoveProductFromCart, UpdateProductCount } = useContext(CartContext);

  return (
    <div className="flex gap-4">
      <div className="cart-item shadow-md bg-gray-100 py-2 px-6 rounded-lg grid grid-cols-12 flex-grow justify-between items-center">
        <img
          className="w-20 h-20 object-cover col-span-2 rounded-md border-4 border-white"
          src={imageCover}
          alt={title}
        />
        <div className="col-span-6">
          <h3 className="text-lg text-gray-700 font-semibold">
            <Link to={`/ProductDetails/${id}`}>{title}</Link>
          </h3>
          <h4 className="text-gray-500 font-semibold">{category.name}</h4>
        </div>

        <div className="count m-auto col-span-2 flex items-center gap-5">
          <span className="text-xl font-bold text-gray-600">{count}</span>
          <div className="icons space-y-3">
            <div
              onClick={() =>
                UpdateProductCount({ productId: id, count: count + 1 })
              }
              className="plus w-6 h-6 rounded-md bg-gray-700 text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-plus"></i>
            </div>
            <div
              onClick={() => {
                if (count > 1) {
                  UpdateProductCount({ productId: id, count: count - 1 });
                }
              }}
              className="minus w-6 h-6 rounded-md bg-gray-700 text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-minus"></i>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between col-span-2">
          <span className=" font-bold text-gray-500">{price} L.E</span>
          <button
            onClick={() => RemoveProductFromCart({ productId: id })}
            type="button"
            className="rounded-md text-white w-10 h-10 bg-red-500 hover:bg-red-400 transition-colors duration-300"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

// import { useContext } from "react";
// import { CartContext } from "../../context/Cart.context";
// import { Link } from "react-router-dom";

// export default function CartItem({productInfo}) {
//     const{count,price ,product}=productInfo;
//     const{title,imageCover ,category,id}=product;
//     const{RemoveCartFromProducts,updateProductCount}=useContext(CartContext)
//   return (
//     <>
//     <div className="flex gap-4">

//       <div className="cart-item bg-gray-100 py-4 px-6 rounded-lg flex flex-grow justify-between items-center">
//         <img className="w-24 h-24 object-cover rounded-full border-4 border-white" src={imageCover} alt={title} />

//         <h3 className="text-lg text-gray-700 font-semibold"><Link to={`/ProductDetails/${id}`}>{title}</Link> </h3>
//         <h4 className=" text-gray-500 font-semibold" >{category}</h4>
//         <div className="count flex items-center gap-5">
//           <span className="text-xl font-tbold text-gray-600">{count}</span>
//           <div className="icons space-y-3">
//             <div onClick={()=>{updateProductCount({productId :id ,count: count + 1 })}} className="plus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer ">
//               <i className="fa-solid fa-plus"></i>
//             </div>
//             <div onClick={()=>{updateProductCount({productId :id ,count: count - 1 })}} className="minus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer ">
//               <i className="fa-solid fa-minus"></i>
//             </div>

//           </div>
//         </div>
//         <span>{price}L.E</span>
//       </div>
//       <button
//       onClick={()=>{RemoveCartFromProducts({productId:id})}}
//       type="button" className="rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ">
//         <i className="fa-solid fa-xmark"></i>
//       </button>
//     </div>
//     </>
//   );
// }
