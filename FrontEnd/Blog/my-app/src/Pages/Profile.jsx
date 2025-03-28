import { useState } from "react";
import { PiUserCirclePlusFill } from 'react-icons/pi';

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <div className="bg-gray-300 p-6 rounded-xl shadow-md w-96 shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)]">
        <div className="flex justify-center items-center">
          <h2 className="text-xl font-semibold p-2 text-center mb-4 bg-gray-400 rounded-lg shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)]">Update Profile</h2>
        </div>

        <div className="flex justify-center mb-4 relative">
          <label htmlFor="profileImage" className="cursor-pointer ">
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="w-20 h-20 rounded-full bg-gray-400 hover:bg-gray-700 flex items-center justify-center overflow-hidden shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)]">
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <PiUserCirclePlusFill className="w-12 h-12  hover:text-gray-300 text-gray-700" />
              )}
            </div>
          </label>
        </div>

        <input
          type="text"
          placeholder="Update Name"
          className="w-full px-4 py-2 mb-3 bg-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)]"
        />

        <input
          type="password"
          placeholder="Old Password"
          className="w-full px-4 py-2 mb-3 bg-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500  shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)]"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 mb-3 bg-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500  shadow-[0_-2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.1)]"
        />

        <button className="w-full py-2 bg-gray-800 hover:bg-black cursor-pointer rounded-md text-white font-semibold">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
