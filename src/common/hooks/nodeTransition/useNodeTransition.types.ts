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

export type UseNodeTransitionResult = {
  getNodes: (
    latenciesMap?: ApiLatencies,
    latencies?: boolean,
    hidden?: boolean,
    unsuitableSecurity?: boolean
  ) => ApiServer[];
  willTransitionTo: (
    appInit: any,
    _statusCallback: NodeTransitionCallbackType
  ) => Promise<unknown>;
};
