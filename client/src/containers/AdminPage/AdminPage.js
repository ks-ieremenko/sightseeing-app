import React, { useEffect, useState } from 'react';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import UsersTable from '../../components/UsersTable/UsersTable';
import userService from '../../services/user-service';

const AdminPage = () => {
  const [content, setContent] = useState([]);
  const [modalParams, setModalParams] = useState({ class: '', id: null });

  useEffect(() => {
    async function fetchData() {
      const currentUser = await userService.checkAdmin();
      setContent(currentUser.usersList);
    }

    fetchData();
  }, []);

  const changeModalParams = (className = '', id = null) => {
    setModalParams({ ...modalParams, class: className, id });
  };
  return (
    <div className="container">
      <ModalWindow {...{ setContent, modalParams, changeModalParams }} />
      {content ? (
        <UsersTable {...{ content, changeModalParams }} />
      ) : (
        <p>Лише для адмінів</p>
      )}
    </div>
  );
};

export default AdminPage;
