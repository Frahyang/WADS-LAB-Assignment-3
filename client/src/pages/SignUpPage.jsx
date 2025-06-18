import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";
import { useDispatch, useSelector } from "react-redux";
import { reset, signup } from "../features/auth/authSlice";
import { Navigate, Link } from "react-router";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    personal_id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { personal_id, name, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, isLoggedOut, message } =
    useSelector((state) => state.auth);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup({ personal_id, name, email, password, confirmPassword }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && user) {
      toast.success("Signup successful!");
    }
  }, [user, isSuccess, isError, message, dispatch]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-success loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {user && isLoggedOut === false ? (
        <Navigate to="/" />
      ) : (
        <>
          <NavbarComponent />
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-lg text-green-800 font-semibold mb-4">
              Sign up for an account!
            </h1>
            <form className="flex flex-col gap-3 w-80" onSubmit={handleSignup}>
              <input
                type="text"
                name="personal_id"
                value={personal_id}
                onChange={onChange}
                placeholder="Personal ID"
                autoComplete="off"
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Name"
                autoComplete="name"
                className="border p-2 rounded-md"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                autoComplete="email"
                className="border p-2 rounded-md"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                autoComplete="new-password"
                className="border p-2 rounded-md"
              />
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm Password"
                autoComplete="new-password"
                className="border p-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </form>
            <p>Already have an account? <Link to="/signin" style={{ textDecoration: "underline" }}>Sign In!</Link></p>
          </div>
        </>
      )}
    </>
  );
};

export default SignUpPage;
