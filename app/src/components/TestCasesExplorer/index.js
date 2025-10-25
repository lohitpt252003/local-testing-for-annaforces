import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function TestCasesExplorer({ theme }) {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Test Cases Explorer';
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:5001/problems');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProblems(data);
      } catch (e) {
        setError(`Failed to fetch problems: ${e.message}`);
      }
    };

    fetchProblems();
  }, []);

  if (error) {
    return <div className={`testcases-explorer-container ${theme}`}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className={`testcases-explorer-container ${theme}`}>
      <h1>Test Cases Explorer</h1>
      <p>Select a problem to view its test cases.</p>
      {problems.length > 0 ? (
        <table className="testcases-explorer-table">
          <thead>
            <tr>
              <th>Problem ID</th>
              <th>Title</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <tr key={problem.id}>
                <td>{problem.id}</td>
                <td>{problem.title}</td>
                <td>
                  <Link to={`/problems/${problem.id}/testcases`} className="testcases-explorer-link">View Test Cases</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading problems...</p>
      )}
    </div>
  );
}

export default TestCasesExplorer;
