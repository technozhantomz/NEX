export type UseConnectionManagerResult = {
  apiConnected: boolean;
  apiError: boolean;
  syncError: boolean | null;
  status: string;
  willTransitionTo: (appInit?: boolean | undefined) => Promise<void>;
  setSuccessConnectionStates: () => void;
  setFailureConnectionStates: (e: any) => void;
};
