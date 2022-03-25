import React from "react";

import {
  AddressGenerated,
  GenerateBitcoinAddress,
  useUserContext,
} from "../../../../common/components";
import { useSidechainAccounts } from "../../../../common/hooks";

import * as Styled from "./DepositTab.styled";

export const DepositTab = (): JSX.Element => {
  const {
    hasBTCDepositAddress,
    bitcoinSidechainAccount,
    getSidechainAccounts,
  } = useSidechainAccounts();
  const { localStorageAccount } = useUserContext();

  return (
    <Styled.DepositFormContainer>
      {hasBTCDepositAddress ? (
        <AddressGenerated bitcoinSidechainAccount={bitcoinSidechainAccount} />
      ) : (
        <>
          <Styled.LogoSelect labelInValue defaultValue={"BTC"} />
          <GenerateBitcoinAddress
            isLoggedIn={!!localStorageAccount}
            getSidechainAccounts={getSidechainAccounts}
          />
        </>
      )}
    </Styled.DepositFormContainer>
  );
};
