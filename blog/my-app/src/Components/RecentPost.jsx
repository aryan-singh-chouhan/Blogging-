import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseURL, get } from '../Services/EndPoint';

const RecentPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };

  const getPost = async () => {
    try {
      const response = await get('/blog/getblog');
      const data = response.data;
      setPost(data.Blogs);
    } catch (error) {
      console.log('Recent getPost error: ', error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="px-4 bg-gray-300 py-8 min-h-screen">
      <div className="text-center font-bold text-3xl mb-6">
        <h1>Recent Posts</h1>
      </div>

      {/* Masonry-like columns (optional) */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 max-w-7xl mx-auto">
        {post?.map((postItem) => (
          <div
            key={postItem._id}
            className="mb-6 break-inside-avoid bg-gray-400 rounded-xl shadow-md overflow-hidden"
          >
          
            <div className="p-2">
              <img
                className="w-full h-auto rounded-xl"
                src={`${BaseURL}/images/${postItem.image}`}
                alt="Blog"
              />
            </div>

            {/* Content area below the image */}
            <div className="px-4 pb-4 text-center">
              <h2 className="font-bold text-lg mb-2">{postItem.title}</h2>
              <button
                className="px-4 py-2 bg-black text-white rounded-lg"
                onClick={() => handleNavigate(postItem._id)}
              >
                Read Article
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPost;
