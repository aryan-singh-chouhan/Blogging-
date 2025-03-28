import React, { useEffect, useState } from "react";
import { dele, get } from "../../Services/EndPoint.js";

function User() {
  const [users, setUsers] = useState([]); // ✅ Initialize as empty array

  const fetchUsers = async () => {
    try {
      const response = await get("dashboard/getuser");
      console.log("API Response:", response.data); // ✅ Debugging
      if (response.data && response.data.Users) {
        setUsers(response.data.Users);
      } else {
        console.log("No Users found in API response");
      }
    } catch (error) {
      console.log("admin getUser error:", error);
    }
  };

  const handleDelete = async(id)=>{
    try {
      await dele(`/dashboard/deleteuser/${id}`);
      setUsers((prev)=>prev.filter((user)=>user._id !== id));
      console.log("User delete successfully");
    } catch (error) {
      console.log("post delete error: ",error)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Users</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user._id || index}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2"
            >
              <h3 className="text-xl font-semibold">{user.FullName}</h3>
              <p className="text-gray-400">{user.email}</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded mt-2 cursor-pointer" onClick={()=>handleDelete(user._id)}>
                Delete User
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default User;
