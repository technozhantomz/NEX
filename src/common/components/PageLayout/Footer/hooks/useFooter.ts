import { useCallback, useEffect, useState } from "react";

//import { useConnectionManager } from "../../../../hooks";
import {
  useChainStoreContext,
  useConnectionManagerContext,
  usePeerplaysApiContext,
} from "../../../../providers";

import { UseFooterResult } from "./useFooter.types";

export function useFooter(): UseFooterResult {
  const [isOutOfSyncModalVisible, setIsOutOfSyncModalVisible] =
    useState<boolean>(false);
  const [connected, _setConnected] = useState<boolean>(true);
  const [hasOutOfSyncModalBeenShownOnce, setHasOutOfSyncModalBeenShownOnce] =
    useState<boolean>(false);

  const { isTransitionInProgress, isAutoSelection } = usePeerplaysApiContext();
  const { getBlockTimeDelta, synced, rpcConnectionStatus } =
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
        if (!isTransitionInProgress()) {
          hideOutOfSyncModal();
          console.log("Trying to reconnect ...");

          // reconnect to anythin
          try {
            await willTransitionTo(false);
          } catch (e) {
            console.log("ghasem", e);
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
      ]
    );

  const getForceReconnectAfterSeconds = useCallback(() => {
    return 60;
  }, []);

  const setConnected = useCallback(() => {
    const connected = !(rpcConnectionStatus === "closed");
    _setConnected(connected);
  }, [rpcConnectionStatus, _setConnected]);

  const ensureConnectivity = useCallback(() => {
    const connected = !(rpcConnectionStatus === "closed");

    if (!connected) {
      setTimeout(() => {
        triggerReconnect();
      }, 50);
    } else if (!synced) {
      // If the blockchain is out of sync the footer will be rerendered one last time and then

      const forceReconnectAfterSeconds = getForceReconnectAfterSeconds();
      const askToReconnectAfterSeconds = 10;

      // Trigger automatic reconnect after X seconds
      setTimeout(() => {
        if (!synced) {
          triggerReconnect();
        }
      }, forceReconnectAfterSeconds * 1000);

      // Still out of sync?
      if (getBlockTimeDelta() > 3) {
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
            getBlockTimeDelta() > 3 &&
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
  });

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
