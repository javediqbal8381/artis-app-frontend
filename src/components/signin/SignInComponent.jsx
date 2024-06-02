import React, { useState } from 'react';
import { usersApi } from '../../redux/api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function SignInComponent() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [signIn, { isError, isLoading, data }] = usersApi.useSignInMutation();

  if (data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('userRole', data.role);
    navigate('/');
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(formData).unwrap();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 max-w-[330px] sm:max-w-sm mx-auto md:w-full md:max-w-md text-center">
        <h1 className="text-veryLarge text-db font-semibold text-center text-gray-800 mb-6">
          Artisan MarketPlace
        </h1>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <TextField
              type="email"
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex flex-col mb-6">
            <TextField
              type="password"
              id="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <Button type="submit" className="normal_btn" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Forgot your password?{' '}
          <a href="#" className="text-indigo-600 font-extrabold hover:underline transition duration-300">
            Reset it
          </a>
        </p>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to={'/signup'} className="text-indigo-600 font-extrabold hover:underline transition duration-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInComponent;
