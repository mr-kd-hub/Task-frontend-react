import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AppDispatch } from "../redux/store";
import { registerAction } from "../redux/actions/actions";

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      error: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email is required"),
      password: yup.string().required("Passwors is required"),
    }),
    onSubmit: async (values, { resetForm, setValues }) => {
      const status = await dispatch(registerAction({ ...values }));
      if (status === 200) {
        navigate("/");
        resetForm();
      }
      setValues({ ...values, error: "Already register" });
    },
  });
  const { values, handleChange, handleSubmit, handleBlur } = formik;
  const { email, password, error } = values;
  return (
    <div className="flex justify-center p-10 items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center justify-center"
      >
        <h1>Register</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
          onBlur={handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
          onBlur={handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Register
        </button>
        <Link to="/login">Login</Link>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
