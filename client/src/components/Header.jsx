import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/ymedia-logo.svg" alt="yMedia" className="logo-icon-img" />
          <span>yMedia</span>
        </Link>

        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <span className="nav-link">Welcome, {user?.username || 'User'}</span>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

