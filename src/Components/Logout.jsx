import React from 'react';
import axiosInstance from '../axios'; // Make sure to import your axios instance
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refresh_token = localStorage.getItem('refresh_token');

    if (!refresh_token) {
      alert('You have already logged out.');
      return; // Exit the function early
    }

    try {
      await axiosInstance.post('/logout/', { refresh_token });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
