// src/components/Login.js
import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className='bg-dark full-screen'>
    <div className='d-flex justify-content-center m-auto mt-2'>
      <SignIn />
    </div>
    </div>
  );
};

export default Login;