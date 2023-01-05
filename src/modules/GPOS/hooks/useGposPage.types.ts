import { Dispatch, SetStateAction } from "react";

import { GPOSBalances } from "../types";

export type UseGposPageResult = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  calculateGposBalances: () => Promise<void>;
  isMobileDropdownvisible: boolean;
  setIsMobileDropdownvisible: Dispatch<SetStateAction<boolean>>;
};
