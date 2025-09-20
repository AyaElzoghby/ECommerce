import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

export default function Orders() {
  const { token } = useContext(UserContext);
  const { id } = jwtDecode(token);
  const [orders, setOrders] = useState();
  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setOrders(data);
  }
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
      {orders ? (
        <section>
          {orders.map((order) => (
            <div
              key={order.id}
              className="order border-[0.5px] border-gray-200 m-4 rounded-md p-4 shadow-md"
            >
              <header className="flex items-center justify-between">
                <div className="">
                  <h2 className="text-gray-500">Order ID</h2>
                  <span className="text-lg font-tmedium text-gray-700">
                    #{order.id}
                  </span>
                </div>
                <div className="flex gap-4">
                  {order.isPaid ? (
                    <span className="inline-block px-3 py-1 font-semibold text-white bg-mainColor-600 rounded-md shadow border-[0.5px]">
                      تم الدفع
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 font-semibold text-white bg-red-600 rounded-md shadow border-[0.5px]">
                      غير مدفوع
                    </span>
                  )}
                  {order.isDelivered ? (
                    <span className="inline-block px-3 py-1 font-semibold text-white bg-mainColor-600 rounded-md shadow border-[0.5px]">
                      تم الاستلام
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 font-semibold text-white bg-blue-600 rounded-md shadow border-[0.5px]">
                      قيد التوصيل
                    </span>
                  )}
                </div>
              </header>

              <div className="flex gap-4 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {order.cartItems.map((product) => (
                  <div
                    key={product._id}
                    className="product-item overflow-hidden border-[0.5px] border-gray-200 shadow rounded-md "
                  >
                    <img
                      src={product.product.imageCover}
                      alt=""
                      className="w-full"
                    />
                    <div className="p-2">
                      <h3 className="text-lg font-semibold line-clamp-2" >
                       <Link to={`/ProductDetails/${product.product.id}`}>{product.product.title}</Link> 
                      </h3>
                      <div className="flex justify-between items-center">
                        <p>
                          <span className="font-semibold">Count :</span>{" "}
                          {product.count}
                        </p>
                        <span className="">{product.price} L.E</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-gray-500 font-tbold  font-bold"> Your total order price is : <span className="text-mainColor-500 mx-1"> {order.totalOrderPrice}</span>L.E</p>
            </div>
          ))}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
