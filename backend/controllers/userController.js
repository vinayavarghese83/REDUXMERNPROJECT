//route POST /spi/users/auth
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose'

const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password } = req.body;
    console.log(name);
    
    const userExists = await User.findOne({email})
    console.log(userExists);
    
    if(userExists){
        res.status(400);
        throw new Error('User already Exists... !!');
    }
    const salt = await bcrypt.genSalt(10);
    const pwd = await  bcrypt.hash(password,salt);
        
    const user = await User.create({
         name,
         email,
         password:pwd,
    });
    console.log("user",user);
    
    if(user){
             generateToken(res,user._id);
             res.status(201).json({
             _id:user._id,
             name:user.name,
             email:user.email,
         });
    }else{
        res.status(400);
        throw new Error('Invalid User Data !');
    }
});
//Get user Profile
// GET /api/user/profile
const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    });
    res.status(200).json({message:'LoggedOut User !!'});
});
//Get user Profile
// GET /api/user/profile
// access private
const getUserProfile = asyncHandler(async(req,res) => {
    console.log('Inside get user Profile !');
    const user ={
         _id:req.user._id,
         name:req.user.name,
         email:req.user.email,
    }
    res.status(200).json(user);
});
//Get user Profile
//api/user/profileUpdata

const updateUserProfile = asyncHandler(async(req,res) => {
    console.log('Inside get user Profile--Update !');
    console.log(req.body);
    console.log(req.user._id);
          
    const user = await User.findById(req.user._id);
    console.log("user",user);
   
    if(user){
         user.name = req.body.name ;
         user.email = req.body.email ;
           
      const updatedUser = await user.save();
      console.log("updated Data",updatedUser);
    res.status(201).json({
        _id:updatedUser._id,
        name: updatedUser.name,
        email:updatedUser.email,
        image:updatedUser.image,
    });
}else{
      res.status(401).json({message:' Failed!'});
}
});

const authUser = asyncHandler(async(req,res) => {
    const {email,password} =req.body;
    console.log("Indside auth user ::",req.body)
    const user =await User.findOne({email});
    if(user.isAdmin){
        console.log("Admin...");
        res.status(400);
        throw new Error("You are not a Authorized User !");
    }
    const pwd = await bcrypt.compare(password,user.password);
    if(user && pwd){
         generateToken(res,user._id);
         res.status(201).json({
             _id:user._id,
             name: user.name,
             email:user.email,
             image:'http://localhost:7000/uploads/'+user.image,
         });
    }else{
        res.status(401);
        throw new Error('Invalid credentials !!');
    }
});
const setProfileImage = asyncHandler(async(req,res) => {
    try{
        console.log('Update Profile  picture ');
        const user = await User.findById(req.user._id);
         console.log("user",user);
         console.log(" Image ::"+ JSON.stringify(req.file)) ; 
                    
         const value= req.file.filename;

         const test =req.file.originalname;
        console.log(user,value)

        console.log("User Data ::",value);


        if(user){
            console.log("inside User Data ::",value);

             const updated = await User.updateOne({_id:req.user._id}, {
                $set: {
                     image:value
                }
             });

             console.log("Updated value ::",updated);
             res.status(201).json({
                _id:updated._id,
                 name:updated.name,
                 email:updated.email,
                 
             });
        }else{
             res.status(400).json('Failed !!')
        }
    }catch(err){
         res.status(400);
         throw new Error('Profile image Error !!')
    }
 });

export  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    setProfileImage,
}