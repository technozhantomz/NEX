import { ChainConfig, ChainStore } from "peerplaysjs-lib";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { defaultNodesList, defaultToken } from "../../../api/params";
import {
  initNode,
  InitNodeOutput,
  InstanceType,
} from "../../../api/services/initNode";

import { PeerplaysApi, Props } from "./PeerplaysApiProvider.types";

const defaultPeerplaysApiContext: PeerplaysApi = {
  instance: {} as InstanceType,
  isLoadingConnection: true,
  isConnectionError: false,
  dbApi: null,
  historyApi: null,
};

const peerplaysApiContext = createContext<PeerplaysApi>(
  defaultPeerplaysApiContext
);

export function usePeerplaysApiContext(): PeerplaysApi {
  return useContext(peerplaysApiContext);
}

export function PeerplaysApiProvider({ children }: Props): JSX.Element {
  const [instance, setInstance] = useState<InstanceType>({} as InstanceType);
  const [isLoadingConnection, setIsLoadingConnection] = useState<boolean>(true);
  const [isConnectionError, setIsConnectionError] = useState<boolean>(false);

  const getApi =
    (type: "_db" | "_hist") =>
    (request: string, data = []) => {
      if (Object.keys(instance).length > 0) {
        return instance[type].exec(request, data).catch(async (err: Error) => {
          const error = "Error: websocket state error:3";
          const url = instance.url;
          if (error === err.message) {
            setIsLoadingConnection(true);
            const initedNode = await initNode(url, true);
            if (!initedNode) {
              setIsConnectionError(true);
              setIsLoadingConnection(false);
            } else {
              setInstance((initedNode as InitNodeOutput).instance);
              setIsLoadingConnection(false);
            }
          }
        });
      }
    };

  const setSocketCallBack = (instance: InstanceType): void => {
    instance.setRpcConnectionStatusCallback(async (status: string) => {
      if (status !== "closed") return;
      setIsLoadingConnection(true);
      const activeUrl = instance.url;
      const newInstance = await initNode(activeUrl, true);
      if (!newInstance) {
        setIsConnectionError(true);
        setIsLoadingConnection(false);
      } else {
        setInstance((newInstance as InitNodeOutput).instance);
        setIsLoadingConnection(false);
      }
    });
  };

  const initFirstNode = useCallback(async () => {
    setIsLoadingConnection(true);
    let initedNode;

    for (const node of defaultNodesList) {
      const initedInstance = await initNode(node.url, true);
      if (initedInstance) {
        initedNode = { ...node, ...(initedInstance as InitNodeOutput) };
        break;
      }
    }

    if (!initedNode) {
      setIsConnectionError(true);
      setIsLoadingConnection(false);
    } else {
      ChainStore.setDispatchFrequency(0);
      ChainStore.init();
      setInstance(initedNode.instance);
      setIsLoadingConnection(false);
      setSocketCallBack(initedNode.instance);
    }
  }, []);

  const dbApi = useCallback(getApi("_db"), [instance]);

  const historyApi = useCallback(getApi("_hist"), [instance]);

  useEffect(() => {
    initFirstNode();
    ChainConfig.setPrefix(defaultToken);
  }, []);
  return (
    <peerplaysApiContext.Provider
      value={{
        instance,
        isLoadingConnection,
        isConnectionError,
        dbApi,
        historyApi,
      }}
    >
      {children}
    </peerplaysApiContext.Provider>
  );
}
