export type ChainStoreContextType = {
  synced: boolean;
  getBlockTimeDelta: () => number;
  rpcConnectionStatus?: string;
};
