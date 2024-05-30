import React from 'react';
import './header.css';
import Logo from './Logo/Logo';
import Nav from './Nav/Nav';

function Header({ onWalletConnection }) {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <Logo />
      <Nav onWalletConnection={onWalletConnection} />
    </header>
  );
}

export default Header;
