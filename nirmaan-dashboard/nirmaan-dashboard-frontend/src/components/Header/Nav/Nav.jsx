import React from 'react';
import './nav.css';
import NavWalletConnect from './NavWalletConnect';

function Nav({ onWalletConnection }) {
  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        <NavWalletConnect onWalletConnection={onWalletConnection} />
      </ul>
    </nav>
  );
}

export default Nav;
