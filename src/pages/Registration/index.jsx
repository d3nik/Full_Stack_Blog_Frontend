import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisterUser, fetchUser, isAuthSelector } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegisterUser(values));

    if (!data.payload) {
      setError('email', { message: 'Невірна пошта!' });
      setError('password', { message: 'Пароль мінімум 5 символів!' });
      setError('fullName', { message: 'Ім\'я мінімум 3 символи!' });
      return alert('Не вдалося зареєструватися!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }

  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          error = {Boolean(errors.fullName?.message)}
          helperText= {errors.fullName?.message}
          placeholder="John Doe"
          {...register('fullName', { required: 'Вкажіть повне ім\'я' })}
          className={styles.field}
          label="Повне ім'я"
          fullWidth />
        <TextField 
          error = {Boolean(errors.email?.message)}
          helperText= {errors.email?.message}
          placeholder="example@email.com"
          {...register('email', { required: 'Вкажіть пошту' })}
          className={styles.field} label="E-Mail" fullWidth />
        <TextField 
          error = {Boolean(errors.password?.message)}
          helperText= {errors.password?.message}
          placeholder="••••••••"
          {...register('password', { required: 'Вкажіть пароль' })}
          className={styles.field} label="Пароль" fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зареєструватись
        </Button>
      </form>
    </Paper>
  );
};
