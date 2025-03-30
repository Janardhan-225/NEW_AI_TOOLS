// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './css/Layout.css'; // Import the CSS file

const Layout = () => {
  return (
    <div className='full-screen bg-black'>
      <div className='katham'>
      <Header /></div>
      {/* Apply bg-dark only to the content area, not the whole layout */}
      <div className='outlet-content'>
        <Outlet /> {/* This will render the nested routes */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
