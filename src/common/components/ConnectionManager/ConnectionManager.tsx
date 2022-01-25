import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

import { usePeerplaysApi } from "../../../modules/peerplaysApi";

type Props = {
  children: React.ReactNode;
};

export const ConnectionManager = ({ children }: Props): JSX.Element => {
  const { isLoadingConnection, isConnectionError } = usePeerplaysApi();
  if (isConnectionError) {
    return <div>disconnected please try again later</div>;
  }
  if (isLoadingConnection) {
    return (
      <div>
        <p>loading</p>
        <LoadingOutlined />
      </div>
    );
  }

  return <>{children}</>;
};
