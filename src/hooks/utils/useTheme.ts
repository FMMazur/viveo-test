import { themeAtom } from '@/store/theme';
import { useAtom } from 'jotai';

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  if (typeof window === 'undefined') return ''
  
  if (
    theme === 'dark' ||
    (!theme &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    setTheme('dark')
  } else {
    document.documentElement.classList.remove('dark');
    setTheme('light')
  }

  return theme;
};
