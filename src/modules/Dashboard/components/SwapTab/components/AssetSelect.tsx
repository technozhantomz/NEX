import React from "react";

// import {
//   AddressGenerated,
//   GenerateBitcoinAddress,
//   HIVEAndHBDDeposit,
// } from "../../../../../common/components";
import { useAsset, useSidechainAccounts } from "../../../../../common/hooks";
import { Input } from "../../../../../ui/src";
// import { useUserContext } from "../../../../../common/providers";
import { LogoSelect } from "../SwapTab.styled";

import * as Styled from "./AssetSelect.styled";

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
    <Styled.AssetSwapWrapper>
      <Styled.SwapFormAmmount name="amount">
        <Input
          placeholder="0.00000"
          type="number"
          prefix={
            <Styled.SwapFormAsset name="asset">
              <LogoSelect
                assets={sidechainAssets}
                defaultValue={selectedAsset}
                onChange={handleAssetChange}
              />
            </Styled.SwapFormAsset>
          }
        />
      </Styled.SwapFormAmmount>
    </Styled.AssetSwapWrapper>
  );
};
