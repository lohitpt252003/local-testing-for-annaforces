import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function SolutionList({ theme }) {
  const [solutionIds, setSolutionIds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Solutions';
    const fetchSolutions = async () => {
      try {
        const response = await fetch('http://localhost:5001/solutions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSolutionIds(data);
      } catch (e) {
        setError(`Failed to fetch solutions: ${e.message}`);
      }
    };

    fetchSolutions();
  }, []);

  if (error) {
    return <div className={`solution-list-container ${theme}`}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className={`solutionlist-container ${theme}`}>
      <h1>Available Solutions</h1>
      {solutionIds.length > 0 ? (
        <table className="solutionlist-table">
          <thead>
            <tr>
              <th>Problem ID</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {solutionIds.map(problemId => (
              <tr key={problemId}>
                <td>{problemId}</td>
                <td>
                  <Link to={`/solutions/${problemId}`} className="solutionlist-link">View Solution</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No solutions available.</p>
      )}
    </div>
  );
}

export default SolutionList;
