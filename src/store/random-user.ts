import { RandomUser } from '@/lib/types/random-user';
import { RandomUserFilter } from '@/lib/types/random-user-filter';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const initialFilter: RandomUserFilter = {
  gender: '',
  age: 0,
};

const randomUsersAtom = atomWithStorage<RandomUser[]>('generatedUsers', []);
export const currentUserAtom = atom<RandomUser | undefined>(undefined);
export const randomUsersFilterAtom = atom<RandomUserFilter>({
  ...initialFilter,
});

export const randomUsersFilterGenderAtom = atom(
  (get) => get(randomUsersFilterAtom).gender,
  (get, set, gender: RandomUserFilter['gender']) => {
    const filter = get(randomUsersFilterAtom);

    if (gender === filter.gender) return;

    set(randomUsersFilterAtom, { ...filter, gender });
  },
);

export const setCurrentUserAtom = atom(null, (_, set, update: RandomUser) => {
  set(currentUserAtom, update);
});
export const saveRandomUser = atom(null, (get, set, update: RandomUser) => {
  const randomUsers = get(randomUsersAtom);

  const userFound = randomUsers.find((user) => user.seed === update.seed);

  if (userFound) return;

  set(
    randomUsersAtom,
    [...randomUsers, update].sort((a, b) =>
      a.name.first.localeCompare(b.name.first),
    ),
  );
});

export const randomUsersClearAtom = atom(null, (get, set) => {
  const currentUser = get(currentUserAtom);
  const randomUsers = get(randomUsersAtom);

  if (currentUser) set(currentUserAtom, undefined);
  if (randomUsers.length > 0) set(randomUsersAtom, []);
  set(randomUsersFilterAtom, { ...initialFilter });
});

export const randomUsersFilteredAtom = atom((get) =>
  get(randomUsersAtom).filter((user) => {
    const filter = get(randomUsersFilterAtom);
    if (!filter) return true;

    const { gender, age } = filter;
    const userAge = user.dob.age;

    if (gender && user.gender !== gender) return false;
    if (typeof age === 'number' && age !== 0 && userAge !== age) {
      return false;
    }

    if (typeof age === 'object') {
      if (age.min && age.min > userAge) {
        return false;
      }

      if (age.max && age.max < userAge) {
        return false;
      }
    }

    return true;
  }),
);
