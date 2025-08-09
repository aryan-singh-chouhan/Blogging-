import React from 'react';
import { MdDashboard } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { HiWallet } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="flex h-auto min-h-screen">
      {/* Sidebar (Black) */}
      <div className="w-64 bg-gray-400 text-white p-4 h-screen">
        <ul>

          <Link to={'/dashboard'} >
            <li className='flex justify-start items-center gap-2 px-13 py-3 rounded-lg font-semibold shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] cursor-pointer mb-3'>
              <MdDashboard size={25} />
              <h1>DashBoard</h1>
            </li>
          </Link>

          <Link to={'/dashboard/addpost'} >
            <li className='flex justify-start items-center gap-2 px-13 py-3 rounded-lg font-semibold shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] cursor-pointer mb-3'>
              <MdOutlineAddBox size={25} />
              <h1>Add Post</h1>
            </li>
          </Link>

          <Link to={'/dashboard/getuser'} >
            <li className='flex justify-start items-center gap-2 px-13 py-3 rounded-lg font-semibold shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] cursor-pointer mb-3'>
              <FaUsers size={25} />
              <h1>All Users</h1>
            </li>
          </Link>
          
          <Link to={'/dashboard/allpost'} >
            <li className='flex justify-start items-center gap-2 px-13 py-3 rounded-lg font-semibold shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] cursor-pointer mb-3'>
              <HiWallet size={25} />
              <h1>All Posts</h1>
            </li>
          </Link>

        </ul>
      </div>
    </div>
  );
};

export default SideBar;
