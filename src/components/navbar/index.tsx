import { useIsMounted } from '@/hooks/utils/useIsMounted';
import { ButtonToggleTheme } from './button-toggle-theme';
import { LogoutButton } from './logout-button';
import { useIsUserLogged } from '@/hooks/user/useIsUserLogged';

export const Navbar = () => {
  const mounted = useIsMounted();
  const isUserLogged = useIsUserLogged();

  if (!mounted) return;

  return (
    <nav className="w-full fixed bg-transparent p-4 flex items-center justify-center pointer-events-none">
      <div className="w-full max-w-screen-2xl flex justify-end items-center gap-x-2">
        <ButtonToggleTheme />

        {
          isUserLogged &&
          <>
            <LogoutButton />
          </>
        }
      </div>
    </nav>
  );
};
