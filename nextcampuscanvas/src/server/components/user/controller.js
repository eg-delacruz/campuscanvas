import dbConnect from '@server/dbConnect';
import config from '@server/config';

dbConnect(config.dbURL);

export default async function handler(req, res) {
  res.json({ name: 'John Doe' });
}
