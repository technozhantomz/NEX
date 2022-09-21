//import counterpart from "counterpart";
import React from "react";

//import { LoadingIndicator } from "..";
import { useSettingsContext } from "../../providers";

import { useConnectionManager } from "./hooks";

type Props = {
  children: React.ReactNode;
};

export const ConnectionManager2 = ({ children }: Props): JSX.Element => {
  const { apiSettings } = useSettingsContext();
  const {
    apiConnected,
    apiError,
    syncError,
    //status,
    showNodeFilter,
    nodeFilterHasChanged,
  } = useConnectionManager();
  const renderLoadingScreen = () => {
    let server = apiSettings.selectedNode;
    if (!server) {
      server = "";
    }
    return (
      <React.Fragment>
        {/* <LoadingIndicator
          loadingText={
            status ||
            counterpart.translate("app_init.connecting", {
              server: server,
            })
          }
        > */}
        {showNodeFilter && (
          <div>
            <span>Node selector</span>
            {/* <NodeSelector onChange={this._onNodeFilterChange.bind(this)} /> */}
            {nodeFilterHasChanged && (
              <div style={{ marginTop: "1rem" }}>
                Please reload for the changes to take effect
              </div>
            )}
          </div>
        )}
        {/* </LoadingIndicator> */}
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
  return <>{children}</>;
};
