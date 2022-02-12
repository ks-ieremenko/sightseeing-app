import React, { useEffect, useState } from 'react';
import userService from '../../services/user-service';

const ModalWindow = ({ setContent, modalParams, changeModalParams }) => {
  return (
    <div
      id="exampleModal"
      className={`modal fade show ${modalParams.class}`}
      tabIndex="-1"
      role="dialog"
      style={{ transition: '1s' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Видалити</h5>
            <button
              type="button"
              className="btn-close"
              onClick={changeModalParams}
            />
          </div>
          <div className="modal-body">
            <p>Ви впевнені, що хочете видалити цього користувача?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={async () => {
                const users = await userService.deleteUser(
                  modalParams.id
                );
                setContent(users);
                changeModalParams();
              }}
            >
              Видалити
            </button>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={changeModalParams}
            >
              Відмінити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
