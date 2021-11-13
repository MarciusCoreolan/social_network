import React from 'react';
import s from './navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import ButtonNav from '../../Component/ButtonNav';
import { getDialogs } from '../../../Redux/Ducks/dialogsReducer';
import {
  addNewPostWindowClose,
  addNewPostWindowOpenClose,
} from '../../../Redux/Ducks/postsReducer';

function Navigation(props) {
  const dispatch = useDispatch();
  const history = useHistory(); //используем хук для перехода по страницам
  const userId = useSelector((state) => state.user.item.id); //получаем айди юзера когда он авторизуется

  const handleOpenProfile = () => {
    history.push('/profile');
    dispatch(addNewPostWindowClose());
  };
  const handleOpenDialogs = () => {
    history.push('/dialogs');
    dispatch(getDialogs(userId));
    dispatch(addNewPostWindowClose());
  };
  const handleOpenFeed = () => {
    history.push('/feed');
  };
  const handleOpenAddPost = () => {
    // функция открытия и закрытия модального окна добаления поста на странице feed
    dispatch(addNewPostWindowOpenClose());
  };
  const handleOpenUsers = () => {
    history.push('/users');
    dispatch(addNewPostWindowClose());
  };

  return (
    <nav className={s.nav_panel}>
      <div className={s.nav_panel_items}>
        <div className={s.nav_item}>
          <ButtonNav
            text={<i className="fa fa-user" aria-hidden="true" />}
            click={handleOpenProfile}
          />
          <div className={s.nav_item_text}>Профиль</div>
        </div>
        {userId ? (
          <>
            <div className={s.nav_item}>
              <ButtonNav
                text={<i className="fa fa-comments" aria-hidden="true" />}
                click={handleOpenDialogs}
              />
              <div className={s.nav_item_text}>Сообщения</div>
            </div>
            <div className={s.nav_item}>
              <ButtonNav
                text={<i className="fa fa-users" aria-hidden="true" />}
                click={handleOpenUsers}
              />
              <div className={s.nav_item_text}>Пользователи</div>
            </div>
          </>
        ) : (
          ''
        )}
        <div className={s.nav_item}>
          <ButtonNav
            text={<i className="fa fa-newspaper-o" aria-hidden="true" />}
            click={handleOpenFeed}
          />
          <div className={s.nav_item_text}>Новости</div>
        </div>
        {userId ? (
          <Route path={'/feed'}>
            <div className={s.nav_item}>
              <ButtonNav
                text={<i className="fa fa-plus-square-o" aria-hidden="true" />}
                click={handleOpenAddPost}
              />
              <div className={s.nav_item_text}>Добавить</div>
            </div>
          </Route>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
}

export default Navigation;
