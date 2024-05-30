import React from 'react';
import './sideBar.css';

function SideBar() {
    return (
        <aside id="sidebar" className="sidebar">
            <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
             <img src="/Nirmaan_Logo.png" alt="Nirmaan Logo" style={{ maxHeight: '36px', marginRight: '6px' }} />
                 <span style={{ color: 'white', fontSize: '20px' }}></span>
            </div>

        <div className="logo-divider"></div>
        <ul className='sidebar-nav' id='sidebar-nav'>
            <li className="nav-item">
                    <a href="/" className="nav-link">
                        <i className='bi bi-speedometer'></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/model" className="nav-link">
                        <i className='bi bi-nvidia'></i>
                        <span>Models</span>
                    </a>
                </li>
                <li className="nav-item provider-item">
                    <a href="/provider" className="nav-link">
                       <i className='bi bi-person-gear'></i>
                       <span>Providers</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a href="https://twitter.com/nirmaanai" className="nav-link">
                       <i className='bi bi-info-circle'></i>
                       <span>About Us</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="https://twitter.com/nirmaanai" className="nav-link">
                        <i className='bi bi-twitter-x'></i>
                        <span>Twitter</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="https://t.me/nirmaanai" className="nav-link">
                        <i className='bi bi-telegram'></i>
                        <span>Telegram</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="https://mirror.xyz/0xC36A87666c505Fe695fc097d238725ff4d34877D" className="nav-link">
                        <i className='bi bi-bookmarks-fill'></i>
                        <span>Mirror</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}

export default SideBar;
