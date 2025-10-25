import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import './index.css';

function ProblemList({ problems, theme }) {
  useEffect(() => {
    document.title = 'Problems';
  }, []);

  return (
    <div className={`problemlist-problem-list-container ${theme}`}>
      <h2>Available Problems</h2>
      {problems ? (
        <table className="problemlist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
              <th>Authors</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td>{problem.id}</td>
                <td>
                  <Link to={`/problems/${problem.id}`} className="problemlist-title-link">
                    {problem.title}
                  </Link>
                </td>
                <td>{problem.difficulty}</td>
                <td className="problemlist-tags">{problem.tags.join(', ')}</td>
                <td>{problem.authors.join(', ')}</td>
                <td>
                  <Link to={`/solutions/${problem.id}`} className="problemlist-solution-link">
                    View Solution
                  </Link>
                </td>
              </tr>
            ))}}
          </tbody>
        </table>
      ) : (
        <Loading theme={theme} />
      )}
    </div>
  );
}

export default ProblemList;