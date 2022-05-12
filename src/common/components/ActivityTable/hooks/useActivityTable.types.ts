import { ActivityRow } from "../../../types";

export type UseActivityTableResult = {
  activitiesRows: ActivityRow[];
  loading: boolean;
};

export type UseActivityTableArgs = {
  userName?: string;
  isWalletActivityTable?: boolean;
};
