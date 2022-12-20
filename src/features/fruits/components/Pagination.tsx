import { FC, useMemo } from 'react';

import type { FruitHookType } from '@/query/fruit';

import { NstButton } from '@/components';
import PaginationItem from './PaginationItem';

type PaginationProps = Pick<
  FruitHookType,
  | 'hasNext'
  | 'hasPrevious'
  | 'nextPage'
  | 'previousPage'
  | 'totalPage'
  | 'currentPage'
  | 'setPage'
>;

const ITEM_BEFORE = 4;
const ITEM_AFTER = 4;

const Pagination: FC<PaginationProps> = ({
  hasNext,
  totalPage,
  currentPage,
  hasPrevious,
  nextPage,
  previousPage,
  setPage,
}) => {
  const listPage = useMemo(() => {
    const list = [];

    // Add previous page
    if (hasPrevious) {
      const targetOffset =
        currentPage - ITEM_BEFORE > 0 ? currentPage - ITEM_BEFORE : 1;

      for (let offset = targetOffset; offset < currentPage; offset++) {
        list.push(
          <PaginationItem key={offset} offset={offset} setPage={setPage} />
        );
      }
    }

    // Add current page
    list.push(
      <PaginationItem
        key={currentPage}
        offset={currentPage}
        setPage={setPage}
        isActive
      />
    );

    if (hasNext) {
      const targetOffset =
        currentPage + ITEM_AFTER > totalPage
          ? totalPage
          : currentPage + ITEM_AFTER;

      for (let offset = currentPage + 1; offset <= targetOffset; offset++) {
        list.push(
          <PaginationItem key={offset} offset={offset} setPage={setPage} />
        );
      }
    }

    return list;
  }, [currentPage, totalPage]);

  const previousButton = useMemo(() => {
    if (!hasPrevious) return null;
    return (
      <li key="previous">
        <span className="sr-only">Previous</span>
        <NstButton
          onClick={previousPage}
          className="focusable cursor-pointer block px-3 py-2 ml-0 leading-tight text-white bg-rose-500 border border-gray-300 rounded-l-lg hover:bg-rose-400"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </NstButton>
      </li>
    );
  }, [hasPrevious]);

  const nextButton = useMemo(() => {
    if (!hasNext) return null;
    return (
      <li key="next">
        <span className="sr-only">Next</span>
        <NstButton
          onClick={nextPage}
          className="focusable cursor-pointer block px-3 py-2 ml-0 leading-tight text-white bg-rose-500 border border-gray-300 rounded-r-lg hover:bg-rose-400"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </NstButton>
      </li>
    );
  }, [hasNext]);

  return (
    <nav
      className="flex justify-center align-middle mt-4"
      aria-label="Page navigation example"
    >
      <ul className="inline-flex items-center justify-center -space-x-px">
        {previousButton}
        {listPage}
        {nextButton}
      </ul>
    </nav>
  );
};

export default Pagination;
