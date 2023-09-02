import React, { useEffect} from 'react';
import './register.css';
import { TextField, Button, Typography,Box } from '@mui/material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const formSchema = z.object({
  username: z.string().min(1, { message: 'Обязательное поле' })
  .max(100),
  surname: z.string().min(1, { message: 'Обязательное поле' })
  .max(100),
  patronymic: z.string().min(1,{ message: 'Обязательное поле' })
  .max(100),
  email: z.string().email({ message:'Некорректный email'}),
  password: z.string().min(12,{ message: 'Пароль слишком короткий'}),
  confirmPassword: z.string().min(12, { message: 'Повторите пароль'}),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Введенные пароли не совпадают',
})

type FormSchema = z.infer<typeof formSchema>

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormSchema>({ resolver: zodResolver(formSchema) })

  // обработчик отправки формы
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data)
    reset()
  }


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
        <Typography variant="h2" fontFamily='Popins' textAlign='center'>Регистрация</Typography>
        <Typography variant="body1" marginBottom={3} fontFamily='Popins' textAlign='center'>Введите данные для регистрации</Typography>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <TextField 
        /* eslint-disable react/jsx-props-no-spreading */
        {...register('username')}
        disabled={isSubmitting}
        id="username"
        fullWidth margin="normal"
        label="Имя *"
        variant="outlined"
        placeholder="Введите ваше Имя"
        aria-invalid={errors.username ? 'true' : 'false'}
        />
        {errors.username && (
          <span role='alert' className='error'>
          {errors.username?.message}
          </span>
        )}
        <TextField
        {...register('surname')}
        disabled={isSubmitting}
        id='surname'
        fullWidth margin='normal'
        label="Отчество *"
        variant="outlined"
        placeholder="Введите ваше Отчество"
        aria-invalid={errors.surname ? 'true' : 'false'}
        />
        {errors.surname && (
        <span role='alert' className='error'>
          {errors.surname?.message}
        </span>
        )}
        <TextField
        {...register('patronymic')}
        disabled={isSubmitting}
        id='patronymic'
        fullWidth margin='normal'
        label="Фамилия *"
        variant="outlined" 
        placeholder="Введите вашу Фамилию"
        aria-invalid={errors.patronymic ? 'true' : 'false'}
        />
        {errors.patronymic && (
        <span role='alert' className='error'>
          {errors.patronymic?.message}
        </span>
        )}
        <TextField
        {...register('email')}
        disabled={isSubmitting}
        id='email'
        fullWidth margin='normal'
        label="Email *" 
        variant="outlined" 
        placeholder="Введите ваш email" 
        aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
        <span role='alert' className='error'>
          {errors.email?.message}
        </span>
        )}
        <TextField 
        {...register('password')}
        disabled={isSubmitting}
        id='password'
        type="password" 
        fullWidth margin='normal' 
        label="Пароль *" 
        variant="outlined"
        placeholder="Введите ваш пароль" 
        aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
        <span role='alert' className='error'>
          {errors.password?.message}
        </span>
        )}
        <TextField 
        {...register('confirmPassword')}
        disabled={isSubmitting}
        id='confirmPassword'
        type="password" 
        fullWidth margin='normal' 
        label="Повторите пароль *" 
        variant="outlined" 
        placeholder="Повторите ваш пароль" 
        aria-invalid={errors.confirmPassword ? 'true' : 'false'}
        />
          {errors.confirmPassword && (
        <span role='alert' className='error'>
          {errors.confirmPassword?.message}
        </span>
        )}
        <Button
        type="submit"
        className="register-button"
        sx={{fontFamily:'Popins',marginTop: 2, marginBottom: 2, width: '60%'}}
        variant="contained"
        disabled={!isDirty || isSubmitting}
        onClick={() => console.log("Регистрация")}
        >
          Регистрация
        </Button>
        <Typography variant="body1" sx={{fontFamily:'Popins'}}>У вас есть аккаунт?<span className="incitingText">Авторизация</span></Typography>
        </form>
      </Box>
      </div>
    );
}

export default Register;
