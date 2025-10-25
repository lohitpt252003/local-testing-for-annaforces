import React from 'react';
import { toast } from 'react-toastify';
import './index.css';

function CopyButton({ textToCopy, theme }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy!');
    }
  };

  return (
    <button onClick={handleCopy} className={`copy-button ${theme}`} title="Copy">
      <i className="fa-regular fa-copy"></i>
    </button>
  );
}

export default CopyButton;