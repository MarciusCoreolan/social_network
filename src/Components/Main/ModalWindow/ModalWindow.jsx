import React, { useState } from 'react';
import s from './ModalWindow.module.css';
import AuthModalWindow from './AuthModalWindow/Index';
import { windowClose } from '../../../Redux/Ducks/userAuthReducer';
import { useDispatch } from 'react-redux';
import ModalReg from './ModalWindowRegistration/ModalReg';
import { CSSTransition } from 'react-transition-group';
import { regError } from '../../../Redux/Ducks/registrationReducer';

function ModalWindow(props) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(windowClose());
    dispatch(regError(''));
  };

  const [rotateWindow, setRotateWindow] = useState(true);

  return (
    <div className={s.background} onClick={handleClose}>
      <CSSTransition
        in={rotateWindow}
        timeout={900}
        classNames={{
          enter: s.windowEnter,
          enterActive: s.windowEnterActive,
          exit: s.windowExit,
          exitActive: s.windowExitActive,
        }}
        unmountOnExit
      >
        <div onClick={(e) => e.stopPropagation()} className={s.window}>
          <AuthModalWindow
            rotateWindow={rotateWindow}
            setRotateWindow={setRotateWindow}
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={!rotateWindow}
        timeout={900}
        classNames={{
          enter: s.windowEnter,
          enterActive: s.windowEnterActive,
          exit: s.windowExit,
          exitActive: s.windowExitActive,
        }}
        unmountOnExit
      >
        <div onClick={(e) => e.stopPropagation()} className={s.window}>
          <ModalReg
            rotateWindow={rotateWindow}
            setRotateWindow={setRotateWindow}
          />
        </div>
      </CSSTransition>
    </div>
  );
}

export default ModalWindow;
