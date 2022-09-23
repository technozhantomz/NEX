export type ConnectionManagerContextType = {
  willTransitionTo: (appInit?: boolean | undefined) => Promise<void>;
  setFailureConnectionStates: (e: any) => void;
  setSuccessConnectionStates: () => void;
};
