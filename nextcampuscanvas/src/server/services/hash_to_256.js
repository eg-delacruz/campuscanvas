import crypto from 'crypto';

export async function hash(string) {
  const hash = crypto.createHash('sha256').update(string).digest('hex');
  return hash;
}
