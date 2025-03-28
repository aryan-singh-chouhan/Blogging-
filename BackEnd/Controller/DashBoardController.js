import blogModel from "../Modules/BlogSchema.js";
import { userModel } from "../Modules/UserSchema.js";
import commentModel from "../Modules/CommentSchema.js";
import fs from 'fs';
import path from 'path';

export const getAllData = async (req, res) => {
  try {
    const Users = await userModel.find();
    const Posts = await blogModel.find();
    const Comments = await commentModel.find();

    if (!Users && !Posts) {
      return res.status(400).json({
        message: "Data not found",
        success: false
      })
    }
    res.status(200).json({
      Users,
      Posts,
      Comments,
      success: true
    })
  } catch (error) {
    console.log("DashBoard getAllData Error: ", error)
  }
}


// getUser
export const getUser = async (req, res) => {
  try {
    const Users = await userModel.find();

    if (!Users) {
      return res.status(400).json({
        message: "User not found",
        success: false
      })
    }
    res.status(200).json({
      Users,
      success: true
    })
  } catch (error) {
    console.log("Getusers Error: ", error)
  }
}

// deleteUser
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existUser = await userModel.findById(userId);
    if (!existUser) {
      return res.status(400).json({
        message: "User not found",
        success: false
      })
    }
    if (existUser.role === "admin") {
      return res.status(400).json({
        message: "You are admin you can't delete your Account",
        success: false
      })
    }
    if (existUser.profile) {
      const imagePath = path.resolve("Public/images", existUser.profile);
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath);
        console.log("user image deleted successfully");
      } else {
        console.log("user Image file not found on the server");
      }
    }
    const userDelete = await userModel.findByIdAndDelete(userId)
    return res.status(200).json({
      message: "user Deleted SuccessFully",
      success: true,
      user: userDelete
    })
  } catch (error) {
    console.log("deleteUser Error: ", error)
  }
}