import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import type { HTMLAttributes, ReactNode, Ref } from 'react';

/**
 * Extend HTML button attribute
 */
export interface NstButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const NstButton = forwardRef(
  ({ className, ...props }: NstButtonProps, ref: Ref<HTMLButtonElement>) => {
    const defaultClass =
      'focusable text-white px-4 py-2 bg-rose-500 shadow-sm border-rose-500 rounded-lg hove:opacity-[0.8]';

    return (
      <button
        ref={ref}
        className={twMerge(defaultClass, className)}
        {...props}
      />
    );
  }
);
