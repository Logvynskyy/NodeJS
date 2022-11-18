import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Router } from '../src/router';

const router = new Router('api');

router.get('/hello', (req: VercelRequest, res: VercelResponse) => {
  res.status(200).send({ message: 'Hello from get method' });
});

router.post('/hello', (req: VercelRequest, res: VercelResponse) => {
  res.status(200).send({ message: 'Hello from post method' });
});

router.delete('/hello', (req, res) => {
  res.send({ message: 'Hello from delete method' });
});

router.put('/second', (req: VercelRequest, res: VercelResponse) => {
  res.status(200).send({ message: 'Hello from 2nd endpoint and 4th method' });
});

router.get('/third', (req: VercelRequest, res: VercelResponse) => {
  res.status(200).send({ message: 'Hello from 3nd endpoint' });
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await router.handle(req, res);
  } catch (e) {
    const exception = e as Error;
    res.status(500).send('An error occured!' + exception.message);
  }
}
