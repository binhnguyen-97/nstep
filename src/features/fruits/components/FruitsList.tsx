import { FC, useMemo } from 'react';

import type { Fruit } from '@/query/fruit';

interface FruitsList {
  fruits: Fruit[];
}

const FruitsList: FC<FruitsList> = ({ fruits }) => {
  if (!fruits.length) return null;

  const fruitItems = useMemo(() => {
    return fruits.map((fruit) => {
      return (
        <div
          key={fruit.id}
          className="cursor-pointer min-h-[80px] max-w-md:w-[25%] flex flex-col bg-white drop-shadow hover:drop-shadow-lg hover:opacity-70 rounded-md"
        >
          <div className="px-3 py-2">
            <h3 className="font-semibold">{fruit.name}</h3>
            <p className="text-sm">
              Family: {fruit.family} - Genus: {fruit.genus}
            </p>
          </div>
        </div>
      );
    });
  }, [fruits]);

  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
      {fruitItems}
    </div>
  );
};

export default FruitsList;
