import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/slices/postSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const CreatePost = () => {
  const [formData, setFormData] = useState({ content: '', image: null });
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.post);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('content', formData.content);
    if (formData.image) data.append('image', formData.image);

    dispatch(createPost(data)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(`/profile/${result.payload.post.user._id}`);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="pt-20 pb-20 sm:pb-24 md:pt-24 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">Create Post</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
              required
              rows="4"
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept=".jpg,.jpeg,.png"
              className="w-full p-3 border border-green-300 rounded-lg bg-green-50"
            />
            {preview && <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg mt-3 shadow-sm" />}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;