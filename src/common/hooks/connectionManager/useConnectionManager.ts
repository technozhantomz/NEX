import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../providers";

import { UseConnectionManagerResult } from "./useConnectionManager.types";

export function useConnectionManager(): UseConnectionManagerResult {
  const [apiConnected, setApiConnected] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string>("");

  const { willTransitionTo: _willTransitionTo } = usePeerplaysApiContext();
  const statusCallback = useCallback(
    (status: string) => {
      setStatus(status);
    },
    [setStatus]
  );

  const setSuccessConnectionStates = useCallback(() => {
    setApiConnected(true);
    setApiError(false);
    setSyncError(false);
  }, [setApiConnected, setApiError, setSyncError]);
  const setFailureConnectionStates = useCallback(
    (e: any) => {
      setApiConnected(false);
      setApiError(true);
      const syncError = !e
        ? null
        : (e && e.message).indexOf("ChainStore sync error") !== -1;
      setSyncError(syncError);
    },
    [setApiConnected, setApiError, setSyncError]
  );

  const willTransitionTo: (appInit?: boolean) => Promise<void> = useCallback(
    async (appInit = true) => {
      try {
        await _willTransitionTo(appInit, statusCallback);
        setSuccessConnectionStates();
      } catch (e: any) {
        console.log("willTransitionTo err:", e);
        setFailureConnectionStates(e);
      }
    },
    [_willTransitionTo, setSuccessConnectionStates, setFailureConnectionStates]
  );

  useEffect(() => {
    willTransitionTo();
  }, []);

  return {
    apiConnected,
    apiError,
    syncError,
    status,
    willTransitionTo,
    setFailureConnectionStates,
    setSuccessConnectionStates,
  };
}
