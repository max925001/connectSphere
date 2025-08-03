import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePost, deletePost } from '../redux/slices/postSlice';
import toast from 'react-hot-toast';
import { FaHeart, FaComment, FaBookmark, FaTrash } from 'react-icons/fa';
import Avatar from './Avatar';
import { useState } from 'react';
import { getTimeAgo } from '../utils/timeAgo';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = post?.user?._id;
  const { user } = useSelector((state) => state.auth);
  const isSaved = user?.savedPosts?.includes(post._id);
  const [showMore, setShowMore] = useState(false);

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch(savePost(post._id));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deletePost(post._id));
  };

  const words = post.content?.split(' ') || [];
  const shouldShowMore = words.length > 50;
  const displayContent = showMore ? post.content : words.slice(0, 50).join(' ') + (shouldShowMore ? '...' : '');

  return (
    <div
      className="bg-white rounded-xl shadow-md p-5 w-full cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between h-full"
      onClick={() => navigate(`/post/${post._id}`)}
    >
      <div>
        {/* User Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div onClick={(e) => { e.stopPropagation(); navigate(`/profile/${userId}`); }}>
              <Avatar src={post.user.profilePic} alt={post.user.name} />
            </div>
            <div
              className="ml-3 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); navigate(`/profile/${userId}`); }}
            >
              <h3 className="font-semibold text-lg text-gray-800">{post.user.name}</h3>
              <p className="text-sm text-gray-500">{getTimeAgo(post.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-gray-700 mb-3">
          {displayContent}
          {shouldShowMore && (
            <button
              className="text-blue-600 ml-2 underline text-sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowMore((prev) => !prev);
              }}
            >
              {showMore ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>

        {/* Image */}
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full max-h-96 rounded-lg mb-3 object-contain"
          />
        )}
      </div>

      {/* Post Actions */}
      <div className="flex gap-5 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.error('Like feature under development');
          }}
          className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
        >
          <FaHeart size={18} />
          <span className="ml-1 text-sm">{post.likes.length}</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.error('Comment feature under development');
          }}
          className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
        >
          <FaComment size={18} />
          <span className="ml-1 text-sm">{post.comments.length}</span>
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center ${isSaved ? 'text-green-600' : 'text-gray-600'} hover:text-green-600 transition-colors duration-200`}
        >
          <FaBookmark size={18} />
          <span className="ml-1 text-sm">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
        {post.user._id === user?.id && (
          <button
            onClick={handleDelete}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
          >
            <FaTrash size={18} />
            <span className="ml-1 text-sm">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
