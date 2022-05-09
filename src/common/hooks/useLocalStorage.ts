import { isNil } from "lodash";
import { useEffect, useState } from "react";

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

export const useLocalStorage = (key: string): Result => {
  const localStorageItem =
    typeof window !== "undefined" ? localStorage.getItem(key) : "";
  const [value, setValue] = useState<Value>(
    localStorageItem && JSON.parse(localStorageItem)
  );

  useEffect(() => {
    if (!isNil(value) && value !== null && value !== "") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [value, key]);

  return [value, setValue];
};
