import React from "react";

declare module "peerplaysjs-lib";
declare module "*.svg" {
  const content: any;
  export default content;
}

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
