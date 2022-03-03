import React from "react";

import * as Styled from "./DepositTab.styled";
import { GenerateKey } from "./components/GenerateKey/GenerateKey";
import { KeyIsGenerated } from "./components/KeyIsGenerated/KeyIsGenerated";
import { useSidechainAccounts } from "./hooks";

export const DepositTab = (): JSX.Element => {
  const { hasBTCDepositAddress } = useSidechainAccounts();

  return (
    <Styled.DepositFormContainer>
      {hasBTCDepositAddress ? <KeyIsGenerated /> : <GenerateKey />}
    </Styled.DepositFormContainer>
  );
};
