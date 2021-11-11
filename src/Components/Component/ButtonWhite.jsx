import React from 'react';
import s from './style.module.css';

function ButtonWhite(props) {
  return (
    <button className={s.button_white} onClick={() => props.click(props.id)}>
      {props.text}
    </button>
  );
}

export default ButtonWhite;
