import express from 'express';
import { MongoClient } from 'mongodb';

const router = express.Router();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// POST endpoint to handle feedback submissions
router.post('/', async (req, res) => {
    const { feedback } = req.body;

    if (!feedback) {
        return res.status(400).json({ message: 'Feedback is required.' });
    }

    try {
        await client.connect();
        const database = client.db('yourDatabaseName');
        const feedbackCollection = database.collection('feedback');

        const result = await feedbackCollection.insertOne({ feedback, createdAt: new Date() });
        return res.status(201).json({ message: 'Feedback submitted successfully!', id: result.insertedId });
    } catch (error) {
        console.error('Error saving feedback:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    } finally {
        await client.close();
    }
});

export default router;