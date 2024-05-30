import React from 'react';
import './logo.css';

function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/public" className="logo d-flex align-items-center">
        <img src="/Nirmaan_Logo.png" alt="MOR" />
      </a>
      <i
        className="bi bi-list toggle-sidebar-btn icon-style"
        onClick={handleToggleSideBar}
      ></i>
    </div>
  );
}

export default Logo;
