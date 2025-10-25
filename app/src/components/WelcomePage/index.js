import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function WelcomePage({ theme }) {
  useEffect(() => {
    document.title = 'Welcome';
  }, []);

  return (
    <div className={`welcome-page-container ${theme}`}>
      <h1>Welcome to the Local Problem Viewer</h1>
      <p>This is a local testing environment for Annaforces problems and contests.</p>
      <div className="welcome-page-links">
        <Link to="/problems" className="welcome-page-link">View Problems</Link>
        <Link to="/contests" className="welcome-page-link">View Contests</Link>
        <Link to="/solutions" className="welcome-page-link">View Solutions</Link>
        <Link to="/testcases" className="welcome-page-link">View Test Cases</Link>
      </div>
    </div>
  );
}

export default WelcomePage;