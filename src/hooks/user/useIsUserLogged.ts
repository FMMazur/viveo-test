import { userLoggedAtom } from "@/store/user"
import { useAtomValue } from "jotai"

export const useIsUserLogged = () => {
  return useAtomValue(userLoggedAtom);
}