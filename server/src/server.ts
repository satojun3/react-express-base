import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
