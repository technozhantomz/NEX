import counterpart from "counterpart";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  ChainStoreProvider,
  usePeerplaysApiContext,
  useSettingsContext,
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
  const [status, setStatus] = useState<string>("");

  const { apiSettings } = useSettingsContext();
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

  const renderLoadingScreen = () => {
    let server = apiSettings.selectedNode;
    if (!server || server === automaticSelection) {
      server = "";
    }
    return (
      <React.Fragment>
        <LoadingIndicator
          loadingText={
            status ||
            counterpart.translate("app_init.connecting", {
              server: server,
            })
          }
        ></LoadingIndicator>
      </React.Fragment>
    );
  };

  const renderUnsuccessfulConnection = (
    <div>
      {!apiError ? (
        renderLoadingScreen()
      ) : syncError ? (
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
          <h1>Failed to sync with the API server</h1>
          <div>Please verify that your computer clock is correct.</div>
          <div>
            Once you've synchronized your clock, please refresh this page.
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
          <h1>Application initialization issues</h1>
          <div>
            Comming soon: Node mannual selection and Adding personal node{" "}
          </div>
          <div>Please check your connection and refresh the page</div>
        </div>
      )}
    </div>
  );

  return (
    <ConnectionManagerContext.Provider
      value={{
        willTransitionTo,
        setFailureConnectionStates,
        setSuccessConnectionStates,
      }}
    >
      {!apiConnected ? (
        renderUnsuccessfulConnection
      ) : (
        <ChainStoreProvider>{children}</ChainStoreProvider>
      )}
    </ConnectionManagerContext.Provider>
  );
};

export const useConnectionManagerContext = (): ConnectionManagerContextType => {
  return useContext<ConnectionManagerContextType>(ConnectionManagerContext);
};
