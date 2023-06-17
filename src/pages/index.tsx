import { Container } from '@/components/ui/container';
import { useRandomUser } from '@/hooks/random-user/useRandomUser';
import { Button } from '@/components/ui/button';
import { RandomUserInfo } from '@/components/random-user/RandomUserInfo';
import { RandomUserSkeleton } from '@/components/random-user/RandomUserSkeleton';
import { RandomUserGeneratedList } from '@/components/random-user/RandomUserGeneratedList';
import { cn } from '@/lib/utils/cn';
import { useIsUserLogged } from '@/hooks/user/useIsUserLogged';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  // const { fact } = useRandomFactForToday();
  const router = useRouter();
  const isUserLogged = useIsUserLogged();
  const { isFetching, requestUser } = useRandomUser();

  useEffect(() => {
    if (!router) return;
    if (isUserLogged) return;

    router.replace('/login');
  }, [isUserLogged, router]);

  return (
    <Container className="pt-14 md:pt-18 lg:py-4 overflow-y-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-3 w-11/12 gap-4 h-[90vh] md:h-[94vh] max-w-5xl">
        <div className="flex flex-col max-h-fit lg:max-h-none lg:col-span-1 gap-2 lg:justify-center items-center">
          <Button onClick={requestUser} className="w-full">
            Gerar usuário
          </Button>

          <hr className="border-t border-black dark:border-white w-full" />

          <RandomUserGeneratedList />
        </div>

        <div className="flex flex-col lg:col-span-2 gap-3 items-center justify-center h-full overflow-hidden">
          <div
            className={cn('flex lg:justify-center overflow-hidden', {
              'h-fit lg:py-8': !isFetching,
              'h-full py-24 md:py-48': isFetching,
            })}>
            {isFetching && <RandomUserSkeleton />}
            {!isFetching && <RandomUserInfo />}
          </div>
        </div>
      </div>
    </Container>
  );
}
