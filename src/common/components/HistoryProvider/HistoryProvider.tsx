import { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { useLocalStorage } from "../../hooks";

import { HistoryContextType } from "./HistoryProvider.types";

interface Props {
  children: React.ReactNode;
}

const DefaultHistoryState: HistoryContextType = {
  history: [],
};

const HistoryContext = createContext<HistoryContextType>(DefaultHistoryState);

export const HistoryProvider = ({ children }: Props): JSX.Element => {
  const { asPath } = useRouter();
  const [history, setHistory] = useLocalStorage("history") as [
    string[],
    (value: string[]) => void
  ];

  useEffect(() => {
    if (!history) setHistory([asPath]);
    else {
      if (history[history.length - 1] !== asPath) {
        setHistory(updateArray(history, asPath));
      }
    }
  }, [asPath]);

  const updateArray = useCallback((arr: string[], value: string): string[] => {
    if (arr.length >= 99) {
      arr.shift();
      arr.push(value);
      return arr;
    }
    arr.push(value);
    return arr;
  }, []);

  return (
    <HistoryContext.Provider value={{ history }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = (): HistoryContextType => {
  return useContext<HistoryContextType>(HistoryContext);
};
