import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

const adminLogin = async (req,res) =>{
    const {email,password} = req.body;
    console.log("Inside  admin Login ::",email,password);
    const user = await User.findOne({email});
    const pwd = await bcrypt.compare(password,user.password);
    if(user && pwd ){
        generateToken(res,user._id);
        res.status(201).json({
             _id: user._id,
             name: 'Admin',  
             email:email,
            });
    }else{
        res.status(401).json({message:'Invalid Credentials !!'});
    }
}
const adminDashboard = async (req,res) => {
    const user = await User.find({isAdmin:false});
    console.log(user);
     res.status(201).json({user:user});
}
const deleteUser = async (req,res) => {
   try {
        const { userId } = req.body;
        console.log(userId);
        const result = await User.deleteOne({_id:userId});
        console.log(result);
        res.status(200).json({message:'Successfully Deleted !!'});
   }catch(err){
      console.log(err);
      throw new Error('Something went wrong !!');
   } 
}
const addUser = async(req,res) => {
    try{
         const {name, email, password } = req.body;
         const userExists = await User.findOne({email});
         if(userExists){
              res.status(400);
              throw new Error(' User already Exists ...');
         }
         const salt = await bcrypt.genSalt(10);
         const pwd = await bcrypt.hash(password, salt); 
         const user = await User.create({
             name,
             email,
             password : pwd,
         });
         console.log(" New user", user);
         if(user){
             generateToken(res,user._id),
             res.status(201).json({
                 _id:user._id,
                 name:user.name,
                 email:user.email
             })
         }else{
             res.status(400);
             throw new Error('Invalid User Data !!');
         }
    }catch(err){
        res.status(400);
        throw new Error('Something went wrong !!');
    }
}
const updateUser = async(req,res) =>{
    console.log("Inside user Update !!");
    const {id, name, email } =req.body;
    const result = await User.updateOne({_id:id},
        { $set: {
              name,
              email
         }
        }
     )
     res.status(200).json({message:'Successfully Update'});
    try{

    }catch(err){
         res.status(400);
         throw new Error(' Unable to process your request !!');
    }
}

export {
     adminLogin,
     adminDashboard,
     deleteUser,
     addUser,
     updateUser
}