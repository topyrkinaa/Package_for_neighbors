import React, { useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import zodNameValidation from './validation.message';
import MessagesRegister from './register.messages';
import Colors from '../../../utils/colors';

const fieldSchema = {
  username: zodNameValidation('Имя'),
  surname: zodNameValidation('Отчество'),
  patronymic: zodNameValidation('Фамилия'),
  email: z.string().email({ message: MessagesRegister.errors.email }),
  password: z.string().min(12, { message: 'Пароль слишком короткий' }),
  confirmPassword: z.string().min(12, { message: 'Повторите пароль' }),
};

// Применение эффектов к полям
const formSchema = z.object(fieldSchema).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Введенные пароли не совпадают',
});

const StyledSpan = styled.span`
  color: ${Colors.const.red};
  font-size: 12px;
  font: 'Montserrat';
`;

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
    trigger,
  } = useForm<ShemaType>({
    resolver: zodResolver(formSchema),
  });

  // обработчик отправки формы
  const onSubmit: SubmitHandler<ShemaType> = (data) => {
    console.log(data);
    reset();
  }

  useEffect(() => {
    // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
    setFocus('username');
  }, [setFocus]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        margin="auto"
        width="30%"
        padding={3}
        borderRadius={5}
        boxShadow="5px 5px 10px #ccc"
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Box
            display="flex"
            flex="1 1 auto"
            flexDirection="column"
            gap={1}
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
              onBlur={() => trigger('username')}
            />
            {errors.username && (
              <StyledSpan role="alert">
                {errors.username?.message}
              </StyledSpan>
            )}
            <TextField
              {...register('surname')}
              disabled={isSubmitting}
              id="surname"
              label="Отчество*"
              variant="outlined"
              placeholder="Введите ваше Отчество"
              aria-invalid={errors.surname ? 'true' : 'false'}
              error={!!errors.surname}
              onBlur={() => trigger('surname')}
            />
            {errors.surname && (
              <StyledSpan role="alert">
                {errors.surname?.message}
              </StyledSpan>
            )}
            <TextField
              {...register('patronymic')}
              disabled={isSubmitting}
              id="patronymic"
              label="Фамилия*"
              variant="outlined"
              placeholder="Введите вашу Фамилию"
              aria-invalid={errors.patronymic ? 'true' : 'false'}
              error={!!errors.patronymic}
              onBlur={() => trigger('patronymic')}
            />
            {errors.patronymic && (
              <StyledSpan role="alert">
                {errors.patronymic?.message}
              </StyledSpan>
            )}
            <TextField
              {...register('email')}
              disabled={isSubmitting}
              id="email"
              label="Email*"
              variant="outlined"
              placeholder="Введите ваш email"
              aria-invalid={errors.email ? 'true' : 'false'}
              error={!!errors.email}
              onBlur={() => trigger('email')}
            />
            {errors.email && (
              <StyledSpan role="alert">
                {errors.email?.message}
              </StyledSpan>
            )}
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
              onBlur={() => trigger('password')}
            />
            {errors.password && (
              <StyledSpan role="alert">
                {errors.password?.message}
              </StyledSpan>
            )}
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
              onBlur={() => trigger('confirmPassword')}
            />
            {errors.confirmPassword && (
              <StyledSpan role="alert">
                {errors.confirmPassword?.message}
              </StyledSpan>
            )}
            <Button
              type="submit"
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 700,
                marginTop: 2,
                marginBottom: 2,
                width: '80%',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center'
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
              sx={{ fontFamily: 'Popins', color: Colors.const.blue }}
            >
              У вас есть аккаунт?
              <Link
                style={{
                  color: Colors.const.blue,
                  marginLeft: 10,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
                to="/login"
              >
                Авторизация
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Register;
export type ShemaType = z.infer<typeof formSchema>;
