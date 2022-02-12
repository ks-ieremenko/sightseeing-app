import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth-service';

import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import img from './img/home_gray.svg';

const Navbar = () => {
  const [userOptions, setUserOptions] = useState({
    currentUser: null,
    showAdminBoard: false,
  });
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUserOptions({
        ...userOptions,
        currentUser: user,
        showAdminBoard: user.role === 'ROLE_ADMIN',
      });
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
    setUserOptions({
      ...userOptions,
      currentUser: null,
      showAdminBoard: false,
    });
  };
  return (
    <nav>
      <div className={styles.container}>
        <ul className={styles.list__container}>
          <div className={styles.left}>
            <li className={styles.img_link}>
              <NavLink to="/" exact>
                <img
                  className={styles.img}
                  src={img}
                  alt="home"
                />
              </NavLink>
            </li>
            <li>
              <NavLink to="/" exact>
                Головна
              </NavLink>
            </li>
            {userOptions.showAdminBoard && (
              <li>
                <NavLink to="/admin" exact>
                  Адмін
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/categories" exact>
                Категорії
              </NavLink>
            </li>
          </div>
          <div className={styles.right}>
            {!userOptions.currentUser ? (
              <>
                <li>
                  <NavLink to="/signup" exact>
                    Реєстрація
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signin" exact>
                    Логін
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/profile" exact>
                    Профіль
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signin"
                    onClick={logOut}
                    exact
                  >
                    Вийти
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
