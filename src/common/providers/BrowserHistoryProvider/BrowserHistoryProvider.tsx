import router, { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useUserContext } from "..";
import { useArrayLimiter, useSessionStorage } from "../../hooks";

import { BrowserHistoryContextType } from "./BrowserHistoryProvider.types";

interface Props {
  children: React.ReactNode;
}

const BROWSER_HISTORY_LENGTH = 20;

const DefaultBrowserHistoryState: BrowserHistoryContextType = {
  browserHistory: [],
  pathname: "",
  privatePaths: ["/wallet", "/wallet/[asset]", "/settings", "/voting", "/gpos"],
  pageLoading: true,
  handleLoginRedirect: function (): void {
    throw new Error(`Function not implemented.`);
  },
};

const BrowserHistoryContext = createContext<BrowserHistoryContextType>(
  DefaultBrowserHistoryState
);

export const BrowserHistoryProvider = ({ children }: Props): JSX.Element => {
  const { asPath, pathname } = useRouter();
  const { localStorageAccount } = useUserContext();
  const { updateArrayWithLimit } = useArrayLimiter();
  const privatePaths = DefaultBrowserHistoryState.privatePaths;
  const [pageLoading, setPageLoading] = useState<boolean>(
    DefaultBrowserHistoryState.pageLoading
  );
  const [browserHistory, setBrowserHistory] = useSessionStorage("history") as [
    string[],
    (value: string[]) => void
  ];

  const handleLoginRedirect = useCallback(() => {
    if (
      !browserHistory ||
      browserHistory.length < 2 ||
      browserHistory[browserHistory.length - 2] === "/logout" ||
      browserHistory[browserHistory.length - 2] === "/signup" ||
      browserHistory[browserHistory.length - 2] === "/login"
    ) {
      router.push("/dashboard");
    } else {
      router.push(browserHistory[browserHistory.length - 2]);
    }
  }, [browserHistory, router]);

  const updateBrowserHistory = useCallback(() => {
    if (!browserHistory) {
      setBrowserHistory([asPath]);
    } else {
      if (browserHistory[browserHistory.length - 1] !== asPath) {
        const newHistory = updateArrayWithLimit(
          browserHistory,
          asPath,
          BROWSER_HISTORY_LENGTH
        );
        setBrowserHistory([...newHistory]);
      }
    }
  }, [browserHistory, setBrowserHistory, asPath, updateArrayWithLimit]);

  useEffect(() => {
    if (!localStorageAccount && privatePaths.includes(pathname)) {
      router.replace("/login");
    } else {
      setPageLoading(false);
    }
    updateBrowserHistory();
  }, [asPath, localStorageAccount]);

  return (
    <BrowserHistoryContext.Provider
      value={{
        browserHistory,
        pathname,
        privatePaths,
        pageLoading,
        handleLoginRedirect,
      }}
    >
      {children}
    </BrowserHistoryContext.Provider>
  );
};

export const useBrowserHistoryContext = (): BrowserHistoryContextType => {
  return useContext<BrowserHistoryContextType>(BrowserHistoryContext);
};
