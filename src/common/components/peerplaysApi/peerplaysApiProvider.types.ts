import React from "react";

import { InstanceType } from "../../../api/services/initNode";

export interface PeerplaysApi {
  instance: InstanceType;
  isLoadingConnection: boolean;
  isConnectionError: boolean;
  dbApi: unknown;
  historyApi: unknown;
}
export interface Props {
  children: React.ReactNode;
}

export interface PeerplaysApiProvider {
  PeerplaysApi: PeerplaysApi;
}
