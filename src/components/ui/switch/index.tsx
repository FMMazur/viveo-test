'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils/cn';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
} from 'react';

export const thumbStyle =
  'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0';

interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  icon?: ReactNode;
}

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, icon, ...props }, ref) => {
  const hasIcon = !!icon;

  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className,
      )}
      {...props}
      ref={ref}>
      {!hasIcon && <SwitchPrimitives.Thumb className={cn(thumbStyle)} />}
      {hasIcon && icon}
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

const Thumb = SwitchPrimitives.Thumb

export { Switch, Thumb };