import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  discription:{
    type:String,
    required: true
  },
  image:{
    type:String,
  },
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comments"
  }]
},{timestamps:true})

const blogModel = mongoose.model("blogPost",blogSchema);
export default blogModel;