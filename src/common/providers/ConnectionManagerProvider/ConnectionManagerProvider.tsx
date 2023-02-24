import counterpart from "counterpart";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ChainStoreProvider,
  useAppSettingsContext,
  usePeerplaysApiContext,
} from "..";
import { automaticSelection } from "../../../api/params";
import { LoadingIndicator } from "../../components";

import { ConnectionManagerContextType } from "./ConnectionManagerProvider.types";

interface Props {
  children: React.ReactNode;
}

const ConnectionManagerContext = createContext<ConnectionManagerContextType>(
  {} as ConnectionManagerContextType
);

export const ConnectionManagerProvider = ({ children }: Props): JSX.Element => {
  const [apiConnected, setApiConnected] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<boolean | null>(null);
  const [status, setStatus] = useState<
    string | { background: boolean; key: string } | boolean
  >("");

  const { apiSettings } = useAppSettingsContext();
  const {
    willTransitionTo: _willTransitionTo,
    apiInstance,
    dbApi,
  } = usePeerplaysApiContext();

  const statusCallback = useCallback(
    (status: string | { background: boolean; key: string } | boolean) => {
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

  let didInit = false;
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      willTransitionTo();
    }
  }, []);

  const renderLoadingScreen = () => {
    let server = apiSettings.selectedNode;
    if (!server || server === automaticSelection) {
      server = "";
    }
    return (
      <React.Fragment>
        <LoadingIndicator
          loadingText={
            (status as string) ||
            counterpart.translate("app_init.connecting", {
              server: server,
            })
          }
        ></LoadingIndicator>
      </React.Fragment>
    );
  };

  const renderUnsuccessfulConnection = syncError ? (
    <div
      style={{
        height: "100px",
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>{counterpart.translate(`app_init.sync_error.title`)}</h1>
      <div>
        {counterpart.translate(`app_init.sync_error.first_description`)}
      </div>
      <div>
        {counterpart.translate(`app_init.sync_error.second_description`)}
      </div>
    </div>
  ) : (
    <div
      style={{
        height: "100px",
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>{counterpart.translate(`app_init.connection_error.title`)}</h1>
      <div>
        {counterpart.translate(`app_init.connection_error.first_description`)}
      </div>
      <div>
        {counterpart.translate(`app_init.connection_error.second_description`)}
      </div>
    </div>
  );

  const renderNotConnectedScreen = (
    <div>
      {!apiError ? renderLoadingScreen() : renderUnsuccessfulConnection}
    </div>
  );

  const context = useMemo(() => {
    return {
      willTransitionTo,
      setFailureConnectionStates,
      setSuccessConnectionStates,
    };
  }, [
    willTransitionTo,
    setFailureConnectionStates,
    setSuccessConnectionStates,
  ]);

  return (
    <ConnectionManagerContext.Provider value={context}>
      {!apiConnected ? (
        renderNotConnectedScreen
      ) : (
        <ChainStoreProvider apiInstance={apiInstance} dbApi={dbApi}>
          {children}
        </ChainStoreProvider>
      )}
    </ConnectionManagerContext.Provider>
  );
};

export const useConnectionManagerContext = (): ConnectionManagerContextType => {
  return useContext<ConnectionManagerContextType>(ConnectionManagerContext);
};
