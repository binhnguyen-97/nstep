import { twMerge } from 'tailwind-merge';
import type { FC } from 'react';

import { NstButton } from '@/components';

interface PaginationItemProps {
  setPage: Function;
  offset: number;
  isActive?: boolean;
  className?: string;
}

const PaginationItem: FC<PaginationItemProps> = ({
  setPage,
  offset,
  isActive,
  className,
}) => {
  const defaultClass = `focusable cursor-pointer px-3 py-2 leading-tight text-white bg-rose-500 border border-gray-300 hover:bg-rose-400 ${
    isActive && 'opacity-[0.8]'
  }`;
  return (
    <li role="navigation">
      <NstButton
        onClick={() => setPage(offset)}
        className={twMerge(defaultClass, className)}
      >
        {offset}
      </NstButton>
    </li>
  );
};

export default PaginationItem;
