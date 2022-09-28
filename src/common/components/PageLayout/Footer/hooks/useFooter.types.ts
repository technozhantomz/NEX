export type UseFooterResult = {
  isOutOfSyncModalVisible: boolean;
  showOutOfSyncModal: () => void;
  hideOutOfSyncModal: () => void;
  triggerReconnect: (
    honorManualSelection?: boolean | undefined
  ) => Promise<void>;
  getForceReconnectAfterSeconds: () => number;
  getBlockTimeDelta: () => number;
  synced: boolean;
  connected: boolean;
};
