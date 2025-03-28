import React, { useState } from 'react';
import {get} from '../Services/EndPoint.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {BaseURL} from '../Services/EndPoint.js';
import { removeUser } from '../Redux/AuthSlice.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state)=>state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const response = await get('/auth/logout');
      const data = response.data
      console.log(data);
      if(data.success === true){
        navigate('/');
        dispatch(removeUser())
        console.log("that's work")
      }
    } catch (error) {
      console.log("logout error: ",error)
    }
  }
  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-50 bg-gray-300">
      <div className='py-4 px-6 h-16 flex justify-between items-center max-w-7xl mx-auto'>
        <div>
          <Link to='/'><h1 className='text-lg font-bold'>Blogers</h1></Link>
        </div>

        {!user ? (
          <Link to={'/login'}>
            <button className='px-4 py-2 border rounded-md font-semibold'>Sign In</button>
          </Link>
        ) : (
          <div className='relative'>
            <button className='p-2' onClick={() => setIsOpen(!isOpen)}>
              <img src={`${BaseURL}/image/${user?.profile}`} className='h-[40px] w-[40px] border rounded-full' />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-300 border border-gray-700 rounded-lg shadow-lg">
                <ul className="text-black">
                  { user.role=='admin' ? <li className="px-4 py-2 hover:bg-gray-400 cursor-pointer">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  </li>:""}
                  <li className="px-4 py-2 hover:bg-gray-400 cursor-pointer">
                    <Link to="/profile/123" onClick={() => setIsOpen(false)}>Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-red-600 hover:text-white text-red-600 cursor-pointer">
                    <button onClick={() => {setIsOpen(false); handleLogOut()}}>Sign Out</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;