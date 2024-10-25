import express from 'express';
import {authUser,registerUser,getUserProfile,updateUserProfile,logoutUser,setProfileImage}  from '../controllers/userController.js';
import {protect} from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,upload.single('image'),updateUserProfile);
router.post('/setProfileImage',protect,upload.single('image'),setProfileImage);

export default router;
