import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect } from "react";

import { useLocalStorage } from "../../hooks";

import { HistoryContextType } from "./HistoryProvider.types";

interface Props {
  children: React.ReactNode;
}

const DefaultHistoryState: HistoryContextType = {
  history: [],
  pathname: "",
  privatePaths: ["/wallet", "/settings", "/voting"],
};

const HistoryContext = createContext<HistoryContextType>(DefaultHistoryState);

export const HistoryProvider = ({ children }: Props): JSX.Element => {
  const { asPath, pathname } = useRouter();
  const privatePaths = DefaultHistoryState.privatePaths;
  const [history, setHistory] = useLocalStorage("history") as [
    string[],
    (value: string[]) => void
  ];

  useEffect(() => {
    if (!history) setHistory([asPath]);
    else {
      if (history[history.length - 1] !== asPath) {
        setHistory([...history, asPath]);
      }
    }
  }, [asPath]);

  return (
    <HistoryContext.Provider value={{ history, pathname, privatePaths }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = (): HistoryContextType => {
  return useContext<HistoryContextType>(HistoryContext);
};
