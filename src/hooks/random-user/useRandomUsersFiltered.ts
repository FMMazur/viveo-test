import { randomUsersFilteredAtom } from "@/store/random-user"
import { useAtomValue } from "jotai"

export const useRandomUsersFiltered = () => {
  return useAtomValue(randomUsersFilteredAtom)
}