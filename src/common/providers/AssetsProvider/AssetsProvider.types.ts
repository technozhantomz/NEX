import { Asset } from "../../types";

export type AssetsContextType = {
  defaultAsset: Asset | undefined;
  sidechainAssets: (Asset | undefined)[];
  loadingSidechainAssets: boolean;
  loadingDefaultAsset: boolean;
};
