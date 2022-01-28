import React from "react";

import { InstanceType } from "../api/services/initNode";

export interface PeerplaysApi {
  instance: InstanceType;
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

export interface Asset {
  precision: any;
  id: string;
  symbol: string;
  percent: number;
  amount: number;
}
