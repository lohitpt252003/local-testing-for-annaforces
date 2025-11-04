import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SubmissionResult from '../SubmissionResult';
import './index.css';

const SubmissionDetail = ({ theme }) => {
    const { submissionId } = useParams();
    const [submission, setSubmission] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await fetch(`http://localhost:5001/submissions/${submissionId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSubmission(data);
            } catch (e) {
                setError(`Failed to fetch submission: ${e.message}`);
            }
        };

        fetchSubmission();
        document.title = `Submission: ${submissionId}`;
    }, [submissionId]);

    if (error) {
        return <div className={`submission-detail-container ${theme}`}><p style={{ color: 'red' }}>{error}</p></div>;
    }

    if (!submission) {
        return <div className={`submission-detail-container ${theme}`}><p>Loading submission details...</p></div>;
    }

    return (
        <div className={`submission-detail-container ${theme}`}>
            <h1>Submission Details</h1>
            <p><strong>ID:</strong> {submission.id}</p>
            <p><strong>Problem ID:</strong> <Link to={`/problems/${submission.problem_id}`}>{submission.problem_id}</Link></p>
            <p><strong>Language:</strong> {submission.language}</p>
            <p><strong>Timestamp:</strong> {new Date(submission.timestamp).toLocaleString()}</p>
            
            <h2>Code</h2>
            <pre>{submission.code}</pre>

            <SubmissionResult result={submission} />
        </div>
    );
};

export default SubmissionDetail;
