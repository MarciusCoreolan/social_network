import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Feed.module.css';
import ApprovedPosts from './AppRovedPosts/index';
import NotApprovedPosts from './NotAppRovedPosts/index';
import AddNewPost from './AddNewPost/index';
import ReactLoading from 'react-loading';
import { CSSTransition } from 'react-transition-group';
import { getPosts } from '../../../../Redux/Ducks/postsReducer';

function Feed(props) {
 const dispatch = useDispatch();
 const postsLoading = useSelector((state) => state.posts.postsLoading); //Прелоадер для постов
 const addNewPostWindow = useSelector(
   (state) => state.addPost.addNewPostWindowOpenAndClose,
 );

 useEffect(() => {
  //Загружаем посты
  dispatch(getPosts());
 }, [dispatch]);

 return (
   <div className="pages wrapper">
    <div className={s.feed_page}>
     {/*анимация вызова компонента добавляения новго поста */}
     <CSSTransition
       in={addNewPostWindow}
       timeout={200}
       unmountOnExit
       classNames={{
        enter: s.addNewPost_enter,
        enterActive: s.addNewPost_enter_active,
        exit: s.addNewPost_exit,
        exitActive: s.addNewPost_exit_active,
       }}
     >
      {<AddNewPost />}
     </CSSTransition>

     {/*загрузка=================================*/}
     {postsLoading ? (
       <div className="loading">
        <ReactLoading
          type={'spokes'}
          color={'#000'}
          height={100}
          width={100}
        />
       </div>
     ) : (
       //разделяем посты на одобренные и не одобренные
       <div>
        <NotApprovedPosts />
        <ApprovedPosts />
       </div>
     )}
    </div>
   </div>
 );
}

export default Feed;
