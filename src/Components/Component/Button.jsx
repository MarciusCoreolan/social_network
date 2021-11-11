import React from 'react';
import s from './style.module.css';

function Button(props) {
  return (
    <button
      className={s.button}
      onClick={() => props.click(props.id, props.name)}
    >
      {props.text}
    </button>
  );
}

export default Button;
