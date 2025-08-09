import blogModel from "../Modules/BlogSchema.js";
import commentModel from "../Modules/CommentSchema.js";

export const addcomment = async(req, res)=>{
  try {
    const {postId,userId,comment} = req.body;

    const newComment = await commentModel({
      postId,
      userId,
      comment
    });
    await newComment.save();

    const existPost = await blogModel.findById(postId);
    if(!existPost){
      return res.status(400).json({
        message:"Blog is not found"
      })
    }
    existPost.comments.push(newComment._id)
    await existPost.save();
    res.status(200).json({
      message:"comment add Successfully",
      success:true,
      comment:newComment
    })
  } catch (error) {
    console.log("AddComment Error: ",error)
  }
}