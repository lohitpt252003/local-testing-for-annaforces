import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import CopyButton from '../CopyButton';
import './index.css';

function TestCasesViewer({ theme }) {
  const { problemId } = useParams();
  const [testCases, setTestCases] = useState({ sample_cases: [], normal_cases: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsedCases, setCollapsedCases] = useState({});

  useEffect(() => {
    document.title = `Test Cases for ${problemId}`;
    const fetchTestCases = async () => {
      try {
        const response = await fetch(`http://localhost:5001/problems/${problemId}/testcases`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const sortCases = (cases) => {
          return cases.sort((a, b) => {
            const numA = parseInt(a.name.split('.')[0], 10);
            const numB = parseInt(b.name.split('.')[0], 10);
            return numA - numB;
          });
        };

        const sortedSampleCases = sortCases(data.sample_cases);
        const sortedNormalCases = sortCases(data.normal_cases);

        setTestCases({
          sample_cases: sortedSampleCases,
          normal_cases: sortedNormalCases,
        });

        const initialCollapsedState = {};
        sortedSampleCases.forEach(tc => {
          initialCollapsedState[tc.name] = true;
        });
        sortedNormalCases.forEach(tc => {
          initialCollapsedState[tc.name] = true;
        });
        setCollapsedCases(initialCollapsedState);

      } catch (e) {
        setError(`Failed to fetch test cases: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTestCases();
  }, [problemId]);

  const toggleCollapse = (caseName) => {
    setCollapsedCases(prev => ({
      ...prev,
      [caseName]: !prev[caseName]
    }));
  };

  const renderTestCase = (tc, index) => {
    const isCollapsed = collapsedCases[tc.name];
    return (
      <div key={index} className="testcases-viewer-case-container">
        <h4 onClick={() => toggleCollapse(tc.name)} style={{ cursor: 'pointer' }}>
          <span className={`testcases-viewer-collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>
            {isCollapsed ? '▶' : '▼'}
          </span>
          Test Case #{index + 1}: {tc.name}
        </h4>
        <h6 style={{ fontSize: '0.8em', color: '#888', marginTop: '-10px' }}>{tc.absolute_path}</h6>
        {!isCollapsed && (
          <>
            <h5>Input ({tc.input_file}) <CopyButton textToCopy={tc.input} theme={theme} /></h5>
            <pre>{tc.input}</pre>
            <h5>Output ({tc.output_file}) <CopyButton textToCopy={tc.output} theme={theme} /></h5>
            <pre>{tc.output}</pre>
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return <Loading theme={theme} />;
  }

  if (error) {
    return <div className={`testcases-viewer-container ${theme}`}><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className={`testcases-viewer-container ${theme}`}>
      <div style={{ fontSize: '0.7em', color: '#aaa', textAlign: 'right' }}>
        Component: src/components/TestCasesViewer/index.js
      </div>      <h1>Test Cases for {problemId}</h1>
      
      <section>
        <h2>Sample Cases</h2>
        {testCases.sample_cases.length > 0 ? 
          testCases.sample_cases.map(renderTestCase) : 
          <p>No sample cases found.</p>}
      </section>

      <section>
        <h2>Normal Test Cases</h2>
        {testCases.normal_cases.length > 0 ? 
          testCases.normal_cases.map(renderTestCase) : 
          <p>No normal test cases found.</p>}
      </section>
    </div>
  );
}

export default TestCasesViewer;
