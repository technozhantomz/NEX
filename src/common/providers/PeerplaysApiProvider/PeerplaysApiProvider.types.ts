import { ApiLatencies, ApiServer } from "../../types";

export type NodeTransitionCallbackType = (
  status:
    | string
    | boolean
    | {
        background: boolean;
        key: string;
      }
) => void;

export type NodeTransitionerContextType = {
  getNodes: (
    latenciesMap?: ApiLatencies,
    latencies?: boolean,
    hidden?: boolean,
    unsuitableSecurity?: boolean
  ) => ApiServer[];
  willTransitionTo: (
    appInit?: any,
    _statusCallback?: NodeTransitionCallbackType | undefined
  ) => Promise<void>;
  dbApi: (request: string, data?: any) => Promise<any> | undefined;
  historyApi: (request: string, data?: any) => Promise<any> | undefined;
};
