import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <h3>Employee Attendance</h3>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
