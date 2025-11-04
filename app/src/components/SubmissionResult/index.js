import React from 'react';
import './index.css';

const SubmissionResult = ({ result }) => {
    if (!result) {
        return null;
    }

    if (result.error) {
        return (
            <div className="submission-result">
                <h3>Submission Error</h3>
                <p>{result.error}</p>
            </div>
        );
    }

    return (
        <div className="submission-result">
            <h3>Submission Results</h3>
            <table>
                <thead>
                    <tr>
                        <th>Case</th>
                        <th>Status</th>
                        <th>Stdout</th>
                        <th>Stderr</th>
                    </tr>
                </thead>
                <tbody>
                    {result.results && result.results.map((res, index) => (
                        <tr key={index} className={`status-${res.status.toLowerCase().replace(/ /g, '-')}`}>
                            <td>{res.case}</td>
                            <td>{res.status}</td>
                            <td><pre>{res.stdout}</pre></td>
                            <td><pre>{res.stderr}</pre></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubmissionResult;
