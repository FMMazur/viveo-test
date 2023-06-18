import { useUser } from '@/hooks/user/useUser';
import { Loading } from '@/components/ui/loading';
import { useTimer } from '@/hooks/utils/useTimer';
import { useEffect } from 'react';

export const UserProvider = () => {
  const { isLoading } = useUser();
  const { enabled, start } = useTimer(300);

  useEffect(() => {
    if (!isLoading) return;

    start();
  }, [isLoading, start]);

  return isLoading || enabled ? (
    <div className="flex items-center justify-center fixed z-10 top-0 left-0 w-screen h-screen bg-white dark:bg-black">
      <Loading />
    </div>
  ) : null;
};
