import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import Form from '../../material-ui/Form/Form';
import Input from '../../material-ui/Input/Input';

import AuthService from '../../services/auth-service';
import { registrationValidationSchema } from '../../services/validation-schemas';

import styles from './SignUpPage.module.css';
import Avatar from '../../components/Avatar/Avatar';

const SignUpPage = () => {
  const [prop, setProp] = useState({
    username: '',
    email: '',
    dateOfBirth: new Date().toLocaleDateString(),
    password: '',
    secretKey: ''
  });
  const changeProp = (e) => {
    setProp({ ...prop, [e.target.name]: e.target.value });
  };

  const [result, setResult] = useState({ successfull: false, message: '' });
  const changeResult = (successfull, message) => {
    setResult({
      ...result,
      successfull,
      message,
    });
    console.log(result)
  };
  const submitForm = async (e) => {
    try {
      const response = await AuthService.register(
        prop.username,
        prop.email,
        prop.dateOfBirth,
        prop.password,
        prop.secretKey
      );
      changeResult(true, response.data.message);
    } catch (error) {
      changeResult(false, error.response.data.message);
    }
  };

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(registrationValidationSchema),
  });

  return (
    <div className="col-md-12">
      <div className={`card card-container mx-auto my-5 ${styles.card}`}>
        <Avatar/>
        <Form onSubmit={handleSubmit(submitForm)}>
          {!result.successfull && (
            <>
              <Input
                ref={register}
                value={prop.username}
                onChange={changeProp}
                type="text"
                name="username"
                label="Ім'я користувача"
                error={!!errors.username}
                helperText={errors?.username?.message}
              />
              <Input
                ref={register}
                value={prop.email}
                onChange={changeProp}
                type="email"
                name="email"
                label="Пошта"
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <Input
                ref={register}
                value={prop.dateOfBirth}
                onChange={changeProp}
                type="date"
                InputLabelProps={{ shrink: true }}
                name="dateOfBirth"
                label="Дата народження"
                error={!!errors?.dateOfBirth}
                helperText={errors?.dateOfBirth?.message}
              />
              <Input
                ref={register}
                value={prop.password}
                onChange={changeProp}
                type="password"
                name="password"
                label="Пароль"
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
              <Input
                ref={register}
                value={prop.secretKey}
                onChange={changeProp}
                type="password"
                name="secretKey"
                label="Ключ адміна"
              />
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary mt-3 d-grid gap-2">
                  Зареєструватися
                </button>
              </div>
            </>
          )}
          {result.message && (
            <div
              className={
                result.successfull
                  ? 'alert alert-success mt-4 text-center'
                  : 'alert alert-danger mt-4 text-center'
              }
              role="alert"
            >
              {result.message}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
