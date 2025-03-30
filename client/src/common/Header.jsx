// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import './css/Header.css'; // Import the CSS file

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logoLink">
          AI Tools
        </Link>
      </div>
      <div className="  container-fluid d-flex justify-content-end">
      <nav className="nav ">
        {isSignedIn && (
          <>
            <Link to="/home2" className="navLink">
              Home
            </Link>
            <Link to="/trending" className="navLink">
              Trending
            </Link>
            <Link to="/category" className="navLink">
              Category
            </Link>
            <Link to="/submit" className="navLink">
            Submit
            </Link>
            <Link to="/about" className="navLink">
              About
            </Link>
          </>
        )}
      </nav>
      </div>
      <div className="userSection">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link to="/" className="loginButton">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;