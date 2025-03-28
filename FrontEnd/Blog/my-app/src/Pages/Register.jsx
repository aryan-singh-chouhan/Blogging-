import React, { useState } from 'react';
import { post } from '../Services/EndPoint.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../Redux/AuthSlice.js'

const Register = () => {

  const [formData, setFormData] = useState({
    email: "",
    FullName: "",
    password: "",
    profile: null
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      console.log("Selected File:", e.target.files[0]); 
      setFormData((prevData) => ({ ...prevData, profile: e.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("email", formData.email);
    userData.append("FullName", formData.FullName);
    userData.append("password", formData.password);
    userData.append("profile", formData.profile);

    for (let [key, value] of userData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      dispatch(registerStart());
      const response = await post("/auth/register", userData);
      console.log("register Success: ", response.data);
      dispatch(registerSuccess(response.data));
      navigate("/login");
    } catch (error) {
      dispatch(registerFailure(error.response?.data || "Something went wrong"));
    }
  };


  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-400">
      <div className="h-[400px] w-[350px] bg-gray-300 flex flex-col p-4 rounded-lg shadow-lg">
        {/* Signup Form */}
        <div className="flex justify-center items-center px-4">
          <h1 className="py-2 px-4 bg-gray-400 font-semibold text-lg rounded-lg shadow-md">
            Sign Up
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-10 p-2 mx-4 bg-gray-400 rounded-md shadow-md">
          <div className="w-full">
            <label>
              <input
                type="email"
                name='email'
                placeholder="Email"
                className="w-full px-4 py-2 mb-3 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="w-full">
            <label>
              <input
                type="text"
                name='FullName'
                placeholder="Full Name"
                className="w-full px-4 py-2 mb-3 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="w-full">
            <label>
              <input
                type="password"
                name='password'
                placeholder="Password"
                className="w-full px-4 py-2 mb-3 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="w-full">
            <label>
              <input
                type="file"
                name="profile"
                className="w-full px-4 py-2 bg-gray-300 rounded-md"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black rounded-md cursor-pointer shadow-md"
            >
              <h1 className="text-white font-semibold text-lg">Sign Up</h1>
            </button>
          </div>
        </form>

        <button className="flex justify-end items-center">
          <Link to={'/login'}>
            <h1 className="text-black underline hover:text-white cursor-pointer">
              Login
            </h1>
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Register