import { Asset } from "../../../common/types";

export type GPOSBalances = {
  openingBalance: number;
  availableBalance: number;
  newBalance: number;
  asset: Asset;
};
