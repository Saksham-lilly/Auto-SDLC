import React, { useState } from 'react';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setConfirmation('Thank you for your feedback!');
            setFeedback(''); // Clear the feedback field after submission
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setConfirmation('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>User Feedback</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here..."
                    required
                />
                <button type="submit">Submit Feedback</button>
            </form>
            {confirmation && <p>{confirmation}</p>}
        </div>
    );
};

export default FeedbackForm;