import { twMerge } from 'tailwind-merge';

import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Extend HTML button attribute
 */
export interface NstButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const NstButton = ({ className, ...props }: NstButtonProps) => {
  const defaultClass =
    'focusable text-white px-4 py-2 bg-rose-500 shadow-sm border-rose-500 rounded-lg hove:opacity-[0.8]';

  return <button className={twMerge(defaultClass, className)} {...props} />;
};
