import React from "react";

import { GenerateKey } from "../../../../common/components/GenerateKey";
import { KeyIsGenerated } from "../../../../common/components/KeyIsGenerated";
import { useSidechainAccounts } from "../../../../common/hooks";

import * as Styled from "./DepositTab.styled";

export const DepositTab = (): JSX.Element => {
  const { hasBTCDepositAddress } = useSidechainAccounts();

  return (
    <Styled.DepositFormContainer>
      {hasBTCDepositAddress ? <KeyIsGenerated /> : <GenerateKey />}
    </Styled.DepositFormContainer>
  );
};
