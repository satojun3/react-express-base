import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!!!' });
});

app.post('/api/hello', (req, res) => {
  const userMessage = req.body.userMessage;
  res.json({ message: `You said: ${userMessage}` });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
