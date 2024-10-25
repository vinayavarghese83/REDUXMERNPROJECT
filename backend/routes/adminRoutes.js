import express from 'express';
import  {adminLogin,  adminDashboard, deleteUser, addUser, updateUser} from '../controllers/adminController.js';
import {protect} from '../middlewares/authMiddleware.js';
const router=express.Router();

router.post('/',adminLogin);
router.get('/dashboard',protect,adminDashboard);
router.patch('/deleteUser',protect,deleteUser);
router.post('/addUser',protect,addUser)
router.patch('/updateUserProfile',protect, updateUser);

export default router;