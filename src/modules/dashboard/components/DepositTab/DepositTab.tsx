import React from "react";

import {
  AddressGenerated,
  GenerateAddress,
} from "../../../../common/components";
import { useSidechainAccounts } from "../../../../common/hooks";

import * as Styled from "./DepositTab.styled";

export const DepositTab = (): JSX.Element => {
  const { hasBTCDepositAddress } = useSidechainAccounts();

  return (
    <Styled.DepositFormContainer>
      {hasBTCDepositAddress ? <AddressGenerated /> : <GenerateAddress />}
    </Styled.DepositFormContainer>
  );
};
