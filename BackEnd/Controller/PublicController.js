import blogModel from "../Modules/BlogSchema.js";

export const getSinglePost = async(req, res)=>{
  try {
    const postId = req.params.id;
    const findPost = await blogModel.findById(postId)
    .populate({
      path:'comments',
      populate:{
        path:'userId'
      }
    })
    if(!findPost){
      return res.status(400).json({
        message:"blog not found",
        success:false
      })
    }
    res.status(200).json({
      success:true,
      Post:findPost
    })
  } catch (error) {
    console.log("GetSinglePost Error: ",error)
  }
}