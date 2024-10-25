import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect =asyncHandler(async (req, res, next) =>{
     console.log(' Inside protect !... ');
     let token;
     token = req.cookies.jwt;
     console.log(token);
     if(token){
       try{
           const decoded = jwt.verify(token,process.env.JWT_SECRET);
           console.log(decoded);
           req.user = await User.findOne({_id:decoded.userId}).select('-password');
           next();
       }catch(err){
         res.status(401);
         throw new Error(`Not authorized , Invalid token || ${err.message}`  );
       }
    }else{
         res.status(401);
         throw new Error('Not Authorized , no token !!'); 
     }
});

export {protect} 