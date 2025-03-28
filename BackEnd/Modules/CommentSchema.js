import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blogPost",
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true
  },
  comment:{
    type:String,
    required:true
  }
},{timestamps:true})


const commentModel = mongoose.model("comments",commentSchema);
export default commentModel; 