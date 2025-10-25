import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header({ theme, toggleTheme }) {
  return (
    <header className={`header-header-container ${theme}`}>
      <div className="header-title">
        <Link to="/"><h1>Local Problem Viewer</h1></Link>
      </div>
      <nav className="header-nav">
        <Link to="/problems">Problems</Link>
        <Link to="/contests">Contests</Link>
        <Link to="/solutions">Solutions</Link>
        <Link to="/testcases">Test Cases</Link>
      </nav>
      <button onClick={toggleTheme} className="header-button">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}

export default Header;
