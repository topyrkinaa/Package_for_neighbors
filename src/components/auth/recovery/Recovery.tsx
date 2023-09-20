import React, { useEffect} from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import MessagesRegister from '../register/register.messages';
import Colors from '../../../utils/colors';


const fieldSchema  = {
  email: z.string().email({ message: MessagesRegister.errors.email })
}

// Применение эффектов к полям
const formSchema = z
  .object(fieldSchema)
;
  
  
const StyledSpan = styled.span`
  color: ${Colors.const.red};
  font-size: 12px;
  font:'Popins';
`;


function Recovery() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty, isSubmitting, errors },
    trigger,
  } = useForm<ShemaType>({
    resolver: zodResolver(formSchema),
})

  // обработчик отправки формы
  const onSubmit: SubmitHandler<ShemaType> = (data) => {
    console.log(data)
    reset()
  }


  useEffect(() => {
    // устанавливаем фокус на первое поле (имя пользователя) после монтирования компонента
    setFocus('email');
  }, [setFocus]);

  return (
    <Box
      display='flex'
      justifyContent= 'center'
      alignItems= 'center'
      width= '100vw'
      height= '100vh'
      >
      <Box
       display='flex'
       justifyContent='center'
       alignItems='center'
       flexDirection='column'
       maxWidth={540}
       margin='auto'
       padding={3}
       borderRadius={5}
       boxShadow='5px 5px 10px #ccc'
      >
      <Typography variant="h2" fontFamily='Popins' textAlign='center'>Восстановление пароля</Typography>
      <Typography variant="body1" marginBottom={3} fontFamily='Popins' textAlign='center'>Введите данные для восстановления пароля</Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
          /* eslint-disable react/jsx-props-no-spreading */
          {...register('email')}
          disabled={isSubmitting}
          fullWidth margin='normal'
          label="Email"
          variant="outlined"
          placeholder="Введите ваш email"
          aria-invalid={errors.email ? 'true' : 'false'}
          error={!!errors.email}
          onBlur={() => trigger('email')}
          />
          {errors.email && (
          <StyledSpan role='alert'>
            {errors.email.message}
          </StyledSpan>
          )}
          <Button
          type="submit"
          sx={{
            fontFamily: 'Popins',
            marginTop: 2,
            marginBottom: 2,
            width: '80%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center'
          }}
          variant="contained"
          disabled={!isDirty || isSubmitting}
          onClick={() => console.log("Восстановление пароля")}
          >Получить код</Button>
          </form>
      </Box>
    </Box>
  );
}

export default Recovery;
export type ShemaType = z.infer<typeof formSchema>;