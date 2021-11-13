import React, {useEffect} from 'react';
import s from './users.module.css';
import { useDispatch, useSelector } from 'react-redux';
import User from './User/Index';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { getMessages } from '../../../../Redux/Ducks/messagesReducer';
import {getUsers} from "../../../../Redux/Ducks/usersReducer";

function Users(props) {
 const history = useHistory();
 const dispatch = useDispatch();
 const usersLoading = useSelector((state) => state.users.usersLoading);
 const userName = useSelector((state) => state.user.item.userName);
 const users = useSelector((state) => state.users.item);

 const openUserProfile = (id) => {};

 const handleOpenDialog = (opponentId, opponentName) => {
  dispatch(getMessages(userName, opponentName));
  history.push(`/messages/${opponentId}${opponentName}`);
 };

 useEffect(()=>{
  dispatch(getUsers()); // получаем всех пользователей на странице users для их дальнейшего поиска
 },[dispatch])

 return (
   <div className="pages wrapper">
    <div className={s.users_page}>
     {usersLoading ? (
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
        {users.map((user) => (
          <User
            user={user}
            click={openUserProfile}
            clickMessage={handleOpenDialog}
            key={user.id}
          />
        ))}
       </>
     )}
    </div>
   </div>
 );
}

export default Users;
