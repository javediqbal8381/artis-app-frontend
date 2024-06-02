import React, { useState } from 'react';
import { usersApi } from '../../redux/api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function SignUpComponent() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [signUp, { isLoading }] = usersApi.useSignUpMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      console.log(response);
      if (response.error) {
        setError(response.error.data?.message);
      } else {
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="text-veryLarge text-db font-semibold text-center text-gray-800 mb-6">
          ArtisanMarketPlace
        </h1>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create an Account
        </h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <TextField
              type="text"
              id="username"
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex flex-col mb-2">
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
          <div className="flex flex-col mb-2">
            <TextField
              type="tel"
              id="mobile"
              name="mobile"
              label="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex flex-col mb-2">
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
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </div>
        </form>
        <p className="mt-12 text-xs text-center text-gray-600">
          Already have an account?{' '}
          <Link to={'/signin'} className="text-indigo-600 font-extrabold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpComponent;
