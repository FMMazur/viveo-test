import { saveRandomUser, setCurrentUserAtom } from '@/store/random-user';
import { RandomUserResult } from '@/lib/types/random-user';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

export const useRandomUser = (initialFetch: boolean = false) => {
  const [enabled, setEnabled] = useState(initialFetch);
  const saveUser = useSetAtom(saveRandomUser);
  const setCurrentUser = useSetAtom(setCurrentUserAtom);

  const { data, isLoading, isError, isFetched, refetch, ...rest } = useQuery(
    ['randomuser'],
    ({ signal }) =>
      fetch('https://randomuser.me/api/1.4/?nat=br,us,ca,gb', {
        signal,
      })
        .then((res) => res.json() as Promise<RandomUserResult>)
        .finally(() => {
          setEnabled(false);
        }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled,
    },
  );

  const requestUser = () => {
    setEnabled(true);

    if (isFetched) {
      refetch();
    }
  };

  useEffect(() => {
    if (!data) return;
    if (isError) return;
    if (!isFetched) return;
    if (rest.isFetching) return;

    const user = data.results[0];
    const { seed } = data.info;

    if (user && seed) {
      saveUser({ ...user, seed });
      setCurrentUser({ ...user, seed });
    }
  }, [data, isError, isFetched, rest.isFetching, saveUser, setCurrentUser]);

  return { isLoading, isError, isFetched, requestUser, ...rest };
};
