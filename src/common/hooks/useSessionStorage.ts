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

export const useSessionStorage = (key: string): Result => {
  const sessionStorageItem =
    typeof window !== "undefined" ? sessionStorage.getItem(key) : "";
  const [value, setValue] = useState<Value>(
    sessionStorageItem && JSON.parse(sessionStorageItem)
  );

  useEffect(() => {
    if (!isNil(value) && value !== null && value !== "") {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(key);
    }
  }, [value, key]);

  return [value, setValue];
};
