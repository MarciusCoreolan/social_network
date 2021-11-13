import React from 'react';
import s from './Logo.module.css';

function Logo(props) {
  return (
    <div className={s.logo}>
      <div className={s.logo_image}>
        <i className="fa fa-github" aria-hidden="true" />
      </div>
    </div>
  );
}

export default Logo;
