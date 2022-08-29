import React from "react";

import {
  AddressGenerated,
  GenerateBitcoinAddress,
  HIVEAndHBDDeposit,
} from "../../../../common/components";
import { useSidechainAccounts } from "../../../../common/hooks";
import { useAssetsContext, useUserContext } from "../../../../common/providers";

import * as Styled from "./DepositTab.styled";
import { useDepositTab } from "./hooks";

export const DepositTab = (): JSX.Element => {
  const {
    hasBTCDepositAddress,
    bitcoinSidechainAccount,
    getSidechainAccounts,
    loadingSidechainAccounts,
  } = useSidechainAccounts();
  const { localStorageAccount } = useUserContext();
  const { sidechainAssets } = useAssetsContext();
  const { handleAssetChange, selectedAsset } = useDepositTab();

  const isLoggedIn = localStorageAccount && localStorageAccount !== "";

  const loggedInUserBTCDeposit = hasBTCDepositAddress ? (
    <Styled.AddressGeneratedContainer>
      <AddressGenerated
        bitcoinSidechainAccount={bitcoinSidechainAccount}
        getSidechainAccounts={getSidechainAccounts}
      />
    </Styled.AddressGeneratedContainer>
  ) : (
    <>
      <GenerateBitcoinAddress
        isLoggedIn={!!localStorageAccount}
        getSidechainAccounts={getSidechainAccounts}
      />
    </>
  );

  const loggedInUserBTCDepositWithLoading = loadingSidechainAccounts
    ? ""
    : loggedInUserBTCDeposit;

  const nonLoggedInUserBTCDeposit = (
    <>
      <GenerateBitcoinAddress
        isLoggedIn={false}
        getSidechainAccounts={getSidechainAccounts}
      />
    </>
  );

  const BTCDeposit = isLoggedIn
    ? loggedInUserBTCDepositWithLoading
    : nonLoggedInUserBTCDeposit;

  const HIVEDeposit = (
    <Styled.HIVEDepositContainer>
      <HIVEAndHBDDeposit assetSymbol={selectedAsset} />
    </Styled.HIVEDepositContainer>
  );

  const deposit = selectedAsset === "BTC" ? BTCDeposit : HIVEDeposit;

  return (
    <Styled.DepositFormContainer>
      <Styled.LogoSelect
        assets={sidechainAssets}
        value={selectedAsset}
        onChange={handleAssetChange}
      />

      {deposit}
    </Styled.DepositFormContainer>
  );
};
