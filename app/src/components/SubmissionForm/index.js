import React, { useState } from 'react';

const SubmissionForm = ({ problemId, setSubmissionResult }) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionResult(null);

        try {
            const response = await fetch(`http://localhost:5001/problems/${problemId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, language }),
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            const result = await response.json();
            setSubmissionResult(result);
        } catch (error) {
            console.error('Submission error:', error);
            setSubmissionResult({ error: 'An error occurred during submission.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h3>Submit Solution</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Language:</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="python">Python</option>
                        <option value="c++">C++</option>
                    </select>
                </div>
                <div>
                    <label>Code:</label>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        rows="20"
                        cols="80"
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default SubmissionForm;
