import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Router } from '../src/router';

const router = new Router('api');
const hello = 'Hello World!123';

router.get('/hello', (req: VercelRequest, res: VercelResponse) => {
  res.status(200).send({ message: hello });
});

router.delete('/delete', (req, res) => {
  res.send({ message: 'Hello from delete method' });
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await router.handle(req, res);
  } catch (e) {
    const exception = e as Error;
    res.status(500).send('An error occured!' + exception.message);
  }
}
