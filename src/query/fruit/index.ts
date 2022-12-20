import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"


interface FruitNutrition {
  carbohydrates: number
  protein: number
  fat: number
  calories: number
  sugar: number
}
export interface Fruit {
  genus: string
  name: string
  id: number
  family: string
  order: string
  nutritionns: FruitNutrition
}

const PAGE_LIMIT = 5;

export const useFruits = () => {
  const [currentPage, setPage] = useState<number>(1);

  const apiURL = `${import.meta.env.VITE_FRUIT_API_ENDPOINT}/api/fruit/all`;

  const fruitFetched = async (): Promise<Fruit[]> => {
    const resp = await fetch(apiURL)
    const data = await resp.json()

    return data
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['fruitQuery'],
    queryFn: fruitFetched
  })

  const totalFruits = useMemo(() => data?.length || 0, [data])
  const totalPage = useMemo(() => Math.ceil(totalFruits / PAGE_LIMIT), [totalFruits])

  const hasNext = useMemo(() => currentPage < totalPage, [totalPage, currentPage])
  const hasPrevious = useMemo(() => currentPage > 1, [currentPage])

  /**
   * fruityvice do not support paging yet so we need to do it in client side
   */
  const fruits = useMemo(() => {
    if (!data?.length) return []

    const fromOffset = (currentPage - 1) * PAGE_LIMIT;
    const toOffset = fromOffset + PAGE_LIMIT
    return data.slice(fromOffset, toOffset)
  }, [currentPage, data])

  /**
   * Handle next page
   */
  const nextPage = () => {
    setPage(prev => {
      if (prev >= totalPage) return prev
      return prev + 1
    })
  }

  /**
   * Handle previous page
   */
  const previousPage = () => {
    setPage(prev => {
      if (prev <= 1) return 1
      return prev - 1
    })
  }

  return {
    isLoading,
    fruits,
    nextPage,
    totalPage,
    currentPage,
    hasNext,
    hasPrevious,
    previousPage,
    setPage,
    isError
  }
}

export type FruitHookType = ReturnType<typeof useFruits>
