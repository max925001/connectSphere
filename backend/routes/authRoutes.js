import express from 'express';
import { register, login, logout, editProfile, getProfile, getProfileViews,  } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/register', upload.single('profilePic'), register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.put('/profile', authMiddleware, upload.single('profilePic'), editProfile);
router.get('/profile/:userId', authMiddleware, getProfile);
router.get('/profile-views', authMiddleware, getProfileViews);

export default router;