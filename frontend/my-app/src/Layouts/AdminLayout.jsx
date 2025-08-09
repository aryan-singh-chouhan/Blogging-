import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import SideBar from '../Components/SideBar';
import { useSelector } from 'react-redux';

function AdminLayout() {
  const user = useSelector((state)=> state.auth.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('/');
    }
    else if(user.role !=='admin'){
      navigate('/')
    }
  },[user, navigate])



  return (
    <div className="flex flex-col bg-gray-300 h-screen pt-16 ">
      <Navbar />
      <div className="flex flex-1 bg-gray-400">
        <SideBar />
        <div className="flex-1 bg-gray-300">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout