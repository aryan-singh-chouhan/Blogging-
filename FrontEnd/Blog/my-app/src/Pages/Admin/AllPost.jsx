import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { BaseURL, dele, get } from '../../Services/EndPoint.js';

function AllPost() {
  const [post, setPost] = useState([]);

  const getPost = async () => {
    try {
      const response = await get('/dashboard/allpost');
      const data = response.data;
      setPost(data.Posts);
      console.log("dashboard post Data: ", data.Posts);
    } catch (error) {
      console.log("dashboard getPost error: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dele(`/blog/delete/${id}`);
      setPost((prev) => prev.filter((post) => post._id !== id));
      console.log("Post delete successfully");
    } catch (error) {
      console.log("delete post error: ", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className='px-4 bg-gray-300 text-white flex flex-col items-center font-bold text-xl'>
      <div className='h-15 w-40 bg-gray-400 mb-2 flex justify-center items-center p-4 rounded-lg shadow-md mt-3'>
        <h1 className='font-bold text-2xl'>All Post</h1>
      </div>

      {/* Masonry layout using CSS columns */}
      <div className='max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4'>
        {post && post.map((postItem) => (
          <div 
            key={postItem._id}
            className="mb-4 break-inside-avoid bg-white border border-white rounded-xl p-4"
          >
            <img 
              className='w-full h-auto rounded-xl' 
              src={`${BaseURL}/images/${postItem.image}`} 
              alt={postItem.title}
            />
            <div className='mt-1 flex justify-center text-black items-center font-bold text-lg'>
              <h2>{postItem.title}</h2>
            </div>
            <div className='mt-2 flex justify-start items-center font-semibold text-lg'>
              <button 
                className='p-1.5 bg-black text-white cursor-pointer rounded-lg flex items-center gap-1' 
                onClick={() => handleDelete(postItem._id)}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPost;
