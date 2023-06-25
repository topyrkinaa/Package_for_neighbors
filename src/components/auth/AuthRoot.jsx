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
        {location.pathname === '/login' ? <Login setEmail={setEmail} setPassword={setPassword} /> : location.pathname === '/register' ? <Register /> : location.pathname === '/recovery' ? <Recovery /> : null}
        </Box>
      </form>
    </div>


  )
}

export default AuthRootComponents;
