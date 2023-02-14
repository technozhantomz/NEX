import counterpart from "counterpart";
import React from "react";

import { BITCOIN_ASSET_SYMBOL } from "../../../../api/params";
import {
  AddressGenerated,
  DashboardLoginButton,
  DownloadBitcoinKeys,
  GenerateBitcoinAddress,
  HIVEAndHBDDeposit,
  LoadingIndicator,
} from "../../../../common/components";
import { useAssetsContext, useUserContext } from "../../../../common/providers";
import { Asset, SidechainAccount } from "../../../../common/types";
import BitcoinIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";

import * as Styled from "./DepositTab.styled";
import { useDepositTab } from "./hooks";

export const DepositTab = (): JSX.Element => {
  const {
    hasBTCDepositAddress,
    bitcoinSidechainAccount,
    getSidechainAccounts,
    loadingSidechainAccounts,
  } = useUserContext();
  const { localStorageAccount } = useUserContext();
  const { sidechainAssets } = useAssetsContext();
  const { handleAssetChange, selectedAsset } = useDepositTab();

  const isLoggedIn = localStorageAccount && localStorageAccount !== "";

  const renderBTCDepositInstruction = (instruction: string) => {
    return (
      <Styled.BTCDepositInstructionContainer>
        <Styled.BTCIconWrapper>
          <BitcoinIcon width="30" height="30" />
        </Styled.BTCIconWrapper>
        <Styled.BTCDepositInstruction>
          {instruction}
        </Styled.BTCDepositInstruction>
      </Styled.BTCDepositInstructionContainer>
    );
  };

  const BTCDeposit = hasBTCDepositAddress ? (
    <Styled.AddressGeneratedContainer>
      <AddressGenerated bitcoinSidechainAccount={bitcoinSidechainAccount} />
      {renderBTCDepositInstruction(
        counterpart.translate(`field.labels.deposit_btc`)
      )}
      <DownloadBitcoinKeys
        bitcoinSidechainAccount={bitcoinSidechainAccount as SidechainAccount}
        getSidechainAccounts={getSidechainAccounts}
      />
    </Styled.AddressGeneratedContainer>
  ) : (
    <>
      <GenerateBitcoinAddress getSidechainAccounts={getSidechainAccounts} />
      {renderBTCDepositInstruction(
        counterpart.translate(`field.labels.generate_btc_deposit_address`)
      )}
    </>
  );

  const HIVEDeposit = (
    <Styled.HIVEDepositContainer>
      <HIVEAndHBDDeposit assetSymbol={selectedAsset} />
    </Styled.HIVEDepositContainer>
  );

  const loginText =
    selectedAsset === BITCOIN_ASSET_SYMBOL
      ? counterpart.translate(`buttons.login_and_generate_bitcoin_address`)
      : counterpart.translate(`buttons.log_in_deposit_hbd_hive`, {
          assetSymbol: selectedAsset,
        });

  const deposit =
    selectedAsset === BITCOIN_ASSET_SYMBOL ? BTCDeposit : HIVEDeposit;
  const depositWithLoading = loadingSidechainAccounts ? (
    <Styled.LoadingIndicatorContainer>
      <LoadingIndicator type="three-bounce" />
    </Styled.LoadingIndicatorContainer>
  ) : (
    deposit
  );

  return (
    <Styled.DepositFormContainer>
      <Styled.LogoSelect
        assets={sidechainAssets as Asset[]}
        value={selectedAsset}
        onChange={handleAssetChange}
      />

      {!isLoggedIn ? (
        <DashboardLoginButton buttonText={loginText} />
      ) : (
        depositWithLoading
      )}
    </Styled.DepositFormContainer>
  );
};
