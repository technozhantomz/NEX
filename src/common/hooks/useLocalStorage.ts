import { isNil } from "lodash";
import { useEffect, useState } from "react";

import { config } from "../../api/params";
import { Cache, Exchanges, Settings } from "../types";

type Value =
  | string
  | number
  | boolean
  | JSON
  | Exchanges
  | Settings
  | Cache
  | undefined
  | null;

type Result = [Value, (value?: Value) => void];

export const useLocalStorage = (key: string): Result => {
  const { defaultChainID } = config;
  const localStorageItem =
    typeof window !== "undefined"
      ? localStorage.getItem(`${key}-${defaultChainID}`)
      : "";
  const [value, setValue] = useState<Value>(
    localStorageItem && JSON.parse(localStorageItem)
  );

  useEffect(() => {
    if (!isNil(value) && value !== null && value !== "") {
      localStorage.setItem(`${key}-${defaultChainID}`, JSON.stringify(value));
    } else {
      localStorage.removeItem(`${key}-${defaultChainID}`);
    }
  }, [value, key]);

  return [value, setValue];
};
