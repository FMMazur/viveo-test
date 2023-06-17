import type { NextApiRequest, NextApiResponse } from 'next';
import type { LuciaError, User } from 'lucia-auth';
import { auth } from '@/lib/auth/lucia';

type Data = {
  isLoggedIn: boolean;
  user?: User;
  error?: string;
};

export type RequestBody = {
  email: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST')
    return res.status(404).json({ isLoggedIn: false, error: 'Not found' });
  const { email, password } =
    (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as RequestBody;

  if (!email || !password) {
    return res.status(401).json({
      isLoggedIn: false, error: 'Invalid input',
    });
  }
  try {
    const authRequest = auth.handleRequest({ req, res });
    const key = await auth.useKey('email', email, password);
    const session = await auth.createSession(key.userId);
    authRequest.setSession(session);

    return res.status(200).json({
      isLoggedIn: true,
      user: {
        email,
        userId: session.userId,
      }
    });
  } catch (e) {
    const error = e as LuciaError;
    if (
      error.message === 'AUTH_INVALID_KEY_ID' ||
      error.message === 'AUTH_INVALID_PASSWORD'
    ) {
      return res.status(403).json({
        isLoggedIn: false, error: 'Incorrect email or password',
      });
    }
    // database connection error
    console.log(error);
    return res.status(500).json({
      isLoggedIn: false, error: 'Unknown error occurred',
    });
  }
}
