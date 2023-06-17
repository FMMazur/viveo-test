import { RandomFact } from "@/lib/types/random-fact"
import { day } from "@/lib/utils/number"
import { useQuery } from "@tanstack/react-query"

export const useRandomFactForToday = () => {
  const {
    data,
    isLoading,
    isError,
    isFetched
  } = useQuery(
    ["facts", "today"],
    () => fetch("https://uselessfacts.jsph.pl/api/v2/facts/today").then(res => res.json() as Promise<RandomFact>),
    {
      staleTime: day(1),
      cacheTime: day(1),
    }
  )

  return {
    fact: data,
    isLoading,
    isError,
    isFetched
  } as const
}