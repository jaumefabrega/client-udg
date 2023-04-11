import { AuthI } from "@/hooks/useAuth";
import { createContext } from "react";

export const UserContext = createContext<AuthI>({
  user: null,
  login: () => undefined,
  logout: () => undefined,
  userFetched: false,
});
