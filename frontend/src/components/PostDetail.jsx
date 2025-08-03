import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePost, deletePost } from '../redux/slices/postSlice';
import toast from 'react-hot-toast';
import { FaHeart, FaComment, FaBookmark, FaTrash } from 'react-icons/fa';
import Avatar from './Avatar';

const PostDetail = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isSaved = user?.savedPosts?.includes(post._id);

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch(savePost(post._id));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deletePost(post._id)).then(() => navigate('/'));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
      <div className="flex items-center mb-4">
        <div onClick={() => navigate(`/profile/${post.user._id}`)}>
          <Avatar src={post.user.profilePic} alt={post.user.name} />
        </div>
        <div
          className="ml-3 cursor-pointer"
          onClick={() => navigate(`/profile/${post.user._id}`)}
        >
          <h3 className="font-semibold text-lg text-gray-800">{post.user.name}</h3>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className="w-full h-64 object-cover rounded-lg mb-4" />}
      <div className="flex gap-5">
        <button
          onClick={() => toast.error('Like feature under development')}
          className="flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
        >
          <FaHeart size={18} />
          <span className="ml-1 text-sm">{post.likes.length}</span>
        </button>
        <button
          onClick={() => toast.error('Comment feature under development')}
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
            className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            <FaTrash size={18} />
            <span className="ml-1 text-sm">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostDetail;