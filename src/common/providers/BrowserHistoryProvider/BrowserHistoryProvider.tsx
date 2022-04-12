import router, { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { useArrayLimiter, useSessionStorage } from "../../hooks";

import { BrowserHistoryContextType } from "./BrowserHistoryProvider.types";

interface Props {
  children: React.ReactNode;
}

const DefaultBrowserHistoryState: BrowserHistoryContextType = {
  browserHistory: [],
  pathname: "",
  privatePaths: ["/wallet", "/settings", "/voting"],
  handleLoginRedirect: function (): void {
    throw new Error(`Function not implemented.`);
  },
};

const BrowserHistoryContext = createContext<BrowserHistoryContextType>(
  DefaultBrowserHistoryState
);

export const BrowserHistoryProvider = ({ children }: Props): JSX.Element => {
  const { asPath, pathname } = useRouter();
  const { updateArrayWithLimit } = useArrayLimiter();
  const privatePaths = DefaultBrowserHistoryState.privatePaths;
  const [browserHistory, setBrowserHistory] = useSessionStorage("history") as [
    string[],
    (value: string[]) => void
  ];

  const handleLoginRedirect = useCallback(() => {
    if (
      !browserHistory ||
      browserHistory.length === 1 ||
      browserHistory[browserHistory.length - 2] === "/logout"
    ) {
      router.push("/dashboard");
    } else {
      router.push(browserHistory[browserHistory.length - 2]);
    }
  }, [browserHistory, router]);

  useEffect(() => {
    if (!browserHistory) setBrowserHistory([asPath]);
    else {
      if (browserHistory[browserHistory.length - 1] !== asPath) {
        const newHistory = updateArrayWithLimit(browserHistory, asPath, 99);
        setBrowserHistory([...newHistory]);
      }
    }
  }, [asPath]);

  return (
    <BrowserHistoryContext.Provider
      value={{ browserHistory, pathname, privatePaths, handleLoginRedirect }}
    >
      {children}
    </BrowserHistoryContext.Provider>
  );
};

export const useBrowserHistoryContext = (): BrowserHistoryContextType => {
  return useContext<BrowserHistoryContextType>(BrowserHistoryContext);
};
