import React, { useEffect } from 'react';
import './register.css';
import { TextField, Button, Typography, Box } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Обязательное поле' })
      .regex(
        /^(([А-ЯЁ][а-яё]{1,40})(\s[А-ЯЁ][а-яё]{1,40})?)$/,
        { message: 'Имя должно быть указано в корректном формате' }
      )
      .max(100),
    surname: z
      .string()
      .min(1, { message: 'Обязательное поле' })
      .regex(
        /^(([А-ЯЁ][а-яё]{1,40})(\s[А-ЯЁ][а-яё]{1,40})?)$/,
        { message: 'Отчество должно быть указано в корректном формате' }
      )
      .max(100),
    patronymic: z
      .string()
      .min(1, { message: 'Обязательное поле' })
      .regex(
        /^(([А-ЯЁ][а-яё]{1,40})(\s[А-ЯЁ][а-яё]{1,40})?)$/,
        { message: 'Фамилия должно быть указано в корректном формате' }
      )
      .max(100),
    email: z.string().email({ message: 'Некорректный email' }),
    password: z.string().min(12, { message: 'Пароль слишком короткий' }),
    confirmPassword: z
      .string()
      .min(12, { message: 'Повторите пароль' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Введенные пароли не совпадают',
  });

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
    trigger,
  } = useForm({ resolver: zodResolver(formSchema) });

  // обработчик отправки формы
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
    setFocus('username');
  }, [setFocus]);

  return (
    <div className="root">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: 'auto',
          width: '30%',
          padding: 5,
          borderRadius: 5,
          boxShadow: '5px 5px 10px #ccc',
        }}
      >
        <Typography variant="h2" fontFamily="Popins" textAlign="center">
          Регистрация
        </Typography>
        <Typography
          variant="body1"
          marginBottom={3}
          fontFamily="Popins"
          textAlign="center"
        >
          Введите данные для регистрации
        </Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <TextField
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('username')}
              disabled={isSubmitting}
              id="username"
              label="Имя*"
              variant="outlined"
              placeholder="Введите ваше Имя"
              aria-invalid={errors.username ? 'true' : 'false'}
              error={!!errors.username}
              helperText={errors.username && errors.username.message}
              onBlur={() => trigger('username')}
            />
            <TextField
              {...register('surname')}
              disabled={isSubmitting}
              id="surname"
              label="Отчество*"
              variant="outlined"
              placeholder="Введите ваше Отчество"
              aria-invalid={errors.surname ? 'true' : 'false'}
              error={!!errors.surname}
              helperText={errors.surname && errors.surname.message}
              onBlur={() => trigger('surname')}
            />
            <TextField
              {...register('patronymic')}
              disabled={isSubmitting}
              id="patronymic"
              label="Фамилия*"
              variant="outlined"
              placeholder="Введите вашу Фамилию"
              aria-invalid={errors.patronymic ? 'true' : 'false'}
              error={!!errors.patronymic}
              helperText={errors.patronymic && errors.patronymic.message}
              onBlur={() => trigger('patronymic')}
            />
            <TextField
              {...register('email')}
              disabled={isSubmitting}
              id="email"
              label="Email*"
              variant="outlined"
              placeholder="Введите ваш email"
              aria-invalid={errors.email ? 'true' : 'false'}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              onBlur={() => trigger('email')}
            />
            <TextField
              {...register('password')}
              disabled={isSubmitting}
              id="password"
              type="password"
              label="Пароль*"
              variant="outlined"
              placeholder="Введите ваш пароль"
              aria-invalid={errors.password ? 'true' : 'false'}
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
              onBlur={() => trigger('password')}
            />
            <TextField
              {...register('confirmPassword')}
              disabled={isSubmitting}
              id="confirmPassword"
              type="password"
              label="Повторите пароль*"
              variant="outlined"
              placeholder="Повторите ваш пароль"
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
              onBlur={() => trigger('confirmPassword')}
            />
            <Button
              type="submit"
              className="register-button"
              sx={{
                fontFamily: 'Popins',
                marginTop: 2,
                marginBottom: 2,
                width: '80%',
                margin: '0 auto',
              }}
              variant="contained"
              disabled={!isDirty || isSubmitting}
              onSubmit={() => console.log('Регистрация')}
            >
              Регистрация
            </Button>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ fontFamily: 'Popins' }}
            >
              У вас есть аккаунт?
              <span className="incitingText">Авторизация</span>
            </Typography>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default Register;