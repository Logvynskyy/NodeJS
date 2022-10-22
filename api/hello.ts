const hello = 'Hello World!';

export default function handler(req: any, res: any) {
  res.status(200).json({ hello });
}
