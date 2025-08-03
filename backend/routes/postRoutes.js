import express from 'express';
import { createPost, getUserPosts, getRandomPosts, likePost, commentPost, savePost, getSavedPosts, deletePost, getPost } from '../controllers/postController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), createPost);
router.get('/user/:userId', authMiddleware, getUserPosts);
router.get('/random', authMiddleware, getRandomPosts);
router.get('/:postId', authMiddleware, getPost);
router.post('/like/:postId', authMiddleware, likePost);
router.post('/comment/:postId', authMiddleware, commentPost);
router.post('/save/:postId', authMiddleware, savePost);
router.get('/saved', authMiddleware, getSavedPosts);
router.delete('/:postId', authMiddleware, deletePost);

export default router;