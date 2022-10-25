import { Apis, ChainStore } from "peerplaysjs-lib";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useBlockchain } from "../../hooks";
import { ApisInstanceType, BlockData } from "../../types";

import { ChainStoreContextType } from "./ChainStoreProvider.types";

interface Props {
  children: React.ReactNode;
  apiInstance: ApisInstanceType | undefined;
}

const defaultChainStoreState: ChainStoreContextType =
  {} as ChainStoreContextType;

const ChainStoreContext = createContext<ChainStoreContextType>(
  defaultChainStoreState
);

const OUT_OF_SYNC_LIMIT = 7;

export const ChainStoreProvider = ({
  children,
  apiInstance,
}: Props): JSX.Element => {
  const [syncFail, setSyncFail] = useState<boolean>(() => {
    return ChainStore.subError &&
      ChainStore.subError.message ===
        "ChainStore sync error, please check your system clock"
      ? true
      : false;
  });
  const [synced, setSynced] = useState<boolean>(true);
  const [rpcConnectionStatus, setRpcConnectionStatus] = useState<
    string | undefined
  >("open");
  const dynGlobalObject = useRef<BlockData>();

  const { getBlockData } = useBlockchain();

  const getBlockTime = () => {
    if (dynGlobalObject.current) {
      let blockTime = dynGlobalObject.current.time;
      if (!/Z$/.test(blockTime)) {
        blockTime += "Z";
      }
      return new Date(blockTime);
    } else {
      throw new Error("Blocktime not available right now");
    }
  };

  const getBlockTimeDelta = useCallback(() => {
    try {
      const bt =
        (getBlockTime().getTime() + ChainStore.getEstimatedChainTimeOffset()) /
        1000;
      const now = new Date().getTime() / 1000;
      return Math.abs(now - bt);
    } catch (e) {
      console.log(e);
      return -1;
    }
  }, [getBlockTime, apiInstance]);

  const syncStatus: (setState?: boolean) => boolean = useCallback(
    (setState = true) => {
      const _synced = getBlockTimeDelta() < OUT_OF_SYNC_LIMIT;
      if (setState && _synced !== synced) {
        setSynced(_synced);
      }
      return synced;
    },
    [getBlockTimeDelta, synced, setSynced]
  );
  const chainStoreSub = useCallback(() => {
    const _synced = syncStatus();
    if (_synced !== synced) {
      setSynced(_synced);
    }
    if (ChainStore.subscribed !== _synced || ChainStore.subError) {
      const syncFail =
        ChainStore.subError &&
        ChainStore.subError.message ===
          "ChainStore sync error, please check your system clock"
          ? true
          : false;
      setSyncFail(syncFail);
    }
  }, [syncStatus, synced, setSynced, ChainStore, setSyncFail]);

  const setListeners = useCallback(() => {
    try {
      ChainStore.subscribe(chainStoreSub);
    } catch (e) {
      console.error("e:", e);
    }
  }, [ChainStore, chainStoreSub, apiInstance]);

  const updateRpcConnectionStatus = useCallback(
    (status?: string) => {
      setRpcConnectionStatus(status);
    },
    [setRpcConnectionStatus]
  );

  useEffect(() => {
    setListeners();
    const syncCheckInterval = setInterval(syncStatus, 5000);
    return () => {
      clearInterval(syncCheckInterval as NodeJS.Timer);
    };
  }, [setListeners]);

  useEffect(() => {
    apiInstance?.setRpcConnectionStatusCallback(updateRpcConnectionStatus);
  }, [Apis, updateRpcConnectionStatus, apiInstance]);

  const update = async () => {
    try {
      const _dynGlobalObject = await getBlockData();
      if (dynGlobalObject) {
        dynGlobalObject.current = _dynGlobalObject;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    ChainStore.subscribe(update);
    update();

    return () => {
      ChainStore.unsubscribe(update);
    };
  }, [apiInstance]);

  return (
    <ChainStoreContext.Provider
      value={{
        synced,
        getBlockTimeDelta,
        rpcConnectionStatus,
        OUT_OF_SYNC_LIMIT,
      }}
    >
      {syncFail ? <div>Sync error</div> : children}
    </ChainStoreContext.Provider>
  );
};

export const useChainStoreContext = (): ChainStoreContextType => {
  return useContext<ChainStoreContextType>(ChainStoreContext);
};
