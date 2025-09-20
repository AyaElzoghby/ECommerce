import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  //* cash order
  async function createCashOrder(values) {
    const toastId = toast.loading("We are creating your order .......");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Your order has been created");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create order");
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function handelOnlinePayment(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("redirecting you to stripe ........");
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create order");
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) =>
      paymentMethod == "cash"
        ? createCashOrder(values)
        : handelOnlinePayment(values),
  });

  return (
    <section>
      <h1 className="text-lg text-gray-600 font-semibold mb-4">
        Shipping Address
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="city">
          <input
            type="text"
            className="form-control w-full"
            placeholder="city"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            name="shippingAddress.city"
          />
        </div>
        <div className="phone">
          <input
            type="number"
            className="form-control w-full"
            placeholder="phone"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            name="shippingAddress.phone"
          />
        </div>
        <div className="details">
          <textarea
            className="form-control w-full"
            placeholder="details"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            name="shippingAddress.details"
          />
        </div>
        <button
          type="submit"
          onClick={() => setPaymentMethod("cash")}
          className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md mr-2"
        >
          Cash Order
        </button>
        <button
          type="submit"
          onClick={() => setPaymentMethod("online")}
          className="btn bg-mainColor-500 hover:bg-mainColor-600 text-white font-semibold shadow-md mr-2"
        >
          Online Payment
        </button>
      </form>
    </section>
  );
}

export default Checkout;
