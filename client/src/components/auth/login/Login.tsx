import React, { useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import MessagesRegister from '../register/register.messages';
import Colors from '../../../utils/colors';

import Actions from '../../../reducers/actions/user';

const fieldSchema = {
  email: z.string().email({ message: MessagesRegister.errors.email }),
  password: z.string().min(12, { message: 'Пароль слишком короткий' }),
};

// Применение эффектов к полям
const formSchema = z
  .object(fieldSchema);

const StyledSpan = styled.span`
  color: ${Colors.const.red};
  font-size: 12px;
  font: 'Montserrat';
`;

function Login() {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    // reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
    trigger,
  } = useForm<ShemaType>({
    resolver: zodResolver(formSchema),
  });

  // обработчик отправки формы
  const onSubmit: SubmitHandler<ShemaType> = (data) => {
    dispatch(Actions.fetchUserLogin(data)).then(({ status }) => {
      if (status === 'success') {
        setTimeout(() => {
          navigate("/homesocial");
        }, 1000)
      }
    })
  };

  
  useEffect(() => {
    // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
    setFocus('email');
  }, [setFocus]);

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        margin='auto'
        width='30%'
        padding={3}
        borderRadius={5}
        boxShadow='5px 5px 10px #ccc'
      >
        <Typography variant="h2" fontFamily="Popins" textAlign="center">
          Авторизация
        </Typography>
        <Typography
          variant="body1"
          marginBottom={3}
          fontFamily="Popins"
          textAlign="center"
        >
          Введите данные для авторизации
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Box
            display='flex'
            flex='1 1 auto'
            flexDirection='column'
            gap={1}
          >
            <TextField
              /* eslint-disable react/jsx-props-no-spreading */
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
              <StyledSpan role='alert'>
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
              <StyledSpan role='alert'>
                {errors.password?.message}
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
              onSubmit={() => console.log('Авторизация')}
            >
              Войти
            </Button>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ fontFamily: 'Popins' }}
            >
              Забыли пароль?
              <Link style={{
                color: Colors.const.blue,
                marginLeft: 10,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
                to='/recovery'
              >
                Восстановить</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
export type ShemaType = z.infer<typeof formSchema>;
