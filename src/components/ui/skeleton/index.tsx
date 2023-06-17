import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'react';

const Skeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-white dark:bg-black bg-opacity-5 dark:bg-opacity-5', className)}
      {...props}
    />
  );
};

export { Skeleton };
