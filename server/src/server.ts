import express, { Request, Response } from 'express';
import cors from 'cors';
import ChatController from './Controller/ChatContorller'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!!!' });
});

app.post('/api/hello', async (req: Request, res: Response) => {
  const chatContorller = new ChatController();
  const result = await chatContorller.ask(req, res);
  return res.json(result);
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
