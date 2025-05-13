import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './db.js'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get('/getAll', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json({ success: true, users: rows });
    } catch (error) {
        console.error('Query Error:', error);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

app.post('/insert', async (req, res) => {
    try {
        const { name, age } = req.body;

        if (!name || !age) {
            return res.status(400).json({ success: false, message: 'Name and age are required' });
        }

        const [result] = await pool.query(
            'INSERT INTO users (name, age) VALUES (?, ?)',
            [name, age]
        );

        res.json({ success: true, insertedId: result.insertId });
    } catch (error) {
        console.error('Insert Error:', error);
        res.status(500).json({ success: false, message: 'Database insert failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
