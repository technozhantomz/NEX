import React from "react";

import {
  AddressGenerated,
  GenerateBitcoinAddress,
  HIVEAndHBDDeposit,
} from "../../../../common/components";
import { useAsset, useSidechainAccounts } from "../../../../common/hooks";
import { useUserContext } from "../../../../common/providers";

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
  const { sidechainAssets } = useAsset();
  const { handleAssetChange, selectedAsset } = useDepositTab();
  return (
    <Styled.DepositFormContainer>
      <Styled.LogoSelect
        assets={sidechainAssets}
        defaultValue={selectedAsset}
        onChange={handleAssetChange}
      />

      {selectedAsset === "BTC" ? (
        localStorageAccount && localStorageAccount !== "" ? (
          loadingSidechainAccounts ? (
            ""
          ) : hasBTCDepositAddress ? (
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
          )
        ) : (
          <>
            <GenerateBitcoinAddress
              isLoggedIn={false}
              getSidechainAccounts={getSidechainAccounts}
            />
          </>
        )
      ) : (
        <Styled.HIVEDepositContainer>
          <HIVEAndHBDDeposit assetSymbol={selectedAsset} />
        </Styled.HIVEDepositContainer>
      )}
    </Styled.DepositFormContainer>
  );
};
