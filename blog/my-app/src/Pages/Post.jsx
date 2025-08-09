import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { BaseURL, get, post } from '../Services/EndPoint';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Post = () => {

  const { id } = useParams();
  const [SingleBlog, setSingleBlog] = useState(null);
  const [addComment, setAddComment] = useState("");

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    singlePost();
  }, [])

  const singlePost = async () => {
    try {
      const response = await get(`/public/singleblog/${id}`);
      const data = response.data;
      setSingleBlog(data.Post);
    } catch (error) {
      console.log("singlePost fatachdata Error: ", error)
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (addComment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }
    setAddComment("");

    try {
      const response = await post(`/comment/addcomment`, {
        postId: id,
        userId: user?._id,
        comment: addComment,
      });
      if (response.status === 200) {
        setAddComment("");
        singlePost();
      } else {
        alert("Failed to add comment");
      }
    } catch (error) {
      console.log("comment error: ", error)
    }
  }


  return (
    <div className='pt-16'>
      <div className="w-full bg-gray-300 flex justify-start items-center px-4 py-4">
        <h1 className="text-4xl font-bold shadow-md p-4 rounded-lg">
          {SingleBlog?.title}
        </h1>
      </div>

      <div className='h-auto w-full bg-gray-300 flex flex-col items-center '>
        <div className="w-[800px] h-[500px] bg-transparent flex justify-center items-center 
                 overflow-hidden">
          <img
            className="max-w-full max-h-full object-contain shadow-md rounded-lg"
            src={SingleBlog && `${BaseURL}/images/${SingleBlog.image}`}
            alt="Blog"
          />
        </div>
        <div className="font-semibold w-[800px] mt-4">
          <p className="shadow-md rounded-lg p-4">
            {SingleBlog?.discription}
          </p>
        </div>
      </div>

      <div className='h-20 w-full px-48 bg-gray-300 flex justify-start items-center font-bold'>
        <h1 className='text-lg p-2 shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.2)] rounded-lg'>Leave Comment</h1>
      </div>
      <form onSubmit={handleCommentSubmit}>
        <div className='px-48 bg-gray-300 flex flex-col'>
          <textarea
            value={addComment}
            onChange={(e) => setAddComment(e.target.value)}
            className='h-25 shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.2)] rounded-lg border'
            placeholder='Write a comment...' />
          <div className='font-semibold h-15 flex justify-end items-center'>
            <button type='submit' className='p-2 rounded-lg cursor-pointer bg-black text-white'>Submmit Comment</button>
          </div>
        </div>
      </form>

      {/* Comments Show */}
      <div className=' shadow-lg bg-gray-300'>
        <div className=' w-full px-48 bg-gray-300 flex justify-start items-center font-semibold mb-1'>
          <h1 className='text-3xl p-2 shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.2)] rounded-lg'>Comments</h1>
        </div>

        {/*user comments */}
        {SingleBlog && SingleBlog.comments.map((comments) => {
          return (
            <div className=' w-full px-48 bg-gray-300 flex justify-center items-center mb-1'>
              <div className='min-h-[88px] px-2 py-0 w-full bg-gray-300 flex justify-start items-center shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.2)] rounded-lg'>
                <div className='p-1 '>
                  <CgProfile size={50} className='shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.2)] rounded-full' />
                </div>
                <div className='w-full flex ml-3 flex-col items-start gap-2 '>
                  <div className='font-semibold flex justify-center p-0.5 shadow-[0_-1px_3px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)] rounded-lg'>
                    <h1>{comments.userId.FullName}</h1>
                  </div>
                  <div className='text-sm w-full flex justify-start p-0.5 shadow-[0_-1px_3px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)] rounded-lg'>
                    <h1>{comments.comment}</h1>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default Post