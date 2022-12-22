//done
import { isNil } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { Cache, Exchanges, Settings } from "../../types";

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
  | Notification[]
  | null;

type Result = [Value, (value?: Value) => void];

export const useSessionStorage = (key: string): Result => {
  const sessionStorageItem =
    typeof window !== "undefined" ? sessionStorage.getItem(key) : "";
  const [value, setValue] = useState<Value>(
    sessionStorageItem && JSON.parse(sessionStorageItem)
  );

  const setUserItem = useCallback((key: string, value: Value) => {
    if (key.includes("_")) {
      if (key.split("_")[1] !== "") {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, []);

  useEffect(() => {
    if (!isNil(value) && value !== null && value !== "") {
      setUserItem(key, value);
    } else {
      sessionStorage.removeItem(key);
    }
  }, [value, key]);

  return [value, setValue];
};
