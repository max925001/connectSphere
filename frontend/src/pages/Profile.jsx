import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../redux/slices/authSlice';
import { deletePost, getUserPosts, savePost } from '../redux/slices/postSlice';
import { FaHeart, FaComment, FaBookmark, FaTrash } from 'react-icons/fa';
import Button from '../components/Button';
import Header from '../components/Header';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { otherUser, user, loading: userLoading } = useSelector((state) => state.auth);
  const { posts, loading: postLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (userId && (!otherUser || otherUser._id !== userId)) {
      dispatch(getUserData(userId));
    }
  }, [dispatch, userId, otherUser]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, userId]);

  const handleSave = (postId) => {
    dispatch(savePost(postId));
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className="min-h-screen bg-white text-green-900">
      <Header />

      <main className="p-4 sm:p-6 md:p-8">
        {userLoading ? (
          <p className="text-center">Loading user...</p>
        ) : otherUser ? (
          <div className="max-w-4xl mx-auto mt-[100px]">
            {/* User Info */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={otherUser.profilePic || '/default-profile.png'}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-green-600"
              />
              <h1 className="text-2xl sm:text-3xl font-bold">{otherUser.name}</h1>
              <p className="text-center max-w-md text-sm sm:text-base">
                {otherUser.bio || 'No bio available'}
              </p>

              {user?.id === otherUser._id && (
                <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
              )}
              <Button onClick={() => navigate('/create-post')}>Create New Post</Button>
            </div>

            {/* Posts */}
            <div className="mt-10">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 border-b border-green-300 pb-2">
                Posts
              </h2>

              {postLoading ? (
                <p className="text-center">Loading posts...</p>
              ) : posts.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {posts.map((post) => {
                    const isSaved = user?.savedPosts?.includes(post._id);
                    const isOwner = user?.id === post.user?._id;

                    return (
                      <div
                        key={post._id}
                        className="w-full bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <p className="text-green-900 text-sm sm:text-base whitespace-pre-wrap break-words mb-2">
                          {post.content}
                        </p>

                        {post.image && (
                          <img
                            src={post.image}
                            alt="Post"
                            className="w-full h-auto max-h-[400px] object-contain rounded-lg border mb-3"
                          />
                        )}

                        <div className="flex gap-5 text-gray-600 text-sm items-center mt-2">
                          <button
                            onClick={() => toast.error('Like feature under development')}
                            className="flex items-center hover:text-green-600"
                          >
                            <FaHeart size={16} />
                            <span className="ml-1">{post.likes?.length || 0}</span>
                          </button>

                          <button
                            onClick={() => toast.error('Comment feature under development')}
                            className="flex items-center hover:text-green-600"
                          >
                            <FaComment size={16} />
                            <span className="ml-1">{post.comments?.length || 0}</span>
                          </button>

                          <button
                            onClick={() => handleSave(post._id)}
                            className={`flex items-center hover:text-green-600 ${
                              isSaved ? 'text-green-600' : ''
                            }`}
                          >
                            <FaBookmark size={16} />
                            <span className="ml-1">{isSaved ? 'Saved' : 'Save'}</span>
                          </button>

                          {isOwner && (
                            <button
                              onClick={() => handleDelete(post._id)}
                              className="flex items-center text-red-600 hover:text-red-800 cursor-pointer"
                            >
                              <FaTrash size={16} />
                              <span className="ml-1">Delete</span>
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-green-600 text-right mt-2">
                          Posted on {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  <p className="text-lg font-medium">No posts to show</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-red-600">User not found</p>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
