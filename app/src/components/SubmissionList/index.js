import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const SubmissionList = ({ theme }) => {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch('http://localhost:5001/submissions');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSubmissions(data);
            } catch (e) {
                setError(`Failed to fetch submissions: ${e.message}`);
            }
        };

        fetchSubmissions();
        document.title = 'Submissions';
    }, []);

    if (error) {
        return <div className={`submission-list-container ${theme}`}><p style={{ color: 'red' }}>{error}</p></div>;
    }

    return (
        <div className={`submission-list-container ${theme}`}>
            <h1>All Submissions</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Problem ID</th>
                        <th>Language</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(sub => (
                        <tr key={sub.id}>
                            <td><Link to={`/submissions/${sub.id}`}>{sub.id}</Link></td>
                            <td><Link to={`/problems/${sub.problem_id}`}>{sub.problem_id}</Link></td>
                            <td>{sub.language}</td>
                            <td>{new Date(sub.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubmissionList;
