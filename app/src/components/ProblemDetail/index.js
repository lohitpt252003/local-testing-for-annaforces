import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from '../MarkdownRenderer';
import CopyButton from '../CopyButton';
import SubmissionForm from '../SubmissionForm';
import SubmissionResult from '../SubmissionResult';
import './index.css';

function ProblemDetail({ theme }) {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [partOfContests, setPartOfContests] = useState([]);
  const [error, setError] = useState(null);
  const [collapsedSamples, setCollapsedSamples] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const problemResponse = await fetch(`http://localhost:5001/problems/${problemId}`);
        if (problemResponse.status === 404) {
          setProblem({ error: "Problem not found" });
          return;
        }
        if (!problemResponse.ok) {
          throw new Error(`HTTP error! status: ${problemResponse.status}`);
        }
        const problemData = await problemResponse.json();
        setProblem(problemData);

        if (problemData.samples_data) {
          const initialCollapsedState = {};
          problemData.samples_data.forEach((_, index) => {
            initialCollapsedState[index] = true;
          });
          setCollapsedSamples(initialCollapsedState);
        }

        const contestsResponse = await fetch(`http://localhost:5001/problems/${problemId}/contests`);
        if (contestsResponse.ok) {
          const contestsData = await contestsResponse.json();
          setPartOfContests(contestsData);
        }

      } catch (e) {
        setError(`Failed to fetch problem data: ${e.message}`);
      }
    };

    fetchProblemData();
  }, [problemId]);

  useEffect(() => {
    if (problem && problem.meta && problem.meta.content && problem.meta.content.title) {
      document.title = `Problem: ${problem.meta.content.title}`;
    } else {
      document.title = 'Problem Detail';
    }
  }, [problem]);

  const toggleSampleCollapse = (index) => {
    setCollapsedSamples(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const SectionHeader = ({ title, filePath }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>{title}</h2>
      {filePath && <div style={{ fontSize: '0.7em', color: '#aaa' }}>{filePath}</div>}
    </div>
  );

  if (error) {
    return <div className={`problem-detail-container ${theme}`}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!problem) {
    return <div className={`problem-detail-container ${theme}`}><p>Loading problem details...</p></div>;
  }

  if (problem.error && problem.error === "Problem not found") {
    return <div className={`problem-detail-container ${theme}`}><p>Problem not available.</p></div>;
  }

  return (
    <div className={`problem-detail-container ${theme}`}>
      <div style={{ fontSize: '0.7em', color: '#aaa', textAlign: 'right' }}>
        Component: src/components/ProblemDetail/index.js
      </div>
      <h1>{problem.meta.content.title} (ID: {problemId})</h1>
      <h6 style={{ fontSize: '0.8em', color: '#888', marginTop: '-10px' }}>{problem.absolute_path}</h6>
      <p><strong>Difficulty:</strong> {problem.meta.content.difficulty}</p>
      <p><strong>Time Limit:</strong> {problem.meta.content.timeLimit} ms</p>
      <p><strong>Memory Limit:</strong> {problem.meta.content.memoryLimit} MB</p>
      <p><strong>Authors:</strong> {problem.meta.content.authors ? problem.meta.content.authors.join(', ') : 'N/A'}</p>
      <p><strong>Tags:</strong> {problem.meta.content.tags ? problem.meta.content.tags.join(', ') : 'N/A'}</p>

      {partOfContests.length > 0 && (
        <div className="problem-detail-contests">
          <strong>Part of Contests:</strong>
          <ul>
            {partOfContests.map(contest => (
              <li key={contest.id}>
                <Link to={`/contests/${contest.id}`}>{contest.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <SectionHeader title="Description" filePath={problem.description.file_path} />
      {problem.description.content && <MarkdownRenderer content={problem.description.content} />}

      <div className="problem-detail-actions">
        <Link to={`/solutions/${problemId}`} className="problem-detail-view-solution-button">
          View Solution
        </Link>
        <Link to={`/problems/${problemId}/testcases`} className="problem-detail-view-testcases-button">
          View Test Cases
        </Link>
      </div>

      <SectionHeader title="Input" filePath={problem.input.file_path} />
      {problem.input.content && <MarkdownRenderer content={problem.input.content} />}

      <SectionHeader title="Output" filePath={problem.output.file_path} />
      {problem.output.content && <MarkdownRenderer content={problem.output.content} />}

      <SectionHeader title="Constraints" filePath={problem.constraints.file_path} />
      {problem.constraints.content && <MarkdownRenderer content={problem.constraints.content} />}

      <SectionHeader title="Notes" filePath={problem.notes.file_path} />
      {problem.notes.content && <MarkdownRenderer content={problem.notes.content} />}

      <h2>Sample Cases</h2>
      {problem.samples_data && problem.samples_data.length > 0 ? (
        problem.samples_data.map((sample, index) => {
          const isCollapsed = collapsedSamples[index];
          return (
            <div key={index} className="problem-detail-sample-case">
              <h3 onClick={() => toggleSampleCollapse(index)} style={{ cursor: 'pointer' }}>
                <span className={`problem-detail-collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>
                  {isCollapsed ? '▶' : '▼'}
                </span>
                Sample {index + 1}
              </h3>
              {!isCollapsed && (
                <>
                  {sample.description && <MarkdownRenderer content={sample.description} />}
                  <h4>Input <CopyButton textToCopy={sample.input} theme={theme} /></h4>
                  <pre>{sample.input}</pre>
                  <h4>Output <CopyButton textToCopy={sample.output} theme={theme} /></h4>
                  <pre>{sample.output}</pre>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p>No sample cases available.</p>
      )}

      <SubmissionForm problemId={problemId} setSubmissionResult={setSubmissionResult} />
      <SubmissionResult result={submissionResult} />
    </div>
  );
}

export default ProblemDetail;
