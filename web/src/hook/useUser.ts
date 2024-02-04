import { useContext } from "react";
import { UserContext } from "../context/user-context";

export function useUser() {
  const hook = useContext(UserContext) 
  return hook
}