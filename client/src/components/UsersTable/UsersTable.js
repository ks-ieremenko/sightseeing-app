import React from 'react';
import authService from '../../services/auth-service';
import styles from './UsersTable.module.css';
import DeleteButton from './img/delete.svg'

const UsersTable = ({ content, changeModalParams }) => {
  return (
    <table className="table table-light align-middle caption-top table-bordered mt-5 caption-top">
      <caption>Список користувачів</caption>
      <thead className="">
      <tr className={styles.tr}>
        <th className="text-center" scope="col">
          Id
        </th>
        <th scope="col">Ім'я користувача</th>
        <th scope="col">Пошта</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {content.map(({ id, username, email }) => {
        console.log(id)
        console.log(authService.getCurrentUser().id)
        console.log(id === authService.getCurrentUser().id)
        return (
          <tr key={id}>
            <td className="text-center fw-bold">{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td className={styles.td_button}>
              {id !== authService.getCurrentUser().id ? (
                <button
                  className={styles.deleteBtn}
                  type="button"
                  onClick={() => {
                    changeModalParams('d-block', id);
                  }}
                >
                </button>
              ) : (
                <p className={styles.admin_text}>Адмін</p>
              )}
            </td>
          </tr>
        )
      })
      }
      </tbody>
    </table>
  );
};

export default UsersTable;
