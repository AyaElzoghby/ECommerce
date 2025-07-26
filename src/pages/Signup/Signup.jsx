import axios from "axios";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // Validation schema
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be 20 characters or less"),
    email: string()
      .required("Email is required")
      .email("Invalid email address"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must have at least 8 characters, including an uppercase letter, a number, and a special character"
      ),
    rePassword: string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords must match"),
    dateOfBirth: string().required("Date of birth is required"),
    gender: string().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form Values:", values); // Debugging
      const loadingToastID = toast.loading("Waiting...");

      try {
        const response = await axios.post(
          "https://linked-posts.routemisr.com/users/signup",
          values
        );

        if (response.data.message === "success") {
          toast.dismiss(loadingToastID);
          toast.success("User Created Successfully");
          console.log("Navigating to Login...");
          navigate("/");
        } else {
          throw new Error("Unexpected response from server");
        }
      } catch (error) {
        toast.dismiss(loadingToastID);
        toast.error("User creation error",error);
        console.error("Error:", error.response?.data || error.message);
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center my-16 m-auto">
      <div className="container px-4 bg-[#f2f2f2] rounded-md py-8">
        <h1 className="font-semibold font-tbold text-xl text-slate-700 mb-5">
          <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
          Register Now
        </h1>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* Name Input */}
          <div className="username">
            <p className="font-semibold text-sm px-1 text-slate-700 mb-1">
              User Name:
            </p>
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="form-control w-full"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-600">{formik.errors.name}</div>
            )}
          </div>

          {/* Email Input */}
          <div className="email">
            <p className="font-semibold text-sm px-1 text-slate-700 mb-1">
              Email:
            </p>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control w-full"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="password">
            <p className="font-semibold text-sm px-1 text-slate-700 mb-1">
              Password:
            </p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control w-full"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="rePassword">
            <p className="font-semibold text-sm px-1 text-slate-700 mb-1">
              Confirm Password:
            </p>
            <input
              type="password"
              name="rePassword"
              placeholder="Confirm Password"
              className="form-control w-full"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div className="text-red-600">{formik.errors.rePassword}</div>
            )}
          </div>

          {/* Date of Birth Input */}
          <div className="dateOfBirth">
            <p className="font-semibold text-sm px-1 text-slate-700 mb-1">
              Select Date:
            </p>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control w-full"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <div className="text-red-600">{formik.errors.dateOfBirth}</div>
            )}
          </div>

          {/* Gender Select */}
          <div className="gender">
            <p className="font-semibold text-sm px-1 text-slate-700 mb-1">
              Select Gender:
            </p>
            <select
              name="gender"
              className="form-control w-full"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-600">{formik.errors.gender}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn font-semibold bg-mainColor-500 w-full flex justify-center items-center mx-auto rounded-md shadow-md text-white"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

// import axios from "axios";
// import { useFormik } from "formik";
// import { object, string, ref } from "yup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleUser } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const navigate = useNavigate()
//   const passwordRegex =
//     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

//   // Define validation schema
//   const validationSchema = object({
//     name: string()
//       .required("Name is required")
//       .min(3, "Must be at least 3 characters")
//       .max(20, "Must be 20 characters or less"),
//     email: string()
//       .required("Email is required")
//       .email("Invalid email address"),
//     password: string()
//       .required("Password is required")
//       .matches(
//         passwordRegex,
//         "Password must have at least 8 characters, including an uppercase letter, a number, and a special character"
//       ),
//     rePassword: string()
//       .required("Please confirm your password")
//       .oneOf([ref("password")], "Passwords must match"),
//     dateOfBirth: string().required("Date of birth is required"),
//     gender: string().required("Gender is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       dateOfBirth: "",
//       gender: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       console.log("Form Values:", values); // Debugging
//       const loadingToastID=toast.loading("Waitting...")
//       try {
//         const options = {
//           url: "https://linked-posts.routemisr.com/users/signup",
//           method: "POST",
//           data: values,
//         };
//         const response = await axios.request(options);
//         if (response.message==="success"){
//           toast.dismiss(loadingToastID);
//           toast.success("User Created Successfully");
//           setTimeout(()=>{navigate("/Login")},2000)
//         }
//         console.log("Success:", response.data);
//         // Refresh the page after successful submission
//         window.location.reload();
//       } catch (error) {
//         toast.dismiss(loadingToastID);
//         toast.error("User Created error");
//         console.error("Error:", error.response?.data || error.message);
//       }finally{
//         toast.dismiss(loadingToastID);

