import React from "react";

export interface PeerplaysApi {
  instance: any;
  isLoadingConnection: boolean;
  isConnectionError: boolean;
  dbApi: any;
}
export interface Props {
  children: React.ReactNode;
}

export interface PeerplaysApiProvider {
  PeerplaysApi: PeerplaysApi;
}
