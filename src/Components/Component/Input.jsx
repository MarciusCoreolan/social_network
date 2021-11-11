import React from 'react';
import s from './style.module.css';

function Input(props) {
  return (
    <div>
      <input
        className={s.input}
        type={props.type}
        placeholder={props.text}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
}

export default Input;
