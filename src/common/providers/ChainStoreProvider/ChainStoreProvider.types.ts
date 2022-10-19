export type ChainStoreContextType = {
  synced: boolean;
  getBlockTimeDelta: () => number;
  rpcConnectionStatus?: string;
  OUT_OF_SYNC_LIMIT: number;
};
