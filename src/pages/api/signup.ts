import { auth } from '../../lib/auth/lucia';
import { LuciaError, User } from 'lucia-auth';
import { Prisma, PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

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

  const { email, password } = (
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  ) as RequestBody;
  if (!email || !password) {
    return res.status(400).json({
      isLoggedIn: false,
      error: 'Invalid input',
    });
  }

  const authRequest = auth.handleRequest({ req, res });
  try {
    const user = await auth.createUser({
      primaryKey: {
        providerId: 'email',
        providerUserId: email,
        password,
      },
      attributes: {
        email,
      },
    });

    const session = await auth.createSession(user.userId);
    authRequest.setSession(session); // set cookies

    return res.status(201).json({
      isLoggedIn: true,
      user: {
        email,
        userId: session.userId,
      },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002' &&
      error.message?.includes('email')
    ) {
      return res.status(403).json({
        isLoggedIn: false,
        error: 'Email already in use',
      });
    }
    if (
      error instanceof LuciaError &&
      error.message === 'AUTH_DUPLICATE_KEY_ID'
    ) {
      return res.status(403).json({
        isLoggedIn: false,
        error: 'Email already in use',
      });
    }
    // database connection error
    console.log(error);
    return res.status(500).json({
      isLoggedIn: false,
      error: 'Unknown error occurred',
    });
  }
}
