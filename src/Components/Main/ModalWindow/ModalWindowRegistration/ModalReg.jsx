import React from 'react';
import s from './registration.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  createDialog,
  regError,
  registrationNewUser,
  userLogin,
  userMail,
  userName,
  userPass,
} from '../../../../Redux/Ducks/registrationReducer';
import Input from '../../../Component/Input';
import ButtonWhite from '../../../Component/ButtonWhite';
import ButtonNav from '../../../Component/ButtonNav';

function ModalReg(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const name = useSelector((state) => state.registr.userName);
  const login = useSelector((state) => state.registr.userLogin);
  const pass = useSelector((state) => state.registr.userPass);
  const email = useSelector((state) => state.registr.userEmail);
  const error = useSelector((state) => state.registr.error);

  const getName = (name) => {
    dispatch(userName(name));
  };
  const getLogin = (login) => {
    dispatch(userLogin(login));
  };
  const getPass = (pass) => {
    dispatch(userPass(pass));
  };
  const getEmail = (mail) => {
    dispatch(userMail(mail));
  };

  const registration = () => {
    if (name && login && pass && email) {
      dispatch(registrationNewUser(name, login, pass, email, history));
      dispatch(createDialog());
    } else {
      dispatch(regError('Ошибка! все поля должны быть заполнены'));
    }
  };

  const handleOpenReg = () => {
    props.setRotateWindow(!props.rotateWindow);
  };

  return (
    <>
      <Input text={'Имя'} value={name} onChange={getName} />
      <Input text={'Логин'} value={login} onChange={getLogin} />
      <Input text={'Пароль'} value={pass} onChange={getPass} />
      <Input text={'Email'} value={email} onChange={getEmail} />
      {error === null ? '' : <div className={s.error_reg}>{error}</div>}
      <div className={s.registration_button}>
        <ButtonWhite text={'Зарегистрироваться'} click={registration} />
      </div>
      <div className={s.logIn}>
        <ButtonNav text={'Войти'} click={handleOpenReg} />
      </div>
    </>
  );
}

export default ModalReg;
