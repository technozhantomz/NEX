import { Dispatch, SetStateAction } from "react";

export type UseConnectionManagerResult = {
  apiConnected: boolean;
  apiError: boolean;
  syncError: boolean | null;
  status: string;
  nodeFilterHasChanged: boolean;
  showNodeFilter: boolean;
  setNodeFilterHasChanged: Dispatch<SetStateAction<boolean>>;
};
