import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '../MarkdownRenderer';
import './index.css';

function ContestDetail({ theme }) {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [error, setError] = useState(null);
  const [isProblemsCollapsed, setIsProblemsCollapsed] = useState(true);

  useEffect(() => {
    const fetchContestDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5001/contests/${contestId}`);
        if (response.status === 404) {
          setContest({ error: "Contest not found" });
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContest(data);
      } catch (e) {
        setError(`Failed to fetch contest details: ${e.message}`);
      }
    };

    fetchContestDetail();
  }, [contestId]);

  useEffect(() => {
    if (contest && contest.meta && contest.meta.content && contest.meta.content.name) {
      document.title = `Contest: ${contest.meta.content.name}`;
    } else {
      document.title = 'Contest Detail';
    }
  }, [contest]);

  const toggleProblemsCollapse = () => {
    setIsProblemsCollapsed(!isProblemsCollapsed);
  };

  const SectionHeader = ({ title, filePath }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>{title}</h2>
      {filePath && <div style={{ fontSize: '0.7em', color: '#aaa' }}>{filePath}</div>}
    </div>
  );

  if (error) {
    return <div className={`contest-detail-container ${theme}`}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!contest || (contest.error && contest.error === "Contest not found")) {
    return <div className={`contest-detail-container ${theme}`}><p>Contest not available.</p></div>;
  }

  return (
    <div className={`contest-detail-container ${theme}`}>
      <div style={{ fontSize: '0.7em', color: '#aaa', textAlign: 'right' }}>
        Component: src/components/ContestDetail/index.js
      </div>
      <h1>{contest.meta.content.name} (ID: {contestId})</h1>
      <h6 style={{ fontSize: '0.8em', color: '#888', marginTop: '-10px' }}>{contest.absolute_path}</h6>
      <p><strong>Description:</strong> {contest.meta.content.description}</p>
      <p><strong>Start Time:</strong> {new Date(contest.meta.content.startTime).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(contest.meta.content.endTime).toLocaleString()}</p>
      <p><strong>Authors:</strong> {contest.meta.content.authors.join(', ')}</p>

      <SectionHeader title="Contest Details" filePath={contest.contest.file_path} />
      {contest.contest.content && <MarkdownRenderer content={contest.contest.content} />}

      <SectionHeader title="Theory" filePath={contest.theory.file_path} />
      {contest.theory.content && <MarkdownRenderer content={contest.theory.content} />}

      <SectionHeader title="Rules" filePath={contest.rules.file_path} />
      {contest.rules.content && <MarkdownRenderer content={contest.rules.content} />}

      <h2 onClick={toggleProblemsCollapse} style={{ cursor: 'pointer' }}>
        <span className={`contest-detail-collapse-icon ${isProblemsCollapsed ? 'collapsed' : ''}`}>
          {isProblemsCollapsed ? '▶' : '▼'}
        </span>
        Problems
      </h2>
      {!isProblemsCollapsed && (
        <ul>
          {contest.meta.content.problems.map(problemId => (
            <li key={problemId}>
              <a href={`/problems/${problemId}`}>{problemId}</a>
            </li>
          ))}
        </ul>
      )}

      {/* Display other contest details as needed */}

    </div>
  );
}

export default ContestDetail;
