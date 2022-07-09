import { Asset } from "../../types";

export type AssetsContextType = {
  defaultAsset: Asset | undefined;
  sidechainAssets: Asset[];
  loadingSidechainAssets: boolean;
  loadingDefaultAsset: boolean;
};
