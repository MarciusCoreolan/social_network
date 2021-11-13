import React from 'react';
import Posts from '../Posts/Index';
import { useDispatch, useSelector } from 'react-redux';
import {
 adminApprovedPost,
 adminDeletePost,
} from '../../../../../Redux/Ducks/postsReducer';

function NotApprovedPosts(props) {
 const dispatch = useDispatch();
 const posts = useSelector((state) =>
   state.posts.item.filter((post) => post.approved === false),
 ); //получаем посты и сразу фильтруем на неодобренные
 const userName = useSelector((state) => state.user.item.userName); //получаем юзернейм пользователя который авторизовался
 const moderate = useSelector((state) => state.user.item.moderate); //проверяем является ли пользователь админом

 const handleDelete = (id) => {
  //функция удаления неодобренной поста админом
  dispatch(adminDeletePost(id)); //передаем айди поста на сервер
 };
 const handleApproved = (id) => {
  //функция одобреня поста админом
  dispatch(adminApprovedPost(id)); //передаем айди поста на сервер
 };

 return (
   <div>
    {posts // ниже делаем проверку по полученным ключам зарегистрированы ли
      // пользователи является ли он админом или автором не одобренного поста
      .filter((post) => userName === post.author || moderate === true)
      .map(
        (
          post, //если авторизованный пользователь админ или является автором поста то он видит свои не одобренные посты
        ) => (
          <Posts
            post={post}
            key={post.id}
            moderate={moderate}
            approved={post.approved}
            id={post.id}
            handleDelete={handleDelete}
            handleApproved={handleApproved}
          />
        ),
      )}
   </div>
 );
}

export default NotApprovedPosts;
