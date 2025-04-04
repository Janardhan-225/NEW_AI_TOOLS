// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Layout from './common/Layout.jsx';
import Home from './common/Home.jsx';
import Login from './common/Login.jsx';
import Home2 from './common/Home2.jsx';
import Trending from './context/Trending.jsx';
import Category from './components/CategoryDisplay.jsx';
import About from './components/About.jsx';
import Submit from './context/Submit.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <>
              <SignedIn>
                <Layout /> {/* Use the Layout component here */}
              </SignedIn>
              <SignedOut>
               <Home/>
              </SignedOut>
            </>
          }
        >
          {/* Nested Routes */}
          <Route index element={<Home2 />} />
          <Route path="home2" element={<Home2 />} />
          <Route path="trending" element={<Trending />} />
          <Route path="submit" element={<Submit />} />
          <Route path="category" element={<Category />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
