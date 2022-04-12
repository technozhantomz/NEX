import { isNil } from "lodash";
import { useEffect, useState } from "react";

import { config } from "../../api/params";
import { Cache, Exchanges, Settings } from "../types";

type Value =
  | string
  | string[]
  | number
  | boolean
  | JSON
  | Exchanges
  | Settings
  | Cache
  | undefined
  | null;

type Result = [Value, (value?: Value) => void];

export const useSessionStorage = (key: string): Result => {
  const { defaultChainID } = config;
  const sessionStorageItem =
    typeof window !== "undefined"
      ? sessionStorage.getItem(`${key}-${defaultChainID}`)
      : "";
  const [value, setValue] = useState<Value>(
    sessionStorageItem && JSON.parse(sessionStorageItem)
  );

  useEffect(() => {
    if (!isNil(value) && value !== null && value !== "") {
      sessionStorage.setItem(`${key}-${defaultChainID}`, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(`${key}-${defaultChainID}`);
    }
  }, [value, key]);

  return [value, setValue];
};
