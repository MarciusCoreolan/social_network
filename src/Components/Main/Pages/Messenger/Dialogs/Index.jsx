import React from 'react';
import s from './dialogs.module.css';
import { useSelector } from 'react-redux';
import Dialog from './Dialog/Index';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

function Dialogs(props) {
  const history = useHistory();
  const dialogs = useSelector((state) => state.dialogs.item);
  const loading = useSelector((state) => state.dialogs.dialogsLoading);

  const handleOpenDialog = (userOpponentId, userOpponentName) => {
    history.push(`/messages/${userOpponentId}${userOpponentName}`); //открывает страницу с перепиской
  };

  return (
    <div className={s.dialogs_page}>
      {loading ? (
        <div className="loading">
          <ReactLoading
            type={'spokes'}
            color={'#000'}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <>
          {dialogs.map((dialog) => (
            <Dialog dialog={dialog} click={handleOpenDialog} key={dialog.id} />
          ))}
        </>
      )}
    </div>
  );
}

export default Dialogs;
