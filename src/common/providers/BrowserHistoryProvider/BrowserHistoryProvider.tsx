import router, { useRouter } from "next/router";
import React, { createContext, useCallback, useContext, useRef } from "react";

import { useUserContext } from "..";
import { useArrayLimiter } from "../../hooks";

import { BrowserHistoryContextType } from "./BrowserHistoryProvider.types";

interface Props {
  children: React.ReactNode;
}

const BROWSER_HISTORY_LENGTH = 20;

const DefaultBrowserHistoryState: BrowserHistoryContextType = {
  browserHistory: [],
  pathname: "",
  privatePaths: [
    "/wallet",
    "/wallet/[[...asset]]",
    "/settings?tab=key-management",
    "/settings?tab=membership",
    "/voting",
    "/gpos",
  ],
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

  const browserHistory = useRef<string[]>([]);

  const handleLoginRedirect = useCallback(() => {
    if (
      !browserHistory ||
      browserHistory.current.length < 2 ||
      browserHistory.current[browserHistory.current.length - 2] === "/logout" ||
      browserHistory.current[browserHistory.current.length - 2] === "/signup" ||
      browserHistory.current[browserHistory.current.length - 2] === "/login"
    ) {
      router.push("/");
    } else {
      router.push(browserHistory.current[browserHistory.current.length - 2]);
    }
  }, [browserHistory, browserHistory.current, router]);

  const updateBrowserHistory = useCallback(() => {
    if (!browserHistory.current.length) {
      browserHistory.current = [asPath];
    } else {
      if (
        browserHistory.current[browserHistory.current.length - 1] !== asPath
      ) {
        const newHistory = updateArrayWithLimit(
          browserHistory.current,
          asPath,
          BROWSER_HISTORY_LENGTH
        );
        browserHistory.current = [...newHistory];
      }
    }
  }, [browserHistory, browserHistory.current, asPath, updateArrayWithLimit]);

  if (!localStorageAccount && privatePaths.includes(pathname)) {
    router.replace("/login");
  }
  updateBrowserHistory();

  return (
    <BrowserHistoryContext.Provider
      value={{
        browserHistory: browserHistory.current,
        pathname,
        privatePaths,
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
