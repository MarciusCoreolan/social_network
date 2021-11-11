import React, { useState } from 'react';
import s from './authModalWindow.module.css';
import Input from '../../../Component/Input';
import { useDispatch, useSelector } from 'react-redux';
import ButtonWhite from '../../../Component/ButtonWhite';
import { useHistory } from 'react-router-dom';
import ButtonNav from '../../../Component/ButtonNav';
import { logIn } from '../../../../Redux/Ducks/userAuthReducer';

function AuthModalWindow(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  //получаем данные из инпутов===============================================================================
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  //отпарялем запрос на авторизацию ==========================================
  const handleAuth = () => {
    dispatch(logIn(login, pass, history)); //передаем логин и пароль который ввел пользователь
  };

  const handleOpenReg = () => {
    props.setRotateWindow(!props.rotateWindow);
  };

  return (
    <div className={s.authModal}>
      <Input text={'Login'} type={'text'} value={login} onChange={setLogin} />
      <Input
        text={'Password'}
        type={'password'}
        value={pass}
        onChange={setPass}
      />

      <div className={s.auth_error}>{error === null ? '' : error}</div>
      <div className={s.logIn}>
        <ButtonWhite text={'Войти'} click={handleAuth} />
      </div>
      <div className={s.registration_button}>
        <ButtonNav text={'Зарегистрироваться'} click={handleOpenReg} />
      </div>
    </div>
  );
}

export default AuthModalWindow;
