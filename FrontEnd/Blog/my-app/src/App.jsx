import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Post from './Pages/Post';
import Login from './Pages/Login';
import UserLayout from './Layouts/UserLayout';
import AdminLayout from './Layouts/AdminLayout';
import Dashboard from './Pages/Admin/Dashboard';
import User from './Pages/Admin/User';
import AddPost from './Pages/Admin/AddPost';
import AllPost from './Pages/Admin/AllPost';
import Register from './Pages/Register';

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* UserLayout */}
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/post/:id' element={<Post />} />
        </Route>
        {/* AdminLayout */}
        <Route path='/dashboard' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='getuser' element={<User />} />
          <Route path='addpost' element={<AddPost />} />
          <Route path='allpost' element={<AllPost />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App;