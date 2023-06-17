import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { User as AuthUser } from 'lucia-auth';

export type User = {
  isLoggedIn: boolean;
  user: AuthUser;
};

export type UserError = {
  error: string;
  isLoggedIn: boolean;
};

export const userAtom = atomWithStorage<User | UserError | undefined>('user', undefined);
export const userLoggedAtom = atom((get) => get(userAtom)?.isLoggedIn === true);
