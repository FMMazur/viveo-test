import { useRandomUsersFiltered } from '@/hooks/random-user/useRandomUsersFiltered';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { RandomUser } from '@/lib/types/random-user';
import { Button, buttonVariants } from '../ui/button';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  currentUserAtom,
  randomUsersClearAtom,
  randomUsersFilterAtom,
  randomUsersFilterGenderAtom,
  setCurrentUserAtom,
} from '@/store/random-user';
import { RadioGroup } from '@headlessui/react';
import { GenderType, getGender } from '@/lib/utils/gender';
import { CheckCircle2, Circle, XSquare } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { memo, use, useEffect, useRef } from 'react';

const LoadSavedUser = memo(function LoadSavedUser({
  user,
}: {
  user: RandomUser;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const currentUser = useAtomValue(currentUserAtom);
  const setCurrentUser = useSetAtom(setCurrentUserAtom);
  const { first, last } = user.name;

  const changeUser = () => {
    setCurrentUser(user);
  };

  useEffect(() => {
    if (currentUser?.seed !== user.seed) return;

    ref.current?.scrollIntoView();
  }, [currentUser?.seed, user.seed]);

  return (
    <Button
      ref={ref}
      variant="link"
      className={cn('px-0', {
        'underline text-black dark:text-white': currentUser?.seed === user.seed,
      })}
      onClick={changeUser}>
      <span className="text-start w-full">
        {first} {last}
      </span>
    </Button>
  );
});

const RandomUserFilterRadio = memo(function RandomUserFilterRadio() {
  const [gender, setGender] = useAtom(randomUsersFilterGenderAtom);

  const handleChangeGender = (gender: GenderType) => {
    setGender(gender);
  };

  const clearFilter = () => setGender('');

  const genders: GenderType[] = ['male', 'female'];

  return (
    <RadioGroup
      value={gender}
      onChange={handleChangeGender}
      className="flex flex-col gap-2 p-3 border-2 rounded-lg border-black dark:border-white">
      <RadioGroup.Label>
        <div className="flex justify-between items-center">
          <span>Gênero</span>
          <Button
            onClick={clearFilter}
            variant="ghost"
            className="p-0 w-6 h-6 text-black dark:text-white hover:opacity-60 transition-opacity">
            <XSquare />
          </Button>
        </div>
      </RadioGroup.Label>

      {genders.map((gender) => {
        return (
          <RadioGroup.Option
            key={`filter-gender-option-${gender}`}
            value={gender}
            className="relative flex cursor-pointer rounded-lg px-4 focus:outline-none transition-opacity hover:opacity-90">
            {({ checked }) => (
              <div className="flex items-center gap-x-2 w-full">
                <div
                  className={`
                  shrink-0
                  ${checked && 'text-primary'}
                `}>
                  {checked && <CheckCircle2 className="h-6 w-6" />}
                  {!checked && <Circle className="h-6 w-6" />}
                </div>
                <div
                  className={buttonVariants({
                    variant: 'link',
                    className: 'p-0 w-full text-start',
                  })}>
                  <span className="text-start w-full">{getGender(gender)}</span>
                </div>
              </div>
            )}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
});

const ClearButton = memo(function ClearButton() {
  const clearAll = useSetAtom(randomUsersClearAtom);

  return (
    <Button variant="destructive" className="w-full" onClick={clearAll}>
      Limpar
    </Button>
  );
});

const UsersCounter = () => {
  const users = useRandomUsersFiltered();
  const filter = useAtomValue(randomUsersFilterAtom);

  let counterText = `${users.length} usuários`;
  let filterCount = 0;

  if (filter.age) {
    filterCount++;
  }

  if (filter.gender) {
    filterCount++;
  }

  if (filterCount) {
    counterText += ` (${filterCount} filtros)`;
  }

  return counterText;
};

export const RandomUserGeneratedList = () => {
  const users = useRandomUsersFiltered();

  const hasUsers = users.length > 0;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="users">
        <AccordionTrigger disabled={!hasUsers}>
          <UsersCounter />
        </AccordionTrigger>

        <AccordionContent>
          <div className="flex flex-col gap-4 scroll-">
            <div className="flex flex-col overflow-y-auto max-h-44 px-3 rounded-lg border-2 border-black dark:border-white scroll-smooth">
              {users.map((user) => (
                <LoadSavedUser key={user.seed} user={user} />
              ))}
            </div>

            <hr className="border-t border-black dark:border-white w-full" />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="users">
                <AccordionTrigger>Filtros</AccordionTrigger>
                <AccordionContent>
                  <RandomUserFilterRadio />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <ClearButton />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
