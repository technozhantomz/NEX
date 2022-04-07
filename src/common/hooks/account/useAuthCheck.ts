import router from "next/router";
import { useEffect } from "react";

import { useUserContext } from "../../components";

import { AuthCheck } from "./useAuthCheck.types";

export function useAuthCheck(): AuthCheck {
  const { localStorageAccount } = useUserContext();

  useEffect(() => {
    if (!localStorageAccount) {
      router.replace("/login");
    }
  }, []);

  return { localStorageAccount };
}
