import { userModel } from "../Modules/UserSchema.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const JWT_SECRET='abcdef';


// Register & Signup
export const Register = async (req, res) => {
  try {
    const { FullName, email, password } = req.body;
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file); 
    
    if (!FullName || !email || !password) {
      return res.status(401).json({
        message: "All filed are required",
        success: false
      })
    }
    const exitUserModel = await userModel.findOne({ email });
    if (exitUserModel) {
      return res.status(401).json({
        message: "This email allready register",
        success: false
      })
    }
    const imagePath = req.file.filename
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    await userModel.create({
      FullName,
      email,
      password: hashedPassword,
      profile: imagePath
    });
    return res.status(200).json({
      message: "User Register Successfully",
      success: true
    })
  } catch (error) {
    console.log("Error in Register: ", error)
  }
}


// Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All filed are required",
        success: false
      })
    }
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(401).json({
        message: "This User in not exit",
        success: false
      })
    }

    const comparePassword = await bcryptjs.compare(password, findUser.password)
    console.log("Password Match:", comparePassword);
    if (!comparePassword) {
      return res.status(401).json({
        message: "Password or email is incorrect",
        success: false
      })
    }
    const TokenData = {
      userId: findUser.id
    };
    const token = jwt.sign(TokenData,JWT_SECRET);
    return res.status(201).cookie("token",token,{expiresIn:"1d", httpOnly:true}).json({
      message: `WellCome Back ${findUser.FullName}`,
      success: true,
      user: findUser
    });
  } catch (error) {
    console.log("LogIn: ", error)
  }
}

// LogOut
export const LogOut = async (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "LogOut SuccessFully",
    success: true
  })
}