import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../../providers";

import { UseConnectionManagerResult } from "./useConnectionManager.types";

export function useConnectionManager(): UseConnectionManagerResult {
  const [apiConnected, setApiConnected] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string>("");
  const [nodeFilterHasChanged, setNodeFilterHasChanged] = useState(false);
  const [showNodeFilter, setShowNodeFilter] = useState(false);

  const { willTransitionTo: _willTransitionTo } = usePeerplaysApiContext();
  console.log("status", status);
  const statusCallback = useCallback(
    (status: string) => {
      setStatus(status);
    },
    [setStatus]
  );

  const willTransitionTo = useCallback(async () => {
    try {
      await _willTransitionTo(true, statusCallback);
      setApiConnected(true);
      setApiError(false);
      setSyncError(false);
    } catch (e: any) {
      console.log("willTransitionTo err:", e);
      setApiConnected(false);
      setApiError(true);
      const syncError = !e
        ? null
        : (e && e.message).indexOf("ChainStore sync error") !== -1;
      setSyncError(syncError);
    }
  }, [_willTransitionTo, setApiConnected, setApiError, setSyncError]);

  useEffect(() => {
    setTimeout(() => {
      setShowNodeFilter(true);
    }, 5000);
  }, [setShowNodeFilter]);

  useEffect(() => {
    console.log("salam");
    willTransitionTo();
  }, [willTransitionTo]);

  return {
    apiConnected,
    apiError,
    syncError,
    status,
    nodeFilterHasChanged,
    showNodeFilter,
    setNodeFilterHasChanged,
  };
}
