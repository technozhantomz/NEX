import router, { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { useArrayLimiter, useSessionStorage } from "../../hooks";
import { useUserContext } from "../UserProvider";

import { BrowserHistoryContextType } from "./BrowserHistoryProvider.types";

interface Props {
  children: React.ReactNode;
}

const DefaultBrowserHistoryState: BrowserHistoryContextType = {
  browserHistory: [],
  pathname: "",
  privatePaths: ["/wallet", "/wallet/[asset]", "/settings", "/voting"],
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
  const { updateArrayWithLmit } = useArrayLimiter();
  const privatePaths = DefaultBrowserHistoryState.privatePaths;
  const [browserHistory, setBrowserHistory] = useSessionStorage("history") as [
    string[],
    (value: string[]) => void
  ];

  const handleLoginRedirect = useCallback(() => {
    if (
      browserHistory.length === 1 ||
      browserHistory[browserHistory.length - 2] === "/logout"
    ) {
      router.push("/dashboard");
    } else {
      router.push(browserHistory[browserHistory.length - 2]);
    }
  }, []);

  const isAuthOnlyPage = (path: string) => {
    if (path === "/") return false;
    if (pathname.includes(path)) return true;
    return false;
  };

  useEffect(() => {
    if (!browserHistory) setBrowserHistory([asPath]);
    else {
      if (browserHistory[browserHistory.length - 1] !== asPath) {
        setBrowserHistory(
          updateArrayWithLmit(browserHistory, asPath, 99) as string[]
        );
      }
    }
  }, [asPath]);

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      if (!localStorageAccount && privatePaths.includes(pathname)) {
        router.replace("/login");
      }
    };
    const handleStop = () => {
      console.log("finised");
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

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
