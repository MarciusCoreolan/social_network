import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../Component/Input';
import s from './addNewPost.module.css';
import ButtonWhite from '../../../../Component/ButtonWhite';
import {
  addNewPost,
  addTextNewPost,
  addTitleNewPost,
} from '../../../../../Redux/Ducks/postsReducer';

function AddNewPost(props) {
  const dispatch = useDispatch();

  const title = useSelector((state) => state.addPost.titleNewPost);
  const text = useSelector((state) => state.addPost.textNewPost);
  const userName = useSelector((state) => state.user.item.userName);
  const userId = useSelector((state) => state.user.item.id);

  const titleNewPost = (title) => {
    dispatch(addTitleNewPost(title));
  };
  const textNewPost = (text) => {
    dispatch(addTextNewPost(text));
  };

  const handleAddNewPost = () => {
    if (title && text !== '') {
      dispatch(addNewPost(title, text, userName, userId));
      dispatch(addTitleNewPost(''));
      dispatch(addTextNewPost(''));
    } else {
      alert('упс! вы ничего не написали');
    }
  };

  return (
    <div className={s.add_new_post}>
      <Input text={'Заголовок'} value={title} onChange={titleNewPost} />
      <Input text={'Введите Текст'} value={text} onChange={textNewPost} />
      <ButtonWhite text={'Добавить'} click={handleAddNewPost} />
    </div>
  );
}

export default AddNewPost;
