import React, { useState } from 'react';
import { post } from '../../Services/EndPoint.js';

function AddPost() {
  const [formData, setFormData] = useState({
    title: '',
    discription: '',
    postimage: null,
  });

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'postimage') {
      // File input
      setFormData((prev) => ({ ...prev, postimage: files[0] }));
    } else {
      // Text inputs
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData
    const data = new FormData();
    data.append('title', formData.title);
    data.append('discription', formData.discription);
    data.append('postimage', formData.postimage); // <-- Must match Multer field name

    // Debug: Log FormData keys
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      // Make POST request to /blog/create
      // "post" is your custom function from endpoint.js
      const response = await post('/blog/create', data);
      console.log('Blog created:', response.data);
      // Clear form or navigate as needed
    } catch (error) {
      console.error('Error creating blog:', error.response?.data || error.message);
    }
  };

  return (
    <div className='h-screen w-full bg-gray-300 flex justify-center items-center p-2 '>
      <div className='h-[500px] p-2 w-[600px] bg-gray-300 shadow rounded-lg'>
        
        {/* Header */}
        <div className='flex justify-center items-center font-bold text-xl mb-4'>
          <h1 className='p-2 bg-gray-300 rounded-lg shadow'>
            Add New Post
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-2'>

          {/* Upload Image */}
          <div className='flex flex-col gap-1 px-4 py-2 bg-gray-300 shadow-md'>
            <label className='font-semibold'>Upload Image</label>
            <input
              type='file'
              name='postimage'                // IMPORTANT: Must match Multer field name
              className='p-2 w-full rounded-lg border border-gray-400'
              onChange={handleChange}
              required
            />
          </div>

          {/* Title */}
          <div className='flex flex-col gap-1 px-4 py-2 bg-gray-300 shadow-md'>
            <label className='font-semibold'>Title</label>
            <input
              type='text'
              name='title'
              className='p-2 w-full rounded-lg border border-gray-400'
              placeholder='Title'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className='flex flex-col gap-1 px-4 py-2 bg-gray-300 shadow-md'>
            <label className='font-semibold'>Description</label>
            <textarea
              name='discription'
              className='h-24 p-2 w-full rounded-lg border border-gray-400 resize-none'
              placeholder='Write Description'
              value={formData.discription}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Button */}
          <div className='flex justify-end p-2'>
            <button
              type='submit'
              className='h-12 w-40 p-2 rounded-lg font-bold text-xl bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all duration-300'
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
