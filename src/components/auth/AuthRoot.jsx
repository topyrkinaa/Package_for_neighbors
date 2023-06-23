import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import './AuthRoot.css';
import Login from './login/Login';
import Register from './register/Register';

function AuthRootComponents() {
  const location = useLocation()
  return (
    <div className='root'> 
      <div className='form'>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          maxWidth={640}
          margin='auto'
          padding={5}
          borderRadius={5}
          boxShadow='5px 5px 10px #ccc'
        >
        {location.pathname === '/login' ? <Login /> : location.pathname === '/register' ? <Register /> : null}
        </Box>
      </div>
    </div>


  )
}

export default AuthRootComponents;
