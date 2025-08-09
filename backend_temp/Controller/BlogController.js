import blogModel from "../Modules/BlogSchema.js";
import fs from 'fs';
import path from 'path';


// create Blog
export const Create = async(req, res)=>{
  try {
    
    const {title, discription} = req.body;
    const imagePath = req.file.filename
    const createBlog = new blogModel({
      title,
      discription,
      image: imagePath
    })

    await createBlog.save();
    return res.status(200).json({
      message:"Blog Create Successfully",
      success: true,
      post:createBlog
    })

  } catch (error) {
    console.log("CreateBlog: ",error)
  }
}

// Delete Blog
export const deletePost = async(req, res)=>{
  try {
    const postId = req.params.id;

    const findPost = await blogModel.findById(postId);
    console.log("this is your blog: ",findPost)
    if(!findPost){
      return res.status(401).json({
        message:"This Blog is Not Exist"
      })
    }

    if(findPost.image){
      const imagePath = path.resolve("Public/images", findPost.image);
      if (fs.existsSync(imagePath)) {
        await fs.promises.unlink(imagePath);
        console.log("Blog image deleted successfully");
      } else {
        console.log("Image file not found on the server");
      }
    }

    const deletedPost = await blogModel.findByIdAndDelete(postId);
    return res.status(200).json({
      message:"Blog Delete SuccessFully",
      success:true,
      post:deletedPost
    })
  } catch (error) {
    console.log("Delete Error: ",error)
  }
}

// get all blogs
export const getBlog = async(req, res)=>{
  try {
    const Blogs = await blogModel.find();
    if(!Blogs){
      return res.status(401).json({
        message:"Blogs not found",
        success:false
      })
    }
    return res.status(200).json({
      success:true,
      Blogs
    })
  } catch (error) {
    console.log("GET Blog Error: ",error)
  }
}

// update Blogs
export const update = async(req,res)=>{
  try {
    const {title, discription} = req.body;
    const postId = req.params.id;

    const updateBlog = await blogModel.findById(postId);
    if(!updateBlog){
      return res.status(401).json({
        message:"Blogs not found",
        success:false
      })
    }

    if(title){
      updateBlog.title = title
    }
    if(discription){
      updateBlog.discription = discription
    }
    if(req.file){
      updateBlog.image = req.file.filename
    }

    await updateBlog.save();
    return res.status(200).json({
      message:"blog update successfully",
      success: true,
      post:updateBlog
    })
  } catch (error) {
    console.log("Update error: ",error)
  }
}