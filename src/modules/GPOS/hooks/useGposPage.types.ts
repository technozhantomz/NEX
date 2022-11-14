import { GPOSBalances } from "../types";

export type UseGposPageResult = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  calculateGposBalances: () => Promise<void>;
  isMobileDropdownvisible: boolean;
  setIsMobileDropdownvisible: (isMobileDropdownvisible: boolean) => void;
};
