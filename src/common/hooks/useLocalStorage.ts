import { isNil } from "lodash";
import { useEffect, useState } from "react";

type Value = string | number | boolean | JSON | undefined | null;

type Result = [Value, (value?: Value) => void];

export const useLocalStorage = (key: string): Result => {
  const localStorageItem = localStorage.getItem(key);
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
