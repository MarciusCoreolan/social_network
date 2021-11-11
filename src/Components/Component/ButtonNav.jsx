import React from 'react';
import s from './style.module.css';

function ButtonNav(props) {
  return (
    <button className={s.button_nav} onClick={() => props.click(props.id)}>
      {props.text}
    </button>
  );
}

export default ButtonNav;
