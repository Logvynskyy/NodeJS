import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Router } from '../src/router';

const router = new Router('/api/hello');

router.get('/', (req, res, payload) => {
  const greeting = payload.hi || 'Guten Tag, Polizei!';
  res.send({ message: ` ${greeting} from get method` });
});

router.post('/', (req, res) => {
  res.status(200).send({ message: 'Hello from post method' });
});

router.delete('/', (req, res) => {
  res.send({ message: 'Hello from delete method' });
});

router.put('/second', (req, res) => {
  res.status(200).send({ message: 'Hello from 2nd endpoint and 4th method' });
});

router.get('/third', (req, res) => {
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
