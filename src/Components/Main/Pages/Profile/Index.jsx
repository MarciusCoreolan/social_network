import React from 'react';
import s from './profile.module.css';
import { useSelector } from 'react-redux';

function Profile(props) {
  const userName = useSelector((state) => state.user.item.userName);

  return (
    <div className="pages">
      <div className={s.welcome}>Добро пожаловать!</div>
      <div className={s.users}>{userName ? userName : 'Гость'}</div>
    </div>
  );
}
export default Profile;
