import { Label } from '../ui/label';
import Image from 'next/image';
import { STATES } from '@/lib/utils/states';
import { getGender } from '@/lib/utils/gender';
import { formatDateToString } from '@/lib/utils/date';
import { Contact, Map, UserSquare } from 'lucide-react';
import { useCurrentRandomUser } from '@/hooks/random-user/useCurrentRandomUser';
import { useEffect, useRef } from 'react';

export const RandomUserInfo = () => {
  const user = useCurrentRandomUser();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user?.seed) return;

    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [user?.seed]);

  if (!user) return null;
  const { name, email, location, cell, picture, gender, dob, nat } = user;

  return (
    <div
      ref={scrollRef}
      className="w-full max-w-xxs sm:max-w-md bg-white border-2 border-black rounded-lg shadow px-4 py-6 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center px-2">
          <Image
            className="w-24 h-24 mb-2 rounded-full shadow-lg"
            src={picture.large}
            alt={`${name.first} image`}
            width={96}
            height={96}
          />

          <h5 className="select-all text-xl font-medium text-gray-900 dark:text-white">
            {name.first} {name.last}
          </h5>

          <span className="select-all text-sm text-gray-500 dark:text-gray-400">
            {location.city},{' '}
            {nat === 'BR'
              ? STATES[location.state]
              : `${location.state}, ${nat}`}
          </span>
        </div>

        <div id="contato" className="w-full">
          <div className="flex gap-1 mb-1 items-center align-middle">
            <UserSquare />
            <span>Informações Pessoais</span>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-black dark:text-white">
            <div className="flex flex-col gap-2">
              <Label className="pl-1 text-gray-500 dark:text-gray-400">
                Nome
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {name.first}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Sobrenome
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {name.last}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Gênero
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {getGender(gender)}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Data de Nascimento
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {formatDateToString(dob.date)}
              </span>
            </div>
          </div>
        </div>

        <div id="contato" className="w-full">
          <div className="flex gap-1 mb-1 items-center align-middle">
            <Contact />
            <span>Contato</span>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-black dark:text-white">
            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Email
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {email}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Celular
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {cell}
              </span>
            </div>
          </div>
        </div>

        <div id="location" className="w-full">
          <div className="flex gap-1 mb-1 items-center align-middle">
            <Map />
            <span className="w-full">Localização</span>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-black dark:text-white">
            <div className="flex flex-col gap-2">
              <Label className="pl-1 text-gray-500 dark:text-gray-400">
                Endereço
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {location.street.name}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Número
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {location.street.number}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Cidade
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {location.city}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Estado
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {location.state}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="pl-2 text-gray-500 dark:text-gray-400">
                Código Postal
              </Label>
              <span className="bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 rounded-md border p-2 shadow select-all text-center text-ellipsis overflow-hidden whitespace-nowrap">
                {location.postcode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
