import { Switch, Thumb, thumbStyle } from '../ui/switch';
import { useAtom } from 'jotai';
import { themeAtom } from '@/store/theme';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const ButtonToggleTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDarkTheme = theme === 'dark';

  const changeTheme = () => {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Switch
      checked={isDarkTheme}
      onCheckedChange={changeTheme}
      className='border border-black dark:border-white'
      icon={
        <Thumb asChild className={cn(thumbStyle, 'p-1')}>
          <div className="flex items-center justify-center bg-white dark:bg-black">
            {isDarkTheme ? (
              <Moon className="dark:fill-white w-4 h-4" />
            ) : (
              <Sun className="fill-black w-4 h-4" />
            )}
          </div>
        </Thumb>
      }
    />
  );
};