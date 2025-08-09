import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../Controller/AuthUserController.js';
import { userModel } from '../Modules/UserSchema.js';


// isAdmin
export const isAdmin = async(req, res, next)=>{
  try {
    const token = req.cookies.token;
    console.log("token: ",token);
    console.log("jwt Token key: ",JWT_SECRET)

    if(!token){
      return res.status(401).json({
        message:"your token is not her or generated know"
      })
    }

    const decoded= jwt.verify(token, JWT_SECRET);
    console.log("decoded token: ",decoded);

    const User = await userModel.findById(decoded.userId);
    console.log("exist user: ",User);
    if(!User){
      return res.status(400).json({
        message:"This User is not Found"
      })
    }
    if(User.role != "admin"){
      return res.status(400).json({
        message:"Only Admin can access or create Blog"
      })
    }

    next();
  } catch (error) {
    console.log("token error: ",error)
  }
}

// isLogin
export const isLogin = async(req, res, next)=>{
  try {
    const token = req.cookies.token;
    console.log("token: ",token);
    console.log("jwt Token key: ",JWT_SECRET)

    if(!token){
      return res.status(401).json({
        message:"your token is not her or generated know"
      })
    }

    const decoded= jwt.verify(token, JWT_SECRET);
    console.log("decoded token: ",decoded);

    const User = await userModel.findById(decoded.userId);
    console.log("exist user: ",User);
    if(!User){
      return res.status(400).json({
        message:"This User is not Found"
      })
    }
    req.User=User
    next();
  } catch (error) {
    console.log("isLogin error: ",error)
  }
}