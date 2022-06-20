import { ActivityRow } from "../../types";

export type UseActivityResult = {
  getActivitiesRows: (
    userName: string,
    isWalletActivityTable?: boolean
  ) => Promise<ActivityRow[]>;
};
