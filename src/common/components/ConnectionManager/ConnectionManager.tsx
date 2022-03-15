import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

import { usePeerplaysApiContext } from "../PeerplaysApiProvider";

type Props = {
  children: React.ReactNode;
};

export const ConnectionManager = ({ children }: Props): JSX.Element => {
  const { isLoadingConnection, isConnectionError } = usePeerplaysApiContext();

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
