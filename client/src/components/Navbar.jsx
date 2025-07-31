import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Learning Tracker</Link>
      </h1>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link to="/groups" className="hover:underline">Groups</Link>
            {/* <Link to="/goals" className="hover:underline">Goals</Link> */}
            <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
