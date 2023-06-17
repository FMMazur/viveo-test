import { auth } from '@/lib/auth/lucia';
import { LuciaError, User } from 'lucia-auth';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  isLoggedIn: boolean;
  user?: User;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET') return res.status(404).json({ isLoggedIn: false });

  const authRequest = auth.handleRequest({ req, res });
  const { user } = await authRequest.validateUser();

  if (!user) {
    return res
      .status(401)
      .json({ isLoggedIn: false, error: 'User not logged!' });
  }

  return res.status(200).json({
    isLoggedIn: true,
    user,
  });
}
