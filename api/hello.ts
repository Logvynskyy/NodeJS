const hello = 'Hello World!123';

export default function handler(req: any, res: any) {
  res.status(200).json({ hello });
}