//       }
//     },
//   });

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center my-16 m-auto">
//         <div className="container px-4 bg-[#f2f2f2] rounded-md py-8">
//           <h1 className="font-semibold font-tbold text-xl text-slate-700 mb-5">
//             <FontAwesomeIcon
//               icon={faCircleUser}
//               className="mr-2"
//             />
//             Register Now
//           </h1>
//           <form className="space-y-4" onSubmit={formik.handleSubmit}>
//             {/* Name Input */}
//             <div className="username">
//               <p className="font-semibold font-tmedium text-sm px-1 text-slate-700 mb-1">User Name : </p>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 placeholder="Username"
//                 className="form-control w-full"
//                 // className="h-12 p-2 rounded-md border-gray-500 focus:outline-none focus:shadow-md w-full font-tmedium focus:border-gray-400 shadow-sm"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//               />
//               {formik.touched.name && formik.errors.name && (
//                 <div className="text-red-600 font-tregular font-normal">
//                   {formik.errors.name}
//                 </div>
//               )}
//             </div>

//             {/* Email Input */}
//             <div className="email">
//             <p className="font-semibold font-tmedium text-sm px-1 text-slate-700 mb-1">Email : </p>

//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="Email Address"
//                 className="form-control w-full"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//               />
//               {formik.touched.email && formik.errors.email && (
//                 <div className="text-red-600 font-tregular font-normal">
//                   {formik.errors.email}
//                 </div>
//               )}
//             </div>

//             {/* Password Input */}
//             <div className="password">
//             <p className="font-semibold font-tmedium text-sm px-1 text-slate-700 mb-1">  Password : </p>

//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Password"
//                 className="form-control w-full"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//               />
//               {formik.touched.password && formik.errors.password && (
//                 <div className="text-red-600 font-tregular font-normal">
//                   {formik.errors.password}
//                 </div>
//               )}
//             </div>

//             {/* Confirm Password Input */}
//             <div className="rePassword">
//             <p className="font-semibold font-tmedium text-sm px-1 text-slate-700 mb-1">Confirm Password : </p>

//               <input
//                 type="password"
//                 name="rePassword"
//                 id="rePassword"
//                 placeholder="Confirm Password"
//                 className="form-control w-full"
//                 value={formik.values.rePassword}
//                 onChange={formik.handleChange}
//               />
//               {formik.touched.rePassword && formik.errors.rePassword && (
//                 <div className="text-red-600 font-tregular font-normal">
//                   {formik.errors.rePassword}
//                 </div>
//               )}
//             </div>

//             {/* Date of Birth Input */}
//             <div className="dateOfBirth">
//             <p className="font-semibold font-tmedium text-sm px-1 text-slate-700 mb-1">Select Date : </p>

//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 id="dateOfBirth"
//                 className="form-control w-full"
//                 value={formik.values.dateOfBirth}
//                 onChange={formik.handleChange}
//               />
//               {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
//                 <div className="text-red-600 font-tregular font-normal">
//                   {formik.errors.dateOfBirth}
//                 </div>
//               )}
//             </div>

//             {/* Gender Select */}
//             <div className="gender">
//             <p className="font-semibold font-tmedium text-sm px-1 text-slate-700 mb-1">Select Gender : </p>

//               <select
//                 name="gender"
//                 id="gender"
//                 className="form-control w-full "
//                 value={formik.values.gender}
//                 onChange={formik.handleChange}
//               >
//                 <option value="" disabled>
//                   Select Gender
//                 </option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//               {formik.touched.gender && formik.errors.gender && (
//                 <div className="text-red-600 font-tregular font-normal">
//                   {formik.errors.gender}
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className=" btn font-tmedium font-semibold bg-mainColor-500 w-full flex justify-center items-center mx-auto rounded-md shadow-md text-white"
//             >
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
