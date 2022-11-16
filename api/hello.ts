import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Router } from '../src/router';

const helloRouter = new Router('api/');
const hello = 'Hello World!123';

helloRouter.get('hello', async (req: VercelRequest, res: VercelResponse) => {
  res.status(200).send({ message: hello});
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  helloRouter.handle(req, res);
}
