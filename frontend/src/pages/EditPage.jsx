import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const EditPage = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(user?.profilePic || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setPreviewPic(user.profilePic);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (bio) formData.append('bio', bio);
    if (profilePic) formData.append('profilePic', profilePic);
    dispatch(editProfile(formData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate(`/profile/${user.id}`);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white text-green-900">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-green-50 p-6 rounded-2xl shadow-lg space-y-6 border border-green-200"
        >
          {/* Image Preview */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={previewPic || '/default-profile.png'}
              alt="Profile Preview"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-600"
            />
            <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition">
              Change Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Your name"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block font-semibold mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditPage;
