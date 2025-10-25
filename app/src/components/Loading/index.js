import React from 'react';
import './index.css';

const Loading = ({ theme }) => {
  return (
    <div className={`loading-container ${theme}`}>
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
