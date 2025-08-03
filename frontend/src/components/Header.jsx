import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { FaHome, FaBriefcase, FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Header = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  return (
    <>
      {/* Logo shown only on small screens */}
      <div className="md:hidden fixed top-0 w-full bg-white shadow-md z-50 text-center py-2">
        <h1 className="text-xl font-bold text-green-600">ConnectSphere</h1>
      </div>

      {/* Navigation bar */}
      <nav className="fixed z-40 w-full bg-white shadow-md flex md:top-0 md:bottom-auto bottom-0 md:flex-row flex-col md:justify-between items-center px-6 py-3 mt-10 md:mt-0">
        {/* Logo for medium and larger screens */}
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-green-600">ConnectSphere</h1>
        </div>

        {/* Navigation items */}
        <div className="flex justify-around w-full md:w-auto md:gap-10">
          <NavLink
            to="/"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center ${activeTab === 'home' ? 'text-green-600' : 'text-gray-700'} hover:text-green-600 transition duration-200`}
          >
            <FaHome size={22} />
            <span className="text-xs">Home</span>
          </NavLink>

          <NavLink
            to="#"
            onClick={() => {
              setActiveTab('jobs');
              toast.error('Jobs feature under development');
            }}
            className={`flex flex-col items-center ${activeTab === 'jobs' ? 'text-green-600' : 'text-gray-700'} hover:text-green-600 transition duration-200`}
          >
            <FaBriefcase size={22} />
            <span className="text-xs">Jobs</span>
          </NavLink>

          <NavLink
            to="#"
            onClick={() => {
              setActiveTab('notifications');
              toast.error('Notifications feature under development');
            }}
            className={`flex flex-col items-center ${activeTab === 'notifications' ? 'text-green-600' : 'text-gray-700'} hover:text-green-600 transition duration-200`}
          >
            <FaBell size={22} />
            <span className="text-xs">Alerts</span>
          </NavLink>

          <NavLink
            to={`/profile/${user.id}`}
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-green-600' : 'text-gray-700'} hover:text-green-600 transition duration-200`}
          >
            {user?.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <FaUserCircle size={22} />
            )}
            <span className="text-xs">Profile</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-red-600 hover:text-red-700 transition duration-200 cursor-pointer"
          >
            <FaSignOutAlt size={22} />
            <span className="text-xs font-semibold">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
