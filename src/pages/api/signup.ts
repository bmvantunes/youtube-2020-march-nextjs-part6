import { hash } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';

async function hashAsync(password: string) {
  return new Promise((resolved, rejected) => {
    hash(password, 10, function (err, hash) {
      if (err || !hash) {
        rejected();
      } else {
        resolved(hash);
      }
    });
  });
}

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open('./mydb.sqlite');

  if (req.method === 'POST') {
    try {
      const hash = await hashAsync(req.body.password);

      const statement = await db.prepare(
        'INSERT INTO person (name, email, password) values (?, ?, ?)'
      );
      const result = await statement.run(req.body.name, req.body.email, hash);
      result.finalize();

      const person = await db.all('select * from person');
      res.json(person);
    } catch {
      res.status(500).json({ message: 'Sorry something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
}
