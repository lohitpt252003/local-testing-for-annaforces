import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '../MarkdownRenderer';
import './index.css';

function SolutionDetail({ theme }) {
  const { problemId } = useParams();
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolutionDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5001/solutions/${problemId}`);
        if (response.status === 404) {
          setSolution({ error: "Solution not found" });
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSolution(data.solution);
      } catch (e) {
        setError(`Failed to fetch solution details: ${e.message}`);
      }
    };

    fetchSolutionDetail();
  }, [problemId]);

  useEffect(() => {
    if (solution && !solution.error) {
      document.title = `Solution: ${problemId}`;
    } else {
      document.title = 'Solution Detail';
    }
  }, [solution, problemId]);

  if (error) {
    return <div className={`solution-detail-container ${theme}`}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!solution || (solution.error && solution.error === "Solution not found")) {
    return <div className={`solution-detail-container ${theme}`}><p>Solution not available.</p></div>;
  }

  return (
    <div className={`solution-detail-container ${theme}`}>
      <div style={{ fontSize: '0.7em', color: '#aaa', textAlign: 'right' }}>
        Component: src/components/SolutionDetail/index.js
      </div>
      <h1>Solution for Problem {problemId}</h1>
      {solution.file_path && <div style={{ fontSize: '0.8em', color: '#888', marginBottom: '1em' }}>Source: {solution.file_path}</div>}
      {solution.authors && solution.authors.length > 0 && (
        <p><strong>Author(s):</strong> {solution.authors.join(', ')}</p>
      )}
      {solution.content && <MarkdownRenderer content={solution.content} />}
    </div>
  );
}

export default SolutionDetail;
