import React from 'react';
import s from './header.module.css';
import Logo from './Logo/Index';
import LogInOut from './LogInOut/Index';
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
