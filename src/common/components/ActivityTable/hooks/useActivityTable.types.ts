import { Dispatch, SetStateAction } from "react";

import { ActivityRow } from "../../../types";

export type UseActivityTableResult = {
  activitiesRows: ActivityRow[];
  loading: boolean;
  searchDataSource: ActivityRow[];
  setSearchDataSource: Dispatch<SetStateAction<ActivityRow[]>>;
};

export type UseActivityTableArgs = {
  userName?: string;
  isWalletActivityTable?: boolean;
};
