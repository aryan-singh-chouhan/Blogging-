import React, { useState } from 'react';
import { post } from '../Services/EndPoint';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/AuthSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post('/auth/login', value);
      console.log("Login Success: ", response.data);
      if (response.data.success === true) {
        navigate('/');
        toast.success(response.data.message);
        dispatch(setUser(response.data.user))
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data); // Log server response
      } else {
        console.error("Login Error: ", error);
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-400">
      <div className="h-[350px] w-[350px] bg-gray-300 flex flex-col p-4 rounded-lg shadow-lg">
        {/* Login Form */}
        <div className="flex justify-center items-center px-4">
          <h1 className="py-2 px-4 bg-gray-400 font-semibold text-lg rounded-lg shadow-md">
            Login
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mt-10 p-2 mx-4 bg-gray-400 rounded-md shadow-md"
        >
          <div className="w-full">
            <label>
              <input
                value={value.email}
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-3 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                required
              />
            </label>
          </div>

          <div className="w-full">
            <label>
              <input
                value={value.password}
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-3 bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
                required
              />
            </label>
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black rounded-md cursor-pointer shadow-md"
            >
              <h1 className="text-white font-semibold text-lg">Login</h1>
            </button>
          </div>
        </form>

        <button className="flex justify-end items-center">
          <h6 className="text-xs mr-1">Don't have an account?</h6>
          <Link to={'/register'}>
            <h1 className="text-black underline hover:text-white cursor-pointer">
              Sign Up
            </h1>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
