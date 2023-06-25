import React, {Fragment} from 'react';
import { TextField, Button,Typography } from '@mui/material';

function Recovery() {
  return (
    <>
      <Typography variant="h2" fontFamily='Popins' textAlign='center'>Восстановление пароля</Typography>
      <Typography variant="body1" marginBottom={3} fontFamily='Popins' textAlign='center'>Введите данные для восстановления пароля</Typography>
      <TextField fullWidth margin='normal' label="Email" variant="outlined" placeholder="Введите ваш email" />
      <Button sx={{fontFamily:'Popins',marginTop: 2, marginBottom: 2, width: '60%'}} variant="contained">Получить код</Button>
    </>
  );
}

export default Recovery;