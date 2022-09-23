import counterpart from "counterpart";
import React from "react";

import { LoadingIndicator } from "..";
import { automaticSelection } from "../../../api/params";
import { useConnectionManager } from "../../hooks";
import { ChainStoreProvider, useSettingsContext } from "../../providers";

type Props = {
  children: React.ReactNode;
};

export const ConnectionManager = ({ children }: Props): JSX.Element => {
  const { apiSettings } = useSettingsContext();
  const { apiConnected, apiError, syncError, status } = useConnectionManager();
  console.log("apiConnected", apiConnected);
  console.log("apiError", apiError);
  console.log("syncError", syncError);
  console.log("status", status);

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

  if (!apiConnected) {
    return (
      <div>
        {!apiError ? (
          renderLoadingScreen()
        ) : syncError ? (
          //   <SyncError />
          <span>Sync error</span>
        ) : (
          <span>Init error</span>
          //   <InitError />
        )}
      </div>
    );
  }
  return <ChainStoreProvider>{children}</ChainStoreProvider>;
};
