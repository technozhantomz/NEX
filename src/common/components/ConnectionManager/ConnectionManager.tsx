import React from "react";

import { usePeerplaysApi } from "../PeerplaysApi";

type Props = {
  children: React.ReactNode;
};

export const ConnectionManager = ({ children }: Props): JSX.Element => {
  const { isLoadingConnection, isConnectionError } = usePeerplaysApi();
  if (isLoadingConnection) {
    return <div>loading</div>;
  } else if (!isLoadingConnection && isConnectionError) {
    return <div>disconnected please try again later</div>;
  } else {
    return <>{children}</>;
  }
};
