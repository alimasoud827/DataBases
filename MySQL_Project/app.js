import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

app.get('/getAll', (req, res) => {
    res.json({
        success: true,
    })
});
app.post('/insert', (req, res) => {
    console.log('Insert endpoint hit');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});