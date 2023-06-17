import { useRouter } from 'next/router';
import { Button } from '../ui/button';
import { useUser } from '@/hooks/user/useUser';

export const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useUser();

  const handleClick = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    logout.mutate(undefined, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <Button
      variant="ghost"
      className="py-0 border-2 bg-white dark:bg-black border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
      onClick={handleClick}>
      Sair
    </Button>
  );
};
