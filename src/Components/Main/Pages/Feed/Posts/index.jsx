import React from 'react';
import s from './posts.module.css';

function Posts(props) {
 return (
   // ниже проверка одобренна новость или нет и применяются разные стили
   <div className={props.approved ? s.approved_post : s.not_approved_post}>
    {props.approved !== true && props.moderate === true ? ( //если пост не одобрен и пользователь админ показываем кнопки одобрить и удалить пост
      // ниже кнопки получают через пропсы функции и передают туда айди кликнутого поста
      <div className={s.post_icons}>
       <button onClick={() => props.handleApproved(props.id)}>
        <i className="fa fa-check-circle-o" aria-hidden="true"/>
       </button>
       <button onClick={() => props.handleDelete(props.id)}>
        <i className="fa fa-trash-o" aria-hidden="true"/>
       </button>
      </div>
    ) : (
      ''
    )}
    <div className={s.post_title}>{props.post.title}</div>
    <hr />
    <div className={s.post_text}>{props.post.text}</div>
    <div className={s.author}>Автор: {props.post.author}</div>
   </div>
 );
}

export default Posts;
