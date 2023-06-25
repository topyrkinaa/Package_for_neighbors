import React, {Fragment} from 'react';
import { TextField, Button,Typography } from '@mui/material';

function Register() {
  return (
    <>
      <Typography variant="h2" fontFamily='Popins' textAlign='center'>Регистрация</Typography>
      <Typography variant="body1" marginBottom={3} fontFamily='Popins' textAlign='center'>Введите данные для регистрации</Typography>
      <TextField fullWidth margin='normal' label="Имя" variant="outlined" placeholder="Введите ваше Имя" />
      <TextField fullWidth margin='normal' label="Отчество" variant="outlined" placeholder="Введите ваше Отчество" />
      <TextField fullWidth margin='normal' label="Фамилия" variant="outlined" placeholder="Введите вашу Фамилию" />
      <TextField fullWidth margin='normal' label="Email" variant="outlined" placeholder="Введите ваш email" />
      <TextField type="password" fullWidth margin='normal' label="Password" variant="outlined" placeholder="Введите ваш пароль" />
      <TextField type="password" fullWidth margin='normal' label="Password" variant="outlined" placeholder="Повторите ваш пароль" />
      <Button type="submit" sx={{fontFamily:'Popins',marginTop: 2, marginBottom: 2, width: '60%'}} variant="contained" onClick={() => console.log("Регистрация")}>Регистрация</Button>
      <Typography variant="body1" sx={{fontFamily:'Popins'}}>У вас есть аккаунт?<span className="incitingText">Авторизация</span></Typography>
    </>
  );
}

export default Register;
