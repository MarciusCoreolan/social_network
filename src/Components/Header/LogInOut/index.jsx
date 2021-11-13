import React from 'react';
import s from './logInOut.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ButtonNav from '../../Component/ButtonNav';
import { logOut, windowOpen } from '../../../Redux/Ducks/userAuthReducer';
import { addNewPostWindowClose } from '../../../Redux/Ducks/postsReducer';

function LogInOut(props) {
 const dispatch = useDispatch();
 const logInLogOut = useSelector((state) => state.user.logInLogOut);

 const handleLogIn = () => {
  dispatch(windowOpen());
 };
 const handleLogOut = () => {
  dispatch(logOut());
  dispatch(addNewPostWindowClose());
 };

 return (
   <div className={s.log_in_out}>
    {logInLogOut ? (
      <ButtonNav text={'Выйти'} click={handleLogOut} />
    ) : (
      <ButtonNav text={'Войти'} click={handleLogIn} />
    )}
   </div>
 );
}

export default LogInOut;
