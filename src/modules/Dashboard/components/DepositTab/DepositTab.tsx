import React from "react";

import {
  AddressGenerated,
  GenerateBitcoinAddress,
  useUserContext,
} from "../../../../common/components";
import { useAsset, useSidechainAccounts } from "../../../../common/hooks";

import * as Styled from "./DepositTab.styled";

export const DepositTab = (): JSX.Element => {
  const {
    hasBTCDepositAddress,
    bitcoinSidechainAccount,
    getSidechainAccounts,
    loadingSidechainAccounts,
  } = useSidechainAccounts();
  const { localStorageAccount } = useUserContext();
  const { sidechainAssets, loadingSidechainAssets } = useAsset();

  return (
    <Styled.DepositFormContainer>
      {!loadingSidechainAssets ? (
        <Styled.LogoSelect assets={sidechainAssets} defaultValue={"BTC"} />
      ) : (
        ""
      )}
      {!loadingSidechainAccounts ? (
        ""
      ) : hasBTCDepositAddress ? (
        <AddressGenerated bitcoinSidechainAccount={bitcoinSidechainAccount} />
      ) : (
        <>
          <GenerateBitcoinAddress
            isLoggedIn={!!localStorageAccount}
            getSidechainAccounts={getSidechainAccounts}
          />
        </>
      )}
    </Styled.DepositFormContainer>
  );
};
