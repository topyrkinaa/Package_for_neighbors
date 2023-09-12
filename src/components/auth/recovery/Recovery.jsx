import React, { useEffect } from 'react';
import './recovery.css';
import { TextField, Button, Typography, Box } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
});

function Recovery() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
    trigger,
  } = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    setFocus('email');
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
          Восстановление пароля
        </Typography>
        <Typography variant="body1" marginBottom={3} fontFamily="Popins" textAlign="center">
          Введите данные для восстановления пароля
        </Typography>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', gap: '10px' }}>
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
              helperText={errors.email && errors.email.message}
              onBlur={() => trigger('email')}
            />
            <Button
              type="submit"
              className="recovery-button"
              sx={{ fontFamily: 'Popins', marginTop: 2, marginBottom: 2, width: '80%', margin: '0 auto' }}
              variant="contained"
              disabled={!isDirty || isSubmitting}
              onClick={() => console.log('Восстановление пароля')}
            >
              Получить код
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default Recovery;
