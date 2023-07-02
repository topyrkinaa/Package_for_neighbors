import React, { useEffect} from 'react';
import './login.css';
import { TextField, Button, Typography,Box } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email({ message:'Некорректный email'}),
  password: z.string().min(12,{ message: 'Пароль слишком короткий'}),
})

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  // обработчик отправки формы
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
    setFocus("username")
  }, [setFocus])
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
      <Typography variant="h2" fontFamily='Popins' textAlign='center'>Авторизация</Typography>
      <Typography variant="body1" marginBottom={3} fontFamily='Popins' textAlign='center'>Введите ваш логин и пароль</Typography>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <TextField 
        /* eslint-disable react/jsx-props-no-spreading */
        {...register('email')}
        disabled={isSubmitting}
         fullWidth margin='normal' 
         label="Email *"
         variant="outlined"
         placeholder="Введите ваш email" 
         aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
        <span role='alert' className='error'>
          {errors.email.message}
        </span>
        )}
        <TextField 
        {...register('password')}
        disabled={isSubmitting}
        type="password"
        fullWidth margin='normal'
        label="Пароль *"
        variant="outlined"
        placeholder="Введите ваш пароль"
        aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
        <span role='alert' className='error'>
          {errors.password.message}
        </span>
        )}
        <Typography variant="body1" textAlign='center' sx={{fontFamily:'Popins'}}><span className="incitingText">Забыли пароль?</span></Typography>
        <Button
        type="submit"
        className='login-button'
        sx={{fontFamily:'Popins',marginTop: 2, marginBottom: 2, width: '60%'}}
        variant="contained"
        disabled={!isDirty || isSubmitting}
        onClick={() => console.log("Авторизация")}>
          Войти</Button>
      <Typography variant="body1" textAlign='center' sx={{fontFamily:'Popins'}}>У вас нет аккаунта?<span className="incitingText">Регистрация</span></Typography>
      </form>
      </Box>
      </div>
  );
}

export default Login;
