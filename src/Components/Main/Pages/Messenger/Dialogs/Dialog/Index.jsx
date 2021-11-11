import React from 'react';
import s from './dialog.module.css';

function Dialog(props) {
  return (
    <div
      className={s.dialog}
      onClick={() =>
        props.click(props.dialog.userOpponentId, props.dialog.userOpponentName)
      }
    >
      {props.dialog.userOpponentName}
    </div>
  );
}

export default Dialog;
