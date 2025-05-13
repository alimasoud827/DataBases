import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

console.log('Script started');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/insert', (req, res) => {
  res.send('Insert endpoint hit');
});

app.get('/getAll', (req, res) => {
  console.log('getAll endpoint hit');
  res.send('Get all endpoint');
});

app.listen(PORT, () => {
    console.log(`✅ Server is listening at http://localhost:${PORT}`);
});
