import React from 'react';
import s from './user.module.css';
import Button from '../../../../Component/Button';

function User(props) {
 return (
   <div
     className={s.user_profile_card}
     onClick={() => props.click(props.user.id)}
   >
    <div>
     <img src={`${props.user.avatar}`} alt="" />
    </div>
    <div>{props.user.userName}</div>
    <div>{props.user.email}</div>
    <Button
      text={'Сообщения'}
      click={props.clickMessage}
      id={props.user.id}
      name={props.user.userName}
    />
   </div>
 );
}

export default User;
