import axios from "axios";
import { useFormik } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";

export default function Login() {
  const navigate = useNavigate();
  let { saveToken } = useContext(UserContext);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = object({
    email: string()
      .required("Email is required")
      .email("Invalid email address"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must have at least 8 characters, including an uppercase letter, a number, and a special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const loadingToastID = toast.loading("Waiting...");

      try {
        const response = await axios.post("https://linked-posts.routemisr.com/users/signin", values);
        
        if (response.data.message === "success") {
          const userToken = response.data.token; // ✅ Correct way to get token
          
          if (!userToken) {
            throw new Error("Token is missing in response");
          }

          localStorage.setItem("token", userToken);
          saveToken(userToken);

          toast.dismiss(loadingToastID);
          toast.success("User Logged in Successfully");

          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          throw new Error("Unexpected response from server");
        }

      } catch (error) {
        toast.dismiss(loadingToastID);
        console.error("Login Error:", error.response?.data || error.message);
        toast.error("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center my-16">
        <div className="container px-12 py-14 bg-[#f2f2f2] space-y-12 rounded-md m-auto py-8">
          <p className="font-semibold font-tbold text-2xl text-center text-mainColor-900 mb-5">
            Login
          </p>
          <form className="space-y-11" onSubmit={formik.handleSubmit}>
            <div className="email">
              <p className="font-tbold mb-2 px-1 text-mainColor-900 font-bold">
                Email Address
              </p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="form-control w-full"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 font-tregular font-normal">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="password">
              <p className="font-tbold mb-2 px-1 text-mainColor-900 font-bold">
                Password
              </p>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="form-control w-full"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 font-tregular font-normal">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn font-semibold bg-mainColor-500 hover:bg-mainColor-400 w-full flex justify-center items-center mx-auto rounded-md shadow-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
