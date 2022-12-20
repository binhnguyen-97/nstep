import { useMemo } from 'react';

import { useFruits } from '@/query/fruit';

import { LoadingIndicator } from '@/components/LoadingIndicator';

import FruitsList from './components/FruitsList';
import Pagination from './components/Pagination';

export const Fruits = () => {
  const {
    isLoading,
    fruits,
    nextPage,
    totalPage,
    currentPage,
    hasNext,
    hasPrevious,
    previousPage,
    setPage,
    isError,
  } = useFruits();

  const content = useMemo(() => {
    if (isLoading) {
      return <LoadingIndicator className="mt-5" />;
    }

    if (isError) {
      return <p className="text-gray-500">Something went wrong</p>;
    }

    if (!fruits.length) {
      return <p className="text-gray-500">No data</p>;
    }

    return (
      <div className="grid place-content-center w-[80%]">
        <FruitsList fruits={fruits} />
        <Pagination
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          currentPage={currentPage}
          totalPage={totalPage}
          setPage={setPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    );
  }, [isLoading, fruits]);

  return (
    <>
      <h3 className="mt-10 text-lg font-bold">Fruit Listing</h3>
      {content}
    </>
  );
};
