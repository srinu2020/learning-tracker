import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  //  useEffect(() => {
  //   if (user) {
  //     navigate('/groups'); // ⬅️ Redirect if logged in
  //   }
  // }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        form
      );
      login(response.data);
      navigate('/groups');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration error');
    }
  };

  return (
<div className="flex justify-center items-center bg-gray-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
<form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Create Your Account
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
