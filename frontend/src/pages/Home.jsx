import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRandomPosts } from '../redux/slices/postSlice';
import PostCard from '../components/PostCard';
import Header from '../components/Header';

const Home = () => {
  const { user, isLoggedIn, isCheckingAuth } = useSelector((state) => state.auth);
  const { posts, loading, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && user) {
      dispatch(getRandomPosts());
    }
  }, [isLoggedIn, user, dispatch]);

  if (isCheckingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 md:pt-24 pb-24 sm:pb-28">
      <Header />
      <div className="max-w-lg mx-auto px-4">
        {loading && <p className="text-center text-gray-600">Loading posts...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-center text-gray-600">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
