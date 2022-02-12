import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import Form from '../../material-ui/Form/Form';
import Input from '../../material-ui/Input/Input';

import AuthService from '../../services/auth-service';

import { loginValidationSchema } from '../../services/validation-schemas';
import styles from './SignInPage.module.css';
import Avatar from '../../components/Avatar/Avatar';

const SignInPage = (props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(loginValidationSchema),
  });
  const [prop, setProp] = useState({
    username: '',
    password: '',
  });
  const changeProp = (e) => {
    setProp({ ...prop, [e.target.name]: e.target.value });
  };
  const [result, setResult] = useState({ loading: false, message: '' });
  const changeResult = (loading, message) => {
    setResult({
      ...result,
      loading,
      message,
    });
  };
  const submitForm = async () => {
    try {
      changeResult(true, '');
      await AuthService.login(prop.username, prop.password);
      props.history.push('/');
      window.location.reload();
    } catch (error) {
      changeResult(false, error?.response?.data);
    }
  };
  return (
    <div className="col-md-12">
      <div className={`card card-container mx-auto my-5 ${styles.card}`}>
        <Avatar/>

        <Form onSubmit={handleSubmit(submitForm)}>
          <Input
            ref={register}
            value={prop.username}
            onChange={changeProp}
            type="text"
            name="username"
            className="form-group"
            label="Ім'я користувача"
            error={!!errors.username}
            helperText={errors?.username?.message}
          />

          <Input
            ref={register}
            value={prop.password}
            onChange={changeProp}
            type="password"
            name="password"
            label="Пароль"
            className="form-group"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <div className="d-grid gap-2">
            <button
              className="btn btn-primary btn-block mt-3"
              disabled={result.loading}
            >
              {result.loading && (
                <span className="spinner-border spinner-border-sm"/>
              )}
              <span>Увійти</span>
            </button>
          </div>

          {result.message && (
            <div
              className="alert alert-danger mt-4 text-center"
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

export default SignInPage;
