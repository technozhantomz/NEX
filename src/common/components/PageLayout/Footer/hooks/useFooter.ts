import { useCallback, useEffect, useRef, useState } from "react";

import {
  useChainStoreContext,
  useConnectionManagerContext,
  usePeerplaysApiContext,
} from "../../../../providers";

import { UseFooterResult } from "./useFooter.types";

export function useFooter(): UseFooterResult {
  const [isOutOfSyncModalVisible, setIsOutOfSyncModalVisible] =
    useState<boolean>(false);
  const [connected, _setConnected] = useState<boolean>(() => {
    return rpcConnectionStatus !== "closed";
  });
  const [hasOutOfSyncModalBeenShownOnce, setHasOutOfSyncModalBeenShownOnce] =
    useState<boolean>(false);
  const connectionTimeout = useRef<NodeJS.Timeout>();
  const syncTimeout = useRef<NodeJS.Timeout>();

  const { isTransitionInProgress, isAutoSelection } = usePeerplaysApiContext();
  const { getBlockTimeDelta, synced, rpcConnectionStatus, OUT_OF_SYNC_LIMIT } =
    useChainStoreContext();
  const {
    willTransitionTo,
    setSuccessConnectionStates,
    setFailureConnectionStates,
  } = useConnectionManagerContext();

  const showOutOfSyncModal = useCallback(() => {
    setIsOutOfSyncModalVisible(true);
  }, [setIsOutOfSyncModalVisible]);

  const hideOutOfSyncModal = useCallback(() => {
    setIsOutOfSyncModalVisible(false);
  }, [setIsOutOfSyncModalVisible]);

  const triggerReconnect: (honorManualSelection?: boolean) => Promise<void> =
    useCallback(
      async (honorManualSelection = true) => {
        if (honorManualSelection && !isAutoSelection()) {
          return;
        }
        if (connectionTimeout.current !== undefined) {
          clearTimeout(connectionTimeout.current);
          connectionTimeout.current = undefined;
        }
        if (syncTimeout.current !== undefined) {
          clearTimeout(syncTimeout.current);
          syncTimeout.current = undefined;
        }
        if (!isTransitionInProgress()) {
          hideOutOfSyncModal();
          console.log("Trying to reconnect ...");

          // reconnect to anythin
          try {
            await willTransitionTo(false);
          } catch (e) {
            console.log(e);
          }
        }
      },
      [
        isAutoSelection,
        isTransitionInProgress,
        hideOutOfSyncModal,
        willTransitionTo,
        setSuccessConnectionStates,
        setFailureConnectionStates,
        synced,
        connected,
        connectionTimeout,
        connectionTimeout.current,
        syncTimeout,
        syncTimeout.current,
      ]
    );

  const getForceReconnectAfterSeconds = useCallback(() => {
    return 30;
  }, []);

  const setConnected = useCallback(() => {
    const connected = rpcConnectionStatus !== "closed";
    _setConnected(connected);
  }, [rpcConnectionStatus, _setConnected]);

  const ensureConnectivity = useCallback(() => {
    const connected = rpcConnectionStatus !== "closed";

    if (!connected && !connectionTimeout.current) {
      connectionTimeout.current = setTimeout(() => {
        triggerReconnect();
      }, 50);
    } else if (!synced) {
      // If the blockchain is out of sync the footer will be rerendered one last time and then

      const forceReconnectAfterSeconds = getForceReconnectAfterSeconds();
      const askToReconnectAfterSeconds = 10;

      // Trigger automatic reconnect after X seconds
      if (!syncTimeout.current) {
        syncTimeout.current = setTimeout(() => {
          triggerReconnect();
        }, forceReconnectAfterSeconds * 1000);
      }

      // Still out of sync?
      if (getBlockTimeDelta() > OUT_OF_SYNC_LIMIT) {
        console.log(
          "Your node is out of sync since " +
            getBlockTimeDelta() +
            " seconds, waiting " +
            askToReconnectAfterSeconds +
            " seconds, then we notify you"
        );
        setTimeout(() => {
          // Only ask the user once, and only continue if still out of sync
          if (
            getBlockTimeDelta() > OUT_OF_SYNC_LIMIT &&
            hasOutOfSyncModalBeenShownOnce === false
          ) {
            setHasOutOfSyncModalBeenShownOnce(true);
            showOutOfSyncModal();
          }
        }, askToReconnectAfterSeconds * 1000);
      }
    } else {
      setTimeout(() => {
        hideOutOfSyncModal();
        setHasOutOfSyncModalBeenShownOnce(false);
      }, 50);
    }
  }, [
    rpcConnectionStatus,
    triggerReconnect,
    synced,
    getForceReconnectAfterSeconds,
    getBlockTimeDelta,
    hasOutOfSyncModalBeenShownOnce,
    setHasOutOfSyncModalBeenShownOnce,
    showOutOfSyncModal,
    hideOutOfSyncModal,
  ]);

  useEffect(() => {
    setConnected();
  }, [setConnected]);

  useEffect(() => {
    ensureConnectivity();
  }, [connected, synced]);

  useEffect(() => {
    if (synced && syncTimeout.current !== undefined) {
      clearTimeout(syncTimeout.current);
      syncTimeout.current = undefined;
    }
  }, [synced]);

  return {
    isOutOfSyncModalVisible,
    showOutOfSyncModal,
    hideOutOfSyncModal,
    triggerReconnect,
    getForceReconnectAfterSeconds,
    getBlockTimeDelta,
    synced,
    connected,
  };
}
