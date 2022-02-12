import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import authService from '../../services/auth-service';
import userService from '../../services/user-service';

const ProfilePage = () => {
  let currentUser = authService.getCurrentUser();
  const [disabledUsername, setDisabledUsername] = useState(true);
  const [input, setInput] = useState(null);
  const [username, setUsername] = useState(currentUser.username);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setUsername(e.target.value);
  };

  const cancel = (error = '') => {
    setMessage(error);
    setDisabledUsername(true);
    setUsername(currentUser.username);
  };
  const save = async () => {
    setDisabledUsername(true);
    try {
      if (currentUser.username !== username) {
        await userService.changeUsername(
          currentUser.username,
          username
        );
        authService.setCurrentUser({
          ...currentUser,
          username,
        });
      }
    } catch (error) {
      cancel(error.response.data);
    }
  };
  return (
    <div className="container mt-4">
      <div className="card p-3">
        <h2
          style={{
            borderBottom: '2px solid #c8e7be',
            paddingBottom: '13px',
          }}
        >
          Профіль
        </h2>
        <div className="row">
          <label
            htmlFor="Username"
            className="col-sm-2 col-form-label"
          >
            Ім'я користувача
          </label>
          <div className={`col-sm-7 ${styles.div_input}`}>
            <input
              type="text"
              className="form-control form-control-sm"
              id="Username"
              value={username}
              onChange={onChange}
              disabled={disabledUsername}
              ref={(input) => {
                setInput(input);
              }}
            />
            {disabledUsername ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setMessage('');
                  setDisabledUsername(false);
                  input.removeAttribute('disabled');
                  input.focus();
                }}
              >
                Редагувати
              </button>
            ) : (
              <>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={save}
                >
                  Зберегти
                </button>
                <button
                  className="btn btn-secondary  btn-sm"
                  onClick={() => cancel()}
                >
                  Відмінити
                </button>
              </>
            )}
            {message && (
              <div
                title="Click to close"
                className="alert alert-danger alert-dismissible fade  show text-center"
                role="alert"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setMessage('');
                }}
              >
                {message}
              </div>
            )}
          </div>
        </div>
        <div className="row mt-2">
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-form-label"
          >
            Пошта
          </label>
          <div className={`col-sm-3 ${styles.div_input}`}>
            <input
              type="text"
              readOnly
              className="form-control form-control-sm"
              id="staticEmail"
              value={currentUser.email}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
