'use client';

import { cn } from '@/lib/utils/cn';
import { HTMLAttributes, forwardRef } from 'react';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { useStore } from 'jotai';

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-w-full min-h-screen bg-white text-black font-bold flex justify-center items-center dark:bg-black dark:text-white overflow-y-auto',
          className,
        )}
        {...props}>

        {children}
      </div>
    );
  },
);
Container.displayName = 'Container';

export { Container };
