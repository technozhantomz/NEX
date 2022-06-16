import React from "react";

import {
  AddressGenerated,
  GenerateBitcoinAddress,
  HIVEAndHBDDeposit,
} from "../../../../../common/components";
import { useAsset, useSidechainAccounts } from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { LogoSelect } from "../SwapTab.styled";

import { AssetSwapWrapper } from "./AssetSelect.styled";

type PropTypes = {
  selectedAsset: string;
  handleAssetChange: () => void;
};

export const AssetSelect = ({
  selectedAsset,
  handleAssetChange,
}: PropTypes): JSX.Element => {
  const {
    hasBTCDepositAddress,
    bitcoinSidechainAccount,
    getSidechainAccounts,
    loadingSidechainAccounts,
  } = useSidechainAccounts();
  const { sidechainAssets } = useAsset();
  console.log(selectedAsset);

  return (
    <AssetSwapWrapper>
      <LogoSelect
        assets={sidechainAssets}
        defaultValue={selectedAsset}
        onChange={handleAssetChange}
      />
    </AssetSwapWrapper>
  );
};
