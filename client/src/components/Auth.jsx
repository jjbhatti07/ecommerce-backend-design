import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/Layout/Brand/logo-colored.png';

const Auth = ({ setPage, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const url = isLogin
        ? `${import.meta.env.VITE_API_URL}/api/auth/login`
        : `${import.meta.env.VITE_API_URL}/api/auth/register`;

      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await axios.post(url, body);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      setPage('home');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7FAFC] py-12 px-4">
      <div className="bg-white border border-[#DEE2E7] rounded-xl p-8 w-full max-w-md shadow-sm">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Brand" className="h-10" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1C1C1C] text-center mb-2">
          {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-[#8B96A5] text-center text-sm mb-6">
          {isLogin ? 'Login to your account' : 'Sign up for free'}
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          )}

          <div>
            <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm text-[#1C1C1C] font-medium mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-[#DEE2E7] rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>

        {/* Toggle */}
        <p className="text-center text-sm text-[#8B96A5] mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="text-primary font-medium cursor-pointer hover:underline"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;