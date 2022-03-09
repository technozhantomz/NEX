import { LoadingOutlined } from "@ant-design/icons";
import { ChainConfig } from "peerplaysjs-lib";
import React from "react";

import { defaultToken } from "../../../api/params";
import { usePeerplaysApiContext } from "../PeerplaysApiProvider";

type Props = {
  children: React.ReactNode;
};

export const ConnectionManager = ({ children }: Props): JSX.Element => {
  const { isLoadingConnection, isConnectionError } = usePeerplaysApiContext();
  ChainConfig.setPrefix(defaultToken);

  if (isLoadingConnection) {
    return (
      <div>
        loading
        <LoadingOutlined />
      </div>
    );
  } else if (!isLoadingConnection && isConnectionError) {
    return <div>disconnected please try again later</div>;
  } else {
    return <>{children}</>;
  }
};
