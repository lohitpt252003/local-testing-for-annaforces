import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import './index.css';

function ContestList({ contests, theme }) {
  useEffect(() => {
    document.title = 'Contests';
  }, []);

  const getContestStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      return <span className="contestlist-status scheduled">Scheduled</span>;
    } else if (now >= start && now <= end) {
      return <span className="contestlist-status running">Running</span>;
    } else {
      return <span className="contestlist-status finished">Finished</span>;
    }
  };

  return (
    <div className={`contestlist-contest-list-container ${theme}`}>
      <h2>Available Contests</h2>
      {contests ? (
        <table className="contestlist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Authors</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr key={contest.id}>
                <td>{contest.id}</td>
                <td>
                  <Link to={`/contests/${contest.id}`} className="contestlist-title-link">
                    {contest.name}
                  </Link>
                </td>
                <td>{contest.description}</td>
                <td>{new Date(contest.startTime).toLocaleString()}</td>
                <td>{new Date(contest.endTime).toLocaleString()}</td>
                <td>{contest.authors.join(', ')}</td>
                <td>{getContestStatus(contest.startTime, contest.endTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading theme={theme} />
      )}
    </div>
  );
}

export default ContestList;