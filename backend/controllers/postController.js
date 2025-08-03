import Post from '../models/Post.js';
import User from '../models/User.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = new Post({
      user: req.user.id,
      content,
    });

    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file);
      if (uploadedImage) post.image = uploadedImage.secure_url;
    }

    await post.save();
    await post.populate('user', 'name profilePic');
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'name profilePic')
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getRandomPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $sample: { size: 20 } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $project: { 'user.name': 1, 'user.profilePic': 1 ,'user._id':1, content: 1, image: 1, likes: 1, comments: 1, createdAt: 1 } },
      { $sort: { createdAt: -1 } },
    ]);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user', 'name profilePic _id')
      .populate('comments.user', 'name profilePic');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    await post.populate('user', 'name profilePic');
    res.status(200).json({ message: 'Post like updated', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({ user: req.user.id, comment });
    await post.save();
    await post.populate('user', 'name profilePic').populate('comments.user', 'name profilePic');
    res.status(200).json({ message: 'Comment added', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.savedPosts.includes(req.params.postId)) {
      user.savedPosts = user.savedPosts.filter((id) => id.toString() !== req.params.postId);
    } else {
      user.savedPosts.push(req.params.postId);
    }

    await user.save();
    res.status(200).json({ message: 'Post save updated', saved: user.savedPosts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedPosts',
      populate: { path: 'user', select: 'name profilePic' },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ posts: user.savedPosts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    await Post.deleteOne({ _id: req.params.postId });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};