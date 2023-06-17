import { auth } from '@/lib/auth/lucia';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  isLoggedIn?: boolean,
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST')
    return res.status(404).json({ error: 'Not found' });
  const authRequest = auth.handleRequest({ req, res });

  const { session } = await authRequest.validateUser();

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);

  return res.json({
    isLoggedIn: false,
  });
}
