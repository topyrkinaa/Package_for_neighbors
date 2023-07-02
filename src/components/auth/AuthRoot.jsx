import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import './AuthRoot.css';
import Login from './login/Login';
import Register from './register/Register';
import Recovery from './recovery/Recovery';

function AuthRootComponents() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(email)
    console.log(password)
  }
  return (
    <div className='root'> 
      <form className='form' onSubmit={handleSubmit}>
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
         {(() => {
          if (location.pathname === '/login') {
            return <Login setEmail={setEmail} setPassword={setPassword} />;
          }
          if (location.pathname === '/register') {
            return <Register />;
          }
          if (location.pathname === '/recovery') {
            return <Recovery />;
          }
          return null;
        })()}
        </Box>
      </form>
    </div>


  )
}

export default AuthRootComponents;
