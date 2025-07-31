import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://learning-tracker-backend-t2b2.onrender.com/api/auth/login', { email, password });
      login(res.data);
      navigate('/groups');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100" style={{ minHeight: 'calc(100vh - 4rem)'}}>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border-gray-300 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border-gray-300 border rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
           Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
