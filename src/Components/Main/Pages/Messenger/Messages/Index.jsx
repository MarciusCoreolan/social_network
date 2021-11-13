import React, { useEffect } from 'react';
import s from './messages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message/Index';
import AddNewMessage from './AddNewMessage/Index';
import ReactLoading from 'react-loading';
import { getMessages } from '../../../../../Redux/Ducks/messagesReducer';
import { useParams } from 'react-router-dom';

function Messages(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const messages = useSelector((state) => state.messages.item); //полученные при клике на диалог сообщения с сервера приходят сюда
  const userName = useSelector((state) => state.user.item.userName);
  const messagesLoading = useSelector(
    (state) => state.messages.messagesLoading,
  );

  useEffect(() => {
    dispatch(getMessages(userName, params.name)); //отправляет запрос на сервер для получения сообщений определенного диалога
    window.scrollTo(0, 999999999999999);
  }, [dispatch, params.name, userName]);

  return (
    <div className="pages wrapper">
      <div className={s.message_page}>
        <div className={s.message_page_container}>
          {messagesLoading ? (
            <div className="loading">
              <ReactLoading
                type={'spokes'}
                color={'#000'}
                height={100}
                width={100}
              />
            </div>
          ) : (
            <div>
              {messages.map(
                (
                  item, //выводим переписку пользователя
                ) => (
                  <Message message={item} key={item.id} userName={userName} />
                ),
              )}
            </div>
          )}
          <AddNewMessage />
        </div>
      </div>
    </div>
  );
}

export default Messages;
