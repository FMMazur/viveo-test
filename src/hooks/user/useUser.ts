import { RequestBody } from '@/pages/api/login';
import { User, UserError, userAtom } from '@/store/user';
import { Nullable } from '@/lib/types/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import Router from 'next/router';
import { useEffect } from 'react';
import { fetcher } from '@/lib/utils/fetcher';

export const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useAtom(userAtom);

  const { data, isLoading, status } = useQuery(['user'], ({ signal }) =>
    fetch('/api/user', {
      signal,
    })
      .then((res) => res.json() as Promise<User>)
      .catch((reason) => reason as UserError),
  );
  const logout = useMutation({
    mutationFn: async () => {
      queryClient.resetQueries({
        queryKey: ['user'],
      });
      queryClient.cancelQueries({ queryKey: ['user'] });

      return fetcher('/api/logout', { method: 'POST' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const login = useMutation({
    mutationFn: async (user: Nullable<RequestBody>) => {
      queryClient.resetQueries({
        queryKey: ['user'],
      });
      queryClient.cancelQueries({ queryKey: ['user'] });

      return fetcher<User>('/api/login', {
        method: 'POST',
        body: JSON.stringify(user),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const signup = useMutation({
    mutationFn: async (user: Nullable<RequestBody>) => {
      queryClient.resetQueries({
        queryKey: ['user'],
      });
      queryClient.cancelQueries({ queryKey: ['user'] });

      return fetcher<User>('/api/signup', {
        method: 'POST',
        body: JSON.stringify(user),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !data) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data?.isLoggedIn)
    ) {
      Router.push(redirectTo);
      return;
    }
  }, [data, redirectIfFound, redirectTo]);

  useEffect(() => {
    if (!data) return;

    setUser(data);
  }, [data, setUser]);

  return { user, logout, login, signup, isLoading };
};
