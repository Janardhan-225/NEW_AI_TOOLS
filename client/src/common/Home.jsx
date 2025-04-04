// src/components/HomePage.js
import React from 'react';
//import home css
import './css/Home.css';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const HomePage = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/Router');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className='set'>
    <div className='bg-dark full-screen '>
      <header className='bg-dark text-white p-4 d-flex justify-content-between'>
  <h1 className='lead stylish-heading'>AITools</h1>
  <button onClick={() => navigate('/Login')} className='btn btn-outline-warning stylish-button'>Login</button>
    </header>
    <main className="text-white text-center py-5">
  <h1 className="text-white fs-1 fw-bold stylish-heading">Discover the Latest</h1>
  <h2 className="fs-1 fw-bold stylish-heading">AI Tools Automatically</h2>
  <p className="lead stylish-text">Stay ahead with our auto-updating collection of cutting-edge AI tools <br />Real-time integration keeps you at the forefront of AI innovation.</p>
</main>

<footer className='bg-dark'>
  <div>
  <button className="btn btn-primary bt1">Explore Tools</button>
  <button className="btn btn-light ">How it works</button></div>
</footer>
</div>
</div>

    
  );
};

export default HomePage;
