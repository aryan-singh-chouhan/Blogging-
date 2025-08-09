import React, { useEffect, useState } from 'react';
import {get} from '../../Services/EndPoint.js';

const Dashboard = () => {
  const [post,setPost] = useState([]);
  const [users,setUsers] = useState([]);
  const [comments,setComments] = useState([]);
  useEffect(()=>{
    const getData = async()=>{
      try {
        const response = await get('/dashboard');
        const data = response.data
        setPost(data.Posts)
        setUsers(data.Users)
        setComments(data.Comments)
        console.log("amin data: ",data)
      } catch (error) {
        console.log("admin error: ",error)
      }
    }
    getData();
  },[]);
  return (
    <div className='h-screen w-full bg-gray-300 text-white flex flex-col gap-10 items-center font-bold text-xl'>

      <div className='h-15 w-40 bg-gray-400 flex justify-center items-center p-4 rounded-lg shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] mt-3'>
        <h1 className='font-bold text-2xl'>DashBoard</h1>
      </div>

      <div className='flex flex-row w-full justify-evenly'>
        <div className='h-25 w-70 bg-gray-400 rounded-lg shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-2 p-4'>
          <div><h1>Total User's</h1></div>
          <div><p>{users && users.length}</p></div>
        </div>

        <div className='h-25 w-70 bg-gray-400 rounded-lg shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-2 p-4'>
          <h1>Total Post's</h1>
          <p>{post && post.length}</p>
        </div>

        <div className='h-25 w-70 bg-gray-400 rounded-lg shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-2 p-4'>
          <h1>Total Comment's</h1>
          <p>{comments && comments.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard