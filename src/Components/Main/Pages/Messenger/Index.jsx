import React from 'react';
import s from './messenger.module.css';
import Dialogs from './Dialogs/Index';
import { Route } from 'react-router-dom';
import Messages from './Messages/Index';

function Messenger(props) {
  return (
    //страница мессенжера открываем или диалоги или переписку с пользователем
    <div className="pages">
      <div className={s.messages_panel}>
        <Dialogs />
        <Route path={`/messages/:?name`}>
          <Messages />
        </Route>
      </div>
    </div>
  );
}

export default Messenger;
