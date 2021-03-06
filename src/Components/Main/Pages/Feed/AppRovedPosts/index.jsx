import React from 'react';
import s from './appRoved.module.css';
import Posts from '../Posts/index';
import { useSelector } from 'react-redux';

function ApprovedPosts(props) {
  const posts = useSelector((state) => state.posts.item);

  return (
    <div className={s.posts}>
      {posts
        .filter((post) => post.approved === true)
        .map((item) => (
          <Posts post={item} key={item.id} approved={item.approved} />
        ))}
    </div>
  );
}

export default ApprovedPosts;
