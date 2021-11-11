import React, { useState } from 'react';
import s from './addMessage.module.css';
import Input from '../../../../../Component/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ButtonWhite from '../../../../../Component/ButtonWhite';
import { addNewMessage } from '../../../../../../Redux/Ducks/messagesReducer';
import {
  makeDialogOpponent,
  makeDialogUser,
} from '../../../../../../Redux/Ducks/dialogsReducer';

function AddNewMessage(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const userName = useSelector((state) => state.user.item.userName);
  const userId = useSelector((state) => state.user.item.id);
  const userDialog = useSelector((state) => state.dialogs.item);
  const [message, setMessage] = useState(''); //получаем текст из инпута

  const checkDialogs = userDialog.filter(
    (item) => item.userOpponentName === params.name && item.userId === userId,
  );

  const parseMessage = () => {
    dispatch(addNewMessage(message, userName, params.name)); // передаем текст, автора текста, айди автора, и айди его опонента на сервер
    setMessage('');

    if (checkDialogs.length === 0) {
      dispatch(makeDialogUser(userId, params.name, parseInt(params.id)));
      dispatch(makeDialogOpponent(userId, userName, parseInt(params.id)));
    }
  };

  return (
    <div className={s.add_message_panel}>
      <div className={s.add_message_panel_container}>
        <div className={s.input_container}>
          <Input
            text={'Введите сообщение'}
            value={message}
            onChange={setMessage}
          />
        </div>
        <div>
          <ButtonWhite
            text={<i className="fa fa-paper-plane" aria-hidden="true"></i>}
            click={parseMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNewMessage;
