import { currentUserAtom } from "@/store/random-user"
import { useAtomValue } from "jotai"

export const useCurrentRandomUser = () => {
  return useAtomValue(currentUserAtom);
}