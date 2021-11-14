import React from 'react';
import s from './main.module.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Profile from './Pages/Profile/Index';
import Feed from './Pages/Feed/index';
import Messenger from './Pages/Messenger/Index';
import Messages from './Pages/Messenger/Messages/Index';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import ModalWindow from './ModalWindow/ModalWindow';
import Users from "./Pages/Users/Users";

function Main(props) {
  const token = useSelector((state) => state.user.item.token);

  const window_open_and_close = useSelector(
    (state) => state.user.window_open_and_close,
  );

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path={'/users'}>
          <Users />
        </Route>
        <Route path={'/messages/:id:name'}>
          <Messages />
        </Route>
        <Route exact path={'/dialogs'}>
          <Messenger />
        </Route>
        <Route path={'/feed'}>
          <Feed />
        </Route>
        <Route path={'/profile'}>
          <Profile />
        </Route>
        <Redirect to={'/profile'} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path={'/feed'}>
          <Feed />
        </Route>
        <Route path={'/profile'}>
          <Profile />
        </Route>
        <Redirect to={'/profile'} />
      </Switch>
    );
  }

  return (
    <div>
      {routes}

      <CSSTransition
        in={window_open_and_close}
        timeout={200}
        classNames={{
          enter: s.windowEnter,
          enterActive: s.windowEnterActive,
          exit: s.windowExit,
          exitActive: s.windowExitActive,
        }}
        unmountOnExit
      >
        <ModalWindow />
      </CSSTransition>
    </div>
  );
}

export default Main;
