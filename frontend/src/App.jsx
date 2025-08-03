import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getUserData } from './redux/slices/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import { Toaster } from 'react-hot-toast';
import EditPage from './pages/EditPage';

const ProtectedRoute = ({ children }) => {
  const { user, isLoggedIn, loading } = useSelector((state) => state.auth);
  const location = useLocation();



  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-green-50">Loading...</div>;
  }

  if (!isLoggedIn || !user) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const { user, isLoggedIn, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch(getUserData(user?.id)).then((result) => {
      
    });
  }, [dispatch]);

  

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={isLoggedIn && user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isLoggedIn && user ? <Navigate to="/" /> : <Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;