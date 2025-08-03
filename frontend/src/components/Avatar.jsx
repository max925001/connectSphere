import { FaUserCircle } from 'react-icons/fa';

const Avatar = ({ src, alt }) => {
  return src ? (
    <img src={src} alt={alt} className="w-12 h-12 rounded-full object-cover" />
  ) : (
    <FaUserCircle size={48} className="text-gray-400" />
  );
};

export default Avatar;