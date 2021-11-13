import React from 'react';
import s from './Header.module.css';
import Logo from './Logo/index';
import LogInOut from './LogInOut/index';
import Navigation from './Navigation/index';

function Header(props) {
  return (
    <header>
      <div className="wrapper">
        <div className={s.header_container}>
          <Logo />
          <Navigation />
          <LogInOut />
        </div>
      </div>
    </header>
  );
}

export default Header;
