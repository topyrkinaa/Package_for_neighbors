import React from 'react';
import './AuthRoot.css';
import { Typography,Box } from '@mui/material';


function AuthRootComponents() {

  return (
    <div className='root'> 
       <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          maxWidth={540}
          margin='auto'
          padding={5}
          borderRadius={5}
          boxShadow='5px 5px 10px #ccc'
        >
        <Typography variant="h2" fontFamily='Popins' textAlign='center'>Регистрация</Typography>
        </Box>
      </div>
  )
}

export default AuthRootComponents;
